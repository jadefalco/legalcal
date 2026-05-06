export interface LeaseTerminationRule {
  noticePeriod: number | { fixed: number; special: string[] };
  allowedReasons: string[];
  penalties: string[];
  statutes: string[];
  notes: string[];
}

export type LeaseTerminationDataset = Record<string, LeaseTerminationRule>;

export interface LeaseTerminationResult {
  noticeRequired: number;
  deadlineDate: string;
  specialRules: string[];
  allowedReasons: string[];
  penalties: string[];
  statutes: string[];
  notes: string[];
}
