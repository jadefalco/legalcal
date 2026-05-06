import { getRule } from "@/lib/authority/query";
import type { LedgerValidationResult, LedgerValidationRule, PaymentEntry, ChargeEntry } from "./schema";

export function calculateLedgerValidation(
  stateCode: string,
  payments: PaymentEntry[],
  charges: ChargeEntry[]
): LedgerValidationResult {
  const ruleBlock = getRule(stateCode, "ledger-validation");
  const rule = ruleBlock?.data as LedgerValidationRule | undefined;

  if (!rule) {
    return {
      illegalFeesFound: [],
      misappliedPayments: [],
      balanceAccordingToTenant: 0,
      balanceAccordingToLandlord: 0,
      difference: 0,
      paymentApplicationOrder: [],
      lateFeeRules: "",
      partialPaymentRules: "",
      statutes: [],
      notes: ["State data not available."],
    };
  }

  const totalCharges = charges.reduce((sum, c) => sum + c.amount, 0);
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

  // Find illegal fees
  const illegalFeesFound: string[] = [];
  const illegalFeeTotal = charges.reduce((sum, charge) => {
    const isIllegal = rule.illegalFees.some(
      (fee) =>
        charge.type.toLowerCase().includes(fee.toLowerCase()) ||
        fee.toLowerCase().includes(charge.type.toLowerCase())
    );
    if (isIllegal) {
      illegalFeesFound.push(`${charge.type}: $${charge.amount.toFixed(2)}`);
      return sum + charge.amount;
    }
    return sum;
  }, 0);

  // Compute balances
  const balanceAccordingToTenant = totalCharges - totalPayments;
  const balanceAccordingToLandlord =
    totalCharges - illegalFeeTotal - totalPayments;
  const difference = balanceAccordingToLandlord - balanceAccordingToTenant;

  // Detect misapplied payments
  const misappliedPayments: string[] = [];

  // Group charges by normalized type
  const chargeByType: Record<string, number> = {};
  charges.forEach((c) => {
    const normalized = c.type.toLowerCase().trim();
    chargeByType[normalized] = (chargeByType[normalized] || 0) + c.amount;
  });

  // Calculate rent total
  const rentTotal =
    chargeByType["rent"] ||
    chargeByType["monthly rent"] ||
    chargeByType["base rent"] ||
    0;

  // If payments don't cover rent but there are late fees or other charges
  if (totalPayments > 0 && rentTotal > 0) {
    const lateFeeTotal =
      chargeByType["late fee"] ||
      chargeByType["late fees"] ||
      chargeByType["penalty"] ||
      0;

    const utilityTotal =
      chargeByType["utilities"] ||
      chargeByType["utility"] ||
      chargeByType["water"] ||
      chargeByType["electric"] ||
      chargeByType["gas"] ||
      0;

    // If landlord might have applied payments to late fees before rent
    if (totalPayments < rentTotal && lateFeeTotal > 0) {
      misappliedPayments.push(
        "Payments may have been applied to late fees before rent was fully paid"
      );
    }

    // If landlord might have applied payments to utilities before rent
    if (totalPayments < rentTotal && utilityTotal > 0) {
      misappliedPayments.push(
        "Payments may have been applied to utilities before rent was fully paid"
      );
    }

    // If rent is fully paid but there are late fees that might be disputed
    if (totalPayments >= rentTotal && lateFeeTotal > 0) {
      const rentOverpayment = totalPayments - rentTotal;
      if (rentOverpayment < lateFeeTotal) {
        misappliedPayments.push(
          "Late fees may have been applied before rent was fully satisfied"
        );
      }
    }
  }

  // Check if any payments appear to have been applied out of state order
  const order = rule.paymentApplicationOrder.map((o) => o.toLowerCase());
  const chargeTypes = Object.keys(chargeByType);

  for (let i = 0; i < order.length; i++) {
    for (let j = i + 1; j < order.length; j++) {
      const higherPriority = order[i];
      const lowerPriority = order[j];

      if (
        chargeByType[higherPriority] > 0 &&
        chargeByType[lowerPriority] > 0 &&
        totalPayments >= chargeByType[lowerPriority] &&
        totalPayments < chargeByType[higherPriority] + chargeByType[lowerPriority]
      ) {
        misappliedPayments.push(
          `Payment applied to ${lowerPriority} before ${higherPriority} was fully satisfied`
        );
      }
    }
  }

  return {
    illegalFeesFound,
    misappliedPayments: Array.from(new Set(misappliedPayments)),
    balanceAccordingToTenant,
    balanceAccordingToLandlord,
    difference,
    paymentApplicationOrder: rule.paymentApplicationOrder,
    lateFeeRules: rule.lateFeeRules,
    partialPaymentRules: rule.partialPaymentRules,
    statutes: rule.statutes,
    notes: rule.notes,
  };
}
