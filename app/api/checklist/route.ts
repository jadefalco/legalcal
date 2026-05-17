import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import { generateChecklist } from "@/lib/authority/checklist";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction, scenario } = body;

  if (!topic || !jurisdiction || !scenario) {
    return NextResponse.json(
      { error: "Missing topic, jurisdiction, or scenario" },
      { status: 400 }
    );
  }

  const normalizedTopic = topic.toLowerCase().trim();
  const normalizedJurisdiction = jurisdiction.toLowerCase().trim();

  const rule = authorityBundle[normalizedTopic]?.[normalizedJurisdiction];
  if (!rule) {
    return NextResponse.json(
      { error: "Rule not found" },
      { status: 404 }
    );
  }

  const checklist = generateChecklist(
    normalizedTopic,
    normalizedJurisdiction,
    scenario.trim(),
    rule
  );

  return NextResponse.json(checklist);
}
