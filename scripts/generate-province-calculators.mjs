import fs from "fs";
import path from "path";
import readline from "readline";
import url from "url";

// Resolve project root
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Paths
const provincesConfigPath = path.join(root, "app/config/caProvinces.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templatePagePath = path.join(root, "app/templates/caCalculator/page.tsx");
const templateClientPath = path.join(root, "app/templates/caCalculator/CalculatorClient.tsx");
const outputBase = path.join(root, "app/calculators/ca");

// Readline prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

async function loadProvinces() {
  const module = await import(url.pathToFileURL(provincesConfigPath).href);
  return module.caProvinces;
}

async function loadCalculators() {
  const module = await import(url.pathToFileURL(calculatorsConfigPath).href);
  return module.calculators;
}

// === MAIN ===
async function main() {
  console.log("Canada Calculator Generator\n");

  const provinces = await loadProvinces();
  const registry = await loadCalculators();

  if (!provinces || Object.keys(provinces).length === 0) {
    throw new Error("No provinces found in config file.");
  }

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

  const pageTemplate = fs.readFileSync(templatePagePath, "utf8");
  const clientTemplate = fs.readFileSync(templateClientPath, "utf8");

  for (const key of Object.keys(provinces)) {
    const province = provinces[key];

    const folder = path.join(outputBase, province.slug, calculatorSlug);
    fs.mkdirSync(folder, { recursive: true });

    const pageContent = pageTemplate
      .replace(/PROVINCE_NAME/g, province.name)
      .replace(/PROVINCE_SLUG/g, province.slug)
      .replace(/PROVINCE_KEY/g, key)
      .replace(/CALCULATOR_NAME/g, calculatorName)
      .replace(/CALCULATOR_SLUG/g, calculatorSlug)
      .replace(/CALCULATOR_DESCRIPTION/g, calculatorDescription);

    const clientContent = clientTemplate
      .replace(/PROVINCE_NAME/g, province.name)
      .replace(/CALCULATOR_NAME/g, calculatorName)
      .replace(/CALCULATOR_DESCRIPTION/g, calculatorDescription);

    fs.writeFileSync(path.join(folder, "page.tsx"), pageContent);
    fs.writeFileSync(path.join(folder, "CalculatorClient.tsx"), clientContent);
  }

  console.log("\n✔ All province calculator files generated successfully!");
}

main().catch(err => console.error(err));
