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
  BanknotesIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function FederalCPPRetirementCalculator() {
  const theme = getTheme("ca", "federal");
  const [avgMonthlyEarnings, setAvgMonthlyEarnings] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [contributionYears, setContributionYears] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    monthlyPension: number;
    annualPension: number;
    adjustmentPercent: number;
    fullPensionAt65: number;
  } | null>(null);

  const rule = getRuleFromBundle("federal", "cpp-retirement");
  const data = rule?.data as Record<string, unknown> | undefined;
  const maxMonthlyAt65 =
    typeof data?.maxMonthlyAt65 === "number" ? data.maxMonthlyAt65 : 1364.6;
  const maxYears =
    typeof data?.maxContributionYears === "number" ? data.maxContributionYears : 39;
  const reductionBefore65 =
    typeof data?.reductionBefore65 === "number" ? data.reductionBefore65 : 0.006;
  const increaseAfter65 =
    typeof data?.increaseAfter65 === "number" ? data.increaseAfter65 : 0.007;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const earnings = parseFloat(avgMonthlyEarnings);
    const pensionAge = parseFloat(age);
    const years = parseFloat(contributionYears);

    if (isNaN(earnings) || earnings < 0) {
      setError("Please enter valid average monthly earnings.");
      setResult(null);
      return;
    }
    if (isNaN(pensionAge) || pensionAge < 60 || pensionAge > 70) {
      setError("Please enter an age between 60 and 70.");
      setResult(null);
      return;
    }
    if (isNaN(years) || years < 0) {
      setError("Please enter valid contribution years.");
      setResult(null);
      return;
    }

    // Simplified calculation: earnings-based portion scaled by contribution years
    const earningsRatio = Math.min(earnings / (maxMonthlyAt65 * 12 / maxYears), 1);
    const fullPensionAt65 = Math.round(maxMonthlyAt65 * (years / maxYears) * 100) / 100;

    let adjustmentPercent = 0;
    if (pensionAge < 65) {
      adjustmentPercent = -(65 - pensionAge) * 12 * reductionBefore65 * 100;
    } else if (pensionAge > 65) {
      adjustmentPercent = (pensionAge - 65) * 12 * increaseAfter65 * 100;
    }

    const adjustmentFactor = 1 + adjustmentPercent / 100;
    const monthlyPension = Math.round(fullPensionAt65 * adjustmentFactor * 100) / 100;
    const annualPension = Math.round(monthlyPension * 12 * 100) / 100;

    setResult({
      monthlyPension,
      annualPension,
      adjustmentPercent: Math.round(adjustmentPercent * 100) / 100,
      fullPensionAt65,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="Federal CPP Retirement Pension Calculator"
        description="Estimate Canada Pension Plan retirement pension benefits under federal law."
        icon={BanknotesIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your average monthly earnings, planned retirement age, and
          contribution years to estimate your CPP retirement pension.
        </p>

        <LCField label="Average Monthly Earnings (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={avgMonthlyEarnings}
            onChange={(e) => setAvgMonthlyEarnings(e.target.value)}
            placeholder="e.g. 4500"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Age When Starting Pension" theme={theme}>
          <input
            type="number"
            min="60"
            max="70"
            step="0.5"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 65"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Years of CPP Contributions" theme={theme}>
          <input
            type="number"
            min="0"
            max={maxYears}
            step="1"
            value={contributionYears}
            onChange={(e) => setContributionYears(e.target.value)}
            placeholder={`e.g. 25 (max ${maxYears})`}
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
          <BanknotesIcon className="w-4 h-4" />
          Calculate CPP Pension
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Monthly Pension"
              value={`$${result.monthlyPension.toFixed(2)}`}
              icon={BanknotesIcon}
              theme={theme}
            />
            <LCNotice
              label="Annual Pension"
              value={`$${result.annualPension.toFixed(2)}`}
              icon={BanknotesIcon}
              theme={theme}
            />
            <LCNotice
              label="Age Adjustment"
              value={`${result.adjustmentPercent > 0 ? "+" : ""}${result.adjustmentPercent.toFixed(1)}%`}
              icon={BanknotesIcon}
              theme={theme}
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-lg space-y-1">
            <span className="text-xs uppercase tracking-wide text-slate-500">
              Pension at Age 65 (Reference)
            </span>
            <p className="text-sm font-semibold text-slate-800">
              ${result.fullPensionAt65.toFixed(2)}/month
            </p>
          </div>

          {parseFloat(age) < 65 && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Taking CPP before 65 reduces your pension by {Math.round(reductionBefore65 * 100 * 100) / 100}% per month (max 36%).
              </p>
            </div>
          )}

          {parseFloat(age) > 65 && (
            <div className="p-3 bg-green-50 rounded-lg flex items-start gap-2">
              <InformationCircleIcon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                Taking CPP after 65 increases your pension by {Math.round(increaseAfter65 * 100 * 100) / 100}% per month (max 42%).
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
          About CPP Retirement Pension
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Maximum monthly at 65: ${maxMonthlyAt65.toFixed(2)}</li>
          <li>Can start as early as 60 (reduced) or as late as 70 (increased)</li>
          <li>Reduction: {Math.round(reductionBefore65 * 100 * 100) / 100}% per month before 65</li>
          <li>Increase: {Math.round(increaseAfter65 * 100 * 100) / 100}% per month after 65</li>
          <li>Based on CPP Act §§45–56</li>
        </ul>
      </LCCard>
    </div>
  );
}
