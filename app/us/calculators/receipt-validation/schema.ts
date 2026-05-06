export interface ReceiptValidationRule {
  requiredFields: string[];
  digitalAllowed: boolean;
  signatureRequired: boolean;
  itemizationRequired: boolean;
  statutes: string[];
  notes: string[];
}

export interface ReceiptValidationResult {
  requiredFields: string[];
  missingFields: string[];
  digitalAllowed: boolean;
  signatureRequired: boolean;
  itemizationRequired: boolean;
  statutes: string[];
  notes: string[];
}

export type ReceiptValidationDataset = Record<string, ReceiptValidationRule>;
