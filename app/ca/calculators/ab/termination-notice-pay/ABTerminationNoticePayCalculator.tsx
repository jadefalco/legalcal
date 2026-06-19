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
  BellAlertIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function computeNoticeWeeks(years: number): number {
  if (years < 0.25) return 0;
  if (years < 2) return 1;
  if (years < 4) return 2;
  if (years < 6) return 4;
  if (years < 8) return 5;
  if (years < 10) return 6;
  return 8;
}

export default function ABTerminationNoticePayCalculator() {
  const theme = getTheme("ca", "ab");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [noticeProvided, setNoticeProvided] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    requiredWeeks: number;
    requiredDays: number;
    providedWeeks: number;
    sufficient: boolean;
    shortfallWeeks: number;
  } | null>(null);

  const rule = getRuleFromBundle("ab", "termination-notice-pay");
  const data = rule?.data as Record<string, unknown> | undefined;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const years = parseFloat(yearsOfService);
    const provided = parseFloat(noticeProvided);

    if (isNaN(years) || years < 0) {
      setError("Please enter a valid number of years of service.");
      setResult(null);
      return;
    }
    if (isNaN(provided) || provided < 0) {
      setError("Please enter valid notice provided (in weeks).");
      setResult(null);
      return;
    }

    const requiredWeeks = computeNoticeWeeks(years);
    const requiredDays = requiredWeeks * 7;
    const sufficient = provided >= requiredWeeks;
    const shortfallWeeks = sufficient ? 0 : requiredWeeks - provided;

    setResult({
      requiredWeeks,
      requiredDays,
      providedWeeks: provided,
      sufficient,
      shortfallWeeks,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="AB Termination Notice Pay Calculator"
        description="Determine the minimum termination notice period required under the Alberta Employment Standards Code."
        icon={BellAlertIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your years of service and the notice period provided (if any)
          to check compliance with Alberta termination notice requirements.
        </p>

        <LCField label="Years of Service" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.1"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="e.g. 4.5"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Notice Provided (weeks)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.5"
            value={noticeProvided}
            onChange={(e) => setNoticeProvided(e.target.value)}
            placeholder="e.g. 2"
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
          <BellAlertIcon className="w-4 h-4" />
          Calculate Notice Requirement
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LCNotice
              label="Required Notice"
              value={`${result.requiredWeeks} weeks`}
              icon={BellAlertIcon}
              theme={theme}
            />
            <LCNotice
              label="Required Days"
              value={`${result.requiredDays} days`}
              icon={DocumentTextIcon}
              theme={theme}
            />
            <LCNotice
              label="Notice Sufficient"
              value={result.sufficient ? "Yes" : "No"}
              icon={result.sufficient ? CheckCircleIcon : ExclamationTriangleIcon}
              theme={theme}
            />
          </div>

          {!result.sufficient && result.requiredWeeks > 0 && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700">
                  Notice Shortfall
                </span>
                <span className="text-lg font-bold text-red-800">
                  {result.shortfallWeeks} week
                  {result.shortfallWeeks !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-sm text-red-700">
                Employer must provide pay in lieu of notice for the shortfall.
              </p>
            </div>
          )}

          {result.sufficient && result.requiredWeeks > 0 && (
            <div className="p-3 bg-green-50 rounded-lg flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                The notice provided meets or exceeds the Alberta Employment
                Standards Code requirement.
              </p>
            </div>
          )}

          {result.requiredWeeks === 0 && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                No notice required for less than 90 days of service under
                Alberta law.
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
          About Alberta Termination Notice
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>90 days to 2 years: 1 week written notice</li>
          <li>2–4 years: 2 weeks written notice</li>
          <li>4–6 years: 4 weeks written notice</li>
          <li>6–8 years: 5 weeks written notice</li>
          <li>8–10 years: 6 weeks written notice</li>
          <li>10+ years: 8 weeks written notice</li>
          <li>Based on Alberta Employment Standards Code §54–§63</li>
        </ul>
      </LCCard>
    </div>
  );
}
