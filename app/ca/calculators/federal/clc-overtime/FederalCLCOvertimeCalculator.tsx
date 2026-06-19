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
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function FederalCLCOvertimeCalculator() {
  const theme = getTheme("ca", "federal");
  const [regularRate, setRegularRate] = useState<string>("");
  const [dailyHours, setDailyHours] = useState<string>("");
  const [weeklyHours, setWeeklyHours] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    regularPay: number;
    overtimePay: number;
    totalPay: number;
    overtimeHours: number;
  } | null>(null);

  const rule = getRuleFromBundle("federal", "clc-overtime");
  const data = rule?.data as Record<string, unknown> | undefined;
  const dailyThreshold =
    typeof data?.dailyThreshold === "number" ? data.dailyThreshold : 8;
  const weeklyThreshold =
    typeof data?.weeklyThreshold === "number" ? data.weeklyThreshold : 40;
  const overtimeRate =
    typeof data?.overtimeRate === "number" ? data.overtimeRate : 1.5;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const rate = parseFloat(regularRate);
    const daily = parseFloat(dailyHours);
    const weekly = parseFloat(weeklyHours);

    if (isNaN(rate) || rate <= 0) {
      setError("Please enter a valid hourly rate greater than 0.");
      setResult(null);
      return;
    }
    if (isNaN(daily) || daily < 0) {
      setError("Please enter valid daily hours worked.");
      setResult(null);
      return;
    }
    if (isNaN(weekly) || weekly < 0) {
      setError("Please enter valid weekly hours worked.");
      setResult(null);
      return;
    }

    // Canada Labour Code: OT after 8h/day OR 40h/week, whichever is greater
    const dailyOt = Math.max(0, daily - dailyThreshold);
    const weeklyOt = Math.max(0, weekly - weeklyThreshold);
    const overtimeHours = Math.max(dailyOt, weeklyOt);

    const regularHours = weekly - overtimeHours;
    const regularPay = Math.round(regularHours * rate * 100) / 100;
    const overtimePay = Math.round(overtimeHours * rate * overtimeRate * 100) / 100;
    const totalPay = Math.round((regularPay + overtimePay) * 100) / 100;

    setResult({
      regularPay,
      overtimePay,
      totalPay,
      overtimeHours: Math.round(overtimeHours * 100) / 100,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="Federal Canada Labour Code Overtime Calculator"
        description="Calculate overtime pay for federally regulated industries under the Canada Labour Code."
        icon={ClockIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your hourly rate, daily hours, and weekly hours to calculate
          Canada Labour Code overtime entitlements for federally regulated
          employees.
        </p>

        <LCField label="Regular Hourly Rate (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={regularRate}
            onChange={(e) => setRegularRate(e.target.value)}
            placeholder="e.g. 30.00"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Hours Worked Today" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            placeholder="e.g. 10"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Hours Worked This Week" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value)}
            placeholder="e.g. 45"
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
          <ClockIcon className="w-4 h-4" />
          Calculate CLC Overtime
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <LCNotice
              label="Regular Pay"
              value={`$${result.regularPay.toFixed(2)}`}
              icon={ClockIcon}
              theme={theme}
            />
            <LCNotice
              label={`Overtime Pay (${result.overtimeHours}h @ ${overtimeRate}x)`}
              value={`$${result.overtimePay.toFixed(2)}`}
              icon={ClockIcon}
              theme={theme}
            />
            <LCNotice
              label="Total Pay"
              value={`$${result.totalPay.toFixed(2)}`}
              icon={ClockIcon}
              theme={theme}
            />
          </div>

          {result.overtimeHours > 0 && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Canada Labour Code overtime applies after {dailyThreshold} hours in
                a day OR {weeklyThreshold} hours in a week (whichever is greater).
                Applies to federally regulated industries only.
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
          About Canada Labour Code Overtime
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>Overtime: {overtimeRate}x after {dailyThreshold}h/day or {weeklyThreshold}h/week</li>
          <li>Applies to federally regulated industries (banks, airlines, telecom, etc.)</li>
          <li>Based on Canada Labour Code Part III §169–§177</li>
        </ul>
      </LCCard>
    </div>
  );
}
