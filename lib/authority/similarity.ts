/**
 * Jurisdiction Similarity Engine
 *
 * Vectorizes jurisdiction behavior from scenario + rule data,
 * computes pairwise cosine similarity, and clusters jurisdictions
 * using k-means.
 */

import { scoreRiskForAllJurisdictions } from "@/lib/authority/risk";
import {
  analyzeScenario,
  generateCompliancePath,
  reasonAboutOutcome,
} from "@/lib/authority/reasoning";
import { authorityBundle } from "@/lib/authority/bundle";
import type { LegalRuleBlock } from "@/data/authority/schema";

export interface JurisdictionVector {
  jurisdiction: string;
  country: "CA" | "US";
  name: string;
  vector: number[];
  isPlaceholder: boolean;
}

export interface SimilarityMatrix {
  topic: string;
  scenario: string;
  vectors: JurisdictionVector[];
  matrix: Array<{
    jurisdiction: string;
    name: string;
    country: "CA" | "US";
    similarities: Array<{ jurisdiction: string; name: string; score: number }>;
  }>;
}

export interface JurisdictionCluster {
  clusterId: number;
  label: string;
  members: string[];
  memberNames: string[];
  centroid: number[];
}

// ── Vector Computation ──

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

function normalize(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.min(value / max, 1);
}

function riskValue(risk: "low" | "medium" | "high"): number {
  switch (risk) {
    case "high":
      return 1;
    case "medium":
      return 0.5;
    default:
      return 0;
  }
}

function computeStrictnessScore(rule: LegalRuleBlock): number {
  const data = rule.data as Record<string, unknown>;
  let score = 0;
  let max = 0;

  // Check for caps
  const caps = [
    "maxIncreasePercent",
    "rentIncreaseLimit",
    "capPercent",
    "maxLateFeePercent",
    "maxLateFeeAmount",
    "returnDeadline",
    "returnDeadlineDays",
  ];
  for (const key of caps) {
    max++;
    if (data[key] !== undefined && data[key] !== null) score++;
  }

  // Check for notice requirements
  const notices = ["noticePeriodDays", "noticeMonths", "noticeForNonpayment", "noticeRequired", "noticeHours"];
  for (const key of notices) {
    max++;
    if (data[key] !== undefined && data[key] !== null) score++;
  }

  // Check for boolean restrictions
  const bools = ["itemizedStatementRequired", "interestRequired", "allowed"];
  for (const key of bools) {
    max++;
    if (data[key] !== undefined && data[key] !== null) score++;
  }

  return max > 0 ? score / max : 0;
}

function computeVector(
  topic: string,
  jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): number[] {
  const analysis = analyzeScenario(topic, jurisdiction, scenarioText, rule);
  const path = generateCompliancePath(topic, jurisdiction, scenarioText, rule);
  const outcome = reasonAboutOutcome(topic, jurisdiction, scenarioText, rule);

  const structuralMismatches = analysis.potentialIssues.length;
  const proceduralGaps = analysis.missingInformation.length;

  // Documentation gaps: count missing key facts
  let docGaps = 0;
  const lower = scenarioText.toLowerCase();
  if (!/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}/.test(scenarioText)) docGaps++;
  if (!/\bnotice\b/i.test(lower)) docGaps++;
  if (!/\$\s*\d/.test(scenarioText) && !/\d+\s*dollars?/i.test(scenarioText)) docGaps++;
  if (!/\d+\s*days?/i.test(lower)) docGaps++;

  const overallRisk = riskValue(
    (() => {
      const issues = structuralMismatches;
      const missing = proceduralGaps + docGaps;
      if (issues >= 2 || missing >= 4) return "high" as const;
      if (issues >= 1 || missing >= 2) return "medium" as const;
      return "low" as const;
    })()
  );

  const outcomeComplexity = normalize(
    outcome.factors.length + outcome.uncertainties.length + outcome.alternativePaths.length,
    12
  );

  const missingFacts = proceduralGaps;
  const warnings = path.warnings.length;
  const strictness = computeStrictnessScore(rule);

  const data = rule.data as Record<string, unknown>;
  const capKeys = ["maxIncreasePercent", "rentIncreaseLimit", "capPercent", "maxLateFeePercent", "maxLateFeeAmount"];
  const hasCap = capKeys.some((k) => data[k] !== undefined && data[k] !== null) ? 1 : 0;

  const noticeDays =
    (data.noticePeriodDays as number | undefined) ??
    (data.noticeForNonpayment as number | undefined) ??
    (data.noticeRequired as number | undefined) ??
    0;
  const normalizedNotice = Math.min(noticeDays / 365, 1);

  return [
    normalize(structuralMismatches, 6),
    normalize(proceduralGaps, 6),
    normalize(docGaps, 4),
    overallRisk,
    outcomeComplexity,
    normalize(missingFacts, 6),
    normalize(warnings, 6),
    strictness,
    hasCap,
    normalizedNotice,
  ];
}

