"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import {
  BanknotesIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCSecurityDepositCalculator() {
  const theme = getTheme("ca", "bc");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    maxDeposit: number;
    returnDeadline: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "security-deposit");
  const data = rule?.data as Record<string, unknown> | undefined;
  const maxMonths =
    typeof data?.maxDepositMonths === "number" ? data.maxDepositMonths : 0.5;
  const returnDays =
    typeof data?.returnDeadlineDays === "number" ? data.returnDeadlineDays : 15;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const rent = parseFloat(monthlyRent);
    if (isNaN(rent) || rent <= 0) {
      setError("Please enter a valid monthly rent greater than 0.");
      setResult(null);
      return;
    }
    setResult({
      maxDeposit: Math.round(rent * maxMonths * 100) / 100,
      returnDeadline: returnDays,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Security Deposit Calculator"
        description="Calculate the maximum security deposit and return deadline for a BC tenancy."
        icon={BanknotesIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your monthly rent to calculate the maximum legal security deposit
          and return deadline in British Columbia.
        </p>

        <LCField label="Monthly Rent (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
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
          <BanknotesIcon className="w-4 h-4" />
          Calculate Deposit Rules
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <BanknotesIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Maximum Deposit
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                ${result.maxDeposit.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500">
                ({maxMonths} month{maxMonths !== 1 ? "s" : ""} rent)
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Return Deadline
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.returnDeadline} days
              </p>
              <p className="text-xs text-slate-500">after vacating</p>
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
