/**
 * Deterministic security-deposit return validation for BC.
 */

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export function validateDepositReturn(
  tenancyEndDate: string,
  today: string
): {
  valid: boolean;
  daysSinceMoveOut: number;
} {
  const daysSinceMoveOut = daysBetween(tenancyEndDate, today);
  const valid = daysSinceMoveOut >= 15;
  return { valid, daysSinceMoveOut };
}
