import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import type { AuthorityBundle } from "./freshness";

const HASHES_FILE = "data/source-hashes.json";

interface SourceHashEntry {
  hash: string;
  checkedAt: string;
}

type SourceHashes = Record<string, Record<string, SourceHashEntry>>;

export interface SourceChangeResult {
  topic: string;
  jurisdiction: string;
  changed: boolean;
  hash: string;
  previousHash: string | null;
  url: string;
  error?: string;
}

function loadHashes(): SourceHashes {
  if (!existsSync(HASHES_FILE)) {
    return {};
  }
  try {
    return JSON.parse(readFileSync(HASHES_FILE, "utf-8")) as SourceHashes;
  } catch {
    return {};
  }
}

function saveHashes(hashes: SourceHashes): void {
  writeFileSync(HASHES_FILE, JSON.stringify(hashes, null, 2));
}

function normalizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

async function fetchWithTimeout(url: string, ms = 30000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

export async function checkSourceChanges(
  bundle: AuthorityBundle
): Promise<SourceChangeResult[]> {
  const hashes = loadHashes();
  const results: SourceChangeResult[] = [];
  const now = new Date().toISOString();

  for (const [topic, jurisdictions] of Object.entries(bundle)) {
    for (const [jurisdiction, rule] of Object.entries(jurisdictions)) {
      const url =
        typeof rule.data.sourceUrl === "string"
          ? rule.data.sourceUrl
          : undefined;

      if (!url) {
        continue;
      }

      let html: string;
      try {
        const res = await fetchWithTimeout(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        html = await res.text();
      } catch {
        results.push({
          topic,
          jurisdiction,
          changed: false,
          hash: "",
          previousHash: hashes[topic]?.[jurisdiction]?.hash ?? null,
          url,
          error: "Fetch failed",
        });
        continue;
      }

      const normalized = normalizeHtml(html);
      const hash = sha256(normalized);
      const previousHash = hashes[topic]?.[jurisdiction]?.hash ?? null;
      const changed = previousHash !== null && previousHash !== hash;

      if (!hashes[topic]) {
        hashes[topic] = {};
      }
      hashes[topic][jurisdiction] = { hash, checkedAt: now };

      results.push({
        topic,
        jurisdiction,
        changed,
        hash,
        previousHash,
        url,
      });
    }
  }

  saveHashes(hashes);
  return results;
}
