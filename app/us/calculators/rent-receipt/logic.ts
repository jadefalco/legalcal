import { getRule } from "@/lib/authority/query";
import type { RentReceiptResult, RentReceiptRule } from "./schema";

export function calculateRentReceipt(stateCode: string): RentReceiptResult {
  const ruleBlock = getRule(stateCode, "rent-receipt");
  const rule = ruleBlock?.data as RentReceiptRule | undefined;

  if (!rule) {
    return {
      required: false,
      requiredWhenCash: false,
      requiredWhenRequested: false,
      deliveryMethods: [],
      timeframe: "Varies by lease",
      statutes: [],
      notes: ["State data not available. Check your lease agreement or consult local law."],
    };
  }

  return {
    required: rule.required,
    requiredWhenCash: rule.requiredWhenCash,
    requiredWhenRequested: rule.requiredWhenRequested,
    deliveryMethods: rule.deliveryMethods,
    timeframe: rule.timeframe,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
