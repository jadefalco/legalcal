import { NextRequest, NextResponse } from "next/server";
import { listImportLogs } from "@/lib/authority/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobIdParam = searchParams.get("jobId");

    if (!jobIdParam) {
      return NextResponse.json(
        { success: false, error: "Missing jobId query parameter" },
        { status: 400 }
      );
    }

    const jobId = parseInt(jobIdParam, 10);
    if (Number.isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: "Invalid jobId" },
        { status: 400 }
      );
    }

    const logs = await listImportLogs(jobId);
    return NextResponse.json({ success: true, logs });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
