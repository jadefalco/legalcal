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
  ScaleIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import { evictionRules } from "@/app/data/ca/evictionRules";

const calculators = [
  { slug: "eviction-timeline", label: "Eviction Timeline", icon: ScaleIcon },
  { slug: "final-paycheck-deadline", label: "Final Paycheck Deadline", icon: ClockIcon },
  { slug: "notice-period", label: "Notice Period", icon: DocumentTextIcon },
  { slug: "overtime-calculator", label: "Overtime Calculator", icon: CalculatorIcon },
  { slug: "rent-increase-limits", label: "Rent Increase Limits", icon: BanknotesIcon },
  { slug: "security-deposit-return", label: "Security Deposit Return", icon: BanknotesIcon },
  { slug: "small-claims-eligibility", label: "Small Claims Eligibility", icon: ScaleIcon },
];

export default function Page({ params }: { params: { province: string } }) {
  const provinceCode = params.province.toLowerCase();
  const rules = provinceCode in evictionRules
    ? evictionRules[provinceCode as keyof typeof evictionRules]
    : undefined;

  if (!rules) {
    return notFound();
  }

  const provinceName = rules.name;
  const theme: Theme = getTheme("ca", provinceCode);

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">
      <LCSection
        title={`${provinceName} Legal Resources`}
        description="Province-specific rules and calculators available for this jurisdiction."
        icon={MapIcon}
        theme={theme}
      />

      {/* Province Rules */}
      <Link href={`/ca/provinces/${provinceCode}/eviction`}>
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

      {/* Calculators */}
      <LCSection
        title="Province Calculators"
        description={`Available calculators for ${provinceName}.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/ca/${provinceCode}/${calc.slug}`}
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
        <Link href="/ca/provinces">
          <LCButton variant="ghost" theme={theme}>Back to Provinces</LCButton>
        </Link>

        <Link href="/ca">
          <LCButton variant="ghost" theme={theme}>Back to Canada Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
