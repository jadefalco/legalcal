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
  CalendarDaysIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCDepositReturnCalculator() {
  const theme = getTheme("ca", "bc");
  const [moveOutDate, setMoveOutDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    deadline: string;
    days: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "deposit-return");
  const data = rule?.data as Record<string, unknown> | undefined;
  const returnDays =
    typeof data?.returnDeadlineDays === "number" ? data.returnDeadlineDays : 15;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    if (!moveOutDate) {
      setError("Please select a move-out date.");
      setResult(null);
      return;
    }
    const date = new Date(moveOutDate);
    if (isNaN(date.getTime())) {
      setError("Invalid date selected.");
      setResult(null);
      return;
    }
    const deadline = new Date(date.getTime() + returnDays * 24 * 60 * 60 * 1000);
    setResult({
      deadline: deadline.toLocaleDateString(),
      days: returnDays,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Deposit Return Deadline Calculator"
        description="Calculate the deadline for returning a security deposit in BC."
        icon={BanknotesIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select your move-out or vacating date to calculate the deadline for
          returning your security deposit in British Columbia.
        </p>

        <LCField label="Move-Out / Vacating Date" theme={theme}>
          <input
            type="date"
            value={moveOutDate}
            onChange={(e) => setMoveOutDate(e.target.value)}
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
          <CalendarDaysIcon className="w-4 h-4" />
          Calculate Deadline
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Deposit Must Be Returned By
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.deadline}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <BanknotesIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Timeline
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.days} days after vacating
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-700">
              An itemized statement is required if any deductions are taken.
            </p>
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