export function computeJurisdictionVector(
  topic: string,
  jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): JurisdictionVector {
  const vector = computeVector(topic, jurisdiction, scenarioText, rule);
  const country = jurisdiction.startsWith("ca-") ? "CA" : "US";

  return {
    jurisdiction,
    country,
    name: jurisdiction.toUpperCase(),
    vector,
    isPlaceholder: false,
  };
}

// ── Cosine Similarity ──

export function computeSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimension");
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ── Similarity Matrix ──

export function computeSimilarityMatrix(
  topic: string,
  scenarioText: string
): SimilarityMatrix {
  const riskResult = scoreRiskForAllJurisdictions(topic, scenarioText);

  const vectors: JurisdictionVector[] = [];

  for (const r of riskResult.results) {
    const rule = authorityBundle[topic]?.[r.jurisdiction];
    if (!rule || isPlaceholderRule(rule)) {
      // Placeholders get a zero vector
      vectors.push({
        jurisdiction: r.jurisdiction,
        country: r.country.toUpperCase() as "CA" | "US",
        name: r.name,
        vector: new Array(10).fill(0),
        isPlaceholder: true,
      });
      continue;
    }

    try {
      const vector = computeVector(topic, r.jurisdiction, scenarioText, rule);
      vectors.push({
        jurisdiction: r.jurisdiction,
        country: r.country.toUpperCase() as "CA" | "US",
        name: r.name,
        vector,
        isPlaceholder: false,
      });
    } catch {
      vectors.push({
        jurisdiction: r.jurisdiction,
        country: r.country.toUpperCase() as "CA" | "US",
        name: r.name,
        vector: new Array(10).fill(0),
        isPlaceholder: true,
      });
    }
  }

  const matrix = vectors.map((v) => {
    const similarities = vectors
      .filter((other) => other.jurisdiction !== v.jurisdiction)
      .map((other) => ({
        jurisdiction: other.jurisdiction,
        name: other.name,
        score: computeSimilarity(v.vector, other.vector),
      }))
      .sort((a, b) => b.score - a.score);

    return {
      jurisdiction: v.jurisdiction,
      name: v.name,
      country: v.country,
      similarities,
    };
  });

  return {
    topic,
    scenario: scenarioText,
    vectors,
    matrix,
  };
}

// ── K-Means Clustering ──

function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

function meanVector(vectors: number[][]): number[] {
  if (vectors.length === 0) return new Array(10).fill(0);
  const dim = vectors[0].length;
  const result = new Array(dim).fill(0);
  for (const v of vectors) {
    for (let i = 0; i < dim; i++) {
      result[i] += v[i];
    }
  }
  for (let i = 0; i < dim; i++) {
    result[i] /= vectors.length;
  }
  return result;
}

