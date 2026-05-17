"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCEntryNoticeCalculator() {
  const theme = getTheme("ca", "bc");
  const [entryDate, setEntryDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    earliestEntry: string;
    noticeHours: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "entry-notice");
  const data = rule?.data as Record<string, unknown> | undefined;
  const noticeHours =
    typeof data?.noticeHours === "number" ? data.noticeHours : 24;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    if (!entryDate) {
      setError("Please select a proposed entry date and time.");
      setResult(null);
      return;
    }
    const date = new Date(entryDate);
    if (isNaN(date.getTime())) {
      setError("Invalid date selected.");
      setResult(null);
      return;
    }
    const earliest = new Date(date.getTime() - noticeHours * 60 * 60 * 1000);
    setResult({
      earliestEntry: earliest.toLocaleString(),
      noticeHours,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Entry Notice Calculator"
        description="Determine the earliest a landlord may enter based on notice given."
        icon={DocumentTextIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select the proposed entry date and time to calculate when notice must
          be given in British Columbia.
        </p>

        <LCField label="Proposed Entry Date/Time" theme={theme}>
          <input
            type="datetime-local"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
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
          <ClockIcon className="w-4 h-4" />
          Calculate Notice Deadline
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ClockIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Notice Must Be Given By
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.earliestEntry}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <DocumentTextIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Required Notice
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.noticeHours} hours written notice
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-700">
              Entry must be between 8 a.m. and 9 p.m. unless the tenant agrees
              otherwise.
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
