/**
 * Master Pipeline — runs all generators, validates, builds.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import {
  resolveRoot,
  logStart,
  logError,
} from "./lib/generator-utils.mjs";

const root = resolveRoot();
const scriptsDir = path.join(root, "scripts");

// ── Helpers ────────────────────────────────────────────────────────────────

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

function runBuild() {
  console.log("\n▶ Clearing .next cache...\n");
  const nextDir = path.join(root, ".next");
  if (fs.existsSync(nextDir)) {
    try {
      fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 3 });
    } catch {
      // Fallback for Windows lock contention
      execSync(`powershell -Command "Remove-Item -Recurse -Force '${nextDir}'"`, {
        cwd: root,
        stdio: "ignore",
      });
    }
    console.log("  ✔ .next cache cleared.\n");
  }

  console.log("\n▶ Running npx next build...\n");
  const result = execSync("npx next build", {
    cwd: root,
    env: process.env,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10, // 10 MB
  });
  return result;
}

function countPages(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return count;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countPages(fullPath);
    } else if (entry.name === "page.tsx") {
      count++;
    }
  }
  return count;
}

function countDatasets() {
  let count = 0;
  const datasetDirs = [
    path.join(root, "app/data/us"),
    path.join(root, "app/data/ca"),
  ];
  for (const dir of datasetDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith(".js") || file.endsWith(".mjs") || file.endsWith(".ts")) {
        count++;
      }
    }
  }
  return count;
}

function extractTotalStaticPages(buildOutput) {
  const match = buildOutput.match(/Generating static pages\s+\(\d+\/(\d+)\)/);
  return match ? parseInt(match[1], 10) : null;
}

function validateRoutes() {
  console.log("\n▶ Validating expected routes...\n");
  const expected = [
    // Datasets
    "app/data/us/evictionRules.js",
    "app/data/us/securityDepositRules.js",
    "app/data/us/rentIncreaseRules.js",
    "app/data/us/leaseTerminationRules.js",
    "app/data/ca/evictionRules.js",
    // US content pages
    "app/us/page.tsx",
    "app/us/states/page.tsx",
    "app/us/states/[state]/page.tsx",
    "app/us/calculators/page.tsx",
    // Canada content pages
    "app/ca/page.tsx",
    "app/ca/provinces/page.tsx",
    "app/ca/provinces/[province]/page.tsx",
    "app/ca/calculators/page.tsx",
    // Generators
    "scripts/lib/generator-utils.cjs",
    "scripts/lib/generator-utils.mjs",
    "scripts/generateStatePages.cjs",
    "scripts/generateSecurityDepositPages.cjs",
    "scripts/generateStateRentIncreasePages.cjs",
    "scripts/generateStateLeaseTerminationPages.cjs",
    "scripts/generateCanadaEvictionPages.cjs",
    "scripts/generateStateCalculators.mjs",
    "scripts/generateProvinceCalculators.mjs",
    "scripts/generateStateDocuments.mjs",
    "scripts/generateProvinceDocuments.mjs",
  ];

  const missing = [];
  for (const route of expected) {
    const fullPath = path.join(root, route);
    if (!fs.existsSync(fullPath)) {
      missing.push(route);
    }
  }

  if (missing.length > 0) {
    console.error("❌ Missing expected routes/files:");
    for (const m of missing) {
      console.error(`   - ${m}`);
    }
    throw new Error(`Validation failed: ${missing.length} expected route(s) missing.`);
  }

  console.log("  ✔ All expected routes and files are present.\n");
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║     LegalCals Unified Generation Pipeline                    ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");

  // 1. Validate datasets and core files exist
  validateRoutes();

  // 2. Validate hand-written datasets
  run("validate-rent-increase.mjs");
  run("validate-lease-termination.mjs");

  // 3. Run unified US and Canada pipelines
  run("generate-us-all.mjs");
  run("generate-ca-all.mjs");

  // 4. Theme generator
  run("generate-themes.mjs");

  // 5. Global calculators index + sitemap
  const globalIndexSrc = path.join(root, "templates/calculatorsIndex/page.tsx");
  const globalIndexDst = path.join(root, "app/calculators/page.tsx");
  if (fs.existsSync(globalIndexSrc)) {
    fs.copyFileSync(globalIndexSrc, globalIndexDst);
    console.log("\n  ✔ Global calculators index copied.\n");
  }

  run("generate-sitemap.mjs");

  // 6. Validate routes again after generation
  validateRoutes();

  // 7. Build
  const buildOutput = runBuild();

  // 8. Summary
  const datasetCount = countDatasets();
  const usContentPages = countPages(path.join(root, "app/us"));
  const caContentPages = countPages(path.join(root, "app/ca"));
  const usCalcPages = countPages(path.join(root, "app/calculators/us"));
  const caCalcPages = countPages(path.join(root, "app/calculators/ca"));
  const globalCalcPages = countPages(path.join(root, "app/calculators"));
  const totalGeneratedPages = usContentPages + caContentPages + usCalcPages + caCalcPages;
  const totalStaticPages = extractTotalStaticPages(buildOutput);

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║     Generation Summary                                       ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║  Datasets validated:        ${String(datasetCount).padStart(29)} ║`);
  console.log(`║  US content pages:          ${String(usContentPages).padStart(29)} ║`);
  console.log(`║  Canada content pages:      ${String(caContentPages).padStart(29)} ║`);
  console.log(`║  US calculator pages:       ${String(usCalcPages).padStart(29)} ║`);
  console.log(`║  Canada calculator pages:   ${String(caCalcPages).padStart(29)} ║`);
  console.log(`║  Global calculator pages:   ${String(globalCalcPages).padStart(29)} ║`);
  console.log(`║  Total pages generated:     ${String(totalGeneratedPages).padStart(29)} ║`);
  console.log(`║  Total static pages (build):${String(totalStaticPages ?? "N/A").padStart(29)} ║`);
  console.log("╚══════════════════════════════════════════════════════════════╝");

  if (totalStaticPages && totalStaticPages < 600) {
    console.warn("\n⚠ Warning: expected more than 600 static pages in the build.");
  }
}

main().catch((err) => {
  console.error("\n╔══════════════════════════════════════════════════════════════╗");
  console.error("║     PIPELINE FAILED                                          ║");
  console.error("╚══════════════════════════════════════════════════════════════╝");
  console.error(err.message || err);
  process.exit(1);
});
