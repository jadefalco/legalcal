/**
 * National Regulatory Reports Engine
 *
 * Orchestrates quarterly and annual report generation by composing
 * risk, heatmap, similarity, trend, forecast, coverage, and rule-change
 * intelligence into unified structured reports.
 */

import {
  scoreRiskForAllJurisdictions,
  type RiskScore,
} from "./risk";
import { generateHeatmapData, type HeatmapData } from "./heatmap";
import {
  computeSimilarityMatrix,
  computeClusters,
  type SimilarityMatrix,
  type JurisdictionCluster,
} from "./similarity";
import {
  computeNationalTrends,
  computeTrendAnalysis,
  type NationalTrendReport,
} from "./trends";
import {
  computeNationalForecast,
  computeForecast,
  type NationalForecastReport,
} from "./forecast";
import { getTopicCoverage } from "./topic";
import { generateChangelog, type ChangelogEntry } from "./changelog";
import { jurisdictions } from "./jurisdictions";

// ── Types ──

export interface NationalRiskResult {
  topic: string;
  scenario: string;
  results: RiskScore[];
}

export interface TopicCoverage {
  total: number;
  placeholder: number;
  real: number;
  coveragePercent: number;
}

export interface RuleChangeSummary {
  jurisdiction: string;
  fromVersion: string;
  toVersion: string;
  timestamp: string;
}

export interface NationalSimilaritySummary {
  topClusters: Array<{ clusterId: number; members: string[] }>;
  outliers: string[];
  strongestPairs: Array<{ a: string; b: string; score: number }>;
}

export interface QuarterlyReport {
  type: "quarterly";
  quarter: string;
  generatedAt: string;
  topics: Array<{
    topic: string;
    nationalRisk: NationalRiskResult;
    nationalHeatmap: HeatmapData;
    nationalSimilarity: NationalSimilaritySummary;
    nationalTrends: NationalTrendReport;
    nationalForecast: NationalForecastReport;
    coverage: TopicCoverage;
    ruleChanges: RuleChangeSummary[];
  }>;
}

export interface RiskTrendSummary {
  topic: string;
  jurisdictions: Array<{
    jurisdiction: string;
    name: string;
    country: string;
    deltaStructural: number;
    deltaProcedural: number;
    deltaDocumentation: number;
    deltaOverall: number;
    previousRisk: "low" | "medium" | "high";
    currentRisk: "low" | "medium" | "high";
  }>;
}

export interface VolatilityRanking {
  jurisdiction: string;
  name: string;
  country: string;
  volatilityScore: number;
  rank: number;
}

export interface ClusterMovementSummary {
  jurisdiction: string;
  name: string;
  country: string;
  movement: string;
}

export interface ForecastOutlookSummary {
  topic: string;
  jurisdictions: Array<{
    jurisdiction: string;
    name: string;
    country: string;
    outlook: "low" | "medium" | "high";
    confidence: number;
    trendDirection: "tightening" | "loosening" | "stable";
  }>;
}

export interface AnnualReport {
  type: "annual";
  year: number;
  generatedAt: string;
  topics: Array<{
    topic: string;
    riskTrends: RiskTrendSummary;
    volatilityRanking: VolatilityRanking[];
    clusterMovement: ClusterMovementSummary[];
    forecastOutlook: ForecastOutlookSummary;
    nationalHeatmap: HeatmapData;
    nationalSimilarity: NationalSimilaritySummary;
    coverage: TopicCoverage;
    ruleChanges: RuleChangeSummary[];
  }>;
}

// ── Helpers ──

function getCurrentQuarter(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const q = Math.floor(month / 3) + 1;
  return `Q${q} ${year}`;
}

function riskToNumeric(risk: "low" | "medium" | "high"): number {
  return risk === "low" ? 0 : risk === "medium" ? 0.5 : 1;
}

function numericToRisk(value: number): "low" | "medium" | "high" {
  if (value <= 0.25) return "low";
  if (value <= 0.65) return "medium";
  return "high";
}

function getJurisdictionMeta(code: string) {
  const j = jurisdictions.find((x) => x.code === code);
  return j ?? { code, name: code.toUpperCase(), country: "US" };
}

// ── C. Summarize National Similarity ──

