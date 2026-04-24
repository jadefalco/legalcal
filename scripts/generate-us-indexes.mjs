import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const statesConfigPath = path.join(root, "app/config/usStates.js");
const templateStateIndexPath = path.join(root, "app/templates/usStateIndex/page.tsx");
const templateUSIndexPath = path.join(root, "app/templates/usIndex/page.tsx");
const outputBase = path.join(root, "app/calculators/us");

async function loadStates() {
  const module = await import(url.pathToFileURL(statesConfigPath).href);
  return module.usStates;
}

async function main() {
  console.log("US Index Pages Generator\n");

  const states = await loadStates();

  if (!states || Object.keys(states).length === 0) {
    throw new Error("No states found in config file.");
  }

  const stateIndexTemplate = fs.readFileSync(templateStateIndexPath, "utf8");
  const usIndexTemplate = fs.readFileSync(templateUSIndexPath, "utf8");

  // Generate state index pages
  for (const key of Object.keys(states)) {
    const state = states[key];
    const folder = path.join(outputBase, state.slug);
    fs.mkdirSync(folder, { recursive: true });

    const content = stateIndexTemplate
      .replace(/STATE_NAME/g, state.name)
      .replace(/STATE_SLUG/g, state.slug)
      .replace(/STATE_KEY/g, key);

    fs.writeFileSync(path.join(folder, "page.tsx"), content);
    console.log(`  ✔ State index: ${state.name} → app/calculators/us/${state.slug}/page.tsx`);
  }

  // Generate US national index
  fs.writeFileSync(path.join(outputBase, "page.tsx"), usIndexTemplate);
  console.log(`  ✔ US national index: app/calculators/us/page.tsx`);

  console.log("\n✔ All US index pages generated successfully!");
}

main().catch((err) => console.error(err));
