/**
 * Unified backend state data loader.
 *
 * Centralizes loading of eviction rules, security deposit rules, statutes,
 * theme, calculators, and derived quick facts for a given US state code.
 *
 * Usage:
 *   import { getStateData } from "@/app/lib/getStateData";
 *   const data = getStateData("al");
 *   if (!data) return notFound();
 */

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { usStatutes } from "@/app/config/usStatutes";
import { calculators } from "@/app/config/calculators";
import { getTheme } from "@/app/theme";
import type { EvictionRule } from "@/app/types/EvictionRules";
import type { SecurityDepositRule } from "@/app/types/SecurityDepositRules";
import type { Theme } from "@/app/types/Theme";
import type { Calculator } from "@/app/types/Calculators";

export interface QuickFacts {
  /** Notice period for non‑payment of rent (days or description) */
  noticeForNonpayment?: number | string;
  /** Notice period for lease violations (days or description) */
  noticeForLeaseViolation?: number | string;
  /** Deadline to file an answer after being served (days or description) */
  answerDeadline?: number | string;
  /** Maximum security deposit allowed */
  maxDeposit?: string;
  /** Deadline to return the deposit (days or description) */
  returnDeadline?: number | string;
}

export interface Statute {
  citation: string;
  title: string;
  url: string;
  summary: string;
}

export interface StateData {
  /** Lowercase state code */
  stateCode: string;
  /** Full state name */
  stateName: string;
  /** Theme for the state */
  theme: Theme;
  /** Eviction rules, if available */
  eviction: EvictionRule | undefined;
  /** Security deposit rules, if available */
  deposit: SecurityDepositRule | undefined;
  /** Relevant statutes, if available */
  statutes: Statute[] | undefined;
  /** All available calculators */
  calculators: Calculator[];
  /** Derived quick facts from eviction + deposit data */
  quickFacts: QuickFacts;
}

/**
 * Load and compose all data for a US state page.
 *
 * @param rawStateCode — any case state code (e.g. "AL", "al")
 * @returns StateData object, or null if the state has no eviction or deposit data
 */
export function getStateData(rawStateCode: string): StateData | null {
  const stateCode = rawStateCode.toLowerCase();

  const eviction = evictionRules[stateCode];
  const deposit = securityDepositRules[stateCode];

  // If we have no data for this state at all, return null so the caller
  // can invoke notFound().
  if (!eviction && !deposit) {
    return null;
  }

  const stateName = eviction?.name || deposit?.name || stateCode.toUpperCase();
  const rawStatutes = usStatutes[stateCode as keyof typeof usStatutes];
  const statutes: Statute[] | undefined = rawStatutes
    ? rawStatutes.map((s) => ({ ...s }))
    : undefined;
  const theme = getTheme("us", stateCode);

  const quickFacts: QuickFacts = {
    ...(eviction
      ? {
          noticeForNonpayment: eviction.noticeForNonpayment,
          noticeForLeaseViolation: eviction.noticeForLeaseViolation,
          answerDeadline: eviction.answerDeadline,
        }
      : {}),
    ...(deposit
      ? {
          maxDeposit: deposit.maxDeposit,
          returnDeadline: deposit.returnDeadline,
        }
      : {}),
  };

  return {
    stateCode,
    stateName,
    theme,
    eviction,
    deposit,
    statutes,
    calculators,
    quickFacts,
  };
}
