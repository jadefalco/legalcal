import { getRule } from "@/lib/authority/query";
import type { LateStatusResult, LateStatusRule } from "./schema";

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getNthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  n: number
): Date {
  // weekday: 0=Sun, 1=Mon, ..., 6=Sat
  // n: 1=first, 2=second, 3=third, 4=fourth, -1=last
  const firstDay = new Date(year, month, 1);
  let count = 0;
  let result: Date | null = null;

  for (let d = 1; d <= 31; d++) {
    const candidate = new Date(year, month, d);
    if (candidate.getMonth() !== month) break;
    if (candidate.getDay() === weekday) {
      count++;
      if (n > 0 && count === n) {
        result = candidate;
        break;
      }
      result = candidate;
    }
  }

  return result!;
}

function isFederalHoliday(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const holidays: string[] = [];

  // New Year's Day (Jan 1) — observed Fri or Mon if on weekend
  if (month === 0) {
    if (day === 1) holidays.push("new-years");
    if (day === 2 && dayOfWeek === 1) holidays.push("new-years-observed");
    if (day === 31 && dayOfWeek === 5) holidays.push("new-years-observed");
  }

  // MLK Day (3rd Monday in Jan)
  const mlkDay = getNthWeekdayOfMonth(year, 0, 1, 3);
  if (month === 0 && day === mlkDay.getDate()) holidays.push("mlk");

  // Presidents' Day (3rd Monday in Feb)
  const presDay = getNthWeekdayOfMonth(year, 1, 1, 3);
  if (month === 1 && day === presDay.getDate()) holidays.push("presidents");

  // Memorial Day (last Monday in May)
  const memorialDay = getNthWeekdayOfMonth(year, 4, 1, -1);
  if (month === 4 && day === memorialDay.getDate()) holidays.push("memorial");

  // Juneteenth (June 19) — observed Fri or Mon if on weekend
  if (month === 5) {
    if (day === 19) holidays.push("juneteenth");
    if (day === 20 && dayOfWeek === 1) holidays.push("juneteenth-observed");
    if (day === 18 && dayOfWeek === 5) holidays.push("juneteenth-observed");
  }

  // Independence Day (July 4) — observed Fri or Mon if on weekend
  if (month === 6) {
    if (day === 4) holidays.push("independence");
    if (day === 5 && dayOfWeek === 1) holidays.push("independence-observed");
    if (day === 3 && dayOfWeek === 5) holidays.push("independence-observed");
  }

  // Labor Day (1st Monday in Sep)
  const laborDay = getNthWeekdayOfMonth(year, 8, 1, 1);
  if (month === 8 && day === laborDay.getDate()) holidays.push("labor");

  // Columbus Day / Indigenous Peoples' Day (2nd Monday in Oct)
  const columbusDay = getNthWeekdayOfMonth(year, 9, 1, 2);
  if (month === 9 && day === columbusDay.getDate()) holidays.push("columbus");

  // Veterans Day (Nov 11) — observed Fri or Mon if on weekend
  if (month === 10) {
    if (day === 11) holidays.push("veterans");
    if (day === 12 && dayOfWeek === 1) holidays.push("veterans-observed");
    if (day === 10 && dayOfWeek === 5) holidays.push("veterans-observed");
  }

  // Thanksgiving (4th Thursday in Nov)
  const thanksgiving = getNthWeekdayOfMonth(year, 10, 4, 4);
  if (month === 10 && day === thanksgiving.getDate()) holidays.push("thanksgiving");

  // Christmas Day (Dec 25) — observed Fri or Mon if on weekend
  if (month === 11) {
    if (day === 25) holidays.push("christmas");
    if (day === 26 && dayOfWeek === 1) holidays.push("christmas-observed");
    if (day === 24 && dayOfWeek === 5) holidays.push("christmas-observed");
  }

  return holidays.length > 0;
}

function getAdjustedDueDate(
  dueDate: Date,
  weekendExtension: boolean,
  holidayExtension: boolean
): Date {
  let adjusted = new Date(dueDate);

  // Apply weekend extension
  if (weekendExtension) {
    while (isWeekend(adjusted)) {
      adjusted = addDays(adjusted, 1);
    }
  }

  // Apply holiday extension
  if (holidayExtension) {
    while (isFederalHoliday(adjusted) || isWeekend(adjusted)) {
      adjusted = addDays(adjusted, 1);
    }
  }

  return adjusted;
}

export function calculateLateStatus(
  stateCode: string,
  dueDateStr: string,
  todayStr: string
): LateStatusResult {
  const ruleBlock = getRule(stateCode, "late-status");
  const rule = ruleBlock?.data as LateStatusRule | undefined;

  if (!rule) {
    return {
      dueDate: dueDateStr,
      adjustedDueDate: dueDateStr,
      gracePeriodEnds: dueDateStr,
      isLateToday: false,
      lateFeesAllowedToday: false,
      weekendExtension: false,
      holidayExtension: false,
      statutes: [],
      notes: ["State data not available."],
    };
  }

  const dueDate = parseDate(dueDateStr);
  const today = parseDate(todayStr);

  const adjustedDueDate = getAdjustedDueDate(
    dueDate,
    rule.weekendExtension,
    rule.holidayExtension
  );

  const gracePeriodEnds = addDays(adjustedDueDate, rule.gracePeriodDays);

  const isLateToday = today > adjustedDueDate;

  const lateFeesAllowedToday = rule.lateFeeStartAfterGrace
    ? today > gracePeriodEnds
    : today > adjustedDueDate;

  return {
    dueDate: dueDateStr,
    adjustedDueDate: formatDate(adjustedDueDate),
    gracePeriodEnds: formatDate(gracePeriodEnds),
    isLateToday,
    lateFeesAllowedToday,
    weekendExtension: rule.weekendExtension,
    holidayExtension: rule.holidayExtension,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
