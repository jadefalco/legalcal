import { NextRequest, NextResponse } from "next/server";
import { updateResearchQueue } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, assignedTo, notes } = body;

    if (typeof id !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid id" },
        { status: 400 }
      );
    }

    await updateResearchQueue(id, {
      status,
      assignedTo: assignedTo ?? null,
      notes,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
