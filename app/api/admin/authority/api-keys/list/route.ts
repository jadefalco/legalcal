import { NextRequest, NextResponse } from "next/server";
import { listApiKeys } from "@/lib/authority/db";

export async function GET(_request: NextRequest) {
  try {
    const keys = await listApiKeys();
    return NextResponse.json({ success: true, keys });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
