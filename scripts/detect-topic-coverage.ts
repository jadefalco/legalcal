#!/usr/bin/env tsx
/**
 * Detect topic coverage across all jurisdictions.
 *
 * Reads data/topics.json and data/authority/ to compute
 * placeholder vs. real rule counts per topic.
 *
 * Outputs: reports/topics/coverage.json
 */

import * as fs from "fs";
import * as path from "path";
import { jurisdictions } from "../lib/authority/jurisdictions";

const TOPICS_FILE = path.join("data", "topics.json");
const OUT_DIR = path.join("reports", "topics");
const OUT_FILE = path.join(OUT_DIR, "coverage.json");

function isPlaceholderRule(rule: any): boolean {
  if (!rule) return true;
  if (rule.rule?.version?.version === "0.0") return true;
  if (
    Array.isArray(rule.rule?.version?.notes) &&
    rule.rule.version.notes.some((n: string) => n.includes("Placeholder auto-generated"))
  ) {
    return true;
  }
  return false;
}

function main() {
  const topics = fs.existsSync(TOPICS_FILE)
    ? JSON.parse(fs.readFileSync(TOPICS_FILE, "utf-8"))
    : [];

  const coverage = topics.map((t: any) => {
    let placeholder = 0;
    let real = 0;

    for (const j of jurisdictions) {
      const countryDir = j.country === "ca" ? "ca" : "us";
      const ruleFile = path.join(
        "data",
        "authority",
        countryDir,
        j.code,
        `${t.id}.json`
      );

      if (fs.existsSync(ruleFile)) {
        const rule = JSON.parse(fs.readFileSync(ruleFile, "utf-8"));
        if (isPlaceholderRule(rule)) {
          placeholder++;
        } else {
          real++;
        }
      } else {
        placeholder++;
      }
    }

    return {
      id: t.id,
      label: t.label,
      total: jurisdictions.length,
      placeholder,
      real,
    };
  });

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(coverage, null, 2), "utf-8");

  console.log("Topic coverage:");
  for (const c of coverage) {
    const status =
      c.real === c.total
        ? "complete"
        : `${c.real}/${c.total} real (${c.placeholder} placeholders)`;
    console.log(`  - ${c.label || c.id}: ${status}`);
  }
}

main();
