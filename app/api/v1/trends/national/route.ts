import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { authorityBundle } from "@/lib/authority/bundle";
import { computeNationalTrends } from "@/lib/authority/trends";

export async function POST(req: NextRequest) {
  return withV1Auth(req, async (req) => {
    const body = await req.json().catch(() => ({}));
    const { topic, scenario } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Missing topic" },
        { status: 400 }
      );
    }

    const normalizedTopic = String(topic).toLowerCase().trim();

    if (!authorityBundle[normalizedTopic]) {
      return NextResponse.json(
        { success: false, error: `Topic "${normalizedTopic}" not found` },
        { status: 404 }
      );
    }

    const result = computeNationalTrends(
      normalizedTopic,
      typeof scenario === "string" ? scenario : undefined
    );
    return NextResponse.json({ success: true, data: result });
  });
}
