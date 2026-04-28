"use client";

import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { defaultTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  CalculatorIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ClockIcon,
  ScaleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const genericCalculators = [
  {
    slug: "/calculators/ca",
    label: "Canada Calculators",
    description: "Browse all province-specific calculators.",
    icon: CalculatorIcon,
  },
];

const provinceSpecificTypes = [
  { slug: "eviction-timeline", label: "Eviction Timeline", icon: ScaleIcon },
  { slug: "final-paycheck-deadline", label: "Final Paycheck Deadline", icon: ClockIcon },
  { slug: "notice-period", label: "Notice Period", icon: DocumentTextIcon },
  { slug: "overtime-calculator", label: "Overtime Calculator", icon: CalculatorIcon },
  { slug: "rent-increase-limits", label: "Rent Increase Limits", icon: BanknotesIcon },
  { slug: "security-deposit-return", label: "Security Deposit Return", icon: BanknotesIcon },
  { slug: "small-claims-eligibility", label: "Small Claims Eligibility", icon: ScaleIcon },
];

export default function Page() {
  const theme: Theme = defaultTheme;

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto space-y-12">
      <LCSection
        title="Canada Calculators Directory"
        description="Browse all legal calculators for Canada."
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* General Calculators */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">General Calculators</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {genericCalculators.map((calc) => (
            <Link key={calc.slug} href={calc.slug}>
              <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
                <div className="flex items-center gap-2">
                  <calc.icon className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-800">{calc.label}</h3>
                </div>
                <p className="text-sm text-slate-600">{calc.description}</p>
              </LCCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Province-Specific Calculator Types */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Province-Specific Calculators</h2>
        <p className="text-sm text-slate-600">
          These calculators are available for every province and territory. Select a calculator type to browse by province.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {provinceSpecificTypes.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/ca/${calc.slug}`}
            >
              <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
                <div className="flex items-center gap-2">
                  <calc.icon className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-800">{calc.label}</h3>
                </div>
              </LCCard>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/ca/provinces">
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            Browse by Province
          </LCButton>
        </Link>

        <Link href="/ca">
          <LCButton variant="ghost" theme={theme}>Back to Canada Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
