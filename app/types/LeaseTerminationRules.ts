/**
 * Type definitions for US lease termination rules dataset.
 *
 * Source: app/data/us/leaseTerminationRules.js
 */

export interface LeaseTerminationRule {
  /** Two-letter state code (e.g., "AL", "CA") */
  stateCode: string;

  /** Full state name (e.g., "Alabama", "California") */
  name: string;

  /** Notice period required to terminate a month-to-month tenancy (days or descriptive string) */
  monthToMonthNoticeDays: number | string;

  /** Rules for early termination of a fixed-term lease */
  fixedTermEarlyTerminationRules: string;

  /** Domestic violence early termination protections, if any */
  domesticViolenceProtections: string | null;

  /** Additional requirements beyond the basic notice period */
  additionalRequirements: string | null;

  /** Exceptions to the general rule */
  exceptions: string | null;

  /** Legal statute citations */
  citations: string[];
}

/** Map of lowercase state slug → lease termination rules */
export type LeaseTerminationRulesMap = Record<string, LeaseTerminationRule>;
