import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  analyzeScenario,
  generateCompliancePath,
  reasonAboutOutcome,
} from "@/lib/authority/reasoning";

function getRule(topic: string, jurisdiction: string) {
  return authorityBundle[topic]?.[jurisdiction] ?? null;
}

// POST /api/reasoning/analyze
async function handleAnalyze(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction, scenario } = body;

  if (!topic || !jurisdiction || !scenario) {
    return NextResponse.json(
      { error: "Missing topic, jurisdiction, or scenario" },
      { status: 400 }
    );
  }

  const rule = getRule(topic, jurisdiction);
  if (!rule) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }

  const analysis = analyzeScenario(topic, jurisdiction, scenario, rule);
  return NextResponse.json(analysis);
}

// POST /api/reasoning/path
async function handlePath(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction, scenario } = body;

  if (!topic || !jurisdiction || !scenario) {
    return NextResponse.json(
      { error: "Missing topic, jurisdiction, or scenario" },
      { status: 400 }
    );
  }

  const rule = getRule(topic, jurisdiction);
  if (!rule) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }

  const path = generateCompliancePath(topic, jurisdiction, scenario, rule);
  return NextResponse.json(path);
}

// POST /api/reasoning/outcome
async function handleOutcome(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction, scenario } = body;

  if (!topic || !jurisdiction || !scenario) {
    return NextResponse.json(
      { error: "Missing topic, jurisdiction, or scenario" },
      { status: 400 }
    );
  }

  const rule = getRule(topic, jurisdiction);
  if (!rule) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }

  const outcome = reasonAboutOutcome(topic, jurisdiction, scenario, rule);
  return NextResponse.json(outcome);
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/analyze")) {
    return handleAnalyze(req);
  }
  if (pathname.endsWith("/path")) {
    return handlePath(req);
  }
  if (pathname.endsWith("/outcome")) {
    return handleOutcome(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
