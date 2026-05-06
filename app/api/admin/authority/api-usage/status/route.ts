import { NextRequest, NextResponse } from "next/server";
import { getStatusDistribution } from "@/lib/authority/db";

export async function GET(_request: NextRequest) {
  try {
    const data = await getStatusDistribution();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
