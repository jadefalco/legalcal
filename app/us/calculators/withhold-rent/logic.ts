import { getRule } from "@/lib/authority/query";
import type { WithholdRentResult, WithholdRentRule } from "./schema";

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateWithholdRent(
  stateCode: string,
  noticeDate: string
): WithholdRentResult {
  const ruleBlock = getRule(stateCode, "withhold-rent");
  const rule = ruleBlock?.data as WithholdRentRule | undefined;

  if (!rule) {
    return {
      allowed: false,
      escrowRequired: false,
      noticeRequirementDays: 0,
      earliestWithholdingDate: "",
      severityThreshold: "Unknown",
      retaliationProtection: false,
      statutes: [],
      notes: ["State data not available. Withholding rent is risky without specific legal authority. Consult an attorney before withholding rent."],
    };
  }

  const earliestWithholdingDate = addDays(noticeDate, rule.noticeRequirementDays);

  return {
    allowed: rule.allowed,
    escrowRequired: rule.escrowRequired,
    noticeRequirementDays: rule.noticeRequirementDays,
    earliestWithholdingDate,
    severityThreshold: rule.severityThreshold,
    retaliationProtection: rule.retaliationProtection,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
