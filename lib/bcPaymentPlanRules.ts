/**
 * Deterministic payment plan validation for BC.
 */

export function validatePaymentPlan(
  totalAmountOwed: number,
  initialPaymentAmount: number,
  numberOfInstallments: number,
  installmentAmount: number
): {
  valid: boolean;
  calculatedTotal: number;
} {
  const calculatedTotal =
    initialPaymentAmount + numberOfInstallments * installmentAmount;
  const valid = calculatedTotal === totalAmountOwed;
  return { valid, calculatedTotal };
}
