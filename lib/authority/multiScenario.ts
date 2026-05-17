/**
 * Multi-Scenario Engine (Cross-Jurisdiction Reasoning Matrix)
 *
 * Takes a single scenario and runs it across all jurisdictions,
 * producing a structured matrix of analyses, compliance paths,
 * and outcome reasoning.
 */

import { jurisdictions } from "@/lib/authority/jurisdictions";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  analyzeScenario,
  generateCompliancePath,
  reasonAboutOutcome,
  type ScenarioAnalysis,
  type CompliancePath,
  type OutcomeReasoning,
} from "@/lib/authority/reasoning";
import type { LegalRuleBlock } from "@/data/authority/schema";

export interface MultiScenarioResult {
  topic: string;
  scenario: string;
  results: Array<{
    jurisdiction: string;
    country: string;
    name: string;
    analysis: ScenarioAnalysis;
    compliance: CompliancePath;
    outcome: OutcomeReasoning;
    isPlaceholder: boolean;
    hasRule: boolean;
  }>;
}

function isPlaceholderRule(rule: LegalRuleBlock | undefined): boolean {
  if (!rule) return false;
  if (rule.version?.version === "0.0") return true;
  if (
    Array.isArray(rule.version?.notes) &&
    rule.version.notes.some((n: string) => n.includes("Placeholder auto-generated"))
  ) {
    return true;
  }
  return false;
}

/**
 * Run a single scenario across all jurisdictions for a given topic.
 * Skips placeholder rules. Results are sorted CA first, then US,
 * alphabetically by jurisdiction code within each country.
 */
export function runScenarioAcrossJurisdictions(
  topic: string,
  scenarioText: string
): MultiScenarioResult {
  // Sort jurisdictions: CA first, then US, alphabetical within each
  const sortedJurisdictions = [...jurisdictions].sort((a, b) => {
    if (a.country !== b.country) {
      return a.country === "ca" ? -1 : 1;
    }
    return a.code.localeCompare(b.code);
  });

  const results: MultiScenarioResult["results"] = [];

  for (const jurisdiction of sortedJurisdictions) {
    const rule: LegalRuleBlock | undefined = authorityBundle[topic]?.[jurisdiction.code];
    const hasRule = !!rule;
    const isPlaceholder = isPlaceholderRule(rule);

    if (!hasRule || isPlaceholder) {
      // Include placeholder/no-rule entries so the matrix is complete
      results.push({
        jurisdiction: jurisdiction.code,
        country: jurisdiction.country,
        name: jurisdiction.name,
        isPlaceholder,
        hasRule,
        analysis: {
          scenarioSummary: `No structured rule data available for ${jurisdiction.name}.`,
          relevantRulePoints: [],
          potentialIssues: isPlaceholder
            ? ["This jurisdiction uses a placeholder rule. Structured analysis is not yet available."]
            : ["No rule found for this topic and jurisdiction."],
          missingInformation: [],
        },
        compliance: {
          steps: isPlaceholder
            ? ["Placeholder rule — no structured compliance steps available."]
            : ["No rule data — unable to generate compliance steps."],
          warnings: isPlaceholder
            ? ["This is a placeholder rule. Data has not been researched yet."]
            : ["Rule missing for this jurisdiction."],
          assumptions: [],
          citations: [],
        },
        outcome: {
          likelyOutcome: isPlaceholder
            ? `No outcome reasoning available for ${jurisdiction.name} — rule data is a placeholder.`
            : `No outcome reasoning available for ${jurisdiction.name} — rule not found.`,
          factors: [],
          uncertainties: isPlaceholder
            ? ["Rule structure is incomplete."]
            : ["No rule data to reason from."],
          alternativePaths: [
            "Consult local statutes directly for this jurisdiction.",
          ],
        },
      });
      continue;
    }

    try {
      const analysis = analyzeScenario(topic, jurisdiction.code, scenarioText, rule);
      const compliance = generateCompliancePath(topic, jurisdiction.code, scenarioText, rule);
      const outcome = reasonAboutOutcome(topic, jurisdiction.code, scenarioText, rule);

      results.push({
        jurisdiction: jurisdiction.code,
        country: jurisdiction.country,
        name: jurisdiction.name,
        isPlaceholder: false,
        hasRule: true,
        analysis,
        compliance,
        outcome,
      });
    } catch (err) {
      // Graceful degradation — include the jurisdiction with an error state
      const errorMsg = err instanceof Error ? err.message : String(err);
      results.push({
        jurisdiction: jurisdiction.code,
        country: jurisdiction.country,
        name: jurisdiction.name,
        isPlaceholder: false,
        hasRule: true,
        analysis: {
          scenarioSummary: `Analysis failed for ${jurisdiction.name}.`,
          relevantRulePoints: [],
          potentialIssues: [`Error during analysis: ${errorMsg}`],
          missingInformation: [],
        },
        compliance: {
          steps: ["Unable to generate compliance steps due to an error."],
          warnings: [`Error: ${errorMsg}`],
          assumptions: [],
          citations: [],
        },
        outcome: {
          likelyOutcome: `Outcome reasoning could not be completed for ${jurisdiction.name}.`,
          factors: [],
          uncertainties: ["An error occurred during reasoning."],
          alternativePaths: ["Retry or check the rule data manually."],
        },
      });
    }
  }

  return {
    topic,
    scenario: scenarioText,
    results,
  };
}
