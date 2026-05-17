/**
 * Rule Intelligence Layer
 * Generates natural-language insights, comparisons, explanations,
 and summaries from structured rule data.
 */

import type { LegalRuleBlock } from "@/data/authority/schema";
import type { RuleDiff } from "@/lib/authority/history";
import { getRuleFreshness } from "@/lib/authority/freshness";
import { compareRules as compareRuleDiff } from "@/lib/authority/history";

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────

export interface RuleSummary {
  title: string;
  summary: string;
  keyPoints: string[];
  citationsUsed: string[];
}

export interface RuleComparison {
  differences: string[];
  similarities: string[];
  severity: "low" | "medium" | "high";
}

export interface RuleChangeExplanation {
  headline: string;
  explanation: string;
  bulletPoints: string[];
}

export interface JurisdictionSummary {
  topic: string;
  jurisdiction: string;
  summary: string;
  keyPoints: string[];
  citations: string[];
}

// ───────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return "not specified";
  if (typeof v === "boolean") return v ? "yes" : "no";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    if (v.length === 0) return "none";
    return v.map(formatValue).join(", ");
  }
  if (typeof v === "object") {
    const entries = Object.entries(v as Record<string, unknown>)
      .filter(([, val]) => val !== null && val !== undefined)
      .map(([k, val]) => `${k}: ${formatValue(val)}`);
    return entries.join("; ");
  }
  return String(v);
}

function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function sentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ───────────────────────────────────────────────────────────────
// A. summarizeRule
// ───────────────────────────────────────────────────────────────

