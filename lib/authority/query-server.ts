import { getDb } from "./db";
import type { LegalRuleBlock } from "@/data/authority/schema";

export async function getRuleFromDb(
  state: string,
  topic: string,
  city?: string
): Promise<LegalRuleBlock | null> {
  const db = getDb();

  const jurisdictionQuery = city
    ? `SELECT id FROM jurisdictions WHERE state = ? AND city = ?`
    : `SELECT id FROM jurisdictions WHERE state = ? AND city IS NULL`;

  const jurisdictionParams = city ? [state.toLowerCase(), city.toLowerCase()] : [state.toLowerCase()];
  const jurisdictionRow = db.prepare(jurisdictionQuery).get(...jurisdictionParams) as { id: number } | undefined;

  if (!jurisdictionRow) {
    return null;
  }

  const topicRow = db.prepare(`SELECT id FROM topics WHERE name = ?`).get(topic) as { id: number } | undefined;

  if (!topicRow) {
    return null;
  }

  const ruleRow = db
    .prepare(`SELECT id, data_json, version, effective_date, supersedes FROM rules WHERE jurisdiction_id = ? AND topic_id = ?`)
    .get(jurisdictionRow.id, topicRow.id) as {
      id: number;
      data_json: string;
      version: string;
      effective_date: string;
      supersedes: string | null;
    } | undefined;

  if (!ruleRow) {
    return null;
  }

  const citationRows = db
    .prepare(`SELECT statute, url, excerpt, source_type, last_updated, confidence FROM citations WHERE rule_id = ?`)
    .all(ruleRow.id) as Array<{
      statute: string;
      url: string;
      excerpt: string;
      source_type: string;
      last_updated: string;
      confidence: number;
    }>;

  return {
    data: JSON.parse(ruleRow.data_json),
    citations: citationRows.map((r) => ({
      statute: r.statute,
      url: r.url,
      excerpt: r.excerpt,
      sourceType: r.source_type as any,
      lastUpdated: r.last_updated,
      confidence: r.confidence,
    })),
    version: {
      version: ruleRow.version,
      effectiveDate: ruleRow.effective_date,
      supersedes: ruleRow.supersedes,
      notes: [],
    },
  };
}
