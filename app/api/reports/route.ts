import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  generateQuarterlyReport,
  generateAnnualReport,
} from "@/lib/authority/reports";

// POST /api/reports/quarterly
async function handleQuarterly(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topics, scenario } = body;

  if (!Array.isArray(topics) || topics.length === 0) {
    return NextResponse.json(
      { error: "Missing or invalid topics array" },
      { status: 400 }
    );
  }

  const normalizedTopics = topics.map((t: unknown) =>
    String(t).toLowerCase().trim()
  );

  for (const topic of normalizedTopics) {
    if (!authorityBundle[topic]) {
      return NextResponse.json(
        { error: `Topic "${topic}" not found` },
        { status: 404 }
      );
    }
  }

  try {
    const report = generateQuarterlyReport(
      normalizedTopics,
      typeof scenario === "string" ? scenario : ""
    );
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// POST /api/reports/annual
async function handleAnnual(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topics, scenario } = body;

  if (!Array.isArray(topics) || topics.length === 0) {
    return NextResponse.json(
      { error: "Missing or invalid topics array" },
      { status: 400 }
    );
  }

  const normalizedTopics = topics.map((t: unknown) =>
    String(t).toLowerCase().trim()
  );

  for (const topic of normalizedTopics) {
    if (!authorityBundle[topic]) {
      return NextResponse.json(
        { error: `Topic "${topic}" not found` },
        { status: 404 }
      );
    }
  }

  try {
    const report = generateAnnualReport(
      normalizedTopics,
      typeof scenario === "string" ? scenario : ""
    );
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/quarterly")) {
    return handleQuarterly(req);
  }
  if (pathname.endsWith("/annual")) {
    return handleAnnual(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
