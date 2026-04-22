import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { dbPool } from "@/lib/db";

export type AdminRole = "dev" | "normal";

export type AdminSessionUser = {
  id: string;
  username: string;
  role: AdminRole;
};

export type InquiryRecord = {
  id: string;
  first_name: string;
  email: string;
  mobile_number: string | null;
  service: string;
  message: string | null;
  created_at: string;
  updated_at: string;
};

const SESSION_COOKIE_NAME = "livora_admin_session";

function getSessionSecret() {
  return process.env.SESSION_SECRET ?? process.env.DATABASE_URL ?? "livora-admin-session-secret";
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");

  return `scrypt$${salt}$${derivedKey}`;
}

export function verifyPassword(password: string, storedPassword: string) {
  const [algorithm, salt, hash] = storedPassword.split("$");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, 64);
  const expectedKey = Buffer.from(hash, "hex");

  if (derivedKey.length !== expectedKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, expectedKey);
}

export function createSessionToken(user: AdminSessionUser) {
  const payload = JSON.stringify(user);
  const encodedPayload = base64UrlEncode(payload);
  const signature = createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function readSessionToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", getSessionSecret()).update(encodedPayload).digest();
  const actualSignature = Buffer.from(signature, "base64url");

  if (actualSignature.length !== expectedSignature.length || !timingSafeEqual(actualSignature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionUser;

    if (!payload.id || !payload.username || (payload.role !== "dev" && payload.role !== "normal")) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getUsersCount() {
  const result = await dbPool.query<{ count: string }>("SELECT COUNT(*)::text AS count FROM users");

  return Number(result.rows[0]?.count ?? 0);
}

export async function createUser(params: { username: string; password: string; role: AdminRole }) {
  const result = await dbPool.query<{
    id: string;
    username: string;
    role: AdminRole;
    is_active: boolean;
    created_at: string;
  }>(
    `
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, $3)
      RETURNING id, username, role, is_active, created_at
    `,
    [params.username, hashPassword(params.password), params.role],
  );

  return result.rows[0];
}

export async function authenticateUser(username: string, password: string) {
  const result = await dbPool.query<{
    id: string;
    username: string;
    password: string;
    role: AdminRole;
    is_active: boolean;
  }>(
    `
      SELECT id, username, password, role, is_active
      FROM users
      WHERE username = $1
      LIMIT 1
    `,
    [username],
  );

  const user = result.rows[0];

  if (!user || !user.is_active || !verifyPassword(password, user.password)) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  } satisfies AdminSessionUser;
}

export async function getAuthUserFromCookie(cookieValue: string | undefined | null) {
  const sessionUser = readSessionToken(cookieValue);

  if (!sessionUser) {
    return null;
  }

  const result = await dbPool.query<{ id: string; username: string; role: AdminRole; is_active: boolean }>(
    `
      SELECT id, username, role, is_active
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [sessionUser.id],
  );

  const user = result.rows[0];

  if (!user || !user.is_active || user.username !== sessionUser.username || user.role !== sessionUser.role) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  } satisfies AdminSessionUser;
}

export async function getInquiryRowsForTable(tableName: string) {
  const result = await dbPool.query<InquiryRecord>(
    `
      SELECT
        id::text,
        first_name,
        email,
        mobile_number,
        service,
        message,
        created_at::text,
        updated_at::text
      FROM ${tableName}
      ORDER BY created_at DESC
    `,
  );

  return result.rows;
}

export function resolveInquiryTableName(appEnv: string | undefined | null) {
  if (appEnv === "development") {
    return "project_inquiries_dev";
  }

  if (appEnv === "production") {
    return "project_inquiries_production";
  }

  return null;
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function getCookieValue(cookieHeader: string | null, cookieName: string) {
  if (!cookieHeader) {
    return null;
  }

  const cookieParts = cookieHeader.split(";").map((part) => part.trim());
  const match = cookieParts.find((part) => part.startsWith(`${cookieName}=`));

  if (!match) {
    return null;
  }

  return match.slice(cookieName.length + 1);
}
