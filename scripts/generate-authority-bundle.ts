import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import type { LegalAuthorityFile } from "../data/authority/schema";
import { saveRuleHistorySnapshot } from "@/lib/authority/history";

const AUTHORITY_BASE_DIR = path.join(process.cwd(), "data", "authority");
const GENERATED_BASE_DIR = path.join(process.cwd(), "lib", "authority", "generated");
const BUNDLE_PATH = path.join(process.cwd(), "lib", "authority", "bundle.ts");

function loadExistingBundle(): Record<string, Record<string, any>> | null {
  if (!fs.existsSync(BUNDLE_PATH)) return null;
  try {
    // Extract the JSON object from the TypeScript file
    const content = fs.readFileSync(BUNDLE_PATH, "utf-8");
    const match = content.match(/const authorityBundle: Record<string, Record<string, LegalRuleBlock>> = ([\s\S]*?);\n\nexport function/);
    if (match) {
      return JSON.parse(match[1]);
    }
  } catch {
    // ignore
  }
  return null;
}

async function loadGeneratedRules(): Promise<Record<string, Record<string, any>>> {
  const generated: Record<string, Record<string, any>> = {};
  if (!fs.existsSync(GENERATED_BASE_DIR)) {
    return generated;
  }

  const topics = fs.readdirSync(GENERATED_BASE_DIR).filter((d) => {
    const fullPath = path.join(GENERATED_BASE_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const topic of topics) {
    const topicDir = path.join(GENERATED_BASE_DIR, topic);
    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".ts"));

    for (const file of files) {
      const jurisdiction = file.replace(".ts", "");
      const filePath = path.join(topicDir, file);
      const fileUrl = pathToFileURL(filePath).href;

      try {
        const mod = await import(fileUrl);
        const varName = `rule_${topic.replace(/-/g, "_")}_${jurisdiction.replace(/-/g, "_")}`;
        const rule = mod[varName];
        if (rule) {
          if (!generated[topic]) {
            generated[topic] = {};
          }
          generated[topic][jurisdiction] = rule;
        }
      } catch (e) {
        console.warn(`Failed to load generated rule ${topic}/${jurisdiction}:`, e);
      }
    }
  }

  return generated;
}

async function generateBundle() {
  const existingBundle = loadExistingBundle();
  const bundle: Record<string, Record<string, any>> = {};

  // 1. Load real authority JSON files (these take precedence)
  if (fs.existsSync(AUTHORITY_BASE_DIR)) {
    const countries = fs.readdirSync(AUTHORITY_BASE_DIR).filter((d) => {
      const fullPath = path.join(AUTHORITY_BASE_DIR, d);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const country of countries) {
      const countryDir = path.join(AUTHORITY_BASE_DIR, country);
      const stateDirs = fs.readdirSync(countryDir).filter((d) => {
        const fullPath = path.join(countryDir, d);
        return fs.statSync(fullPath).isDirectory();
      });

      for (const state of stateDirs) {
        const statePath = path.join(countryDir, state);
        const files = fs.readdirSync(statePath).filter((f) => f.endsWith(".json"));

        for (const file of files) {
          const content = fs.readFileSync(path.join(statePath, file), "utf-8");
          const authority: LegalAuthorityFile = JSON.parse(content);
          const topic = authority.topic;

          if (!bundle[topic]) {
            bundle[topic] = {};
          }

          // Store the rule block directly
          bundle[topic][state] = authority.rule;
        }
      }
    }
  }

  // 2. Merge generated placeholder rules (JSON rules take precedence)
  const generatedRules = await loadGeneratedRules();
  for (const [topic, jurisdictions] of Object.entries(generatedRules)) {
    if (!bundle[topic]) {
      bundle[topic] = {};
    }
    for (const [jurisdiction, rule] of Object.entries(jurisdictions)) {
      // Only add if not already present from JSON
      if (!bundle[topic][jurisdiction]) {
        bundle[topic][jurisdiction] = rule;
      }
    }
  }

  // 3. Save history snapshots for changed rules
  if (existingBundle) {
    for (const [topic, jurisdictions] of Object.entries(bundle)) {
      for (const [jurisdiction, rule] of Object.entries(jurisdictions)) {
        const existingRule = existingBundle[topic]?.[jurisdiction];
        if (existingRule && JSON.stringify(existingRule) !== JSON.stringify(rule)) {
          saveRuleHistorySnapshot(topic, jurisdiction, existingRule);
        }
      }
    }
  }

  const bundleContent = `// Auto-generated from /data/authority/ JSON files and /lib/authority/generated/ TS files
// Do not edit manually. Run: npm run ingest:authority

import type { LegalRuleBlock } from "@/data/authority/schema";

export const authorityBundle: Record<string, Record<string, LegalRuleBlock>> = ${JSON.stringify(bundle, null, 2)};

export function getRuleFromBundle(
  state: string,
  topic: string
): LegalRuleBlock | null {
  const topicData = authorityBundle[topic];
  if (!topicData) return null;
  const rule = topicData[state.toLowerCase()];
  if (!rule) return null;
  return rule;
}
`;

  fs.writeFileSync(BUNDLE_PATH, bundleContent, "utf-8");
  console.log(`Authority bundle generated at ${BUNDLE_PATH}`);
  console.log(`Topics: ${Object.keys(bundle).length}`);
  console.log(`Total state-topic entries: ${Object.values(bundle).reduce((sum, t) => sum + Object.keys(t).length, 0)}`);
}

generateBundle();
