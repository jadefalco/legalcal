export function validateTenancyDates(
  tenancyStartDate: string,
  rentPaidUpToDate: string
): {
  valid: boolean;
} {
  const [startYear, startMonth, startDay] = tenancyStartDate
    .split("-")
    .map(Number);
  const [paidYear, paidMonth, paidDay] = rentPaidUpToDate
    .split("-")
    .map(Number);

  const start = new Date(startYear, startMonth - 1, startDay);
  const paid = new Date(paidYear, paidMonth - 1, paidDay);

  const valid = paid.getTime() >= start.getTime();

  return { valid };
}
