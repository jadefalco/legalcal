export function validateArrears(
  monthsOwed: { monthLabel: string; amountOwed: number }[],
  totalArrears: number
): {
  valid: boolean;
  calculatedTotal: number;
} {
  const calculatedTotal = monthsOwed.reduce(
    (sum, item) => sum + item.amountOwed,
    0
  );
  const valid = calculatedTotal === totalArrears;
  return { valid, calculatedTotal };
}
