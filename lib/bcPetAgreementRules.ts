export function validatePetDeposit(
  petDepositAmount: number
): {
  valid: boolean;
} {
  const valid = petDepositAmount >= 0 && petDepositAmount <= 250;
  return { valid };
}
