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

  if (!fs.existsSync(logicPath)) continue;

  let logicContent = fs.readFileSync(logicPath, "utf-8");

  // Check if there's still a dataset reference
  const datasetMatch = logicContent.match(/(\w+Dataset)\[/);
  if (!datasetMatch) continue;

  const datasetVar = datasetMatch[1];

  // Find the rule type name from schema
  let ruleTypeName = "";
  if (fs.existsSync(schemaPath)) {
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");
    const ruleMatch = schemaContent.match(/export interface (\w+Rule)/);
    if (ruleMatch) {
      ruleTypeName = ruleMatch[1];
    }
  }

  // Remove any remaining "const code = stateCode.toLowerCase();" lines
  logicContent = logicContent.replace(/\n\s*const code = stateCode\.toLowerCase\(\);\s*\n/g, "\n");

  // Replace various dataset access patterns
  // Pattern 1: dataset[code]
  // Pattern 2: dataset[stateCode.toLowerCase()]
  const accessPattern = new RegExp(
    `const rule = ${datasetVar}\\[(?:code|stateCode\\.toLowerCase\\(\\))\\];`,
    "g"
  );

  if (ruleTypeName) {
    logicContent = logicContent.replace(
      accessPattern,
      `const ruleBlock = getRule(stateCode, "${slug}");\n  const rule = ruleBlock?.data as ${ruleTypeName} | undefined;`
    );
  } else {
    logicContent = logicContent.replace(
      accessPattern,
      `const ruleBlock = getRule(stateCode, "${slug}");\n  const rule = ruleBlock?.data as any;`
    );
  }

  fs.writeFileSync(logicPath, logicContent, "utf-8");
  console.log(`Fixed ${slug}`);
}

console.log("\nFix complete.");
