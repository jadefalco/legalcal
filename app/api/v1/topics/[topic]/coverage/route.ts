import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { authorityBundle } from "@/lib/authority/bundle";
import { getTopicCoverage } from "@/lib/authority/topic";

export async function GET(
  req: NextRequest,
  { params }: { params: { topic: string } }
) {
  return withV1Auth(req, async () => {
    const topic = (await params).topic.toLowerCase().trim();

    if (!authorityBundle[topic]) {
      return NextResponse.json(
        { success: false, error: `Topic "${topic}" not found` },
        { status: 404 }
      );
    }

    const result = getTopicCoverage(topic);
    return NextResponse.json({ success: true, data: result });
  });
}
