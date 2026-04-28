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

import { evictionRules } from "@/app/data/ca/evictionRules";

export default function Page() {
  const provinces = Object.entries(evictionRules).map(([key, value]) => ({
    code: key,
    name: value.name,
  }));

  const theme: Theme = defaultTheme;

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto space-y-12">
      <LCSection
        title="Canada Legal Calculators"
        description="Browse province-specific legal calculators, eviction rules, notice periods, and more for all 13 provinces and territories."
        icon={GlobeAmericasIcon}
        theme={theme}
      />

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/ca/provinces">
          <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <MapIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">All Provinces</h3>
                <p className="text-sm text-slate-600">Browse by province</p>
              </div>
            </div>
          </LCCard>
        </Link>

        <Link href="/ca/calculators">
          <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <CalculatorIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">Calculators</h3>
                <p className="text-sm text-slate-600">All Canada calculators</p>
              </div>
            </div>
          </LCCard>
        </Link>

        <Link href="/calculators/ca">
          <LCCard theme={theme} className="h-full hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <BuildingLibraryIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-800">Province Calculators</h3>
                <p className="text-sm text-slate-600">Calculator index</p>
              </div>
            </div>
          </LCCard>
        </Link>
      </div>

      {/* Provinces Grid */}
      <LCSection
        title="All 13 Provinces & Territories"
        description="Select a province or territory to view eviction rules and access province-specific calculators."
        icon={MapIcon}
        theme={theme}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {provinces.map((province) => (
          <LCCard key={province.code} theme={theme} className="space-y-3">
            <h3 className="font-semibold text-slate-800">{province.name}</h3>

            <div className="space-y-2">
              <Link href={`/ca/provinces/${province.code}/eviction`}>
                <LCButton variant="ghost" className="w-full" theme={theme}>
                  Eviction Rules
                </LCButton>
              </Link>

              <Link href={`/calculators/ca/${province.code}`}>
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
