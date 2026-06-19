"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { calculateMinimumWage } from "@/lib/abMinimumWageRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABMinimumWageCalculatorPage() {
  const [hoursWorked, setHoursWorked] = useState("");
  const [wageType, setWageType] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    hourlyRate: number;
    totalPay: number;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const hours = hoursWorked ? Number(hoursWorked) : 0;

    if (hours < 0) {
      setError("Hours worked must be non-negative.");
      return;
    }

    const output = calculateMinimumWage(hours, wageType);

    setResult(output);
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Alberta Minimum Wage Calculator"
          description="Calculate minimum-wage pay under the Alberta Employment Standards Code."
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
              <h3 className="font-semibold text-slate-800">Work Details</h3>
              <LCField label="Hours Worked" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Minimum Wage Selection
              </h3>
              <LCField label="Wage Type" theme={theme}>
                <select
                  required
                  value={wageType}
                  onChange={(e) => setWageType(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a wage type</option>
                  <option value="general">General ($15.00/hr)</option>
                  <option value="student_under_18">
                    Student Under 18 ($13.00/hr)
                  </option>
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
                Calculate Minimum Wage Pay
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
                <strong>Minimum wage rate:</strong> ${" "}
                {result.hourlyRate.toFixed(2)} per hour
              </p>
              <p>
                <strong>Total minimum-wage pay:</strong> ${" "}
                {result.totalPay.toFixed(2)}
              </p>
            </div>
          </LCCard>
        )}
      </div>
    </main>
  );
}
