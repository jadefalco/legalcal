export interface DuplicateReceiptRule {
  tenantRightToCopy: boolean;
  landlordMustProvide: boolean;
  timeframe: string;
  allowedFee: number | null;
  requiredFields: string[];
  statutes: string[];
  notes: string[];
}

export interface DuplicateReceiptResult {
  tenantRightToCopy: boolean;
  landlordMustProvide: boolean;
  timeframe: string;
  allowedFee: number | null;
  requiredFields: string[];
  statutes: string[];
  notes: string[];
}

export type DuplicateReceiptDataset = Record<string, DuplicateReceiptRule>;
