import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { authorityBundle } from "@/lib/authority/bundle";
import { computeClusters } from "@/lib/authority/similarity";

export async function POST(req: NextRequest) {
  return withV1Auth(req, async (req) => {
    const body = await req.json().catch(() => ({}));
    const { topic, scenario, k } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Missing topic" },
        { status: 400 }
      );
    }

    const normalizedTopic = String(topic).toLowerCase().trim();
    const clusterK = typeof k === "number" ? Math.min(Math.max(1, k), 10) : 3;

    if (!authorityBundle[normalizedTopic]) {
      return NextResponse.json(
        { success: false, error: `Topic "${normalizedTopic}" not found` },
        { status: 404 }
      );
    }

    const result = computeClusters(
      normalizedTopic,
      typeof scenario === "string" ? scenario : "",
      clusterK
    );
    return NextResponse.json({ success: true, data: result });
  });
}
