/**
 * Type definitions for US rent increase rules dataset.
 *
 * Source: app/data/us/rentIncreaseRules.ts
 */

export interface RentIncreaseRule {
  /** Two-letter state code (e.g., "AL", "CA") */
  stateCode: string;

  /** Full state name (e.g., "Alabama", "California") */
  name: string;

  /** Notice period required before rent increase (days or descriptive string) */
  noticePeriodDays: number | string;

  /** Whether the state or any local jurisdiction has rent control */
  rentControl: boolean | string;

  /** Additional requirements beyond notice period */
  additionalRequirements: string;

  /** Exceptions to the general rule */
  exceptions: string;

  /** Legal statute citations */
  citations: string[];
}

/** Map of lowercase state slug → rent increase rules */
export type RentIncreaseRulesMap = Record<string, RentIncreaseRule>;
