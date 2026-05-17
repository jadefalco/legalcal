#!/usr/bin/env tsx
/**
 * CLI script: run-multi-scenario
 *
 * Accepts --topic and --scenario flags, runs the scenario across all
 * jurisdictions, and writes results to:
 *   reports/multi-scenario/{topic}-{timestamp}.json
 *   reports/multi-scenario/{topic}-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import { runScenarioAcrossJurisdictions } from "../lib/authority/multiScenario";

function parseArgs(): { topic: string; scenario: string } {
  const args = process.argv.slice(2);
  let topic = "";
  let scenario = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === "--scenario" && args[i + 1]) {
      scenario = args[i + 1];
      i++;
    }
  }

  if (!topic || !scenario) {
    console.error("Usage: npx tsx scripts/run-multi-scenario.ts --topic <topic> --scenario <scenario>");
    console.error("Example: npx tsx scripts/run-multi-scenario.ts --topic rent-increase --scenario \"Proposed rent increase of 5% with 30 days notice.\"");
    process.exit(1);
  }

  return { topic, scenario };
}

function toMarkdown(result: ReturnType<typeof runScenarioAcrossJurisdictions>): string {
  const topicLabel = result.topic.replace(/-/g, " ");
  let md = `# Multi-Jurisdiction Scenario Analysis — ${topicLabel}\n\n`;
  md += `**Scenario:**\n> ${result.scenario}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Jurisdictions analyzed:** ${result.results.length}\n\n`;
  md += `---\n\n`;

  for (const r of result.results) {
    md += `## ${r.name} (${r.jurisdiction.toUpperCase()})\n\n`;

    if (r.isPlaceholder) {
      md += `> ⚠️ Placeholder rule — structured data is not yet available.\n\n`;
    } else if (!r.hasRule) {
      md += `> ⚠️ No rule found for this topic and jurisdiction.\n\n`;
    }

    md += `### Scenario Analysis\n`;
    md += `- ${r.analysis.scenarioSummary}\n`;
    if (r.analysis.potentialIssues.length > 0) {
      md += `- **Issues:** ${r.analysis.potentialIssues.join("; ")}\n`;
    }
    if (r.analysis.missingInformation.length > 0) {
      md += `- **Missing:** ${r.analysis.missingInformation.join("; ")}\n`;
    }
    md += `\n`;

    md += `### Compliance Path\n`;
    if (r.compliance.steps.length > 0) {
      for (const step of r.compliance.steps) {
        md += `- ${step}\n`;
      }
    }
    if (r.compliance.warnings.length > 0) {
      md += `\n**Warnings:** ${r.compliance.warnings.join("; ")}\n`;
    }
    if (r.compliance.assumptions.length > 0) {
      md += `\n**Assumptions:** ${r.compliance.assumptions.join("; ")}\n`;
    }
    if (r.compliance.citations.length > 0) {
      md += `\n**Citations:** ${r.compliance.citations.join("; ")}\n`;
    }
    md += `\n`;

    md += `### Outcome Reasoning\n`;
    md += `- ${r.outcome.likelyOutcome}\n`;
    if (r.outcome.factors.length > 0) {
      md += `- **Factors:** ${r.outcome.factors.join("; ")}\n`;
    }
    if (r.outcome.uncertainties.length > 0) {
      md += `- **Uncertainties:** ${r.outcome.uncertainties.join("; ")}\n`;
    }
    if (r.outcome.alternativePaths.length > 0) {
      md += `- **Alternatives:** ${r.outcome.alternativePaths.join("; ")}\n`;
    }
    md += `\n---\n\n`;
  }

  return md;
}

async function main() {
  const { topic, scenario } = parseArgs();

  console.log(`Running multi-scenario analysis...`);
  console.log(`Topic: ${topic}`);
  console.log(`Scenario: ${scenario}`);

  const result = runScenarioAcrossJurisdictions(topic, scenario);

  const realCount = result.results.filter((r) => !r.isPlaceholder && r.hasRule).length;
  const placeholderCount = result.results.filter((r) => r.isPlaceholder).length;

  console.log(`\nResults:`);
  console.log(`  Total jurisdictions: ${result.results.length}`);
  console.log(`  Real rules: ${realCount}`);
  console.log(`  Placeholders: ${placeholderCount}`);

  // Ensure output directory exists
  const outDir = path.join("reports", "multi-scenario");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const baseName = `${topic}-${timestamp}`;

  const jsonPath = path.join(outDir, `${baseName}.json`);
  const mdPath = path.join(outDir, `${baseName}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf-8");
  fs.writeFileSync(mdPath, toMarkdown(result), "utf-8");

  console.log(`\nWritten:`);
  console.log(`  JSON: ${jsonPath}`);
  console.log(`  Markdown: ${mdPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
