/**
 * US Calculator Index Pages Generator
 *
 * Outputs:
 *   - app/calculators/us/{state}/page.tsx      (state calculator indexes)
 *   - app/calculators/us/page.tsx              (US national calculator index)
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

const statesConfigPath = path.join(root, "app/config/usStates.js");
const calculatorsConfigPath = path.join(root, "app/config/calculators.js");
const templateStateIndexPath = path.join(root, "templates/usStateIndex/page.tsx");
const templateUSIndexPath = path.join(root, "templates/usIndex/page.tsx");
const outputBase = path.join(root, "app/calculators/us");

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

function generateStatesArray(states) {
  return Object.values(states)
    .map(
      (state) =>
        `  { name: "${escapeString(state.name)}", slug: "${state.slug}", accent: "${state.accent}", seal: "${state.seal || ""}" }`
    )
    .join(",\n");
}

async function main() {
  logStart("US Index Pages Generator");

  const states = await loadConfig(statesConfigPath, "usStates");
  const calculators = await loadConfig(calculatorsConfigPath, "calculators");

  validateConfig(states, "usStates");
  validateConfig(calculators, "calculators");

  await validateWithZod(states, "app/validation/USStatesSchema.ts", "USStates");
  await validateWithZod(calculators, "app/validation/CalculatorsSchema.ts", "Calculators");

  const stateIndexTemplate = loadTemplate(templateStateIndexPath);
  const usIndexTemplate = loadTemplate(templateUSIndexPath);

  const calculatorsArray = generateCalculatorsArray(calculators);

  // Generate state index pages
  let count = 0;
  for (const key of Object.keys(states)) {
    const state = states[key];
    const folder = path.join(outputBase, state.slug);
    ensureDirectory(folder);

    const content = stateIndexTemplate
      .replace(/STATE_NAME/g, state.name)
      .replace(/STATE_SLUG/g, state.slug)
      .replace(/STATE_KEY/g, key)
      .replace(/STATE_ACCENT/g, state.accent)
      .replace(/STATE_SEAL/g, state.seal || "")
      .replace(/\/\* CALCULATORS_ARRAY \*\//, calculatorsArray);

    writePage(path.join(folder, "page.tsx"), content);
    count++;
  }

  // Generate US national index
  const statesArray = generateStatesArray(states);
  const usIndexContent = usIndexTemplate.replace(
    /\/\* STATES_ARRAY \*\//,
    statesArray
  );

  writePage(path.join(outputBase, "page.tsx"), usIndexContent);
  count++;

  logSuccess("All US index pages generated", count);
}

main().catch(logError);
