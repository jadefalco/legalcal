"use client"

import Link from "next/link"

import type { Theme } from "@/app/types/Theme"

import { LCCard } from "@/app/components/lc/LCCard"
import { LCSection } from "@/app/components/lc/LCSection"
import { LCButton } from "@/app/components/lc/LCButton"

import {
  MapIcon,
  DocumentTextIcon,
  CalculatorIcon,
  ShieldCheckIcon,
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
        title="United States Legal Reference"
        description="Select a state to view eviction rules, security deposit laws, notice periods, and other jurisdiction‑specific legal information."
        icon={MapIcon}
        theme={theme}
      />

      {/* HOW IT WORKS */}
      <section>
        <LCSection
          title="What You'll Find"
          description="Each state page includes statute‑based legal rules and calculators."
          icon={ShieldCheckIcon}
          theme={theme}
        />

        <div className="grid gap-6 md:grid-cols-3 mt-8">

          <LCCard theme={theme} className="p-6 space-y-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Eviction Rules</h3>
            <p className="text-sm text-slate-600">
              Notice requirements, filing timelines, answer deadlines, and lockout rules.
            </p>
          </LCCard>

          <LCCard theme={theme} className="p-6 space-y-3">
            <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Security Deposit Laws</h3>
            <p className="text-sm text-slate-600">
              Maximum deposits, return deadlines, and itemization requirements.
            </p>
          </LCCard>

          <LCCard theme={theme} className="p-6 space-y-3">
            <CalculatorIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">State Calculators</h3>
            <p className="text-sm text-slate-600">
              Notice period calculators and other automated legal tools.
            </p>
          </LCCard>

        </div>
      </section>

      {/* STATES GRID */}
      <LCSection
        title="All 50 States"
        description="Choose a state to view its legal rules and calculators."
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
