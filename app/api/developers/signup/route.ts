import { NextRequest, NextResponse } from "next/server";
import { createApiKey } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, intendedUse, tier } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const selectedTier = typeof tier === "string" && ["free", "pro", "enterprise"].includes(tier)
      ? tier
      : "free";

    const key = await createApiKey(name, email, selectedTier);

    return NextResponse.json({
      success: true,
      key,
      message: "Your API key has been generated. Save it now — it will not be shown again.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
