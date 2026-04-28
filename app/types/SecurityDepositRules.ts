/**
 * Type definitions for US security-deposit rules dataset.
 *
 * Source: app/data/us/securityDepositRules.js
 */

export interface SecurityDepositRule {
  /** Two-letter state code (e.g., "AL", "CA") */
  stateCode: string;

  /** Full state name (e.g., "Alabama", "California") */
  name: string;

  /** Maximum deposit allowed (descriptive string) */
  maxDeposit: string;

  /** Return deadline in days or descriptive string */
  returnDeadline: number | string;

  /** Whether an itemized statement of deductions is required */
  itemizedStatementRequired: boolean;

  /** Whether interest on the deposit is required */
  interestRequired: boolean;

  /** Rules around pet deposits */
  petDepositRules: string;

  /** Description of allowed deductions */
  allowedDeductions: string;

  /** Legal statute citations */
  citations: string[];
}

/** Map of lowercase state slug → security-deposit rules */
export type SecurityDepositRulesMap = Record<string, SecurityDepositRule>;
