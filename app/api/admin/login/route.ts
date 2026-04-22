import { NextResponse } from "next/server";
import { authenticateUser, createSessionToken, getSessionCookieName, getUsersCount } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const hasUsers = await getUsersCount();

  if (!hasUsers) {
    return NextResponse.json(
      {
        success: false,
        message: "Create the first user before signing in.",
      },
      { status: 400 },
    );
  }

  let body: { username?: string; password?: string };

  try {
    body = (await request.json()) as { username?: string; password?: string };
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

  if (!username || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "username and password are required.",
      },
      { status: 400 },
    );
  }

  const user = await authenticateUser(username, password);

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials or inactive user.",
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    success: true,
    data: user,
  });

  response.cookies.set(getSessionCookieName(), createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
