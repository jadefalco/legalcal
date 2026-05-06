import { getRule } from "@/lib/authority/query";
import type { PaymentProofResult, PaymentProofRule } from "./schema";

export function calculatePaymentProof(
  stateCode: string,
  providedProof: string[]
): PaymentProofResult {
  const ruleBlock = getRule(stateCode, "payment-proof");
  const rule = ruleBlock?.data as PaymentProofRule | undefined;

  if (!rule) {
    return {
      acceptedProof: [],
      rejectedProof: [],
      digitalProofAllowed: true,
      landlordMustAcknowledge: false,
      acknowledgementTimeframe: "Not specified",
      burdenOfProofRule: "Not specified",
      statutes: [],
      notes: ["State data not available."],
      missingRequiredProof: [],
    };
  }

  const normalizedProvided = providedProof.map((p) => p.toLowerCase().trim());
  const missingRequiredProof = rule.acceptedProof.filter(
    (proof) => !normalizedProvided.includes(proof.toLowerCase().trim())
  );

  return {
    acceptedProof: rule.acceptedProof,
    rejectedProof: rule.rejectedProof,
    digitalProofAllowed: rule.digitalProofAllowed,
    landlordMustAcknowledge: rule.landlordMustAcknowledge,
    acknowledgementTimeframe: rule.acknowledgementTimeframe,
    burdenOfProofRule: rule.burdenOfProofRule,
    statutes: rule.statutes,
    notes: rule.notes,
    missingRequiredProof,
  };
}
