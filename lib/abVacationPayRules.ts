export function calculateVacationPay(
  totalWagesEarned: number,
  yearsOfService: number
): {
  vacationRatePercent: number;
  vacationPayAmount: number;
} {
  const vacationRatePercent = yearsOfService < 5 ? 4 : 6;

  const vacationPayAmount = totalWagesEarned * (vacationRatePercent / 100);

  return {
    vacationRatePercent,
    vacationPayAmount,
  };
}
