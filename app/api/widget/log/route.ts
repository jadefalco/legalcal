import { NextRequest, NextResponse } from "next/server";
import { logWidgetEvent } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { calculator, state, city, eventType, metadata } = body;

    if (
      typeof calculator !== "string" ||
      typeof state !== "string" ||
      !["view", "calculate"].includes(eventType)
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    await logWidgetEvent({
      calculator,
      state,
      city,
      eventType,
      metadata: metadata || {},
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
