import { notFound } from "next/navigation";
import Link from "next/link";

import { leaseTerminationRules } from "@/app/data/us/leaseTerminationRules";
import { usStatutes } from "@/app/config/usStatutes";
import { getTheme } from "@/app/theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import { Paywall } from "@/app/components/Paywall";

import {
  DocumentTextIcon,
  ClockIcon,
  HomeIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v} days` : String(v);

const inputClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const termination = leaseTerminationRules[stateCode];
  const stateName = termination?.name || stateCode.toUpperCase();

  return {
    title: `End-of-Lease Notice — ${stateName}`,
    description: `Generate an end-of-lease notice in ${stateName}. Required notice period: ${toStr(termination?.monthToMonthNoticeDays)}.`,
    openGraph: {
      title: `End-of-Lease Notice — ${stateName}`,
      description: `Generate an end-of-lease notice in ${stateName}. Required notice period: ${toStr(termination?.monthToMonthNoticeDays)}.`,
      url: `https://legalcals.com/us/states/${stateCode}/notices/end-of-lease`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const termination = leaseTerminationRules[stateCode];

  if (!termination) return notFound();

  const stateName = termination.name;
  const theme = getTheme("us", stateCode);
  const statutes = usStatutes[stateCode as keyof typeof usStatutes];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`End-of-Lease Notice — ${stateName}`}
          description={`Required notice period for ending a tenancy in ${stateName}: ${toStr(termination.monthToMonthNoticeDays)}.`}
          icon={DocumentTextIcon}
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
            In {stateName}, either party must typically provide{" "}
            {toStr(termination.monthToMonthNoticeDays)} notice to end a
            month-to-month tenancy. Fixed-term leases generally end on the date
            specified in the lease agreement unless both parties agree to an
            early termination. Use the fields below to generate an end-of-lease
            notice.
          </p>
          {termination.citations[0] && (
            <p className="text-xs text-slate-500 italic">
              Source: {termination.citations[0]}
            </p>
          )}
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Form */}
      <section>
        <LCCard theme={theme} className="space-y-5">
          <h3 className="font-semibold text-slate-800 text-sm">
            Notice Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LCField label="Landlord Name" theme={theme}>
              <input type="text" placeholder="Full name" className={inputClass} />
            </LCField>
            <LCField label="Tenant Name" theme={theme}>
              <input type="text" placeholder="Full name" className={inputClass} />
            </LCField>
          </div>

          <LCField label="Property Address" theme={theme}>
            <input type="text" placeholder="Street address, city, state, zip" className={inputClass} />
          </LCField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LCField label="Lease End Date" theme={theme}>
              <input type="date" className={inputClass} />
            </LCField>
            <LCField label="Move-Out Date" theme={theme}>
              <input type="date" className={inputClass} />
            </LCField>
          </div>

          <LCField label="Notice Period (days)" theme={theme}>
            <input
              type="text"
              readOnly
              value={toStr(termination.monthToMonthNoticeDays)}
              className={`${inputClass} bg-slate-50`}
            />
          </LCField>

          <LCButton variant="primary" theme={theme}>
            <DocumentTextIcon className="w-4 h-4" />
            Generate Notice
          </LCButton>
        </LCCard>
      </section>

      <Paywall
        featureName="Notice Generator"
        description="Generate professional, state-specific notices with proper legal language and automatic citations. Upgrade to unlock all notice types and document downloads."
        theme={theme}
      />

      <StateContentDivider theme={theme} />

      {/* Related Resources */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Related Resources"
          description="Explore lease termination rules and calculators for this state."
          icon={HomeIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/lease-termination`}>
              <LCButton variant="ghost" theme={theme}>
                <HomeIcon className="w-4 h-4" />
                Lease Termination Rules
              </LCButton>
            </Link>
            {statutes && statutes.length > 0 && (
              <Link href={`/us/states/${stateCode}/statutes`}>
                <LCButton variant="ghost" theme={theme}>
                  <DocumentTextIcon className="w-4 h-4" />
                  State Statutes
                </LCButton>
              </Link>
            )}
            <Link href={`/calculators/us/${stateCode}`}>
              <LCButton variant="primary" theme={theme}>
                <CalculatorIcon className="w-4 h-4" />
                Calculators
              </LCButton>
            </Link>
          </div>
        </LCCard>
      </section>
    </StateLayout>
  );
}
