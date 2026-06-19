export function calculateTerminationNoticePay(
  employmentStartDate: string,
  employmentEndDate: string,
  averageDailyWage: number,
  terminationReason: string
): {
  eligible: boolean;
  noticePeriodDays: number;
  noticePayAmount: number;
  serviceLengthYears: number;
} {
  // 1. Determine service length in full years (floor)
  const [sy, sm, sd] = employmentStartDate.split("-").map(Number);
  const [ey, em, ed] = employmentEndDate.split("-").map(Number);

  let serviceLengthYears = ey - sy;
  if (em < sm || (em === sm && ed < sd)) {
    serviceLengthYears -= 1;
  }
  if (serviceLengthYears < 0) {
    serviceLengthYears = 0;
  }

  // Also compute exact years for notice-period mapping
  const start = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const exactYears = (end.getTime() - start.getTime()) / msPerYear;

  // 2. Eligibility
  const eligible = terminationReason !== "with_cause";

  // 3. Notice period (Alberta Employment Standards Code)
  let noticeWeeks = 0;
  if (exactYears >= 10) {
    noticeWeeks = 8;
  } else if (exactYears >= 8) {
    noticeWeeks = 6;
  } else if (exactYears >= 6) {
    noticeWeeks = 5;
  } else if (exactYears >= 4) {
    noticeWeeks = 4;
  } else if (exactYears >= 2) {
    noticeWeeks = 2;
  } else if (exactYears >= 0.25) {
    noticeWeeks = 1;
  } else {
    noticeWeeks = 0;
  }

  const noticePeriodDays = noticeWeeks * 7;

  // 4. Notice-pay calculation
  const noticePayAmount = eligible
    ? noticePeriodDays * averageDailyWage
    : 0;

  return {
    eligible,
    noticePeriodDays,
    noticePayAmount,
    serviceLengthYears,
  };
}
