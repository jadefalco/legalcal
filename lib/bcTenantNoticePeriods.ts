/**
 * Deterministic notice-period validation for BC tenant notices to end tenancy.
 */

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export function validateTenantNoticePeriod(
  reason: string,
  noticeServeDate: string,
  moveOutDate: string
): { valid: boolean; requiredDays: number } {
  let requiredDays: number;
  switch (reason) {
    case "tenant_moving_out":
      requiredDays = 30;
      break;
    case "landlord_breach":
      requiredDays = 0;
      break;
    case "unsafe_conditions":
      requiredDays = 0;
      break;
    case "family_violence":
      requiredDays = 0;
      break;
    case "mutual_agreement":
      requiredDays = 0;
      break;
    default:
      requiredDays = 0;
  }

  const actualDays = daysBetween(noticeServeDate, moveOutDate);
  const valid = actualDays >= requiredDays;
  return { valid, requiredDays };
}
