/**
 * Forecasting Engine (Predictive Regulatory Modeling)
 *
 * Uses trend data, volatility, similarity drift, cluster movement, and rule
 * history to forecast future regulatory behavior for a jurisdiction.
 */

import {
  computeTrendAnalysis,
  type TrendSnapshot,
} from "./trends";
import {
  computeClusters,
  computeSimilarity,
  type JurisdictionCluster,
} from "./similarity";
import { jurisdictions } from "./jurisdictions";

// ── Types ──

export interface ForecastResult {
  topic: string;
  jurisdiction: string;

  predictedStructuralRisk: "low" | "medium" | "high";
  predictedProceduralRisk: "low" | "medium" | "high";
  predictedDocumentationRisk: "low" | "medium" | "high";
  predictedOverallRisk: "low" | "medium" | "high";

  confidence: {
    structural: number;
    procedural: number;
    documentation: number;
    overall: number;
  };

  drivers: string[];
  volatility: number;
  similarityShift: number;
  clusterMovement: string;

  lastSnapshot: TrendSnapshot | null;
}

export interface NationalForecastReport {
  topic: string;
  jurisdictions: Array<{
    jurisdiction: string;
    name: string;
    country: string;
    predictedRisk: "low" | "medium" | "high";
    confidence: number;
    trendDirection: "tightening" | "loosening" | "stable";
    clusterMovement: string;
    volatility: number;
  }>;
}

// ── Helpers ──

function riskToNumeric(risk: "low" | "medium" | "high"): number {
  return risk === "low" ? 0 : risk === "medium" ? 0.5 : 1;
}

function numericToRiskLabel(value: number): "low" | "medium" | "high" {
  if (value < 0.33) return "low";
  if (value < 0.66) return "medium";
  return "high";
}

/**
 * Simple linear regression slope.
 * x = time index [0, 1, 2, ...]
 * y = risk numeric values
 */
function trendSlope(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;

  const xMean = (n - 1) / 2;
  const yMean = values.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    const dx = i - xMean;
    num += dx * (values[i] - yMean);
    den += dx * dx;
  }

  if (den === 0) return 0;
  return num / den;
}

function isMonotonic(values: number[]): boolean {
  if (values.length < 3) return false;
  let increasing = true;
  let decreasing = true;
  for (let i = 1; i < values.length; i++) {
    if (values[i] < values[i - 1]) increasing = false;
    if (values[i] > values[i - 1]) decreasing = false;
  }
  return increasing || decreasing;
}

function computeConfidence(
  volatility: number,
  values: number[],
  hasRuleChanges: boolean
): number {
  let confidence = Math.max(0, 1 - volatility);

  // Trend consistency bonus
  if (isMonotonic(values)) {
    confidence += 0.1;
  }

  // Data volume bonus
  confidence += Math.min(values.length / 5, 0.2);

  // Rule change penalty (more changes = less predictable)
  if (hasRuleChanges) {
    confidence -= 0.05;
  }

  return Math.max(0, Math.min(1, Math.round(confidence * 100) / 100));
}

/**
 * Determine cluster movement for a jurisdiction.
 * Computes current clusters and compares the jurisdiction's trajectory
 * to cluster centroids.
 */
function determineClusterMovement(
  topic: string,
  jurisdiction: string,
  trendSlopeValue: number,
  lastDrift: number
): string {
  // Use a generic scenario for cluster computation
  const scenario = "Tenant scenario for cluster analysis";
  let clusters: JurisdictionCluster[];
  try {
    clusters = computeClusters(topic, scenario, 3);
  } catch {
    return "unable to determine";
  }

  if (!clusters || clusters.length === 0) {
    return "no clusters formed";
  }

  // Find which cluster contains this jurisdiction
  const memberCluster = clusters.find((c) =>
    c.members.includes(jurisdiction)
  );

  // Compute average "strictness" of each cluster based on member count
  // (smaller clusters tend to be outlier / stricter groups in this model)
  const clusterStrictness = clusters.map((c) => {
    const sizeScore = 1 - c.members.length / 64; // smaller = stricter
    return sizeScore;
  });

  const avgStrictness =
    clusterStrictness.reduce((a, b) => a + b, 0) / clusterStrictness.length;

  const currentStrictness = memberCluster
    ? clusterStrictness[memberCluster.clusterId]
    : avgStrictness;

  // Determine movement based on trend slope and drift
  const combinedSignal = trendSlopeValue * 0.6 + lastDrift * 0.4;

  if (combinedSignal > 0.2) {
    return "toward stricter cluster";
  }
  if (combinedSignal < -0.2) {
    return "toward looser cluster";
  }
  if (Math.abs(combinedSignal) < 0.05) {
    return "stable within cluster";
  }
  return memberCluster ? `stable in cluster ${memberCluster.clusterId + 1}` : "stable";
}

