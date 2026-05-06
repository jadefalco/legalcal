import { NextRequest, NextResponse } from "next/server";
import { upsertCitation } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, citation } = body;

    if (
      typeof ruleId !== "number" ||
      !citation ||
      typeof citation.statute !== "string" ||
      typeof citation.url !== "string" ||
      typeof citation.excerpt !== "string" ||
      typeof citation.sourceType !== "string" ||
      typeof citation.lastUpdated !== "string" ||
      typeof citation.confidence !== "number"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    await upsertCitation(ruleId, citation);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
