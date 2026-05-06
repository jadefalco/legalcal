import { notFound } from "next/navigation";
import Link from "next/link";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { leaseTerminationRules } from "@/app/data/us/leaseTerminationRules";
import { rentIncreaseRules } from "@/app/data/us/rentIncreaseRules";
import { usStatutes } from "@/app/config/usStatutes";
import { getTheme } from "@/app/theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  ShieldCheckIcon,
  HomeIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
  KeyIcon,
  ScaleIcon,
  BanknotesIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v} days` : String(v);

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const state =
    evictionRules[stateCode] ||
    securityDepositRules[stateCode] ||
    leaseTerminationRules[stateCode];
  const stateName = state?.name || stateCode.toUpperCase();

  return {
    title: `Tenant Rights in ${stateName}`,
    description: `Your rights as a renter in ${stateName}, including notice, repairs, deposits, and eviction protections.`,
    openGraph: {
      title: `Tenant Rights in ${stateName}`,
      description: `Your rights as a renter in ${stateName}, including notice, repairs, deposits, and eviction protections.`,
      url: `https://legalcals.com/us/states/${stateCode}/tenant-rights`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const eviction = evictionRules[stateCode];
  const deposit = securityDepositRules[stateCode];
  const termination = leaseTerminationRules[stateCode];
  const rentIncrease = rentIncreaseRules[stateCode];

  if (!eviction && !deposit && !termination && !rentIncrease) {
    return notFound();
  }

  const stateName =
    eviction?.name ||
    deposit?.name ||
    termination?.name ||
    rentIncrease?.name ||
    stateCode.toUpperCase();

  const theme = getTheme("us", stateCode);
  const statutes = usStatutes[stateCode as keyof typeof usStatutes];

  const habitableMention = termination?.fixedTermEarlyTerminationRules
    ?.toLowerCase()
    .includes("habit");

  const sections: {
    icon: React.ComponentType<any>;
    title: string;
    citation?: string;
    content: React.ReactNode;
  }[] = [
    {
      icon: ClockIcon,
      title: "Right to Proper Notice",
      citation: eviction?.citations[0] ?? termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          In {stateName}, landlords must provide proper written notice before
          terminating a tenancy or raising rent.
          {eviction && (
            <>
              {" "}
              For nonpayment of rent, {toStr(eviction.noticeForNonpayment)} notice
              is required. For lease violations,{" "}
              {toStr(eviction.noticeForLeaseViolation)} notice is required.
            </>
          )}
          {termination && (
            <>
              {" "}
              Month-to-month terminations require{" "}
              {toStr(termination.monthToMonthNoticeDays)} notice.
            </>
          )}
        </p>
      ),
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Right to a Habitable Home",
      citation: termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {habitableMention && termination
            ? termination.fixedTermEarlyTerminationRules
            : `${stateName} law implies a warranty of habitability. Landlords must maintain the premises in a condition fit for human habitation, including working heat, water, and structural integrity.`}
        </p>
      ),
    },
    {
      icon: BanknotesIcon,
      title: "Right to Deposit Return",
      citation: deposit?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {deposit
            ? `Landlords must return your security deposit within ${toStr(deposit.returnDeadline)} in ${stateName}. Deductions must be reasonable and documented. Normal wear and tear cannot be deducted.`
            : `${stateName} law requires landlords to return security deposits within a reasonable time after tenancy ends, minus lawful deductions.`}
          {deposit?.interestRequired && <> Interest on the deposit may also be required.</>}
        </p>
      ),
    },
    {
      icon: DocumentTextIcon,
      title: "Right to Itemized Deductions",
      citation: deposit?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {deposit?.itemizedStatementRequired
            ? `In ${stateName}, landlords are required to provide a written, itemized list of any deductions from your security deposit.`
            : `In ${stateName}, landlords should provide documentation of any withholdings from your security deposit, even if not explicitly required by statute.`}
          {" "}
          {deposit && `Allowed deductions: ${deposit.allowedDeductions}.`}
        </p>
      ),
    },
    {
      icon: ScaleIcon,
      title: "Right to Court Process",
      citation: eviction?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {eviction
            ? `A landlord cannot remove you without a court order in ${stateName}. After receiving an eviction notice, the landlord must file a lawsuit and wait for a hearing. Court filing: ${toStr(eviction.courtFilingTime)}. Hearing timeline: ${toStr(eviction.hearingTimeline)}.`
            : `In ${stateName}, landlords must obtain a court order before evicting a tenant. Self-help eviction is illegal.`}
        </p>
      ),
    },
    {
      icon: KeyIcon,
      title: "Right to Privacy / Entry Notice",
      citation: termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {stateName} law generally requires landlords to provide reasonable
          notice before entering a rental unit, except in emergencies. Entry
          should be during reasonable hours and for legitimate purposes such as
          repairs, inspections, or showing the unit.
        </p>
      ),
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Right to Challenge Eviction",
      citation: eviction?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {eviction
            ? `Tenants have the right to respond to an eviction lawsuit in ${stateName}. The deadline to file an answer or appear in court is ${toStr(eviction.answerDeadline)} after service. Missing this deadline can result in a default judgment.`
            : `Tenants in ${stateName} have the right to contest an eviction in court and present defenses.`}
        </p>
      ),
    },
    {
      icon: HomeIcon,
      title: "Right to Documentation",
      citation: deposit?.citations[0] ?? termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          In {stateName}, tenants generally have the right to receive a written
          lease or rental agreement, receipts for rent payments, and any
          required disclosures. Keep copies of all correspondence with your
          landlord for your records.
        </p>
      ),
    },
  ];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`Tenant Rights in ${stateName}`}
          description={`Your rights as a renter in ${stateName}, including notice, repairs, deposits, and eviction protections.`}
          icon={ShieldCheckIcon}
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
            As a tenant in {stateName}, you have statutory rights that protect
            you during your tenancy. These include the right to proper notice
            before eviction, the right to a habitable home, protections for your
            security deposit, and the right to due process in court. This page
            summarizes the key tenant rights in {stateName} based on current
            state law.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Rights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, i) => (
          <LCCard key={i} theme={theme} className="space-y-3">
            <div className="flex items-center gap-2">
              <section.icon
                className="w-5 h-5"
                style={{ color: theme.colors.primary }}
              />
              <h3 className="font-semibold text-slate-800 text-sm">
                {section.title}
              </h3>
            </div>
            {section.content}
            {section.citation && (
              <p className="text-xs text-slate-500 italic">
                Source: {section.citation}
              </p>
            )}
          </LCCard>
        ))}
      </section>

      <StateContentDivider theme={theme} />

      {/* Related Resources */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Related Resources"
          description="Explore statutes, rules, timelines, and calculators for this state."
          icon={DocumentTextIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {statutes && statutes.length > 0 && (
              <Link href={`/us/states/${stateCode}/statutes`}>
                <LCButton variant="ghost" theme={theme}>
                  <DocumentTextIcon className="w-4 h-4" />
                  State Statutes
                </LCButton>
              </Link>
            )}
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCButton variant="ghost" theme={theme}>
                <ScaleIcon className="w-4 h-4" />
                Eviction Rules
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/security-deposit`}>
              <LCButton variant="ghost" theme={theme}>
                <BanknotesIcon className="w-4 h-4" />
                Deposit Rules
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/eviction-timeline`}>
              <LCButton variant="ghost" theme={theme}>
                <ClockIcon className="w-4 h-4" />
                Eviction Timeline
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/security-deposit-timeline`}>
              <LCButton variant="ghost" theme={theme}>
                <ClockIcon className="w-4 h-4" />
                Deposit Timeline
              </LCButton>
            </Link>
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
