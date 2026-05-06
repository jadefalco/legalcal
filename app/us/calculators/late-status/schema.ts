export interface LateStatusRule {
  gracePeriodDays: number;
  weekendExtension: boolean;
  holidayExtension: boolean;
  lateFeeStartAfterGrace: boolean;
  statutes: string[];
  notes: string[];
}

export interface LateStatusResult {
  dueDate: string;
  adjustedDueDate: string;
  gracePeriodEnds: string;
  isLateToday: boolean;
  lateFeesAllowedToday: boolean;
  weekendExtension: boolean;
  holidayExtension: boolean;
  statutes: string[];
  notes: string[];
}

export type LateStatusDataset = Record<string, LateStatusRule>;
