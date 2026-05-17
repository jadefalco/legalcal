#!/usr/bin/env tsx
/**
 * CLI script: generate-report
 *
 * Accepts --quarterly, --annual, --topics, and --scenario flags.
 * Generates national regulatory reports and writes to:
 *   reports/national/quarterly-{timestamp}.json
 *   reports/national/quarterly-{timestamp}.md
 *   reports/national/annual-{year}.json
 *   reports/national/annual-{year}.md
 *
 * Usage:
 *   npx tsx scripts/generate-report.ts --quarterly --topics rent-increase,utilities --scenario "..."
 *   npx tsx scripts/generate-report.ts --annual --topics rent-increase --scenario "..."
 */

import * as fs from "fs";
import * as path from "path";
import {
  generateQuarterlyReport,
  generateAnnualReport,
  quarterlyReportToMarkdown,
  annualReportToMarkdown,
} from "../lib/authority/reports";

function parseArgs(): {
  quarterly: boolean;
  annual: boolean;
  topics: string[];
  scenario: string;
} {
  const args = process.argv.slice(2);
  let quarterly = false;
  let annual = false;
  let topics: string[] = [];
  let scenario = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--quarterly") {
      quarterly = true;
    } else if (args[i] === "--annual") {
      annual = true;
    } else if (args[i] === "--topics" && args[i + 1]) {
      topics = args[i + 1].split(",").map((t) => t.trim().toLowerCase());
      i++;
    } else if (args[i] === "--scenario" && args[i + 1]) {
      scenario = args[i + 1];
      i++;
    }
  }

  if (!quarterly && !annual) {
    console.error("Usage: npx tsx scripts/generate-report.ts --quarterly|--annual --topics <topic1,topic2> [--scenario <text>]");
    process.exit(1);
  }

  if (topics.length === 0) {
    console.error("Error: --topics is required.");
    process.exit(1);
  }

  return { quarterly, annual, topics, scenario };
}

async function main() {
  const { quarterly, annual, topics, scenario } = parseArgs();

  const outDir = path.join("reports", "national");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (quarterly) {
    console.log(`Generating quarterly report...`);
    console.log(`Topics: ${topics.join(", ")}`);
    if (scenario) console.log(`Scenario: ${scenario}`);

    const report = generateQuarterlyReport(topics, scenario);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const baseName = `quarterly-${timestamp}`;
    const jsonPath = path.join(outDir, `${baseName}.json`);
    const mdPath = path.join(outDir, `${baseName}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf-8");
    fs.writeFileSync(mdPath, quarterlyReportToMarkdown(report), "utf-8");

    console.log(`\nQuarterly Report — ${report.quarter}`);
    console.log(`Topics analyzed: ${report.topics.length}`);
    for (const t of report.topics) {
      console.log(`  ${t.topic}: ${t.nationalRisk.results.length} jurisdictions, ${t.ruleChanges.length} rule changes`);
    }
    console.log(`\nWritten:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  Markdown: ${mdPath}`);
  }

  if (annual) {
    console.log(`Generating annual report...`);
    console.log(`Topics: ${topics.join(", ")}`);
    if (scenario) console.log(`Scenario: ${scenario}`);

    const report = generateAnnualReport(topics, scenario);
    const baseName = `annual-${report.year}`;
    const jsonPath = path.join(outDir, `${baseName}.json`);
    const mdPath = path.join(outDir, `${baseName}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf-8");
    fs.writeFileSync(mdPath, annualReportToMarkdown(report), "utf-8");

    console.log(`\nAnnual Report — ${report.year}`);
    console.log(`Topics analyzed: ${report.topics.length}`);
    for (const t of report.topics) {
      console.log(`  ${t.topic}: ${t.riskTrends.jurisdictions.length} trend records, ${t.ruleChanges.length} rule changes`);
    }
    console.log(`\nWritten:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  Markdown: ${mdPath}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
