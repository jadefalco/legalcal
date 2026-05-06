import { NextRequest, NextResponse } from "next/server";
import { getRouteDistribution } from "@/lib/authority/db";

export async function GET(_request: NextRequest) {
  try {
    const data = await getRouteDistribution();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
