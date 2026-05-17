import { NextRequest, NextResponse } from "next/server";
import { authorityBundle } from "@/lib/authority/bundle";
import { computeSimilarityMatrix, computeClusters } from "@/lib/authority/similarity";

// POST /api/similarity/matrix
async function handleMatrix(req: NextRequest) {
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

  const result = computeSimilarityMatrix(normalizedTopic, scenario.trim());
  return NextResponse.json(result);
}

// POST /api/similarity/clusters
async function handleClusters(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topic, scenario, k } = body;

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

  const clusterCount = typeof k === "number" && k > 0 ? Math.min(k, 10) : 3;
  const result = computeClusters(normalizedTopic, scenario.trim(), clusterCount);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/matrix")) {
    return handleMatrix(req);
  }
  if (pathname.endsWith("/clusters")) {
    return handleClusters(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
