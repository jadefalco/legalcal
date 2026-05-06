import { NextRequest, NextResponse } from "next/server";
import { listApiUsage } from "@/lib/authority/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get("apiKeyId");
    const route = searchParams.get("route");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const logs = await listApiUsage({
      apiKeyId: apiKeyId ? parseInt(apiKeyId, 10) : undefined,
      route: route || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });

    return NextResponse.json({ success: true, logs });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
