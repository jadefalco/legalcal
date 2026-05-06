import fs from "fs";
import path from "path";

const CALCULATORS_DIR = path.join(process.cwd(), "app", "us", "calculators");

const dirs = fs.readdirSync(CALCULATORS_DIR).filter((d) => {
  const full = path.join(CALCULATORS_DIR, d);
  return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, "state-data.ts"));
});

for (const slug of dirs) {
  const dir = path.join(CALCULATORS_DIR, slug);
  const logicPath = path.join(dir, "logic.ts");
  const schemaPath = path.join(dir, "schema.ts");

  if (!fs.existsSync(logicPath)) {
    console.log(`Skipping ${slug}: no logic.ts`);
    continue;
  }

  let logicContent = fs.readFileSync(logicPath, "utf-8");

  // Find the imported dataset variable name
  const importMatch = logicContent.match(/import\s*\{\s*(\w+)Dataset\s*\}\s*from\s*"\.\/state-data"/);
  if (!importMatch) {
    console.log(`Skipping ${slug}: no dataset import found`);
    continue;
  }

  const datasetVar = importMatch[1] + "Dataset";

  // Find the rule type name from schema
  let ruleTypeName = "";
  if (fs.existsSync(schemaPath)) {
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");
    const ruleMatch = schemaContent.match(/export interface (\w+Rule)/);
    if (ruleMatch) {
      ruleTypeName = ruleMatch[1];
    }
  }

  // Replace the dataset import with getRule import
  logicContent = logicContent.replace(
    /import\s*\{\s*\w+Dataset\s*\}\s*from\s*"\.\/state-data";\n/,
    `import { getRule } from "@/lib/authority/query";\n`
  );

  // Replace: const rule = dataset[stateCode.toLowerCase()];
  // With: const ruleBlock = getRule(stateCode, "slug");
  //       const rule = ruleBlock?.data as RuleType | undefined;
  const datasetAccessPattern = new RegExp(
    `const rule = ${datasetVar}\\[stateCode\\.toLowerCase\\(\\)\\];`,
    "g"
  );

  if (ruleTypeName) {
    logicContent = logicContent.replace(
      datasetAccessPattern,
      `const ruleBlock = getRule(stateCode, "${slug}");\n  const rule = ruleBlock?.data as ${ruleTypeName} | undefined;`
    );
  } else {
    logicContent = logicContent.replace(
      datasetAccessPattern,
      `const ruleBlock = getRule(stateCode, "${slug}");\n  const rule = ruleBlock?.data as any;`
    );
  }

  // Write the updated logic.ts
  fs.writeFileSync(logicPath, logicContent, "utf-8");
  console.log(`Migrated ${slug}`);

  // Remove state-data.ts
  const stateDataPath = path.join(dir, "state-data.ts");
  fs.unlinkSync(stateDataPath);
  console.log(`  Removed ${slug}/state-data.ts`);
}

console.log("\nMigration complete.");
