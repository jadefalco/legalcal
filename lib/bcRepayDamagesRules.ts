export function validateRepaymentPlan(
  estimatedRepairCost: number,
  initialPaymentAmount: number,
  numberOfInstallments: number,
  installmentAmount: number
): {
  valid: boolean;
  calculatedTotal: number;
} {
  const calculatedTotal =
    initialPaymentAmount + numberOfInstallments * installmentAmount;
  const valid = calculatedTotal === estimatedRepairCost;
  return { valid, calculatedTotal };
}