export function summarizeRule(rule: LegalRuleBlock): RuleSummary {
  const data = rule.data as Record<string, unknown>;
  const citationsUsed = rule.citations.map((c) => c.statute);
  const keyPoints: string[] = [];
  let summaryParts: string[] = [];

  // Generic data-driven summary builder
  const year = typeof data.year === "number" ? data.year : null;
  const sourceUrl = typeof data.sourceUrl === "string" ? data.sourceUrl : null;

  // Build key points from data keys
  for (const [key, value] of Object.entries(data)) {
    if (key === "sourceUrl" || key === "year" || value === null || value === undefined) continue;

    const label = humanizeKey(key);
    const formatted = formatValue(value);

    if (key.toLowerCase().includes("deadline") || key.toLowerCase().includes("period") || key.toLowerCase().includes("notice")) {
      keyPoints.push(`${label} is ${formatted}.`);
    } else if (key.toLowerCase().includes("max") || key.toLowerCase().includes("cap") || key.toLowerCase().includes("limit") || key.toLowerCase().includes("percent")) {
      keyPoints.push(`The ${label.toLowerCase()} is ${formatted}.`);
    } else if (key.toLowerCase().includes("required") || key.toLowerCase().includes("allowed") || key.toLowerCase().includes("permitted")) {
      keyPoints.push(`${label} is ${formatted}.`);
    } else {
      keyPoints.push(`${label}: ${formatted}.`);
    }
  }

  // Topic-aware narrative
  const topicHints = Object.keys(data).join(" ").toLowerCase();

  if (topicHints.includes("rent") && topicHints.includes("increase")) {
    const maxInc = data.maxIncreasePercent ?? data.maxIncrease ?? data.capPercent;
    const notice = data.noticePeriodDays ?? data.noticeMonths ?? data.noticePeriod;
    const freq = data.frequencyLimitMonths;

    if (maxInc !== undefined && maxInc !== null) {
      summaryParts.push(`Rent increases are capped at ${formatValue(maxInc)}.`);
    }
    if (notice !== undefined && notice !== null) {
      summaryParts.push(`Landlords must provide ${formatValue(notice)} notice before increasing rent.`);
    }
    if (freq !== undefined && freq !== null) {
      summaryParts.push(`Increases are limited to once every ${formatValue(freq)}.`);
    }
  }

  if (topicHints.includes("deposit") && (topicHints.includes("return") || topicHints.includes("deadline"))) {
    const deadline = data.returnDeadline ?? data.returnDeadlineDays;
    const interest = data.interestRequired;
    const penalties = data.penalties;

    if (deadline !== undefined && deadline !== null) {
      summaryParts.push(`Security deposits must be returned within ${formatValue(deadline)}.`);
    }
    if (interest !== undefined && interest !== null) {
      summaryParts.push(`Interest ${interest ? "is" : "is not"} required on returned deposits.`);
    }
    if (penalties && Array.isArray(penalties) && penalties.length > 0) {
      summaryParts.push(`Penalties may apply: ${formatValue(penalties)}.`);
    }
  }

  if (topicHints.includes("eviction") || topicHints.includes("notice")) {
    const noticeForNonpayment = data.noticeForNonpayment ?? data.noticePeriodDays;
    if (noticeForNonpayment !== undefined && noticeForNonpayment !== null) {
      summaryParts.push(`Tenants must be given ${formatValue(noticeForNonpayment)} notice before eviction proceedings.`);
    }
  }

  if (topicHints.includes("lease") && topicHints.includes("termination")) {
    const noticeRequired = data.noticeRequired ?? data.noticePeriodDays ?? data.landlordNoticePeriodDays;
    if (noticeRequired !== undefined && noticeRequired !== null) {
      summaryParts.push(`Lease termination requires ${formatValue(noticeRequired)} notice.`);
    }
  }

  if (topicHints.includes("entry")) {
    const hours = data.noticeHours ?? data.entryNoticeHours;
    if (hours !== undefined && hours !== null) {
      summaryParts.push(`Landlords must provide ${formatValue(hours)} notice before entering a rental unit.`);
    }
  }

  if (topicHints.includes("repair")) {
    const allowed = data.allowed;
    if (allowed !== undefined && allowed !== null) {
      summaryParts.push(`Tenants ${allowed ? "may" : "may not"} repair and deduct costs from rent.`);
    }
  }

  if (topicHints.includes("late")) {
    const maxFee = data.maxLateFeePercent ?? data.maxLateFeeAmount;
    if (maxFee !== undefined && maxFee !== null) {
      summaryParts.push(`Late fees are capped at ${formatValue(maxFee)}.`);
    }
  }

  // Fallback generic summary if no topic-specific narrative was built
  if (summaryParts.length === 0) {
    const dataKeys = Object.keys(data).filter((k) => k !== "sourceUrl" && k !== "year" && data[k] !== null && data[k] !== undefined);
    if (dataKeys.length > 0) {
      summaryParts.push(`This rule covers ${dataKeys.length} data points including ${humanizeKey(dataKeys[0]).toLowerCase()}.`);
    } else {
      summaryParts.push("This rule has no structured data yet.");
    }
  }

  if (year) {
    summaryParts.push(`The current rule applies to ${year}.`);
  }

  if (rule.version.effectiveDate) {
    summaryParts.push(`It became effective on ${rule.version.effectiveDate}.`);
  }

  if (citationsUsed.length > 0) {
    summaryParts.push(`Citations include ${citationsUsed.slice(0, 3).join(", ")}${citationsUsed.length > 3 ? " and others" : ""}.`);
  }

  const summary = sentenceCase(summaryParts.join(" "));

  // Title
  const title = rule.citations[0]?.statute ?? "Rule Summary";

  return {
    title,
    summary,
    keyPoints: keyPoints.slice(0, 8),
    citationsUsed,
  };
}

// ───────────────────────────────────────────────────────────────
// B. compareRules
// ───────────────────────────────────────────────────────────────

export function compareRules(a: LegalRuleBlock, b: LegalRuleBlock): RuleComparison {
  const diff = compareRuleDiff(a, b);
  const differences: string[] = [];
  const similarities: string[] = [];

  // Narrate changed keys
  for (const key of diff.changedKeys) {
    const change = diff.dataDiff[key];
    const before = formatValue(change.before);
    const after = formatValue(change.after);
    differences.push(`${humanizeKey(key)} changed from ${before} to ${after}.`);
  }

  // Narrate added keys
  for (const key of diff.addedKeys) {
    const val = formatValue(diff.dataDiff[key].after);
    differences.push(`${humanizeKey(key)} was added, now set to ${val}.`);
  }

  // Narrate removed keys
  for (const key of diff.removedKeys) {
    differences.push(`${humanizeKey(key)} was removed.`);
  }

  // Find similarities: keys that exist in both with same value
  const aKeys = Object.keys(a.data);
  const bKeys = Object.keys(b.data);
  const sharedKeys = aKeys.filter((k) => bKeys.includes(k) && !diff.changedKeys.includes(k));
  for (const key of sharedKeys) {
    if (key === "sourceUrl") continue;
    const val = formatValue(a.data[key]);
    similarities.push(`Both rules share the same ${humanizeKey(key).toLowerCase()}: ${val}.`);
  }

  // Severity
  let severity: "low" | "medium" | "high" = "low";
  const hasNumericChange = diff.changedKeys.some((k) => {
    const change = diff.dataDiff[k];
    return typeof change.before === "number" || typeof change.after === "number";
  });
  const hasStructuralChange = diff.addedKeys.length > 0 || diff.removedKeys.length > 0;

  if (hasNumericChange && diff.changedKeys.length >= 3) {
    severity = "high";
  } else if (hasStructuralChange || diff.changedKeys.length >= 2) {
    severity = "medium";
  } else if (diff.changedKeys.length === 1) {
    severity = hasNumericChange ? "medium" : "low";
  }

  return {
    differences: differences.slice(0, 10),
    similarities: similarities.slice(0, 6),
    severity,
  };
}

