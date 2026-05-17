import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { authorityBundle } from "@/lib/authority/bundle";
import { summarizeJurisdiction } from "@/lib/authority/intelligence";

export async function POST(req: NextRequest) {
  return withV1Auth(req, async (req) => {
    const body = await req.json().catch(() => ({}));
    const { topic, jurisdiction } = body;

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

    const result = summarizeJurisdiction(
      normalizedTopic,
      normalizedJurisdiction,
      rule
    );
    return NextResponse.json({ success: true, data: result });
  });
}
