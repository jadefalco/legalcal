/**
 * National Risk Scoring Engine
 *
 * Evaluates a scenario against a jurisdiction's rule structure and produces
 * a neutral, non-advisory risk profile.
 */

import type { LegalRuleBlock } from "@/data/authority/schema";
import { jurisdictions } from "@/lib/authority/jurisdictions";
import { authorityBundle } from "@/lib/authority/bundle";
import {
  analyzeScenario,
  generateCompliancePath,
  reasonAboutOutcome,
} from "@/lib/authority/reasoning";

export interface RiskScore {
  jurisdiction: string;
  country: string;
  name: string;
  topic: string;
  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  overallRisk: "low" | "medium" | "high";
  factors: string[];
  uncertainties: string[];
  warnings: string[];
}

export interface MultiRiskResult {
  topic: string;
  scenario: string;
  results: RiskScore[];
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

// ── Helpers for extracting facts from scenario text ──

interface ExtractedFacts {
  percentages: number[];
  dollarAmounts: number[];
  days: number[];
  months: number[];
  hasNotice: boolean;
  hasWrittenNotice: boolean;
  hasIncrease: boolean;
  hasDeposit: boolean;
  hasEviction: boolean;
  hasTermination: boolean;
  hasRepair: boolean;
  hasLateFee: boolean;
  moveInDate?: string;
  proposedAmount?: number;
  currentAmount?: number;
}

function extractFacts(text: string): ExtractedFacts {
  const lower = text.toLowerCase();

  const percentages: number[] = [];
  const pctRe = /(\d+(?:\.\d+)?)\s*%/gi;
  let m: RegExpExecArray | null;
  while ((m = pctRe.exec(text)) !== null) percentages.push(parseFloat(m[1]));
  const pctWordRe = /(\d+(?:\.\d+)?)\s*percent/gi;
  while ((m = pctWordRe.exec(text)) !== null) percentages.push(parseFloat(m[1]));

  const dollarAmounts: number[] = [];
  const dollarRe = /\$\s*(\d{1,6}(?:,\d{3})*(?:\.\d{2})?)/gi;
  while ((m = dollarRe.exec(text)) !== null) dollarAmounts.push(parseFloat(m[1].replace(/,/g, "")));

  const days: number[] = [];
  const dayRe = /(\d+)\s*days?/gi;
  while ((m = dayRe.exec(text)) !== null) days.push(parseInt(m[1], 10));

  const months: number[] = [];
  const monthRe = /(\d+)\s*months?/gi;
  while ((m = monthRe.exec(text)) !== null) months.push(parseInt(m[1], 10));

  const dateMatches = text.match(/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4}/);
  const moveInDate = dateMatches ? dateMatches[0] : undefined;

  const proposedMatch = text.match(/proposed\s+(?:increase|rent|amount)\s+of\s+\$?(\d[\d,]*)/i);
  const proposedAmount = proposedMatch ? parseFloat(proposedMatch[1].replace(/,/g, "")) : undefined;

  const currentMatch = text.match(/current\s+(?:rent|amount|deposit)\s+of\s+\$?(\d[\d,]*)/i);
  const currentAmount = currentMatch ? parseFloat(currentMatch[1].replace(/,/g, "")) : undefined;

  return {
    percentages: Array.from(new Set(percentages)),
    dollarAmounts: Array.from(new Set(dollarAmounts)),
    days: Array.from(new Set(days)),
    months: Array.from(new Set(months)),
    hasNotice: /\bnotice\b/i.test(lower),
    hasWrittenNotice: /\bwritten\s+notice\b/i.test(lower),
    hasIncrease: /\bincrease\b/i.test(lower),
    hasDeposit: /\bdeposit\b/i.test(lower),
    hasEviction: /\beviction\b/i.test(lower),
    hasTermination: /\btermination\b/i.test(lower),
    hasRepair: /\brepair\b/i.test(lower),
    hasLateFee: /\blate\s+fee\b/i.test(lower),
    moveInDate,
    proposedAmount,
    currentAmount,
  };
}

// ── Risk Scoring Logic ──

