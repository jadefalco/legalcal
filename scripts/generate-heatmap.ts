#!/usr/bin/env tsx
/**
 * CLI script: generate-heatmap
 *
 * Accepts --topic and --scenario flags, generates heatmap data,
 * and writes to:
 *   reports/heatmaps/{topic}-{timestamp}.json
 *   reports/heatmaps/{topic}-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import { generateHeatmapData } from "../lib/authority/heatmap";

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
    console.error(
      "Usage: npx tsx scripts/generate-heatmap.ts --topic <topic> --scenario <scenario>"
    );
    console.error(
      'Example: npx tsx scripts/generate-heatmap.ts --topic rent-increase --scenario "Proposed rent increase of 5% with 30 days notice."'
    );
    process.exit(1);
  }

  return { topic, scenario };
}

function toMarkdown(data: ReturnType<typeof generateHeatmapData>): string {
  const topicLabel = data.topic.replace(/-/g, " ");
  let md = `# National Compliance Heatmap — ${topicLabel}\n\n`;
  md += `**Scenario:**\n> ${data.scenario}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;

  const ca = data.results.filter((r) => r.country === "CA");
  const us = data.results.filter((r) => r.country === "US");

  md += `## Canada\n`;
  for (const r of ca) {
    const status = r.isPlaceholder ? "placeholder" : r.overallRisk;
    md += `- ${r.name} (${r.jurisdiction.toUpperCase()}): ${status}\n`;
  }
  md += `\n`;

  md += `## United States\n`;
  for (const r of us) {
    const status = r.isPlaceholder ? "placeholder" : r.overallRisk;
    md += `- ${r.name} (${r.jurisdiction.toUpperCase()}): ${status}\n`;
  }
  md += `\n`;

  const high = data.results.filter((r) => !r.isPlaceholder && r.overallRisk === "high").length;
  const medium = data.results.filter((r) => !r.isPlaceholder && r.overallRisk === "medium").length;
  const low = data.results.filter((r) => !r.isPlaceholder && r.overallRisk === "low").length;
  const placeholder = data.results.filter((r) => r.isPlaceholder).length;

  md += `## Summary\n`;
  md += `- **High risk:** ${high}\n`;
  md += `- **Medium risk:** ${medium}\n`;
  md += `- **Low risk:** ${low}\n`;
  md += `- **Placeholder / No data:** ${placeholder}\n`;

  return md;
}

async function main() {
  const { topic, scenario } = parseArgs();

  console.log(`Generating heatmap data...`);
  console.log(`Topic: ${topic}`);
  console.log(`Scenario: ${scenario}`);

  const data = generateHeatmapData(topic, scenario);

  const high = data.results.filter((r) => !r.isPlaceholder && r.overallRisk === "high").length;
  const medium = data.results.filter((r) => !r.isPlaceholder && r.overallRisk === "medium").length;
  const low = data.results.filter((r) => !r.isPlaceholder && r.overallRisk === "low").length;
  const placeholder = data.results.filter((r) => r.isPlaceholder).length;

  console.log(`\nResults:`);
  console.log(`  Total jurisdictions: ${data.results.length}`);
  console.log(`  High risk: ${high}`);
  console.log(`  Medium risk: ${medium}`);
  console.log(`  Low risk: ${low}`);
  console.log(`  Placeholder: ${placeholder}`);

  const outDir = path.join("reports", "heatmaps");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const baseName = `${topic}-${timestamp}`;

  const jsonPath = path.join(outDir, `${baseName}.json`);
  const mdPath = path.join(outDir, `${baseName}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
  fs.writeFileSync(mdPath, toMarkdown(data), "utf-8");

  console.log(`\nWritten:`);
  console.log(`  JSON: ${jsonPath}`);
  console.log(`  Markdown: ${mdPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
