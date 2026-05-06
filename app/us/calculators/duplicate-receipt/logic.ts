import { getRule } from "@/lib/authority/query";
import type { DuplicateReceiptResult, DuplicateReceiptRule } from "./schema";

export function calculateDuplicateReceipt(stateCode: string): DuplicateReceiptResult {
  const ruleBlock = getRule(stateCode, "duplicate-receipt");
  const rule = ruleBlock?.data as DuplicateReceiptRule | undefined;

  if (!rule) {
    return {
      tenantRightToCopy: false,
      landlordMustProvide: false,
      timeframe: "Not specified",
      allowedFee: null,
      requiredFields: [],
      statutes: [],
      notes: ["State data not available. Check your lease agreement or consult local law."],
    };
  }

  return {
    tenantRightToCopy: rule.tenantRightToCopy,
    landlordMustProvide: rule.landlordMustProvide,
    timeframe: rule.timeframe,
    allowedFee: rule.allowedFee,
    requiredFields: rule.requiredFields,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
