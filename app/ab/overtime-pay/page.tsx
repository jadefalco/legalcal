"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { calculateOvertimePay } from "@/lib/abOvertimePayRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABOvertimePayCalculatorPage() {
  const [regularHoursWorked, setRegularHoursWorked] = useState("");
  const [overtimeHoursWorked, setOvertimeHoursWorked] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [overtimeRule, setOvertimeRule] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    overtimeRate: number;
    overtimePayAmount: number;
    totalPay: number;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const regular = regularHoursWorked ? Number(regularHoursWorked) : 0;
    const overtime = overtimeHoursWorked ? Number(overtimeHoursWorked) : 0;
    const wage = hourlyWage ? Number(hourlyWage) : 0;

    if (regular < 0 || overtime < 0 || wage < 0) {
      setError("Hours and wage must be non-negative.");
      return;
    }

    const output = calculateOvertimePay(
      regular,
      overtime,
      wage,
      overtimeRule
    );

    setResult(output);
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Alberta Overtime Pay Calculator"
          description="Calculate overtime pay under the Alberta Employment Standards Code."
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
              <h3 className="font-semibold text-slate-800">Work Hours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Regular Hours Worked" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={regularHoursWorked}
                    onChange={(e) => setRegularHoursWorked(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Overtime Hours Worked" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={overtimeHoursWorked}
                    onChange={(e) => setOvertimeHoursWorked(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Wage Details</h3>
              <LCField label="Hourly Wage (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Overtime Rule Selection
              </h3>
              <LCField label="Overtime Rule" theme={theme}>
                <select
                  required
                  value={overtimeRule}
                  onChange={(e) => setOvertimeRule(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a rule</option>
                  <option value="8_and_44">
                    8 and 44 (standard overtime)
                  </option>
                  <option value="flexible_arrangement">
                    Flexible Arrangement (banked at straight time)
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
                Calculate Overtime Pay
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
                <strong>Overtime rate:</strong> ${" "}
                {result.overtimeRate.toFixed(2)} per hour
              </p>
              <p>
                <strong>Overtime pay:</strong> ${" "}
                {result.overtimePayAmount.toFixed(2)}
              </p>
              <p>
                <strong>Total pay for this period:</strong> ${" "}
                {result.totalPay.toFixed(2)}
              </p>
            </div>
          </LCCard>
        )}
      </div>
    </main>
  );
}
