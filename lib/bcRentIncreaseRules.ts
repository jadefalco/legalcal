/**
 * Deterministic rent-increase validation for BC.
 */

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export function validateRentIncrease(
  currentRent: number,
  proposedRent: number,
  _tenancyStartDate: string,
  noticeServeDate: string,
  effectiveDate: string
): {
  valid: boolean;
  increasePercent: number;
  requiredNoticeDays: number;
} {
  const increasePercent =
    currentRent > 0 ? ((proposedRent - currentRent) / currentRent) * 100 : 0;

  const requiredNoticeDays = 90;
  const actualDays = daysBetween(noticeServeDate, effectiveDate);

  const withinCap = increasePercent <= 3.5;
  const sufficientNotice = actualDays >= requiredNoticeDays;

  const valid = withinCap && sufficientNotice;

  return { valid, increasePercent, requiredNoticeDays };
}
