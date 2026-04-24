import fs from "fs";
import path from "path";
import url from "url";

// Resolve project root
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Paths
const statesConfigPath = path.join(root, "app/config/usStates.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templatePagePath = path.join(root, "app/templates/usCalculator/page.tsx");
const templateClientPath = path.join(root, "app/templates/usCalculator/CalculatorClient.tsx");
const outputBase = path.join(root, "app/calculators/us");

// Load states config
async function loadStates() {
  const module = await import(url.pathToFileURL(statesConfigPath).href);
  return module.usStates;
}

// Load calculators registry
async function loadCalculators() {
  const module = await import(url.pathToFileURL(calculatorsConfigPath).href);
  return module.calculators;
}

async function main() {
  console.log("US All-Calculators Generator\n");

  const states = await loadStates();
  const calculators = await loadCalculators();

  if (!states || Object.keys(states).length === 0) {
    throw new Error("No states found in config file.");
  }

  if (!calculators || calculators.length === 0) {
    throw new Error("No calculators found in registry.");
  }

  const pageTemplate = fs.readFileSync(templatePagePath, "utf8");
  const clientTemplate = fs.readFileSync(templateClientPath, "utf8");

  for (const calc of calculators) {
    console.log(`\nGenerating: ${calc.name} (${calc.slug})`);

    for (const key of Object.keys(states)) {
      const state = states[key];

      const folder = path.join(outputBase, state.slug, calc.slug);
      fs.mkdirSync(folder, { recursive: true });

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

      fs.writeFileSync(path.join(folder, "page.tsx"), pageContent);
      fs.writeFileSync(path.join(folder, "CalculatorClient.tsx"), clientContent);
    }

    console.log(`✔ Finished: ${calc.name}`);
  }

  console.log("\n✔ All US calculators generated successfully!");
}

main().catch(err => console.error(err));
