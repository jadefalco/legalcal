import fs from "fs";
import path from "path";
import type { LegalAuthorityFile } from "../data/authority/schema";

const AUTHORITY_DIR = path.join(process.cwd(), "data", "authority", "us");
const BUNDLE_PATH = path.join(process.cwd(), "lib", "authority", "bundle.ts");

function generateBundle() {
  if (!fs.existsSync(AUTHORITY_DIR)) {
    console.log("No authority data found.");
    return;
  }

  const bundle: Record<string, Record<string, any>> = {};

  const stateDirs = fs.readdirSync(AUTHORITY_DIR).filter((d) => {
    const fullPath = path.join(AUTHORITY_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const state of stateDirs) {
    const statePath = path.join(AUTHORITY_DIR, state);
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

  const bundleContent = `// Auto-generated from /data/authority/ JSON files
// Do not edit manually. Run: npm run ingest:authority

import type { LegalRuleBlock } from "@/data/authority/schema";

const authorityBundle: Record<string, Record<string, LegalRuleBlock>> = ${JSON.stringify(bundle, null, 2)};

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
