export interface WithholdRentRule {
  allowed: boolean;
  escrowRequired: boolean;
  noticeRequirementDays: number;
  severityThreshold: string;
  retaliationProtection: boolean;
  statutes: string[];
  notes: string[];
}

export interface WithholdRentResult {
  allowed: boolean;
  escrowRequired: boolean;
  noticeRequirementDays: number;
  earliestWithholdingDate: string;
  severityThreshold: string;
  retaliationProtection: boolean;
  statutes: string[];
  notes: string[];
}

export type WithholdRentDataset = Record<string, WithholdRentRule>;
