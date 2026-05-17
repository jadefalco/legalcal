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
  ScaleIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
  WrenchIcon,
  HomeIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ArrowRightIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const bcCalculators = [
  { slug: "security-deposit", name: "Security Deposit Calculator", description: "Calculate BC security deposit limits and return deadlines.", icon: BanknotesIcon },
  { slug: "rent-increase", name: "Rent Increase Calculator", description: "Calculate allowed rent increases and notice periods in BC.", icon: ChartBarIcon },
  { slug: "entry-notice", name: "Entry Notice Calculator", description: "Determine required landlord entry notice in BC.", icon: DocumentTextIcon },
  { slug: "repair-request", name: "Repair Request Calculator", description: "Calculate repair timelines for urgent and non-urgent issues in BC.", icon: WrenchIcon },
  { slug: "deposit-return", name: "Deposit Return Deadline Calculator", description: "Calculate security deposit return deadlines for BC tenancies.", icon: BanknotesIcon },
  { slug: "condition-inspection", name: "Condition Inspection Checklist", description: "Review BC condition inspection requirements and timelines.", icon: ClipboardDocumentCheckIcon },
  { slug: "ending-tenancy", name: "Ending Tenancy Calculator", description: "Calculate notice periods for ending a BC tenancy.", icon: ClockIcon },
];

const theme = getTheme("ca", "bc");

function getRuleSummary(slug: string): string | null {
  const rule = getRuleFromBundle("bc", slug);
  if (!rule) return null;
  const data = rule.data as Record<string, unknown>;

  switch (slug) {
    case "security-deposit":
      return `Max deposit: ${data.maxDepositMonths ?? 0.5}x monthly rent. Return within ${data.returnDeadlineDays ?? 15} days.`;
    case "rent-increase":
      return `Cap: ${data.rentIncreaseLimit ?? 3.5}%. Notice: ${data.noticePeriodDays ?? 90} days.`;
    case "entry-notice":
      return `${data.noticeHours ?? 24} hours' written notice required.`;
    case "repair-request":
      return `Urgent: ${data.repairUrgentTimelineHours ?? 24}h. Non-urgent: ${data.repairNonUrgentTimelineDays ?? 7} days.`;
    case "deposit-return":
      return `Deposit must be returned within ${data.returnDeadlineDays ?? 15} days.`;
    case "condition-inspection":
      return `Inspection required at move-in and move-out.`;
    case "ending-tenancy":
      return `Notice period: ${data.tenantNoticePeriodDays ?? 30} days (tenant), ${data.landlordNoticePeriodDays ?? 30} days (landlord).`;
    default:
      return null;
  }
}

function getApplicableTemplates(templates: DocumentTemplate[]): DocumentTemplate[] {
  return templates.filter((t) => {
    if (!t.jurisdictionScopes || t.jurisdictionScopes.length === 0) return true;
    return t.jurisdictionScopes.some((s) => s.toLowerCase() === "ca-bc" || s.toLowerCase() === "bc");
  });
}

export async function generateMetadata() {
  return {
    title: "British Columbia Legal Calculators | LegalCals",
    description: "Browse province-specific legal calculators for British Columbia. Calculate security deposit limits, rent increases, entry notices, repair timelines, and more.",
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
          title="Legal Calculators for British Columbia"
          description="Browse jurisdiction-specific calculators, rule summaries, and document templates for BC."
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
            description="Select a calculator to run it with BC-specific rules."
            icon={CalculatorIcon}
            theme={theme}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bcCalculators.map((calc) => {
              const Icon = calc.icon || CalculatorIcon;
              const summary = getRuleSummary(calc.slug);

              return (
                <Link key={calc.slug} href={`/calculators/ca/bc/${calc.slug}`}>
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
              description="Auto-generate BC-specific legal documents."
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
              Paste this snippet into your HTML to embed a BC calculator:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="bc-security-deposit"
  data-country="ca"
  data-province="bc"
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
            description="Query BC rules programmatically."
            icon={CommandLineIcon}
            theme={theme}
          />
          <LCCard theme={theme} className="space-y-4">
            <p className="text-sm text-slate-600">
              Every calculator is backed by our authority API. Retrieve raw rule data, citations, and version history for BC.
            </p>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Endpoint</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`GET /api/authority/ca/bc/{topic}`}</code>
                </pre>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">cURL Example</p>
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{`curl -H "x-api-key: lc_your_key_here" \\
  https://legalcals.com/api/authority/ca/bc/security-deposit`}</code>
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
              Need more details on BC landlord-tenant laws? Visit the{" "}
              <Link href="/ca/provinces/bc" className="underline font-medium" style={{ color: theme.colors.primary }}>
                BC Province Hub
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
