"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  MapIcon,
  CalculatorIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";

const calculators = [
  { slug: "eviction-timeline", label: "Eviction Timeline", icon: ScaleIcon },
  { slug: "final-paycheck-deadline", label: "Final Paycheck Deadline", icon: DocumentTextIcon },
  { slug: "notice-period", label: "Notice Period", icon: DocumentTextIcon },
  { slug: "overtime-calculator", label: "Overtime Calculator", icon: CalculatorIcon },
  { slug: "rent-increase-limits", label: "Rent Increase Limits", icon: BanknotesIcon },
  { slug: "security-deposit-return", label: "Security Deposit Return", icon: BanknotesIcon },
  { slug: "small-claims-eligibility", label: "Small Claims Eligibility", icon: ScaleIcon },
];

export default function Page({ params }: { params: { state: string } }) {
  const stateCode = params.state.toLowerCase();
  const eviction = stateCode in evictionRules ? evictionRules[stateCode as keyof typeof evictionRules] : undefined;
  const deposit = stateCode in securityDepositRules ? securityDepositRules[stateCode as keyof typeof securityDepositRules] : undefined;

  if (!eviction && !deposit) {
    return notFound();
  }

  const stateName = (eviction as typeof evictionRules[keyof typeof evictionRules])?.name || (deposit as typeof securityDepositRules[keyof typeof securityDepositRules])?.name || stateCode.toUpperCase();
  const theme: Theme = getTheme("us", stateCode);

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">
      <LCSection
        title={`${stateName} Legal Resources`}
        description="State-specific rules and calculators available for this state."
        icon={MapIcon}
        theme={theme}
      />

      {/* State Rules */}
      {(eviction || deposit) && (
        <div className="grid gap-4 md:grid-cols-2">
          {eviction && (
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
                <div className="flex items-center gap-2">
                  <ScaleIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                  <h3 className="font-semibold text-slate-800">Eviction Rules</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Notice periods, filing timelines, and legal citations.
                </p>
              </LCCard>
            </Link>
          )}

          {deposit && (
            <Link href={`/us/states/${stateCode}/security-deposit`}>
              <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
                <div className="flex items-center gap-2">
                  <BanknotesIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                  <h3 className="font-semibold text-slate-800">Security Deposit Rules</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Deposit limits, return deadlines, and allowed deductions.
                </p>
              </LCCard>
            </Link>
          )}
        </div>
      )}

      {/* Calculators */}
      <LCSection
        title="State Calculators"
        description={`Available calculators for ${stateName}.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/us/${stateCode}/${calc.slug}`}
          >
            <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
              <div className="flex items-center gap-2">
                <calc.icon className="w-5 h-5" style={{ color: theme.colors.primary }} />
                <h3 className="font-semibold text-slate-800 text-sm">{calc.label}</h3>
              </div>
            </LCCard>
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link href="/us/states">
          <LCButton variant="ghost" theme={theme}>Back to States</LCButton>
        </Link>

        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>Back to US Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
