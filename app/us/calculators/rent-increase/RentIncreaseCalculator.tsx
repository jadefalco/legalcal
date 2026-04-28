"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

import { rentIncreaseRules } from "@/app/data/us/rentIncreaseRules";
import type { RentIncreaseRule } from "@/app/types/RentIncreaseRules";
import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  CalendarDaysIcon,
  HomeIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof rentIncreaseRules;

type TenancyType = "month-to-month" | "fixed-term" | "week-to-week";

const STATE_KEYS = Object.keys(rentIncreaseRules).sort() as StateKey[];

const TENANCY_TYPES: { key: TenancyType; label: string }[] = [
  { key: "month-to-month", label: "Month-to-month" },
  { key: "fixed-term", label: "Fixed-term lease" },
  { key: "week-to-week", label: "Week-to-week" },
];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function isNumberValue(v: number | string): v is number {
  return typeof v === "number";
}

function getTenancyNotice(
  rule: RentIncreaseRule,
  tenancyType: TenancyType
): string | null {
  if (tenancyType === "week-to-week" && rule.stateCode === "HI") {
    return "15 days for week-to-week tenancies";
  }
  if (tenancyType === "fixed-term") {
    return "Rent increases during a fixed-term lease are governed by the lease terms unless the lease specifically allows for increases.";
  }
  return null;
}

interface RentIncreaseCalculatorProps {
  initialState?: string;
}

export default function RentIncreaseCalculator({
  initialState,
}: RentIncreaseCalculatorProps) {
  const [stateCode, setStateCode] = useState<StateKey>(
    (initialState?.toLowerCase() as StateKey) || "ca"
  );
  const [servedDate, setServedDate] = useState<string>(
    formatISODate(new Date())
  );
  const [tenancyType, setTenancyType] = useState<TenancyType>("month-to-month");
  const [computed, setComputed] = useState<boolean>(false);

  const rule: RentIncreaseRule = rentIncreaseRules[stateCode];
  const theme: Theme = getTheme("us", stateCode);

  useEffect(() => {
    if (
      initialState &&
      rentIncreaseRules[initialState.toLowerCase() as StateKey]
    ) {
      setStateCode(initialState.toLowerCase() as StateKey);
    }
  }, [initialState]);

  const tenancyNote = useMemo(
    () => getTenancyNotice(rule, tenancyType),
    [rule, tenancyType]
  );

  const resultDeadline: Date | null = useMemo(() => {
    if (!computed) return null;
    if (!isNumberValue(rule.noticePeriodDays)) return null;
    const base = new Date(servedDate + "T00:00:00");
    if (isNaN(base.getTime())) return null;
    return addDays(base, rule.noticePeriodDays);
  }, [computed, rule.noticePeriodDays, servedDate]);

  const handleCalculate = () => {
    setComputed(true);
  };

  const handleStateChange = (code: StateKey) => {
    setStateCode(code);
    setComputed(false);
  };

  const handleDateChange = (d: string) => {
    setServedDate(d);
    setComputed(false);
  };

  const handleTenancyChange = (t: TenancyType) => {
    setTenancyType(t);
    setComputed(false);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <LCSection
        title="Rent Increase Notice Calculator"
        description="Select a state, tenancy type, and notice date to calculate the legal rent increase notice deadline."
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* INPUTS */}
      <LCCard theme={theme} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <LCField label="State" theme={theme}>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              value={stateCode}
              onChange={(e) => handleStateChange(e.target.value as StateKey)}
            >
              {STATE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {rentIncreaseRules[key].name}
                </option>
              ))}
            </select>
          </LCField>

          <LCField label="Tenancy type" theme={theme}>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              value={tenancyType}
              onChange={(e) =>
                handleTenancyChange(e.target.value as TenancyType)
              }
            >
              {TENANCY_TYPES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </LCField>

          <LCField label="Notice served date" theme={theme}>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              value={servedDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <CalendarDaysIcon className="w-4 h-4" />
          Calculate Deadline
        </LCButton>
      </LCCard>

      {/* RESULT */}
      {computed && (
        <LCCard theme={theme} className="space-y-6">
          <LCSection
            title={`${rule.name} Rent Increase Notice Result`}
            description={`Tenancy type: ${TENANCY_TYPES.find((t) => t.key === tenancyType)?.label}.`}
            icon={DocumentTextIcon}
            theme={theme}
          />

          {/* Tenancy-specific note */}
          {tenancyNote && (
            <div className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
              <strong>Tenancy note:</strong> {tenancyNote}
            </div>
          )}

          {isNumberValue(rule.noticePeriodDays) && resultDeadline ? (
            <>
              <LCNotice
                label="Notice period required"
                value={`${rule.noticePeriodDays} days`}
                icon={ExclamationTriangleIcon}
                theme={theme}
              />

              <LCNotice
                label="Legal deadline"
                value={formatDate(resultDeadline)}
                icon={CalendarDaysIcon}
                theme={theme}
              />

              <p className="text-sm text-slate-600">
                The landlord must provide written notice by{" "}
                <strong>{formatDate(resultDeadline)}</strong> before the rent
                increase can take effect.
              </p>
            </>
          ) : (
            <>
              <LCNotice
                label="Notice period"
                value={String(rule.noticePeriodDays)}
                icon={ExclamationTriangleIcon}
                theme={theme}
              />
              <p className="text-sm text-slate-600">
                This state does not specify a fixed statutory notice period for
                rent increases. The notice requirement is governed by the lease
                agreement. Review the details below and consult your lease or an
                attorney for specific guidance.
              </p>
            </>
          )}

          {/* Rent control */}
          {rule.rentControl && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <ScaleIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                Rent control / stabilization
              </h4>
              <p className="text-sm text-slate-600">
                {typeof rule.rentControl === "boolean"
                  ? rule.rentControl
                    ? "This state or local jurisdictions within it may have rent control or rent stabilization ordinances. Check local regulations."
                    : "This state does not have rent control or rent stabilization at the state level."
                  : rule.rentControl}
              </p>
            </div>
          )}

          {/* Additional requirements */}
          {rule.additionalRequirements && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <DocumentTextIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                Additional requirements
              </h4>
              <p className="text-sm text-slate-600">
                {rule.additionalRequirements}
              </p>
            </div>
          )}

          {/* Exceptions */}
          {rule.exceptions && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <ExclamationTriangleIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                Exceptions
              </h4>
              <p className="text-sm text-slate-600">{rule.exceptions}</p>
            </div>
          )}

          {/* Citations */}
          {rule.citations.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <DocumentTextIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                Legal citations
              </h4>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                {rule.citations.map((citation) => (
                  <li key={citation}>{citation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCButton variant="primary" theme={theme}>
                <HomeIcon className="w-4 h-4" />
                View {rule.name} Rules
              </LCButton>
            </Link>

            <Link href={`/calculators/us/${stateCode}`}>
              <LCButton variant="ghost" theme={theme}>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                All {rule.name} Calculators
              </LCButton>
            </Link>
          </div>
        </LCCard>
      )}

      {!computed && (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">
            Select a state, tenancy type, and date, then click{" "}
            <strong>Calculate Deadline</strong> to see the result.
          </p>
        </div>
      )}
    </div>
  );
}
