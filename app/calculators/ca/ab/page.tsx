import Link from "next/link";

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
  DocumentTextIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ArrowRightIcon,
  UserMinusIcon,
  BellAlertIcon,
  ClockIcon,
  StarIcon,
  SunIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const abCalculators = [
  { slug: "termination-pay", name: "Termination Pay Calculator", description: "Calculate Alberta termination pay entitlements based on length of service.", icon: UserMinusIcon },
  { slug: "termination-notice-pay", name: "Termination Notice Pay Calculator", description: "Determine Alberta termination notice period requirements.", icon: BellAlertIcon },
  { slug: "overtime", name: "Overtime Pay Calculator", description: "Calculate daily and weekly overtime pay under Alberta law.", icon: ClockIcon },
  { slug: "general-holiday", name: "General Holiday Pay Calculator", description: "Calculate general holiday pay eligibility and entitlements in Alberta.", icon: StarIcon },
  { slug: "vacation-pay", name: "Vacation Pay Calculator", description: "Calculate Alberta vacation pay and days entitlement.", icon: SunIcon },
  { slug: "minimum-wage", name: "Minimum Wage Calculator", description: "Check if a wage meets the current Alberta minimum wage requirement.", icon: CurrencyDollarIcon },
  { slug: "average-daily-wage", name: "Average Daily Wage Calculator", description: "Calculate average daily wage for Alberta employment claims.", icon: ChartBarIcon },
  { slug: "maternity-parental-leave", name: "Maternity & Parental Leave Calculator", description: "Calculate Alberta leave entitlements and estimate EI benefits.", icon: HeartIcon },
];

const theme = getTheme("ca", "ab");

function getRuleSummary(slug: string): string | null {
  const rule = getRuleFromBundle("ab", slug);
  if (!rule) return null;
  const data = rule.data as Record<string, unknown>;

  switch (slug) {
    case "termination-pay":
      return `Up to 8 weeks based on years of service.`;
    case "termination-notice-pay":
      return `1–8 weeks written notice required based on service.`;
    case "overtime":
      return `1.5x after 8h, 2x after 12h daily. 1.5x after 44h weekly.`;
    case "general-holiday":
      return `Must work before/after holiday. Average daily wage applies.`;
    case "vacation-pay":
      return `4% (<5 yrs), 6% (5+ yrs). 10–15 days.`;
    case "minimum-wage":
      return `Current: $${data.generalMinimumWage ?? 15.0}/hr general minimum.`;
    case "average-daily-wage":
      return `Total wages ÷ 20 (or days worked) over 4 weeks.`;
    case "maternity-parental-leave":
      return `16 weeks maternity + up to 62 weeks parental (AB ESA).`;
    default:
      return null;
  }
}

function getApplicableTemplates(templates: DocumentTemplate[]): DocumentTemplate[] {
  return templates.filter((t) => {
    if (!t.jurisdictionScopes || t.jurisdictionScopes.length === 0) return true;
    return t.jurisdictionScopes.some((s) => s.toLowerCase() === "ca-ab" || s.toLowerCase() === "ab");
  });
}

export async function generateMetadata() {
  return {
    title: "Alberta Legal Calculators | LegalCals",
    description: "Browse province-specific legal calculators for Alberta. Calculate termination pay, overtime, general holiday pay, vacation pay, minimum wage, and more.",
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
          title="Legal Calculators for Alberta"
          description="Browse jurisdiction-specific calculators, rule summaries, and document templates for Alberta."
          icon={MapIcon}
          theme={theme}
        />

        <div>
          <Link
            href="/ca/provinces"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            All Provinces
          </Link>
        </div>

        <section className="space-y-6">
          <StateSectionHeader
            title="Available Calculators"
            description="Select a calculator to run it with Alberta-specific rules."
            icon={CalculatorIcon}
            theme={theme}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {abCalculators.map((calc) => {
              const Icon = calc.icon || CalculatorIcon;
              const summary = getRuleSummary(calc.slug);

              return (
                <Link key={calc.slug} href={`/calculators/ca/ab/${calc.slug}`}>
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
              description="Auto-generate Alberta-specific legal documents."
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
            description="Add any calculator to your site with a single script tag."
            icon={CodeBracketIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Paste this snippet into your HTML to embed an Alberta calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="ab-termination-pay"
  data-country="ca"
  data-province="ab"
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
            description="Query Alberta rules programmatically."
            icon={CommandLineIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Every calculator is backed by our authority API. Retrieve raw rule data, citations, and version history for Alberta.
            </p>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Endpoint</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`GET /api/authority/ca/ab/{topic}`}</code>
                </pre>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">cURL Example</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/ab/termination-pay`}</code>
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
            <p className="text-sm text-slate-700 leading-relaxed">
              Need more details on Alberta employment standards? Visit the{" "}
              <Link href="/ca/provinces/ab" className="underline font-medium" style={{ color: theme.colors.primary }}>
                Alberta Province Hub
              </Link>{" "}
              for comprehensive rule summaries, statutes, and citations.
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
