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
  if (years < 3) return 0;
  return Math.min(Math.floor(years), 8);
}

export default function BCSeverancePayCalculator() {
  const theme = getTheme("ca", "bc");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [averageWeeklyWage, setAverageWeeklyWage] = useState<string>("");
  const [employeesTerminated, setEmployeesTerminated] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weeks: number;
    totalPay: number;
    eligible: boolean;
    reason: string;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "severance-pay");
  const data = rule?.data as Record<string, unknown> | undefined;
  const groupThreshold =
    typeof data?.groupTerminationThreshold === "number"
      ? data.groupTerminationThreshold
      : 50;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const years = parseFloat(yearsOfService);
    const weeklyWage = parseFloat(averageWeeklyWage);
    const employees = parseInt(employeesTerminated || "0", 10);

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
    const isGroup = employees >= groupThreshold;
    const eligible = years >= 3 && isGroup;

    let reason = "";
    if (!isGroup) {
      reason = `Group termination threshold not met (${groupThreshold}+ employees required within 2 months). BC does not require separate severance pay for individual terminations beyond termination pay.`;
    } else if (years < 3) {
      reason = `Group termination applies, but less than 3 years of service. No severance pay required.`;
    } else {
      reason = `Group termination applies (${employees}+ employees) and ${years}+ years of service. Severance pay required.`;
    }

    setResult({ weeks, totalPay, eligible, reason });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Severance Pay Calculator"
        description="Determine severance pay obligations under the BC Employment Standards Act for group terminations."
        icon={UsersIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your years of service, average weekly wage, and number of
          employees terminated in a group to assess BC severance pay
          obligations.
        </p>

        <LCField label="Years of Service" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.1"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="e.g. 5.5"
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

        <LCField label="Employees Terminated (within 2 months)" theme={theme}>
          <input
            type="number"
            min="0"
            step="1"
            value={employeesTerminated}
            onChange={(e) => setEmployeesTerminated(e.target.value)}
            placeholder="e.g. 55"
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

          {result.eligible && result.weeks === 8 && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Maximum severance pay reached. BC law caps severance pay at 8
                weeks for group terminations.
              </p>
            </div>
          )}

          {!result.eligible && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Standard termination pay rules apply. BC does not require
                additional severance pay beyond termination pay for individual
                dismissals.
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
          About BC Severance Pay
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>
            BC requires severance pay only for group terminations (50+ employees
            within 2 months)
          </li>
          <li>3+ years of service required for severance eligibility</li>
          <li>1 week per year of service, capped at 8 weeks</li>
          <li>Based on BC Employment Standards Act §64, §65, §68</li>
        </ul>
      </LCCard>
    </div>
  );
}
