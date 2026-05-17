import fs from "fs";
import path from "path";
import { authorityBundle } from "@/lib/authority/bundle";
import { extractCitationsFromHtml } from "@/lib/authority/citationExtractor";

const REPORTS_DIR = path.join(process.cwd(), "reports", "citations");

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

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

interface CitationReport {
  topic: string;
  jurisdiction: string;
  sourceUrl: string;
  citations: ReturnType<typeof extractCitationsFromHtml>;
  extractedAt: string;
  error?: string;
}

async function main() {
  const reports: CitationReport[] = [];
  let scanned = 0;
  let skipped = 0;
  let failed = 0;
  let totalCitations = 0;

  for (const [topic, jurisdictions] of Object.entries(authorityBundle)) {
    for (const [jurisdiction, rule] of Object.entries(jurisdictions)) {
      // Skip placeholders
      if (rule.version.version === "0.0") {
        skipped++;
        continue;
      }

      const sourceUrl = typeof rule.data.sourceUrl === "string" ? rule.data.sourceUrl : "";
      if (!sourceUrl) {
        skipped++;
        continue;
      }

      scanned++;

      try {
        const res = await fetchWithTimeout(sourceUrl);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const html = await res.text();
        const citations = extractCitationsFromHtml(html, sourceUrl);
        totalCitations += citations.length;

        const report: CitationReport = {
          topic,
          jurisdiction,
          sourceUrl,
          citations,
          extractedAt: new Date().toISOString(),
        };
        reports.push(report);

        // Write individual report
        const outDir = path.join(REPORTS_DIR, topic);
        ensureDir(outDir);
        fs.writeFileSync(
          path.join(outDir, `${jurisdiction}.json`),
          JSON.stringify(report, null, 2),
          "utf-8"
        );
      } catch (e) {
        failed++;
        const errorMsg = e instanceof Error ? e.message : String(e);
        reports.push({
          topic,
          jurisdiction,
          sourceUrl,
          citations: [],
          extractedAt: new Date().toISOString(),
          error: errorMsg,
        });
        console.warn(`  Failed ${topic}/${jurisdiction}: ${errorMsg}`);
      }
    }
  }

  // Write summary
  const summary = {
    generatedAt: new Date().toISOString(),
    scanned,
    skipped,
    failed,
    totalCitations,
    zeroCitationRules: reports.filter((r) => r.citations.length === 0 && !r.error).length,
  };

  ensureDir(REPORTS_DIR);
  fs.writeFileSync(
    path.join(REPORTS_DIR, "summary.json"),
    JSON.stringify(summary, null, 2),
    "utf-8"
  );

  console.log("\n=== Citation Extraction Summary ===");
  console.log(`Rules scanned:     ${scanned}`);
  console.log(`Rules skipped:     ${skipped}`);
  console.log(`Fetch failures:    ${failed}`);
  console.log(`Total citations:   ${totalCitations}`);
  console.log(`Zero-citation rules: ${summary.zeroCitationRules}`);
  console.log(`\nReports written to: ${REPORTS_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