function scoreStructural(
  topic: string,
  _jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): { level: "low" | "medium" | "high"; factors: string[] } {
  const analysis = analyzeScenario(topic, _jurisdiction, scenarioText, rule);
  const outcome = reasonAboutOutcome(topic, _jurisdiction, scenarioText, rule);
  const data = rule.data as Record<string, unknown>;
  const facts = extractFacts(scenarioText);

  const factors: string[] = [];
  let majorMismatches = 0;

  // Count major mismatches from potential issues
  for (const issue of analysis.potentialIssues) {
    const lower = issue.toLowerCase();
    if (
      lower.includes("exceed") ||
      lower.includes("shorter") ||
      lower.includes("not permitted") ||
      lower.includes("violat")
    ) {
      majorMismatches++;
      factors.push(issue);
    }
  }

  // Count major mismatches from outcome factors
  for (const factor of outcome.factors) {
    const lower = factor.toLowerCase();
    if (
      lower.includes("exceed") ||
      lower.includes("cap") ||
      lower.includes("maximum") ||
      lower.includes("not permitted") ||
      lower.includes("shorter")
    ) {
      if (!factors.includes(factor)) {
        majorMismatches++;
        factors.push(factor);
      }
    }
  }

  // Topic-specific structural checks
  if (topic.includes("rent") && topic.includes("increase")) {
    const cap = data.maxIncreasePercent ?? data.rentIncreaseLimit ?? data.capPercent;
    if (cap !== undefined && cap !== null && facts.percentages.length > 0) {
      for (const pct of facts.percentages) {
        if (pct > (cap as number)) {
          if (!factors.some((f) => f.includes("cap"))) {
            majorMismatches++;
            factors.push(`Proposed increase (${pct}%) exceeds the structural cap (${cap}%).`);
          }
        }
      }
    }
  }

  if (topic.includes("deposit")) {
    const deadline = data.returnDeadline ?? data.returnDeadlineDays;
    if (deadline !== undefined && deadline !== null && facts.days.length > 0) {
      for (const d of facts.days) {
        if (d > (deadline as number)) {
          if (!factors.some((f) => f.includes("deadline"))) {
            majorMismatches++;
            factors.push(`Mentioned timeframe (${d} days) exceeds the return deadline (${deadline} days).`);
          }
        }
      }
    }
  }

  if (topic.includes("late") && topic.includes("fee")) {
    const maxFee = data.maxLateFeePercent ?? data.maxLateFeeAmount;
    if (maxFee !== undefined && maxFee !== null) {
      for (const pct of facts.percentages) {
        if (pct > (maxFee as number)) {
          if (!factors.some((f) => f.includes("late fee"))) {
            majorMismatches++;
            factors.push(`Late fee percentage (${pct}%) exceeds the maximum allowed (${maxFee}%).`);
          }
        }
      }
      for (const amt of facts.dollarAmounts) {
        if (amt > (maxFee as number)) {
          if (!factors.some((f) => f.includes("late fee"))) {
            majorMismatches++;
            factors.push(`Late fee amount ($${amt}) exceeds the maximum allowed ($${maxFee}).`);
          }
        }
      }
    }
  }

  let level: "low" | "medium" | "high" = "low";
  if (majorMismatches >= 2) level = "high";
  else if (majorMismatches === 1) level = "medium";

  return { level, factors: factors.slice(0, 6) };
}

