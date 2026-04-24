import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const provincesConfigPath = path.join(root, "app/config/caProvinces.js");
const templateProvinceIndexPath = path.join(root, "app/templates/caProvinceIndex/page.tsx");
const templateCAIndexPath = path.join(root, "app/templates/caIndex/page.tsx");
const outputBase = path.join(root, "app/calculators/ca");

async function loadProvinces() {
  const module = await import(url.pathToFileURL(provincesConfigPath).href);
  return module.caProvinces;
}

async function main() {
  console.log("Canada Index Pages Generator\n");

  const provinces = await loadProvinces();

  if (!provinces || Object.keys(provinces).length === 0) {
    throw new Error("No provinces found in config file.");
  }

  const provinceIndexTemplate = fs.readFileSync(templateProvinceIndexPath, "utf8");
  const caIndexTemplate = fs.readFileSync(templateCAIndexPath, "utf8");

  // Generate province index pages
  for (const key of Object.keys(provinces)) {
    const province = provinces[key];
    const folder = path.join(outputBase, province.slug);
    fs.mkdirSync(folder, { recursive: true });

    const content = provinceIndexTemplate
      .replace(/PROVINCE_NAME/g, province.name)
      .replace(/PROVINCE_SLUG/g, province.slug)
      .replace(/PROVINCE_KEY/g, key);

    fs.writeFileSync(path.join(folder, "page.tsx"), content);
    console.log(`  ✔ Province index: ${province.name} → app/calculators/ca/${province.slug}/page.tsx`);
  }

  // Generate Canada national index
  fs.writeFileSync(path.join(outputBase, "page.tsx"), caIndexTemplate);
  console.log(`  ✔ Canada national index: app/calculators/ca/page.tsx`);

  console.log("\n✔ All Canada index pages generated successfully!");
}

main().catch((err) => console.error(err));
