/**
 * Legal Reasoning Layer
 * Scenario-based guidance engine that produces structured, safe,
 * non-advisory compliance guidance from rule data.
 */

import type { LegalRuleBlock } from "@/data/authority/schema";
import { getRuleFreshness } from "@/lib/authority/freshness";
import { summarizeRule } from "@/lib/authority/intelligence";

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────

export interface ScenarioAnalysis {
  scenarioSummary: string;
  relevantRulePoints: string[];
  potentialIssues: string[];
  missingInformation: string[];
}

export interface CompliancePath {
  steps: string[];
  warnings: string[];
  assumptions: string[];
  citations: string[];
}

export interface OutcomeReasoning {
  likelyOutcome: string;
  factors: string[];
  uncertainties: string[];
  alternativePaths: string[];
}

// ───────────────────────────────────────────────────────────────
// Fact Extraction
// ───────────────────────────────────────────────────────────────

interface ExtractedFacts {
  percentages: number[];
  dollarAmounts: number[];
  days: number[];
  months: number[];
  years: number[];
  hasNotice: boolean;
  hasWrittenNotice: boolean;
  hasIncrease: boolean;
  hasDeposit: boolean;
  hasEviction: boolean;
  hasTermination: boolean;
  hasRepair: boolean;
  hasLateFee: boolean;
  hours?: number;
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
  const wordDollarRe = /(\d{1,6}(?:,\d{3})*)\s*dollars?/gi;
  while ((m = wordDollarRe.exec(text)) !== null) dollarAmounts.push(parseFloat(m[1].replace(/,/g, "")));

  const days: number[] = [];
  const dayRe = /(\d+)\s*days?/gi;
  while ((m = dayRe.exec(text)) !== null) days.push(parseInt(m[1], 10));

  const months: number[] = [];
  const monthRe = /(\d+)\s*months?/gi;
  while ((m = monthRe.exec(text)) !== null) months.push(parseInt(m[1], 10));

  const years: number[] = [];
  const yearRe = /(\d+)\s*years?/gi;
  while ((m = yearRe.exec(text)) !== null) years.push(parseInt(m[1], 10));

