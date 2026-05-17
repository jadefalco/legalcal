import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { generateChangelog, formatChangelogMarkdown } from "@/lib/authority/changelog";

function parseArgs(): { since: string; until?: string } {
  const args = process.argv.slice(2);
  let since = "";
  let until: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--since" && args[i + 1]) {
      since = args[i + 1];
      i++;
    }
    if (args[i] === "--until" && args[i + 1]) {
      until = args[i + 1];
      i++;
    }
  }

  if (!since) {
    // Default to 30 days ago
    const d = new Date();
    d.setDate(d.getDate() - 30);
    since = d.toISOString().split("T")[0];
    console.log(`No --since provided. Defaulting to ${since}`);
  }

  return { since, until };
}

function main() {
  const { since, until } = parseArgs();
  const entries = generateChangelog({ since, until });

  const reportsDir = join(process.cwd(), "reports");
  mkdirSync(reportsDir, { recursive: true });

  const dateSlug = new Date().toISOString().split("T")[0];
  const jsonPath = join(reportsDir, `changelog-${dateSlug}.json`);
  const mdPath = join(reportsDir, `changelog-${dateSlug}.md`);

  writeFileSync(jsonPath, JSON.stringify(entries, null, 2));
  writeFileSync(mdPath, formatChangelogMarkdown(entries, since));

  console.log(`Changelog generated:`);
  console.log(`  JSON: ${jsonPath}`);
  console.log(`  Markdown: ${mdPath}`);
  console.log(`  Entries: ${entries.length}`);
}

main();
