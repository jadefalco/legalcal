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

function computeSeveranceWeeks(years: number): number {
  if (years < 5) return 0;
  return Math.min(Math.floor(years), 26);
}

export default function ONSeverancePayCalculator() {
  const theme = getTheme("ca", "on");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [averageWeeklyWage, setAverageWeeklyWage] = useState<string>("");
  const [payrollOver2_5M, setPayrollOver2_5M] = useState<boolean>(false);
  const [groupTermination, setGroupTermination] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weeks: number;
    totalPay: number;
    eligible: boolean;
    reason: string;
  } | null>(null);

  const rule = getRuleFromBundle("on", "severance-pay");
  const data = rule?.data as Record<string, unknown> | undefined;
  const minYears =
    typeof data?.minYearsForSeverance === "number" ? data.minYearsForSeverance : 5;
  const maxWeeks =
    typeof data?.maxSeveranceWeeks === "number" ? data.maxSeveranceWeeks : 26;
  const payrollThreshold =
    typeof data?.payrollThreshold === "number" ? data.payrollThreshold : 2500000;
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

    const weeks = computeSeveranceWeeks(years);
    const totalPay = Math.round(weeks * weeklyWage * 100) / 100;
    const eligible = years >= minYears && (payrollOver2_5M || groupTermination);

    let reason = "";
    if (years < minYears) {
      reason = `Not eligible: less than ${minYears} years of service.`;
    } else if (!payrollOver2_5M && !groupTermination) {
      reason = `Not eligible: employer payroll under $${(payrollThreshold / 1000000).toFixed(1)}M and no group termination.`;
    } else {
      reason = `Eligible: ${years}+ years of service and employer meets severance threshold.`;
    }

    setResult({ weeks, totalPay, eligible, reason });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="ON Severance Pay Calculator"
        description="Determine severance pay obligations under the Ontario Employment Standards Act."
        icon={UsersIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your years of service, average weekly wage, and employer details
          to assess Ontario severance pay obligations.
        </p>

        <LCField label="Years of Service" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.1"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="e.g. 6"
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="payrollOver2_5M"
            checked={payrollOver2_5M}
            onChange={(e) => setPayrollOver2_5M(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="payrollOver2_5M" className="text-sm text-slate-700">
            Employer payroll exceeds ${(payrollThreshold / 1000000).toFixed(1)}M
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="groupTermination"
            checked={groupTermination}
            onChange={(e) => setGroupTermination(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="groupTermination" className="text-sm text-slate-700">
            50+ employees terminated in 6-month period
          </label>
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <UsersIcon className="w-4 h-4" />
          Calculate Severance Pay
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <LCNotice
              label="Eligible"
              value={result.eligible ? "Yes" : "No"}
              icon={UsersIcon}
              theme={theme}
            />
            <LCNotice
              label="Weeks of Pay"
              value={`${result.weeks}`}
              icon={DocumentTextIcon}
              theme={theme}
            />
            <LCNotice
              label="Total Severance Pay"
              value={`$${result.totalPay.toFixed(2)}`}
              icon={UsersIcon}
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

          {result.eligible && result.weeks === maxWeeks && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Maximum severance pay reached. Ontario law caps severance pay
                at {maxWeeks} weeks.
              </p>
            </div>
          )}

          {!result.eligible && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Standard termination pay rules apply. Ontario requires
                severance pay only for employees with {minYears}+ years of
                service whose employer meets specific payroll or group
                termination thresholds.
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
          About Ontario Severance Pay
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>
            {minYears}+ years of service required for severance eligibility
          </li>
          <li>
            Employer must have payroll over ${(payrollThreshold / 1000000).toFixed(1)}M OR terminate 50+
            employees in 6 months
          </li>
          <li>1 week per year of service, capped at {maxWeeks} weeks</li>
          <li>Based on Ontario ESA §63–§68</li>
        </ul>
      </LCCard>
    </div>
  );
}
