/**
 * US Unified Generation Pipeline
 *
 * Runs all US generators:
 *   - Per-state calculators
 *   - Content pages (eviction, security-deposit, rent-increase, lease-termination)
 *   - National calculators
 *   - National documents
 *   - Indexes
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import {
  resolveRoot,
  ensureDirectory,
  loadConfig,
  validateConfig,
  validateWithZod,
  loadTemplate,
  writePage,
  logStart,
  logSuccess,
  logError,
} from "./lib/generator-utils.mjs";

const root = resolveRoot();
const scriptsDir = path.join(root, "scripts");

// ── Sub-generator runner ─────────────────────────────────────────────────────

function run(script) {
  const scriptPath = path.join(scriptsDir, script);
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Script not found: ${scriptPath}`);
  }
  console.log(`\n▶ Running ${script}...\n`);
  execSync(`npx tsx "${scriptPath}"`, {
    stdio: "inherit",
    cwd: root,
    env: process.env,
  });
}

// ── Per-state calculator generation ──────────────────────────────────────────

const statesConfigPath = path.join(root, "app/config/usStates.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templatePagePath = path.join(root, "templates/usCalculator/page.tsx");
const templateClientPath = path.join(root, "templates/usCalculator/CalculatorClient.tsx");
const outputBase = path.join(root, "app/calculators/us");

async function generatePerStateCalculators() {
  logStart("US Per-State Calculator Generator");

  const states = await loadConfig(statesConfigPath, "usStates");
  const calculators = await loadConfig(calculatorsConfigPath, "calculators");

  validateConfig(states, "usStates");
  validateConfig(calculators, "calculators");

  await validateWithZod(states, "app/validation/USStatesSchema.ts", "USStates");
  await validateWithZod(calculators, "app/validation/CalculatorsSchema.ts", "Calculators");

  const pageTemplate = loadTemplate(templatePagePath);
  const clientTemplate = loadTemplate(templateClientPath);

  let count = 0;

  for (const calc of calculators) {
    console.log(`  Generating: ${calc.name} (${calc.slug})`);

    for (const key of Object.keys(states)) {
      const state = states[key];
      const folder = path.join(outputBase, state.slug, calc.slug);
      ensureDirectory(folder);

      const pageContent = pageTemplate
        .replace(/STATE_NAME/g, state.name)
        .replace(/STATE_SLUG/g, state.slug)
        .replace(/STATE_KEY/g, key)
        .replace(/CALCULATOR_NAME/g, calc.name)
        .replace(/CALCULATOR_SLUG/g, calc.slug)
        .replace(/CALCULATOR_DESCRIPTION/g, calc.description);

      const clientContent = clientTemplate
        .replace(/STATE_NAME/g, state.name)
        .replace(/STATE_KEY/g, key)
        .replace(/CALCULATOR_NAME/g, calc.name)
        .replace(/CALCULATOR_DESCRIPTION/g, calc.description);

      writePage(path.join(folder, "page.tsx"), pageContent);
      writePage(path.join(folder, "CalculatorClient.tsx"), clientContent);
      count += 2;
    }

    console.log(`  ✔ Finished: ${calc.name}`);
  }

  logSuccess("All US per-state calculators generated", count);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║     US Unified Generation Pipeline                           ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");

  // 1. Per-state calculators
  await generatePerStateCalculators();

  // 2. Content page generators
  run("generateStatePages.cjs");
  run("generateSecurityDepositPages.cjs");
  run("generateStateRentIncreasePages.cjs");
  run("generateStateLeaseTerminationPages.cjs");

  // 3. National calculators and documents
  run("generateStateCalculators.mjs");
  run("generateStateDocuments.mjs");

  // 4. Indexes
  run("generate-us-indexes.mjs");

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║     US Pipeline Complete                                     ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");
}

main().catch(logError);
