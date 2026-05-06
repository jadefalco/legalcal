import { getRule } from "@/lib/authority/query";
import type { RentIncreaseResult, RentIncreaseRule } from "./schema";

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

export function calculateRentIncrease(
  stateCode: string,
  noticeDate: string
): RentIncreaseResult {
  const ruleBlock = getRule(stateCode, "rent-increase");
  const rule = ruleBlock?.data as RentIncreaseRule | undefined;

  if (!rule) {
    const noticeDays = 30;
    return {
      noticeDays,
      effectiveDate: addDays(noticeDate, noticeDays),
      specialRules: [],
      maxIncreasePercent: null,
      rentControl: false,
      frequencyLimit: null,
      statutes: [],
      notes: ["State data not available. Defaulting to 30-day notice period."],
    };
  }

  let noticeDays: number;
  let specialRules: string[] = [];

  if (typeof rule.noticeDays === "number") {
    noticeDays = rule.noticeDays;
  } else {
    noticeDays = rule.noticeDays.standard;
    specialRules = rule.noticeDays.special;
  }

  const effectiveDate = addDays(noticeDate, noticeDays);

  return {
    noticeDays,
    effectiveDate,
    specialRules,
    maxIncreasePercent: rule.maxIncreasePercent,
    rentControl: rule.rentControl,
    frequencyLimit: rule.frequencyLimit,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