function kMeans(vectors: number[][], k: number, maxIterations = 50): number[][] {
  if (vectors.length === 0 || k <= 0) return [];
  if (k > vectors.length) k = vectors.length;

  const dim = vectors[0].length;

  // Initialize centroids by picking k random distinct vectors
  const indices = new Set<number>();
  while (indices.size < k) {
    indices.add(Math.floor(Math.random() * vectors.length));
  }
  let centroids = Array.from(indices).map((i) => [...vectors[i]]);

  let assignments = new Array(vectors.length).fill(0);

  for (let iter = 0; iter < maxIterations; iter++) {
    // Assignment step
    let changed = false;
    for (let i = 0; i < vectors.length; i++) {
      let bestCluster = 0;
      let bestDist = euclideanDistance(vectors[i], centroids[0]);

      for (let c = 1; c < k; c++) {
        const dist = euclideanDistance(vectors[i], centroids[c]);
        if (dist < bestDist) {
          bestDist = dist;
          bestCluster = c;
        }
      }

      if (assignments[i] !== bestCluster) {
        assignments[i] = bestCluster;
        changed = true;
      }
    }

    if (!changed) break;

    // Update step
    for (let c = 0; c < k; c++) {
      const clusterVectors = vectors.filter((_, i) => assignments[i] === c);
      centroids[c] = meanVector(clusterVectors);
    }
  }

  return centroids;
}

function kMeansAssignments(vectors: number[][], centroids: number[][]): number[] {
  return vectors.map((v) => {
    let bestCluster = 0;
    let bestDist = euclideanDistance(v, centroids[0]);

    for (let c = 1; c < centroids.length; c++) {
      const dist = euclideanDistance(v, centroids[c]);
      if (dist < bestDist) {
        bestDist = dist;
        bestCluster = c;
      }
    }

    return bestCluster;
  });
}

function clusterLabel(centroid: number[]): string {
  // Derive a label from the centroid's dominant characteristics
  const [structural, procedural, doc, overallRisk, complexity, missing, warnings, strictness, hasCap, notice] = centroid;

  const avg = centroid.reduce((a, b) => a + b, 0) / centroid.length;

  if (overallRisk > 0.6 || structural > 0.5) {
    return "High Structural Mismatch";
  }
  if (strictness > 0.6 || hasCap > 0.5) {
    return "Highly Regulated";
  }
  if (avg < 0.2) {
    return "Low Activity / Placeholder";
  }
  if (procedural > 0.4 || missing > 0.4 || warnings > 0.4) {
    return "Procedurally Complex";
  }
  if (notice > 0.3) {
    return "Long Notice Periods";
  }
  return "Moderate Regulation";
}

export function computeClusters(
  topic: string,
  scenarioText: string,
  k: number
): JurisdictionCluster[] {
  const simMatrix = computeSimilarityMatrix(topic, scenarioText);
  const nonPlaceholderVectors = simMatrix.vectors.filter((v) => !v.isPlaceholder);

  if (nonPlaceholderVectors.length === 0) {
    return [];
  }

  const actualK = Math.min(k, nonPlaceholderVectors.length);
  const vectors = nonPlaceholderVectors.map((v) => v.vector);
  const centroids = kMeans(vectors, actualK);
  const assignments = kMeansAssignments(vectors, centroids);

  const clusters: JurisdictionCluster[] = [];

  for (let c = 0; c < actualK; c++) {
    const members: string[] = [];
    const memberNames: string[] = [];

    for (let i = 0; i < nonPlaceholderVectors.length; i++) {
      if (assignments[i] === c) {
        members.push(nonPlaceholderVectors[i].jurisdiction);
        memberNames.push(nonPlaceholderVectors[i].name);
      }
    }

    clusters.push({
      clusterId: c,
      label: clusterLabel(centroids[c]),
      members,
      memberNames,
      centroid: centroids[c],
    });
  }

  // Sort clusters by size descending
  clusters.sort((a, b) => b.members.length - a.members.length);

  // Reassign cluster IDs after sorting
  clusters.forEach((c, i) => {
    c.clusterId = i;
  });

  return clusters;
}
