/**
 * Trend Analysis Engine (Time-Series Regulatory Intelligence)
 *
 * Tracks rule changes, risk shifts, similarity drift, and jurisdiction
 * movement over time by reading snapshot files and computing deltas.
 */

import * as fs from "fs";
import * as path from "path";
import { authorityBundle } from "./bundle";
import { scoreRisk } from "./risk";
import {
  computeJurisdictionVector,
  computeSimilarity,
} from "./similarity";
import { jurisdictions } from "./jurisdictions";
import type { LegalRuleBlock } from "@/data/authority/schema";

// ── Types ──

export interface TrendSnapshot {
  topic: string;
  jurisdiction: string;
  timestamp: string;

  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  overallRisk: "low" | "medium" | "high";

  similarityVector: number[];
  ruleVersion: string;
}

export interface TrendAnalysis {
  topic: string;
  jurisdiction: string;

  snapshots: TrendSnapshot[];

  riskTrend: {
    structural: number[];
    procedural: number[];
    documentation: number[];
    overall: number[];
  };

  similarityDrift: number[];

  ruleChanges: Array<{
    fromVersion: string;
    toVersion: string;
    timestamp: string;
  }>;

  volatilityScore: number;
}

export interface NationalTrendReport {
  topic: string;
  jurisdictions: Array<{
    jurisdiction: string;
    name: string;
    country: string;
    volatilityScore: number;
    trendDirection: "tightening" | "loosening" | "stable";
    lastRisk: "low" | "medium" | "high";
    lastRuleVersion: string;
  }>;
}

// ── Helpers ──

function riskToNumeric(risk: "low" | "medium" | "high"): number {
  return risk === "low" ? 0 : risk === "medium" ? 0.5 : 1;
}

function numericToRiskLabel(value: number): "low" | "medium" | "high" {
  if (value <= 0.25) return "low";
  if (value <= 0.65) return "medium";
  return "high";
}

