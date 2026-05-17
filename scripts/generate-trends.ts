#!/usr/bin/env tsx
/**
 * CLI script: generate-trends
 *
 * Accepts --topic, --jurisdiction, and --national flags.
 * Generates trend snapshots and writes to:
 *   reports/trends/{topic}/{jurisdiction}/{timestamp}.json
 *   reports/trends/{topic}/{jurisdiction}/{timestamp}.md
 *
 * With --national, runs a national scan:
 *   reports/trends/{topic}/national-{timestamp}.json
 *   reports/trends/{topic}/national-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import {
  computeTrendSnapshot,
  computeTrendAnalysis,
  computeNationalTrends,
} from "../lib/authority/trends";

function parseArgs(): {
  topic: string;
  jurisdiction: string;
  scenario: string;
  national: boolean;
} {
  const args = process.argv.slice(2);
  let topic = "";
  let jurisdiction = "";
  let scenario = "";
  let national = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === "--jurisdiction" && args[i + 1]) {
      jurisdiction = args[i + 1];
      i++;
    } else if (args[i] === "--scenario" && args[i + 1]) {
      scenario = args[i + 1];
      i++;
    } else if (args[i] === "--national") {
      national = true;
    }
  }

  if (!topic) {
    console.error(
      "Usage: npx tsx scripts/generate-trends.ts --topic <topic> [--jurisdiction <code>] [--scenario <text>] [--national]"
    );
    console.error(
      'Single: npx tsx scripts/generate-trends.ts --topic rent-increase --jurisdiction bc --scenario "Proposed rent increase of 5% with 30 days notice."'
    );
    console.error(
      'National: npx tsx scripts/generate-trends.ts --topic rent-increase --national'
    );
    process.exit(1);
  }

  return { topic, jurisdiction, scenario, national };
}

function snapshotToMarkdown(
  snapshot: ReturnType<typeof computeTrendSnapshot>
): string {
  let md = `## ${snapshot.jurisdiction.toUpperCase()} — ${snapshot.topic.replace(/-/g, " ")}\n\n`;
  md += `**Timestamp:** ${snapshot.timestamp}\n\n`;
  md += `| Category | Risk |\n`;
  md += `|----------|------|\n`;
  md += `| Structural | ${snapshot.structuralRisk} |\n`;
  md += `| Procedural | ${snapshot.proceduralRisk} |\n`;
  md += `| Documentation | ${snapshot.documentationRisk} |\n`;
  md += `| Overall | ${snapshot.overallRisk} |\n`;
  md += `\n`;
  md += `**Rule Version:** ${snapshot.ruleVersion}\n\n`;
  md += `**Similarity Vector:** [${snapshot.similarityVector.map((v) => v.toFixed(2)).join(", ")}]\n\n`;
  return md;
}

function analysisToMarkdown(
  analysis: ReturnType<typeof computeTrendAnalysis>
): string {
  let md = `# Trend Analysis — ${analysis.topic.replace(/-/g, " ")} / ${analysis.jurisdiction.toUpperCase()}\n\n`;
  md += `**Volatility Score:** ${analysis.volatilityScore}\n\n`;

  md += `## Snapshot History\n\n`;
  md += `| Date | Structural | Procedural | Documentation | Overall | Version |\n`;
  md += `|------|------------|------------|---------------|---------|---------|\n`;
  for (const s of analysis.snapshots) {
    const date = new Date(s.timestamp).toLocaleDateString();
    md += `| ${date} | ${s.structuralRisk} | ${s.proceduralRisk} | ${s.documentationRisk} | ${s.overallRisk} | ${s.ruleVersion} |\n`;
  }
  md += `\n`;

  if (analysis.ruleChanges.length > 0) {
    md += `## Rule Changes\n\n`;
    for (const rc of analysis.ruleChanges) {
      const date = new Date(rc.timestamp).toLocaleDateString();
      md += `- ${date}: ${rc.fromVersion} → ${rc.toVersion}\n`;
    }
    md += `\n`;
  }

  if (analysis.similarityDrift.length > 0) {
    md += `## Similarity Drift\n\n`;
    for (let i = 0; i < analysis.similarityDrift.length; i++) {
      md += `- Snapshot ${i + 1} → ${i + 2}: ${analysis.similarityDrift[i].toFixed(3)}\n`;
    }
    md += `\n`;
  }

  return md;
}

function nationalToMarkdown(
  report: ReturnType<typeof computeNationalTrends>
): string {
  let md = `# National Trend Report — ${report.topic.replace(/-/g, " ")}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Jurisdictions analyzed:** ${report.jurisdictions.length}\n\n`;

  md += `| Jurisdiction | Trend | Volatility | Last Risk | Version |\n`;
  md += `|--------------|-------|------------|-----------|---------|\n`;
  for (const j of report.jurisdictions) {
    md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.trendDirection} | ${j.volatilityScore} | ${j.lastRisk} | ${j.lastRuleVersion} |\n`;
  }
  md += `\n`;

  const tightening = report.jurisdictions.filter((j) => j.trendDirection === "tightening").length;
  const loosening = report.jurisdictions.filter((j) => j.trendDirection === "loosening").length;
  const stable = report.jurisdictions.filter((j) => j.trendDirection === "stable").length;
  const highVol = report.jurisdictions.filter((j) => j.volatilityScore >= 0.5).length;

  md += `## Summary\n`;
  md += `- **Tightening:** ${tightening}\n`;
  md += `- **Loosening:** ${loosening}\n`;
  md += `- **Stable:** ${stable}\n`;
  md += `- **High Volatility:** ${highVol}\n`;

  return md;
}

async function main() {
  const { topic, jurisdiction, scenario, national } = parseArgs();

  console.log(`Generating trends...`);
  console.log(`Topic: ${topic}`);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

  if (national) {
    console.log(`Mode: National scan across all jurisdictions`);
    const report = computeNationalTrends(topic, scenario || undefined);

    console.log(`\nResults:`);
    console.log(`  Total jurisdictions: ${report.jurisdictions.length}`);
    console.log(
      `  Tightening: ${report.jurisdictions.filter((j) => j.trendDirection === "tightening").length}`
    );
    console.log(
      `  Loosening: ${report.jurisdictions.filter((j) => j.trendDirection === "loosening").length}`
    );
    console.log(
      `  Stable: ${report.jurisdictions.filter((j) => j.trendDirection === "stable").length}`
    );
    console.log(
      `  High volatility: ${report.jurisdictions.filter((j) => j.volatilityScore >= 0.5).length}`
    );

    const outDir = path.join("reports", "trends", topic);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const baseName = `national-${timestamp}`;
    const jsonPath = path.join(outDir, `${baseName}.json`);
    const mdPath = path.join(outDir, `${baseName}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf-8");
    fs.writeFileSync(mdPath, nationalToMarkdown(report), "utf-8");

    console.log(`\nWritten:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  Markdown: ${mdPath}`);
  } else {
    if (!jurisdiction) {
      console.error("--jurisdiction is required for single-mode analysis.");
      process.exit(1);
    }

    console.log(`Jurisdiction: ${jurisdiction}`);
    if (scenario) {
      console.log(`Scenario: ${scenario}`);
    }

    // Compute and save fresh snapshot
    const snapshot = computeTrendSnapshot(topic, jurisdiction, scenario || "");

    const snapshotDir = path.join("reports", "trends", topic, jurisdiction);
    if (!fs.existsSync(snapshotDir)) {
      fs.mkdirSync(snapshotDir, { recursive: true });
    }

    const snapName = `${timestamp}`;
    const snapJsonPath = path.join(snapshotDir, `${snapName}.json`);
    const snapMdPath = path.join(snapshotDir, `${snapName}.md`);

    fs.writeFileSync(snapJsonPath, JSON.stringify(snapshot, null, 2), "utf-8");
    fs.writeFileSync(snapMdPath, snapshotToMarkdown(snapshot), "utf-8");

    console.log(`\nSnapshot written:`);
    console.log(`  JSON: ${snapJsonPath}`);
    console.log(`  Markdown: ${snapMdPath}`);

    // Compute full trend analysis
    const analysis = computeTrendAnalysis(
      topic,
      jurisdiction,
      scenario || undefined
    );

    console.log(`\nAnalysis:`);
    console.log(`  Snapshots: ${analysis.snapshots.length}`);
    console.log(`  Volatility: ${analysis.volatilityScore}`);
    console.log(`  Rule changes: ${analysis.ruleChanges.length}`);
    console.log(`  Similarity drift points: ${analysis.similarityDrift.length}`);

    const analysisJsonPath = path.join(snapshotDir, `analysis-${timestamp}.json`);
    const analysisMdPath = path.join(snapshotDir, `analysis-${timestamp}.md`);

    fs.writeFileSync(analysisJsonPath, JSON.stringify(analysis, null, 2), "utf-8");
    fs.writeFileSync(analysisMdPath, analysisToMarkdown(analysis), "utf-8");

    console.log(`\nAnalysis written:`);
    console.log(`  JSON: ${analysisJsonPath}`);
    console.log(`  Markdown: ${analysisMdPath}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
