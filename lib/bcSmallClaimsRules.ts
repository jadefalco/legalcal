export function validateSmallClaims(
  claimAmount: number
): {
  valid: boolean;
} {
  const valid = claimAmount > 0 && claimAmount <= 35000;
  return { valid };
}
