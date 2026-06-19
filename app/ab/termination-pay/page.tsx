"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { calculateTerminationPay } from "@/lib/abTerminationPayRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABTerminationPayCalculatorPage() {
  const [employmentStartDate, setEmploymentStartDate] = useState("");
  const [employmentEndDate, setEmploymentEndDate] = useState("");
  const [averageDailyWage, setAverageDailyWage] = useState("");
  const [regularWagePerDay, setRegularWagePerDay] = useState("");
  const [terminationReason, setTerminationReason] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    eligible: boolean;
    noticePeriodDays: number;
    terminationPayAmount: number;
    serviceLengthYears: number;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (employmentStartDate && employmentEndDate) {
      const [sy, sm, sd] = employmentStartDate.split("-").map(Number);
      const [ey, em, ed] = employmentEndDate.split("-").map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);

      if (end.getTime() < start.getTime()) {
        setError("Employment end date must be after the start date.");
        return;
      }
    }

    const output = calculateTerminationPay(
      employmentStartDate,
      employmentEndDate,
      averageDailyWage ? Number(averageDailyWage) : 0,
      regularWagePerDay ? Number(regularWagePerDay) : 0,
      terminationReason
    );

    setResult(output);
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Alberta Termination Pay Calculator"
          description="Calculate termination pay and notice period under the Alberta Employment Standards Code."
          icon={CalculatorIcon}
          theme={theme}
        />

        <LCCard theme={theme} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
              <ExclamationTriangleIcon className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">
                Employee Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Employment Start Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={employmentStartDate}
                    onChange={(e) => setEmploymentStartDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Employment End Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={employmentEndDate}
                    onChange={(e) => setEmploymentEndDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Wage Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Average Daily Wage (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={averageDailyWage}
                    onChange={(e) => setAverageDailyWage(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Regular Wage Per Day (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={regularWagePerDay}
                    onChange={(e) => setRegularWagePerDay(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Reason for Termination
              </h3>
              <LCField label="Termination Reason" theme={theme}>
                <select
                  required
                  value={terminationReason}
                  onChange={(e) => setTerminationReason(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a reason</option>
                  <option value="without_cause">Without Cause</option>
                  <option value="with_cause">With Cause</option>
                  <option value="temporary_layoff_exceeded">
                    Temporary Layoff Exceeded
                  </option>
                  <option value="seasonal_end">Seasonal End</option>
                  <option value="fixed_term_end">Fixed Term End</option>
                </select>
              </LCField>
            </div>

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                className="w-full sm:w-auto"
              >
                Calculate Termination Pay
              </LCButton>
            </div>
          </form>
        </LCCard>

        {result && (
          <LCCard theme={theme} className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-lg">
              Calculation Results
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <strong>Eligible for termination pay:</strong>{" "}
                {result.eligible ? "Yes" : "No"}
              </p>
              <p>
                <strong>Length of service:</strong>{" "}
                {result.serviceLengthYears} years
              </p>
              <p>
                <strong>Required notice period:</strong>{" "}
                {result.noticePeriodDays} days
              </p>
              <p>
                <strong>Termination pay owed:</strong>${" "}
                {result.terminationPayAmount.toFixed(2)}
              </p>
            </div>
          </LCCard>
        )}
      </div>
    </main>
  );
}
