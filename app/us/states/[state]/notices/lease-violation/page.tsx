import { notFound } from "next/navigation";
import Link from "next/link";

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
  ClockIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v} days` : String(v);

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
  const eviction = evictionRules[stateCode];
  const stateName = eviction?.name || stateCode.toUpperCase();
  const noticeDays = toStr(eviction?.noticeForLeaseViolation);

  return {
    title: `${noticeDays} Notice for Lease Violation — ${stateName}`,
    description: `Generate a notice for lease violation in ${stateName}. Required notice period: ${noticeDays}.`,
    openGraph: {
      title: `${noticeDays} Notice for Lease Violation — ${stateName}`,
      description: `Generate a notice for lease violation in ${stateName}. Required notice period: ${noticeDays}.`,
      url: `https://legalcals.com/us/states/${stateCode}/notices/lease-violation`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const eviction = evictionRules[stateCode];

  if (!eviction) return notFound();

  const stateName = eviction.name;
  const theme = getTheme("us", stateCode);
  const statutes = usStatutes[stateCode as keyof typeof usStatutes];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${toStr(eviction.noticeForLeaseViolation)} Notice for Lease Violation — ${stateName}`}
          description={`Required notice period for lease violations in ${stateName}: ${toStr(eviction.noticeForLeaseViolation)}.`}
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
            In {stateName}, landlords must provide a{" "}
            {toStr(eviction.noticeForLeaseViolation)} notice when a tenant
            violates the lease terms. The notice typically gives the tenant an
            opportunity to cure the violation or vacate. Use the fields below to
            generate a lease violation notice.
          </p>
          {eviction.citations[0] && (
            <p className="text-xs text-slate-500 italic">
              Source: {eviction.citations[0]}
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

          <LCField label="Violation Description" theme={theme}>
            <textarea
              placeholder="Describe the lease violation in detail..."
              className={textareaClass}
            />
          </LCField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LCField label="Cure Deadline" theme={theme}>
              <input type="date" className={inputClass} />
            </LCField>
            <LCField label="Notice Period" theme={theme}>
              <input
                type="text"
                readOnly
                value={toStr(eviction.noticeForLeaseViolation)}
                className={`${inputClass} bg-slate-50`}
              />
            </LCField>
          </div>

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
          description="Explore eviction rules, timelines, and calculators for this state."
          icon={ScaleIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCButton variant="ghost" theme={theme}>
                <ScaleIcon className="w-4 h-4" />
                Eviction Rules
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/eviction-timeline`}>
              <LCButton variant="ghost" theme={theme}>
                <ClockIcon className="w-4 h-4" />
                Eviction Timeline
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
