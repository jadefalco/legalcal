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
  SunIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function ABVacationPayCalculator() {
  const theme = getTheme("ca", "ab");
  const [totalWages, setTotalWages] = useState<string>("");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    vacationPayPercent: number;
    vacationPay: number;
    vacationDays: number;
  } | null>(null);

  const rule = getRuleFromBundle("ab", "vacation-pay");
  const data = rule?.data as Record<string, unknown> | undefined;
  const basePercent =
    typeof data?.baseVacationPercent === "number"
      ? data.baseVacationPercent
      : 4;
  const extendedPercent =
    typeof data?.extendedVacationPercent === "number"
      ? data.extendedVacationPercent
      : 6;
  const extendedThreshold =
    typeof data?.extendedThresholdYears === "number"
      ? data.extendedThresholdYears
      : 5;
  const daysPerYear =
    typeof data?.vacationDaysPerYear === "number"
      ? data.vacationDaysPerYear
      : 10;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    const wages = parseFloat(totalWages);
    const years = parseFloat(yearsOfService);

    if (isNaN(wages) || wages < 0) {
      setError("Please enter a valid total wages amount.");
      setResult(null);
      return;
    }
    if (isNaN(years) || years < 0) {
      setError("Please enter a valid number of years of service.");
      setResult(null);
      return;
    }

    const percent = years >= extendedThreshold ? extendedPercent : basePercent;
    const vacationPay = Math.round(wages * (percent / 100) * 100) / 100;
    const days = years >= extendedThreshold ? daysPerYear + 5 : daysPerYear;

    setResult({
      vacationPayPercent: percent,
      vacationPay,
      vacationDays: days,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="AB Vacation Pay Calculator"
        description="Calculate vacation pay entitlements under the Alberta Employment Standards Code."
        icon={SunIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your total wages and years of service to calculate your Alberta
          vacation pay and days entitlement.
        </p>

        <LCField label="Total Wages (CAD)" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalWages}
            onChange={(e) => setTotalWages(e.target.value)}
            placeholder="e.g. 50000"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <LCField label="Years of Service" theme={theme}>
          <input
            type="number"
            min="0"
            step="0.1"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="e.g. 6"
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
          <SunIcon className="w-4 h-4" />
          Calculate Vacation Pay
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <LCNotice
              label="Vacation Pay %"
              value={`${result.vacationPayPercent}%`}
              icon={SunIcon}
              theme={theme}
            />
            <LCNotice
              label="Vacation Pay"
              value={`$${result.vacationPay.toFixed(2)}`}
              icon={SunIcon}
              theme={theme}
            />
            <LCNotice
              label="Vacation Days"
              value={`${result.vacationDays}`}
              icon={SunIcon}
              theme={theme}
            />
          </div>

          {result.vacationPayPercent === extendedPercent && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Extended vacation rate applies ({extendedPercent}%) because you
                have {extendedThreshold}+ years of service.
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
          About Alberta Vacation Pay
        </h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          <li>{basePercent}% of total wages for less than {extendedThreshold} years</li>
          <li>{extendedPercent}% of total wages for {extendedThreshold}+ years</li>
          <li>{daysPerYear} days minimum vacation (15 days after {extendedThreshold} years)</li>
          <li>Based on Alberta Employment Standards Code §33–§43</li>
        </ul>
      </LCCard>
    </div>
  );
}
