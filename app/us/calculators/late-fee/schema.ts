export interface LateFeeRule {
  maxLateFee: number | null;
  dailyLateFee: number | null;
  gracePeriodDays: number;
  percentageCap: number | null;
  statutes: string[];
  notes: string[];
}

export interface LateFeeResult {
  dueDate: string;
  gracePeriodEnds: string;
  allowedLateFee: number | null;
  dailyLateFee: number | null;
  percentageCap: number | null;
  statutes: string[];
  notes: string[];
}

export type LateFeeDataset = Record<string, LateFeeRule>;
