import { NextRequest, NextResponse } from "next/server";
import {
  getApiKey,
  getTierLimits,
  getMonthlyUsage,
  getRecentUsage,
  logApiUsage,
} from "@/lib/authority/db";

export async function withApiAuth(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const start = Date.now();
  const apiKey = request.headers.get("x-api-key");
  const route = request.nextUrl.pathname;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Missing x-api-key header" },
      { status: 401 }
    );
  }

  // Validate key
  const keyRecord = await getApiKey(apiKey);
  if (!keyRecord) {
    return NextResponse.json(
      { success: false, error: "Invalid API key" },
      { status: 401 }
    );
  }

  if (!keyRecord.active) {
    return NextResponse.json(
      { success: false, error: "API key is inactive" },
      { status: 403 }
    );
  }

  // Fetch tier limits
  let limits;
  try {
    limits = await getTierLimits(keyRecord.tier);
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid tier configuration" },
      { status: 500 }
    );
  }

  // Check monthly quota
  const monthlyUsage = await getMonthlyUsage(keyRecord.id);
  if (monthlyUsage >= limits.monthlyQuota) {
    return NextResponse.json(
      { success: false, error: "Monthly quota exceeded" },
      { status: 429 }
    );
  }

  // Check rate limit (per minute)
  const recentUsage = await getRecentUsage(keyRecord.id, 1);
  if (recentUsage >= limits.rateLimitPerMinute) {
    return NextResponse.json(
      { success: false, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  // Run the actual handler
  let response: NextResponse;
  let statusCode = 200;
  try {
    response = await handler(request);
    statusCode = response.status;
  } catch (err) {
    statusCode = 500;
    const message = err instanceof Error ? err.message : "Unknown error";
    response = NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }

  // Log usage
  const responseTimeMs = Date.now() - start;
  try {
    await logApiUsage(keyRecord.id, route, statusCode, responseTimeMs);
  } catch {
    // Silently ignore logging errors so we don't fail the request
  }

  // Ensure CORS headers are present
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  return response;
}
