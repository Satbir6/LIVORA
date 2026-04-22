import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { getAuthUserFromCookie, getCookieValue, getSessionCookieName, resolveInquiryTableName } from "@/lib/admin";

export const runtime = "nodejs";

const ALLOWED_TABLES = new Set(["project_inquiries_dev", "project_inquiries_production"]);

function resolveTableName(tableName: string | null) {
  if (!tableName || !ALLOWED_TABLES.has(tableName)) {
    return null;
  }

  return tableName;
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionCookie = getCookieValue(request.headers.get("cookie"), getSessionCookieName());
  const user = await getAuthUserFromCookie(sessionCookie);
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

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "Inquiry id is required.",
      },
      { status: 400 },
    );
  }

  let body: { table?: string };

  try {
    body = (await request.json()) as { table?: string };
  } catch {
    body = {};
  }

  const tableName =
    user.role === "dev"
      ? resolveTableName(body.table ?? null) ?? currentTable
      : body.table && body.table !== currentTable
        ? null
        : currentTable;

  if (!tableName) {
    return NextResponse.json(
      {
        success: false,
        message: "You can only delete inquiries from the active environment table.",
      },
      { status: 403 },
    );
  }

  try {
    const result = await dbPool.query(
      `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`,
      [id],
    );

    if (!result.rowCount) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id,
        table: tableName,
      },
    });
  } catch (error) {
    console.error("Failed to delete inquiry", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete inquiry.",
      },
      { status: 500 },
    );
  }
}
