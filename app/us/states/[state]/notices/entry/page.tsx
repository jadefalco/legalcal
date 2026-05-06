import { notFound } from "next/navigation";
import Link from "next/link";

import { leaseTerminationRules } from "@/app/data/us/leaseTerminationRules";
import { evictionRules } from "@/app/data/us/evictionRules";
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
  HomeIcon,
  KeyIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const inputClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const textareaClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]";

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const state =
    leaseTerminationRules[stateCode] || evictionRules[stateCode];
  const stateName = state?.name || stateCode.toUpperCase();

  return {
    title: `Landlord Entry Notice — ${stateName}`,
    description: `Generate a landlord entry notice in ${stateName}. State law generally requires reasonable notice before entry.`,
    openGraph: {
      title: `Landlord Entry Notice — ${stateName}`,
      description: `Generate a landlord entry notice in ${stateName}. State law generally requires reasonable notice before entry.`,
      url: `https://legalcals.com/us/states/${stateCode}/notices/entry`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const termination = leaseTerminationRules[stateCode];
  const eviction = evictionRules[stateCode];

  if (!termination && !eviction) return notFound();

  const stateName =
    termination?.name || eviction?.name || stateCode.toUpperCase();
  const theme = getTheme("us", stateCode);
  const statutes = usStatutes[stateCode as keyof typeof usStatutes];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`Landlord Entry Notice — ${stateName}`}
          description={`In ${stateName}, landlords must generally provide reasonable notice before entering a rental unit.`}
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
            In {stateName}, landlords must generally provide reasonable notice
            before entering a tenant&apos;s rental unit, except in emergencies.
            Entry should be during reasonable hours and for legitimate purposes
            such as repairs, inspections, or showing the unit. Use the fields
            below to generate an entry notice.
          </p>
          {termination?.citations[0] && (
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
            <LCField label="Entry Date" theme={theme}>
              <input type="date" className={inputClass} />
            </LCField>
            <LCField label="Entry Time" theme={theme}>
              <input type="time" className={inputClass} />
            </LCField>
          </div>

          <LCField label="Purpose of Entry" theme={theme}>
            <textarea
              placeholder="e.g., routine inspection, repairs, showing unit to prospective tenants..."
              className={textareaClass}
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
          description="Explore tenant rights and landlord obligations for this state."
          icon={HomeIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/tenant-rights`}>
              <LCButton variant="ghost" theme={theme}>
                <KeyIcon className="w-4 h-4" />
                Tenant Rights
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/landlord-obligations`}>
              <LCButton variant="ghost" theme={theme}>
                <HomeIcon className="w-4 h-4" />
                Landlord Obligations
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
