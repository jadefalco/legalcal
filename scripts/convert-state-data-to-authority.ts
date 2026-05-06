import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const CALCULATORS_DIR = path.join(process.cwd(), "app", "us", "calculators");
const AUTHORITY_DIR = path.join(process.cwd(), "data", "authority", "us");

// Map calculator slug → exported variable name (convention: {slug}Dataset)
function toVarName(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) + "Dataset";
}

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function main() {
  const dirs = fs.readdirSync(CALCULATORS_DIR).filter((d) => {
    const full = path.join(CALCULATORS_DIR, d);
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, "state-data.ts"));
  });

  if (dirs.length === 0) {
    console.log("No state-data.ts files found.");
    return;
  }

  // Build a temporary TS file that imports all datasets and prints them
  let imports = "";
  let exports = "const allTopics: Record<string, Record<string, any>> = {\n";

  for (const slug of dirs) {
    const varName = toVarName(slug);
    const pascal = toPascalCase(slug);
    imports += `import { ${varName} } from "../app/us/calculators/${slug}/state-data";\n`;
    exports += `  "${slug}": ${varName},\n`;
  }

  exports += "};\n";
  exports += "console.log(JSON.stringify(allTopics));\n";

  const tempFile = path.join(process.cwd(), "scripts", "_tmp-export.ts");
  fs.writeFileSync(tempFile, imports + exports, "utf-8");

  let jsonStr: string;
  try {
    const result = execSync(`npx tsx "${tempFile}"`, { encoding: "utf-8", cwd: process.cwd() });
    jsonStr = result.trim();
  } catch (e) {
    console.error("Failed to run tsx export:", e);
    fs.unlinkSync(tempFile);
    process.exit(1);
  }

  fs.unlinkSync(tempFile);

  let allTopics: Record<string, Record<string, any>>;
  try {
    allTopics = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse JSON output:", e);
    process.exit(1);
  }

  // Write authority JSON files
  for (const [slug, dataset] of Object.entries(allTopics)) {
    for (const [stateCode, data] of Object.entries(dataset)) {
      const stateDir = path.join(AUTHORITY_DIR, stateCode);
      if (!fs.existsSync(stateDir)) {
        fs.mkdirSync(stateDir, { recursive: true });
      }

      // Try to extract statutes and notes if they exist in the data
      const statutes = data.statutes || [];
      const notes = data.notes || [];
      const cleanData = { ...data };
      delete cleanData.statutes;
      delete cleanData.notes;

      const authorityFile = {
        jurisdiction: { country: "us", state: stateCode },
        topic: slug,
        rule: {
          data: cleanData,
          citations: statutes.map((s: string) => ({
            statute: s,
            url: "",
            excerpt: "",
            sourceType: "statute",
            lastUpdated: "2025-01-01",
            confidence: 0.8,
          })),
          version: {
            version: "2025.01",
            effectiveDate: "2025-01-01",
            supersedes: null,
            notes: notes.length > 0 ? notes : ["Initial authoritative version"],
          },
        },
      };

      fs.writeFileSync(
        path.join(stateDir, `${slug}.json`),
        JSON.stringify(authorityFile, null, 2),
        "utf-8"
      );
    }
    console.log(`Converted ${slug}: ${Object.keys(dataset).length} states`);
  }

  console.log("\nAuthority JSON files generated successfully.");
}

main();
