"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

import { evictionRules } from "@/app/data/us/evictionRules";
import type { EvictionRule } from "@/app/types/EvictionRules";
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
  MapPinIcon,
  ExclamationTriangleIcon,
  ArrowRightCircleIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof evictionRules;
type ReasonKey = "nonpayment" | "lease-violation" | "month-to-month" | "other";

const REASONS: { key: ReasonKey; label: string }[] = [
  { key: "nonpayment", label: "Nonpayment of rent" },
  { key: "lease-violation", label: "Lease violation" },
  { key: "month-to-month", label: "Month-to-month termination" },
  { key: "other", label: "Other" },
];

const STATE_KEYS = Object.keys(evictionRules).sort() as StateKey[];

function getNoticeValue(
  rule: EvictionRule,
  reason: ReasonKey
): number | string | null {
  if (reason === "nonpayment") {
    return rule.noticeForNonpayment;
  }
  if (reason === "lease-violation") {
    return rule.noticeForLeaseViolation;
  }
  return null;
}

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

interface EvictionNoticeCalculatorProps {
  initialState?: string;
}

export default function EvictionNoticeCalculator({
  initialState,
}: EvictionNoticeCalculatorProps) {
  const [stateCode, setStateCode] = useState<StateKey>(
    (initialState?.toLowerCase() as StateKey) || "ca"
  );
  const [reason, setReason] = useState<ReasonKey>("nonpayment");
  const [servedDate, setServedDate] = useState<string>(
    formatISODate(new Date())
  );
  const [computed, setComputed] = useState<boolean>(false);

  const rule: EvictionRule = evictionRules[stateCode];
  const theme: Theme = getTheme("us", stateCode);

  useEffect(() => {
    if (initialState && evictionRules[initialState.toLowerCase() as StateKey]) {
      setStateCode(initialState.toLowerCase() as StateKey);
    }
  }, [initialState]);

  const noticeValue = useMemo(
    () => getNoticeValue(rule, reason),
    [rule, reason]
  );

  const resultDeadline: Date | null = useMemo(() => {
    if (!computed) return null;
    if (!isNumberValue(noticeValue)) return null;
    const base = new Date(servedDate + "T00:00:00");
    if (isNaN(base.getTime())) return null;
    return addDays(base, noticeValue);
  }, [computed, noticeValue, servedDate]);

  const handleCalculate = () => {
    setComputed(true);
  };

  const handleStateChange = (code: StateKey) => {
    setStateCode(code);
    setComputed(false);
  };

  const handleReasonChange = (r: ReasonKey) => {
    setReason(r);
    setComputed(false);
  };

  const handleDateChange = (d: string) => {
    setServedDate(d);
    setComputed(false);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <LCSection
        title="Eviction Notice Calculator"
        description="Select a state, reason, and notice date to calculate the legal eviction notice deadline."
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
                  {evictionRules[key].name}
                </option>
              ))}
            </select>
          </LCField>

          <LCField label="Reason for eviction" theme={theme}>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              value={reason}
              onChange={(e) => handleReasonChange(e.target.value as ReasonKey)}
            >
              {REASONS.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
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
            title={`${rule.name} Eviction Notice Result`}
            description={`Based on ${REASONS.find((r) => r.key === reason)?.label.toLowerCase()}.`}
            icon={DocumentTextIcon}
            theme={theme}
          />

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
                The tenant must receive the notice by{" "}
                <strong>{formatDate(resultDeadline)}</strong>. After this date,
                the landlord may proceed with filing in court (subject to any
                cure periods).
              </p>
            </>
          ) : noticeValue !== null ? (
            <>
              <LCNotice
                label="Notice period"
                value={String(noticeValue)}
                icon={ExclamationTriangleIcon}
                theme={theme}
              />
              <p className="text-sm text-slate-600">
                This state does not specify a fixed number of days for this
                reason. The notice period is described above. Review the state
                rules for details.
              </p>
            </>
          ) : (
            <>
              <LCNotice
                label="Notice period"
                value="Varies by state and lease terms"
                icon={ExclamationTriangleIcon}
                theme={theme}
              />
              <p className="text-sm text-slate-600">
                The dataset does not include a specific notice period for{" "}
                <strong>
                  {REASONS.find((r) => r.key === reason)?.label.toLowerCase()}
                </strong>{" "}
                in {rule.name}. Review the state&apos;s full eviction rules for
                accurate deadlines.
              </p>
            </>
          )}

          <div className="pt-2 border-t" style={{ borderColor: theme.colors.primary ? `${theme.colors.primary}33` : undefined }}>
            <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
              Additional rules for {rule.name}
            </h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>
                <strong>Court filing:</strong> {rule.courtFilingTime}
              </li>
              <li>
                <strong>Tenant answer deadline:</strong> {rule.answerDeadline}
                {typeof rule.answerDeadline === "number" ? " days" : ""}
              </li>
              <li>
                <strong>Hearing timeline:</strong> {rule.hearingTimeline}
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/us/states/${stateCode}/eviction`}>
              <LCButton variant="primary" theme={theme}>
                <ArrowRightCircleIcon className="w-4 h-4" />
                View {rule.name} Eviction Rules
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
            Select a state, reason, and date, then click{" "}
            <strong>Calculate Deadline</strong> to see the result.
          </p>
        </div>
      )}
    </div>
  );
}
