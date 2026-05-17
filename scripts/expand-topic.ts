#!/usr/bin/env tsx
/**
 * Topic Expansion Orchestrator
 *
 * Runs the full pipeline to scaffold a new topic:
 * 1. Create placeholder rules
 * 2. Generate history files
 * 3. Register topic
 * 4. Update calculators config
 * 5. Ingest authority bundle
 * 6. Validate build
 *
 * Usage:
 *   npx tsx scripts/expand-topic.ts --topic utilities --label "Utilities and Essential Services"
 */

import { execSync } from "child_process";

function parseArgs(): { topic: string; label: string; description?: string } {
  const args = process.argv.slice(2);
  let topic = "";
  let label = "";
  let description = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === "--label" && args[i + 1]) {
      label = args[i + 1];
      i++;
    } else if (args[i] === "--description" && args[i + 1]) {
      description = args[i + 1];
      i++;
    }
  }

  if (!topic || !label) {
    console.error(
      "Usage: npx tsx scripts/expand-topic.ts --topic <id> --label <label> [--description <text>]"
    );
    console.error(
      'Example: npx tsx scripts/expand-topic.ts --topic utilities --label "Utilities and Essential Services"'
    );
    process.exit(1);
  }

  return { topic, label, description };
}

async function main() {
  const { topic, label, description } = parseArgs();

  console.log("╔══════════════════════════════════════════════╗");
  console.log("║        Topic Expansion Orchestrator          ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log(`\nTopic: ${topic}`);
  console.log(`Label: ${label}\n`);

  // Step 1: Create topic scaffold
  console.log("▶ Step 1: Creating topic scaffold…");
  const createArgs = [
    "tsx",
    "scripts/create-topic.ts",
    "--topic",
    topic,
    "--label",
    label,
  ];
  if (description) {
    createArgs.push("--description", description);
  }
  createArgs.push("--skip-ingest"); // We'll ingest after all files are ready

  execSync(`npx ${createArgs.join(" ")}`, {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  // Step 2: Ingest authority bundle
  console.log("\n▶ Step 2: Ingesting authority bundle…");
  execSync("npm run ingest:authority", {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  // Step 3: Validate build
  console.log("\n▶ Step 3: Validating build…");
  try {
    execSync("npm run build", {
      cwd: process.cwd(),
      stdio: "inherit",
    });
    console.log("\n✓ Build validated successfully");
  } catch (e) {
    console.error("\n✗ Build failed. Fix errors and re-run.");
    process.exit(1);
  }

  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║           Expansion Complete!                ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log(`\nTopic "${topic}" is now live.`);
  console.log(`  Calculator: /calculators/${topic}`);
  console.log(`  Admin: /admin/rules/${topic}`);
  console.log(`  Unified: /admin/unified/${topic}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Edit placeholder rules in data/authority/*/${topic}.json`);
  console.log(`  2. Add citations and real data`);
  console.log(`  3. Update version numbers when rules change`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
