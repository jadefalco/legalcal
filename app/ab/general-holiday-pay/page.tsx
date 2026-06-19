"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { calculateGeneralHolidayPay } from "@/lib/abGeneralHolidayPayRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABGeneralHolidayPayCalculatorPage() {
  const [averageDailyWage, setAverageDailyWage] = useState("");
  const [hoursWorkedOnHoliday, setHoursWorkedOnHoliday] = useState("");
  const [isRegularWorkday, setIsRegularWorkday] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    holidayPayAmount: number;
    premiumPayAmount: number;
    totalPay: number;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const wage = averageDailyWage ? Number(averageDailyWage) : 0;
    const hours = hoursWorkedOnHoliday ? Number(hoursWorkedOnHoliday) : 0;

    if (wage < 0 || hours < 0) {
      setError("Wage and hours must be non-negative.");
      return;
    }

    const output = calculateGeneralHolidayPay(wage, hours, isRegularWorkday);

    setResult(output);
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  const checkboxClass =
    "h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Alberta General Holiday Pay Calculator"
          description="Calculate general holiday pay under the Alberta Employment Standards Code."
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
              <h3 className="font-semibold text-slate-800">Wage Details</h3>
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
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Work Details</h3>
              <LCField label="Hours Worked on Holiday" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={hoursWorkedOnHoliday}
                  onChange={(e) => setHoursWorkedOnHoliday(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Employment Status
              </h3>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={isRegularWorkday}
                  onChange={(e) => setIsRegularWorkday(e.target.checked)}
                  className={checkboxClass}
                />
                The holiday falls on a day the employee normally works
              </label>
            </div>

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                className="w-full sm:w-auto"
              >
                Calculate Holiday Pay
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
                <strong>Holiday pay:</strong> ${" "}
                {result.holidayPayAmount.toFixed(2)}
              </p>
              <p>
                <strong>Premium pay:</strong> ${" "}
                {result.premiumPayAmount.toFixed(2)}
              </p>
              <p>
                <strong>Total pay for this holiday:</strong> ${" "}
                {result.totalPay.toFixed(2)}
              </p>
            </div>
          </LCCard>
        )}
      </div>
    </main>
  );
}
