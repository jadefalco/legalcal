/**
 * Deterministic rent receipt period validation for BC.
 */

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export function validateRentPeriod(
  start: string,
  end: string
): {
  valid: boolean;
  days: number;
} {
  const days = daysBetween(start, end);
  const valid = days >= 1;
  return { valid, days };
}
