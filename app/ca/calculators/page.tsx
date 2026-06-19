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
  MapIcon,
  HeartIcon,
  UsersIcon,
  ShieldExclamationIcon,
  BriefcaseIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const provinceHubs = [
  {
    slug: "/calculators/ca/bc",
    label: "British Columbia",
    description: "BC-specific calculators for employment, tenancy, and more.",
    icon: MapIcon,
    themeColor: "#003366",
  },
  {
    slug: "/calculators/ca/ab",
    label: "Alberta",
    description: "Alberta-specific calculators for employment standards and more.",
    icon: MapIcon,
    themeColor: "#F04C23",
  },
  {
    slug: "/calculators/ca/on",
    label: "Ontario",
    description: "Ontario-specific calculators for employment and tenancy rules.",
    icon: MapIcon,
    themeColor: "#00205B",
  },
  {
    slug: "/calculators/ca/federal",
    label: "Federal",
    description: "Federal calculators for EI, CPP, and Canada Labour Code.",
    icon: MapIcon,
    themeColor: "#003366",
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
        description="Browse all legal calculators for Canada by province or federal jurisdiction."
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* Province & Federal Hubs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Jurisdiction Hubs</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {provinceHubs.map((hub) => (
            <Link key={hub.slug} href={hub.slug}>
              <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors space-y-2">
                <div className="flex items-center gap-2">
                  <hub.icon className="w-5 h-5" style={{ color: hub.themeColor }} />
                  <h3 className="font-semibold text-slate-800">{hub.label}</h3>
                </div>
                <p className="text-sm text-slate-600">{hub.description}</p>
              </LCCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Province-Specific Calculator Types */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Province-Specific Calculators</h2>
        <p className="text-sm text-slate-600">
          These calculators are available for multiple provinces. Select a province hub above to run them with jurisdiction-specific rules.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {provinceSpecificTypes.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/ca/bc/${calc.slug}`}
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
