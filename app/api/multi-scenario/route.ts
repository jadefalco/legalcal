import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import { runScenarioAcrossJurisdictions } from "@/lib/authority/multiScenario";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, scenario } = body;

  // Validate topic
  if (!topic || typeof topic !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid topic" },
      { status: 400 }
    );
  }

  const normalizedTopic = topic.toLowerCase().trim();
  if (!authorityBundle[normalizedTopic]) {
    return NextResponse.json(
      { error: `Topic "${normalizedTopic}" not found` },
      { status: 400 }
    );
  }

  // Validate scenario
  if (!scenario || typeof scenario !== "string") {
    return NextResponse.json(
      { error: "Missing scenario text" },
      { status: 400 }
    );
  }

  if (scenario.trim().length <= 10) {
    return NextResponse.json(
      { error: "Scenario must be longer than 10 characters" },
      { status: 400 }
    );
  }

  const result = runScenarioAcrossJurisdictions(normalizedTopic, scenario.trim());
  return NextResponse.json(result);
}
