export interface SecurityDepositRule {
  maxMonthsRent: number | null;
  separatePetDepositAllowed: boolean;
  nonrefundableFeesAllowed: boolean;
  returnDeadlineDays: number;
  itemizedStatementRequired: boolean;
  penaltyMultiple: number | null;
  statutes: string[];
  notes: string[];
}

export interface SecurityDepositResult {
  maxDepositAmount: number | null;
  maxMonthsRent: number | null;
  separatePetDepositAllowed: boolean;
  nonrefundableFeesAllowed: boolean;
  moveOutDate: string;
  returnDeadlineDate: string;
  itemizedStatementRequired: boolean;
  penaltyMultiple: number | null;
  statutes: string[];
  notes: string[];
}

export type SecurityDepositDataset = Record<string, SecurityDepositRule>;
