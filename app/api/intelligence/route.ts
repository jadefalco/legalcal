import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  summarizeRule,
  compareRules,
  explainRuleChange,
  summarizeJurisdiction,
} from "@/lib/authority/intelligence";
import { compareRules as computeRuleDiff } from "@/lib/authority/history";
import { loadRuleHistory } from "@/lib/authority/history";

function getRule(topic: string, jurisdiction: string) {
  const rule = authorityBundle[topic]?.[jurisdiction];
  if (!rule) {
    return null;
  }
  return rule;
}

// POST /api/intelligence/summarize
async function handleSummarize(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction } = body;

  if (!topic || !jurisdiction) {
    return NextResponse.json({ error: "Missing topic or jurisdiction" }, { status: 400 });
  }

  const rule = getRule(topic, jurisdiction);
  if (!rule) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }

  const summary = summarizeRule(rule);
  return NextResponse.json(summary);
}

// POST /api/intelligence/compare
async function handleCompare(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdictionA, jurisdictionB } = body;

  if (!topic || !jurisdictionA || !jurisdictionB) {
    return NextResponse.json(
      { error: "Missing topic, jurisdictionA, or jurisdictionB" },
      { status: 400 }
    );
  }

  const ruleA = getRule(topic, jurisdictionA);
  const ruleB = getRule(topic, jurisdictionB);

  if (!ruleA || !ruleB) {
    return NextResponse.json(
      { error: "One or both rules not found" },
      { status: 404 }
    );
  }

  const comparison = compareRules(ruleA, ruleB);
  return NextResponse.json(comparison);
}

// POST /api/intelligence/explain-change
async function handleExplainChange(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction } = body;

  if (!topic || !jurisdiction) {
    return NextResponse.json({ error: "Missing topic or jurisdiction" }, { status: 400 });
  }

  const history = loadRuleHistory(topic, jurisdiction);
  if (history.length < 2) {
    return NextResponse.json(
      { error: "Not enough history to explain changes" },
      { status: 404 }
    );
  }

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];
  const diff = computeRuleDiff(previous.rule, latest.rule);

  const explanation = explainRuleChange(
    diff,
    previous.version,
    latest.version
  );

  return NextResponse.json(explanation);
}

// POST /api/intelligence/jurisdiction-summary
async function handleJurisdictionSummary(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction } = body;

  if (!topic || !jurisdiction) {
    return NextResponse.json({ error: "Missing topic or jurisdiction" }, { status: 400 });
  }

  const rule = getRule(topic, jurisdiction);
  if (!rule) {
    return NextResponse.json({ error: "Rule not found" }, { status: 404 });
  }

  const summary = summarizeJurisdiction(topic, jurisdiction, rule);
  return NextResponse.json(summary);
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/summarize")) {
    return handleSummarize(req);
  }
  if (pathname.endsWith("/compare")) {
    return handleCompare(req);
  }
  if (pathname.endsWith("/explain-change")) {
    return handleExplainChange(req);
  }
  if (pathname.endsWith("/jurisdiction-summary")) {
    return handleJurisdictionSummary(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
