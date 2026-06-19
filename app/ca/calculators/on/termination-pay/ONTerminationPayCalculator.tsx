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
  UserMinusIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

function computeNoticeWeeks(years: number): number {
  if (years < 0.25) return 0;
  if (years < 1) return 1;
  return Math.min(Math.floor(years), 8);
}

export default function ONTerminationPayCalculator() {
  const theme = getTheme("ca", "on");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [averageWeeklyWage, setAverageWeeklyWage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weeks: number;
    totalPay: number;
    noticePeriod: string;
  } | null>(null);

  const rule = getRuleFromBundle("on", "termination-pay");
  const data = rule?.data as Record<string, unknown> | undefined;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const years = parseFloat(yearsOfService);
    const weeklyWage = parseFloat(averageWeeklyWage);

    if (isNaN(years) || years < 0) {
      setError("Please enter a valid number of years of service.");
      setResult(null);
      return;
    }
    if (isNaN(weeklyWage) || weeklyWage <= 0) {
      setError("Please enter a valid average weekly wage greater than 0.");
      setResult(null);
      return;
    }

    const weeks = computeNoticeWeeks(years);
    const totalPay = Math.round(weeks * weeklyWage * 100) / 100;

    let noticePeriod = "";
    if (weeks === 0) {
      noticePeriod = "No termination pay required (less than 3 months).";
    } else if (weeks === 1) {
      noticePeriod = "1 week of pay required (3–12 months).";
    } else {
      noticePeriod = `${weeks} weeks of pay required (${Math.floor(years)} year${Math.floor(years) !== 1 ? "s" : ""} of service).`;
    }

    setResult({ weeks, totalPay, noticePeriod });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="ON Termination Pay Calculator"
        description="Calculate termination pay entitlements under the Ontario Employment Standards Act based on length of service."
        icon={UserMinusIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your years of service and average weekly wage to calculate your
          Ontario termination pay entitlement.
        </p>

        <LCField label="Years of Service" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.1"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="e.g. 4.5"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Average Weekly Wage (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={averageWeeklyWage}
            onChange={(e) => setAverageWeeklyWage(e.target.value)}
            placeholder="e.g. 1200"
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
          <UserMinusIcon className="w-4 h-4" />
          Calculate Termination Pay
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <LCNotice
              label="Weeks of Pay"
              value={`${result.weeks}`}
              icon={UserMinusIcon}
              theme={theme}
            />
            <LCNotice
              label="Total Termination Pay"
              value={`$${result.totalPay.toFixed(2)}`}
              icon={DocumentTextIcon}
              theme={theme}
            />
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Notice Period
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {result.noticePeriod}
              </p>
            </div>
          </div>

          {result.weeks === 8 && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Maximum termination pay reached. Ontario law caps termination
                pay at 8 weeks.
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
          About Ontario Termination Pay
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>3–12 months of service: 1 week&apos;s wages</li>
          <li>1–2 years: 2 weeks&apos; wages</li>
          <li>2–3 years: 3 weeks&apos; wages</li>
          <li>3–4 years: 4 weeks&apos; wages</li>
          <li>4–5 years: 5 weeks&apos; wages</li>
          <li>5–6 years: 6 weeks&apos; wages</li>
          <li>6–7 years: 7 weeks&apos; wages</li>
          <li>7+ years: 8 weeks&apos; wages (maximum)</li>
          <li>Based on Ontario ESA §54–§67</li>
        </ul>
      </LCCard>
    </div>
  );
}
