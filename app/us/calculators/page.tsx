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
    slug: "/calculators/us/eviction-timeline",
    label: "Eviction Timeline",
    description: "Calculate eviction notice and hearing timelines by state.",
    icon: ScaleIcon,
  },
  {
    slug: "/calculators/us/notice-period",
    label: "Notice Period",
    description: "Determine required notice periods for tenancy termination.",
    icon: DocumentTextIcon,
  },
  {
    slug: "/calculators/us/security-deposit",
    label: "Security Deposit",
    description: "Estimate security deposit return deadlines and penalties.",
    icon: BanknotesIcon,
  },
  {
    slug: "/calculators/us/employment-termination",
    label: "Employment Termination",
    description: "Final paycheck deadlines and severance rules.",
    icon: ClockIcon,
  },
  {
    slug: "/calculators/us/small-claims",
    label: "Small Claims",
    description: "Small claims court limits and filing requirements.",
    icon: ScaleIcon,
  },
];

const stateSpecificTypes = [
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
        title="US Calculators Directory"
        description="Browse all legal calculators for the United States."
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* Generic Calculators */}
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

      {/* State-Specific Calculator Types */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">State-Specific Calculators</h2>
        <p className="text-sm text-slate-600">
          These calculators are available for every state. Select a calculator type to browse by state.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stateSpecificTypes.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/us/${calc.slug}`}
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
        <Link href="/us/states">
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            Browse by State
          </LCButton>
        </Link>

        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>Back to US Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
