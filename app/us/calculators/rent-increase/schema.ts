export interface RentIncreaseRule {
  noticeDays: number | { standard: number; special: string[] };
  maxIncreasePercent: number | null;
  rentControl: boolean;
  frequencyLimit: string | null;
  statutes: string[];
  notes: string[];
}

export interface RentIncreaseResult {
  noticeDays: number;
  effectiveDate: string;
  specialRules: string[];
  maxIncreasePercent: number | null;
  rentControl: boolean;
  frequencyLimit: string | null;
  statutes: string[];
  notes: string[];
}

export type RentIncreaseDataset = Record<string, RentIncreaseRule>;