// ───────────────────────────────────────────────────────────────
// C. explainRuleChange
// ───────────────────────────────────────────────────────────────

export function explainRuleChange(
  diff: RuleDiff,
  oldVersion: string,
  newVersion: string
): RuleChangeExplanation {
  const bulletPoints: string[] = [];

  for (const key of diff.changedKeys) {
    const change = diff.dataDiff[key];
    const before = formatValue(change.before);
    const after = formatValue(change.after);

    if (typeof change.before === "number" && typeof change.after === "number") {
      const direction = (change.after as number) > (change.before as number) ? "increased" : "decreased";
      bulletPoints.push(`${humanizeKey(key)} ${direction} from ${before} to ${after}.`);
    } else {
      bulletPoints.push(`${humanizeKey(key)} changed from "${before}" to "${after}".`);
    }
  }

  for (const key of diff.addedKeys) {
    const val = formatValue(diff.dataDiff[key].after);
    bulletPoints.push(`A new ${humanizeKey(key).toLowerCase()} was added: ${val}.`);
  }

  for (const key of diff.removedKeys) {
    bulletPoints.push(`${humanizeKey(key)} was removed.`);
  }

  const headline =
    diff.changedKeys.length > 0
      ? `${diff.changedKeys.length} value${diff.changedKeys.length !== 1 ? "s" : ""} changed`
      : diff.addedKeys.length > 0
      ? `${diff.addedKeys.length} new field${diff.addedKeys.length !== 1 ? "s" : ""} added`
      : diff.removedKeys.length > 0
      ? `${diff.removedKeys.length} field${diff.removedKeys.length !== 1 ? "s" : ""} removed`
      : "No structural changes";

  const explanationParts: string[] = [];
  explanationParts.push(`Version ${oldVersion} → ${newVersion}.`);

  if (diff.changedKeys.length > 0) {
    explanationParts.push(`The rule saw changes to ${diff.changedKeys.map(humanizeKey).join(", ")}.`);
  }
  if (diff.addedKeys.length > 0) {
    explanationParts.push(`New provisions were added for ${diff.addedKeys.map(humanizeKey).join(", ")}.`);
  }
  if (diff.removedKeys.length > 0) {
    explanationParts.push(`Previous provisions for ${diff.removedKeys.map(humanizeKey).join(", ")} were removed.`);
  }

  return {
    headline,
    explanation: sentenceCase(explanationParts.join(" ")),
    bulletPoints: bulletPoints.slice(0, 8),
  };
}

// ───────────────────────────────────────────────────────────────
// D. summarizeJurisdiction
// ───────────────────────────────────────────────────────────────

export function summarizeJurisdiction(
  topic: string,
  jurisdiction: string,
  rule: LegalRuleBlock
): JurisdictionSummary {
  const ruleSummary = summarizeRule(rule);
  const freshness = getRuleFreshness(rule);

  const warningPoints = freshness.warnings.map((w) => `⚠️ ${w}`);

  const keyPoints = [
    ...ruleSummary.keyPoints,
    ...(rule.version.effectiveDate
      ? [`Effective date: ${rule.version.effectiveDate}.`]
      : []),
    ...(rule.version.version !== "0.0"
      ? [`Version: ${rule.version.version}.`]
      : []),
    ...warningPoints,
  ];

  let summary = ruleSummary.summary;
  if (freshness.warnings.length > 0) {
    summary += ` Note: ${freshness.warnings.length} warning${freshness.warnings.length !== 1 ? "s" : ""} flagged for this rule.`;
  }

  return {
    topic,
    jurisdiction,
    summary,
    keyPoints,
    citations: ruleSummary.citationsUsed,
  };
}
