export interface PaymentMethodsRule {
  mustAcceptCash: boolean;
  mustAcceptCheck: boolean;
  mustAcceptMoneyOrder: boolean;
  canRequireOnlineOnly: boolean;
  canChargeProcessingFee: boolean;
  prohibitedMethods: string[];
  requiredAlternatives: string[];
  statutes: string[];
  notes: string[];
}

export interface PaymentMethodsResult {
  mustAcceptCash: boolean;
  mustAcceptCheck: boolean;
  mustAcceptMoneyOrder: boolean;
  canRequireOnlineOnly: boolean;
  canChargeProcessingFee: boolean;
  prohibitedMethods: string[];
  requiredAlternatives: string[];
  statutes: string[];
  notes: string[];
}

export type PaymentMethodsDataset = Record<string, PaymentMethodsRule>;
