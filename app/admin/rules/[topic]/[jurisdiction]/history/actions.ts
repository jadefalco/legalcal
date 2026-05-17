"use server";

import { redirect } from "next/navigation";
import { readFileSync, writeFileSync } from "fs";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  loadRuleHistory,
  saveRuleHistorySnapshot,
} from "@/lib/authority/history";
import type { LegalRuleBlock } from "@/data/authority/schema";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateBundleFile(
  topic: string,
  jurisdiction: string,
  rule: LegalRuleBlock
): void {
  const path = "lib/authority/bundle.ts";
  let content = readFileSync(path, "utf-8");

  const topicRe = new RegExp(`"${escapeRegex(topic)}":\\s*\\{`);
  const topicMatch = content.match(topicRe);
  if (!topicMatch || topicMatch.index === undefined) {
    throw new Error(`Topic "${topic}" not found in bundle`);
  }

  const searchSlice = content.slice(topicMatch.index);
  const jurisRe = new RegExp(`"${escapeRegex(jurisdiction)}":\\s*\\{`);
  const jurisMatch = searchSlice.match(jurisRe);
  if (!jurisMatch || jurisMatch.index === undefined) {
    throw new Error(
      `Jurisdiction "${jurisdiction}" not found under topic "${topic}"`
    );
  }

  const blockStart = topicMatch.index + jurisMatch.index;
  let depth = 0;
  let inString = false;
  let escape = false;
  let blockEnd = -1;

  for (let i = blockStart; i < content.length; i++) {
    const c = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\") {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) {
        blockEnd = i;
        break;
      }
    }
  }

  if (blockEnd === -1) {
    throw new Error("Could not find end of jurisdiction block");
  }

  const newBlock = `"${jurisdiction}": ${JSON.stringify(rule, null, 2)}`;
  content =
    content.slice(0, blockStart) + newBlock + content.slice(blockEnd + 1);
  writeFileSync(path, content);
}

export async function rollbackRule(
  topic: string,
  jurisdiction: string,
  version: string
) {
  const history = loadRuleHistory(topic, jurisdiction);
  const entry = history.find((h) => h.version === version);

  if (!entry) {
    throw new Error(`Version ${version} not found in history`);
  }

  // Update in-memory bundle
  if (!authorityBundle[topic]) {
    authorityBundle[topic] = {};
  }
  authorityBundle[topic][jurisdiction] = entry.rule;

  // Persist to bundle file
  updateBundleFile(topic, jurisdiction, entry.rule);

  // Save a new snapshot so the rollback itself is tracked
  saveRuleHistorySnapshot(topic, jurisdiction, entry.rule);

  redirect(`/admin/rules/${topic}/${jurisdiction}`);
}
