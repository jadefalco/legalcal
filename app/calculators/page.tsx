"use client";

import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { defaultTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  CalculatorIcon,
  DocumentTextIcon,
  GlobeAmericasIcon,
  ScaleIcon,
  MapIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function CalculatorsIndexPage() {
  const theme: Theme = defaultTheme;

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto space-y-20">

      {/* HEADER */}
      <LCSection
        title="All Legal Calculators"
        description="Browse every calculator available on LegalCals — organized by category and jurisdiction."
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* CATEGORY GRID */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* Notice Period Calculators */}
        <LCCard theme={theme} className="p-6 space-y-4">
          <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-lg">
            Notice Period Calculators
          </h3>
          <p className="text-sm text-slate-600">
            Calculate residential lease notice periods for all 50 states.
          </p>
          <Link href="/us">
            <LCButton variant="ghost" className="w-full" theme={theme}>
              Browse States
            </LCButton>
          </Link>
        </LCCard>

        {/* Eviction Timeline Calculators */}
        <LCCard theme={theme} className="p-6 space-y-4">
          <ScaleIcon className="w-8 h-8 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-lg">
            Eviction Timeline Calculators
          </h3>
          <p className="text-sm text-slate-600">
            Filing deadlines, answer periods, and lockout rules by state.
          </p>
          <Link href="/eviction-timeline">
            <LCButton variant="ghost" className="w-full" theme={theme}>
              Open Calculator
            </LCButton>
          </Link>
        </LCCard>

        {/* Employment Termination */}
        <LCCard theme={theme} className="p-6 space-y-4">
          <CalculatorIcon className="w-8 h-8 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-lg">
            Employment Termination
          </h3>
          <p className="text-sm text-slate-600">
            Provincial and state‑level notice requirements for employee termination.
          </p>
          <LCButton variant="ghost" className="w-full" theme={theme}>
            Coming Soon
          </LCButton>
        </LCCard>

        {/* Security Deposit Calculators */}
        <LCCard theme={theme} className="p-6 space-y-4">
          <MapIcon className="w-8 h-8 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-lg">
            Security Deposit Calculators
          </h3>
          <p className="text-sm text-slate-600">
            Maximum deposit amounts, return deadlines, and itemization rules.
          </p>
          <Link href="/us/states">
            <LCButton variant="ghost" className="w-full" theme={theme}>
              Browse States
            </LCButton>
          </Link>
        </LCCard>

        {/* State & Province Pages */}
        <LCCard theme={theme} className="p-6 space-y-4">
          <GlobeAmericasIcon className="w-8 h-8 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-lg">
            State & Province Legal Pages
          </h3>
          <p className="text-sm text-slate-600">
            Full legal breakdowns for each jurisdiction, including citations and timelines.
          </p>
          <Link href="/us">
            <LCButton variant="ghost" className="w-full" theme={theme}>
              Browse US States
            </LCButton>
          </Link>
        </LCCard>

        {/* Canada */}
        <Link href="/calculators/ca/bc" className="block">
          <LCCard theme={theme} className="p-6 space-y-4 hover:border-blue-300 transition-colors h-full">
            <GlobeAmericasIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-lg">
              Canada Calculators
            </h3>
            <p className="text-sm text-slate-600">
              British Columbia calculators now available. More provinces coming soon.
            </p>
          </LCCard>
        </Link>

      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold text-slate-900">
          More Calculators Coming Soon
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          LegalCals is expanding rapidly — new tools, new jurisdictions, and new automation
          features are on the way.
        </p>

        <Link href="/us">
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-5 h-5" />
            Browse US States
          </LCButton>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t pt-8 text-center text-sm text-slate-500">
        <p>LegalCals is not legal advice. Always consult a qualified attorney.</p>
        <p className="mt-2">© {new Date().getFullYear()} LegalCals. All rights reserved.</p>
      </footer>

    </main>
  );
}