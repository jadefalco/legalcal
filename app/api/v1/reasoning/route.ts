import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  analyzeScenario,
  generateCompliancePath,
  reasonAboutOutcome,
} from "@/lib/authority/reasoning";

export async function POST(req: NextRequest) {
  return withV1Auth(req, async (req) => {
    const body = await req.json().catch(() => ({}));
    const { topic, jurisdiction, scenario } = body;

    if (!topic || !jurisdiction) {
      return NextResponse.json(
        { success: false, error: "Missing topic or jurisdiction" },
        { status: 400 }
      );
    }

    const normalizedTopic = String(topic).toLowerCase().trim();
    const normalizedJurisdiction = String(jurisdiction).toLowerCase().trim();

    if (!authorityBundle[normalizedTopic]) {
      return NextResponse.json(
        { success: false, error: `Topic "${normalizedTopic}" not found` },
        { status: 404 }
      );
    }

    const rule = authorityBundle[normalizedTopic][normalizedJurisdiction];
    if (!rule) {
      return NextResponse.json(
        { success: false, error: `Rule not found for ${normalizedJurisdiction}` },
        { status: 404 }
      );
    }

    const analysis = analyzeScenario(
      normalizedTopic,
      normalizedJurisdiction,
      typeof scenario === "string" ? scenario : "",
      rule
    );
    const path = generateCompliancePath(
      normalizedTopic,
      normalizedJurisdiction,
      typeof scenario === "string" ? scenario : "",
      rule
    );
    const outcome = reasonAboutOutcome(
      normalizedTopic,
      normalizedJurisdiction,
      typeof scenario === "string" ? scenario : "",
      rule
    );

    return NextResponse.json({
      success: true,
      data: { analysis, path, outcome },
    });
  });
}
