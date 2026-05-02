import { NextResponse } from "next/server";
import { logTrafficEntry } from "@/lib/traffic";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { visitorId?: string; path?: string };

  try {
    body = (await request.json()) as { visitorId?: string; path?: string };
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON body.",
      },
      { status: 400 },
    );
  }

  const visitorId = body.visitorId?.trim() ?? "";
  const path = body.path?.trim() ?? "";

  if (!visitorId || !path) {
    return NextResponse.json(
      {
        success: false,
        message: "visitorId and path are required.",
      },
      { status: 400 },
    );
  }

  try {
    await logTrafficEntry({
      visitorId,
      path,
      referrer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({
      success: true,
      message: "Traffic log recorded.",
    });
  } catch (error) {
    console.error("Failed to record traffic log", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to record traffic log.",
      },
      { status: 500 },
    );
  }
}
