"use client"

import Link from "next/link"

import type { Theme } from "@/app/types/Theme"

import { LCCard } from "@/app/components/lc/LCCard"
import { LCSection } from "@/app/components/lc/LCSection"
import { LCButton } from "@/app/components/lc/LCButton"

import {
  GlobeAmericasIcon,
  MapIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

interface Props {
  states: { code: string; name: string }[]
  theme: Theme
  securityDepositStateCodes: string[]
}

export default function PageClient({ states, theme, securityDepositStateCodes }: Props) {
  const securityDepositSet = new Set(securityDepositStateCodes)

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto space-y-20">

      {/* HEADER */}
      <LCSection
        title="United States Legal Calculators"
        description="Select a state to view statute‑accurate notice periods, eviction rules, security deposit laws, and more."
        icon={GlobeAmericasIcon}
        theme={theme}
      />

      {/* QUICK LINKS */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

        <Link href="/calculators/us">
          <LCCard theme={theme} className="p-6 hover:border-blue-300 transition">
            <div className="flex items-center gap-3">
              <CalculatorIcon className="w-7 h-7 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">All US Calculators</h3>
                <p className="text-sm text-slate-600">Browse every calculator</p>
              </div>
            </div>
          </LCCard>
        </Link>

        <Link href="/us/states">
          <LCCard theme={theme} className="p-6 hover:border-blue-300 transition">
            <div className="flex items-center gap-3">
              <MapIcon className="w-7 h-7 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">State Directory</h3>
                <p className="text-sm text-slate-600">All 50 states</p>
              </div>
            </div>
          </LCCard>
        </Link>

        <LCCard theme={theme} className="p-6 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="w-7 h-7 text-slate-400" />
            <div>
              <h3 className="font-semibold text-slate-500">Canada</h3>
              <p className="text-sm text-slate-500">Coming soon</p>
            </div>
          </div>
        </LCCard>

      </div>

      {/* HOW IT WORKS */}
      <section>
        <LCSection
          title="How It Works"
          description="LegalCals simplifies complex legal timelines into clear, statute‑based results."
          icon={ShieldCheckIcon}
          theme={theme}
        />

        <div className="grid gap-6 md:grid-cols-3 mt-8">

          <LCCard theme={theme} className="p-6 space-y-3">
            <MapIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">1. Choose Your State</h3>
            <p className="text-sm text-slate-600">
              Select your jurisdiction to load the correct legal rules.
            </p>
          </LCCard>

          <LCCard theme={theme} className="p-6 space-y-3">
            <CalculatorIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">2. Pick a Calculator</h3>
            <p className="text-sm text-slate-600">
              Notice periods, eviction timelines, security deposits, and more.
            </p>
          </LCCard>

          <LCCard theme={theme} className="p-6 space-y-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">3. Get Statute‑Accurate Results</h3>
            <p className="text-sm text-slate-600">
              All calculations are based on official state statutes.
            </p>
          </LCCard>

        </div>
      </section>

      {/* STATES GRID */}
      <LCSection
        title="All 50 States"
        description="Select a state to view eviction rules, security deposit laws, and access state‑specific calculators."
        icon={MapIcon}
        theme={theme}
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {states.map((state) => (
          <LCCard key={state.code} theme={theme} className="space-y-3 p-6">

            <h3 className="font-semibold text-slate-800 text-lg">{state.name}</h3>

            <div className="space-y-2">

              <Link href={`/us/states/${state.code}/eviction`}>
                <LCButton variant="ghost" className="w-full" theme={theme}>
                  Eviction Rules
                </LCButton>
              </Link>

              {securityDepositSet.has(state.code) && (
                <Link href={`/us/states/${state.code}/security-deposit`}>
                  <LCButton variant="ghost" className="w-full" theme={theme}>
                    Security Deposit
                  </LCButton>
                </Link>
              )}

              <Link href={`/us/states/${state.code}`}>
                <LCButton variant="primary" className="w-full" theme={theme}>
                  Calculators
                </LCButton>
              </Link>

            </div>

          </LCCard>
        ))}

      </div>

      {/* FOOTER */}
      <footer className="border-t pt-8 text-center text-sm text-slate-500">
        <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
        <p className="mt-2">© {new Date().getFullYear()} LegalCals. All rights reserved.</p>
      </footer>

    </main>
  )
}
