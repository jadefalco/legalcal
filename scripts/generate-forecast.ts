#!/usr/bin/env tsx
/**
 * CLI script: generate-forecast
 *
 * Accepts --topic, --jurisdiction, and --national flags.
 * Generates regulatory forecasts and writes to:
 *   reports/forecast/{topic}/{jurisdiction}-{timestamp}.json
 *   reports/forecast/{topic}/{jurisdiction}-{timestamp}.md
 *
 * With --national, runs a national forecast:
 *   reports/forecast/{topic}/national-{timestamp}.json
 *   reports/forecast/{topic}/national-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import {
  computeForecast,
  computeNationalForecast,
} from "../lib/authority/forecast";

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
      "Usage: npx tsx scripts/generate-forecast.ts --topic <topic> [--jurisdiction <code>] [--scenario <text>] [--national]"
    );
    console.error(
      'Single: npx tsx scripts/generate-forecast.ts --topic rent-increase --jurisdiction bc --scenario "Proposed rent increase of 5% with 30 days notice."'
    );
    console.error(
      'National: npx tsx scripts/generate-forecast.ts --topic rent-increase --national'
    );
    process.exit(1);
  }

  return { topic, jurisdiction, scenario, national };
}

function forecastToMarkdown(
  forecast: ReturnType<typeof computeForecast>
): string {
  let md = `# Regulatory Forecast — ${forecast.topic.replace(/-/g, " ")} / ${forecast.jurisdiction.toUpperCase()}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;

  md += `## Predicted Risk Levels\n\n`;
  md += `| Category | Predicted | Confidence |\n`;
  md += `|----------|-----------|------------|\n`;
  md += `| Structural | ${forecast.predictedStructuralRisk} | ${(forecast.confidence.structural * 100).toFixed(0)}% |\n`;
  md += `| Procedural | ${forecast.predictedProceduralRisk} | ${(forecast.confidence.procedural * 100).toFixed(0)}% |\n`;
  md += `| Documentation | ${forecast.predictedDocumentationRisk} | ${(forecast.confidence.documentation * 100).toFixed(0)}% |\n`;
  md += `| Overall | ${forecast.predictedOverallRisk} | ${(forecast.confidence.overall * 100).toFixed(0)}% |\n`;
  md += `\n`;

  md += `## Supporting Metrics\n\n`;
  md += `- **Volatility:** ${forecast.volatility}\n`;
  md += `- **Similarity Shift:** ${forecast.similarityShift.toFixed(3)}\n`;
  md += `- **Cluster Movement:** ${forecast.clusterMovement}\n\n`;

  md += `## Drivers\n\n`;
  for (const d of forecast.drivers) {
    md += `- ${d}\n`;
  }
  md += `\n`;

  if (forecast.lastSnapshot) {
    md += `## Last Snapshot\n\n`;
    md += `- **Date:** ${forecast.lastSnapshot.timestamp}\n`;
    md += `- **Version:** ${forecast.lastSnapshot.ruleVersion}\n`;
    md += `- **Current Overall Risk:** ${forecast.lastSnapshot.overallRisk}\n\n`;
  }

  return md;
}

function nationalToMarkdown(
  report: ReturnType<typeof computeNationalForecast>
): string {
  let md = `# National Forecast — ${report.topic.replace(/-/g, " ")}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Jurisdictions analyzed:** ${report.jurisdictions.length}\n\n`;

  md += `| Jurisdiction | Predicted Risk | Confidence | Trend | Cluster Movement | Volatility |\n`;
  md += `|--------------|----------------|------------|-------|------------------|------------|\n`;
  for (const j of report.jurisdictions) {
    md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.predictedRisk} | ${(j.confidence * 100).toFixed(0)}% | ${j.trendDirection} | ${j.clusterMovement} | ${j.volatility} |\n`;
  }
  md += `\n`;

  const high = report.jurisdictions.filter((j) => j.predictedRisk === "high").length;
  const medium = report.jurisdictions.filter((j) => j.predictedRisk === "medium").length;
  const low = report.jurisdictions.filter((j) => j.predictedRisk === "low").length;
  const tightening = report.jurisdictions.filter((j) => j.trendDirection === "tightening").length;
  const loosening = report.jurisdictions.filter((j) => j.trendDirection === "loosening").length;

  md += `## Summary\n`;
  md += `- **Predicted High Risk:** ${high}\n`;
  md += `- **Predicted Medium Risk:** ${medium}\n`;
  md += `- **Predicted Low Risk:** ${low}\n`;
  md += `- **Tightening:** ${tightening}\n`;
  md += `- **Loosening:** ${loosening}\n`;

  return md;
}

async function main() {
  const { topic, jurisdiction, scenario, national } = parseArgs();

  console.log(`Generating forecast...`);
  console.log(`Topic: ${topic}`);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outDir = path.join("reports", "forecast", topic);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (national) {
    console.log(`Mode: National forecast across all jurisdictions`);
    const report = computeNationalForecast(topic, scenario || undefined);

    console.log(`\nResults:`);
    console.log(`  Total jurisdictions: ${report.jurisdictions.length}`);
    console.log(
      `  Predicted high risk: ${report.jurisdictions.filter((j) => j.predictedRisk === "high").length}`
    );
    console.log(
      `  Predicted medium risk: ${report.jurisdictions.filter((j) => j.predictedRisk === "medium").length}`
    );
    console.log(
      `  Predicted low risk: ${report.jurisdictions.filter((j) => j.predictedRisk === "low").length}`
    );

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
      console.error("--jurisdiction is required for single-mode forecast.");
      process.exit(1);
    }

    console.log(`Jurisdiction: ${jurisdiction}`);
    if (scenario) {
      console.log(`Scenario: ${scenario}`);
    }

    const forecast = computeForecast(topic, jurisdiction, scenario || undefined);

    console.log(`\nForecast:`);
    console.log(`  Structural: ${forecast.predictedStructuralRisk} (${(forecast.confidence.structural * 100).toFixed(0)}% confidence)`);
    console.log(`  Procedural: ${forecast.predictedProceduralRisk} (${(forecast.confidence.procedural * 100).toFixed(0)}% confidence)`);
    console.log(`  Documentation: ${forecast.predictedDocumentationRisk} (${(forecast.confidence.documentation * 100).toFixed(0)}% confidence)`);
    console.log(`  Overall: ${forecast.predictedOverallRisk} (${(forecast.confidence.overall * 100).toFixed(0)}% confidence)`);
    console.log(`  Volatility: ${forecast.volatility}`);
    console.log(`  Similarity Shift: ${forecast.similarityShift.toFixed(3)}`);
    console.log(`  Cluster Movement: ${forecast.clusterMovement}`);
    console.log(`  Drivers: ${forecast.drivers.length}`);

    const baseName = `${jurisdiction}-${timestamp}`;
    const jsonPath = path.join(outDir, `${baseName}.json`);
    const mdPath = path.join(outDir, `${baseName}.md`);

    fs.writeFileSync(jsonPath, JSON.stringify(forecast, null, 2), "utf-8");
    fs.writeFileSync(mdPath, forecastToMarkdown(forecast), "utf-8");

    console.log(`\nWritten:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  Markdown: ${mdPath}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
