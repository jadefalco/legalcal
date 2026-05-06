import fs from "fs";
import path from "path";
import {
  getDb,
  listJurisdictions,
  listRulesForJurisdiction,
  getRuleWithCitations,
  getReview,
  closeDb,
} from "../lib/authority/db";

const EXPORT_DIR = path.join(process.cwd(), "data", "export");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toLegalAuthorityFile(
  jurisdiction: { country: string; state: string; city: string | null },
  topic: string,
  rule: {
    id: number;
    dataJson: string;
    version: string;
    effectiveDate: string;
    supersedes: string | null;
  },
  citations: {
    id: number;
    statute: string;
    url: string;
    excerpt: string;
    sourceType: string;
    lastUpdated: string;
    confidence: number;
  }[],
  review: {
    id: number;
    status: string;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  } | null
) {
  return {
    jurisdiction: {
      country: jurisdiction.country,
      state: jurisdiction.state,
      ...(jurisdiction.city ? { city: jurisdiction.city } : {}),
    },
    topic,
    rule: {
      data: JSON.parse(rule.dataJson),
      citations: citations.map((c) => ({
        statute: c.statute,
        url: c.url,
        excerpt: c.excerpt,
        sourceType: c.sourceType,
        lastUpdated: c.lastUpdated,
        confidence: c.confidence,
      })),
      version: {
        version: rule.version,
        effectiveDate: rule.effectiveDate,
        supersedes: rule.supersedes,
      },
    },
    review: review
      ? {
          status: review.status,
          reviewer: review.reviewer,
          reviewedAt: review.reviewedAt,
          notes: review.notes,
        }
      : { status: "placeholder", reviewer: null, reviewedAt: null, notes: "" },
    exportedAt: new Date().toISOString(),
  };
}

async function main() {
  // Ensure DB is initialized
  getDb();

  const jurisdictions = await listJurisdictions();
  const exportedAt = new Date().toISOString();

  for (const jurisdiction of jurisdictions) {
    const rules = await listRulesForJurisdiction(jurisdiction.id);
    for (const ruleSummary of rules) {
      const result = await getRuleWithCitations(
        jurisdiction.id,
        ruleSummary.topicName
      );
      if (!result) continue;

      const review = await getReview(result.rule.id);
      const fileData = toLegalAuthorityFile(
        jurisdiction,
        ruleSummary.topicName,
        result.rule,
        result.citations,
        review
      );

      const relDir = jurisdiction.city
        ? path.join(jurisdiction.country, jurisdiction.state, jurisdiction.city)
        : path.join(jurisdiction.country, jurisdiction.state);
      const outDir = path.join(EXPORT_DIR, relDir);
      ensureDir(outDir);

      const outPath = path.join(outDir, `${ruleSummary.topicName}.json`);
      fs.writeFileSync(outPath, JSON.stringify(fileData, null, 2));
      console.log(`Exported: ${outPath}`);
    }
  }

  console.log(`\nExport complete. ${exportedAt}`);
  closeDb();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
