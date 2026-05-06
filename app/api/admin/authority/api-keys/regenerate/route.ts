import { NextRequest, NextResponse } from "next/server";
import { regenerateApiKey } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (typeof id !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid id" },
        { status: 400 }
      );
    }

    const key = await regenerateApiKey(id);
    return NextResponse.json({ success: true, key });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
