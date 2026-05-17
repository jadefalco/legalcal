import fs from "fs";
import path from "path";
import { authorityBundle } from "@/lib/authority/bundle";
import { saveRuleHistorySnapshot } from "@/lib/authority/history";
import type { ExtractedCitation } from "@/lib/authority/citationExtractor";

const REPORTS_DIR = path.join(process.cwd(), "reports", "citations");

interface CitationReport {
  topic: string;
  jurisdiction: string;
  sourceUrl: string;
  citations: ExtractedCitation[];
  extractedAt: string;
  error?: string;
}

function loadReports(): CitationReport[] {
  const reports: CitationReport[] = [];
  if (!fs.existsSync(REPORTS_DIR)) return reports;

  const topics = fs.readdirSync(REPORTS_DIR).filter((d) => {
    const fullPath = path.join(REPORTS_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const topic of topics) {
    const topicDir = path.join(REPORTS_DIR, topic);
    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".json") && f !== "summary.json");
    for (const file of files) {
      const content = fs.readFileSync(path.join(topicDir, file), "utf-8");
      try {
        reports.push(JSON.parse(content));
      } catch {
        // ignore malformed
      }
    }
  }

  return reports;
}

function findJsonRuleFile(topic: string, jurisdiction: string): string | null {
  const jsonPath = path.join(process.cwd(), "data", "authority", "us", jurisdiction, `${topic}.json`);
  if (fs.existsSync(jsonPath)) return jsonPath;

  const caPath = path.join(process.cwd(), "data", "authority", "ca", jurisdiction, `${topic}.json`);
  if (fs.existsSync(caPath)) return caPath;

  return null;
}

function findGeneratedRuleFile(topic: string, jurisdiction: string): string | null {
  const generatedPath = path.join(process.cwd(), "lib", "authority", "generated", topic, `${jurisdiction}.ts`);
  if (fs.existsSync(generatedPath)) return generatedPath;
  return null;
}

function todayNote(): string {
  const today = new Date().toISOString().split("T")[0];
  return `Citations auto-extracted from source page on ${today}`;
}

function main() {
  const reports = loadReports();
  let merged = 0;
  let skipped = 0;

  for (const report of reports) {
    if (report.error || report.citations.length === 0) {
      skipped++;
      continue;
    }

    const { topic, jurisdiction } = report;
    const rule = authorityBundle[topic]?.[jurisdiction];
    if (!rule) {
      skipped++;
      continue;
    }

    // Save history snapshot before mutation
    saveRuleHistorySnapshot(topic, jurisdiction, rule);

    // Merge citations: deduplicate by statute+section
    const existingKeys = new Set(
      rule.citations.map((c) => `${c.statute}|${c.excerpt.slice(0, 50)}`)
    );

    const newCitations = report.citations
      .filter((ec) => !existingKeys.has(`${ec.statute}|${ec.excerpt.slice(0, 50)}`))
      .map((ec) => ({
        statute: ec.statute,
        url: ec.url,
        excerpt: ec.excerpt,
        sourceType: "statute" as const,
        lastUpdated: new Date().toISOString().split("T")[0],
        confidence: ec.confidence,
      }));

    if (newCitations.length === 0) {
      skipped++;
      continue;
    }

    // Update rule
    rule.citations.push(...newCitations);
    rule.lastUpdated = new Date().toISOString();

    // Update version notes
    const note = todayNote();
    if (!rule.version.notes.includes(note)) {
      rule.version.notes.push(note);
    }

    // Write back to source
    const jsonFile = findJsonRuleFile(topic, jurisdiction);
    const generatedFile = findGeneratedRuleFile(topic, jurisdiction);

    if (jsonFile) {
      const content = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
      content.rule = rule;
      fs.writeFileSync(jsonFile, JSON.stringify(content, null, 2), "utf-8");
    } else if (generatedFile) {
      // Rewrite the .ts file with updated rule
      const varName = `rule_${topic.replace(/-/g, "_")}_${jurisdiction.replace(/-/g, "_")}`;
      const tsContent = `import type { LegalRuleBlock } from "@/data/authority/schema";

export const ${varName}: LegalRuleBlock = ${JSON.stringify(rule, null, 2)};
`;
      fs.writeFileSync(generatedFile, tsContent, "utf-8");
    }

    merged++;
    console.log(`  Merged ${newCitations.length} citations into ${topic}/${jurisdiction}`);
  }

  console.log("\n=== Citation Ingestion Summary ===");
  console.log(`Reports processed: ${reports.length}`);
  console.log(`Rules updated:     ${merged}`);
  console.log(`Rules skipped:     ${skipped}`);
}

main();
