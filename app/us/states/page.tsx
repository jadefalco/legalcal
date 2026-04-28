"use client";

import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { defaultTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  MapIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";

export default function Page() {
  const states = Object.entries(evictionRules)
    .map(([key, value]) => ({
      code: key,
      name: value.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const theme: Theme = defaultTheme;

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto space-y-12">
      <LCSection
        title="US States Directory"
        description="Browse legal rules and calculators for all 50 states."
        icon={MapIcon}
        theme={theme}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {states.map((state) => (
          <LCCard key={state.code} theme={theme} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">{state.name}</h3>
              <span className="text-xs font-medium text-slate-400 uppercase">
                {state.code}
              </span>
            </div>

            <div className="space-y-2">
              <Link href={`/us/states/${state.code}/eviction`}>
                <LCButton variant="ghost" className="w-full text-sm" theme={theme}>
                  Eviction Rules
                </LCButton>
              </Link>

              {state.code in securityDepositRules && (
                <Link href={`/us/states/${state.code}/security-deposit`}>
                  <LCButton variant="ghost" className="w-full text-sm" theme={theme}>
                    Security Deposit
                  </LCButton>
                </Link>
              )}

              <Link href={`/calculators/us/${state.code}`}>
                <LCButton variant="primary" className="w-full text-sm" theme={theme}>
                  <ArrowRightCircleIcon className="w-4 h-4" />
                  Calculators
                </LCButton>
              </Link>
            </div>
          </LCCard>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>Back to US Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
