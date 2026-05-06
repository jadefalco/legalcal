import { NextRequest, NextResponse } from "next/server";
import { createApiKey } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ownerName, ownerEmail, tier } = body;

    if (
      typeof ownerName !== "string" ||
      typeof ownerEmail !== "string" ||
      typeof tier !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const key = await createApiKey(ownerName, ownerEmail, tier);
    return NextResponse.json({ success: true, key });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
