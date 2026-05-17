import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { authorityBundle } from "@/lib/authority/bundle";
import { checkAllRules } from "@/lib/authority/freshness";

const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });

const report = checkAllRules(authorityBundle);

const outPath = join(reportsDir, "rule-freshness.json");
writeFileSync(outPath, JSON.stringify(report, null, 2));

console.log(`Freshness report written to ${outPath}`);
console.log(`Total rules checked: ${report.length}`);

const expired = report.filter((r) => r.freshness.isExpired);
const stale = report.filter((r) => r.freshness.isStale);
const missingNextYear = report.filter((r) => r.freshness.missingNextYear);

if (expired.length > 0) {
  console.log(`\nExpired rules (${expired.length}):`);
  expired.forEach((r) =>
    console.log(`  - ${r.topic}/${r.jurisdiction}: ${r.freshness.warnings.join("; ")}`)
  );
}

if (stale.length > 0) {
  console.log(`\nStale rules (${stale.length}):`);
  stale.forEach((r) =>
    console.log(`  - ${r.topic}/${r.jurisdiction}: ${r.freshness.warnings.join("; ")}`)
  );
}

if (missingNextYear.length > 0) {
  console.log(`\nRules missing next year (${missingNextYear.length}):`);
  missingNextYear.forEach((r) =>
    console.log(`  - ${r.topic}/${r.jurisdiction}: ${r.freshness.warnings.join("; ")}`)
  );
}

if (expired.length === 0 && stale.length === 0 && missingNextYear.length === 0) {
  console.log("\nAll rules are fresh.");
}
