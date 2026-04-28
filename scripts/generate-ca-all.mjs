/**
 * Canada Unified Generation Pipeline
 *
 * Runs all Canada generators:
 *   - Per-province calculators
 *   - Content pages (eviction)
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

// ── Per-province calculator generation ───────────────────────────────────────

const provincesConfigPath = path.join(root, "app/config/caProvinces.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templatePagePath = path.join(root, "templates/caCalculator/page.tsx");
const templateClientPath = path.join(root, "templates/caCalculator/CalculatorClient.tsx");
const outputBase = path.join(root, "app/calculators/ca");

async function generatePerProvinceCalculators() {
  logStart("Canada Per-Province Calculator Generator");

  const provinces = await loadConfig(provincesConfigPath, "caProvinces");
  const calculators = await loadConfig(calculatorsConfigPath, "calculators");

  validateConfig(provinces, "caProvinces");
  validateConfig(calculators, "calculators");

  await validateWithZod(provinces, "app/validation/CAProvincesSchema.ts", "CAProvinces");
  await validateWithZod(calculators, "app/validation/CalculatorsSchema.ts", "Calculators");

  const pageTemplate = loadTemplate(templatePagePath);
  const clientTemplate = loadTemplate(templateClientPath);

  let count = 0;

  for (const calc of calculators) {
    console.log(`  Generating: ${calc.name} (${calc.slug})`);

    for (const key of Object.keys(provinces)) {
      const province = provinces[key];
      const folder = path.join(outputBase, province.slug, calc.slug);
      ensureDirectory(folder);

      const pageContent = pageTemplate
        .replace(/PROVINCE_NAME/g, province.name)
        .replace(/PROVINCE_SLUG/g, province.slug)
        .replace(/PROVINCE_KEY/g, key)
        .replace(/CALCULATOR_NAME/g, calc.name)
        .replace(/CALCULATOR_SLUG/g, calc.slug)
        .replace(/CALCULATOR_DESCRIPTION/g, calc.description);

      const clientContent = clientTemplate
        .replace(/PROVINCE_NAME/g, province.name)
        .replace(/PROVINCE_KEY/g, key)
        .replace(/CALCULATOR_NAME/g, calc.name)
        .replace(/CALCULATOR_DESCRIPTION/g, calc.description);

      writePage(path.join(folder, "page.tsx"), pageContent);
      writePage(path.join(folder, "CalculatorClient.tsx"), clientContent);
      count += 2;
    }

    console.log(`  ✔ Finished: ${calc.name}`);
  }

  logSuccess("All Canada per-province calculators generated", count);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║     Canada Unified Generation Pipeline                       ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");

  // 1. Per-province calculators
  await generatePerProvinceCalculators();

  // 2. Content page generators
  run("generateCanadaEvictionPages.cjs");

  // 3. National calculators and documents
  run("generateProvinceCalculators.mjs");
  run("generateProvinceDocuments.mjs");

  // 4. Indexes
  run("generate-ca-indexes.mjs");

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║     Canada Pipeline Complete                                 ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");
}

main().catch(logError);