  // Date extraction (simple ISO-ish or common formats)
  const dateMatches = text.match(/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4}/);
  const moveInDate = dateMatches ? dateMatches[0] : undefined;

  // Proposed/current amounts
  const proposedMatch = text.match(/proposed\s+(?:increase|rent|amount)\s+of\s+\$?(\d[\d,]*)/i);
  const proposedAmount = proposedMatch ? parseFloat(proposedMatch[1].replace(/,/g, "")) : undefined;

  const currentMatch = text.match(/current\s+(?:rent|amount|deposit)\s+of\s+\$?(\d[\d,]*)/i);
  const currentAmount = currentMatch ? parseFloat(currentMatch[1].replace(/,/g, "")) : undefined;

  return {
    percentages: [...new Set(percentages)],
    dollarAmounts: [...new Set(dollarAmounts)],
    days: [...new Set(days)],
    months: [...new Set(months)],
    years: [...new Set(years)],
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

// ───────────────────────────────────────────────────────────────
// Rule Key Mapping
// ───────────────────────────────────────────────────────────────

function getRelevantFields(topic: string, data: Record<string, unknown>): string[] {
  const keys = Object.keys(data).filter((k) => k !== "sourceUrl" && k !== "year" && data[k] !== null);
  return keys;
}

function describeField(key: string, value: unknown): string {
  const label = key
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .toLowerCase();
  const formatted =
    typeof value === "number"
      ? String(value)
      : typeof value === "boolean"
      ? value
        ? "yes"
        : "no"
      : Array.isArray(value)
      ? value.join(", ")
      : String(value);
  return `${label}: ${formatted}`;
}

// ───────────────────────────────────────────────────────────────
// A. analyzeScenario
// ───────────────────────────────────────────────────────────────

export function analyzeScenario(
  topic: string,
  _jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): ScenarioAnalysis {
  const facts = extractFacts(scenarioText);
  const data = rule.data as Record<string, unknown>;
  const relevantFields = getRelevantFields(topic, data);

  const relevantRulePoints = relevantFields.map((k) => describeField(k, data[k]));

  const missingInformation: string[] = [];
  const potentialIssues: string[] = [];

  // Topic-specific missing info detection
  if (topic.includes("rent") && topic.includes("increase")) {
    if (facts.percentages.length === 0 && facts.currentAmount === undefined) {
      missingInformation.push("Proposed rent increase percentage or amount not provided.");
    }
    if (!facts.hasNotice) {
      missingInformation.push("Notice details not provided.");
    }
    if (!facts.moveInDate) {
      missingInformation.push("Move-in date or tenancy start date not provided.");
    }

    const cap = data.maxIncreasePercent ?? data.rentIncreaseLimit ?? data.capPercent;
    if (cap !== undefined && cap !== null && facts.percentages.length > 0) {
      for (const pct of facts.percentages) {
        if (pct > (cap as number)) {
          potentialIssues.push(`Proposed increase (${pct}%) exceeds the allowed cap (${cap}%).`);
        }
      }
    }

    const noticeRequired = data.noticePeriodDays ?? data.noticeMonths;
    if (noticeRequired !== undefined && noticeRequired !== null && facts.days.length === 0 && facts.months.length === 0) {
      missingInformation.push("Actual notice period given not specified.");
    }
  }

  if (topic.includes("deposit")) {
    if (facts.dollarAmounts.length === 0) {
      missingInformation.push("Deposit amount not provided.");
    }
    if (!facts.moveInDate) {
      missingInformation.push("Move-in date or tenancy end date not provided.");
    }

    const deadline = data.returnDeadline ?? data.returnDeadlineDays;
    if (deadline !== undefined && deadline !== null && facts.days.length > 0) {
      for (const d of facts.days) {
        if (d > (deadline as number)) {
          potentialIssues.push(`The timeframe mentioned (${d} days) exceeds the return deadline (${deadline} days).`);
        }
      }
    }
  }

  if (topic.includes("eviction") || topic.includes("notice")) {
    if (!facts.hasNotice) {
      missingInformation.push("Type of notice or reason for termination not provided.");
    }
    if (facts.days.length === 0 && facts.months.length === 0) {
      missingInformation.push("Notice period length not provided.");
    }

    const noticeRequired = data.noticePeriodDays ?? data.noticeForNonpayment ?? data.noticeRequired;
    if (noticeRequired !== undefined && noticeRequired !== null && (facts.days.length > 0 || facts.months.length > 0)) {
      const given = facts.months.length > 0 ? (facts.months[0] * 30) : facts.days[0];
      if (given !== undefined && given < (noticeRequired as number)) {
        potentialIssues.push(`The notice period provided (${given} days) appears shorter than the required ${noticeRequired} days.`);
      }
    }
  }

  if (topic.includes("lease") && topic.includes("termination")) {
    if (!facts.moveInDate) {
      missingInformation.push("Lease start or termination date not provided.");
    }
    if (!facts.hasNotice) {
      missingInformation.push("Notice of termination details not provided.");
    }
  }

  if (topic.includes("entry")) {
    if (facts.hours === undefined && facts.days.length === 0) {
      missingInformation.push("Notice period (hours or days) before entry not provided.");
    }
  }

  if (topic.includes("repair")) {
    if (!facts.hasRepair) {
      missingInformation.push("Nature of repair request not provided.");
    }
  }

  if (topic.includes("late") && topic.includes("fee")) {
    if (facts.dollarAmounts.length === 0 && facts.percentages.length === 0) {
      missingInformation.push("Late fee amount or percentage not provided.");
    }

    const maxFee = data.maxLateFeePercent ?? data.maxLateFeeAmount;
    if (maxFee !== undefined && maxFee !== null) {
      if (facts.percentages.length > 0) {
        for (const pct of facts.percentages) {
          if (pct > (maxFee as number)) {
            potentialIssues.push(`The late fee percentage mentioned (${pct}%) exceeds the maximum allowed (${maxFee}%).`);
          }
        }
      }
      if (facts.dollarAmounts.length > 0) {
        for (const amt of facts.dollarAmounts) {
          if (amt > (maxFee as number)) {
            potentialIssues.push(`The late fee amount mentioned ($${amt}) exceeds the maximum allowed ($${maxFee}).`);
          }
        }
      }
    }
  }

  // Generic missing info if scenario is very short
  if (scenarioText.split(/\s+/).length < 10) {
    missingInformation.push("Scenario description appears brief; additional facts may improve the analysis.");
  }

  // Scenario summary
  const summaryParts: string[] = [];
  if (facts.hasIncrease) summaryParts.push("rent increase");
  if (facts.hasDeposit) summaryParts.push("security deposit");
  if (facts.hasEviction) summaryParts.push("eviction");
  if (facts.hasTermination) summaryParts.push("lease termination");
  if (facts.hasNotice) summaryParts.push("notice");
  if (facts.hasRepair) summaryParts.push("repair");
  if (facts.hasLateFee) summaryParts.push("late fee");

  const topicLabel = topic.replace(/-/g, " ");
  let scenarioSummary = `Scenario involves ${topicLabel}`;
  if (summaryParts.length > 0) {
    scenarioSummary += ` with elements of ${summaryParts.join(", ")}`;
  }
  scenarioSummary += ".";

  return {
    scenarioSummary,
    relevantRulePoints,
    potentialIssues: potentialIssues.slice(0, 6),
    missingInformation: missingInformation.slice(0, 6),
  };
}

// ───────────────────────────────────────────────────────────────
// B. generateCompliancePath
// ───────────────────────────────────────────────────────────────

export function generateCompliancePath(
  topic: string,
  _jurisdiction: string,
  _scenarioText: string,
  rule: LegalRuleBlock
): CompliancePath {
  const data = rule.data as Record<string, unknown>;
  const freshness = getRuleFreshness(rule);
  const ruleSummary = summarizeRule(rule);

  const steps: string[] = [];
  const warnings: string[] = [];
  const assumptions: string[] = [];
  const citations = ruleSummary.citationsUsed;

  // Freshness warnings
  if (freshness.isExpired) {
    warnings.push("This rule has an expired effective date. Verify the current rule before proceeding.");
  }
  if (freshness.isStale) {
    warnings.push("This rule may be outdated. Check for more recent amendments.");
  }
  if (freshness.missingNextYear) {
    warnings.push("No rule is available for the current calendar year.");
  }
  if (rule.version.version === "0.0") {
    warnings.push("This is a placeholder rule. No structured data is available yet.");
  }
  if (citations.length === 0) {
    warnings.push("No citations are recorded for this rule. Source verification is unavailable.");
  }

  // Topic-specific procedural steps
  if (topic.includes("rent") && topic.includes("increase")) {
    steps.push("Identify the current rent amount and the proposed new rent amount.");
    steps.push("Calculate the percentage increase from the current rent.");
    if (data.maxIncreasePercent !== undefined && data.maxIncreasePercent !== null) {
      steps.push(`Compare the calculated increase to the maximum allowed (${data.maxIncreasePercent}%).`);
    }
    if (data.noticePeriodDays !== undefined && data.noticePeriodDays !== null) {
      steps.push(`Verify that written notice was provided at least ${data.noticePeriodDays} days in advance.`);
    } else if (data.noticeMonths !== undefined && data.noticeMonths !== null) {
      steps.push(`Verify that written notice was provided at least ${data.noticeMonths} months in advance.`);
    }
    if (data.frequencyLimitMonths !== undefined && data.frequencyLimitMonths !== null) {
      steps.push(`Confirm that the required ${data.frequencyLimitMonths}-month interval between increases has elapsed.`);
    }
    if (Array.isArray(data.exemptions) && (data.exemptions as string[]).length > 0) {
      steps.push(`Check whether the property qualifies for any exemptions (${(data.exemptions as string[]).join(", ")}).`);
    }
    assumptions.push("It is assumed the tenancy is covered by the standard residential rules.");
  }

  if (topic.includes("deposit")) {
    steps.push("Identify the total security deposit amount paid at move-in.");
    if (data.returnDeadline !== undefined && data.returnDeadline !== null) {
      steps.push(`Count the number of days from tenancy end to deposit return; the rule indicates ${data.returnDeadline} days.`);
    }
    if (data.itemizedStatementRequired) {
      steps.push("Confirm whether an itemized list of deductions was provided to the tenant.");
    }
    if (data.interestRequired) {
      steps.push("Calculate any interest due on the deposit per the applicable rate.");
    }
    if (Array.isArray(data.allowableDeductions) && (data.allowableDeductions as string[]).length > 0) {
      steps.push(`Review deductions against the allowed categories: ${(data.allowableDeductions as string[]).join(", ")}.`);
    }
    assumptions.push("It is assumed the deposit was collected at the start of the tenancy.");
  }

  if (topic.includes("eviction") || topic.includes("notice")) {
    steps.push("Identify the reason for the notice or eviction action.");
    if (data.noticeForNonpayment !== undefined && data.noticeForNonpayment !== null) {
      steps.push(`For nonpayment, verify that a ${data.noticeForNonpayment}-day notice was provided.`);
    }
    if (data.noticePeriodDays !== undefined && data.noticePeriodDays !== null) {
      steps.push(`Verify that the notice period meets the required ${data.noticePeriodDays} days.`);
    }
    steps.push("Confirm that the notice was delivered in the format required by the jurisdiction.");
    assumptions.push("It is assumed proper service of notice occurred.");
  }

  if (topic.includes("lease") && topic.includes("termination")) {
    steps.push("Determine whether the tenancy is fixed-term or month-to-month.");
    if (data.noticeRequired !== undefined && data.noticeRequired !== null) {
      steps.push(`Verify that ${data.noticeRequired} days' notice was given.`);
    }
    steps.push("Check for any early-termination clauses or break provisions in the lease.");
    assumptions.push("It is assumed the lease terms are standard for the jurisdiction.");
  }

  if (topic.includes("entry")) {
    if (data.noticeHours !== undefined && data.noticeHours !== null) {
      steps.push(`Confirm that the tenant received at least ${data.noticeHours} hours' notice before entry.`);
    }
    steps.push("Verify that the purpose of entry is one permitted under the rule.");
    assumptions.push("It is assumed the entry is for a lawful purpose.");
  }

  if (topic.includes("repair")) {
    if (data.allowed !== undefined) {
      steps.push(`Determine whether repair-and-deduct is permitted under this jurisdiction (${data.allowed ? "yes" : "no"}).`);
    }
    steps.push("Document the repair request and any landlord response.");
    assumptions.push("It is assumed the repair is necessary for habitability.");
  }

  if (topic.includes("late") && topic.includes("fee")) {
    if (data.maxLateFeePercent !== undefined && data.maxLateFeePercent !== null) {
      steps.push(`Compare the charged late fee percentage to the maximum allowed (${data.maxLateFeePercent}%).`);
    }
    if (data.maxLateFeeAmount !== undefined && data.maxLateFeeAmount !== null) {
      steps.push(`Compare the charged late fee amount to the maximum allowed ($${data.maxLateFeeAmount}).`);
    }
    steps.push("Verify whether a grace period applies before the fee can be charged.");
  }

  // Generic fallback steps
  if (steps.length === 0) {
    steps.push("Review the rule data for applicable deadlines, caps, and notice requirements.");
    steps.push("Compare the scenario facts against each structured data point in the rule.");
    steps.push("Verify the rule version and effective date are current.");
  }

  return {
    steps: steps.slice(0, 8),
    warnings: warnings.slice(0, 6),
    assumptions: assumptions.slice(0, 4),
    citations,
  };
}

// ───────────────────────────────────────────────────────────────
// C. reasonAboutOutcome
// ───────────────────────────────────────────────────────────────

export function reasonAboutOutcome(
  topic: string,
  _jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): OutcomeReasoning {
  const facts = extractFacts(scenarioText);
  const data = rule.data as Record<string, unknown>;

  const factors: string[] = [];
  const uncertainties: string[] = [];
  const alternativePaths: string[] = [];

  // Topic-specific reasoning
  if (topic.includes("rent") && topic.includes("increase")) {
    if (facts.percentages.length > 0) {
      factors.push(`The proposed increase is ${facts.percentages[0]}%.`);
    }
    const cap = data.maxIncreasePercent ?? data.rentIncreaseLimit;
    if (cap !== undefined && cap !== null) {
      factors.push(`The rule structure allows a maximum increase of ${cap}%.`);
      if (facts.percentages.length > 0 && facts.percentages[0] > (cap as number)) {
        factors.push("The proposed increase appears to exceed the structural cap.");
        alternativePaths.push("Consider a smaller increase within the allowed limit.");
        alternativePaths.push("Check whether the property qualifies for an exemption.");
      } else if (facts.percentages.length > 0) {
        factors.push("The proposed increase appears to be within the structural limit.");
      }
    }
    if (!facts.hasNotice) {
      uncertainties.push("It is unclear whether proper notice was provided.");
    }
    if (facts.moveInDate === undefined) {
      uncertainties.push("The tenancy start date is not specified, which may affect frequency limits.");
    }
  }

  if (topic.includes("deposit")) {
    if (facts.dollarAmounts.length > 0) {
      factors.push(`A deposit of $${facts.dollarAmounts[0]} is mentioned.`);
    }
    if (data.returnDeadline !== undefined && data.returnDeadline !== null) {
      factors.push(`The rule structure indicates a ${data.returnDeadline}-day return window.`);
    }
    if (!facts.moveInDate) {
      uncertainties.push("The move-out or tenancy end date is not provided.");
    }
    alternativePaths.push("Request an itemized statement of deductions if applicable.");
  }

  if (topic.includes("eviction") || topic.includes("notice")) {
    if (facts.days.length > 0) {
      factors.push(`The notice period mentioned is ${facts.days[0]} days.`);
    }
    const required = data.noticePeriodDays ?? data.noticeForNonpayment;
    if (required !== undefined && required !== null) {
      factors.push(`The rule structure requires ${required} days' notice.`);
    }
    if (!facts.hasNotice) {
      uncertainties.push("The type and method of notice delivery are not specified.");
    }
    alternativePaths.push("Consider negotiating a resolution before proceeding.");
  }

  if (topic.includes("lease") && topic.includes("termination")) {
    if (!facts.moveInDate) {
      uncertainties.push("The lease term or start date is not specified.");
    }
    alternativePaths.push("Review the lease for any early-termination or break clauses.");
  }

  if (topic.includes("repair")) {
    if (data.allowed !== undefined) {
      factors.push(`The rule structure indicates repair-and-deduct is ${data.allowed ? "permitted" : "not permitted"}.`);
    }
    uncertainties.push("The scope and cost of the repair are not fully specified.");
    alternativePaths.push("Consider requesting the landlord address the repair directly.");
  }

  if (topic.includes("late") && topic.includes("fee")) {
    if (facts.dollarAmounts.length > 0) {
      factors.push(`A late fee of $${facts.dollarAmounts[0]} is mentioned.`);
    }
    if (facts.percentages.length > 0) {
      factors.push(`A late fee of ${facts.percentages[0]}% is mentioned.`);
    }
    const maxFee = data.maxLateFeePercent ?? data.maxLateFeeAmount;
    if (maxFee !== undefined && maxFee !== null) {
      factors.push(`The rule structure caps late fees at ${maxFee}.`);
    }
    uncertainties.push("It is unclear whether a grace period applies.");
  }

  // Build likely outcome
  const issueCount = factors.filter((f) => f.includes("exceed") || f.includes("not permitted") || f.includes("shorter")).length;

  let likelyOutcome = "Based on the rule structure and the facts provided, the outcome depends on several variables.";
  if (issueCount > 0) {
    likelyOutcome = "Based on the rule structure, one or more factors in the scenario appear to differ from the structured requirements. The outcome would depend on how those factors are resolved.";
  } else if (factors.length > 2 && uncertainties.length === 0) {
    likelyOutcome = "Based on the rule structure and the facts provided, the scenario appears to align with the structured requirements.";
  }

  if (uncertainties.length > 2) {
    likelyOutcome += " However, significant information is missing, which limits the scope of this reasoning.";
  }

  // Generic alternative paths if none were added
  if (alternativePaths.length === 0) {
    alternativePaths.push("Review the rule citations for additional context.");
    alternativePaths.push("Verify the effective date and version of the rule.");
  }

  return {
    likelyOutcome,
    factors: factors.slice(0, 6),
    uncertainties: uncertainties.slice(0, 6),
    alternativePaths: alternativePaths.slice(0, 4),
  };
}
