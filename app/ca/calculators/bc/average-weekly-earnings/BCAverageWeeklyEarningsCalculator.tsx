"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCNotice } from "@/app/components/lc/LCNotice";
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCAverageWeeklyEarningsCalculator() {
  const theme = getTheme("ca", "bc");
  const [totalEarnings, setTotalEarnings] = useState<string>("");
  const [weeksCount, setWeeksCount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    averageWeekly: number;
    averageDaily: number;
    annualized: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "average-weekly-earnings");
  const data = rule?.data as Record<string, unknown> | undefined;
  const defaultWeeks =
    typeof data?.defaultWeeks === "number" ? data.defaultWeeks : 12;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const earnings = parseFloat(totalEarnings);
    const weeks = parseFloat(weeksCount);

    if (isNaN(earnings) || earnings < 0) {
      setError("Please enter a valid total earnings amount.");
      setResult(null);
      return;
    }
    if (isNaN(weeks) || weeks <= 0) {
      setError("Please enter a valid number of weeks.");
      setResult(null);
      return;
    }

    const averageWeekly = Math.round((earnings / weeks) * 100) / 100;
    const averageDaily = Math.round((averageWeekly / 5) * 100) / 100;
    const annualized = Math.round(averageWeekly * 52 * 100) / 100;

    setResult({
      averageWeekly,
      averageDaily,
      annualized,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Average Weekly Earnings Calculator"
        description="Calculate average weekly earnings for BC employment standards claims and entitlements."
        icon={ChartBarIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your total earnings and the number of weeks to calculate average
          weekly earnings under BC rules.
        </p>

        <LCField label="Total Earnings (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalEarnings}
            onChange={(e) => setTotalEarnings(e.target.value)}
            placeholder="e.g. 15000"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Number of Weeks" theme={theme}>
          <input
            type="number"
            min="1"
            step="1"
            value={weeksCount}
            onChange={(e) => setWeeksCount(e.target.value)}
            placeholder={`e.g. ${defaultWeeks}`}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <ChartBarIcon className="w-4 h-4" />
          Calculate Average Earnings
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <LCNotice
              label="Average Weekly"
              value={`$${result.averageWeekly.toFixed(2)}`}
              icon={ChartBarIcon}
              theme={theme}
            />
            <LCNotice
              label="Average Daily (5-day)"
              value={`$${result.averageDaily.toFixed(2)}`}
              icon={ChartBarIcon}
              theme={theme}
            />
            <LCNotice
              label="Annualized"
              value={`$${result.annualized.toFixed(2)}`}
              icon={ChartBarIcon}
              theme={theme}
            />
          </div>
        </LCCard>
      )}

      {citations.length > 0 && (
        <LCCard theme={theme} className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentTextIcon
              className="w-4 h-4"
              style={{ color: theme.colors.primary }}
            />
            Applicable Statutes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {citations.map((c, i) => (
              <li key={i}>{c.statute}</li>
            ))}
          </ul>
        </LCCard>
      )}

      {notes.length > 0 && (
        <LCCard theme={theme} className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <InformationCircleIcon className="w-4 h-4 text-blue-500" />
            Notes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </LCCard>
      )}

      <LCCard theme={theme} className="space-y-3">
        <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
          About BC Average Weekly Earnings
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Used for calculating termination pay, vacation pay, and other entitlements</li>
          <li>Typically calculated over the last {defaultWeeks} weeks of employment</li>
          <li>Excludes discretionary bonuses and expense reimbursements</li>
          <li>Based on BC Employment Standards Act §1 and related regulations</li>
        </ul>
      </LCCard>
    </div>
  );
}
