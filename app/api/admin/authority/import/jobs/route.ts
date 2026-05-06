import { NextRequest, NextResponse } from "next/server";
import { listImportJobs } from "@/lib/authority/db";

export async function GET(_request: NextRequest) {
  try {
    const jobs = await listImportJobs();
    return NextResponse.json({ success: true, jobs });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
