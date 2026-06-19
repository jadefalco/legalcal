import Link from "next/link";
import { notFound } from "next/navigation";

import { getTheme } from "@/app/theme";
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
  HeartIcon,
  UsersIcon,
  ShieldExclamationIcon,
  BriefcaseIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ClockIcon,
  StarIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ArrowRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const federalCalculators = [
  { slug: "ei-maternity", name: "EI Maternity Benefits Calculator", description: "Calculate Employment Insurance maternity benefit entitlements under federal law.", icon: HeartIcon },
  { slug: "ei-parental", name: "EI Parental Benefits Calculator", description: "Calculate Employment Insurance parental benefit entitlements under federal law.", icon: UsersIcon },
  { slug: "ei-sickness", name: "EI Sickness Benefits Calculator", description: "Calculate Employment Insurance sickness benefit entitlements under federal law.", icon: ShieldExclamationIcon },
  { slug: "ei-regular", name: "EI Regular Benefits Calculator", description: "Calculate Employment Insurance regular benefit entitlements under federal law.", icon: BriefcaseIcon },
  { slug: "cpp-retirement", name: "CPP Retirement Pension Calculator", description: "Estimate Canada Pension Plan retirement pension benefits under federal law.", icon: BanknotesIcon },
  { slug: "cpp-disability", name: "CPP Disability Benefits Calculator", description: "Estimate Canada Pension Plan disability benefit entitlements under federal law.", icon: DocumentTextIcon },
  { slug: "clc-overtime", name: "Canada Labour Code Overtime Calculator", description: "Calculate overtime pay for federally regulated industries under the Canada Labour Code.", icon: ClockIcon },
  { slug: "clc-holiday-pay", name: "Canada Labour Code General Holiday Pay Calculator", description: "Calculate general holiday pay for federally regulated industries under the Canada Labour Code.", icon: StarIcon },
];

const theme = getTheme("ca", "federal");

function getRuleSummary(slug: string): string | null {
  const rule = getRuleFromBundle("federal", slug);
  if (!rule) return null;
  const data = rule.data as Record<string, unknown>;

  switch (slug) {
    case "ei-maternity":
      return `${Math.round((data.benefitRate as number ?? 0.55) * 100)}% of avg weekly earnings, max ${data.maxWeeks as number ?? 15} weeks.`;
    case "ei-parental":
      return `Standard: ${Math.round((data.standardBenefitRate as number ?? 0.55) * 100)}% up to ${data.maxWeeksStandard as number ?? 40}w. Extended: ${Math.round((data.extendedBenefitRate as number ?? 0.33) * 100)}% up to ${data.maxWeeksExtended as number ?? 69}w.`;
    case "ei-sickness":
      return `${Math.round((data.benefitRate as number ?? 0.55) * 100)}% of avg weekly earnings, max ${data.maxWeeks as number ?? 26} weeks.`;
    case "ei-regular":
      return `${Math.round((data.benefitRate as number ?? 0.55) * 100)}% of avg weekly earnings. Duration depends on regional unemployment.`;
    case "cpp-retirement":
      return `Max at 65: $${data.maxMonthlyAt65 as number ?? 1364.60}/month. Adjustable 60–70.`;
    case "cpp-disability":
      return `Flat $${data.flatPortion as number ?? 583.32} + earnings-related. Max $${data.maxMonthly as number ?? 1606.78}/month.`;
    case "clc-overtime":
      return `${data.overtimeRate as number ?? 1.5}x after ${data.dailyThreshold as number ?? 8}h/day or ${data.weeklyThreshold as number ?? 40}h/week.`;
    case "clc-holiday-pay":
      return `${data.numGeneralHolidays as number ?? 9} general holidays. ${data.premiumRate as number ?? 1.5}x if worked.`;
    default:
      return null;
  }
}

function getApplicableTemplates(templates: DocumentTemplate[]): DocumentTemplate[] {
  return templates.filter((t) => {
    if (!t.jurisdictionScopes || t.jurisdictionScopes.length === 0) return true;
    return t.jurisdictionScopes.some(
      (s) => s.toLowerCase() === "ca-federal" || s.toLowerCase() === "federal"
    );
  });
}

