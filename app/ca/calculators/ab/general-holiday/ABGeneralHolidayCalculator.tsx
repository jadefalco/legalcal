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
  StarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function ABGeneralHolidayCalculator() {
  const theme = getTheme("ca", "ab");
  const [totalWages4Weeks, setTotalWages4Weeks] = useState<string>("");
  const [daysWorked4Weeks, setDaysWorked4Weeks] = useState<string>("");
  const [hoursWorkedHoliday, setHoursWorkedHoliday] = useState<string>("");
  const [workedBeforeAfter, setWorkedBeforeAfter] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    averageDailyWage: number;
    holidayPay: number;
    workedPay: number;
    totalPay: number;
    eligible: boolean;
  } | null>(null);

  const rule = getRuleFromBundle("ab", "general-holiday");
  const data = rule?.data as Record<string, unknown> | undefined;
  const divisorDays =
    typeof data?.averageDailyWageDivisor === "number"
      ? data.averageDailyWageDivisor
      : 20;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const wages = parseFloat(totalWages4Weeks);
    const daysWorked = parseFloat(daysWorked4Weeks);
    const holidayHours = parseFloat(hoursWorkedHoliday || "0");
    const regularRate = daysWorked > 0 ? wages / (daysWorked * 8) : 0;

    if (isNaN(wages) || wages < 0) {
      setError("Please enter valid total wages.");
      setResult(null);
      return;
    }
    if (isNaN(daysWorked) || daysWorked <= 0) {
      setError("Please enter valid days worked.");
      setResult(null);
      return;
    }

    const averageDailyWage =
      Math.round((wages / Math.max(daysWorked, divisorDays)) * 100) / 100;
    const eligible = workedBeforeAfter;

    let workedPay = 0;
    if (holidayHours > 0 && regularRate > 0) {
      workedPay = Math.round(holidayHours * regularRate * 1.5 * 100) / 100;
    }

    const holidayPay = eligible ? averageDailyWage : 0;
    const totalPay = Math.round((holidayPay + workedPay) * 100) / 100;

    setResult({
      averageDailyWage,
      holidayPay,
      workedPay,
      totalPay,
      eligible,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="AB General Holiday Pay Calculator"
        description="Calculate general holiday pay eligibility and entitlements under the Alberta Employment Standards Code."
        icon={StarIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your wages, days worked in the last 4 weeks, and holiday work
          details to calculate Alberta general holiday pay.
        </p>

        <LCField label="Total Wages in Last 4 Weeks (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalWages4Weeks}
            onChange={(e) => setTotalWages4Weeks(e.target.value)}
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
            value={daysWorked4Weeks}
            onChange={(e) => setDaysWorked4Weeks(e.target.value)}
            placeholder="e.g. 20"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Hours Worked on Holiday (if any)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={hoursWorkedHoliday}
            onChange={(e) => setHoursWorkedHoliday(e.target.value)}
            placeholder="e.g. 8"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="workedBeforeAfter"
            checked={workedBeforeAfter}
            onChange={(e) => setWorkedBeforeAfter(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="workedBeforeAfter"
            className="text-sm text-slate-700"
          >
            Worked the scheduled day before and after the holiday
          </label>
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <StarIcon className="w-4 h-4" />
          Calculate Holiday Pay
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Eligible"
              value={result.eligible ? "Yes" : "No"}
              icon={result.eligible ? CheckCircleIcon : ExclamationTriangleIcon}
              theme={theme}
            />
            <LCNotice
              label="Average Daily Wage"
              value={`$${result.averageDailyWage.toFixed(2)}`}
              icon={StarIcon}
              theme={theme}
            />
            <LCNotice
              label="Total Holiday Pay"
              value={`$${result.totalPay.toFixed(2)}`}
              icon={StarIcon}
              theme={theme}
            />
          </div>

          {result.workedPay > 0 && (
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Worked Holiday Premium
              </span>
              <p className="text-sm font-semibold text-slate-800">
                ${result.workedPay.toFixed(2)} (1.5x rate for hours worked)
              </p>
            </div>
          )}

          {!result.eligible && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Not eligible for general holiday pay. You must work the
                scheduled day before and after the holiday (unless exempt).
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
          About Alberta General Holiday Pay
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>
            Must work the scheduled day before and after the holiday to be
            eligible
          </li>
          <li>
            Average daily wage = total wages in 4 weeks ÷ {divisorDays} (or days
            worked)
          </li>
          <li>If worked: 1.5x regular wage + average daily wage</li>
          <li>If not worked: average daily wage</li>
          <li>Based on Alberta Employment Standards Code §25–§32</li>
        </ul>
      </LCCard>
    </div>
  );
}