export function summarizeNationalSimilarity(
  matrix: SimilarityMatrix
): NationalSimilaritySummary {
  const clusters = computeClusters(matrix.topic, matrix.scenario, 3);

  const topClusters = clusters
    .sort((a, b) => b.members.length - a.members.length)
    .slice(0, 3)
    .map((c) => ({
      clusterId: c.clusterId,
      members: c.members,
    }));

  // Outliers: jurisdictions with avg similarity < mean - 1.5*std
  const avgScores: Record<string, number> = {};
  const allCodes = new Set<string>();
  for (const row of matrix.matrix) {
    allCodes.add(row.jurisdiction);
    let sum = 0;
    let count = 0;
    for (const sim of row.similarities) {
      if (sim.jurisdiction !== row.jurisdiction) {
        sum += sim.score;
        count++;
      }
    }
    avgScores[row.jurisdiction] = count > 0 ? sum / count : 0;
  }

  const avgValues = Object.values(avgScores);
  const mean = avgValues.reduce((a, b) => a + b, 0) / avgValues.length;
  const variance = avgValues.reduce((sum, v) => sum + (v - mean) ** 2, 0) / avgValues.length;
  const std = Math.sqrt(variance);
  const threshold = mean - 1.5 * std;

  const outliers = Array.from(allCodes).filter(
    (code) => (avgScores[code] ?? 0) < threshold
  );

  // Strongest pairs
  const seen = new Set<string>();
  const pairs: Array<{ a: string; b: string; score: number }> = [];
  for (const row of matrix.matrix) {
    for (const sim of row.similarities) {
      if (sim.jurisdiction === row.jurisdiction) continue;
      const key = [row.jurisdiction, sim.jurisdiction].sort().join("-");
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push({ a: row.jurisdiction, b: sim.jurisdiction, score: sim.score });
    }
  }
  pairs.sort((a, b) => b.score - a.score);
  const strongestPairs = pairs.slice(0, 10);

  return { topClusters, outliers, strongestPairs };
}

// ── D. Summarize Rule Changes ──

export function summarizeRuleChanges(
  topic: string,
  daysBack = 90
): RuleChangeSummary[] {
  const since = new Date();
  since.setDate(since.getDate() - daysBack);
  const sinceStr = since.toISOString().split("T")[0];

  const entries = generateChangelog({ since: sinceStr });
  const filtered = entries.filter(
    (e) => e.topic === topic && e.previousVersion !== null
  );

  return filtered.map((e) => ({
    jurisdiction: e.jurisdiction,
    fromVersion: e.previousVersion!,
    toVersion: e.version,
    timestamp: e.savedAt,
  }));
}

// ── A. Quarterly Report ──

export function generateQuarterlyReport(
  topics: string[],
  scenarioText: string
): QuarterlyReport {
  const quarter = getCurrentQuarter();
  const generatedAt = new Date().toISOString();

  const reportTopics = topics.map((topic) => {
    const normalizedTopic = topic.toLowerCase().trim();

    const nationalRisk: NationalRiskResult =
      scoreRiskForAllJurisdictions(normalizedTopic, scenarioText);

    const nationalHeatmap: HeatmapData = generateHeatmapData(
      normalizedTopic,
      scenarioText
    );

    const simMatrix = computeSimilarityMatrix(normalizedTopic, scenarioText);
    const nationalSimilarity = summarizeNationalSimilarity(simMatrix);

    const nationalTrends = computeNationalTrends(
      normalizedTopic,
      scenarioText
    );

    const nationalForecast = computeNationalForecast(
      normalizedTopic,
      scenarioText
    );

    const coverage = getTopicCoverage(normalizedTopic);

    const ruleChanges = summarizeRuleChanges(normalizedTopic, 90);

    return {
      topic: normalizedTopic,
      nationalRisk,
      nationalHeatmap,
      nationalSimilarity,
      nationalTrends,
      nationalForecast,
      coverage,
      ruleChanges,
    };
  });

  return {
    type: "quarterly",
    quarter,
    generatedAt,
    topics: reportTopics,
  };
}

// ── B. Annual Report ──

function computeRiskTrendSummary(
  topic: string,
  scenarioText?: string
): RiskTrendSummary {
  const results: RiskTrendSummary["jurisdictions"] = [];

  for (const j of jurisdictions) {
    const analysis = computeTrendAnalysis(topic, j.code, scenarioText);
    const { riskTrend, snapshots } = analysis;

    if (riskTrend.overall.length < 2 || snapshots.length < 2) {
      continue;
    }

    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];

    results.push({
      jurisdiction: j.code,
      name: j.name,
      country: j.country.toUpperCase(),
      deltaStructural:
        riskTrend.structural[riskTrend.structural.length - 1] -
        riskTrend.structural[0],
      deltaProcedural:
        riskTrend.procedural[riskTrend.procedural.length - 1] -
        riskTrend.procedural[0],
      deltaDocumentation:
        riskTrend.documentation[riskTrend.documentation.length - 1] -
        riskTrend.documentation[0],
      deltaOverall:
        riskTrend.overall[riskTrend.overall.length - 1] -
        riskTrend.overall[0],
      previousRisk: first.overallRisk,
      currentRisk: last.overallRisk,
    });
  }

  return { topic, jurisdictions: results };
}

