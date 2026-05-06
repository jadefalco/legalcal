import { notFound } from "next/navigation";
import Link from "next/link";

import { calculators } from "@/app/config/calculators";
import { usStates } from "@/app/config/usStates";
import { caProvinces } from "@/app/config/caProvinces";
import { getTheme, defaultTheme } from "@/app/theme";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { listDocumentTemplates } from "@/lib/authority/db";
import type { DocumentTemplate } from "@/lib/authority/db";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";

import {
  CalculatorIcon,
  MapIcon,
  ScaleIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
  WrenchIcon,
  ShieldExclamationIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
  HomeIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ComponentType<any>> = {
  "eviction-timeline": ScaleIcon,
  "eviction-notice": DocumentTextIcon,
  "notice-period": DocumentTextIcon,
  "security-deposit-return": BanknotesIcon,
  "rent-increase-limits": ChartBarIcon,
  "final-paycheck-deadline": DocumentTextIcon,
  "overtime-calculator": CalculatorIcon,
  "small-claims-eligibility": ScaleIcon,
  "deposit-return": BanknotesIcon,
  "deposit-demand": DocumentTextIcon,
  "itemized-deductions": DocumentTextIcon,
  "entry-notice": DocumentTextIcon,
  "late-fee": BanknotesIcon,
  "repair-deduct": WrenchIcon,
  "withhold-rent": ShieldExclamationIcon,
  "rent-receipt": DocumentTextIcon,
  "duplicate-receipt": DocumentDuplicateIcon,
  "payment-methods": CreditCardIcon,
  "receipt-validation": ClipboardDocumentCheckIcon,
  "late-status": ClockIcon,
  "payment-proof": ShieldCheckIcon,
  "ledger-validation": DocumentChartBarIcon,
  "security-deposit": HomeIcon,
  "rent-increase": BanknotesIcon,
  "lease-termination": DocumentTextIcon,
};

/** Calculators known to have Canada-specific implementations. */
const caCalculatorSlugs = new Set([
  "eviction-timeline",
  "final-paycheck-deadline",
  "notice-period",
  "overtime-calculator",
  "rent-increase-limits",
  "security-deposit-return",
  "small-claims-eligibility",
]);

function getJurisdictionName(country: string, code: string): string | undefined {
  if (country === "us") {
    return usStates[code as keyof typeof usStates]?.name;
  }
  if (country === "ca") {
    return caProvinces[code as keyof typeof caProvinces]?.name;
  }
  return undefined;
}

function filterCalculatorsForJurisdiction(
  country: string,
  stateCode: string
) {
  const all = [...calculators].sort((a, b) => a.name.localeCompare(b.name));

  if (country === "us") {
    // US: show calculators that have authority bundle data for this state.
    return all.filter((calc) => {
      const rule = getRuleFromBundle(stateCode, calc.slug);
      return rule !== null;
    });
  }

  if (country === "ca") {
    // Canada: only the subset with known province pages.
    return all.filter((calc) => caCalculatorSlugs.has(calc.slug));
  }

  return [];
}

function getRuleSummary(topic: string, stateCode: string): string | null {
  const rule = getRuleFromBundle(stateCode, topic);
  if (!rule) return null;

  const data = rule.data as Record<string, unknown>;

  switch (topic) {
    case "deposit-return":
    case "security-deposit": {
      const deadline = data.returnDeadline;
      if (typeof deadline === "number") {
        return `Security deposit must be returned within ${deadline} days.`;
      }
      if (typeof deadline === "object" && deadline !== null) {
        const std = (deadline as Record<string, unknown>).standard;
        if (typeof std === "number") {
          return `Security deposit must be returned within ${std} days (standard).`;
        }
      }
      return "Security deposit return rules apply.";
    }
    case "eviction-timeline": {
      const np = data.noticeForNonpayment;
      if (typeof np === "number") {
        return `${np}-day notice required for nonpayment of rent.`;
      }
      return "Eviction timelines vary by case type.";
    }
    case "lease-termination": {
      const notice = data.noticeRequired;
      if (typeof notice === "number") {
        return `${notice} days' notice required to terminate lease.`;
      }
      return "Lease termination notice rules apply.";
    }
    case "rent-increase": {
      const notice = data.noticePeriodDays;
      if (typeof notice === "number") {
        return `${notice} days' notice required for rent increases.`;
      }
      return "Rent increase notice rules apply.";
    }
    case "late-fee": {
      const limit = data.maxLateFeePercent ?? data.maxLateFeeAmount;
      if (typeof limit === "number") {
        return `Late fees are capped at ${limit}${data.maxLateFeePercent ? "%" : ""}.`;
      }
      return "Late fee limits apply.";
    }
    case "entry-notice": {
      const hours = data.noticeHours;
      if (typeof hours === "number") {
        return `${hours} hours' notice required before landlord entry.`;
      }
      return "Landlord entry notice rules apply.";
    }
    case "repair-deduct": {
      const allowed = data.allowed;
      if (typeof allowed === "boolean") {
        return allowed
          ? "Tenants may repair and deduct in qualifying situations."
          : "Repair-and-deduct is not permitted.";
      }
      return "Repair and deduct rules apply.";
    }
    case "withhold-rent": {
      const allowed = data.allowed;
      if (typeof allowed === "boolean") {
        return allowed
          ? "Tenants may withhold rent under certain conditions."
          : "Rent withholding is not permitted.";
      }
      return "Rent withholding rules apply.";
    }
    default:
      return null;
  }
}

function getApplicableTemplates(
  templates: DocumentTemplate[],
  country: string,
  stateCode: string
): DocumentTemplate[] {
  const jurisdictionKey = `${country}-${stateCode}`;
  return templates.filter((t) => {
    if (!t.jurisdictionScopes || t.jurisdictionScopes.length === 0) {
      return true;
    }
    return t.jurisdictionScopes.some(
      (scope) =>
        scope.toLowerCase() === jurisdictionKey ||
        scope.toLowerCase() === stateCode
    );
  });
}

export async function generateMetadata({
  params,
}: {
  params: { calculator: string; state: string };
}) {
  const country = params.calculator.toLowerCase();
  const stateCode = params.state.toLowerCase();
  const jurisdictionName = getJurisdictionName(country, stateCode);

  const title = jurisdictionName
    ? `${jurisdictionName} Legal Calculators | LegalCals`
    : `Legal Calculators | LegalCals`;

  const description = jurisdictionName
    ? `Browse state-specific legal calculators for ${jurisdictionName}. Calculate eviction timelines, notice periods, security deposit returns, rent increases, and more.`
    : `Browse legal calculators by jurisdiction.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/calculators/${country}/${stateCode}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { calculator: string; state: string };
}) {
  const country = params.calculator.toLowerCase();
  const stateCode = params.state.toLowerCase();

  const jurisdictionName = getJurisdictionName(country, stateCode);
  if (!jurisdictionName) {
    return notFound();
  }

  const theme = getTheme(country as "us" | "ca", stateCode) ?? defaultTheme;
  const filteredCalculators = filterCalculatorsForJurisdiction(country, stateCode);

  if (filteredCalculators.length === 0) {
    return notFound();
  }

  let templates: DocumentTemplate[] = [];
  try {
    const allTemplates = await listDocumentTemplates();
    templates = getApplicableTemplates(allTemplates, country, stateCode);
  } catch {
    templates = [];
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <StateSectionHeader
          title={`Legal Calculators for ${jurisdictionName}`}
          description={`Browse jurisdiction-specific calculators, rule summaries, and document templates for ${jurisdictionName}.`}
          icon={MapIcon}
          theme={theme}
        />

        {/* Back link */}
        <div>
          <Link
            href={country === "ca" ? "/ca/provinces" : "/us/states"}
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            {country === "ca" ? "All Provinces" : "All States"}
          </Link>
        </div>

        {/* Calculators Grid */}
        <section className="space-y-6">
          <StateSectionHeader
            title="Available Calculators"
            description="Select a calculator to run it with jurisdiction-specific rules."
            icon={CalculatorIcon}
            theme={theme}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCalculators.map((calc) => {
              const Icon = iconMap[calc.slug] || CalculatorIcon;
              const summary = getRuleSummary(calc.slug, stateCode);

              return (
                <Link
                  key={calc.slug}
                  href={`/calculators/${country}/${stateCode}/${calc.slug}`}
                >
                  <LCCard
                    theme={theme}
                    className="h-full hover:border-blue-300 transition-colors space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className="w-5 h-5"
                        style={{ color: theme.colors.primary }}
                      />
                      <h3 className="font-semibold text-slate-800 text-sm">
                        {calc.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {calc.description}
                    </p>
                    {summary && (
                      <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
                        {summary}
                      </p>
                    )}
                    <LCButton variant="primary" theme={theme} className="w-full">
                      Open Calculator
                    </LCButton>
                  </LCCard>
                </Link>
              );
            })}
          </div>
        </section>

        <StateContentDivider theme={theme} />

        {/* Document Templates */}
        {templates.length > 0 && (
          <section className="space-y-6">
            <StateSectionHeader
              title="Related Document Templates"
              description="Auto-generate jurisdiction-specific legal documents."
              icon={DocumentTextIcon}
              theme={theme}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((tmpl) => (
                <Link key={tmpl.slug} href={`/documents/${tmpl.slug}`}>
                  <LCCard
                    theme={theme}
                    className="h-full hover:border-blue-300 transition-colors space-y-2"
                  >
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {tmpl.name}
                    </h3>
                    {tmpl.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tmpl.description}
                      </p>
                    )}
                    <span
                      className="inline-block text-xs font-medium"
                      style={{ color: theme.colors.primary }}
                    >
                      Generate →
                    </span>
                  </LCCard>
                </Link>
              ))}
            </div>
          </section>
        )}

        {templates.length > 0 && <StateContentDivider theme={theme} />}

        {/* Embed Snippets */}
        <section className="space-y-6">
          <StateSectionHeader
            title="Embed on Your Website"
            description="Add any calculator to your site with a single script tag."
            icon={CodeBracketIcon}
            theme={theme}
          />

          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Paste this snippet into your HTML to embed a calculator for{" "}
              {jurisdictionName}:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="${filteredCalculators[0]?.slug ?? "eviction-timeline"}"
  data-state="${stateCode}"
></div>`}</code>
              </pre>
            </div>
            <p className="text-xs text-slate-500">
              Replace{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded">
                data-legalcals-calculator
              </code>{" "}
              with any slug from the list above. See the{" "}
              <Link
                href="/developers/widgets"
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                Widget Developer Guide
              </Link>{" "}
              for more options.
            </p>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        {/* API Examples */}
        <section className="space-y-6">
          <StateSectionHeader
            title="API Access"
            description="Query jurisdiction-specific rules programmatically."
            icon={CommandLineIcon}
            theme={theme}
          />

          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Every calculator is backed by our authority API. Retrieve raw rule
              data, citations, and version history for {jurisdictionName}.
            </p>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Endpoint</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`GET /api/authority/${country}/${stateCode}/{topic}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">
                cURL Example
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/${country}/${stateCode}/${filteredCalculators[0]?.slug ?? "eviction-timeline"}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">
                JavaScript (fetch)
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`const res = await fetch(
  "https://legalcals.com/api/authority/${country}/${stateCode}/${filteredCalculators[0]?.slug ?? "eviction-timeline"}",
  {
    headers: {
      "x-api-key": "lc_your_key_here",
    },
  }
);
const data = await res.json();
console.log(data.rule);`}</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/developers">
                <LCButton variant="ghost" theme={theme}>
                  API Docs
                </LCButton>
              </Link>
              <Link href="/developers/signup">
                <LCButton variant="primary" theme={theme}>
                  Get API Key
                </LCButton>
              </Link>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        {/* Footer CTA */}
        <section>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              Need more details on {jurisdictionName} landlord-tenant laws?
              Visit the{" "}
              <Link
                href={
                  country === "ca"
                    ? `/ca/provinces/${stateCode}`
                    : `/us/states/${stateCode}`
                }
                className="underline font-medium"
                style={{ color: theme.colors.primary }}
              >
                {country === "ca" ? "Province Hub" : "State Hub"}
              </Link>{" "}
              for comprehensive rule summaries, statutes, and citations.
            </p>
          </LCCard>
        </section>

        {/* Site Footer */}
        <footer className="border-t pt-8 text-center text-sm text-slate-500">
          <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
          <p className="mt-2">
            © {new Date().getFullYear()} LegalCals. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
