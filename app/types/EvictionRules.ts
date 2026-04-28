/**
 * Type definitions for US eviction rules dataset.
 *
 * Source: app/data/us/evictionRules.js
 */

export interface EvictionRule {
  /** Two-letter state code (e.g., "AL", "CA") */
  stateCode: string;

  /** Full state name (e.g., "Alabama", "California") */
  name: string;

  /** Notice period for nonpayment of rent (days or descriptive string) */
  noticeForNonpayment: number | string;

  /** Notice period for lease violation (days or descriptive string) */
  noticeForLeaseViolation: number | string;

  /** When the landlord is permitted to file in court */
  courtFilingTime: string;

  /** Tenant answer deadline (days or descriptive string) */
  answerDeadline: number | string;

  /** Typical hearing timeline description */
  hearingTimeline: string;

  /** Rules around physical eviction / lockout */
  lockoutAllowedAfter: string;

  /** Legal statute citations */
  citations: string[];
}

/** Map of lowercase state slug → eviction rules */
export type EvictionRulesMap = Record<string, EvictionRule>;
