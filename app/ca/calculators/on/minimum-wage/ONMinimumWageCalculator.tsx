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
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function ONMinimumWageCalculator() {
  const theme = getTheme("ca", "on");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    meetsMinimum: boolean;
    currentMinimum: number;
    shortfall: number;
    annualDifference: number;
  } | null>(null);

  const rule = getRuleFromBundle("on", "minimum-wage");
  const data = rule?.data as Record<string, unknown> | undefined;
  const currentMinimum =
    typeof data?.generalMinimumWage === "number"
      ? data.generalMinimumWage
      : 17.2;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const rate = parseFloat(hourlyRate);

    if (isNaN(rate) || rate < 0) {
      setError("Please enter a valid hourly rate.");
      setResult(null);
      return;
    }

    const meetsMinimum = rate >= currentMinimum;
    const shortfall = meetsMinimum
      ? 0
      : Math.round((currentMinimum - rate) * 100) / 100;
    const annualDifference = Math.round(shortfall * 40 * 52 * 100) / 100;

    setResult({
      meetsMinimum,
      currentMinimum,
      shortfall,
      annualDifference,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="ON Minimum Wage Calculator"
        description="Check if a wage meets the current Ontario minimum wage requirement."
        icon={CurrencyDollarIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter an hourly wage to verify compliance with the current Ontario
          minimum wage rate.
        </p>

        <LCField label="Hourly Wage (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="e.g. 18.50"
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
          <CurrencyDollarIcon className="w-4 h-4" />
          Check Minimum Wage
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <LCNotice
              label="ON Minimum Wage"
              value={`$${result.currentMinimum.toFixed(2)}/hr`}
              icon={CurrencyDollarIcon}
              theme={theme}
            />
            <LCNotice
              label="Status"
              value={result.meetsMinimum ? "Compliant" : "Below Minimum"}
              icon={result.meetsMinimum ? CheckCircleIcon : ExclamationTriangleIcon}
              theme={theme}
            />
          </div>

          {!result.meetsMinimum && (
            <>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-700">
                    Hourly Shortfall
                  </span>
                  <span className="text-lg font-bold text-red-800">
                    ${result.shortfall.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-700">
                    Annual Difference (40h/week)
                  </span>
                  <span className="text-lg font-bold text-red-800">
                    ${result.annualDifference.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  This wage is below the Ontario minimum. Employers must pay at
                  least ${result.currentMinimum.toFixed(2)} per hour for most
                  occupations.
                </p>
              </div>
            </>
          )}

          {result.meetsMinimum && (
            <div className="p-3 bg-green-50 rounded-lg flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                This wage meets or exceeds the current Ontario minimum wage of ${result.currentMinimum.toFixed(2)} per hour.
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
          About Ontario Minimum Wage
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>General minimum wage: ${currentMinimum.toFixed(2)}/hour</li>
          <li>
            Special rates apply to students, liquor servers, homeworkers, and
            hunting/fishing guides
          </li>
          <li>Based on Ontario ESA §23</li>
        </ul>
      </LCCard>
    </div>
  );
}
