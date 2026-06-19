/**
 * Deterministic condition inspection validation for BC.
 */

export function validateInspection(
  inspectionType: string,
  inspectionDate: string
): {
  valid: boolean;
} {
  const valid =
    (inspectionType === "move_in" || inspectionType === "move_out") &&
    !!inspectionDate;
  return { valid };
}