function scoreProcedural(
  topic: string,
  _jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): { level: "low" | "medium" | "high"; factors: string[] } {
  const analysis = analyzeScenario(topic, _jurisdiction, scenarioText, rule);
  const facts = extractFacts(scenarioText);

  const factors: string[] = [];
  let missingCount = 0;

  // Missing information from analysis
  for (const missing of analysis.missingInformation) {
    missingCount++;
    factors.push(missing);
  }

  // Procedural gaps based on topic and facts
  if (topic.includes("rent") && topic.includes("increase")) {
    if (!facts.hasNotice) {
      missingCount++;
      factors.push("No notice details provided in the scenario.");
    }
    if (facts.days.length === 0 && facts.months.length === 0) {
      missingCount++;
      factors.push("Notice period length not specified.");
    }
    if (!facts.moveInDate) {
      missingCount++;
      factors.push("Tenancy start date not provided.");
    }
  }

  if (topic.includes("deposit")) {
    if (facts.dollarAmounts.length === 0) {
      missingCount++;
      factors.push("Deposit amount not provided.");
    }
    if (!facts.moveInDate) {
      missingCount++;
      factors.push("Move-in or move-out date not provided.");
    }
  }

  if (topic.includes("eviction") || topic.includes("notice")) {
    if (!facts.hasNotice) {
      missingCount++;
      factors.push("Type of notice not provided.");
    }
    if (facts.days.length === 0 && facts.months.length === 0) {
      missingCount++;
      factors.push("Notice period length not provided.");
    }
  }

  if (topic.includes("lease") && topic.includes("termination")) {
    if (!facts.moveInDate) {
      missingCount++;
      factors.push("Lease start or termination date not provided.");
    }
    if (!facts.hasNotice) {
      missingCount++;
      factors.push("Notice of termination details not provided.");
    }
  }

  if (topic.includes("entry")) {
    if (facts.days.length === 0) {
      missingCount++;
      factors.push("Notice period before entry not provided.");
    }
  }

  if (topic.includes("repair")) {
    if (!facts.hasRepair) {
      missingCount++;
      factors.push("Nature of repair request not provided.");
    }
  }

  if (topic.includes("late") && topic.includes("fee")) {
    if (facts.dollarAmounts.length === 0 && facts.percentages.length === 0) {
      missingCount++;
      factors.push("Late fee amount or percentage not provided.");
    }
  }

  // Scenario brevity check
  if (scenarioText.split(/\s+/).length < 10) {
    missingCount++;
    factors.push("Scenario description appears brief; additional facts may improve the assessment.");
  }

  let level: "low" | "medium" | "high" = "low";
  if (missingCount >= 3) level = "high";
  else if (missingCount >= 1) level = "medium";

  return { level, factors: factors.slice(0, 6) };
}

function scoreDocumentation(
  topic: string,
  _jurisdiction: string,
  scenarioText: string,
  _rule: LegalRuleBlock
): { level: "low" | "medium" | "high"; factors: string[] } {
  const facts = extractFacts(scenarioText);
  const factors: string[] = [];
  let missingDocs = 0;

  if (!facts.moveInDate) {
    missingDocs++;
    factors.push("Tenancy start date or move-in date is not specified.");
  }

  if (topic.includes("rent") && topic.includes("increase")) {
    if (!facts.hasWrittenNotice) {
      missingDocs++;
      factors.push("No written notice of increase mentioned.");
    }
    if (facts.currentAmount === undefined) {
      missingDocs++;
      factors.push("Current rent amount not provided.");
    }
    if (facts.proposedAmount === undefined && facts.percentages.length === 0) {
      missingDocs++;
      factors.push("Proposed new rent amount or percentage not provided.");
    }
  }

  if (topic.includes("deposit")) {
    if (facts.dollarAmounts.length === 0) {
      missingDocs++;
      factors.push("Deposit amount not documented in scenario.");
    }
    if (!facts.moveInDate) {
      missingDocs++;
      factors.push("Move-in date not provided — needed for timeline verification.");
    }
  }

  if (topic.includes("eviction") || topic.includes("notice")) {
    if (!facts.hasWrittenNotice) {
      missingDocs++;
      factors.push("Written notice or proof of service not mentioned.");
    }
    if (!facts.hasNotice) {
      missingDocs++;
      factors.push("No notice details provided.");
    }
  }

  if (topic.includes("lease") && topic.includes("termination")) {
    if (!facts.moveInDate) {
      missingDocs++;
      factors.push("Lease start date not provided.");
    }
    if (!facts.hasNotice) {
      missingDocs++;
      factors.push("Termination notice not mentioned.");
    }
  }

  if (topic.includes("repair")) {
    if (!facts.hasRepair) {
      missingDocs++;
      factors.push("Repair request documentation not described.");
    }
  }

  if (topic.includes("late") && topic.includes("fee")) {
    if (facts.dollarAmounts.length === 0 && facts.percentages.length === 0) {
      missingDocs++;
      factors.push("Late fee amount or percentage not documented.");
    }
  }

  let level: "low" | "medium" | "high" = "low";
  if (missingDocs >= 3) level = "high";
  else if (missingDocs >= 1) level = "medium";

  return { level, factors: factors.slice(0, 6) };
}