// ── A. Compute Forecast ──

export function computeForecast(
  topic: string,
  jurisdiction: string,
  scenarioText?: string
): ForecastResult {
  const analysis = computeTrendAnalysis(topic, jurisdiction, scenarioText);
  const snapshots = analysis.snapshots;
  const lastSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;

  // If no data, return a low-confidence forecast based on current state
  if (snapshots.length === 0) {
    return {
      topic,
      jurisdiction,
      predictedStructuralRisk: "low",
      predictedProceduralRisk: "low",
      predictedDocumentationRisk: "low",
      predictedOverallRisk: "low",
      confidence: { structural: 0, procedural: 0, documentation: 0, overall: 0 },
      drivers: ["No historical snapshots available"],
      volatility: 0,
      similarityShift: 0,
      clusterMovement: "insufficient data",
      lastSnapshot: null,
    };
  }

  // Compute trend slopes for each risk dimension
  const structSlope = trendSlope(analysis.riskTrend.structural);
  const procSlope = trendSlope(analysis.riskTrend.procedural);
  const docSlope = trendSlope(analysis.riskTrend.documentation);
  const overallSlope = trendSlope(analysis.riskTrend.overall);

  // Volatility from trend engine
  const volatility = analysis.volatilityScore;

  // Last similarity drift
  const lastDrift =
    analysis.similarityDrift.length > 0
      ? analysis.similarityDrift[analysis.similarityDrift.length - 1]
      : 0;

  // Rule change frequency
  const changeFreq =
    snapshots.length > 1
      ? analysis.ruleChanges.length / (snapshots.length - 1)
      : 0;

  // Cluster movement
  const clusterMovement = determineClusterMovement(
    topic,
    jurisdiction,
    overallSlope,
    lastDrift
  );

  // Cluster movement numeric factor
  const clusterFactor =
    clusterMovement.includes("stricter") ? 0.15 :
    clusterMovement.includes("looser") ? -0.15 :
    0;

  // Weighted prediction for each dimension
  // Formula: currentRisk + slope * weight + drift * weight + cluster * weight + changeFreq * weight
  const currentStruct = analysis.riskTrend.structural[snapshots.length - 1];
  const currentProc = analysis.riskTrend.procedural[snapshots.length - 1];
  const currentDoc = analysis.riskTrend.documentation[snapshots.length - 1];
  const currentOverall = analysis.riskTrend.overall[snapshots.length - 1];

  const predict = (current: number, slope: number) => {
    const trendComponent = slope * 0.4;
    const volComponent = volatility * 0.2 * (slope >= 0 ? 1 : -1);
    const driftComponent = lastDrift * 0.2;
    const clusterComponent = clusterFactor * 0.1;
    const changeComponent = changeFreq * 0.1 * (slope >= 0 ? 1 : -1);

    let value =
      current +
      trendComponent +
      volComponent +
      driftComponent +
      clusterComponent +
      changeComponent;

    return Math.max(0, Math.min(1, value));
  };

  const predictedStruct = predict(currentStruct, structSlope);
  const predictedProc = predict(currentProc, procSlope);
  const predictedDoc = predict(currentDoc, docSlope);
  const predictedOverall = predict(currentOverall, overallSlope);

  // Confidence per dimension
  const hasRuleChanges = analysis.ruleChanges.length > 0;
  const structConfidence = computeConfidence(
    volatility,
    analysis.riskTrend.structural,
    hasRuleChanges
  );
  const procConfidence = computeConfidence(
    volatility,
    analysis.riskTrend.procedural,
    hasRuleChanges
  );
  const docConfidence = computeConfidence(
    volatility,
    analysis.riskTrend.documentation,
    hasRuleChanges
  );
  const overallConfidence = computeConfidence(
    volatility,
    analysis.riskTrend.overall,
    hasRuleChanges
  );

  // Drivers
  const drivers: string[] = [];
  if (Math.abs(structSlope) > 0.05) {
    drivers.push(
      `Structural risk trend is ${structSlope > 0 ? "increasing" : "decreasing"} (slope ${structSlope.toFixed(2)})`
    );
  }
  if (Math.abs(procSlope) > 0.05) {
    drivers.push(
      `Procedural risk trend is ${procSlope > 0 ? "increasing" : "decreasing"} (slope ${procSlope.toFixed(2)})`
    );
  }
  if (Math.abs(docSlope) > 0.05) {
    drivers.push(
      `Documentation risk trend is ${docSlope > 0 ? "increasing" : "decreasing"} (slope ${docSlope.toFixed(2)})`
    );
  }
  if (volatility > 0.3) {
    drivers.push(`High volatility detected (${volatility.toFixed(2)})`);
  }
  if (lastDrift > 0.2) {
    drivers.push(`Significant similarity drift (${lastDrift.toFixed(2)})`);
  }
  if (changeFreq > 0) {
    drivers.push(`Rule changed ${analysis.ruleChanges.length} time(s) across ${snapshots.length} snapshots`);
  }
  if (clusterMovement !== "stable") {
    drivers.push(`Cluster movement: ${clusterMovement}`);
  }
  if (drivers.length === 0) {
    drivers.push("Stable regulatory environment with no significant signals");
  }

  return {
    topic,
    jurisdiction,
    predictedStructuralRisk: numericToRiskLabel(predictedStruct),
    predictedProceduralRisk: numericToRiskLabel(predictedProc),
    predictedDocumentationRisk: numericToRiskLabel(predictedDoc),
    predictedOverallRisk: numericToRiskLabel(predictedOverall),
    confidence: {
      structural: structConfidence,
      procedural: procConfidence,
      documentation: docConfidence,
      overall: overallConfidence,
    },
    drivers,
    volatility,
    similarityShift: lastDrift,
    clusterMovement,
    lastSnapshot,
  };
}

