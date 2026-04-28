/**
 * Canada Interactive Single-Calculator Generator
 *
 * Prompts for a calculator, then generates it for all provinces/territories.
 * Outputs: app/calculators/ca/{province}/{calculator}/page.tsx
 *          app/calculators/ca/{province}/{calculator}/CalculatorClient.tsx
 */

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

const root = resolveRoot();

const provincesConfigPath = path.join(root, "app/config/caProvinces.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templatePagePath = path.join(root, "templates/caCalculator/page.tsx");
const templateClientPath = path.join(root, "templates/caCalculator/CalculatorClient.tsx");
const outputBase = path.join(root, "app/calculators/ca");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

async function main() {
  logStart("Canada Calculator Generator");

  const provinces = await loadConfig(provincesConfigPath, "caProvinces");
  const registry = await loadConfig(calculatorsConfigPath, "calculators");

  validateConfig(provinces, "caProvinces");

  await validateWithZod(provinces, "app/validation/CAProvincesSchema.ts", "CAProvinces");
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

  for (const key of Object.keys(provinces)) {
    const province = provinces[key];

    const folder = path.join(outputBase, province.slug, calculatorSlug);
    ensureDirectory(folder);

    const pageContent = pageTemplate
      .replace(/PROVINCE_NAME/g, province.name)
      .replace(/PROVINCE_SLUG/g, province.slug)
      .replace(/PROVINCE_KEY/g, key)
      .replace(/CALCULATOR_NAME/g, calculatorName)
      .replace(/CALCULATOR_SLUG/g, calculatorSlug)
      .replace(/CALCULATOR_DESCRIPTION/g, calculatorDescription);

    const clientContent = clientTemplate
      .replace(/PROVINCE_NAME/g, province.name)
      .replace(/PROVINCE_KEY/g, key)
      .replace(/CALCULATOR_NAME/g, calculatorName)
      .replace(/CALCULATOR_DESCRIPTION/g, calculatorDescription);

    writePage(path.join(folder, "page.tsx"), pageContent);
    writePage(path.join(folder, "CalculatorClient.tsx"), clientContent);
    count += 2;
  }

  logSuccess("All province calculator files generated", count);
}

main().catch(logError);
