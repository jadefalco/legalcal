import { NextRequest, NextResponse } from "next/server";
import {
  listTopics,
  registerTopic,
  getTopicCoverage,
} from "@/lib/authority/topic";

// GET /api/topics/list
function handleList() {
  const topics = listTopics();
  return NextResponse.json(topics);
}

// POST /api/topics/create
async function handleCreate(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topicId, label, description } = body;

  if (!topicId || !label) {
    return NextResponse.json(
      { error: "Missing topicId or label" },
      { status: 400 }
    );
  }

  const normalizedId = topicId.toLowerCase().trim().replace(/\s+/g, "-");
  const normalizedLabel = label.trim();

  if (!/^[a-z0-9-]+$/.test(normalizedId)) {
    return NextResponse.json(
      { error: "topicId must contain only lowercase letters, numbers, and hyphens" },
      { status: 400 }
    );
  }

  const meta = registerTopic(normalizedId, normalizedLabel, description);

  return NextResponse.json({
    success: true,
    topic: meta,
    coverage: getTopicCoverage(normalizedId),
  });
}

// POST /api/topics/coverage
async function handleCoverage(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topicId } = body;

  if (!topicId) {
    return NextResponse.json(
      { error: "Missing topicId" },
      { status: 400 }
    );
  }

  const coverage = getTopicCoverage(topicId.toLowerCase().trim());
  return NextResponse.json({ topicId, coverage });
}

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.endsWith("/list")) {
    return handleList();
  }
  return NextResponse.json({ topics: listTopics() });
}

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith("/create")) {
    return handleCreate(req);
  }
  if (pathname.endsWith("/coverage")) {
    return handleCoverage(req);
  }

  return NextResponse.json({ error: "Unknown endpoint" }, { status: 404 });
}
