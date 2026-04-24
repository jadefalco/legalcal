import fs from "fs";
import path from "path";
import url from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function run(script) {
  console.log(`\n▶ Running ${script}...\n`);
  execSync(`node ${path.join(__dirname, script)}`, {
    stdio: "inherit",
    cwd: root,
  });
}

function copyGlobalIndex() {
  const templatePath = path.join(root, "app/templates/calculatorsIndex/page.tsx");
  const outputPath = path.join(root, "app/calculators/page.tsx");
  const content = fs.readFileSync(templatePath, "utf8");
  fs.writeFileSync(outputPath, content);
  console.log("\n✔ Global calculators index generated: app/calculators/page.tsx");
}

async function main() {
  console.log("╔════════════════════════════════════════════╗");
  console.log("║     Unified Calculator Generator           ║");
  console.log("╚════════════════════════════════════════════╝");

  // 1. US calculators
  run("generate-us-all.mjs");

  // 2. Canada calculators
  run("generate-ca-all.mjs");

  // 3. US index pages
  run("generate-us-indexes.mjs");

  // 4. Canada index pages
  run("generate-ca-indexes.mjs");

  // 5. Global index
  copyGlobalIndex();

  // 6. Sitemap
  run("generate-sitemap.mjs");

  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║     All Generators Complete!               ║");
  console.log("╚════════════════════════════════════════════╝");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
