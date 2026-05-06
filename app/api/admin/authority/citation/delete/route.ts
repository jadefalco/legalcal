import { NextRequest, NextResponse } from "next/server";
import { deleteCitation } from "@/lib/authority/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { citationId } = body;

    if (typeof citationId !== "number") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid citationId" },
        { status: 400 }
      );
    }

    await deleteCitation(citationId);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
