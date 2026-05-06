import { getRule } from "@/lib/authority/query";
import type { LeaseTerminationResult, LeaseTerminationRule } from "./schema";

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

export function calculateLeaseTermination(
  stateCode: string,
  moveOutDate: string
): LeaseTerminationResult {
  const ruleBlock = getRule(stateCode, "lease-termination");
  const rule = ruleBlock?.data as LeaseTerminationRule | undefined;

  if (!rule) {
    return {
      noticeRequired: 30,
      deadlineDate: addDays(moveOutDate, -30),
      specialRules: [],
      allowedReasons: ["no-fault"],
      penalties: [],
      statutes: [],
      notes: ["State data not available. Defaulting to 30-day notice."],
    };
  }

  let noticeRequired: number;
  let specialRules: string[] = [];

  if (typeof rule.noticePeriod === "number") {
    noticeRequired = rule.noticePeriod;
  } else {
    noticeRequired = rule.noticePeriod.fixed;
    specialRules = rule.noticePeriod.special;
  }

  const deadlineDate = addDays(moveOutDate, -noticeRequired);

  return {
    noticeRequired,
    deadlineDate,
    specialRules,
    allowedReasons: rule.allowedReasons,
    penalties: rule.penalties,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