function computeOverall(
  structural: "low" | "medium" | "high",
  procedural: "low" | "medium" | "high",
  documentation: "low" | "medium" | "high"
): "low" | "medium" | "high" {
  if (structural === "high" || procedural === "high" || documentation === "high") {
    return "high";
  }
  if (structural === "medium" || procedural === "medium" || documentation === "medium") {
    return "medium";
  }
  return "low";
}

// ── Public API ──

export function scoreRisk(
  topic: string,
  jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): RiskScore {
  const structural = scoreStructural(topic, jurisdiction, scenarioText, rule);
  const procedural = scoreProcedural(topic, jurisdiction, scenarioText, rule);
  const documentation = scoreDocumentation(topic, jurisdiction, scenarioText, rule);
  const path = generateCompliancePath(topic, jurisdiction, scenarioText, rule);
  const outcome = reasonAboutOutcome(topic, jurisdiction, scenarioText, rule);

  const overall = computeOverall(structural.level, procedural.level, documentation.level);

  const allFactors = [
    ...structural.factors.map((f) => `[Structural] ${f}`),
    ...procedural.factors.map((f) => `[Procedural] ${f}`),
    ...documentation.factors.map((f) => `[Documentation] ${f}`),
  ];

  const jurisdictionInfo = jurisdictions.find(
    (j) => j.code.toLowerCase() === jurisdiction.toLowerCase()
  );

  return {
    jurisdiction,
    country: jurisdictionInfo?.country ?? "",
    name: jurisdictionInfo?.name ?? jurisdiction.toUpperCase(),
    topic,
    structuralRisk: structural.level,
    proceduralRisk: procedural.level,
    documentationRisk: documentation.level,
    overallRisk: overall,
    factors: allFactors.slice(0, 10),
    uncertainties: outcome.uncertainties.slice(0, 6),
    warnings: path.warnings.slice(0, 6),
  };
}

export function scoreRiskForAllJurisdictions(
  topic: string,
  scenarioText: string
): MultiRiskResult {
  const sortedJurisdictions = [...jurisdictions].sort((a, b) => {
    if (a.country !== b.country) {
      return a.country === "ca" ? -1 : 1;
    }
    return a.code.localeCompare(b.code);
  });

  const results: RiskScore[] = [];

  for (const jurisdiction of sortedJurisdictions) {
    const rule: LegalRuleBlock | undefined = authorityBundle[topic]?.[jurisdiction.code];
    const hasRule = !!rule;
    const isPlaceholder = isPlaceholderRule(rule);

    if (!hasRule || isPlaceholder) {
      results.push({
        jurisdiction: jurisdiction.code,
        country: jurisdiction.country,
        name: jurisdiction.name,
        topic,
        structuralRisk: "low",
        proceduralRisk: "low",
        documentationRisk: "low",
        overallRisk: "low",
        factors: isPlaceholder
          ? ["Placeholder rule — no structured data available for risk assessment."]
          : ["No rule found — unable to assess risk."],
        uncertainties: isPlaceholder
          ? ["Rule structure is incomplete."]
          : ["No rule data to reason from."],
        warnings: isPlaceholder
          ? ["This is a placeholder rule. Data has not been researched yet."]
          : ["Rule missing for this jurisdiction."],
      });
      continue;
    }

    try {
      const score = scoreRisk(topic, jurisdiction.code, scenarioText, rule);
      results.push(score);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      results.push({
        jurisdiction: jurisdiction.code,
        country: jurisdiction.country,
        name: jurisdiction.name,
        topic,
        structuralRisk: "low",
        proceduralRisk: "low",
        documentationRisk: "low",
        overallRisk: "low",
        factors: [`Error during risk scoring: ${errorMsg}`],
        uncertainties: ["An error occurred during risk assessment."],
        warnings: ["Risk scoring failed for this jurisdiction."],
      });
    }
  }

  return {
    topic,
    scenario: scenarioText,
    results,
  };
}
