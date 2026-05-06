import { getRule } from "@/lib/authority/query";
import type { EvictionTimelineResult, EvictionTimelineRule } from "./schema";

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

export function calculateEvictionTimeline(
  stateCode: string,
  noticeDate: string
): EvictionTimelineResult {
  const ruleBlock = getRule(stateCode, "eviction-timeline");
  const rule = ruleBlock?.data as EvictionTimelineRule | undefined;

  if (!rule) {
    const noticePeriod = 3;
    const filingDate = addDays(noticeDate, noticePeriod + 5);
    const hearingDate = addDays(noticeDate, noticePeriod + 5 + 14);
    const lockoutDate = addDays(noticeDate, noticePeriod + 5 + 14 + 7);
    return {
      noticePeriod,
      filingDate,
      hearingDate,
      lockoutDate,
      specialRules: [],
      statutes: [],
      notes: ["State data not available. Defaulting to generic 3-day notice timeline."],
    };
  }

  let noticePeriod: number;
  let specialRules: string[] = [];

  if (typeof rule.noticePeriod === "number") {
    noticePeriod = rule.noticePeriod;
  } else {
    noticePeriod = rule.noticePeriod.standard;
    specialRules = rule.noticePeriod.special;
  }

  const filingDate = addDays(noticeDate, noticePeriod + rule.courtFilingDelay);
  const hearingDate = addDays(
    noticeDate,
    noticePeriod + rule.courtFilingDelay + rule.hearingSchedulingDelay
  );
  const lockoutDate = addDays(
    noticeDate,
    noticePeriod +
      rule.courtFilingDelay +
      rule.hearingSchedulingDelay +
      rule.sheriffLockoutDelay
  );

  return {
    noticePeriod,
    filingDate,
    hearingDate,
    lockoutDate,
    specialRules,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
