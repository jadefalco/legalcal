"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { calculateMaternityParentalLeave } from "@/lib/abMaternityParentalLeaveRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABMaternityParentalLeaveCalculatorPage() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState("");
  const [benefitType, setBenefitType] = useState("");
  const [weeksClaimed, setWeeksClaimed] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weeklyBenefitAmount: number;
    totalBenefitAmount: number;
    maxWeeksAllowed: number;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const earnings = averageWeeklyEarnings ? Number(averageWeeklyEarnings) : 0;
    const weeks = weeksClaimed ? Number(weeksClaimed) : 0;

    if (earnings < 0) {
      setError("Average weekly earnings must be non-negative.");
      return;
    }

    if (
      benefitType !== "maternity_standard" &&
      (weeks <= 0 || !Number.isFinite(weeks))
    ) {
      setError("Weeks claimed must be greater than zero for parental benefits.");
      return;
    }

    const output = calculateMaternityParentalLeave(
      earnings,
      benefitType,
      weeks
    );

    setResult(output);
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Alberta Maternity & Parental Leave Benefits Calculator"
          description="Calculate EI maternity and parental leave benefits for Alberta."
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
              <LCField label="Average Weekly Earnings (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={averageWeeklyEarnings}
                  onChange={(e) => setAverageWeeklyEarnings(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Benefit Type</h3>
              <LCField label="Benefit Type" theme={theme}>
                <select
                  required
                  value={benefitType}
                  onChange={(e) => setBenefitType(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a benefit type</option>
                  <option value="maternity_standard">
                    Maternity (Standard)
                  </option>
                  <option value="parental_standard">
                    Parental (Standard)
                  </option>
                  <option value="parental_extended">
                    Parental (Extended)
                  </option>
                </select>
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Parental Leave Sharing
              </h3>
              <LCField label="Weeks Claimed" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={1}
                  required
                  value={weeksClaimed}
                  onChange={(e) => setWeeksClaimed(e.target.value)}
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
                Calculate Benefits
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
                <strong>Weekly benefit amount:</strong> ${" "}
                {result.weeklyBenefitAmount.toFixed(2)}
              </p>
              <p>
                <strong>Maximum weeks allowed:</strong>{" "}
                {result.maxWeeksAllowed} weeks
              </p>
              <p>
                <strong>Total benefit amount:</strong> ${" "}
                {result.totalBenefitAmount.toFixed(2)}
              </p>
            </div>
          </LCCard>
        )}
      </div>
    </main>
  );
}
