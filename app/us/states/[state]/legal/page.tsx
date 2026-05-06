import { notFound } from "next/navigation";
import Link from "next/link";

import { getStateData } from "@/app/lib/getStateData";
import { calculators } from "@/app/config/calculators";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  ScaleIcon,
  DocumentTextIcon,
  ClockIcon,
  HomeIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  CalculatorIcon,
  MapIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const calculatorIconMap: Record<string, React.ComponentType<any>> = {
  "eviction-timeline": ScaleIcon,
  "notice-period": DocumentTextIcon,
  "security-deposit-return": BanknotesIcon,
  "rent-increase-limits": ChartBarIcon,
  "final-paycheck-deadline": DocumentTextIcon,
  "overtime-calculator": CalculatorIcon,
  "small-claims-eligibility": ScaleIcon,
};

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const data = getStateData(params.state);
  if (!data) return { title: "State Not Found | LegalCals" };

  const { stateCode, stateName } = data;
  const title = `${stateName} Landlord‑Tenant Law Hub | LegalCals`;
  const description = `Explore eviction rules, security deposit laws, statutes, documents, calculators, and FAQs for ${stateName} — all in one place.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/legal`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const data = getStateData(params.state);
  if (!data) return notFound();

  const { stateCode, stateName, theme } = data;

  const sortedCalculators = [...calculators].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Landlord‑Tenant Law`}
          description="All eviction, deposit, notice, and rental law resources for this state."
          icon={ScaleIcon}
          theme={theme}
        />
      }
      sidebar={<StateSidebar stateCode={stateCode} theme={theme} />}
      footer={<StateFooterNav stateCode={stateCode} theme={theme} />}
    >
      {/* Overview */}
      <section>
        <LCCard theme={theme} className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Welcome to the {stateName} Legal Hub. This page aggregates every
            landlord‑tenant resource available for {stateName} — including
            eviction procedures, security deposit rules, state statutes, legal
            documents, calculators, and frequently asked questions. Use the
            sections below to navigate directly to the resource you need.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* A. Eviction */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Eviction"
          description="Eviction rules, timelines, and tools for landlords and tenants."
          icon={ScaleIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ResourceCard
            href={`/us/states/${stateCode}/eviction`}
            title="Eviction Rules"
            description="Notice requirements, filing deadlines, court process, and lockout rules."
            icon={ScaleIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/eviction-timeline`}
            title="Eviction Timeline"
            description="Step-by-step visual timeline from notice to physical eviction."
            icon={ClockIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/eviction`}
            title="Eviction FAQs"
            description="Common questions about eviction notices, cures, and court procedure."
            icon={QuestionMarkCircleIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/calculators/us/${stateCode}/eviction-timeline`}
            title="Eviction Calculators"
            description="Calculate deadlines and timelines for eviction proceedings."
            icon={CalculatorIcon}
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* B. Security Deposits */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Security Deposits"
          description="Deposit limits, return deadlines, deductions, and dispute resolution."
          icon={BanknotesIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ResourceCard
            href={`/us/states/${stateCode}/security-deposit`}
            title="Deposit Rules"
            description="Maximum deposits, return deadlines, itemization, and interest rules."
            icon={BanknotesIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/security-deposit-timeline`}
            title="Deposit Timeline"
            description="Visual timeline of the deposit lifecycle from move-in to return."
            icon={ClockIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/security-deposit`}
            title="Deposit FAQs"
            description="Common questions about deductions, wear and tear, and disputes."
            icon={QuestionMarkCircleIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/calculators/us/${stateCode}/security-deposit-return`}
            title="Deposit Calculators"
            description="Calculate return deadlines and allowable deductions."
            icon={CalculatorIcon}
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* C. Statutes */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Statutes"
          description="Key landlord‑tenant statutes and codified laws for this state."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            href={`/us/states/${stateCode}/statutes`}
            title="Landlord‑Tenant Statutes"
            description="Complete list of state statutes governing residential leases."
            icon={DocumentTextIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/statutes`}
            title="Eviction Statutes"
            description="Laws specific to eviction procedures, notices, and unlawful detainer."
            icon={ScaleIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/statutes`}
            title="Deposit Statutes"
            description="Laws governing deposit limits, return deadlines, and deductions."
            icon={BanknotesIcon}
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* D. Documents */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Documents"
          description="Legal forms, notices, and letters for landlords and tenants."
          icon={ClipboardDocumentListIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            href={`/us/documents/eviction-notice`}
            title="Eviction Notices"
            description="Generate jurisdiction-specific eviction notice letters."
            icon={DocumentTextIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/documents/security-deposit-return`}
            title="Deposit Letters"
            description="Create security deposit return and itemization letters."
            icon={BanknotesIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/documents`}
            title="Move‑in / Move‑out Checklists"
            description="Inspection forms, lease agreements, and termination notices."
            icon={HomeIcon}
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* E. General FAQs */}
      <section className="space-y-4">
        <StateSectionHeader
          title="General FAQs"
          description="Common questions about landlord and tenant rights and obligations."
          icon={QuestionMarkCircleIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            href={`/us/states/${stateCode}`}
            title="Landlord‑Tenant FAQ"
            description="Quick answers to the most common questions in this state."
            icon={QuestionMarkCircleIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/statutes`}
            title="Tenant Rights"
            description="Statutory protections, notice rights, and habitability standards."
            icon={HomeIcon}
            theme={theme}
          />
          <ResourceCard
            href={`/us/states/${stateCode}/statutes`}
            title="Landlord Obligations"
            description="Required disclosures, maintenance duties, and deposit handling."
            icon={ClipboardDocumentListIcon}
            theme={theme}
          />
        </div>
      </section>

      <StateContentDivider theme={theme} />

      {/* F. Tools & Calculators */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Tools & Calculators"
          description="All state-specific calculators and popular workflows."
          icon={CalculatorIcon}
          theme={theme}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCalculators.map((calc) => {
            const Icon = calculatorIconMap[calc.slug] || CalculatorIcon;
            return (
              <ResourceCard
                key={calc.slug}
                href={`/calculators/us/${stateCode}/${calc.slug}`}
                title={calc.name}
                description={calc.description}
                icon={Icon}
                theme={theme}
              />
            );
          })}
        </div>
      </section>
    </StateLayout>
  );
}

function ResourceCard({
  href,
  title,
  description,
  icon: Icon,
  theme,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  theme: import("@/app/types/Theme").Theme;
}) {
  return (
    <Link href={href}>
      <LCCard
        theme={theme}
        className="h-full hover:border-blue-300 transition-colors space-y-3"
      >
        <div className="flex items-center gap-2">
          <Icon
            className="w-5 h-5 shrink-0"
            style={{ color: theme.colors.primary }}
          />
          <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1 text-sm font-medium" style={{ color: theme.colors.primary }}>
          <span>Open</span>
          <ChevronRightIcon className="w-4 h-4" />
        </div>
      </LCCard>
    </Link>
  );
}
