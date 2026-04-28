"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import { leaseTerminationRules } from "@/app/data/us/leaseTerminationRules";
import type { LeaseTerminationRule } from "@/app/types/LeaseTerminationRules";
import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  ClockIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const toStr = (v: unknown) =>
  v === null ? "Varies" : typeof v === "number" ? `${v}` : String(v);

export default function Page() {
  const stateCode = "mt";
  const rules: LeaseTerminationRule | undefined = leaseTerminationRules[stateCode];
  const theme: Theme = getTheme("us", stateCode);

  if (!rules) {
    return notFound();
  }

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-12">
      <LCSection
        title={"Montana Lease Termination Rules"}
        description="Official notice periods, early termination rules, and legal citations for this state."
        icon={ArrowRightCircleIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Notice Requirements
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <LCNotice
            label="Month-to-Month Notice"
            value={toStr(rules.monthToMonthNoticeDays)}
            icon={ClockIcon}
            theme={theme}
          />

          <LCNotice
            label="Fixed-Term Early Termination"
            value={toStr(rules.fixedTermEarlyTerminationRules)}
            icon={DocumentTextIcon}
            color="text-slate-700"
            theme={theme}
          />
        </div>

        {rules.domesticViolenceProtections && (
          <LCNotice
            label="Domestic Violence Protections"
            value={toStr(rules.domesticViolenceProtections)}
            icon={ShieldCheckIcon}
            color="text-emerald-600"
            theme={theme}
          />
        )}

        {rules.additionalRequirements && (
          <LCNotice
            label="Additional Requirements"
            value={toStr(rules.additionalRequirements)}
            icon={DocumentTextIcon}
            color="text-slate-700"
            theme={theme}
          />
        )}

        {rules.exceptions && (
          <LCNotice
            label="Exceptions"
            value={toStr(rules.exceptions)}
            icon={ExclamationTriangleIcon}
            color="text-amber-600"
            theme={theme}
          />
        )}
      </LCCard>

      {rules.citations.length > 0 && (
        <LCCard theme={theme}>
          <LCSection title="Legal Citations" icon={DocumentTextIcon} theme={theme} />
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1 mt-2">
            {rules.citations.map((citation) => (
              <li key={citation}>{citation}</li>
            ))}
          </ul>
        </LCCard>
      )}

      <div className="flex gap-4">
        <Link href={"/us/calculators/lease-termination"}>
          <LCButton variant="primary" theme={theme}>
            Open Lease Termination Calculator
          </LCButton>
        </Link>

        <Link href="/us">
          <LCButton variant="ghost" theme={theme}>Back to US Index</LCButton>
        </Link>
      </div>
    </main>
  );
}
