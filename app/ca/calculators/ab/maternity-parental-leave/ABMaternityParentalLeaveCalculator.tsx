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
  HeartIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function ABMaternityParentalLeaveCalculator() {
  const theme = getTheme("ca", "ab");
  const [insurableEarnings, setInsurableEarnings] = useState<string>("");
  const [leaveType, setLeaveType] = useState<"maternity" | "parental" | "both">("both");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    abMaternityWeeks: number;
    abParentalWeeks: number;
    eiWeeklyBenefit: number;
    eiMaxWeeks: number;
    abTotalWeeks: number;
  } | null>(null);

  const rule = getRuleFromBundle("ab", "maternity-parental-leave");
  const data = rule?.data as Record<string, unknown> | undefined;
  const abMaternityWeeks =
    typeof data?.abMaternityWeeks === "number" ? data.abMaternityWeeks : 16;
  const abParentalWeeks =
    typeof data?.abParentalWeeks === "number" ? data.abParentalWeeks : 62;
  const eiBenefitRate =
    typeof data?.eiBenefitRate === "number" ? data.eiBenefitRate : 0.55;
  const eiMaxInsurable =
    typeof data?.eiMaxInsurableEarnings === "number"
      ? data.eiMaxInsurableEarnings
      : 63200;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const earnings = parseFloat(insurableEarnings);

    if (isNaN(earnings) || earnings < 0) {
      setError("Please enter valid insurable earnings.");
      setResult(null);
      return;
    }

    const weeklyEarnings = Math.min(earnings, eiMaxInsurable) / 52;
    const eiWeeklyBenefit =
      Math.round(weeklyEarnings * eiBenefitRate * 100) / 100;

    let abTotalWeeks = 0;
    let eiMaxWeeks = 0;

    if (leaveType === "maternity") {
      abTotalWeeks = abMaternityWeeks;
      eiMaxWeeks = 15;
    } else if (leaveType === "parental") {
      abTotalWeeks = abParentalWeeks;
      eiMaxWeeks = 61;
    } else {
      abTotalWeeks = abMaternityWeeks + abParentalWeeks;
      eiMaxWeeks = 15 + 61;
    }

    setResult({
      abMaternityWeeks,
      abParentalWeeks:
        leaveType === "parental"
          ? abParentalWeeks
          : leaveType === "maternity"
          ? 0
          : abParentalWeeks,
      eiWeeklyBenefit,
      eiMaxWeeks,
      abTotalWeeks,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="AB Maternity & Parental Leave Calculator"
        description="Calculate leave entitlements under Alberta law and estimate EI benefits."
        icon={HeartIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your annual insurable earnings and select leave type to
          calculate Alberta maternity/parental leave entitlements and estimated
          EI benefits.
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

        <LCField label="Leave Type" theme={theme}>
          <select
            value={leaveType}
            onChange={(e) =>
              setLeaveType(e.target.value as "maternity" | "parental" | "both")
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="both">Maternity + Parental</option>
            <option value="maternity">Maternity Only</option>
            <option value="parental">Parental Only</option>
          </select>
        </LCField>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <HeartIcon className="w-4 h-4" />
          Calculate Leave & Benefits
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.abMaternityWeeks > 0 && (
              <LCNotice
                label="AB Maternity Leave"
                value={`${result.abMaternityWeeks} weeks`}
                icon={HeartIcon}
                theme={theme}
              />
            )}
            {result.abParentalWeeks > 0 && (
              <LCNotice
                label="AB Parental Leave"
                value={`${result.abParentalWeeks} weeks`}
                icon={HeartIcon}
                theme={theme}
              />
            )}
            <LCNotice
              label="Est. EI Weekly Benefit"
              value={`$${result.eiWeeklyBenefit.toFixed(2)}`}
              icon={HeartIcon}
              theme={theme}
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Total AB Leave Entitlement
              </span>
              <span className="text-xl font-bold text-slate-900">
                {result.abTotalWeeks} weeks
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              EI benefits are federal, not provincial. Alberta provides
              job-protected leave; EI provides income replacement. EI maximum is
              capped at ${(eiMaxInsurable / 52 * eiBenefitRate).toFixed(2)}/week
              based on {new Date().getFullYear()} maximum insurable earnings.
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
          About Alberta Maternity & Parental Leave
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>AB maternity leave: up to {abMaternityWeeks} weeks (ESA-protected)</li>
          <li>AB parental leave: up to {abParentalWeeks} weeks</li>
          <li>EI maternity benefits: up to 15 weeks at {Math.round(eiBenefitRate * 100)}%</li>
          <li>EI parental benefits: up to 40 weeks (standard) or 69 weeks (extended)</li>
          <li>Based on Alberta Employment Standards Code §44–§53 and federal EI Act</li>
        </ul>
      </LCCard>
    </div>
  );
}
