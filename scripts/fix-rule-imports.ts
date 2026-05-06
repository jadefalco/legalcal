import fs from "fs";
import path from "path";

const CALCULATORS_DIR = path.join(process.cwd(), "app", "us", "calculators");

const dirs = fs.readdirSync(CALCULATORS_DIR).filter((d) => {
  const full = path.join(CALCULATORS_DIR, d);
  return fs.statSync(full).isDirectory();
});

for (const slug of dirs) {
  const dir = path.join(CALCULATORS_DIR, slug);
  const logicPath = path.join(dir, "logic.ts");
  const schemaPath = path.join(dir, "schema.ts");

  if (!fs.existsSync(logicPath) || !fs.existsSync(schemaPath)) continue;

  let logicContent = fs.readFileSync(logicPath, "utf-8");

  // Check if there's a Rule type reference without import
  const ruleTypeMatch = logicContent.match(/as (\w+Rule) \| undefined/);
  if (!ruleTypeMatch) continue;

  const ruleTypeName = ruleTypeMatch[1];

  // Check if the Rule type is already imported
  if (logicContent.includes(ruleTypeName)) {
    const importMatch = logicContent.match(new RegExp(`import type \\{[^}]*${ruleTypeName}[^}]*\\} from "\\./schema"`));
    if (importMatch) continue; // Already imported
  }

  // Add the Rule type to the existing schema import
  logicContent = logicContent.replace(
    /import type \{ (\w+) \} from "\.\/schema";/,
    `import type { $1, ${ruleTypeName} } from "./schema";`
  );

  fs.writeFileSync(logicPath, logicContent, "utf-8");
  console.log(`Fixed imports for ${slug}: added ${ruleTypeName}`);
}

console.log("\nImport fix complete.");
