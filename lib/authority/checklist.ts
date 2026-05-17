/**
 * Compliance Checklist Generator
 *
 * Converts scenario reasoning into a structured, neutral, actionable checklist.
 * Sits on top of the Legal Reasoning Layer.
 */

import type { LegalRuleBlock } from "@/data/authority/schema";
import {
  analyzeScenario,
  generateCompliancePath,
  reasonAboutOutcome,
} from "@/lib/authority/reasoning";

export interface ComplianceChecklist {
  title: string;
  preconditions: string[];
  steps: string[];
  documents: string[];
  datesToCheck: string[];
  uncertainties: string[];
  warnings: string[];
  citations: string[];
}

function extractStatuteName(citation: string): string {
  // Remove section references for clean statute names
  return citation
    .replace(/,\s*s\.?\s*\d+[^,]*/gi, "")
    .replace(/,\s*§\s*[^,]*/g, "")
    .replace(/,\s*sec\.?\s*\d+[^,]*/gi, "")
    .replace(/\s*\(\d+\)\s*$/g, "")
    .trim();
}

function topicLabel(topic: string): string {
  return topic.replace(/-/g, " ");
}

export function generateChecklist(
  topic: string,
  jurisdiction: string,
  scenarioText: string,
  rule: LegalRuleBlock
): ComplianceChecklist {
  const analysis = analyzeScenario(topic, jurisdiction, scenarioText, rule);
  const path = generateCompliancePath(topic, jurisdiction, scenarioText, rule);
  const outcome = reasonAboutOutcome(topic, jurisdiction, scenarioText, rule);

  const preconditions: string[] = [];
  const steps: string[] = [];
  const documents: string[] = [];
  const datesToCheck: string[] = [];
  const warnings: string[] = [...path.warnings];
  const citations: string[] = [];

  // ── Preconditions ──
  // From analysis missing information + scenario facts
  if (analysis.missingInformation.length > 0) {
    for (const missing of analysis.missingInformation) {
      // Convert missing info into preconditions
      const precondition = missing
        .replace("not provided", "is confirmed")
        .replace("not specified", "is verified")
        .replace("not provided.", "before proceeding.");
      if (!precondition.includes("before proceeding") && !precondition.includes("is confirmed") && !precondition.includes("is verified")) {
        preconditions.push(`Confirm ${precondition.toLowerCase()}`);
      } else {
        preconditions.push(precondition);
      }
    }
  }

  // Topic-specific preconditions
  const data = rule.data as Record<string, unknown>;

  if (topic.includes("rent") && topic.includes("increase")) {
    preconditions.push("Confirm the current rent amount.");
    preconditions.push("Verify the proposed new rent amount.");
    if (data.exemptions && Array.isArray(data.exemptions) && (data.exemptions as string[]).length > 0) {
      preconditions.push("Check whether the property qualifies for any exemptions.");
    }
    documents.push("Written notice of rent increase");
    documents.push("Current lease or tenancy agreement");
    documents.push("Previous rent amount or last rent receipt");
    datesToCheck.push("Required notice period before increase can take effect");
    datesToCheck.push("Frequency limit — date of last increase");
    if (data.effectiveDate || rule.version.effectiveDate) {
      datesToCheck.push("Effective date of the current rule version");
    }
  }

  if (topic.includes("deposit")) {
    preconditions.push("Confirm the total security deposit amount paid.");
    preconditions.push("Verify the tenancy end date or move-out date.");
    documents.push("Original deposit receipt or lease clause");
    documents.push("Move-in condition inspection report");
    documents.push("Move-out condition inspection report");
    if (data.itemizedStatementRequired) {
      documents.push("Itemized list of deductions (if any)");
    }
    datesToCheck.push("Deadline for deposit return");
    if (data.interestRequired) {
      datesToCheck.push("Interest accrual period");
    }
  }

  if (topic.includes("eviction") || topic.includes("notice")) {
    preconditions.push("Confirm the reason for the notice or eviction action.");
    preconditions.push("Verify how the notice was delivered.");
    documents.push("Copy of the notice served");
    documents.push("Proof of delivery or service");
    documents.push("Lease agreement");
    datesToCheck.push("Required notice period");
    datesToCheck.push("Date notice was served");
  }

  if (topic.includes("lease") && topic.includes("termination")) {
    preconditions.push("Confirm whether the tenancy is fixed-term or month-to-month.");
    preconditions.push("Verify the lease start date.");
    documents.push("Signed lease agreement");
    documents.push("Any written termination notices exchanged");
    datesToCheck.push("Lease end date or required notice period");
    datesToCheck.push("Date termination notice was given");
  }

  if (topic.includes("entry")) {
    preconditions.push("Confirm the stated purpose of entry.");
    preconditions.push("Verify the date and time of entry.");
    documents.push("Notice of entry (if provided)");
    datesToCheck.push("Date and time of entry");
    datesToCheck.push("Required advance notice period");
  }

  if (topic.includes("repair")) {
    preconditions.push("Confirm the nature and scope of the repair.");
    preconditions.push("Verify whether the repair affects habitability.");
    documents.push("Repair request (written or verbal record)");
    documents.push("Landlord response or correspondence");
    documents.push("Repair cost estimates (if applicable)");
    datesToCheck.push("Date repair request was made");
    datesToCheck.push("Reasonable time for landlord to respond");
  }

  if (topic.includes("late") && topic.includes("fee")) {
    preconditions.push("Confirm the late fee amount or percentage charged.");
    preconditions.push("Verify the rent due date.");
    documents.push("Lease clause referencing late fees");
    documents.push("Rent payment history or ledger");
    datesToCheck.push("Rent due date");
    datesToCheck.push("Date rent was actually paid");
    if (data.gracePeriodDays !== undefined && data.gracePeriodDays !== null) {
      datesToCheck.push("Grace period before late fee applies");
    }
  }

  // Generic preconditions if none were added
  if (preconditions.length === 0) {
    preconditions.push("Review the rule data for applicable requirements.");
    preconditions.push("Confirm all relevant dates and amounts.");
  }

  // ── Steps ──
  // Start with compliance path steps, sanitized to be neutral
  for (const step of path.steps) {
    // Ensure no "should" or "must" directives
    const neutralStep = step
      .replace(/\b(must|should|shall|required to)\b/gi, (m) => {
        const lower = m.toLowerCase();
        if (lower === "must" || lower === "shall") return "verify whether";
        if (lower === "should") return "check whether";
        if (lower === "required to") return "need to";
        return m;
      })
      .replace(/\b(legal|illegal|lawful|unlawful)\b/gi, (m) => {
        // Replace with neutral alternatives
        const map: Record<string, string> = {
          legal: "permitted",
          illegal: "not permitted",
          lawful: "permitted",
          unlawful: "not permitted",
        };
        return map[m.toLowerCase()] || m;
      });
    steps.push(neutralStep);
  }

  // Add outcome-based steps for factors
  for (const factor of outcome.factors) {
    if (factor.includes("exceed") || factor.includes("cap") || factor.includes("maximum")) {
      steps.push("Compare the scenario facts against the structured rule limits.");
    }
    if (factor.includes("notice") || factor.includes("days")) {
      steps.push("Count the actual notice period and compare it to the rule structure.");
    }
  }

  // Deduplicate steps while preserving order
  const seenSteps = new Set<string>();
  const uniqueSteps: string[] = [];
  for (const s of steps) {
    if (!seenSteps.has(s)) {
      seenSteps.add(s);
      uniqueSteps.push(s);
    }
  }

  // ── Documents ──
  // Add generic documents if topic-specific ones weren't added
  if (documents.length === 0) {
    documents.push("Relevant lease or tenancy agreement");
    documents.push("Any written notices or correspondence");
    documents.push("Payment records or receipts");
  }

  // ── Dates to Check ──
  // Add generic dates if none were added
  if (datesToCheck.length === 0) {
    datesToCheck.push("Effective date of the current rule version");
    datesToCheck.push("Last updated date of the rule");
  }
  if (rule.version.effectiveDate) {
    datesToCheck.push("Rule version effective date: " + rule.version.effectiveDate);
  }

  // ── Citations ──
  for (const citation of path.citations) {
    const clean = extractStatuteName(citation);
    if (clean && !citations.includes(clean)) {
      citations.push(clean);
    }
  }

  // ── Warnings ──
  // generateCompliancePath already includes freshness, placeholder, and citation warnings.
  // We only add checklist-specific warnings here if needed.
  if (citations.length === 0 && !warnings.some(w => w.includes("citations"))) {
    warnings.push("No citations are recorded for this rule. Source verification is unavailable.");
  }

  return {
    title: `Compliance Checklist — ${jurisdiction.toUpperCase()} ${topicLabel(topic)}`,
    preconditions: preconditions.slice(0, 8),
    steps: uniqueSteps.slice(0, 10),
    documents: documents.slice(0, 8),
    datesToCheck: datesToCheck.slice(0, 6),
    uncertainties: outcome.uncertainties.slice(0, 6),
    warnings: warnings.slice(0, 6),
    citations: citations.slice(0, 6),
  };
}
