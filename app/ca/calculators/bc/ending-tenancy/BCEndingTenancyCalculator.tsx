"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import {
  ClockIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCEndingTenancyCalculator() {
  const theme = getTheme("ca", "bc");
  const [noticeDate, setNoticeDate] = useState<string>("");
  const [isTenant, setIsTenant] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    effectiveDate: string;
    noticeDays: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "ending-tenancy");
  const data = rule?.data as Record<string, unknown> | undefined;
  const tenantDays =
    typeof data?.tenantNoticePeriodDays === "number"
      ? data.tenantNoticePeriodDays
      : 30;
  const landlordDays =
    typeof data?.landlordNoticePeriodDays === "number"
      ? data.landlordNoticePeriodDays
      : 30;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    if (!noticeDate) {
      setError("Please select the date notice was given.");
      setResult(null);
      return;
    }
    const date = new Date(noticeDate);
    if (isNaN(date.getTime())) {
      setError("Invalid date selected.");
      setResult(null);
      return;
    }
    const days = isTenant ? tenantDays : landlordDays;
    const effective = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    setResult({
      effectiveDate: effective.toLocaleDateString(),
      noticeDays: days,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Ending Tenancy Calculator"
        description="Calculate notice periods for ending a BC tenancy."
        icon={ClockIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select the notice date and who is giving notice to calculate the
          earliest effective end date in British Columbia.
        </p>

        <LCField label="Notice Given Date" theme={theme}>
          <input
            type="date"
            value={noticeDate}
            onChange={(e) => setNoticeDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Who is giving notice?" theme={theme}>
          <select
            value={isTenant ? "tenant" : "landlord"}
            onChange={(e) => setIsTenant(e.target.value === "tenant")}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </LCField>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <CalendarDaysIcon className="w-4 h-4" />
          Calculate Effective Date
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
                  Tenancy Ends On or After
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.effectiveDate}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ClockIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Notice Period
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.noticeDays} days
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-700">
              Some notices require specific RTB forms. Verify the correct form
              for your situation.
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
