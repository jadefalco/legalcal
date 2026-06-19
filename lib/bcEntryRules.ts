/**
 * Deterministic BC entry-notice validation.
 */

function hoursBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerHour = 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerHour);
}

export function validateEntryNotice(
  entryReason: string,
  noticeServeDate: string,
  entryDate: string
): {
  valid: boolean;
  requiredNoticeHours: number;
  actualNoticeHours: number;
} {
  if (entryReason === "emergency") {
    return { valid: true, requiredNoticeHours: 0, actualNoticeHours: 0 };
  }

  const requiredNoticeHours = 24;
  const actualNoticeHours = hoursBetween(noticeServeDate, entryDate);
  const valid = actualNoticeHours >= requiredNoticeHours;

  return { valid, requiredNoticeHours, actualNoticeHours };
}
