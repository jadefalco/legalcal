import { NextRequest, NextResponse } from "next/server";
import { updateApiKeyStatus } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, active } = body;

    if (typeof id !== "number" || typeof active !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    await updateApiKeyStatus(id, active);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
