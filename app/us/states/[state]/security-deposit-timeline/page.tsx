import { notFound } from "next/navigation";
import Link from "next/link";

import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import { evictionRules } from "@/app/data/us/evictionRules";
import { usStatutes } from "@/app/config/usStatutes";
import { getTheme } from "@/app/theme";

import StateLayout from "@/app/components/lc/StateLayout";
import { StateSidebar } from "@/app/components/lc/StateSidebar";
import { StateFooterNav } from "@/app/components/lc/StateFooterNav";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import StateContentDivider from "@/app/components/lc/StateContentDivider";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCTimeline } from "@/app/components/lc/LCTimeline";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  BanknotesIcon,
  DocumentTextIcon,
  MapIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightCircleIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v} days` : String(v);

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}) {
  const stateCode = params.state.toLowerCase();
  const deposit = securityDepositRules[stateCode];
  const stateName =
    deposit?.name ||
    evictionRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const title = `${stateName} Security Deposit Timeline | LegalCals`;
  const description = `Step-by-step security deposit timeline for ${stateName}: deposit limits, deductions, itemization, interest, and return deadlines.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legalcals.com/us/states/${stateCode}/security-deposit-timeline`,
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
  const stateCode = params.state.toLowerCase();
  const deposit = securityDepositRules[stateCode];

  if (!deposit) {
    return notFound();
  }

  const stateName =
    deposit.name ||
    evictionRules[stateCode]?.name ||
    stateCode.toUpperCase();

  const theme = getTheme("us", stateCode);
  const allStatutes = usStatutes[stateCode as keyof typeof usStatutes];

  const itemizedText = deposit.itemizedStatementRequired
    ? "Yes — landlords must provide a written itemized list of any deductions."
    : "No — not explicitly required by state statute.";

  const interestText = deposit.interestRequired
    ? "Yes — landlords must pay interest on security deposits held."
    : "No — state law does not require interest on deposits.";

  const timelineSteps = [
    {
      title: "Maximum Deposit",
      description: toStr(deposit.maxDeposit),
      icon: BanknotesIcon,
      color: "text-blue-600",
    },
    {
      title: "Pet Deposit Rules",
      description: toStr(deposit.petDepositRules),
      icon: ExclamationTriangleIcon,
      color: "text-amber-600",
    },
    {
      title: "Allowed Deductions",
      description: toStr(deposit.allowedDeductions),
      icon: DocumentTextIcon,
      color: "text-slate-700",
    },
    {
      title: "Itemized Statement",
      description: itemizedText,
      icon: ClipboardDocumentListIcon,
      color: "text-purple-600",
    },
    {
      title: "Interest Required",
      description: interestText,
      icon: deposit.interestRequired ? CheckCircleIcon : XCircleIcon,
      color: deposit.interestRequired ? "text-emerald-600" : "text-slate-500",
    },
    {
      title: "Return Deadline",
      description: toStr(deposit.returnDeadline),
      icon: ClockIcon,
      color: "text-green-600",
    },
  ];

  return (
    <StateLayout
      stateCode={stateCode}
      theme={theme}
      header={
        <StateSectionHeader
          title={`${stateName} Security Deposit Timeline`}
          description="Step-by-step deposit lifecycle from collection to return."
          icon={BanknotesIcon}
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
            {stateName} law governs how landlords collect, hold, and return
            security deposits. The timeline below outlines the deposit lifecycle
            in chronological order — from move-in limits and pet deposits to
            deductions, itemization, interest, and the final return deadline.
          </p>
        </LCCard>
      </section>

      <StateContentDivider theme={theme} />

      {/* Timeline */}
      <section>
        <LCTimeline
          title="Security Deposit Timeline"
          icon={ArrowRightCircleIcon}
          steps={timelineSteps}
          theme={theme}
        />
      </section>

      <StateContentDivider theme={theme} />

      {/* Related Resources */}
      <section className="space-y-4">
        <StateSectionHeader
          title="Related Resources"
          description="Explore statutes, detailed rules, and calculators for this state."
          icon={MapIcon}
          theme={theme}
        />
        <LCCard theme={theme} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Link href={`/us/states/${stateCode}/statutes`}>
              <LCButton variant="ghost" theme={theme}>
                <DocumentTextIcon className="w-4 h-4" />
                State Statutes
              </LCButton>
            </Link>
            <Link href={`/us/states/${stateCode}/security-deposit`}>
              <LCButton variant="ghost" theme={theme}>
                <BanknotesIcon className="w-4 h-4" />
                Deposit Rules
              </LCButton>
            </Link>
            <Link
              href={`/calculators/us/${stateCode}/security-deposit-return`}
            >
              <LCButton variant="primary" theme={theme}>
                <CalculatorIcon className="w-4 h-4" />
                Deposit Calculator
              </LCButton>
            </Link>
          </div>
        </LCCard>
      </section>
    </StateLayout>
  );
}
