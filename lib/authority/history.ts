import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { LegalRuleBlock } from "@/data/authority/schema";

const HISTORY_DIR = "data/rule-history";

export interface RuleHistoryEntry {
  version: string;
  savedAt: string;
  rule: LegalRuleBlock;
}

export interface RuleDiff {
  changedKeys: string[];
  addedKeys: string[];
  removedKeys: string[];
  dataDiff: Record<string, { before: unknown; after: unknown }>;
}

function getHistoryPath(topic: string, jurisdiction: string): string {
  const dir = join(HISTORY_DIR, topic);
  mkdirSync(dir, { recursive: true });
  return join(dir, `${jurisdiction}.json`);
}

export function loadRuleHistory(
  topic: string,
  jurisdiction: string
): RuleHistoryEntry[] {
  const path = getHistoryPath(topic, jurisdiction);
  if (!existsSync(path)) {
    return [];
  }
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as RuleHistoryEntry[];
  } catch {
    return [];
  }
}

export function saveRuleHistorySnapshot(
  topic: string,
  jurisdiction: string,
  rule: LegalRuleBlock
): void {
  const history = loadRuleHistory(topic, jurisdiction);
  const latest = history[history.length - 1];

  if (latest && latest.version === rule.version.version) {
    return;
  }

  const entry: RuleHistoryEntry = {
    version: rule.version.version,
    savedAt: new Date().toISOString(),
    rule,
  };

  history.push(entry);
  const path = getHistoryPath(topic, jurisdiction);
  writeFileSync(path, JSON.stringify(history, null, 2));
}

export function getLatestHistoryEntry(
  topic: string,
  jurisdiction: string
): RuleHistoryEntry | null {
  const history = loadRuleHistory(topic, jurisdiction);
  return history[history.length - 1] ?? null;
}

function getValueType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => valuesEqual(item, b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a as object);
    const bKeys = Object.keys(b as object);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) =>
      valuesEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    );
  }
  return false;
}

export function compareRules(oldRule: LegalRuleBlock, newRule: LegalRuleBlock): RuleDiff {
  const oldData = oldRule.data;
  const newData = newRule.data;

  const oldKeys = Object.keys(oldData);
  const newKeys = Object.keys(newData);

  const addedKeys = newKeys.filter((k) => !oldKeys.includes(k));
  const removedKeys = oldKeys.filter((k) => !newKeys.includes(k));
  const changedKeys: string[] = [];
  const dataDiff: Record<string, { before: unknown; after: unknown }> = {};

  for (const key of newKeys) {
    if (oldKeys.includes(key)) {
      if (!valuesEqual(oldData[key], newData[key])) {
        changedKeys.push(key);
        dataDiff[key] = {
          before: oldData[key],
          after: newData[key],
        };
      }
    }
  }

  for (const key of addedKeys) {
    dataDiff[key] = {
      before: undefined,
      after: newData[key],
    };
  }

  for (const key of removedKeys) {
    dataDiff[key] = {
      before: oldData[key],
      after: undefined,
    };
  }

  return { changedKeys, addedKeys, removedKeys, dataDiff };
}
