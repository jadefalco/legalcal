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
  UsersIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function FederalEIParentalCalculator() {
  const theme = getTheme("ca", "federal");
  const [insurableEarnings, setInsurableEarnings] = useState<string>("");
  const [weeksWorked, setWeeksWorked] = useState<string>("");
  const [benefitType, setBenefitType] = useState<"standard" | "extended">("standard");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weeklyBenefit: number;
    totalBenefit: number;
    maxWeeks: number;
    avgWeeklyEarnings: number;
    benefitRate: number;
  } | null>(null);

  const rule = getRuleFromBundle("federal", "ei-parental");
  const data = rule?.data as Record<string, unknown> | undefined;
  const standardRate =
    typeof data?.standardBenefitRate === "number" ? data.standardBenefitRate : 0.55;
  const extendedRate =
    typeof data?.extendedBenefitRate === "number" ? data.extendedBenefitRate : 0.33;
  const maxWeeklyStandard =
    typeof data?.maxWeeklyStandard === "number" ? data.maxWeeklyStandard : 668;
  const maxWeeklyExtended =
    typeof data?.maxWeeklyExtended === "number" ? data.maxWeeklyExtended : 401;
  const maxWeeksStandard =
    typeof data?.maxWeeksStandard === "number" ? data.maxWeeksStandard : 40;
  const maxWeeksExtended =
    typeof data?.maxWeeksExtended === "number" ? data.maxWeeksExtended : 69;
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
        `You must have worked at least ${minWeeksRequired} insurable weeks to qualify for EI parental benefits.`
      );
      setResult(null);
      return;
    }

    const rate = benefitType === "standard" ? standardRate : extendedRate;
    const maxWeekly = benefitType === "standard" ? maxWeeklyStandard : maxWeeklyExtended;
    const maxWeeks = benefitType === "standard" ? maxWeeksStandard : maxWeeksExtended;

    const avgWeekly = earnings / 52;
    const weeklyBenefit = Math.min(
      Math.round(avgWeekly * rate * 100) / 100,
      maxWeekly
    );
    const totalBenefit = Math.round(weeklyBenefit * maxWeeks * 100) / 100;

    setResult({
      weeklyBenefit,
      totalBenefit,
      maxWeeks,
      avgWeeklyEarnings: Math.round(avgWeekly * 100) / 100,
      benefitRate: rate,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="Federal EI Parental Benefits Calculator"
        description="Calculate Employment Insurance parental benefit entitlements under federal law."
        icon={UsersIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your annual insurable earnings, weeks worked, and select a
          benefit option to estimate your federal EI parental benefits.
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

        <LCField label="Benefit Option" theme={theme}>
          <select
            value={benefitType}
            onChange={(e) =>
              setBenefitType(e.target.value as "standard" | "extended")
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="standard">
              Standard ({Math.round(standardRate * 100)}%, up to {maxWeeksStandard} weeks)
            </option>
            <option value="extended">
              Extended ({Math.round(extendedRate * 100)}%, up to {maxWeeksExtended} weeks)
            </option>
          </select>
        </LCField>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <UsersIcon className="w-4 h-4" />
          Calculate Parental Benefits
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Avg Weekly Earnings"
              value={`$${result.avgWeeklyEarnings.toFixed(2)}`}
              icon={UsersIcon}
              theme={theme}
            />
            <LCNotice
              label={`Weekly Benefit (${Math.round(result.benefitRate * 100)}%)`}
              value={`$${result.weeklyBenefit.toFixed(2)}`}
              icon={UsersIcon}
              theme={theme}
            />
            <LCNotice
              label="Max Weeks"
              value={`${result.maxWeeks}`}
              icon={UsersIcon}
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

          {result.weeklyBenefit ===
            (benefitType === "standard" ? maxWeeklyStandard : maxWeeklyExtended) && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Maximum weekly benefit reached for the {benefitType} option.
                EI parental benefits are capped at ${benefitType === "standard" ? maxWeeklyStandard.toFixed(2) : maxWeeklyExtended.toFixed(2)} per week for {new Date().getFullYear()}.
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
          About EI Parental Benefits
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Standard: {Math.round(standardRate * 100)}% for up to {maxWeeksStandard} weeks</li>
          <li>Extended: {Math.round(extendedRate * 100)}% for up to {maxWeeksExtended} weeks</li>
          <li>Maximum weekly benefit: ${maxWeeklyStandard.toFixed(2)} (standard) / ${maxWeeklyExtended.toFixed(2)} (extended)</li>
          <li>Minimum {minWeeksRequired} insurable weeks required</li>
          <li>Based on Employment Insurance Act §12–§23</li>
        </ul>
      </LCCard>
    </div>
  );
}
