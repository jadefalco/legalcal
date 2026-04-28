"use client";

import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { defaultTheme } from "@/app/theme";

// LC Components
import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

// Icons
import {
  ArrowRightCircleIcon,
  ScaleIcon,
  GlobeAmericasIcon,
  DocumentTextIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

export default function Page() {
  const theme: Theme = defaultTheme;

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto space-y-16">

      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Legal Calculators for Every Jurisdiction
        </h1>

        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Fast, accurate, jurisdiction‑aware calculators for notice periods,
          eviction timelines, employment termination, and more. Built for
          landlords, tenants, HR teams, and legal professionals.
        </p>

        <div className="flex justify-center gap-4">
          {/* Start a Calculator → Notice Period */}
          <Link href="/notice-period">
            <LCButton variant="primary" theme={theme}>
              <CalculatorIcon className="w-5 h-5" />
              Start a Calculator
            </LCButton>
          </Link>

          {/* Browse US States */}
          <Link href="/us">
            <LCButton variant="secondary" theme={theme}>
              <GlobeAmericasIcon className="w-5 h-5" />
              Browse US States
            </LCButton>
          </Link>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section>
        <LCSection
          title="What You Can Do"
          description="LegalCals provides fast, accurate, and jurisdiction‑specific calculations for common legal workflows."
          icon={ScaleIcon}
          theme={theme}
        />

        <div className="grid gap-6 md:grid-cols-3 mt-6">

          {/* Eviction Calculators */}
          <LCCard theme={theme} className="space-y-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Eviction Calculators</h3>
            <p className="text-sm text-slate-600">
              Notice periods, filing timelines, answer deadlines, and lockout rules for all 50 states.
            </p>
            <Link href="/eviction-timeline">
              <LCButton variant="ghost" className="w-full" theme={theme}>
                Open Calculator
              </LCButton>
            </Link>
          </LCCard>

          {/* Employment Termination */}
          <LCCard theme={theme} className="space-y-3">
            <CalculatorIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Employment Termination</h3>
            <p className="text-sm text-slate-600">
              Provincial and state‑level notice requirements for employee termination.
            </p>
            <Link href="/termination">
              <LCButton variant="ghost" className="w-full" theme={theme}>
                Coming Soon
              </LCButton>
            </Link>
          </LCCard>

          {/* State & Province Pages */}
          <LCCard theme={theme} className="space-y-3">
            <GlobeAmericasIcon className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-slate-800">State & Province Pages</h3>
            <p className="text-sm text-slate-600">
              Full legal breakdowns for each jurisdiction, including citations and timelines.
            </p>
            <Link href="/us">
              <LCButton variant="ghost" className="w-full" theme={theme}>
                Browse States
              </LCButton>
            </Link>
          </LCCard>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold text-slate-900">
          Expanding Across the US & Canada
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          LegalCals is growing fast. More calculators, more jurisdictions, and more
          automation tools are on the way.
        </p>

        <Link href="/calculators">
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-5 h-5" />
            Explore All Calculators
          </LCButton>
        </Link>
      </section>

    </main>
  );
}