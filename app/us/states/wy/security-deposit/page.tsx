"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import { securityDepositRules } from "@/app/data/us/securityDepositRules";
import type { SecurityDepositRule } from "@/app/types/SecurityDepositRules";
import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCTimeline } from "@/app/components/lc/LCTimeline";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v}` : String(v);

export default function Page() {
  const stateCode = "wy";
  const rules: SecurityDepositRule | undefined = securityDepositRules[stateCode];
  const theme: Theme = getTheme("us", stateCode);

  if (!rules) {
    return notFound();
  }

  const itemized = toStr(
    rules.itemizedStatementRequired === true
      ? "Yes"
      : rules.itemizedStatementRequired === false
      ? "No"
      : rules.itemizedStatementRequired
  );

  const interest = toStr(
    rules.interestRequired === true
      ? "Yes"
      : rules.interestRequired === false
      ? "No"
      : rules.interestRequired
  );

  const timelineSteps = [
    {
      title: "Maximum Deposit",
      description: toStr(rules.maxDeposit),
      icon: BanknotesIcon,
      color: "text-blue-600",
    },
    {
      title: "Return Deadline",
      description: toStr(rules.returnDeadline),
      icon: ClockIcon,
      color: "text-green-600",
    },
    {
      title: "Itemized Statement",
      description: itemized,
      icon: ClipboardDocumentListIcon,
      color: "text-purple-600",
    },
    {
      title: "Interest Required",
      description: interest,
      icon: rules.interestRequired ? CheckCircleIcon : XCircleIcon,
      color: rules.interestRequired ? "text-emerald-600" : "text-slate-500",
    },
    {
      title: "Pet Deposit Rules",
      description: toStr(rules.petDepositRules),
      icon: ExclamationTriangleIcon,
      color: "text-amber-600",
    },
    {
      title: "Allowed Deductions",
      description: toStr(rules.allowedDeductions),
      icon: DocumentTextIcon,
      color: "text-slate-700",
    },
  ];

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">
      <LCSection
        title={"Wyoming Security Deposit Rules"}
        description="Official deposit limits, return deadlines, and legal citations for this state."
        icon={ArrowRightCircleIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Deposit Requirements
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <LCNotice
            label="Maximum Deposit"
            value={toStr(rules.maxDeposit)}
            icon={BanknotesIcon}
            theme={theme}
          />

          <LCNotice
            label="Return Deadline"
            value={toStr(rules.returnDeadline)}
            icon={ClockIcon}
            color="text-green-600"
            theme={theme}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <LCNotice
            label="Itemized Statement Required"
            value={itemized}
            icon={ClipboardDocumentListIcon}
            color="text-purple-600"
            theme={theme}
          />

          <LCNotice
            label="Interest Required"
            value={interest}
            icon={rules.interestRequired ? CheckCircleIcon : XCircleIcon}
            color={rules.interestRequired ? "text-emerald-600" : "text-slate-500"}
            theme={theme}
          />
        </div>

        <LCNotice
          label="Pet Deposit Rules"
          value={toStr(rules.petDepositRules)}
          icon={ExclamationTriangleIcon}
          color="text-amber-600"
          theme={theme}
        />

        <LCNotice
          label="Allowed Deductions"
          value={toStr(rules.allowedDeductions)}
          icon={DocumentTextIcon}
          color="text-slate-700"
          theme={theme}
        />
      </LCCard>

      <LCTimeline
        title="Security Deposit Timeline"
        icon={ArrowRightCircleIcon}
        steps={timelineSteps}
        theme={theme}
      />

      {rules.citations.length > 0 && (
        <LCCard theme={theme}>
          <LCSection title="Legal Citations" icon={DocumentTextIcon} theme={theme} />
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1 mt-2">
            {rules.citations.map((citation) => (
              <li key={citation}>{citation}</li>
            ))}
          </ul>
        </LCCard>
      )}

      <div className="flex gap-4">
        <Link href={"/calculators/security-deposit?state=wy"}>
          <LCButton variant="primary" theme={theme}>
            Open Security Deposit Calculator
          </LCButton>
        </Link>

        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>Back to US Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
