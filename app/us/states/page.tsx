"use client"

import Link from "next/link"

import type { Theme } from "@/app/types/Theme"
import { defaultTheme } from "@/app/theme"

import { LCCard } from "@/app/components/lc/LCCard"
import { LCSection } from "@/app/components/lc/LCSection"
import { LCButton } from "@/app/components/lc/LCButton"

import { MapIcon } from "@heroicons/react/24/outline"

import { usStates } from "@/app/config/usStates"

const theme: Theme = defaultTheme

const states = Object.entries(usStates)
  .map(([code, state]) => ({
    code: state.slug,
    name: state.name,
    abbreviation: code.toUpperCase(),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto space-y-12">
      <LCSection
        title="US States"
        description="Choose a state to view calculators, rules, and legal resources."
        icon={MapIcon}
        theme={theme}
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {states.map((state) => (
          <LCCard key={state.code} theme={theme} className="space-y-4 p-6">
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">
                {state.name}
              </h3>
              <p className="text-sm text-slate-500">{state.abbreviation}</p>
            </div>

            <Link href={`/us/states/${state.code}`}>
              <LCButton variant="primary" className="w-full" theme={theme}>
                View State
              </LCButton>
            </Link>
          </LCCard>
        ))}
      </div>

      <footer className="border-t pt-8 text-center text-sm text-slate-500">
        <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
        <p className="mt-2">
          © {new Date().getFullYear()} LegalCals. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
