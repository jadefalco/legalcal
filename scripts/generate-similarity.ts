#!/usr/bin/env tsx
/**
 * CLI script: generate-similarity
 *
 * Accepts --topic, --scenario, and --k flags.
 * Generates a similarity matrix and optional clusters, then writes to:
 *   reports/similarity/{topic}-{timestamp}.json
 *   reports/similarity/{topic}-{timestamp}.md
 */

import * as fs from "fs";
import * as path from "path";
import {
  computeSimilarityMatrix,
  computeClusters,
} from "../lib/authority/similarity";

function parseArgs(): { topic: string; scenario: string; k: number } {
  const args = process.argv.slice(2);
  let topic = "";
  let scenario = "";
  let k = 3;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === "--scenario" && args[i + 1]) {
      scenario = args[i + 1];
      i++;
    } else if (args[i] === "--k" && args[i + 1]) {
      const parsed = parseInt(args[i + 1], 10);
      if (!isNaN(parsed)) k = parsed;
      i++;
    }
  }

  if (!topic || !scenario) {
    console.error(
      "Usage: npx tsx scripts/generate-similarity.ts --topic <topic> --scenario <scenario> [--k <clusters>]"
    );
    console.error(
      'Example: npx tsx scripts/generate-similarity.ts --topic rent-increase --scenario "Proposed rent increase of 5% with 30 days notice." --k 4'
    );
    process.exit(1);
  }

  return { topic, scenario, k };
}

function toMarkdown(
  matrix: ReturnType<typeof computeSimilarityMatrix>,
  clusters: ReturnType<typeof computeClusters> | null
): string {
  const topicLabel = matrix.topic.replace(/-/g, " ");
  let md = `# Jurisdiction Similarity Matrix — ${topicLabel}\n\n`;
  md += `**Scenario:**\n> ${matrix.scenario}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Jurisdictions analyzed:** ${matrix.matrix.length}\n\n`;

  const valid = matrix.vectors.filter((v) => !v.isPlaceholder);
  const placeholder = matrix.vectors.filter((v) => v.isPlaceholder);
  md += `**Valid rules:** ${valid.length} · **Placeholders:** ${placeholder.length}\n\n`;

  // Clusters
  if (clusters && clusters.length > 0) {
    md += `## Clusters\n\n`;
    for (const c of clusters) {
      md += `### Cluster ${c.clusterId + 1}: ${c.label}\n`;
      md += `- **Members:** ${c.memberNames.join(", ")}\n`;
      md += `- **Count:** ${c.members.length}\n\n`;
    }
    md += `---\n\n`;
  }

  // Similarity matrix
  md += `## Similarity Matrix\n\n`;
  for (const row of matrix.matrix.slice(0, 20)) {
    if (row.similarities.length === 0) continue;
    const top = row.similarities.slice(0, 5);
    md += `### ${row.name} (${row.jurisdiction.toUpperCase()})\n`;
    for (const sim of top) {
      md += `- ${sim.name} (${sim.jurisdiction.toUpperCase()}): ${(sim.score * 100).toFixed(1)}%\n`;
    }
    md += `\n`;
  }

  return md;
}

async function main() {
  const { topic, scenario, k } = parseArgs();

  console.log(`Generating similarity matrix...`);
  console.log(`Topic: ${topic}`);
  console.log(`Scenario: ${scenario}`);
  console.log(`Clusters (k): ${k}`);

  const outDir = path.join("reports", "similarity");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const matrix = computeSimilarityMatrix(topic, scenario);

  console.log(`\nMatrix computed:`);
  console.log(`  Total jurisdictions: ${matrix.matrix.length}`);
  console.log(
    `  Valid rules: ${matrix.vectors.filter((v) => !v.isPlaceholder).length}`
  );
  console.log(
    `  Placeholders: ${matrix.vectors.filter((v) => v.isPlaceholder).length}`
  );

  let clusters: ReturnType<typeof computeClusters> | null = null;
  if (k > 0) {
    clusters = computeClusters(topic, scenario, k);
    console.log(`  Clusters (k=${k}): ${clusters.length}`);
    for (const c of clusters) {
      console.log(`    Cluster ${c.clusterId + 1}: ${c.members.length} members — ${c.label}`);
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const baseName = `${topic}-${timestamp}`;
  const jsonPath = path.join(outDir, `${baseName}.json`);
  const mdPath = path.join(outDir, `${baseName}.md`);

  const payload = {
    ...matrix,
    clusters,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf-8");
  fs.writeFileSync(mdPath, toMarkdown(matrix, clusters), "utf-8");

  console.log(`\nWritten:`);
  console.log(`  JSON: ${jsonPath}`);
  console.log(`  Markdown: ${mdPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
