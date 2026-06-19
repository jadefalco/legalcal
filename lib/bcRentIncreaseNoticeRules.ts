export function validateRentIncrease(
  currentRentAmount: number,
  proposedRentAmount: number,
  rentIncreasePercent: number,
  noticeServeDate: string,
  effectiveDate: string
): {
  valid: boolean;
  calculatedPercent: number;
  requiredNoticeMonths: number;
  actualNoticeMonths: number;
} {
  const calculatedPercent =
    currentRentAmount > 0
      ? ((proposedRentAmount - currentRentAmount) / currentRentAmount) * 100
      : 0;

  const requiredNoticeMonths = 3;

  const [sy, sm, sd] = noticeServeDate.split("-").map(Number);
  const [ey, em, ed] = effectiveDate.split("-").map(Number);

  let actualNoticeMonths = (ey - sy) * 12 + (em - sm);
  if (ed < sd) {
    actualNoticeMonths -= 1;
  }

  const percentValid =
    Math.round(calculatedPercent * 10) / 10 === rentIncreasePercent;
  const noticeValid = actualNoticeMonths >= requiredNoticeMonths;

  const valid = percentValid && noticeValid;

  return { valid, calculatedPercent, requiredNoticeMonths, actualNoticeMonths };
}
