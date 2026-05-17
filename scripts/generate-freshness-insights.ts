import fs from "fs";
import path from "path";
import { authorityBundle } from "@/lib/authority/bundle";
import { loadRuleHistory, compareRules } from "@/lib/authority/history";
import { explainRuleChange } from "@/lib/authority/intelligence";

interface InsightEntry {
  topic: string;
  jurisdiction: string;
  headline: string;
  explanation: string;
}

function main() {
  const insights: InsightEntry[] = [];

  // Look at all rules with history entries (potential changes)
  for (const [topic, jurisdictions] of Object.entries(authorityBundle)) {
    for (const [jurisdiction] of Object.entries(jurisdictions)) {
      const history = loadRuleHistory(topic, jurisdiction);
      if (history.length < 2) continue;

      const latest = history[history.length - 1];
      const previous = history[history.length - 2];

      // Only include if there's an actual diff
      const diff = compareRules(previous.rule, latest.rule);
      if (
        diff.changedKeys.length === 0 &&
        diff.addedKeys.length === 0 &&
        diff.removedKeys.length === 0
      ) {
        continue;
      }

      const explanation = explainRuleChange(
        diff,
        previous.version,
        latest.version
      );

      insights.push({
        topic,
        jurisdiction,
        headline: explanation.headline,
        explanation: explanation.explanation,
      });
    }
  }

  const outDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "insights.json"),
    JSON.stringify(insights, null, 2),
    "utf-8"
  );

  console.log(`Generated ${insights.length} insights.`);
}

main();
