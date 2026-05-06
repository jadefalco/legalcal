import { NextRequest, NextResponse } from "next/server";
import { updateRuleData } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, dataJson, version, effectiveDate } = body;

    if (
      typeof ruleId !== "number" ||
      typeof dataJson !== "string" ||
      typeof version !== "string" ||
      typeof effectiveDate !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    // Validate JSON
    try {
      JSON.parse(dataJson);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in dataJson" },
        { status: 400 }
      );
    }

    await updateRuleData(ruleId, dataJson, version, effectiveDate);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
