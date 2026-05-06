import { getRule } from "@/lib/authority/query";
import type { RepairDeductResult, RepairDeductRule } from "./schema";

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

export function calculateRepairDeduct(
  stateCode: string,
  noticeDate: string
): RepairDeductResult {
  const ruleBlock = getRule(stateCode, "repair-deduct");
  const rule = ruleBlock?.data as RepairDeductRule | undefined;

  if (!rule) {
    return {
      allowed: false,
      maxDeduction: null,
      frequencyLimit: null,
      noticeRequirementDays: 0,
      emergencyAllowed: false,
      earliestRepairDate: "",
      statutes: [],
      notes: ["State data not available. Consult local law or an attorney before deducting repair costs from rent."],
    };
  }

  const earliestRepairDate = addDays(noticeDate, rule.noticeRequirementDays);

  return {
    allowed: rule.allowed,
    maxDeduction: rule.maxDeduction,
    frequencyLimit: rule.frequencyLimit,
    noticeRequirementDays: rule.noticeRequirementDays,
    emergencyAllowed: rule.emergencyAllowed,
    earliestRepairDate,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
