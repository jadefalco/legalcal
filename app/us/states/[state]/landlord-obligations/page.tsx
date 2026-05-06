import { notFound } from "next/navigation";
import Link from "next/link";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";
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

import {
  ExclamationTriangleIcon,
  HomeIcon,
  ClockIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  KeyIcon,
  ShieldCheckIcon,
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
    title: `Landlord Obligations in ${stateName}`,
    description: `Legal responsibilities landlords must follow in ${stateName}, including repairs, notices, deposits, and eviction procedures.`,
    openGraph: {
      title: `Landlord Obligations in ${stateName}`,
      description: `Legal responsibilities landlords must follow in ${stateName}, including repairs, notices, deposits, and eviction procedures.`,
      url: `https://legalcals.com/us/states/${stateCode}/landlord-obligations`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const eviction = evictionRules[stateCode];
  const deposit = securityDepositRules[stateCode];
  const termination = leaseTerminationRules[stateCode];

  if (!eviction && !deposit && !termination) {
    return notFound();
  }

  const stateName =
    eviction?.name ||
    deposit?.name ||
    termination?.name ||
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
      icon: KeyIcon,
      title: "Provide Proper Entry Notice",
      citation: termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          Landlords in {stateName} must generally provide reasonable notice
          before entering a rental unit, except in emergencies. Entry should be
          during reasonable hours and for legitimate purposes such as repairs,
          inspections, or showing the unit to prospective tenants.
          {termination && (
            <>
              {" "}
              Termination of a month-to-month tenancy requires{" "}
              {toStr(termination.monthToMonthNoticeDays)} notice.
            </>
          )}
        </p>
      ),
    },
    {
      icon: HomeIcon,
      title: "Maintain Habitability",
      citation: termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {habitableMention && termination
            ? termination.fixedTermEarlyTerminationRules
            : `${stateName} law requires landlords to maintain rental premises in a habitable condition. This includes functioning heat, plumbing, electrical systems, weatherproofing, and structural integrity.`}
        </p>
      ),
    },
    {
      icon: BanknotesIcon,
      title: "Return Deposits on Time",
      citation: deposit?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {deposit
            ? `Security deposits must be returned within ${toStr(deposit.returnDeadline)} in ${stateName}. Deductions are limited to unpaid rent and damages beyond normal wear and tear.`
            : `${stateName} law requires landlords to return security deposits within a reasonable time after tenancy ends, minus lawful deductions.`}
          {deposit?.interestRequired && <> Interest may also be owed to the tenant.</>}
        </p>
      ),
    },
    {
      icon: DocumentTextIcon,
      title: "Provide Itemized Deductions",
      citation: deposit?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {deposit?.itemizedStatementRequired
            ? `${stateName} law requires landlords to provide a written, itemized list of any deductions from the security deposit, along with receipts or documentation.`
            : `Landlords in ${stateName} should provide clear documentation of any deductions from the security deposit to avoid disputes.`}
          {" "}
          {deposit && `Allowed deductions: ${deposit.allowedDeductions}.`}
        </p>
      ),
    },
    {
      icon: ScaleIcon,
      title: "Follow Legal Eviction Procedures",
      citation: eviction?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {eviction
            ? `Self-help eviction is illegal in ${stateName}. Landlords must file a court action and obtain a judgment before removing a tenant. After notice expires, filing timeline: ${toStr(eviction.courtFilingTime)}. Hearing timeline: ${toStr(eviction.hearingTimeline)}. Only law enforcement may execute a writ of possession.`
            : `In ${stateName}, landlords must obtain a court order before evicting a tenant. Lockouts, utility shutoffs, and property seizure without judicial process are prohibited.`}
        </p>
      ),
    },
    {
      icon: ClockIcon,
      title: "Serve Valid Notices",
      citation: eviction?.citations[0] ?? termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {eviction
            ? `Landlords must provide proper written notice before initiating eviction in ${stateName}. Notice for nonpayment of rent: ${toStr(eviction.noticeForNonpayment)}. Notice for lease violations: ${toStr(eviction.noticeForLeaseViolation)}.`
            : `Landlords in ${stateName} must provide proper written notice before terminating a tenancy.`}
          {termination && (
            <>
              {" "}
              Month-to-month termination notice:{" "}
              {toStr(termination.monthToMonthNoticeDays)}.
            </>
          )}
        </p>
      ),
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Maintain Safe Premises",
      citation: termination?.citations[0],
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          Landlords in {stateName} must ensure the property is safe for
          occupants. This includes working smoke detectors, secure doors and
          windows, adequate lighting in common areas, and compliance with local
          building and health codes.
        </p>
      ),
    },
    {
      icon: ShieldCheckIcon,
      title: "Comply With State Statutes",
      citation: statutes && statutes.length > 0 ? statutes[0].citation : undefined,
      content: (
        <p className="text-sm text-slate-700 leading-relaxed">
          {statutes && statutes.length > 0
            ? `Landlords in ${stateName} must comply with all applicable state statutes governing residential tenancies, including ${statutes.length} key statute${statutes.length > 1 ? "s" : ""} referenced on this site.`
            : `${stateName} landlords must comply with all state and local laws governing residential tenancies, including health and safety codes, fair housing laws, and landlord-tenant statutes.`}
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
          title={`Landlord Obligations in ${stateName}`}
          description={`Legal responsibilities landlords must follow in ${stateName}, including repairs, notices, deposits, and eviction procedures.`}
          icon={ExclamationTriangleIcon}
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
            Landlords in {stateName} must comply with specific state statutes
            governing residential tenancies. These obligations cover eviction
            procedures, security deposit handling, property maintenance, notice
            requirements, and tenant privacy. This page summarizes the key legal
            duties for landlords operating in {stateName}.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Obligations Grid */}
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

      {/* Statutes Detail Section */}
      {statutes && statutes.length > 0 && (
        <>
          <StateContentDivider theme={theme} />
          <section className="space-y-4">
            <StateSectionHeader
              title="Applicable Statutes"
              description="Key statutes governing landlord obligations in this state."
              icon={DocumentTextIcon}
              theme={theme}
            />
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
          </section>
        </>
      )}

      <StateContentDivider theme={theme} />

      {/* Related Resources */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Related Resources"
          description="Explore statutes, rules, timelines, and calculators for this state."
          icon={ScaleIcon}
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
