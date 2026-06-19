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

export default function ABAverageDailyWageCalculator() {
  const theme = getTheme("ca", "ab");
  const [totalEarnings, setTotalEarnings] = useState<string>("");
  const [daysWorked, setDaysWorked] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    averageDailyWage: number;
    averageWeeklyWage: number;
    divisorUsed: number;
  } | null>(null);

  const rule = getRuleFromBundle("ab", "average-daily-wage");
  const data = rule?.data as Record<string, unknown> | undefined;
  const defaultDivisor =
    typeof data?.defaultDivisor === "number" ? data.defaultDivisor : 20;
  const lookbackWeeks =
    typeof data?.lookbackWeeks === "number" ? data.lookbackWeeks : 4;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const earnings = parseFloat(totalEarnings);
    const days = parseFloat(daysWorked);

    if (isNaN(earnings) || earnings < 0) {
      setError("Please enter a valid total earnings amount.");
      setResult(null);
      return;
    }
    if (isNaN(days) || days <= 0) {
      setError("Please enter a valid number of days worked.");
      setResult(null);
      return;
    }

    const divisorUsed = Math.max(days, defaultDivisor);
    const averageDailyWage =
      Math.round((earnings / divisorUsed) * 100) / 100;
    const averageWeeklyWage = Math.round(averageDailyWage * 5 * 100) / 100;

    setResult({
      averageDailyWage,
      averageWeeklyWage,
      divisorUsed,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="AB Average Daily Wage Calculator"
        description="Calculate average daily wage for Alberta general holiday pay and other employment standards claims."
        icon={ChartBarIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your total earnings and days worked in the last {lookbackWeeks}{" "}
          weeks to calculate your Alberta average daily wage.
        </p>

        <LCField label={`Total Earnings in Last ${lookbackWeeks} Weeks (CAD)`} theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalEarnings}
            onChange={(e) => setTotalEarnings(e.target.value)}
            placeholder="e.g. 3000"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Days Worked in Last 4 Weeks" theme={theme}>
          <input
            type="number"
            min="0"
            max="28"
            step="1"
            value={daysWorked}
            onChange={(e) => setDaysWorked(e.target.value)}
            placeholder="e.g. 20"
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
          Calculate Average Daily Wage
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <LCNotice
              label="Average Daily Wage"
              value={`$${result.averageDailyWage.toFixed(2)}`}
              icon={ChartBarIcon}
              theme={theme}
            />
            <LCNotice
              label="Average Weekly Wage (5-day)"
              value={`$${result.averageWeeklyWage.toFixed(2)}`}
              icon={ChartBarIcon}
              theme={theme}
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-lg space-y-1">
            <span className="text-xs uppercase tracking-wide text-slate-500">
              Calculation Method
            </span>
            <p className="text-sm font-semibold text-slate-800">
              Total earnings ÷ {result.divisorUsed} days (using the greater of
              days worked or {defaultDivisor})
            </p>
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
          About Alberta Average Daily Wage
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Used for general holiday pay calculations</li>
          <li>
            Calculated over the {lookbackWeeks} weeks immediately preceding the
            general holiday
          </li>
          <li>
            Divisor is the greater of {defaultDivisor} or the number of days
            worked
          </li>
          <li>Based on Alberta Employment Standards Code §25, §26</li>
        </ul>
      </LCCard>
    </div>
  );
}
