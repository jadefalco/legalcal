import { getRule } from "@/lib/authority/query";
import type { LateFeeResult, LateFeeRule } from "./schema";

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

export function calculateLateFee(
  stateCode: string,
  rentDueDate: string,
  rentAmount: number
): LateFeeResult {
  const ruleBlock = getRule(stateCode, "late-fee");
  const rule = ruleBlock?.data as LateFeeRule | undefined;

  if (!rule) {
    return {
      dueDate: rentDueDate,
      gracePeriodEnds: addDays(rentDueDate, 5),
      allowedLateFee: null,
      dailyLateFee: null,
      percentageCap: null,
      statutes: [],
      notes: ["State data not available. Defaulting to 5-day grace period. Consult your lease for specific late fee terms."],
    };
  }

  const gracePeriodEnds = addDays(rentDueDate, rule.gracePeriodDays);

  let allowedLateFee: number | null = null;
  if (rule.maxLateFee !== null) {
    allowedLateFee = rule.maxLateFee;
  } else if (rule.percentageCap !== null) {
    allowedLateFee = Math.round(rentAmount * (rule.percentageCap / 100) * 100) / 100;
  }

  return {
    dueDate: rentDueDate,
    gracePeriodEnds,
    allowedLateFee,
    dailyLateFee: rule.dailyLateFee,
    percentageCap: rule.percentageCap,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
