"use client";

import { useState } from "react";
import Link from "next/link";
import { LCLegalSummary } from "@/app/components/lc/LCLegalSummary";

import { defaultTheme } from "@/app/theme";
import type { Theme } from "@/app/types/Theme";
import type { Jurisdiction } from "@/app/notice-period/types";

// LC Components
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCJurisdictionSelect } from "@/app/components/lc/LCJurisdictionSelect";

// Icons
import {
  CalculatorIcon,
  ClockIcon,
  BriefcaseIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Jurisdiction theme util
import { JURISDICTION_THEME } from "@/app/utils/jurisdictionTheme";


const legalSummaries: Record<
  string,
  { summary: string; citation: string }
> = {
  bc: {
    summary:
      "In British Columbia, employers must provide written working notice or pay in lieu based on years of service. Additional common‑law notice may apply.",
    citation: "Employment Standards Act (BC), s.63",
  },
  ab: {
    summary:
      "Alberta requires employers to provide minimum statutory notice depending on length of employment. Common‑law notice may exceed statutory minimums.",
    citation: "Employment Standards Code (AB), s.56",
  },
  on: {
    summary:
      "Ontario mandates minimum notice periods based on years of service. Severance pay may also apply for larger employers.",
    citation: "Employment Standards Act (ON), s.57",
  },
  qc: {
    summary:
      "Quebec requires employers to provide reasonable notice of termination based on length of service.",
    citation: "Act Respecting Labour Standards (QC), s.82",
  },
  federal: {
    summary:
      "Federally regulated employees are entitled to minimum notice or pay in lieu, with additional protections for long‑service employees.",
    citation: "Canada Labour Code, s.230(1)",
  },
  us: {
    summary:
      "Most US employment is at‑will, meaning employers may terminate employment without statutory notice unless a contract or state law provides otherwise.",
    citation: "At‑Will Employment Doctrine (varies by state)",
  },
  default: {
    summary:
      "Minimum statutory notice requirements vary by jurisdiction. Additional common‑law notice may apply.",
    citation: "Jurisdiction‑specific employment standards",
  },
};
export default function CalculatorsIndexPage() {
  const theme: Theme = defaultTheme;

  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("bc");

  // Jurisdiction-aware descriptions
  const noticeDescriptions: Record<string, string> = {
    bc: "Uses BC Employment Standards Act s.63 to calculate minimum notice.",
    ab: "Uses Alberta ESC s.56 to determine statutory notice requirements.",
    on: "Uses Ontario ESA s.57 to calculate minimum notice periods.",
    qc: "Uses Quebec ALS s.82 to determine required notice.",
    federal: "Uses Canada Labour Code s.230(1) for federally regulated employees.",
    us: "Uses the at‑will employment doctrine (no statutory notice required).",
    default: "Minimum statutory notice for employee termination.",
  };

  const evictionDescriptions: Record<string, string> = {
    us: "State‑specific eviction timelines including notice, filing, answer, and lockout rules.",
    default: "Eviction timelines are only available for US jurisdictions.",
  };

  // Calculator availability
  const calculatorsForJurisdiction = {
    notice: true,
    eviction: jurisdiction === "us",
    termination: false,
    rent: false,
  };

  const getNoticeDescription = () =>
    noticeDescriptions[jurisdiction] ?? noticeDescriptions.default;

  const getEvictionDescription = () =>
    evictionDescriptions[jurisdiction] ?? evictionDescriptions.default;

  const themeData = JURISDICTION_THEME[jurisdiction] ?? {
    color: "slate",
    icon: "🌐",
    label: "Your Region",
  };

  // Availability summary
  const availableCount =
    (calculatorsForJurisdiction.notice ? 1 : 0) +
    (calculatorsForJurisdiction.eviction ? 1 : 0);

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">

      {/* HEADER */}
      <section className="text-center space-y-4 animate-fadeIn">
        <h1 className="text-4xl font-bold text-slate-900">
          Choose a Calculator
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Select your jurisdiction to see calculators available in your region.
        </p>
      </section>

      {/* JURISDICTION SELECTOR */}
      <section className="max-w-md mx-auto animate-slideUp">
        <LCJurisdictionSelect
          value={jurisdiction}
          onChange={setJurisdiction}
        />
      </section>

      {/* Jurisdiction Header */}
      <section className="text-center space-y-2 animate-fadeIn">
        <div className={`text-${themeData.color}-600 text-4xl`}>
          {themeData.icon}
        </div>
        <h2 className="text-xl font-semibold text-slate-800">
          {themeData.label}
        </h2>
        <p className="text-sm text-slate-500">
          {availableCount} calculator{availableCount !== 1 ? "s" : ""} available in your region
        </p>
      </section>

      {/* Legal Summary */}
<section className="animate-fadeIn">
  <LCLegalSummary
    jurisdiction={jurisdiction}
    summary={
      legalSummaries[jurisdiction]?.summary ??
      legalSummaries.default.summary
    }
    citation={
      legalSummaries[jurisdiction]?.citation ??
      legalSummaries.default.citation
    }
  />
</section>

      {/* CALCULATOR GRID */}
      <section className="grid gap-6 md:grid-cols-2 animate-fadeIn">

        {/* Notice Period */}
        <LCCard theme={theme} className="space-y-3 transition-all hover:scale-[1.02]">
          <BriefcaseIcon className={`w-8 h-8 text-${themeData.color}-600`} />
          <h3 className="font-semibold text-slate-800">Notice Period</h3>
          <p className="text-sm text-slate-600">{getNoticeDescription()}</p>

          <Link href="/notice-period">
            <LCButton variant="ghost" className="w-full" theme={theme}>
              Open Calculator
            </LCButton>
          </Link>
        </LCCard>

        {/* Eviction Timeline */}
        <LCCard theme={theme} className="space-y-3 transition-all hover:scale-[1.02]">
          <ClockIcon className={`w-8 h-8 text-${themeData.color}-600`} />
          <h3 className="font-semibold text-slate-800">Eviction Timeline</h3>
          <p className="text-sm text-slate-600">{getEvictionDescription()}</p>

          {calculatorsForJurisdiction.eviction ? (
            <Link href="/eviction-timeline">
              <LCButton variant="ghost" className="w-full" theme={theme}>
                Open Calculator
              </LCButton>
            </Link>
          ) : (
            <LCButton variant="ghost" className="w-full" theme={theme} disabled>
              Not Available in Your Region
            </LCButton>
          )}
        </LCCard>

        {/* Employment Termination */}
        <LCCard theme={theme} className="space-y-3 opacity-60">
          <CalculatorIcon className={`w-8 h-8 text-${themeData.color}-600`} />
          <h3 className="font-semibold text-slate-800">Employment Termination</h3>
          <p className="text-sm text-slate-600">
            Full termination workflows including severance, ESA rules, and exceptions.
          </p>
          <LCButton variant="ghost" className="w-full" theme={theme} disabled>
            Coming Soon
          </LCButton>
        </LCCard>

        {/* Rent Increase */}
        <LCCard theme={theme} className="space-y-3 opacity-60">
          <DocumentTextIcon className={`w-8 h-8 text-${themeData.color}-600`} />
          <h3 className="font-semibold text-slate-800">Rent Increase Rules</h3>
          <p className="text-sm text-slate-600">
            Provincial and state‑level rent increase limits and notice requirements.
          </p>
          <LCButton variant="ghost" className="w-full" theme={theme} disabled>
            Coming Soon
          </LCButton>
        </LCCard>

      </section>

      {/* CTA */}
      <section className="text-center pt-8 animate-fadeIn">
        <Link href="/">
          <LCButton variant="primary" theme={theme}>
            Back to Home
          </LCButton>
        </Link>
      </section>

    </main>
  );
}