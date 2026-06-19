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

export default function ONOvertimeCalculator() {
  const theme = getTheme("ca", "on");
  const [regularRate, setRegularRate] = useState<string>("");
  const [weeklyHours, setWeeklyHours] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    regularPay: number;
    overtimePay: number;
    totalPay: number;
    overtimeHours: number;
  } | null>(null);

  const rule = getRuleFromBundle("on", "overtime");
  const data = rule?.data as Record<string, unknown> | undefined;
  const weeklyThreshold =
    typeof data?.weeklyOvertimeThreshold === "number"
      ? data.weeklyOvertimeThreshold
      : 44;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const rate = parseFloat(regularRate);
    const weekly = parseFloat(weeklyHours);

    if (isNaN(rate) || rate <= 0) {
      setError("Please enter a valid hourly rate greater than 0.");
      setResult(null);
      return;
    }
    if (isNaN(weekly) || weekly < 0) {
      setError("Please enter valid weekly hours worked.");
      setResult(null);
      return;
    }

    const overtimeHours = Math.max(0, weekly - weeklyThreshold);
    const regularHours = weekly - overtimeHours;

    const regularPay = Math.round(regularHours * rate * 100) / 100;
    const overtimePay = Math.round(overtimeHours * rate * 1.5 * 100) / 100;
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
        title="ON Overtime Pay Calculator"
        description="Calculate weekly overtime pay under the Ontario Employment Standards Act."
        icon={ClockIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your hourly rate and total weekly hours to calculate Ontario
          overtime entitlements.
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

        <LCField label="Hours Worked This Week" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value)}
            placeholder="e.g. 50"
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
          <div className="grid gap-4 sm:grid-cols-3">
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
                Ontario overtime applies after {weeklyThreshold} hours in a work
                week. Some industries and professions are exempt from overtime
                provisions.
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
          About Ontario Overtime
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>
            Weekly overtime: 1.5x after {weeklyThreshold} hours in a work week
          </li>
          <li>
            Ontario does not have a general daily overtime threshold (unlike BC
            and Alberta)
          </li>
          <li>Special rules apply to certain industries and job categories</li>
          <li>Based on Ontario ESA §22</li>
        </ul>
      </LCCard>
    </div>
  );
}
