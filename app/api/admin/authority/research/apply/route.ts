import { NextRequest, NextResponse } from "next/server";
import {
  updateRuleData,
  upsertCitation,
  getReview,
  upsertReview,
} from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, data, citations, notes } = body;

    if (
      typeof ruleId !== "number" ||
      typeof data !== "object" ||
      data === null
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    // Update rule data JSON
    const dataJson = JSON.stringify(data);
    await updateRuleData(ruleId, dataJson, "", "");

    // Upsert citations
    if (Array.isArray(citations)) {
      for (const citation of citations) {
        await upsertCitation(ruleId, {
          statute: citation.statute ?? "",
          url: citation.url ?? "",
          excerpt: citation.excerpt ?? "",
          sourceType: citation.sourceType ?? "statute",
          lastUpdated: new Date().toISOString().split("T")[0],
          confidence: typeof citation.confidence === "number" ? citation.confidence : 0.5,
        });
      }
    }

    // Update review workflow
    const existingReview = await getReview(ruleId);
    const dateStr = new Date().toISOString().split("T")[0];
    const noteLines: string[] = [];
    if (Array.isArray(notes)) {
      for (const note of notes) {
        if (typeof note === "string") {
          noteLines.push(note);
        }
      }
    }
    noteLines.push(`AI research applied on ${dateStr}. Review required.`);

    const newNotes = existingReview?.notes
      ? `${existingReview.notes}\n${noteLines.join("\n")}`
      : noteLines.join("\n");

    await upsertReview(ruleId, {
      status: "draft",
      reviewer: existingReview?.reviewer ?? null,
      reviewedAt: existingReview?.reviewedAt ?? null,
      notes: newNotes,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
