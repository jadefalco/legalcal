import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  computeForecast,
  computeNationalForecast,
} from "@/lib/authority/forecast";

// POST /api/forecast/jurisdiction
async function handleJurisdiction(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, jurisdiction, scenario } = body;

  if (!topic || !jurisdiction) {
    return NextResponse.json(
      { error: "Missing topic or jurisdiction" },
      { status: 400 }
    );
  }

  const normalizedTopic = topic.toLowerCase().trim();
  if (!authorityBundle[normalizedTopic]) {
    return NextResponse.json(
      { error: `Topic "${normalizedTopic}" not found` },
      { status: 404 }
    );
  }

  const result = computeForecast(
    normalizedTopic,
    jurisdiction.toLowerCase().trim(),
    scenario
  );

  return NextResponse.json(result);
}

// POST /api/forecast/national
async function handleNational(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, scenario } = body;

  if (!topic) {
    return NextResponse.json(
      { error: "Missing topic" },
      { status: 400 }
    );
  }

  const normalizedTopic = topic.toLowerCase().trim();
  if (!authorityBundle[normalizedTopic]) {
    return NextResponse.json(
      { error: `Topic "${normalizedTopic}" not found` },
      { status: 404 }
    );
  }

  const result = computeNationalForecast(normalizedTopic, scenario);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/jurisdiction")) {
    return handleJurisdiction(req);
  }
  if (pathname.endsWith("/national")) {
    return handleNational(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