export async function generateMetadata() {
  return {
    title: "Federal Legal Calculators | LegalCals",
    description: "Browse federal calculators for Canada. Calculate EI benefits, CPP entitlements, and Canada Labour Code overtime and holiday pay.",
  };
}

export default async function Page() {
  let templates: DocumentTemplate[] = [];
  try {
    const allTemplates = await listDocumentTemplates();
    templates = getApplicableTemplates(allTemplates);
  } catch {
    templates = [];
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
        <StateSectionHeader
          title="Federal Legal Calculators"
          description="Browse federal calculators for Canada. Calculate EI benefits, CPP entitlements, and Canada Labour Code overtime and holiday pay."
          icon={MapIcon}
          theme={theme}
        />

        <div>
          <Link
            href="/ca"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            All Provinces
          </Link>
        </div>

        <section className="space-y-6">
          <StateSectionHeader
            title="Available Federal Calculators"
            description="Select a calculator to run it with federal jurisdiction rules."
            icon={CalculatorIcon}
            theme={theme}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {federalCalculators.map((calc) => {
              const Icon = calc.icon || CalculatorIcon;
              const summary = getRuleSummary(calc.slug);

              return (
                <Link key={calc.slug} href={`/calculators/ca/federal/${calc.slug}`}>
                  <LCCard
                    theme={theme}
                    className="h-full hover:border-blue-300 transition-colors space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                      <h3 className="font-semibold text-slate-800 text-sm">{calc.name}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{calc.description}</p>
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

        {templates.length > 0 && (
          <section className="space-y-6">
            <StateSectionHeader
              title="Related Document Templates"
              description="Auto-generate federal jurisdiction legal documents."
              icon={DocumentTextIcon}
              theme={theme}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((tmpl) => (
                <Link key={tmpl.slug} href={`/documents/${tmpl.slug}`}>
                  <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
                    <h3 className="font-semibold text-slate-800 text-sm">{tmpl.name}</h3>
                    {tmpl.description && <p className="text-xs text-slate-600 leading-relaxed">{tmpl.description}</p>}
                    <span className="inline-block text-xs font-medium" style={{ color: theme.colors.primary }}>
                      Generate →
                    </span>
                  </LCCard>
                </Link>
              ))}
            </div>
          </section>
        )}

        {templates.length > 0 && <StateContentDivider theme={theme} />}

        <section className="space-y-6">
          <StateSectionHeader
            title="Embed on Your Website"
            description="Add any federal calculator to your site with a single script tag."
            icon={CodeBracketIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Paste this snippet into your HTML to embed a federal calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="federal-ei-maternity"
  data-country="ca"
  data-province="federal"
></div>`}</code>
              </pre>
            </div>
            <p className="text-xs text-slate-500">
              Replace <code className="bg-slate-100 px-1 py-0.5 rounded">data-legalcals-calculator</code> with any slug from the list above. See the{" "}
              <Link href="/developers/widgets" className="underline font-medium" style={{ color: theme.colors.primary }}>
                Widget Developer Guide
              </Link>{" "}
              for more options.
            </p>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        <section className="space-y-6">
          <StateSectionHeader
            title="API Access"
            description="Query federal rules programmatically."
            icon={CommandLineIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Every calculator is backed by our authority API. Retrieve raw rule data, citations, and version history for federal jurisdiction.
            </p>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Endpoint</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`GET /api/authority/ca/federal/{topic}`}</code>
                </pre>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">cURL Example</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/federal/ei-maternity`}</code>
                </pre>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/developers">
                <LCButton variant="ghost" theme={theme}>API Docs</LCButton>
              </Link>
              <Link href="/developers/signup">
                <LCButton variant="primary" theme={theme}>Get API Key</LCButton>
              </Link>
            </div>
          </LCCard>
        </section>

        <StateContentDivider theme={theme} />

        <section>
          <LCCard theme={theme} className="space-y-3">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
              <h3 className="font-semibold text-slate-800 text-sm">About Federal Calculators</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              These calculators apply to federal jurisdiction under Canadian law, including Employment Insurance (EI), Canada Pension Plan (CPP), and the Canada Labour Code. For provincial calculators, visit the individual province hubs.
            </p>
          </LCCard>
        </section>

        <footer className="border-t pt-8 text-center text-sm text-slate-500">
          <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
          <p className="mt-2">© {new Date().getFullYear()} LegalCals. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
