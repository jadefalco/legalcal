import { notFound } from "next/navigation";
import Link from "next/link";

import { getStateData } from "@/app/lib/getStateData";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  MapIcon,
  CalculatorIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const calculators = [
  { slug: "eviction-timeline", label: "Eviction Timeline", icon: ScaleIcon },
  { slug: "final-paycheck-deadline", label: "Final Paycheck Deadline", icon: DocumentTextIcon },
  { slug: "notice-period", label: "Notice Period", icon: DocumentTextIcon },
  { slug: "overtime-calculator", label: "Overtime Calculator", icon: CalculatorIcon },
  { slug: "rent-increase-limits", label: "Rent Increase Limits", icon: BanknotesIcon },
  { slug: "security-deposit-return", label: "Security Deposit Return", icon: BanknotesIcon },
  { slug: "small-claims-eligibility", label: "Small Claims Eligibility", icon: ScaleIcon },
];

export async function generateMetadata({ params }: { params: { state: string } }) {
  const data = getStateData(params.state);
  if (!data) return { title: "State Not Found | LegalCals" };

  const { stateCode, stateName } = data;
  const title = `${stateName} Landlord‑Tenant Laws & Calculators | LegalCals`;
  const description = `Explore ${stateName} landlord‑tenant rules, eviction timelines, security deposit laws, and state‑specific legal calculators.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}`,
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

  const { stateCode, stateName, eviction, deposit, statutes, theme } = data;

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">

      {/* HEADER */}
      <LCSection
        title={`${stateName} Legal Resources`}
        description="State-specific rules and calculators available for this state."
        icon={MapIcon}
        theme={theme}
      />
      {/* STATE OVERVIEW */}
<section className="space-y-4">
  <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
    <MapIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
    {stateName} Overview
  </h2>

  <LCCard theme={theme} className="space-y-3">
    <p className="text-sm text-slate-700 leading-relaxed">
      {stateName} has state‑specific rules governing residential leases, 
      notice periods, eviction procedures, and security deposit handling. 
      Below you’ll find calculators, timelines, and legal summaries tailored 
      to {stateName} law.
    </p>

    {(eviction || deposit) && (
      <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
        {eviction && (
          <li>
            Eviction rules include notice requirements, filing deadlines, 
            and court procedures.
          </li>
        )}
        {deposit && (
          <li>
            Security deposit rules include maximum amounts, return deadlines, 
            and itemization requirements.
          </li>
        )}
      </ul>
    )}
  </LCCard>
</section>

      {/* QUICK FACTS */}
      {(eviction || deposit) && (
        <LCCard theme={theme} className="space-y-2">
          <h3 className="font-semibold text-slate-800 text-sm">Quick Facts</h3>
          <ul className="text-sm text-slate-600 space-y-1">
            {eviction?.noticeForNonpayment !== undefined && (
              <li>Notice for Nonpayment: {eviction.noticeForNonpayment} days</li>
            )}
            {eviction?.noticeForLeaseViolation !== undefined && (
              <li>Notice for Lease Violation: {eviction.noticeForLeaseViolation} days</li>
            )}
            {eviction?.answerDeadline !== undefined && (
              <li>Tenant Answer Deadline: {eviction.answerDeadline} days</li>
            )}
            {deposit?.maxDeposit && (
              <li>Max Security Deposit: {deposit.maxDeposit}</li>
            )}
            {deposit?.returnDeadline !== undefined && (
              <li>Deposit Return Deadline: {deposit.returnDeadline} days</li>
            )}
          </ul>
        </LCCard>
      )}

      {/* STATE RULES */}
      {(eviction || deposit) && (
        <div className="grid gap-4 md:grid-cols-2">

          {eviction && (
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCCard
                theme={theme}
                className="h-full hover:border-blue-300 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2">
                  <ScaleIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                  <h3 className="font-semibold text-slate-800">Eviction Rules</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Notice periods, filing timelines, and legal citations.
                </p>
              </LCCard>
            </Link>
          )}

          {deposit && (
            <Link href={`/us/states/${stateCode}/security-deposit`}>
              <LCCard
                theme={theme}
                className="h-full hover:border-blue-300 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2">
                  <BanknotesIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                  <h3 className="font-semibold text-slate-800">Security Deposit Rules</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Deposit limits, return deadlines, and allowed deductions.
                </p>
              </LCCard>
            </Link>
          )}

        </div>
      )}

      {/* CALCULATORS */}
      <LCSection
        title="State Calculators"
        description={`Available calculators for ${stateName}.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/us/${stateCode}/${calc.slug}`}
          >
            <LCCard
              theme={theme}
              className="h-full hover:border-blue-300 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <calc.icon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                <h3 className="font-semibold text-slate-800 text-sm">{calc.label}</h3>
              </div>
            </LCCard>
          </Link>
        ))}
      </div>
     {/* STATUTES */}
<LCSection
  title="State Statutes"
  description={`Key landlord‑tenant laws for ${stateName}.`}
  icon={DocumentTextIcon}
  theme={theme}
/>

{statutes ? (
  <div className="space-y-4">
    {statutes.map((statute, i) => (
      <LCCard key={i} theme={theme} className="space-y-2">
        <h3 className="font-semibold text-slate-800 text-sm">
          {statute.citation} — {statute.title}
        </h3>
        <p className="text-sm text-slate-600">{statute.summary}</p>
        <Link href={statute.url} target="_blank">
          <LCButton variant="ghost" theme={theme}>
            View Full Statute
          </LCButton>
        </Link>
      </LCCard>
    ))}
  </div>
) : (
  <LCCard theme={theme}>
    <p className="text-sm text-slate-600">
      Statutes for this state are coming soon.
    </p>
  </LCCard>
)}

      {/* NAVIGATION BUTTONS */}
      <div className="flex flex-wrap gap-4">

        <Link href={`/us/states/${stateCode}/legal`}>
          <LCButton variant="ghost" theme={theme}>
            Full Legal Breakdown
          </LCButton>
        </Link>

        <Link href="/us/states">
          <LCButton variant="ghost" theme={theme}>
            Back to States
          </LCButton>
        </Link>

        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>
            Back to US Index
          </LCButton>
        </Link>

      </div>

    </main>
  );
}