import { NextResponse } from "next/server";
import { createSessionToken, createUser, getSessionCookieName, getUsersCount } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const hasUsers = await getUsersCount();

  if (hasUsers) {
    return NextResponse.json(
      {
        success: false,
        message: "Bootstrap is only allowed when no users exist.",
      },
      { status: 400 },
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
    const user = await createUser({ username, password, role });
    const sessionUser = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      data: sessionUser,
    }, { status: 201 });

    response.cookies.set(getSessionCookieName(), createSessionToken(sessionUser), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Failed to bootstrap admin user", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user.",
      },
      { status: 500 },
    );
  }
}
