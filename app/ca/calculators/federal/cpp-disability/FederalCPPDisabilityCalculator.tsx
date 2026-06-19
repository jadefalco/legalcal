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
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function FederalCPPDisabilityCalculator() {
  const theme = getTheme("ca", "federal");
  const [avgMonthlyEarnings, setAvgMonthlyEarnings] = useState<string>("");
  const [contributionYears, setContributionYears] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    monthlyBenefit: number;
    annualBenefit: number;
    flatPortion: number;
    earningsPortion: number;
    eligible: boolean;
  } | null>(null);

  const rule = getRuleFromBundle("federal", "cpp-disability");
  const data = rule?.data as Record<string, unknown> | undefined;
  const flatPortion =
    typeof data?.flatPortion === "number" ? data.flatPortion : 583.32;
  const maxMonthly =
    typeof data?.maxMonthly === "number" ? data.maxMonthly : 1606.78;
  const maxYears =
    typeof data?.maxContributionYears === "number" ? data.maxContributionYears : 39;
  const minYearsRequired =
    typeof data?.minYearsRequired === "number" ? data.minYearsRequired : 4;
  const maxAge =
    typeof data?.maxAge === "number" ? data.maxAge : 65;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const earnings = parseFloat(avgMonthlyEarnings);
    const years = parseFloat(contributionYears);
    const applicantAge = parseFloat(age);

    if (isNaN(earnings) || earnings < 0) {
      setError("Please enter valid average monthly earnings.");
      setResult(null);
      return;
    }
    if (isNaN(years) || years < 0) {
      setError("Please enter valid contribution years.");
      setResult(null);
      return;
    }
    if (isNaN(applicantAge) || applicantAge < 18 || applicantAge > maxAge) {
      setError(`Age must be between 18 and ${maxAge}.`);
      setResult(null);
      return;
    }

    const eligible = years >= minYearsRequired && applicantAge < maxAge;
    const earningsRatio = years / maxYears;
    const earningsPortion = eligible
      ? Math.round(earnings * 0.25 * earningsRatio * 100) / 100
      : 0;
    const monthlyBenefit = eligible
      ? Math.min(
          Math.round((flatPortion + earningsPortion) * 100) / 100,
          maxMonthly
        )
      : 0;
    const annualBenefit = Math.round(monthlyBenefit * 12 * 100) / 100;

    setResult({
      monthlyBenefit,
      annualBenefit,
      flatPortion: eligible ? flatPortion : 0,
      earningsPortion: eligible ? earningsPortion : 0,
      eligible,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="Federal CPP Disability Benefits Calculator"
        description="Estimate Canada Pension Plan disability benefit entitlements under federal law."
        icon={DocumentTextIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your average monthly earnings, contribution years, and age to
          estimate your CPP disability benefits.
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

        <LCField label="Years of CPP Contributions" theme={theme}>
          <input
            type="number"
            min="0"
            max={maxYears}
            step="1"
            value={contributionYears}
            onChange={(e) => setContributionYears(e.target.value)}
            placeholder={`e.g. 10 (min ${minYearsRequired})`}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Current Age" theme={theme}>
          <input
            type="number"
            min="18"
            max={maxAge}
            step="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder={`e.g. 45 (under ${maxAge})`}
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
          <DocumentTextIcon className="w-4 h-4" />
          Calculate CPP Disability
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Eligible"
              value={result.eligible ? "Yes" : "No"}
              icon={DocumentTextIcon}
              theme={theme}
            />
            <LCNotice
              label="Monthly Benefit"
              value={`$${result.monthlyBenefit.toFixed(2)}`}
              icon={DocumentTextIcon}
              theme={theme}
            />
            <LCNotice
              label="Annual Benefit"
              value={`$${result.annualBenefit.toFixed(2)}`}
              icon={DocumentTextIcon}
              theme={theme}
            />
          </div>

          {result.eligible && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  Flat Portion
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  ${result.flatPortion.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  Earnings Portion
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  ${result.earningsPortion.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {result.monthlyBenefit === maxMonthly && result.eligible && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Maximum CPP disability benefit reached for {new Date().getFullYear()}.
              </p>
            </div>
          )}

          {!result.eligible && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                You may not qualify for CPP disability benefits. You need at
                least {minYearsRequired} years of contributions and must be under
                age {maxAge}.
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
          About CPP Disability Benefits
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Flat portion: ${flatPortion.toFixed(2)} + earnings-related amount</li>
          <li>Maximum monthly benefit: ${maxMonthly.toFixed(2)}</li>
          <li>Minimum {minYearsRequired} years of contributions required</li>
          <li>Must be under age {maxAge} and have a severe/prolonged disability</li>
          <li>Based on CPP Act §§42–44.1</li>
        </ul>
      </LCCard>
    </div>
  );
}
