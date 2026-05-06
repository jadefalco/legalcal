export interface EntryNoticeRule {
  noticeHours: number | { standard: number; special: string[] };
  allowedReasons: string[];
  emergencyAllowed: boolean;
  weekendRules: string[];
  statutes: string[];
  notes: string[];
}

export interface EntryNoticeResult {
  noticeHours: number;
  earliestEntryDateTime: string;
  specialRules: string[];
  allowedReasons: string[];
  emergencyAllowed: boolean;
  weekendRules: string[];
  statutes: string[];
  notes: string[];
}

export type EntryNoticeDataset = Record<string, EntryNoticeRule>;
