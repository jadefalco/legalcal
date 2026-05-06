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
  ScaleIcon,
  DocumentTextIcon,
  ClockIcon,
  HomeIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
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
    title: `${stateName} Landlord-Tenant Law Summary`,
    description: `A complete overview of rental laws, eviction rules, deposit regulations, and tenant rights in ${stateName}.`,
    openGraph: {
      title: `${stateName} Landlord-Tenant Law Summary`,
      description: `A complete overview of rental laws, eviction rules, deposit regulations, and tenant rights in ${stateName}.`,
      url: `https://legalcals.com/us/states/${stateCode}/summary`,
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

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Landlord-Tenant Law Summary`}
          description={`A complete overview of rental laws, eviction rules, deposit regulations, and tenant rights in ${stateName}.`}
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
            This page provides a comprehensive summary of landlord-tenant law
            in {stateName}. It covers eviction procedures, security deposit
            rules, tenant rights, landlord obligations, required notices, key
            statutes, and available tools. Use this summary as a starting point
            for understanding your rights and responsibilities under {stateName}
            {" "}law.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* 1. Eviction Overview */}
      {eviction && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ScaleIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
            <h2 className="font-semibold text-slate-800">Eviction Overview</h2>
          </div>
          <LCCard theme={theme} className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              In {stateName}, landlords must follow specific procedures to
              evict a tenant. The process begins with a written notice:
            </p>
            <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
              <li>
                <strong>Nonpayment notice:</strong>{" "}
                {toStr(eviction.noticeForNonpayment)}
              </li>
              <li>
                <strong>Lease violation notice:</strong>{" "}
                {toStr(eviction.noticeForLeaseViolation)}
              </li>
              <li>
                <strong>Court filing:</strong> {toStr(eviction.courtFilingTime)}
              </li>
              <li>
                <strong>Tenant answer deadline:</strong>{" "}
                {toStr(eviction.answerDeadline)}
              </li>
              <li>
                <strong>Hearing timeline:</strong>{" "}
                {toStr(eviction.hearingTimeline)}
              </li>
              <li>
                <strong>Lockout:</strong> {toStr(eviction.lockoutAllowedAfter)}
              </li>
            </ul>
            {eviction.citations[0] && (
              <p className="text-xs text-slate-500 italic">
                Source: {eviction.citations.join("; ")}
              </p>
            )}
          </LCCard>
        </section>
      )}

      {/* 2. Security Deposit Overview */}
      {deposit && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <BanknotesIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
            <h2 className="font-semibold text-slate-800">
              Security Deposit Overview
            </h2>
          </div>
          <LCCard theme={theme} className="space-y-3">
            <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
              <li>
                <strong>Maximum deposit:</strong> {toStr(deposit.maxDeposit)}
              </li>
              <li>
                <strong>Return deadline:</strong>{" "}
                {toStr(deposit.returnDeadline)}
              </li>
              <li>
                <strong>Itemized statement required:</strong>{" "}
                {deposit.itemizedStatementRequired ? "Yes" : "No"}
              </li>
              <li>
                <strong>Interest required:</strong>{" "}
                {deposit.interestRequired ? "Yes" : "No"}
              </li>
              <li>
                <strong>Allowed deductions:</strong> {deposit.allowedDeductions}
              </li>
              {deposit.petDepositRules && (
                <li>
                  <strong>Pet deposit rules:</strong> {deposit.petDepositRules}
                </li>
              )}
            </ul>
            {deposit.citations[0] && (
              <p className="text-xs text-slate-500 italic">
                Source: {deposit.citations.join("; ")}
              </p>
            )}
          </LCCard>
        </section>
      )}

      {/* 3. Tenant Rights Overview */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Tenant Rights Overview</h2>
        </div>
        <LCCard theme={theme} className="space-y-3">
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
            {eviction && (
              <li>
                <strong>Right to court process:</strong> Landlords must obtain
                a court order before eviction. Court filing:{" "}
                {toStr(eviction.courtFilingTime)}. Hearing:{" "}
                {toStr(eviction.hearingTimeline)}.
              </li>
            )}
            {eviction && (
              <li>
                <strong>Right to challenge eviction:</strong> Tenants have{" "}
                {toStr(eviction.answerDeadline)} to respond after service.
              </li>
            )}
            <li>
              <strong>Right to privacy:</strong> Landlords must generally
              provide reasonable notice before entry, except in emergencies.
            </li>
            <li>
              <strong>Right to a habitable home:</strong>{" "}
              {habitableMention && termination
                ? termination.fixedTermEarlyTerminationRules
                : `${stateName} law implies a warranty of habitability, requiring working heat, water, and structural integrity.`}
            </li>
            {deposit && (
              <li>
                <strong>Right to deposit return:</strong> Deposits must be
                returned within {toStr(deposit.returnDeadline)}. Deductions
                must be reasonable and documented.
              </li>
            )}
            {deposit?.itemizedStatementRequired && (
              <li>
                <strong>Right to itemized deductions:</strong> Landlords must
                provide a written, itemized list of any deductions.
              </li>
            )}
            {termination?.domesticViolenceProtections && (
              <li>
                <strong>Domestic violence protections:</strong>{" "}
                {termination.domesticViolenceProtections}
              </li>
            )}
          </ul>
          {(eviction?.citations[0] || termination?.citations[0] || deposit?.citations[0]) && (
            <p className="text-xs text-slate-500 italic">
              Source:{" "}
              {[
                ...(eviction?.citations ?? []),
                ...(termination?.citations ?? []),
                ...(deposit?.citations ?? []),
              ]
                .filter((c, i, a) => a.indexOf(c) === i)
                .join("; ")}
            </p>
          )}
        </LCCard>
      </section>

      {/* 4. Landlord Obligations Overview */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <HomeIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">
            Landlord Obligations Overview
          </h2>
        </div>
        <LCCard theme={theme} className="space-y-3">
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
            {eviction && (
              <li>
                <strong>Serve valid notices:</strong> Nonpayment:{" "}
                {toStr(eviction.noticeForNonpayment)}. Lease violation:{" "}
                {toStr(eviction.noticeForLeaseViolation)}.
              </li>
            )}
            {eviction && (
              <li>
                <strong>Follow legal eviction procedures:</strong> Self-help
                eviction is illegal. Court filing:{" "}
                {toStr(eviction.courtFilingTime)}. Only law enforcement may
                execute a writ.
              </li>
            )}
            {deposit && (
              <li>
                <strong>Return deposits on time:</strong> Within{" "}
                {toStr(deposit.returnDeadline)}. Deductions limited to unpaid
                rent and damages beyond normal wear and tear.
              </li>
            )}
            {deposit && (
              <li>
                <strong>Provide itemized deductions:</strong>{" "}
                {deposit.itemizedStatementRequired
                  ? "Required by law."
                  : "Recommended to avoid disputes."}{" "}
                Allowed: {deposit.allowedDeductions}.
              </li>
            )}
            <li>
              <strong>Provide proper entry notice:</strong> Reasonable notice
              required before entering, except in emergencies.
            </li>
            <li>
              <strong>Maintain habitability:</strong>{" "}
              {habitableMention && termination
                ? termination.fixedTermEarlyTerminationRules
                : `Landlords must maintain habitable conditions including heat, plumbing, and structural integrity.`}
            </li>
            <li>
              <strong>Maintain safe premises:</strong> Working smoke detectors,
              secure doors/windows, adequate lighting, and compliance with
              building codes.
            </li>
          </ul>
          {(eviction?.citations[0] || termination?.citations[0] || deposit?.citations[0]) && (
            <p className="text-xs text-slate-500 italic">
              Source:{" "}
              {[
                ...(eviction?.citations ?? []),
                ...(termination?.citations ?? []),
                ...(deposit?.citations ?? []),
              ]
                .filter((c, i, a) => a.indexOf(c) === i)
                .join("; ")}
            </p>
          )}
        </LCCard>
      </section>

      {/* 5. Required Notices */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Required Notices</h2>
        </div>
        <LCCard theme={theme} className="space-y-3">
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
            {eviction && (
              <li>
                <strong>Nonpayment notice:</strong>{" "}
                {toStr(eviction.noticeForNonpayment)}
              </li>
            )}
            {eviction && (
              <li>
                <strong>Lease violation notice:</strong>{" "}
                {toStr(eviction.noticeForLeaseViolation)}
              </li>
            )}
            {termination && (
              <li>
                <strong>End-of-lease notice:</strong>{" "}
                {toStr(termination.monthToMonthNoticeDays)} for month-to-month
                tenancies
              </li>
            )}
            {rentIncrease && (
              <li>
                <strong>Rent increase notice:</strong>{" "}
                {toStr(rentIncrease.noticePeriodDays)}
                {rentIncrease.rentControl && " (rent control may apply)"}
              </li>
            )}
            <li>
              <strong>Entry notice:</strong> Reasonable notice required before
              landlord entry, except in emergencies.
            </li>
            {deposit && (
              <li>
                <strong>Deposit return letter:</strong> Must be returned within{" "}
                {toStr(deposit.returnDeadline)}
                {deposit.itemizedStatementRequired
                  ? " with itemized deductions."
                  : "."}
              </li>
            )}
          </ul>
          {(eviction?.citations[0] || termination?.citations[0] || rentIncrease?.citations[0]) && (
            <p className="text-xs text-slate-500 italic">
              Source:{" "}
              {[
                ...(eviction?.citations ?? []),
                ...(termination?.citations ?? []),
                ...(rentIncrease?.citations ?? []),
              ]
                .filter((c, i, a) => a.indexOf(c) === i)
                .join("; ")}
            </p>
          )}
        </LCCard>
      </section>

      {/* 6. Key Statutes */}
      {statutes && statutes.length > 0 && (
        <>
          <StateContentDivider theme={theme} />
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
              <h2 className="font-semibold text-slate-800">Key Statutes</h2>
            </div>
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

      {/* 7. Tools & Calculators */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
          <h2 className="font-semibold text-slate-800">Tools & Calculators</h2>
        </div>
        <LCCard theme={theme} className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Use these tools to calculate deadlines, generate notices, and
            explore state-specific rules.
          </p>
          <div className="flex flex-wrap gap-3">
            {eviction && (
              <Link href={`/us/states/${stateCode}/eviction-timeline`}>
                <LCButton variant="ghost" theme={theme}>
                  <ClockIcon className="w-4 h-4" />
                  Eviction Timeline
                </LCButton>
              </Link>
            )}
            {deposit && (
              <Link href={`/us/states/${stateCode}/security-deposit-timeline`}>
                <LCButton variant="ghost" theme={theme}>
                  <BanknotesIcon className="w-4 h-4" />
                  Deposit Timeline
                </LCButton>
              </Link>
            )}
            {eviction && (
              <Link href={`/us/states/${stateCode}/notices/nonpayment`}>
                <LCButton variant="ghost" theme={theme}>
                  <DocumentTextIcon className="w-4 h-4" />
                  Nonpayment Notice
                </LCButton>
              </Link>
            )}
            {eviction && (
              <Link href={`/us/states/${stateCode}/notices/lease-violation`}>
                <LCButton variant="ghost" theme={theme}>
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  Violation Notice
                </LCButton>
              </Link>
            )}
            {deposit && (
              <Link href={`/us/states/${stateCode}/notices/deposit-demand`}>
                <LCButton variant="ghost" theme={theme}>
                  <BanknotesIcon className="w-4 h-4" />
                  Deposit Demand
                </LCButton>
              </Link>
            )}
            <Link href={`/calculators/us/${stateCode}`}>
              <LCButton variant="primary" theme={theme}>
                <CalculatorIcon className="w-4 h-4" />
                All Calculators
              </LCButton>
            </Link>
          </div>
        </LCCard>
      </section>
    </StateLayout>
  );
}
