import { getRule } from "@/lib/authority/query";
import type { PaymentMethodsResult, PaymentMethodsRule } from "./schema";

export function calculatePaymentMethods(stateCode: string): PaymentMethodsResult {
  const ruleBlock = getRule(stateCode, "payment-methods");
  const rule = ruleBlock?.data as PaymentMethodsRule | undefined;
  if (!rule) {
    return {
      mustAcceptCash: false,
      mustAcceptCheck: false,
      mustAcceptMoneyOrder: false,
      canRequireOnlineOnly: true,
      canChargeProcessingFee: true,
      prohibitedMethods: [],
      requiredAlternatives: [],
      statutes: [],
      notes: ["State data not available."],
    };
  }
  return { ...rule };
}
