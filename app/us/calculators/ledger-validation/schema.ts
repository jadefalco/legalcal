export interface LedgerValidationRule {
  paymentApplicationOrder: string[];
  illegalFees: string[];
  lateFeeRules: string;
  partialPaymentRules: string;
  statutes: string[];
  notes: string[];
}

export interface PaymentEntry {
  date: string;
  amount: number;
}

export interface ChargeEntry {
  date: string;
  type: string;
  amount: number;
}

export interface LedgerValidationResult {
  illegalFeesFound: string[];
  misappliedPayments: string[];
  balanceAccordingToTenant: number;
  balanceAccordingToLandlord: number;
  difference: number;
  paymentApplicationOrder: string[];
  lateFeeRules: string;
  partialPaymentRules: string;
  statutes: string[];
  notes: string[];
}

export type LedgerValidationDataset = Record<string, LedgerValidationRule>;
