"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

import { leaseTerminationRules } from "@/app/data/us/leaseTerminationRules";
import type { LeaseTerminationRule } from "@/app/types/LeaseTerminationRules";
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
  ExclamationTriangleIcon,
  ArrowRightCircleIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof leaseTerminationRules;

type TenancyType = "month-to-month" | "fixed-term";

const STATE_KEYS = Object.keys(leaseTerminationRules).sort() as StateKey[];

const TENANCY_TYPES: { key: TenancyType; label: string }[] = [
  { key: "month-to-month", label: "Month-to-month" },
  { key: "fixed-term", label: "Fixed-term lease" },
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

function isNumberValue(v: number | string | null): v is number {
  return typeof v === "number";
}

function getNoticeValue(
  rule: LeaseTerminationRule,
  tenancyType: TenancyType
): number | string | null {
  if (tenancyType === "month-to-month") {
    return rule.monthToMonthNoticeDays;
  }
  return null;
}

interface LeaseTerminationCalculatorProps {
  initialState?: string;
}

export default function LeaseTerminationCalculator({
  initialState,
}: LeaseTerminationCalculatorProps) {
  const [stateCode, setStateCode] = useState<StateKey>(
    (initialState?.toLowerCase() as StateKey) || "ca"
  );
  const [tenancyType, setTenancyType] = useState<TenancyType>("month-to-month");
  const [servedDate, setServedDate] = useState<string>(
    formatISODate(new Date())
  );
  const [dvProtection, setDvProtection] = useState<boolean>(false);
  const [computed, setComputed] = useState<boolean>(false);

  const rule: LeaseTerminationRule = leaseTerminationRules[stateCode];
  const theme: Theme = getTheme("us", stateCode);

  useEffect(() => {
    if (
      initialState &&
      leaseTerminationRules[initialState.toLowerCase() as StateKey]
    ) {
      setStateCode(initialState.toLowerCase() as StateKey);
    }
  }, [initialState]);

  const noticeValue = useMemo(
    () => getNoticeValue(rule, tenancyType),
    [rule, tenancyType]
  );

  const resultDeadline: Date | null = useMemo(() => {
    if (!computed) return null;
    if (tenancyType !== "month-to-month") return null;
    if (!isNumberValue(noticeValue)) return null;
    const base = new Date(servedDate + "T00:00:00");
    if (isNaN(base.getTime())) return null;
    return addDays(base, noticeValue);
  }, [computed, tenancyType, noticeValue, servedDate]);

  const handleCalculate = () => {
    setComputed(true);
  };

  const handleStateChange = (code: StateKey) => {
    setStateCode(code);
    setComputed(false);
  };

  const handleTenancyChange = (t: TenancyType) => {
    setTenancyType(t);
    setComputed(false);
  };

  const handleDateChange = (d: string) => {
    setServedDate(d);
    setComputed(false);
  };

  const handleDvChange = (checked: boolean) => {
    setDvProtection(checked);
    setComputed(false);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <LCSection
        title="Lease Termination Notice Calculator"
        description="Select a state, tenancy type, and notice date to calculate the legal lease termination deadline."
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
                  {leaseTerminationRules[key].name}
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

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dv-protection"
            className="w-4 h-4 rounded border-slate-300"
            checked={dvProtection}
            onChange={(e) => handleDvChange(e.target.checked)}
          />
          <label
            htmlFor="dv-protection"
            className="text-sm text-slate-700 cursor-pointer select-none"
          >
            Domestic violence early termination protection applies
          </label>
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
            title={`${rule.name} Lease Termination Result`}
            description={`Tenancy type: ${
              TENANCY_TYPES.find((t) => t.key === tenancyType)?.label
            }.`}
            icon={DocumentTextIcon}
            theme={theme}
          />

          {/* Month-to-month result */}
          {tenancyType === "month-to-month" && (
            <>
              {isNumberValue(noticeValue) && resultDeadline ? (
                <>
                  <LCNotice
                    label="Notice period required"
                    value={`${noticeValue} days`}
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
                    The terminating party must provide written notice by{" "}
                    <strong>{formatDate(resultDeadline)}</strong> before the
                    lease termination can take effect.
                  </p>
                </>
              ) : (
                <>
                  <LCNotice
                    label="Notice period"
                    value={String(noticeValue)}
                    icon={ExclamationTriangleIcon}
                    theme={theme}
                  />
                  <p className="text-sm text-slate-600">
                    This state does not specify a fixed number of days for
                    month-to-month lease termination. The notice requirement is
                    described above. Review the details below and consult your
                    lease or an attorney for specific guidance.
                  </p>
                </>
              )}
            </>
          )}

          {/* Fixed-term result */}
          {tenancyType === "fixed-term" && (
            <>
              <LCNotice
                label="Fixed-term early termination rules"
                value={rule.fixedTermEarlyTerminationRules}
                icon={ExclamationTriangleIcon}
                theme={theme}
              />
              <p className="text-sm text-slate-600">
                Fixed-term leases are generally governed by the lease agreement.
                Early termination may be permitted under specific circumstances
                listed above. Consult your lease and an attorney for specific
                guidance.
              </p>
            </>
          )}

          {/* Domestic violence protections */}
          {dvProtection && rule.domesticViolenceProtections && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <ShieldCheckIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                Domestic violence early termination protection
              </h4>
              <p className="text-sm text-slate-600">
                {rule.domesticViolenceProtections}
              </p>
            </div>
          )}

          {dvProtection && !rule.domesticViolenceProtections && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <ShieldCheckIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                Domestic violence early termination protection
              </h4>
              <p className="text-sm text-slate-600">
                This state does not have a specific statutory provision for
                early lease termination due to domestic violence. Federal law
                and general landlord-tenant remedies may still apply. Consult an
                attorney for guidance.
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
                <ArrowRightCircleIcon className="w-4 h-4" />
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
