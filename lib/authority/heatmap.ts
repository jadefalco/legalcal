/**
 * National Compliance Heatmap Generator
 *
 * Converts risk scores into heatmap-friendly data for visualization.
 */

import { scoreRiskForAllJurisdictions } from "@/lib/authority/risk";

export interface HeatmapData {
  topic: string;
  scenario: string;
  results: Array<{
    jurisdiction: string;
    country: "CA" | "US";
    overallRisk: "low" | "medium" | "high";
    structuralRisk: "low" | "medium" | "high";
    proceduralRisk: "low" | "medium" | "high";
    documentationRisk: "low" | "medium" | "high";
    isPlaceholder: boolean;
    name: string;
  }>;
}

export function generateHeatmapData(
  topic: string,
  scenarioText: string
): HeatmapData {
  const multiRisk = scoreRiskForAllJurisdictions(topic, scenarioText);

  const results = multiRisk.results.map((r) => ({
    jurisdiction: r.jurisdiction,
    country: (r.country.toUpperCase() as "CA" | "US") ?? "US",
    overallRisk: r.overallRisk,
    structuralRisk: r.structuralRisk,
    proceduralRisk: r.proceduralRisk,
    documentationRisk: r.documentationRisk,
    isPlaceholder:
      r.factors.length === 1 &&
      (r.factors[0].includes("Placeholder") || r.factors[0].includes("No rule found")),
    name: r.name,
  }));

  return {
    topic: multiRisk.topic,
    scenario: multiRisk.scenario,
    results,
  };
}
