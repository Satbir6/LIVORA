import { NextResponse } from "next/server";
import { getAuthUserFromCookie, getCookieValue, getInquiryRowsForTable, getSessionCookieName, resolveInquiryTableName } from "@/lib/admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const sessionCookie = getCookieValue(request.headers.get("cookie"), getSessionCookieName());
  const user = await getAuthUserFromCookie(sessionCookie);

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  const currentTable = resolveInquiryTableName(process.env.APP_ENV);

  if (!currentTable) {
    return NextResponse.json(
      {
        success: false,
        message: "APP_ENV must be set to development or production.",
      },
      { status: 500 },
    );
  }

  try {
    if (user.role === "dev") {
      const [development, production] = await Promise.all([
        getInquiryRowsForTable("project_inquiries_dev"),
        getInquiryRowsForTable("project_inquiries_production"),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          development,
          production,
        },
      });
    }

    const inquiries = await getInquiryRowsForTable(currentTable);

    return NextResponse.json({
      success: true,
      data: {
        [currentTable]: inquiries,
      },
    });
  } catch (error) {
    console.error("Failed to load inquiries", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load inquiries.",
      },
      { status: 500 },
    );
  }
}
