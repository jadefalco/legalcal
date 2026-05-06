import { getRule } from "@/lib/authority/query";
import type { DepositReturnResult, DepositReturnRule } from "./schema";

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

export function calculateDepositReturn(
  stateCode: string,
  moveOutDate: string,
  _longTermTenant: boolean = false
): DepositReturnResult {
  const ruleBlock = getRule(stateCode, "deposit-return");
  const rule = ruleBlock?.data as DepositReturnRule | undefined;

  if (!rule) {
    return {
      deadlineDays: 30,
      deadlineDate: addDays(moveOutDate, 30),
      interestRequired: false,
      interestRate: null,
      penalties: [],
      allowableDeductions: ["Unpaid rent", "Damage beyond normal wear and tear"],
      statutes: [],
      notes: ["State data not available. Defaulting to 30-day return deadline."],
      specialRules: [],
    };
  }

  let deadlineDays: number;
  let specialRules: string[] = [];

  if (typeof rule.returnDeadline === "number") {
    deadlineDays = rule.returnDeadline;
  } else {
    deadlineDays = rule.returnDeadline.standard;
    specialRules = rule.returnDeadline.special;
  }

  const deadlineDate = addDays(moveOutDate, deadlineDays);

  return {
    deadlineDays,
    deadlineDate,
    interestRequired: rule.interestRequired,
    interestRate: rule.interestRate,
    penalties: rule.penalties,
    allowableDeductions: rule.allowableDeductions,
    statutes: rule.statutes,
    notes: rule.notes,
    specialRules,
  };
}
