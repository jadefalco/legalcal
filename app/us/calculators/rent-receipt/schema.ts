export interface RentReceiptRule {
  required: boolean;
  requiredWhenCash: boolean;
  requiredWhenRequested: boolean;
  deliveryMethods: string[];
  timeframe: string;
  statutes: string[];
  notes: string[];
}

export interface RentReceiptResult {
  required: boolean;
  requiredWhenCash: boolean;
  requiredWhenRequested: boolean;
  deliveryMethods: string[];
  timeframe: string;
  statutes: string[];
  notes: string[];
}

export type RentReceiptDataset = Record<string, RentReceiptRule>;