// ── B. Compute National Forecast ──

export function computeNationalForecast(
  topic: string,
  scenarioText?: string
): NationalForecastReport {
  const results: NationalForecastReport["jurisdictions"] = [];

  for (const j of jurisdictions) {
    const forecast = computeForecast(topic, j.code, scenarioText);

    // Determine trend direction from the forecast drivers
    let trendDirection: "tightening" | "loosening" | "stable" = "stable";
    const overallSlope = forecast.predictedOverallRisk;
    const currentRisk = forecast.lastSnapshot?.overallRisk ?? "low";
    const currentNum = riskToNumeric(currentRisk);
    const predictedNum = riskToNumeric(overallSlope);
    const delta = predictedNum - currentNum;
    if (delta > 0.15) trendDirection = "tightening";
    else if (delta < -0.15) trendDirection = "loosening";

    results.push({
      jurisdiction: j.code,
      name: j.name,
      country: j.country,
      predictedRisk: forecast.predictedOverallRisk,
      confidence: forecast.confidence.overall,
      trendDirection,
      clusterMovement: forecast.clusterMovement,
      volatility: forecast.volatility,
    });
  }

  // Sort by: highest predicted risk, lowest confidence, highest volatility
  const riskOrder = { high: 0, medium: 1, low: 2 };
  results.sort((a, b) => {
    const riskDiff = riskOrder[a.predictedRisk] - riskOrder[b.predictedRisk];
    if (riskDiff !== 0) return riskDiff;
    const confDiff = a.confidence - b.confidence;
    if (confDiff !== 0) return confDiff;
    return b.volatility - a.volatility;
  });

  return { topic, jurisdictions: results };
}
