import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { authorityBundle } from "@/lib/authority/bundle";
import { checkSourceChanges } from "@/lib/authority/sourceMonitor";

async function main() {
  const results = await checkSourceChanges(authorityBundle);

  const reportsDir = join(process.cwd(), "reports");
  mkdirSync(reportsDir, { recursive: true });

  const outPath = join(reportsDir, "source-changes.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));

  const changed = results.filter((r) => r.changed);
  const failed = results.filter((r) => r.error);

  console.log(`Total URLs checked: ${results.length}`);
  console.log(`Changed: ${changed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (changed.length > 0) {
    console.log("\nChanged sources:");
    changed.forEach((r) =>
      console.log(`  - ${r.topic}/${r.jurisdiction}`)
    );
  }

  if (failed.length > 0) {
    console.log("\nFailed fetches:");
    failed.forEach((r) =>
      console.log(`  - ${r.topic}/${r.jurisdiction}: ${r.error}`)
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
