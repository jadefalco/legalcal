import { NextRequest, NextResponse } from "next/server";
import { acknowledgeAlert, getAlertById, getReview, upsertReview } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId } = body;

    if (typeof alertId !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid alertId" },
        { status: 400 }
      );
    }

    const alert = await getAlertById(alertId);
    if (!alert) {
      return NextResponse.json(
        { success: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    if (alert.acknowledged) {
      return NextResponse.json(
        { success: false, error: "Alert already acknowledged" },
        { status: 400 }
      );
    }

    await acknowledgeAlert(alertId);

    // Review workflow integration
    const existingReview = await getReview(alert.ruleId);
    const dateStr = new Date().toISOString().split("T")[0];
    const noteLine = `Statute change detected on ${dateStr}. Review required.`;
    const notes = existingReview?.notes
      ? `${existingReview.notes}\n${noteLine}`
      : noteLine;

    await upsertReview(alert.ruleId, {
      status: "draft",
      reviewer: existingReview?.reviewer ?? null,
      reviewedAt: existingReview?.reviewedAt ?? null,
      notes,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
