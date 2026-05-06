import { createHash } from "crypto";
import {
  getCitationsForDetection,
  getLatestSnapshot,
  insertSnapshot,
  insertAlert,
  closeDb,
} from "../lib/authority/db";
import { fetchStatuteText } from "../lib/authority/detection/fetchStatute";
import { computeDiff } from "../lib/authority/detection/diff";

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

async function main() {
  const citations = await getCitationsForDetection();
  let checked = 0;
  let detected = 0;
  let errors = 0;

  for (const citation of citations) {
    checked++;
    try {
      const newText = await fetchStatuteText(citation.url);
      const newHash = sha256(newText);
      const snapshot = await getLatestSnapshot(citation.citationId);

      if (!snapshot) {
        await insertSnapshot(citation.citationId, newHash, newText);
        continue;
      }

      if (newHash === snapshot.contentHash) {
        continue;
      }

      const diff = computeDiff(snapshot.contentText, newText);
      await insertAlert(
        citation.citationId,
        citation.ruleId,
        snapshot.contentHash,
        newHash,
        diff
      );
      await insertSnapshot(citation.citationId, newHash, newText);
      detected++;
    } catch (err) {
      errors++;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(`Error checking citation ${citation.citationId} (${citation.url}): ${message}`);
    }
  }

  console.log(`Statute change detection complete:`);
  console.log(`  - ${checked} citations checked`);
  console.log(`  - ${detected} changes detected`);
  console.log(`  - ${errors} errors`);

  closeDb();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
