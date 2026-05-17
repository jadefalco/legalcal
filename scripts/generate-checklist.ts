#!/usr/bin/env tsx
/**
 * CLI script: generate-checklist
 *
 * Accepts --topic, --jurisdiction, and --scenario flags,
 * generates a compliance checklist, and writes to:
 *   reports/checklists/{topic}-{jurisdiction}-{timestamp}.json
 *   reports/checklists/{topic}-{jurisdiction}-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import { authorityBundle } from "../lib/authority/bundle";
import { generateChecklist } from "../lib/authority/checklist";

function parseArgs(): { topic: string; jurisdiction: string; scenario: string } {
  const args = process.argv.slice(2);
  let topic = "";
  let jurisdiction = "";
  let scenario = "";

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
    }
  }

  if (!topic || !jurisdiction || !scenario) {
    console.error(
      "Usage: npx tsx scripts/generate-checklist.ts --topic <topic> --jurisdiction <code> --scenario <scenario>"
    );
    console.error(
      'Example: npx tsx scripts/generate-checklist.ts --topic rent-increase --jurisdiction bc --scenario "Proposed rent increase of 5% with 30 days notice."'
    );
    process.exit(1);
  }

  return { topic, jurisdiction, scenario };
}

function toMarkdown(checklist: ReturnType<typeof generateChecklist>): string {
  let md = `# ${checklist.title}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;

  if (checklist.preconditions.length > 0) {
    md += `## Preconditions\n`;
    for (const item of checklist.preconditions) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.steps.length > 0) {
    md += `## Steps\n`;
    let i = 1;
    for (const item of checklist.steps) {
      md += `${i}. ${item}\n`;
      i++;
    }
    md += `\n`;
  }

  if (checklist.documents.length > 0) {
    md += `## Documents\n`;
    for (const item of checklist.documents) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.datesToCheck.length > 0) {
    md += `## Dates to Check\n`;
    for (const item of checklist.datesToCheck) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.uncertainties.length > 0) {
    md += `## Uncertainties\n`;
    for (const item of checklist.uncertainties) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.warnings.length > 0) {
    md += `## Warnings\n`;
    for (const item of checklist.warnings) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.citations.length > 0) {
    md += `## Citations\n`;
    for (const item of checklist.citations) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  return md;
}

async function main() {
  const { topic, jurisdiction, scenario } = parseArgs();

  console.log(`Generating compliance checklist...`);
  console.log(`Topic: ${topic}`);
  console.log(`Jurisdiction: ${jurisdiction}`);
  console.log(`Scenario: ${scenario}`);

  const rule = authorityBundle[topic]?.[jurisdiction];
  if (!rule) {
    console.error(`Rule not found for ${topic} / ${jurisdiction}`);
    process.exit(1);
  }

  const checklist = generateChecklist(topic, jurisdiction, scenario, rule);

  console.log(`\nChecklist:`);
  console.log(`  Title: ${checklist.title}`);
  console.log(`  Preconditions: ${checklist.preconditions.length}`);
  console.log(`  Steps: ${checklist.steps.length}`);
  console.log(`  Documents: ${checklist.documents.length}`);
  console.log(`  Dates to check: ${checklist.datesToCheck.length}`);
  console.log(`  Uncertainties: ${checklist.uncertainties.length}`);
  console.log(`  Warnings: ${checklist.warnings.length}`);
  console.log(`  Citations: ${checklist.citations.length}`);

  // Ensure output directory exists
  const outDir = path.join("reports", "checklists");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const baseName = `${topic}-${jurisdiction}-${timestamp}`;

  const jsonPath = path.join(outDir, `${baseName}.json`);
  const mdPath = path.join(outDir, `${baseName}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(checklist, null, 2), "utf-8");
  fs.writeFileSync(mdPath, toMarkdown(checklist), "utf-8");

  console.log(`\nWritten:`);
  console.log(`  JSON: ${jsonPath}`);
  console.log(`  Markdown: ${mdPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
