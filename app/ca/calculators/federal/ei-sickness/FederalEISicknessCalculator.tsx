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
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function FederalEISicknessCalculator() {
  const theme = getTheme("ca", "federal");
  const [insurableEarnings, setInsurableEarnings] = useState<string>("");
  const [weeksWorked, setWeeksWorked] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weeklyBenefit: number;
    totalBenefit: number;
    maxWeeks: number;
    avgWeeklyEarnings: number;
  } | null>(null);

  const rule = getRuleFromBundle("federal", "ei-sickness");
  const data = rule?.data as Record<string, unknown> | undefined;
  const benefitRate =
    typeof data?.benefitRate === "number" ? data.benefitRate : 0.55;
  const maxWeeklyBenefit =
    typeof data?.maxWeeklyBenefit === "number" ? data.maxWeeklyBenefit : 668;
  const maxWeeks =
    typeof data?.maxWeeks === "number" ? data.maxWeeks : 26;
  const minWeeksRequired =
    typeof data?.minWeeksRequired === "number" ? data.minWeeksRequired : 20;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const earnings = parseFloat(insurableEarnings);
    const weeks = parseFloat(weeksWorked);

    if (isNaN(earnings) || earnings < 0) {
      setError("Please enter valid annual insurable earnings.");
      setResult(null);
      return;
    }
    if (isNaN(weeks) || weeks < 0) {
      setError("Please enter valid weeks worked in the qualifying period.");
      setResult(null);
      return;
    }
    if (weeks < minWeeksRequired) {
      setError(
        `You must have worked at least ${minWeeksRequired} insurable weeks to qualify for EI sickness benefits.`
      );
      setResult(null);
      return;
    }

    const avgWeekly = earnings / 52;
    const weeklyBenefit = Math.min(
      Math.round(avgWeekly * benefitRate * 100) / 100,
      maxWeeklyBenefit
    );
    const totalBenefit = Math.round(weeklyBenefit * maxWeeks * 100) / 100;

    setResult({
      weeklyBenefit,
      totalBenefit,
      maxWeeks,
      avgWeeklyEarnings: Math.round(avgWeekly * 100) / 100,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="Federal EI Sickness Benefits Calculator"
        description="Calculate Employment Insurance sickness benefit entitlements under federal law."
        icon={ShieldExclamationIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your annual insurable earnings and weeks worked to estimate your
          federal EI sickness benefits.
        </p>

        <LCField label="Annual Insurable Earnings (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={insurableEarnings}
            onChange={(e) => setInsurableEarnings(e.target.value)}
            placeholder="e.g. 55000"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Insurable Weeks Worked (last 52)" theme={theme}>
          <input
            type="number"
            min="0"
            max="52"
            step="1"
            value={weeksWorked}
            onChange={(e) => setWeeksWorked(e.target.value)}
            placeholder={`e.g. 35 (min ${minWeeksRequired})`}
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
          <ShieldExclamationIcon className="w-4 h-4" />
          Calculate Sickness Benefits
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Avg Weekly Earnings"
              value={`$${result.avgWeeklyEarnings.toFixed(2)}`}
              icon={ShieldExclamationIcon}
              theme={theme}
            />
            <LCNotice
              label="Weekly Benefit"
              value={`$${result.weeklyBenefit.toFixed(2)}`}
              icon={ShieldExclamationIcon}
              theme={theme}
            />
            <LCNotice
              label="Max Weeks"
              value={`${result.maxWeeks}`}
              icon={ShieldExclamationIcon}
              theme={theme}
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Total Estimated Benefit
              </span>
              <span className="text-xl font-bold text-slate-900">
                ${result.totalBenefit.toFixed(2)}
              </span>
            </div>
          </div>

          {result.weeklyBenefit === maxWeeklyBenefit && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Maximum weekly benefit reached. EI sickness benefits are capped
                at ${maxWeeklyBenefit.toFixed(2)} per week for {new Date().getFullYear()}.
              </p>
            </div>
          )}
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
          About EI Sickness Benefits
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Up to {maxWeeks} weeks of benefits</li>
          <li>{Math.round(benefitRate * 100)}% of average weekly insurable earnings</li>
          <li>Maximum weekly benefit: ${maxWeeklyBenefit.toFixed(2)}</li>
          <li>Minimum {minWeeksRequired} insurable weeks required</li>
          <li>Medical certificate required</li>
          <li>Based on Employment Insurance Act §18–§23.1</li>
        </ul>
      </LCCard>
    </div>
  );
}
