import { getRule } from "@/lib/authority/query";
import type { ReceiptValidationResult, ReceiptValidationRule } from "./schema";

export function calculateReceiptValidation(
  stateCode: string,
  providedFields: string[]
): ReceiptValidationResult {
  const ruleBlock = getRule(stateCode, "receipt-validation");
  const rule = ruleBlock?.data as ReceiptValidationRule | undefined;
  if (!rule) {
    return {
      requiredFields: [],
      missingFields: [],
      digitalAllowed: true,
      signatureRequired: false,
      itemizationRequired: false,
      statutes: [],
      notes: ["State data not available."],
    };
  }

  const normalizedProvided = providedFields.map((f) => f.toLowerCase().trim());
  const missingFields = rule.requiredFields.filter(
    (field) => !normalizedProvided.includes(field.toLowerCase().trim())
  );

  return {
    requiredFields: rule.requiredFields,
    missingFields,
    digitalAllowed: rule.digitalAllowed,
    signatureRequired: rule.signatureRequired,
    itemizationRequired: rule.itemizationRequired,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
