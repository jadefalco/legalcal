import { getRule } from "@/lib/authority/query";
import type { SecurityDepositResult, SecurityDepositRule } from "./schema";

function addDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function calculateSecurityDeposit(
  stateCode: string,
  monthlyRent: number,
  moveOutDate: string
): SecurityDepositResult {
  const ruleBlock = getRule(stateCode, "security-deposit");
  const rule = ruleBlock?.data as SecurityDepositRule | undefined;

  if (!rule) {
    return {
      maxDepositAmount: null,
      maxMonthsRent: null,
      separatePetDepositAllowed: false,
      nonrefundableFeesAllowed: false,
      moveOutDate,
      returnDeadlineDate: moveOutDate,
      itemizedStatementRequired: false,
      penaltyMultiple: null,
      statutes: [],
      notes: ["State data not available."],
    };
  }

  const maxDepositAmount =
    rule.maxMonthsRent !== null ? monthlyRent * rule.maxMonthsRent : null;

  const returnDeadlineDate = addDays(moveOutDate, rule.returnDeadlineDays);

  return {
    maxDepositAmount,
    maxMonthsRent: rule.maxMonthsRent,
    separatePetDepositAllowed: rule.separatePetDepositAllowed,
    nonrefundableFeesAllowed: rule.nonrefundableFeesAllowed,
    moveOutDate,
    returnDeadlineDate,
    itemizedStatementRequired: rule.itemizedStatementRequired,
    penaltyMultiple: rule.penaltyMultiple,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
