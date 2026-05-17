import { NextRequest, NextResponse } from "next/server";
import { withV1Auth } from "@/lib/api/auth";
import { listTopics } from "@/lib/authority/topic";

export async function GET(req: NextRequest) {
  return withV1Auth(req, async () => {
    const result = listTopics();
    return NextResponse.json({ success: true, data: result });
  });
}
