import { NextResponse } from "next/server";
import { createUser, getAuthUserFromCookie, getCookieValue, getSessionCookieName } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const sessionCookie = getCookieValue(request.headers.get("cookie"), getSessionCookieName());
  const user = await getAuthUserFromCookie(sessionCookie);

  if (!user || user.role !== "dev") {
    return NextResponse.json(
      {
        success: false,
        message: "Only dev users can create new users.",
      },
      { status: 403 },
    );
  }

  let body: { username?: string; password?: string; role?: "dev" | "normal" };

  try {
    body = (await request.json()) as { username?: string; password?: string; role?: "dev" | "normal" };
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON body.",
      },
      { status: 400 },
    );
  }

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";
  const role = body.role;

  if (!username || !password || (role !== "dev" && role !== "normal")) {
    return NextResponse.json(
      {
        success: false,
        message: "username, password, and role are required.",
      },
      { status: 400 },
    );
  }

  try {
    const newUser = await createUser({ username, password, role });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
          is_active: newUser.is_active,
          created_at: newUser.created_at,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create user", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user.",
      },
      { status: 500 },
    );
  }
}
