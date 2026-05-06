export interface EvictionTimelineRule {
  noticePeriod: number | { standard: number; special: string[] };
  courtFilingDelay: number;
  hearingSchedulingDelay: number;
  sheriffLockoutDelay: number;
  statutes: string[];
  notes: string[];
}

export type EvictionTimelineDataset = Record<string, EvictionTimelineRule>;

export interface EvictionTimelineResult {
  noticePeriod: number;
  filingDate: string;
  hearingDate: string;
  lockoutDate: string;
  specialRules: string[];
  statutes: string[];
  notes: string[];
}