function isPlaceholderRule(rule: LegalRuleBlock | undefined): boolean {
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

function variance(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sqDiffs = values.map((v) => (v - mean) ** 2);
  return sqDiffs.reduce((a, b) => a + b, 0) / values.length;
}

// ── A. Compute Snapshot ──

export function computeTrendSnapshot(
  topic: string,
  jurisdiction: string,
  scenarioText: string
): TrendSnapshot {
  const rule = authorityBundle[topic]?.[jurisdiction];
  if (!rule || isPlaceholderRule(rule)) {
    return {
      topic,
      jurisdiction,
      timestamp: new Date().toISOString(),
      structuralRisk: "low",
      proceduralRisk: "low",
      documentationRisk: "low",
      overallRisk: "low",
      similarityVector: new Array(10).fill(0),
      ruleVersion: rule?.version?.version ?? "0.0",
    };
  }

  const risk = scoreRisk(topic, jurisdiction, scenarioText, rule);
  const vectorObj = computeJurisdictionVector(topic, jurisdiction, scenarioText, rule);

  return {
    topic,
    jurisdiction,
    timestamp: new Date().toISOString(),
    structuralRisk: risk.structuralRisk,
    proceduralRisk: risk.proceduralRisk,
    documentationRisk: risk.documentationRisk,
    overallRisk: risk.overallRisk,
    similarityVector: vectorObj.vector,
    ruleVersion: rule.version.version,
  };
}

// ── B. Load Historical Snapshots ──

export function loadHistoricalSnapshots(
  topic: string,
  jurisdiction: string
): TrendSnapshot[] {
  const dir = path.join("reports", "trends", topic, jurisdiction);
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const snapshots: TrendSnapshot[] = [];
  for (const file of files) {
    try {
      const content = JSON.parse(
        fs.readFileSync(path.join(dir, file), "utf-8")
      );
      if (
        content &&
        typeof content.topic === "string" &&
        typeof content.jurisdiction === "string"
      ) {
        snapshots.push(content as TrendSnapshot);
      }
    } catch {
      // Skip malformed files
    }
  }

  return snapshots;
}

// ── C. Compute Trend Analysis ──

export function computeTrendAnalysis(
  topic: string,
  jurisdiction: string,
  scenarioText?: string
): TrendAnalysis {
  // Load existing snapshots
  const historical = loadHistoricalSnapshots(topic, jurisdiction);

  // If a scenario is provided, compute a fresh snapshot and append
  let snapshots = historical;
  if (scenarioText && scenarioText.trim().length > 10) {
    const fresh = computeTrendSnapshot(topic, jurisdiction, scenarioText);
    snapshots = [...historical, fresh];
  }

  // If no snapshots at all, return empty analysis
  if (snapshots.length === 0) {
    return {
      topic,
      jurisdiction,
      snapshots: [],
      riskTrend: { structural: [], procedural: [], documentation: [], overall: [] },
      similarityDrift: [],
      ruleChanges: [],
      volatilityScore: 0,
    };
  }

  // Risk trends as numeric values
  const structural = snapshots.map((s) => riskToNumeric(s.structuralRisk));
  const procedural = snapshots.map((s) => riskToNumeric(s.proceduralRisk));
  const documentation = snapshots.map((s) => riskToNumeric(s.documentationRisk));
  const overall = snapshots.map((s) => riskToNumeric(s.overallRisk));

  // Similarity drift = cosine distance between consecutive vectors
  const drift: number[] = [];
  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1].similarityVector;
    const curr = snapshots[i].similarityVector;
    if (
      !prev ||
      !curr ||
      !Array.isArray(prev) ||
      !Array.isArray(curr) ||
      prev.length !== curr.length
    ) {
      continue;
    }
    const sim = computeSimilarity(prev, curr);
    drift.push(Math.max(0, 1 - sim)); // cosine distance, clamped
  }

  // Rule version changes
  const ruleChanges: TrendAnalysis["ruleChanges"] = [];
  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const curr = snapshots[i];
    if (curr.ruleVersion !== prev.ruleVersion) {
      ruleChanges.push({
        fromVersion: prev.ruleVersion,
        toVersion: curr.ruleVersion,
        timestamp: curr.timestamp,
      });
    }
  }

  // Volatility score = average of normalized components
  const riskValues = [...structural, ...procedural, ...documentation, ...overall];
  const riskVar = riskValues.length > 0 ? variance(riskValues) : 0;
  const avgDrift = drift.length > 0 ? drift.reduce((a, b) => a + b, 0) / drift.length : 0;
  const changeFreq =
    snapshots.length > 1 ? ruleChanges.length / (snapshots.length - 1) : 0;

  // Normalize each component to 0–1
  const normalizedRiskVar = Math.min(1, riskVar * 4); // variance of 0.25 → 1
  const normalizedDrift = Math.min(1, avgDrift * 2); // drift of 0.5 → 1
  const normalizedChangeFreq = Math.min(1, changeFreq * 2); // 50% change rate → 1

  const volatilityScore =
    (normalizedRiskVar + normalizedDrift + normalizedChangeFreq) / 3;

  return {
    topic,
    jurisdiction,
    snapshots,
    riskTrend: { structural, procedural, documentation, overall },
    similarityDrift: drift,
    ruleChanges,
    volatilityScore: Math.round(volatilityScore * 100) / 100,
  };
}

// ── D. Compute National Trends ──

export function computeNationalTrends(
  topic: string,
  scenarioText?: string
): NationalTrendReport {
  const results: NationalTrendReport["jurisdictions"] = [];

  for (const j of jurisdictions) {
    const analysis = computeTrendAnalysis(
      topic,
      j.code,
      scenarioText
    );

    // Determine trend direction from last 3 snapshots (or fewer)
    const recent = analysis.snapshots.slice(-3);
    let trendDirection: "tightening" | "loosening" | "stable" = "stable";

    if (recent.length >= 2) {
      const earlyOverall = recent
        .slice(0, Math.floor(recent.length / 2))
        .map((s) => riskToNumeric(s.overallRisk))
        .reduce((a, b) => a + b, 0) / Math.floor(recent.length / 2);

      const lateOverall = recent
        .slice(Math.floor(recent.length / 2))
        .map((s) => riskToNumeric(s.overallRisk))
        .reduce((a, b) => a + b, 0) /
        (recent.length - Math.floor(recent.length / 2));

      const delta = lateOverall - earlyOverall;
      if (delta > 0.15) trendDirection = "tightening";
      else if (delta < -0.15) trendDirection = "loosening";
      else trendDirection = "stable";
    }

    const lastSnapshot = analysis.snapshots[analysis.snapshots.length - 1];
    const lastRisk = lastSnapshot?.overallRisk ?? "low";
    const lastVersion = lastSnapshot?.ruleVersion ?? "0.0";

    results.push({
      jurisdiction: j.code,
      name: j.name,
      country: j.country,
      volatilityScore: analysis.volatilityScore,
      trendDirection,
      lastRisk,
      lastRuleVersion: lastVersion,
    });
  }

  // Sort by volatility descending
  results.sort((a, b) => b.volatilityScore - a.volatilityScore);

  return { topic, jurisdictions: results };
}
