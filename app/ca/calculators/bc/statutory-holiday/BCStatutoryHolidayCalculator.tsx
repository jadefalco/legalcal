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
} from "@heroicons/react/24/outline";

export default function BCStatutoryHolidayCalculator() {
  const theme = getTheme("ca", "bc");
  const [totalWages30Days, setTotalWages30Days] = useState<string>("");
  const [daysWorked30Days, setDaysWorked30Days] = useState<string>("");
  const [daysEmployed, setDaysEmployed] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    averageDayPay: number;
    eligible: boolean;
    reason: string;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "statutory-holiday");
  const data = rule?.data as Record<string, unknown> | undefined;
  const minDaysEmployed =
    typeof data?.minDaysEmployed === "number" ? data.minDaysEmployed : 30;
  const minDaysWorked =
    typeof data?.minDaysWorkedInPeriod === "number"
      ? data.minDaysWorkedInPeriod
      : 15;
  const lookbackDays =
    typeof data?.lookbackDays === "number" ? data.lookbackDays : 30;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const wages = parseFloat(totalWages30Days);
    const daysWorked = parseInt(daysWorked30Days || "0", 10);
    const employed = parseInt(daysEmployed || "0", 10);

    if (isNaN(wages) || wages < 0) {
      setError("Please enter valid total wages.");
      setResult(null);
      return;
    }
    if (isNaN(daysWorked) || daysWorked <= 0) {
      setError("Please enter a valid number of days worked.");
      setResult(null);
      return;
    }
    if (isNaN(employed) || employed < 0) {
      setError("Please enter valid days employed.");
      setResult(null);
      return;
    }

    const averageDayPay = Math.round((wages / daysWorked) * 100) / 100;
    const eligible =
      employed >= minDaysEmployed && daysWorked >= minDaysWorked;

    let reason = "";
    if (!eligible) {
      if (employed < minDaysEmployed) {
        reason = `Not eligible: must be employed at least ${minDaysEmployed} calendar days before the holiday.`;
      } else if (daysWorked < minDaysWorked) {
        reason = `Not eligible: must have worked at least ${minDaysWorked} of the last ${lookbackDays} days before the holiday.`;
      }
    } else {
      reason = `Eligible: employed ${employed}+ days and worked ${daysWorked} of the last ${lookbackDays} days.`;
    }

    setResult({ averageDayPay, eligible, reason });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Statutory Holiday Pay Calculator"
        description="Calculate statutory holiday pay eligibility and average day’s pay under BC law."
        icon={StarIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your wages, days worked, and length of employment to determine
          BC statutory holiday pay eligibility.
        </p>

        <LCField label={`Total Wages in Last ${lookbackDays} Days (CAD)`} theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalWages30Days}
            onChange={(e) => setTotalWages30Days(e.target.value)}
            placeholder="e.g. 3000"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label={`Days Worked in Last ${lookbackDays} Days`} theme={theme}>
          <input
            type="number"
            min="0"
            max={lookbackDays}
            step="1"
            value={daysWorked30Days}
            onChange={(e) => setDaysWorked30Days(e.target.value)}
            placeholder={`e.g. 20 (max ${lookbackDays})`}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Days Employed Before Holiday" theme={theme}>
          <input
            type="number"
            min="0"
            step="1"
            value={daysEmployed}
            onChange={(e) => setDaysEmployed(e.target.value)}
            placeholder={`e.g. 45 (min ${minDaysEmployed})`}
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
          <StarIcon className="w-4 h-4" />
          Calculate Holiday Pay
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <LCNotice
              label="Eligible"
              value={result.eligible ? "Yes" : "No"}
              icon={StarIcon}
              theme={theme}
            />
            <LCNotice
              label="Average Day's Pay"
              value={`$${result.averageDayPay.toFixed(2)}`}
              icon={StarIcon}
              theme={theme}
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-lg space-y-1">
            <span className="text-xs uppercase tracking-wide text-slate-500">
              Determination
            </span>
            <p className="text-sm font-semibold text-slate-800">
              {result.reason}
            </p>
          </div>

          {!result.eligible && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                If not eligible for statutory holiday pay, you are not entitled
                to average day&apos;s pay for that holiday.
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
          About BC Statutory Holiday Pay
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>
            Must be employed at least {minDaysEmployed} calendar days before the
            holiday
          </li>
          <li>
            Must have worked at least {minDaysWorked} of the last {lookbackDays}{" "}
            days
          </li>
          <li>
            Average day&apos;s pay = total wages ÷ days worked in the {lookbackDays}
            -day period
          </li>
          <li>Based on BC Employment Standards Act §41–§44</li>
        </ul>
      </LCCard>
    </div>
  );
}