function computeVolatilityRanking(topic: string, scenarioText?: string): VolatilityRanking[] {
  const trends = computeNationalTrends(topic, scenarioText);
  const sorted = [...trends.jurisdictions].sort(
    (a, b) => b.volatilityScore - a.volatilityScore
  );
  return sorted.map((j, i) => ({
    jurisdiction: j.jurisdiction,
    name: j.name,
    country: j.country,
    volatilityScore: j.volatilityScore,
    rank: i + 1,
  }));
}

function computeClusterMovement(
  topic: string,
  scenarioText?: string
): ClusterMovementSummary[] {
  const forecast = computeNationalForecast(topic, scenarioText);
  return forecast.jurisdictions.map((j) => ({
    jurisdiction: j.jurisdiction,
    name: j.name,
    country: j.country,
    movement: j.clusterMovement,
  }));
}

function computeForecastOutlook(
  topic: string,
  scenarioText?: string
): ForecastOutlookSummary {
  const forecast = computeNationalForecast(topic, scenarioText);
  return {
    topic,
    jurisdictions: forecast.jurisdictions.map((j) => ({
      jurisdiction: j.jurisdiction,
      name: j.name,
      country: j.country,
      outlook: j.predictedRisk,
      confidence: j.confidence,
      trendDirection: j.trendDirection,
    })),
  };
}

export function generateAnnualReport(
  topics: string[],
  scenarioText: string
): AnnualReport {
  const year = new Date().getFullYear();
  const generatedAt = new Date().toISOString();

  const reportTopics = topics.map((topic) => {
    const normalizedTopic = topic.toLowerCase().trim();

    const riskTrends = computeRiskTrendSummary(
      normalizedTopic,
      scenarioText
    );
    const volatilityRanking = computeVolatilityRanking(
      normalizedTopic,
      scenarioText
    );
    const clusterMovement = computeClusterMovement(
      normalizedTopic,
      scenarioText
    );
    const forecastOutlook = computeForecastOutlook(
      normalizedTopic,
      scenarioText
    );

    const nationalHeatmap = generateHeatmapData(normalizedTopic, scenarioText);

    const simMatrix = computeSimilarityMatrix(normalizedTopic, scenarioText);
    const nationalSimilarity = summarizeNationalSimilarity(simMatrix);

    const coverage = getTopicCoverage(normalizedTopic);
    const ruleChanges = summarizeRuleChanges(normalizedTopic, 365);

    return {
      topic: normalizedTopic,
      riskTrends,
      volatilityRanking,
      clusterMovement,
      forecastOutlook,
      nationalHeatmap,
      nationalSimilarity,
      coverage,
      ruleChanges,
    };
  });

  return {
    type: "annual",
    year,
    generatedAt,
    topics: reportTopics,
  };
}

// ── Markdown Export Helpers ──

export function quarterlyReportToMarkdown(report: QuarterlyReport): string {
  let md = `# National Regulatory Quarterly Report\n\n`;
  md += `**Quarter:** ${report.quarter}  \n`;
  md += `**Generated:** ${new Date(report.generatedAt).toLocaleString("en-US")}  \n\n`;

  for (const t of report.topics) {
    md += `## Topic: ${t.topic.replace(/-/g, " ")}\n\n`;

    // Executive Summary
    const highRisk = t.nationalRisk.results.filter(
      (r) => r.overallRisk === "high"
    );
    const tightening = t.nationalTrends.jurisdictions.filter(
      (j) => j.trendDirection === "tightening"
    );
    const forecastHigh = t.nationalForecast.jurisdictions.filter(
      (j) => j.predictedRisk === "high"
    );

    md += `### Executive Summary\n\n`;
    md += `- **High-risk jurisdictions:** ${highRisk.length}\n`;
    md += `- **Tightening jurisdictions:** ${tightening.length}\n`;
    md += `- **Forecasted high-risk:** ${forecastHigh.length}\n`;
    md += `- **Coverage:** ${t.coverage.real}/${t.coverage.total} (${t.coverage.coveragePercent}%)\n`;
    md += `- **Rule changes (90d):** ${t.ruleChanges.length}\n\n`;

    // Risk
    md += `### Risk Profile\n\n`;
    md += `| Jurisdiction | Structural | Procedural | Documentation | Overall |\n`;
    md += `|--------------|------------|------------|---------------|---------|\n`;
    for (const r of t.nationalRisk.results.slice(0, 15)) {
      md += `| ${r.name} (${r.jurisdiction.toUpperCase()}) | ${r.structuralRisk} | ${r.proceduralRisk} | ${r.documentationRisk} | ${r.overallRisk} |\n`;
    }
    if (t.nationalRisk.results.length > 15) {
      md += `\n*…and ${t.nationalRisk.results.length - 15} more*\n`;
    }
    md += `\n`;

    // Forecast
    md += `### Forecast Outlook\n\n`;
    md += `| Jurisdiction | Predicted | Confidence | Trend | Volatility |\n`;
    md += `|--------------|-----------|------------|-------|------------|\n`;
    for (const j of t.nationalForecast.jurisdictions.slice(0, 15)) {
      md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.predictedRisk} | ${(j.confidence * 100).toFixed(0)}% | ${j.trendDirection} | ${j.volatility.toFixed(2)} |\n`;
    }
    if (t.nationalForecast.jurisdictions.length > 15) {
      md += `\n*…and ${t.nationalForecast.jurisdictions.length - 15} more*\n`;
    }
    md += `\n`;

    // Similarity
    md += `### Similarity Snapshot\n\n`;
    md += `**Clusters:**\n`;
    for (const c of t.nationalSimilarity.topClusters) {
      md += `- Cluster ${c.clusterId + 1}: ${c.members.map((m) => m.toUpperCase()).join(", ")}\n`;
    }
    if (t.nationalSimilarity.outliers.length > 0) {
      md += `\n**Outliers:** ${t.nationalSimilarity.outliers.map((o) => o.toUpperCase()).join(", ")}\n`;
    }
    md += `\n**Strongest Pairs:**\n`;
    for (const p of t.nationalSimilarity.strongestPairs.slice(0, 5)) {
      md += `- ${p.a.toUpperCase()} ↔ ${p.b.toUpperCase()}: ${(p.score * 100).toFixed(1)}%\n`;
    }
    md += `\n`;

    // Coverage
    md += `### Coverage\n\n`;
    md += `- Total jurisdictions: ${t.coverage.total}\n`;
    md += `- Real rules: ${t.coverage.real}\n`;
    md += `- Placeholders: ${t.coverage.placeholder}\n`;
    md += `- Coverage: ${t.coverage.coveragePercent}%\n\n`;
  }

  return md;
}

