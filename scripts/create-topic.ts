#!/usr/bin/env tsx
/**
 * Scaffold generator: create-topic
 *
 * Generates placeholder rules, history files, and registers a new topic.
 *
 * Usage:
 *   npx tsx scripts/create-topic.ts --topic utilities --label "Utilities and Essential Services"
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { jurisdictions } from "../lib/authority/jurisdictions";
import { registerTopic } from "../lib/authority/topic";

interface CreateTopicArgs {
  topic: string;
  label: string;
  description?: string;
  skipIngest?: boolean;
}

function parseArgs(): CreateTopicArgs {
  const args = process.argv.slice(2);
  let topic = "";
  let label = "";
  let description = "";
  let skipIngest = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === "--label" && args[i + 1]) {
      label = args[i + 1];
      i++;
    } else if (args[i] === "--description" && args[i + 1]) {
      description = args[i + 1];
      i++;
    } else if (args[i] === "--skip-ingest") {
      skipIngest = true;
    }
  }

  if (!topic || !label) {
    console.error(
      "Usage: npx tsx scripts/create-topic.ts --topic <id> --label <label> [--description <text>] [--skip-ingest]"
    );
    console.error(
      'Example: npx tsx scripts/create-topic.ts --topic utilities --label "Utilities and Essential Services"'
    );
    process.exit(1);
  }

  return { topic, label, description, skipIngest };
}

function createPlaceholderRule(
  topic: string,
  jurisdiction: string,
  country: string
) {
  return {
    jurisdiction: {
      country,
      state: jurisdiction,
    },
    topic,
    rule: {
      data: {
        description: `Placeholder rule for ${topic} in ${jurisdiction.toUpperCase()}.`,
        fields: {},
        notes: [
          "This is a placeholder rule. Replace with actual regulatory data.",
        ],
      },
      citations: [],
      version: {
        version: "0.0",
        effectiveDate: "2026-01-01",
        supersedes: null,
        notes: ["Placeholder auto-generated"],
      },
    },
  };
}

function addToCalculatorsConfig(topic: string, label: string) {
  const configPath = path.join("app", "config", "calculators.js");
  if (!fs.existsSync(configPath)) {
    console.warn(`Calculators config not found at ${configPath}`);
    return;
  }

  let content = fs.readFileSync(configPath, "utf-8");

  // Check if already exists
  if (content.includes(`slug: "${topic}"`)) {
    console.log(`  Calculator config already contains "${topic}"`);
    return;
  }

  // Find the last entry and insert after it
  const newEntry = `  {\n    name: "${label}",\n    slug: "${topic}",\n    description:\n      "Calculate ${label.toLowerCase()} rules and deadlines for your jurisdiction.",\n  },\n`;

  // Insert before the closing `];`
  const closingIndex = content.lastIndexOf("];");
  if (closingIndex === -1) {
    console.warn("Could not find closing bracket in calculators config");
    return;
  }

  content = content.slice(0, closingIndex) + newEntry + content.slice(closingIndex);
  fs.writeFileSync(configPath, content, "utf-8");
  console.log(`  Added "${topic}" to calculators config`);
}

function generateCalculatorPage(topic: string, label: string) {
  const calcDir = path.join("app", "calculators", topic);
  if (!fs.existsSync(calcDir)) {
    fs.mkdirSync(calcDir, { recursive: true });
  }

  const pagePath = path.join(calcDir, "page.tsx");
  if (fs.existsSync(pagePath)) {
    console.log(`  Calculator page already exists at ${pagePath}`);
    return;
  }

  const content = `import Link from "next/link";
import { calculators } from "@/app/config/calculators";
import { usStates } from "@/app/config/usStates";
import { caProvinces } from "@/app/config/caProvinces";

export const metadata = {
  title: "${label} Calculator — Select Your Jurisdiction",
  description: "Calculate ${label.toLowerCase()} rules and deadlines for your jurisdiction.",
};

export default function ${topic.replace(/-/g, "_")}CalculatorPage() {
  const calc = calculators.find((c) => c.slug === "${topic}");

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        {calc?.name || "${label}"} Calculator
      </h1>
      <p className="text-slate-600 mb-8">
        {calc?.description || "Calculate rules and deadlines for your jurisdiction."}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Canada</h2>
          <div className="grid gap-2">
            {Object.values(caProvinces).map((province) => (
              <Link
                key={province.slug}
                href={\`/calculators/ca/\${province.slug}/${topic}\`}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {province.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">United States</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.values(usStates).map((state) => (
              <Link
                key={state.slug}
                href={\`/calculators/us/\${state.slug}/${topic}\`}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Unified Analysis</h2>
        <p className="text-sm text-slate-600 mb-4">
          Run all engines (intelligence, reasoning, risk, forecast, etc.) against a single scenario.
        </p>
        <Link
          href={\`/admin/unified/${topic}\`}
          className="inline-block rounded-md bg-blue-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800"
        >
          Open Unified View
        </Link>
      </div>
    </main>
  );
}
`;

  fs.writeFileSync(pagePath, content, "utf-8");
  console.log(`  Generated calculator page: ${pagePath}`);
}

async function main() {
  const { topic, label, description, skipIngest } = parseArgs();
  const normalizedTopic = topic.toLowerCase().trim().replace(/\s+/g, "-");

  console.log(`Creating topic: ${normalizedTopic}`);
  console.log(`Label: ${label}`);

  // 1. Register topic metadata
  registerTopic(normalizedTopic, label, description);
  console.log("\n✓ Registered topic metadata");

  // 2. Create placeholder authority files
  let created = 0;
  for (const j of jurisdictions) {
    const countryDir = j.country === "ca" ? "ca" : "us";
    const dir = path.join("data", "authority", countryDir, j.code);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${normalizedTopic}.json`);
    if (fs.existsSync(filePath)) {
      continue;
    }

    const placeholder = createPlaceholderRule(normalizedTopic, j.code, j.country);
    fs.writeFileSync(filePath, JSON.stringify(placeholder, null, 2), "utf-8");
    created++;
  }
  console.log(`✓ Created ${created} placeholder authority files`);

  // 3. Create empty history files
  let historyCreated = 0;
  for (const j of jurisdictions) {
    const dir = path.join("data", "rule-history", normalizedTopic);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${j.code}.json`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
      historyCreated++;
    }
  }
  console.log(`✓ Created ${historyCreated} history files`);

  // 4. Add to calculators config
  addToCalculatorsConfig(normalizedTopic, label);

  // 5. Generate calculator landing page
  generateCalculatorPage(normalizedTopic, label);

  // 6. Ingest authority bundle
  if (!skipIngest) {
    console.log("\n▶ Ingesting authority bundle...");
    try {
      execSync("npm run ingest:authority", {
        cwd: process.cwd(),
        stdio: "inherit",
      });
      console.log("✓ Authority bundle ingested");
    } catch (e) {
      console.error("✗ Authority ingestion failed:", (e as Error).message);
    }
  }

  console.log(`\nTopic "${normalizedTopic}" is ready.`);
  console.log(`  Placeholder rules: ${created}`);
  console.log(`  History files: ${historyCreated}`);
  console.log(`  Next steps:`);
  console.log(`    1. Edit rules in data/authority/*/${normalizedTopic}.json`);
  console.log(`    2. Run: npm run build`);
  console.log(`    3. Visit: /admin/topics`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
