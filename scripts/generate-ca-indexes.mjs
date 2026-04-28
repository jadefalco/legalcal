/**
 * Canada Calculator Index Pages Generator
 *
 * Outputs:
 *   - app/calculators/ca/{province}/page.tsx   (province calculator indexes)
 *   - app/calculators/ca/page.tsx              (Canada national calculator index)
 */

import path from "path";
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
const templateProvinceIndexPath = path.join(root, "templates/caProvinceIndex/page.tsx");
const templateCAIndexPath = path.join(root, "templates/caIndex/page.tsx");
const outputBase = path.join(root, "app/calculators/ca");

function escapeString(str) {
  return str.replace(/"/g, '\\"');
}

function generateCalculatorsArray(calculators) {
  return calculators
    .map(
      (calc) =>
        `  { name: "${escapeString(calc.name)}", slug: "${calc.slug}", description: "${escapeString(calc.description)}" }`
    )
    .join(",\n");
}

function generateProvincesArray(provinces) {
  return Object.values(provinces)
    .map(
      (province) =>
        `  { name: "${escapeString(province.name)}", slug: "${province.slug}", accent: "${province.accent}", seal: "${province.seal || ""}" }`
    )
    .join(",\n");
}

async function main() {
  logStart("Canada Index Pages Generator");

  const provinces = await loadConfig(provincesConfigPath, "caProvinces");
  const calculators = await loadConfig(calculatorsConfigPath, "calculators");

  validateConfig(provinces, "caProvinces");
  validateConfig(calculators, "calculators");

  await validateWithZod(provinces, "app/validation/CAProvincesSchema.ts", "CAProvinces");
  await validateWithZod(calculators, "app/validation/CalculatorsSchema.ts", "Calculators");

  const provinceIndexTemplate = loadTemplate(templateProvinceIndexPath);
  const caIndexTemplate = loadTemplate(templateCAIndexPath);

  const calculatorsArray = generateCalculatorsArray(calculators);

  // Generate province index pages
  let count = 0;
  for (const key of Object.keys(provinces)) {
    const province = provinces[key];
    const folder = path.join(outputBase, province.slug);
    ensureDirectory(folder);

    const content = provinceIndexTemplate
      .replace(/PROVINCE_NAME/g, province.name)
      .replace(/PROVINCE_SLUG/g, province.slug)
      .replace(/PROVINCE_KEY/g, key)
      .replace(/PROVINCE_ACCENT/g, province.accent)
      .replace(/PROVINCE_SEAL/g, province.seal || "")
      .replace(/\/\* CALCULATORS_ARRAY \*\//, calculatorsArray);

    writePage(path.join(folder, "page.tsx"), content);
    count++;
  }

  // Generate Canada national index
  const provincesArray = generateProvincesArray(provinces);
  const caIndexContent = caIndexTemplate.replace(
    /\/\* PROVINCES_ARRAY \*\//,
    provincesArray
  );

  writePage(path.join(outputBase, "page.tsx"), caIndexContent);
  count++;

  logSuccess("All Canada index pages generated", count);
}

main().catch(logError);
