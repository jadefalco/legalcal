import { NextRequest, NextResponse } from "next/server";
import { upsertReview } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, status, reviewer, reviewedAt, notes } = body;

    if (
      typeof ruleId !== "number" ||
      typeof status !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    await upsertReview(ruleId, {
      status,
      reviewer: reviewer ?? null,
      reviewedAt: reviewedAt ?? null,
      notes: notes ?? "",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
