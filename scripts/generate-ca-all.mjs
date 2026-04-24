import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const provincesConfigPath = path.join(root, "app/config/caProvinces.js");
const templatePagePath = path.join(root, "app/templates/caCalculator/page.tsx");
const templateClientPath = path.join(root, "app/templates/caCalculator/CalculatorClient.tsx");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const outputBase = path.join(root, "app/calculators/ca");

async function loadProvinces() {
  const module = await import(url.pathToFileURL(provincesConfigPath).href);
  return module.caProvinces;
}

async function loadCalculators() {
  const module = await import(url.pathToFileURL(calculatorsConfigPath).href);
  return module.calculators;
}

async function main() {
  console.log("Canada All-Calculators Generator\n");

  const provinces = await loadProvinces();
  const calculators = await loadCalculators();

  if (!provinces || Object.keys(provinces).length === 0) {
    throw new Error("No provinces found in config file.");
  }

  const pageTemplate = fs.readFileSync(templatePagePath, "utf8");
  const clientTemplate = fs.readFileSync(templateClientPath, "utf8");

  for (const calc of calculators) {
    console.log(`\nGenerating: ${calc.name} (${calc.slug})`);

    for (const key of Object.keys(provinces)) {
      const province = provinces[key];

      const folder = path.join(outputBase, province.slug, calc.slug);
      fs.mkdirSync(folder, { recursive: true });

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

      fs.writeFileSync(path.join(folder, "page.tsx"), pageContent);
      fs.writeFileSync(path.join(folder, "CalculatorClient.tsx"), clientContent);
    }

    console.log(`✔ Finished: ${calc.name}`);
  }

  console.log("\n✔ All Canada calculators generated successfully!");
}

main().catch((err) => console.error(err));
