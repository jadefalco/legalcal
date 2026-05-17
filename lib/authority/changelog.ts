import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { compareRules } from "./history";
import type { RuleHistoryEntry, RuleDiff } from "./history";

const HISTORY_DIR = "data/rule-history";

export interface ChangelogEntry {
  topic: string;
  jurisdiction: string;
  version: string;
  previousVersion: string | null;
  savedAt: string;
  changes: RuleDiff;
}

interface GenerateChangelogOptions {
  since: string;
  until?: string;
}

function scanHistoryFiles(dir: string): string[] {
  const files: string[] = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...scanHistoryFiles(fullPath));
      } else if (entry.endsWith(".json")) {
        files.push(fullPath);
      }
    }
  } catch {
    // directory may not exist
  }
  return files;
}

function parseHistoryFile(path: string): {
  topic: string;
  jurisdiction: string;
  entries: RuleHistoryEntry[];
} {
  const parts = path.replace(/\\/g, "/").split("/");
  const fileName = parts[parts.length - 1];
  const jurisdiction = fileName.replace(".json", "");
  const topic = parts[parts.length - 2];
  const entries: RuleHistoryEntry[] = JSON.parse(readFileSync(path, "utf-8"));
  return { topic, jurisdiction, entries };
}

export function generateChangelog(
  options: GenerateChangelogOptions
): ChangelogEntry[] {
  const since = new Date(options.since);
  const until = options.until ? new Date(options.until) : new Date();

  const files = scanHistoryFiles(HISTORY_DIR);
  const results: ChangelogEntry[] = [];

  for (const file of files) {
    const { topic, jurisdiction, entries } = parseHistoryFile(file);

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const savedAt = new Date(entry.savedAt);

      if (savedAt < since || savedAt > until) {
        continue;
      }

      const previousEntry = i > 0 ? entries[i - 1] : null;
      const previousVersion = previousEntry?.version ?? null;

      const changes = previousEntry
        ? compareRules(previousEntry.rule, entry.rule)
        : {
            changedKeys: [],
            addedKeys: Object.keys(entry.rule.data),
            removedKeys: [],
            dataDiff: Object.fromEntries(
              Object.entries(entry.rule.data).map(([k, v]) => [
                k,
                { before: undefined, after: v },
              ])
            ),
          };

      results.push({
        topic,
        jurisdiction,
        version: entry.version,
        previousVersion,
        savedAt: entry.savedAt,
        changes,
      });
    }
  }

  return results.sort(
    (a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
  );
}

export function formatChangelogMarkdown(
  entries: ChangelogEntry[],
  since: string
): string {
  let md = `# LegalCals Changelog\n\n`;
  md += `> Generated from rule history snapshots since **${new Date(since).toLocaleDateString("en-US", { dateStyle: "long" })}**.\n\n`;

  if (entries.length === 0) {
    md += `*No rule changes found in the selected date range.*\n`;
    return md;
  }

  for (const entry of entries) {
    const jurisdictionName = entry.jurisdiction.toUpperCase();
    const topicTitle = entry.topic
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    md += `## ${jurisdictionName} — ${topicTitle}\n\n`;

    if (entry.previousVersion) {
      md += `- **Version:** ${entry.previousVersion} → ${entry.version}\n`;
    } else {
      md += `- **Version:** ${entry.version} (initial)\n`;
    }

    md += `- **Saved:** ${new Date(entry.savedAt).toLocaleString("en-US")}\n`;

    if (entry.changes.changedKeys.length > 0) {
      md += `- **Changed keys:** ${entry.changes.changedKeys.join(", ")}\n`;
      for (const key of entry.changes.changedKeys) {
        const diff = entry.changes.dataDiff[key];
        md += `  - \`${key}\`: ${JSON.stringify(diff.before)} → ${JSON.stringify(diff.after)}\n`;
      }
    }

    if (entry.changes.addedKeys.length > 0) {
      md += `- **Added keys:** ${entry.changes.addedKeys.join(", ")}\n`;
      for (const key of entry.changes.addedKeys) {
        const diff = entry.changes.dataDiff[key];
        md += `  - \`${key}\`: ${JSON.stringify(diff.after)}\n`;
      }
    }

    if (entry.changes.removedKeys.length > 0) {
      md += `- **Removed keys:** ${entry.changes.removedKeys.join(", ")}\n`;
      for (const key of entry.changes.removedKeys) {
        const diff = entry.changes.dataDiff[key];
        md += `  - \`${key}\`: ${JSON.stringify(diff.before)} → (removed)\n`;
      }
    }

    md += `\n`;
  }

  return md;
}
