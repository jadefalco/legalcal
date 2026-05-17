#!/usr/bin/env tsx
/**
 * CLI script: generate-risk
 *
 * Accepts --topic, --jurisdiction, --scenario, and --multi flags.
 * Generates risk scores and writes to:
 *   reports/risk/{topic}-{jurisdiction}-{timestamp}.json
 *   reports/risk/{topic}-{jurisdiction}-{timestamp}.md
 *
 * With --multi, runs a national scan across all jurisdictions:
 *   reports/risk/{topic}-national-{timestamp}.json
 *   reports/risk/{topic}-national-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import { authorityBundle } from "../lib/authority/bundle";
import { scoreRisk, scoreRiskForAllJurisdictions } from "../lib/authority/risk";

function parseArgs(): {
  topic: string;
  jurisdiction: string;
  scenario: string;
  multi: boolean;
} {
  const args = process.argv.slice(2);
  let topic = "";
  let jurisdiction = "";
  let scenario = "";
  let multi = false;

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
    } else if (args[i] === "--multi") {
      multi = true;
    }
  }

  if (!topic || !scenario) {
    console.error(
      "Usage: npx tsx scripts/generate-risk.ts --topic <topic> --scenario <scenario> [--jurisdiction <code>] [--multi]"
    );
    console.error(
      'Single: npx tsx scripts/generate-risk.ts --topic rent-increase --jurisdiction bc --scenario "Proposed rent increase of 5% with 30 days notice."'
    );
    console.error(
      'Multi:  npx tsx scripts/generate-risk.ts --topic rent-increase --scenario "Proposed rent increase of 5% with 30 days notice." --multi'
    );
    process.exit(1);
  }

  return { topic, jurisdiction, scenario, multi };
}

function scoreToMarkdown(score: ReturnType<typeof scoreRisk>): string {
  let md = `## ${score.name} (${score.jurisdiction.toUpperCase()})\n\n`;
  md += `| Category | Risk |\n`;
  md += `|----------|------|\n`;
  md += `| Structural | ${score.structuralRisk} |\n`;
  md += `| Procedural | ${score.proceduralRisk} |\n`;
  md += `| Documentation | ${score.documentationRisk} |\n`;
  md += `| Overall | ${score.overallRisk} |\n`;
  md += `\n`;

  if (score.factors.length > 0) {
    md += `**Factors:** ${score.factors.join("; ")}\n\n`;
  }
  if (score.uncertainties.length > 0) {
    md += `**Uncertainties:** ${score.uncertainties.join("; ")}\n\n`;
  }
  if (score.warnings.length > 0) {
    md += `**Warnings:** ${score.warnings.join("; ")}\n\n`;
  }

  md += `---\n\n`;
  return md;
}

function multiResultToMarkdown(result: ReturnType<typeof scoreRiskForAllJurisdictions>): string {
  const topicLabel = result.topic.replace(/-/g, " ");
  let md = `# National Risk Matrix — ${topicLabel}\n\n`;
  md += `**Scenario:**\n> ${result.scenario}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Jurisdictions analyzed:** ${result.results.length}\n\n`;

  const high = result.results.filter((r) => r.overallRisk === "high").length;
  const medium = result.results.filter((r) => r.overallRisk === "medium").length;
  const low = result.results.filter((r) => r.overallRisk === "low").length;

  md += `**Summary:** ${high} high, ${medium} medium, ${low} low\n\n`;
  md += `---\n\n`;

  for (const r of result.results) {
    md += scoreToMarkdown(r);
  }

  return md;
}

async function main() {
  const { topic, jurisdiction, scenario, multi } = parseArgs();

  console.log(`Generating risk ${multi ? "matrix" : "score"}...`);
  console.log(`Topic: ${topic}`);
  console.log(`Scenario: ${scenario}`);

  const outDir = path.join("reports", "risk");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

  if (multi) {
    const result = scoreRiskForAllJurisdictions(topic, scenario);

    console.log(`\nResults:`);
    console.log(`  Total jurisdictions: ${result.results.length}`);
    console.log(
      `  High risk: ${result.results.filter((r) => r.overallRisk === "high").length}`
    );
    console.log(
      `  Medium risk: ${result.results.filter((r) => r.overallRisk === "medium").length}`
    );
    console.log(
      `  Low risk: ${result.results.filter((r) => r.overallRisk === "low").length}`
    );

    const baseName = `${topic}-national-${timestamp}`;
    const jsonPath = path.join(outDir, `${baseName}.json`);
    const mdPath = path.join(outDir, `${baseName}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf-8");
    fs.writeFileSync(mdPath, multiResultToMarkdown(result), "utf-8");

    console.log(`\nWritten:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  Markdown: ${mdPath}`);
  } else {
    if (!jurisdiction) {
      console.error("--jurisdiction is required for single-mode scoring.");
      process.exit(1);
    }

    const rule = authorityBundle[topic]?.[jurisdiction];
    if (!rule) {
      console.error(`Rule not found for ${topic} / ${jurisdiction}`);
      process.exit(1);
    }

    const score = scoreRisk(topic, jurisdiction, scenario, rule);

    console.log(`\nRisk Score:`);
    console.log(`  Structural: ${score.structuralRisk}`);
    console.log(`  Procedural: ${score.proceduralRisk}`);
    console.log(`  Documentation: ${score.documentationRisk}`);
    console.log(`  Overall: ${score.overallRisk}`);
    console.log(`  Factors: ${score.factors.length}`);
    console.log(`  Uncertainties: ${score.uncertainties.length}`);
    console.log(`  Warnings: ${score.warnings.length}`);

    const baseName = `${topic}-${jurisdiction}-${timestamp}`;
    const jsonPath = path.join(outDir, `${baseName}.json`);
    const mdPath = path.join(outDir, `${baseName}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(score, null, 2), "utf-8");
    fs.writeFileSync(mdPath, scoreToMarkdown(score), "utf-8");

    console.log(`\nWritten:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  Markdown: ${mdPath}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
