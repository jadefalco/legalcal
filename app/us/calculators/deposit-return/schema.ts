export interface DepositReturnRule {
  returnDeadline: number | { standard: number; special: string[] };
  interestRequired: boolean;
  interestRate: number | null;
  penalties: string[];
  allowableDeductions: string[];
  statutes: string[];
  notes: string[];
}

export type DepositReturnDataset = Record<string, DepositReturnRule>;

export interface DepositReturnResult {
  deadlineDays: number;
  deadlineDate: string;
  interestRequired: boolean;
  interestRate: number | null;
  penalties: string[];
  allowableDeductions: string[];
  statutes: string[];
  notes: string[];
  specialRules: string[];
}
