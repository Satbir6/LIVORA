import { NextResponse } from "next/server";
import { getAuthUserFromCookie, getCookieValue, getSessionCookieName, getUsersCount, resolveInquiryTableName } from "@/lib/admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const hasUsers = await getUsersCount();
  const sessionCookie = getCookieValue(request.headers.get("cookie"), getSessionCookieName());
  const user = await getAuthUserFromCookie(sessionCookie);
  const currentInquiryTable = resolveInquiryTableName(process.env.APP_ENV);

  return NextResponse.json({
    success: true,
    data: {
      hasUsers,
      user,
      currentInquiryTable,
    },
  });
}
