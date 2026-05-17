import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import { generateHeatmapData } from "@/lib/authority/heatmap";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, scenario } = body;

  if (!topic || !scenario) {
    return NextResponse.json(
      { error: "Missing topic or scenario" },
      { status: 400 }
    );
  }

  const normalizedTopic = topic.toLowerCase().trim();
  if (!authorityBundle[normalizedTopic]) {
    return NextResponse.json(
      { error: `Topic "${normalizedTopic}" not found` },
      { status: 400 }
    );
  }

  if (scenario.trim().length <= 10) {
    return NextResponse.json(
      { error: "Scenario must be longer than 10 characters" },
      { status: 400 }
    );
  }

  const result = generateHeatmapData(normalizedTopic, scenario.trim());
  return NextResponse.json(result);
}
