"use client";

import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { defaultTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  GlobeAmericasIcon,
  CalculatorIcon,
  BuildingLibraryIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

import { evictionRules } from "@/app/data/us/evictionRules";
import { securityDepositRules } from "@/app/data/us/securityDepositRules";

export default function Page() {
  const states = Object.entries(evictionRules).map(([key, value]) => ({
    code: key,
    name: value.name,
  }));

  const theme: Theme = defaultTheme;

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto space-y-12">
      <LCSection
        title="United States Legal Calculators"
        description="Browse state-specific legal calculators, eviction rules, security deposit laws, and more for all 50 US states."
        icon={GlobeAmericasIcon}
        theme={theme}
      />

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/us/states">
          <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <MapIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">All States</h3>
                <p className="text-sm text-slate-600">Browse by state</p>
              </div>
            </div>
          </LCCard>
        </Link>

        <Link href="/us/calculators">
          <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <CalculatorIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">Calculators</h3>
                <p className="text-sm text-slate-600">All US calculators</p>
              </div>
            </div>
          </LCCard>
        </Link>

        <Link href="/calculators/us">
          <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <BuildingLibraryIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">State Calculators</h3>
                <p className="text-sm text-slate-600">Calculator index</p>
              </div>
            </div>
          </LCCard>
        </Link>
      </div>

      {/* States Grid */}
      <LCSection
        title="All 50 States"
        description="Select a state to view eviction rules, security deposit laws, and access state-specific calculators."
        icon={MapIcon}
        theme={theme}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {states.map((state) => (
          <LCCard key={state.code} theme={theme} className="space-y-3">
            <h3 className="font-semibold text-slate-800">{state.name}</h3>

            <div className="space-y-2">
              <Link href={`/us/states/${state.code}/eviction`}>
                <LCButton variant="ghost" className="w-full" theme={theme}>
                  Eviction Rules
                </LCButton>
              </Link>

              {state.code in securityDepositRules && (
                <Link href={`/us/states/${state.code}/security-deposit`}>
                  <LCButton variant="ghost" className="w-full" theme={theme}>
                    Security Deposit
                  </LCButton>
                </Link>
              )}

              <Link href={`/calculators/us/${state.code}`}>
                <LCButton variant="primary" className="w-full" theme={theme}>
                  Calculators
                </LCButton>
              </Link>
            </div>
          </LCCard>
        ))}
      </div>
    </main>
  );
}
