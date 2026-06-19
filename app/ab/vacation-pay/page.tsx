"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { calculateVacationPay } from "@/lib/abVacationPayRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABVacationPayCalculatorPage() {
  const [totalWagesEarned, setTotalWagesEarned] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    vacationRatePercent: number;
    vacationPayAmount: number;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const wages = totalWagesEarned ? Number(totalWagesEarned) : 0;
    const years = yearsOfService ? Number(yearsOfService) : 0;

    if (wages < 0 || years < 0) {
      setError("Wages and years of service must be non-negative.");
      return;
    }

    const output = calculateVacationPay(wages, years);

    setResult(output);
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Alberta Vacation Pay Calculator"
          description="Calculate vacation pay under the Alberta Employment Standards Code."
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
              <LCField label="Total Wages Earned (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={totalWagesEarned}
                  onChange={(e) => setTotalWagesEarned(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Employment Duration
              </h3>
              <LCField label="Years of Service" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  required
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                className="w-full sm:w-auto"
              >
                Calculate Vacation Pay
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
                <strong>Vacation pay rate:</strong>{" "}
                {result.vacationRatePercent}%
              </p>
              <p>
                <strong>Vacation pay owed:</strong> ${" "}
                {result.vacationPayAmount.toFixed(2)}
              </p>
            </div>
          </LCCard>
        )}
      </div>
    </main>
  );
}
