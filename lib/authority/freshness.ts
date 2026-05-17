import type { LegalRuleBlock } from "@/data/authority/schema";

export type AuthorityBundle = Record<string, Record<string, LegalRuleBlock>>;

export interface RuleFreshnessResult {
  isExpired: boolean;
  isStale: boolean;
  missingNextYear: boolean;
  warnings: string[];
}

export interface FreshnessReport {
  topic: string;
  jurisdiction: string;
  freshness: RuleFreshnessResult;
}

function getExpirationDate(rule: LegalRuleBlock): Date {
  if (rule.expiresOn) {
    return new Date(rule.expiresOn);
  }
  if (!rule.version.effectiveDate) {
    // Placeholder rules without an effective date never expire
    return new Date("2099-12-31");
  }
  const d = new Date(rule.version.effectiveDate);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

function getLastUpdatedDate(rule: LegalRuleBlock): Date {
  const raw = rule.lastUpdated ?? rule.version.effectiveDate;
  if (!raw) {
    // Placeholder rules without dates are considered up-to-date
    return new Date();
  }
  return new Date(raw);
}

export function getRuleFreshness(rule: LegalRuleBlock): RuleFreshnessResult {
  const warnings: string[] = [];
  const today = new Date();
  const currentYear = today.getFullYear();

  const expirationDate = getExpirationDate(rule);
  const isExpired = expirationDate < today;

  if (isExpired) {
    warnings.push(
      `This rule expired on ${expirationDate.toISOString().split("T")[0]}.`
    );
  }

  const lastUpdatedDate = getLastUpdatedDate(rule);
  const daysSinceUpdate =
    (today.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60 * 24);
  const isStale = daysSinceUpdate > 365;

  if (isStale) {
    warnings.push(
      `This rule may be outdated. Last updated ${lastUpdatedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}.`
    );
  }

  const year =
    typeof rule.data.year === "number" ? rule.data.year : undefined;
  const missingNextYear = year !== undefined && currentYear > year;

  if (missingNextYear) {
    warnings.push(
      `No rule found for ${currentYear}. The latest available rule is for ${year}.`
    );
  }

  return { isExpired, isStale, missingNextYear, warnings };
}

export function checkAllRules(bundle: AuthorityBundle): FreshnessReport[] {
  const reports: FreshnessReport[] = [];

  for (const [topic, jurisdictions] of Object.entries(bundle)) {
    for (const [jurisdiction, rule] of Object.entries(jurisdictions)) {
      const freshness = getRuleFreshness(rule);
      reports.push({ topic, jurisdiction, freshness });
    }
  }

  return reports;
}
