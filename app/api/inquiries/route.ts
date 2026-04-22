import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";

const ALLOWED_SERVICES = new Set([
  "Full Home Interiors",
  "Modular Interiors",
  "Custom Interiors",
  "Renovation",
]);

type InquiryPayload = {
  firstName?: string;
  email?: string;
  mobileNumber?: string;
  service?: string;
  message?: string;
};

function resolveTableName() {
  const appEnv = process.env.APP_ENV;

  if (appEnv === "development") {
    return "project_inquiries_dev";
  }

  if (appEnv === "production") {
    return "project_inquiries_production";
  }

  return null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const tableName = resolveTableName();

  if (!tableName) {
    return NextResponse.json(
      {
        success: false,
        message: "APP_ENV must be set to development or production.",
      },
      { status: 500 },
    );
  }

  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON body.",
      },
      { status: 400 },
    );
  }

  const firstName = payload.firstName?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const mobileNumber = payload.mobileNumber?.trim() || null;
  const service = payload.service?.trim() ?? "";
  const message = payload.message?.trim() || null;

  if (!firstName || !email || !service) {
    return NextResponse.json(
      {
        success: false,
        message: "firstName, email, and service are required.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please provide a valid email address.",
      },
      { status: 400 },
    );
  }

  if (!ALLOWED_SERVICES.has(service)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid service value.",
      },
      { status: 400 },
    );
  }

  try {
    const query = `
      INSERT INTO ${tableName} (first_name, email, mobile_number, service, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, email, mobile_number, service, message, created_at, updated_at
    `;

    const { rows } = await dbPool.query(query, [firstName, email, mobileNumber, service, message]);

    return NextResponse.json(
      {
        success: true,
        data: rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to insert inquiry", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save inquiry.",
      },
      { status: 500 },
    );
  }
}
