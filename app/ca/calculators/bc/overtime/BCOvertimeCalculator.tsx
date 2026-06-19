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

export default function BCOvertimeCalculator() {
  const theme = getTheme("ca", "bc");
  const [regularRate, setRegularRate] = useState<string>("");
  const [hoursWorked, setHoursWorked] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    regularPay: number;
    overtimePay: number;
    doubleTimePay: number;
    totalPay: number;
    overtimeHours: number;
    doubleTimeHours: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "overtime");
  const data = rule?.data as Record<string, unknown> | undefined;
  const dailyThreshold =
    typeof data?.dailyOvertimeThreshold === "number"
      ? data.dailyOvertimeThreshold
      : 8;
  const doubleThreshold =
    typeof data?.doubleTimeThreshold === "number"
      ? data.doubleTimeThreshold
      : 12;
  const weeklyThreshold =
    typeof data?.weeklyOvertimeThreshold === "number"
      ? data.weeklyOvertimeThreshold
      : 40;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const rate = parseFloat(regularRate);
    const hours = parseFloat(hoursWorked);

    if (isNaN(rate) || rate <= 0) {
      setError("Please enter a valid hourly rate greater than 0.");
      setResult(null);
      return;
    }
    if (isNaN(hours) || hours < 0) {
      setError("Please enter a valid number of hours worked.");
      setResult(null);
      return;
    }

    let regularHours = Math.min(hours, dailyThreshold);
    let overtimeHours = 0;
    let doubleTimeHours = 0;

    if (hours > doubleThreshold) {
      overtimeHours = doubleThreshold - dailyThreshold;
      doubleTimeHours = hours - doubleThreshold;
    } else if (hours > dailyThreshold) {
      overtimeHours = hours - dailyThreshold;
    }

    const regularPay = Math.round(regularHours * rate * 100) / 100;
    const overtimePay = Math.round(overtimeHours * rate * 1.5 * 100) / 100;
    const doubleTimePay = Math.round(doubleTimeHours * rate * 2 * 100) / 100;
    const totalPay =
      Math.round((regularPay + overtimePay + doubleTimePay) * 100) / 100;

    setResult({
      regularPay,
      overtimePay,
      doubleTimePay,
      totalPay,
      overtimeHours: Math.round(overtimeHours * 100) / 100,
      doubleTimeHours: Math.round(doubleTimeHours * 100) / 100,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Overtime Calculator"
        description="Calculate daily overtime pay under the BC Employment Standards Act."
        icon={ClockIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your regular hourly rate and total hours worked in a day to
          calculate BC overtime entitlements.
        </p>

        <LCField label="Regular Hourly Rate (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={regularRate}
            onChange={(e) => setRegularRate(e.target.value)}
            placeholder="e.g. 25.00"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Hours Worked in Day" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            placeholder="e.g. 10.5"
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
          Calculate Overtime Pay
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Regular Pay"
              value={`$${result.regularPay.toFixed(2)}`}
              icon={ClockIcon}
              theme={theme}
            />
            <LCNotice
              label={`Overtime Pay (${result.overtimeHours}h @ 1.5x)`}
              value={`$${result.overtimePay.toFixed(2)}`}
              icon={ClockIcon}
              theme={theme}
            />
            <LCNotice
              label={`Double Time (${result.doubleTimeHours}h @ 2x)`}
              value={`$${result.doubleTimePay.toFixed(2)}`}
              icon={ClockIcon}
              theme={theme}
            />
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Total Pay
              </span>
              <span className="text-xl font-bold text-slate-900">
                ${result.totalPay.toFixed(2)}
              </span>
            </div>
          </div>

          {result.doubleTimeHours > 0 && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Double time applies after {doubleThreshold} hours in a day under
                BC law.
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
          About BC Overtime
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>
            Daily overtime: 1.5x after {dailyThreshold} hours, 2x after{" "}
            {doubleThreshold} hours
          </li>
          <li>
            Weekly overtime: 1.5x after {weeklyThreshold} hours (if no daily
            OT applied)
          </li>
          <li>Based on BC Employment Standards Act §35–§40</li>
        </ul>
      </LCCard>
    </div>
  );
}