export function annualReportToMarkdown(report: AnnualReport): string {
  let md = `# National Regulatory Annual Report\n\n`;
  md += `**Year:** ${report.year}  \n`;
  md += `**Generated:** ${new Date(report.generatedAt).toLocaleString("en-US")}  \n\n`;

  for (const t of report.topics) {
    md += `## Topic: ${t.topic.replace(/-/g, " ")}\n\n`;

    md += `### Year-over-Year Risk Trends\n\n`;
    md += `| Jurisdiction | Δ Structural | Δ Procedural | Δ Documentation | Δ Overall | Previous | Current |\n`;
    md += `|--------------|--------------|--------------|-----------------|-----------|----------|---------|\n`;
    for (const j of t.riskTrends.jurisdictions.slice(0, 15)) {
      md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.deltaStructural >= 0 ? "+" : ""}${j.deltaStructural.toFixed(2)} | ${j.deltaProcedural >= 0 ? "+" : ""}${j.deltaProcedural.toFixed(2)} | ${j.deltaDocumentation >= 0 ? "+" : ""}${j.deltaDocumentation.toFixed(2)} | ${j.deltaOverall >= 0 ? "+" : ""}${j.deltaOverall.toFixed(2)} | ${j.previousRisk} | ${j.currentRisk} |\n`;
    }
    if (t.riskTrends.jurisdictions.length > 15) {
      md += `\n*…and ${t.riskTrends.jurisdictions.length - 15} more*\n`;
    }
    md += `\n`;

    md += `### Volatility Rankings\n\n`;
    md += `| Rank | Jurisdiction | Volatility |\n`;
    md += `|------|--------------|------------|\n`;
    for (const j of t.volatilityRanking.slice(0, 15)) {
      md += `| ${j.rank} | ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.volatilityScore.toFixed(3)} |\n`;
    }
    md += `\n`;

    md += `### Cluster Movement\n\n`;
    md += `| Jurisdiction | Movement |\n`;
    md += `|--------------|----------|\n`;
    for (const j of t.clusterMovement.slice(0, 15)) {
      md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.movement} |\n`;
    }
    md += `\n`;

    md += `### Forecast Outlook\n\n`;
    md += `| Jurisdiction | Outlook | Confidence | Trend |\n`;
    md += `|--------------|---------|------------|-------|\n`;
    for (const j of t.forecastOutlook.jurisdictions.slice(0, 15)) {
      md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.outlook} | ${(j.confidence * 100).toFixed(0)}% | ${j.trendDirection} |\n`;
    }
    md += `\n`;

    md += `### Coverage\n\n`;
    md += `- Total jurisdictions: ${t.coverage.total}\n`;
    md += `- Real rules: ${t.coverage.real}\n`;
    md += `- Placeholders: ${t.coverage.placeholder}\n`;
    md += `- Coverage: ${t.coverage.coveragePercent}%\n\n`;
  }

  return md;
}
