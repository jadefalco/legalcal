import { notFound } from "next/navigation";
import Link from "next/link";

import { rentIncreaseRules } from "@/app/data/us/rentIncreaseRules";
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
  ExclamationTriangleIcon,
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
  const rent = rentIncreaseRules[stateCode];
  const stateName = rent?.name || stateCode.toUpperCase();

  return {
    title: `Rent Increase Notice — ${stateName}`,
    description: `Generate a rent increase notice in ${stateName}. Required notice period: ${toStr(rent?.noticePeriodDays)}.`,
    openGraph: {
      title: `Rent Increase Notice — ${stateName}`,
      description: `Generate a rent increase notice in ${stateName}. Required notice period: ${toStr(rent?.noticePeriodDays)}.`,
      url: `https://legalcals.com/us/states/${stateCode}/notices/rent-increase`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const rent = rentIncreaseRules[stateCode];
  const termination = leaseTerminationRules[stateCode];

  if (!rent && !termination) return notFound();

  const stateName = rent?.name || termination?.name || stateCode.toUpperCase();
  const theme = getTheme("us", stateCode);
  const statutes = usStatutes[stateCode as keyof typeof usStatutes];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`Rent Increase Notice — ${stateName}`}
          description={`In ${stateName}, required notice period for rent increases: ${toStr(rent?.noticePeriodDays)}.`}
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
            In {stateName}, landlords must provide{" "}
            {rent
              ? toStr(rent.noticePeriodDays)
              : "reasonable"}
            {" "}
            notice before increasing rent.
            {rent?.rentControl && (
              <> Rent control or stabilization rules may limit the amount of increase.</>
            )}
            {rent?.additionalRequirements && <> {rent.additionalRequirements}</>}
            {" "}
            Use the fields below to generate a rent increase notice.
          </p>
          {rent?.citations[0] && (
            <p className="text-xs text-slate-500 italic">
              Source: {rent.citations[0]}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LCField label="Current Rent" theme={theme}>
              <input type="text" placeholder="$0.00" className={inputClass} />
            </LCField>
            <LCField label="New Rent" theme={theme}>
              <input type="text" placeholder="$0.00" className={inputClass} />
            </LCField>
            <LCField label="Effective Date" theme={theme}>
              <input type="date" className={inputClass} />
            </LCField>
          </div>

          <LCField label="Notice Period (days)" theme={theme}>
            <input
              type="text"
              readOnly
              value={rent ? toStr(rent.noticePeriodDays) : "Varies"}
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
          description="Explore rent increase rules and calculators for this state."
          icon={ExclamationTriangleIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/rent-increase`}>
              <LCButton variant="ghost" theme={theme}>
                <ExclamationTriangleIcon className="w-4 h-4" />
                Rent Increase Rules
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
