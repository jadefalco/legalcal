/**
 * US Interactive Single-Calculator Generator
 *
 * Prompts for a calculator, then generates it for all 50 states.
 * Outputs: app/calculators/us/{state}/{calculator}/page.tsx
 *          app/calculators/us/{state}/{calculator}/CalculatorClient.tsx
 */

import fs from "fs";
import path from "path";
import readline from "readline";
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

// FIX: root must be defined BEFORE reading templates
const root = resolveRoot();

// Eviction templates
const evictionPageTemplate = fs.readFileSync(
  path.join(root, "templates/usCalculator/page.tsx"),
  "utf8"
);

const evictionClientTemplate = fs.readFileSync(
  path.join(root, "templates/usCalculator/CalculatorClient.tsx"),
  "utf8"
);

// Generic templates
const genericPageTemplate = fs.readFileSync(
  path.join(root, "templates/usCalculatorGeneric/page.tsx"),
  "utf8"
);

const genericClientTemplate = fs.readFileSync(
  path.join(root, "templates/usCalculatorGeneric/CalculatorClient.tsx"),
  "utf8"
);



const statesConfigPath = path.join(root, "app/config/usStates.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templatePagePath = path.join(root, "templates/usCalculator/page.tsx");
const templateClientPath = path.join(root, "templates/usCalculator/CalculatorClient.tsx");
const outputBase = path.join(root, "app/calculators/us");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

async function main() {
  logStart("US Calculator Generator");

  const states = await loadConfig(statesConfigPath, "usStates");
  const registry = await loadConfig(calculatorsConfigPath, "calculators");

  validateConfig(states, "usStates");

  await validateWithZod(states, "app/validation/USStatesSchema.ts", "USStates");
  await validateWithZod(registry, "app/validation/CalculatorsSchema.ts", "Calculators");

  console.log("Available calculators from registry:");
  registry.forEach((calc, i) => {
    console.log(`  ${i + 1}. ${calc.name} (${calc.slug})`);
  });
  console.log("  0. Enter custom calculator\n");

  const choice = await ask("Select a calculator (number) or enter a new calculator name: ");
  const num = parseInt(choice.trim(), 10);

  let calculatorName, calculatorSlug, calculatorDescription;

  if (!isNaN(num) && num >= 1 && num <= registry.length) {
    const calc = registry[num - 1];
    calculatorName = calc.name;
    calculatorSlug = calc.slug;
    calculatorDescription = calc.description;
    console.log(`Using registry calculator: ${calculatorName}\n`);
  } else {
    calculatorName = choice.trim();
    calculatorSlug = await ask("Enter calculator slug: ");
    calculatorDescription = await ask("Enter calculator description: ");
  }

  rl.close();

  const pageTemplate = loadTemplate(templatePagePath);
  const clientTemplate = loadTemplate(templateClientPath);

  let count = 0;

  for (const key of Object.keys(states)) {
    const state = states[key];

    const folder = path.join(outputBase, state.slug, calculatorSlug);
    ensureDirectory(folder);

   // Choose template based on calculator slug
const isEviction = calculatorSlug === "eviction-notice";

const pageTpl = isEviction
  ? evictionPageTemplate
  : genericPageTemplate;

const clientTpl = isEviction
  ? evictionClientTemplate
  : genericClientTemplate;

const pageContent = pageTpl
  .replace(/STATE_NAME/g, state.name)
  .replace(/STATE_SLUG/g, state.slug)
  .replace(/STATE_KEY/g, key)
  .replace(/CALCULATOR_NAME/g, calculatorName)
  .replace(/CALCULATOR_SLUG/g, calculatorSlug)
  .replace(/CALCULATOR_DESCRIPTION/g, calculatorDescription)
  .replace(
  /CALCULATOR_SECTIONS/g,
  JSON.stringify(registry[num - 1].sections || [])
);

const clientContent = clientTpl
  .replace(/STATE_NAME/g, state.name)
  .replace(/STATE_SLUG/g, state.slug)
  .replace(/STATE_KEY/g, key)
  .replace(/CALCULATOR_NAME/g, calculatorName)
  .replace(/CALCULATOR_DESCRIPTION/g, calculatorDescription);
  
    writePage(path.join(folder, "page.tsx"), pageContent);
    writePage(path.join(folder, "CalculatorClient.tsx"), clientContent);
    count += 2;
  }

  logSuccess("All state calculator files generated", count);
}

main().catch(logError);
