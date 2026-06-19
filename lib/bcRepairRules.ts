/**
 * Deterministic repair-urgency classification for BC.
 */

export function classifyRepairUrgency(
  urgencyLevel: string,
  tenantBelievesHealthOrSafetyRisk: boolean
): {
  category: "emergency" | "priority" | "standard";
  recommendedTimelineDays: number;
} {
  if (urgencyLevel === "urgent" && tenantBelievesHealthOrSafetyRisk) {
    return { category: "emergency", recommendedTimelineDays: 1 };
  }
  if (urgencyLevel === "urgent") {
    return { category: "priority", recommendedTimelineDays: 3 };
  }
  return { category: "standard", recommendedTimelineDays: 7 };
}
