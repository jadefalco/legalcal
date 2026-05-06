import { notFound } from "next/navigation";
import Link from "next/link";

import { securityDepositRules } from "@/app/data/us/securityDepositRules";
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
  BanknotesIcon,
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
  const deposit = securityDepositRules[stateCode];
  const stateName = deposit?.name || stateCode.toUpperCase();

  return {
    title: `Security Deposit Demand Letter — ${stateName}`,
    description: `Generate a security deposit demand letter in ${stateName}. Deposit return deadline: ${toStr(deposit?.returnDeadline)}.`,
    openGraph: {
      title: `Security Deposit Demand Letter — ${stateName}`,
      description: `Generate a security deposit demand letter in ${stateName}. Deposit return deadline: ${toStr(deposit?.returnDeadline)}.`,
      url: `https://legalcals.com/us/states/${stateCode}/notices/deposit-demand`,
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const deposit = securityDepositRules[stateCode];

  if (!deposit) return notFound();

  const stateName = deposit.name;
  const theme = getTheme("us", stateCode);
  const statutes = usStatutes[stateCode as keyof typeof usStatutes];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`Security Deposit Demand Letter — ${stateName}`}
          description={`In ${stateName}, landlords must return deposits within ${toStr(deposit.returnDeadline)}.`}
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
            In {stateName}, landlords must return your security deposit within{" "}
            {toStr(deposit.returnDeadline)} after you move out. If your deposit
            has not been returned or you disagree with deductions, you can send
            a formal demand letter. Use the fields below to generate a demand
            letter.
          </p>
          {deposit.citations[0] && (
            <p className="text-xs text-slate-500 italic">
              Source: {deposit.citations[0]}
            </p>
          )}
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Form */}
      <section>
        <LCCard theme={theme} className="space-y-5">
          <h3 className="font-semibold text-slate-800 text-sm">
            Letter Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LCField label="Tenant Name" theme={theme}>
              <input type="text" placeholder="Your full name" className={inputClass} />
            </LCField>
            <LCField label="Landlord Name" theme={theme}>
              <input type="text" placeholder="Landlord's full name" className={inputClass} />
            </LCField>
          </div>

          <LCField label="Property Address" theme={theme}>
            <input type="text" placeholder="Street address, city, state, zip" className={inputClass} />
          </LCField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LCField label="Deposit Amount" theme={theme}>
              <input type="text" placeholder="$0.00" className={inputClass} />
            </LCField>
            <LCField label="Move-Out Date" theme={theme}>
              <input type="date" className={inputClass} />
            </LCField>
          </div>

          <LCField label="Return Deadline (days)" theme={theme}>
            <input
              type="text"
              readOnly
              value={toStr(deposit.returnDeadline)}
              className={`${inputClass} bg-slate-50`}
            />
          </LCField>

          <LCButton variant="primary" theme={theme}>
            <DocumentTextIcon className="w-4 h-4" />
            Generate Letter
          </LCButton>
        </LCCard>
      </section>

      <Paywall
        featureName="Document Generator"
        description="Generate professional demand letters, notices, and legal documents with state-specific language. Upgrade to unlock all document types."
        theme={theme}
      />

      <StateContentDivider theme={theme} />

      {/* Related Resources */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Related Resources"
          description="Explore deposit rules, timelines, and calculators for this state."
          icon={BanknotesIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/security-deposit`}>
              <LCButton variant="ghost" theme={theme}>
                <BanknotesIcon className="w-4 h-4" />
                Deposit Rules
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/security-deposit-timeline`}>
              <LCButton variant="ghost" theme={theme}>
                <ClockIcon className="w-4 h-4" />
                Deposit Timeline
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
