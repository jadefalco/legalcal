import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { authorityBundle } from "@/lib/authority/bundle";
import { generateQuarterlyReport } from "@/lib/authority/reports";

export async function POST(req: NextRequest) {
  return withV1Auth(req, async (req) => {
    const body = await req.json().catch(() => ({}));
    const { topics, scenario } = body;

    if (!Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid topics array" },
        { status: 400 }
      );
    }

    const normalizedTopics = topics.map((t: unknown) =>
      String(t).toLowerCase().trim()
    );

    for (const topic of normalizedTopics) {
      if (!authorityBundle[topic]) {
        return NextResponse.json(
          { success: false, error: `Topic "${topic}" not found` },
          { status: 404 }
        );
      }
    }

    const result = generateQuarterlyReport(
      normalizedTopics,
      typeof scenario === "string" ? scenario : ""
    );
    return NextResponse.json({ success: true, data: result });
  });
}
