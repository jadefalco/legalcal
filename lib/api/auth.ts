/**
 * V1 API Authentication & Rate Limiting Middleware
 *
 * Validates x-legalcals-key header against data/api-keys.json,
 * enforces per-key rate limits, adds rate-limit headers,
 * and writes audit logs to data/logs/api/{clientId}/{date}.log.
 */

import { createHash, randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const API_KEYS_FILE = "data/api-keys.json";

export interface ApiKeyRecord {
  clientId: string;
  apiKeyHash: string;
  limits: {
    perMinute: number;
    perDay: number;
  };
  createdAt: string;
  active: boolean;
}

interface RateLimitEntry {
  minuteCount: number;
  minuteReset: number;
  dayCount: number;
  dayReset: number;
}

// In-memory rate limit store (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

// ── Public helpers ──

export function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export function generateApiKey(): string {
  return `lc_${randomBytes(32).toString("hex")}`;
}

export function loadApiKeys(): ApiKeyRecord[] {
  if (!existsSync(API_KEYS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(API_KEYS_FILE, "utf-8")) as ApiKeyRecord[];
  } catch {
    return [];
  }
}

export function saveApiKeys(keys: ApiKeyRecord[]): void {
  const dir = join("data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(API_KEYS_FILE, JSON.stringify(keys, null, 2), "utf-8");
}

/**
 * Low-level key validation. Returns clientId if valid.
 */
export function validateApiKey(
  req: Request
): { valid: true; clientId: string } | { valid: false } {
  const key = req.headers.get("x-legalcals-key");
  if (!key) return { valid: false };

  const keys = loadApiKeys();
  const hash = hashKey(key);
  const record = keys.find((k) => k.apiKeyHash === hash && k.active);

  if (!record) return { valid: false };
  return { valid: true, clientId: record.clientId };
}

/**
 * Higher-order wrapper for Next.js App Router handlers.
 * Validates key, enforces rate limits, logs usage, adds headers.
 */
export async function withV1Auth(
  req: NextRequest,
  handler: (req: NextRequest, clientId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  const start = Date.now();
  const key = req.headers.get("x-legalcals-key");
  const route = req.nextUrl.pathname;

  if (!key) {
    return NextResponse.json(
      { success: false, error: "Missing x-legalcals-key header" },
      { status: 401 }
    );
  }

  const keys = loadApiKeys();
  const hash = hashKey(key);
  const record = keys.find((k) => k.apiKeyHash === hash && k.active);

  if (!record) {
    return NextResponse.json(
      { success: false, error: "Invalid API key" },
      { status: 401 }
    );
  }

  // Rate limit check
  const now = Date.now();
  let rl = rateLimitStore.get(record.clientId);
  if (!rl) {
    rl = {
      minuteCount: 0,
      minuteReset: now + 60_000,
      dayCount: 0,
      dayReset: now + 86_400_000,
    };
    rateLimitStore.set(record.clientId, rl);
  }

  if (now > rl.minuteReset) {
    rl.minuteCount = 0;
    rl.minuteReset = now + 60_000;
  }
  if (now > rl.dayReset) {
    rl.dayCount = 0;
    rl.dayReset = now + 86_400_000;
  }

  if (rl.minuteCount >= record.limits.perMinute) {
    const res = NextResponse.json(
      { success: false, error: "Rate limit exceeded (per minute)" },
      { status: 429 }
    );
    addRateLimitHeaders(
      res,
      record.limits.perMinute,
      0,
      Math.ceil(rl.minuteReset / 1000)
    );
    return res;
  }

  if (rl.dayCount >= record.limits.perDay) {
    const res = NextResponse.json(
      { success: false, error: "Rate limit exceeded (per day)" },
      { status: 429 }
    );
    addRateLimitHeaders(
      res,
      record.limits.perDay,
      0,
      Math.ceil(rl.dayReset / 1000)
    );
    return res;
  }

  rl.minuteCount++;
  rl.dayCount++;

  let response: NextResponse;
  let statusCode = 200;
  try {
    response = await handler(req, record.clientId);
    statusCode = response.status;
  } catch (err) {
    statusCode = 500;
    const message = err instanceof Error ? err.message : "Unknown error";
    response = NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }

  const durationMs = Date.now() - start;
  logRequest(record.clientId, route, statusCode, durationMs);

  addRateLimitHeaders(
    response,
    record.limits.perMinute,
    Math.max(0, record.limits.perMinute - rl.minuteCount),
    Math.ceil(rl.minuteReset / 1000)
  );
  return response;
}

function addRateLimitHeaders(
  res: NextResponse,
  limit: number,
  remaining: number,
  reset: number
): void {
  res.headers.set("X-RateLimit-Limit", String(limit));
  res.headers.set("X-RateLimit-Remaining", String(remaining));
  res.headers.set("X-RateLimit-Reset", String(reset));
}

function logRequest(
  clientId: string,
  endpoint: string,
  status: number,
  durationMs: number
): void {
  const date = new Date().toISOString().split("T")[0];
  const dir = join("data", "logs", "api", clientId);
  mkdirSync(dir, { recursive: true });
  const logFile = join(dir, `${date}.log`);
  const entry = `${new Date().toISOString()},${clientId},${endpoint},${status},${durationMs}\n`;
  writeFileSync(logFile, entry, { flag: "a" });
}
