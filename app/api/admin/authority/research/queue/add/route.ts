import { NextRequest, NextResponse } from "next/server";
import { addToResearchQueue } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jurisdictionId, topicId, notes } = body;

    if (
      typeof jurisdictionId !== "number" ||
      typeof topicId !== "number"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid jurisdictionId or topicId" },
        { status: 400 }
      );
    }

    await addToResearchQueue(jurisdictionId, topicId, notes);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
