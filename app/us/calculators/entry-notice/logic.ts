import { getRule } from "@/lib/authority/query";
import type { EntryNoticeResult, EntryNoticeRule } from "./schema";

function addHours(dateTimeStr: string, hours: number): string {
  const date = new Date(dateTimeStr);
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function calculateEntryNotice(
  stateCode: string,
  _entryReason: string,
  nowDateTime: string
): EntryNoticeResult {
  const ruleBlock = getRule(stateCode, "entry-notice");
  const rule = ruleBlock?.data as EntryNoticeRule | undefined;

  if (!rule) {
    const noticeHours = 24;
    return {
      noticeHours,
      earliestEntryDateTime: addHours(nowDateTime, noticeHours),
      specialRules: [],
      allowedReasons: ["Repairs", "Inspections", "Showings", "Emergencies"],
      emergencyAllowed: true,
      weekendRules: [],
      statutes: [],
      notes: ["State data not available. Defaulting to 24-hour notice requirement."],
    };
  }

  let noticeHours: number;
  let specialRules: string[] = [];

  if (typeof rule.noticeHours === "number") {
    noticeHours = rule.noticeHours;
  } else {
    noticeHours = rule.noticeHours.standard;
    specialRules = rule.noticeHours.special;
  }

  const earliestEntryDateTime = addHours(nowDateTime, noticeHours);

  return {
    noticeHours,
    earliestEntryDateTime,
    specialRules,
    allowedReasons: rule.allowedReasons,
    emergencyAllowed: rule.emergencyAllowed,
    weekendRules: rule.weekendRules,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
