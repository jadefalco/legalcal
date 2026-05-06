import { NextRequest, NextResponse } from "next/server";
import { extractRuleFromSource } from "@/lib/authority/research/extractRule";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceText } = body;

    if (typeof sourceText !== "string" || sourceText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid sourceText" },
        { status: 400 }
      );
    }

    const result = await extractRuleFromSource(sourceText);

    return NextResponse.json({
      success: true,
      data: result.data,
      citations: result.citations,
      notes: result.notes,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
