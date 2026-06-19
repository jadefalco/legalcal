/**
 * Deterministic breach classification for BC.
 */

export function classifyBreach(
  breachType: string
): {
  severity: "minor" | "moderate" | "serious";
  recommendedFixDays: number;
} {
  switch (breachType) {
    case "non_payment":
      return { severity: "serious", recommendedFixDays: 5 };
    case "unauthorized_occupants":
      return { severity: "moderate", recommendedFixDays: 7 };
    case "unauthorized_pets":
      return { severity: "moderate", recommendedFixDays: 7 };
    case "noise_disturbance":
      return { severity: "minor", recommendedFixDays: 3 };
    case "property_damage":
      return { severity: "serious", recommendedFixDays: 5 };
    case "illegal_activity":
      return { severity: "serious", recommendedFixDays: 0 };
    case "other":
      return { severity: "moderate", recommendedFixDays: 7 };
    default:
      return { severity: "moderate", recommendedFixDays: 7 };
  }
}
