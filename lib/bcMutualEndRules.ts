/**
 * Deterministic mutual agreement to end tenancy validation for BC.
 */

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export function validateMutualAgreement(
  tenancyStartDate: string,
  agreedMoveOutDate: string
): {
  valid: boolean;
  daysBetween: number;
} {
  const days = daysBetween(tenancyStartDate, agreedMoveOutDate);
  const valid = days >= 1;
  return { valid, daysBetween: days };
}
