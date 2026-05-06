export interface RepairDeductRule {
  allowed: boolean;
  maxDeduction: number | null;
  frequencyLimit: string | null;
  noticeRequirementDays: number;
  emergencyAllowed: boolean;
  statutes: string[];
  notes: string[];
}

export interface RepairDeductResult {
  allowed: boolean;
  maxDeduction: number | null;
  frequencyLimit: string | null;
  noticeRequirementDays: number;
  emergencyAllowed: boolean;
  earliestRepairDate: string;
  statutes: string[];
  notes: string[];
}

export type RepairDeductDataset = Record<string, RepairDeductRule>;
