"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCRentIncreaseCalculator() {
  const theme = getTheme("ca", "bc");
  const [currentRent, setCurrentRent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    maxNewRent: number;
    increaseAmount: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "rent-increase");
  const data = rule?.data as Record<string, unknown> | undefined;

  const limit =
    typeof data?.maxIncreasePercent === "number" ? data.maxIncreasePercent : 2.3;
  const noticeMonths =
    typeof data?.noticeMonths === "number" ? data.noticeMonths : 3;
  const year =
    typeof data?.year === "number" ? data.year : 2026;
  const version = rule?.version?.version ?? "";
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const rent = parseFloat(currentRent);
    if (isNaN(rent) || rent <= 0) {
      setError("Please enter a valid current rent greater than 0.");
      setResult(null);
      return;
    }
    const increaseAmount = rent * (limit / 100);
    setResult({
      maxNewRent: Math.round((rent + increaseAmount) * 100) / 100,
      increaseAmount: Math.round(increaseAmount * 100) / 100,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Rent Increase Calculator"
        description="Calculate the maximum allowable rent increase for a BC tenancy."
        icon={ChartBarIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your current monthly rent to calculate the maximum allowable
          increase and required notice period in British Columbia.
        </p>

        {(year || version) && (
          <p className="text-xs font-medium text-slate-500">
            Based on {year} RTB rules{version ? ` (version ${version})` : ""}.
          </p>
        )}

        <LCField label="Current Monthly Rent (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={currentRent}
            onChange={(e) => setCurrentRent(e.target.value)}
            placeholder="e.g. 2500"
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
          <ChartBarIcon className="w-4 h-4" />
          Calculate Rent Increase
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ChartBarIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Maximum Increase
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                ${result.increaseAmount.toFixed(2)} ({limit}%)
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ChartBarIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Maximum New Rent
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                ${result.maxNewRent.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800">Notice Required</p>
              <p className="text-sm text-slate-600">
                {noticeMonths} full calendar months
              </p>
            </div>
          </div>
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
    </div>
  );
}
