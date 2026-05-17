import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import { scoreRisk, scoreRiskForAllJurisdictions } from "@/lib/authority/risk";

// POST /api/risk/single
async function handleSingle(req: NextRequest) {
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
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }

  const score = scoreRisk(normalizedTopic, normalizedJurisdiction, scenario.trim(), rule);
  return NextResponse.json(score);
}

// POST /api/risk/multi
async function handleMulti(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, scenario } = body;

  if (!topic || !scenario) {
    return NextResponse.json(
      { error: "Missing topic or scenario" },
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

  if (scenario.trim().length <= 10) {
    return NextResponse.json(
      { error: "Scenario must be longer than 10 characters" },
      { status: 400 }
    );
  }

  const result = scoreRiskForAllJurisdictions(normalizedTopic, scenario.trim());
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/single")) {
    return handleSingle(req);
  }
  if (pathname.endsWith("/multi")) {
    return handleMulti(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
