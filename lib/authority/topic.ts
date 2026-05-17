/**
 * Topic Management Module
 *
 * Manages topic registration, listing, and coverage tracking.
 */

import * as fs from "fs";
import * as path from "path";
import { authorityBundle } from "./bundle";
import { jurisdictions } from "./jurisdictions";

const TOPICS_FILE = path.join("data", "topics.json");

export interface TopicMeta {
  id: string;
  label: string;
  description?: string;
  createdAt: string;
  status: "active" | "placeholder" | "draft";
}

export interface TopicInfo extends TopicMeta {
  coverage: {
    total: number;
    placeholder: number;
    real: number;
    coveragePercent: number;
  };
}

// ── Helpers ──

function loadTopicsFile(): TopicMeta[] {
  if (!fs.existsSync(TOPICS_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(TOPICS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveTopicsFile(topics: TopicMeta[]) {
  const dir = path.dirname(TOPICS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), "utf-8");
}

function isPlaceholderRule(rule: any): boolean {
  if (!rule) return true;
  if (rule.version?.version === "0.0") return true;
  if (
    Array.isArray(rule.version?.notes) &&
    rule.version.notes.some((n: string) => n.includes("Placeholder auto-generated"))
  ) {
    return true;
  }
  return false;
}

// ── A. List Topics ──

export function listTopics(): TopicInfo[] {
  const registered = loadTopicsFile();
  const bundleTopics = Object.keys(authorityBundle);

  // Merge registered topics with bundle-derived topics
  const allIds = new Set<string>();
  for (const t of registered) allIds.add(t.id);
  for (const t of bundleTopics) allIds.add(t);

  const results: TopicInfo[] = [];
  for (const id of allIds) {
    const reg = registered.find((r) => r.id === id);
    const label = reg?.label || id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    // Compute coverage
    const topicRules = authorityBundle[id] || {};
    let placeholderCount = 0;
    let realCount = 0;
    for (const j of jurisdictions) {
      const rule = topicRules[j.code];
      if (isPlaceholderRule(rule)) {
        placeholderCount++;
      } else {
        realCount++;
      }
    }
    const total = jurisdictions.length;

    results.push({
      id,
      label,
      description: reg?.description,
      createdAt: reg?.createdAt || new Date().toISOString(),
      status: reg?.status || (realCount > 0 ? "active" : "placeholder"),
      coverage: {
        total,
        placeholder: placeholderCount,
        real: realCount,
        coveragePercent: Math.round((realCount / total) * 100),
      },
    });
  }

  return results.sort((a, b) => a.label.localeCompare(b.label));
}

// ── B. Register Topic ──

export function registerTopic(
  topicId: string,
  label: string,
  description?: string
): TopicMeta {
  const topics = loadTopicsFile();
  const existing = topics.find((t) => t.id === topicId);
  if (existing) {
    existing.label = label;
    if (description) existing.description = description;
    saveTopicsFile(topics);
    return existing;
  }

  const meta: TopicMeta = {
    id: topicId.toLowerCase().trim().replace(/\s+/g, "-"),
    label: label.trim(),
    description: description?.trim(),
    createdAt: new Date().toISOString(),
    status: "placeholder",
  };

  topics.push(meta);
  saveTopicsFile(topics);
  return meta;
}

// ── C. Topic Coverage ──

export function topicHasFullCoverage(topicId: string): boolean {
  const topicRules = authorityBundle[topicId];
  if (!topicRules) return false;

  for (const j of jurisdictions) {
    const rule = topicRules[j.code];
    if (isPlaceholderRule(rule)) {
      return false;
    }
  }
  return true;
}

export function getTopicCoverage(topicId: string): {
  total: number;
  placeholder: number;
  real: number;
  coveragePercent: number;
} {
  const topicRules = authorityBundle[topicId] || {};
  let placeholderCount = 0;
  let realCount = 0;

  for (const j of jurisdictions) {
    const rule = topicRules[j.code];
    if (isPlaceholderRule(rule)) {
      placeholderCount++;
    } else {
      realCount++;
    }
  }

  const total = jurisdictions.length;
  return {
    total,
    placeholder: placeholderCount,
    real: realCount,
    coveragePercent: Math.round((realCount / total) * 100),
  };
}
