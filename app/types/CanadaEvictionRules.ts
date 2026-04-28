/**
 * Type definitions for Canada eviction rules dataset.
 *
 * Source: app/data/ca/evictionRules.js
 */

export interface CanadaEvictionRule {
  /** Two-letter province/territory code (e.g., "AB", "ON") */
  provinceCode: string;

  /** Full province or territory name (e.g., "Alberta", "Ontario") */
  name: string;

  /** Notice period for nonpayment of rent (days or descriptive string) */
  noticeForNonpayment: number | string;

  /** Notice period for lease violation (days or descriptive string) */
  noticeForLeaseViolation: number | string;

  /** When the landlord is permitted to file with the tribunal or court */
  courtFilingTime: string;

  /** Tenant answer or objection deadline (days or descriptive string) */
  answerDeadline: number | string;

  /** Typical hearing timeline description */
  hearingTimeline: string;

  /** Rules around physical eviction / lockout enforcement */
  lockoutAllowedAfter: string;

  /** Legal statute citations */
  citations: string[];
}

/** Map of lowercase province/territory slug → eviction rules */
export type CanadaEvictionRulesMap = Record<string, CanadaEvictionRule>;
