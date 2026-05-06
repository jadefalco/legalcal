import { NextRequest, NextResponse } from "next/server";
import { compareRuleToSource } from "@/lib/authority/research/compareRule";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { existingRuleData, sourceText } = body;

    if (
      typeof existingRuleData !== "object" ||
      existingRuleData === null ||
      typeof sourceText !== "string" ||
      sourceText.trim().length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const result = compareRuleToSource(existingRuleData, sourceText);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
