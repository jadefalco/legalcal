"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
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
  DocumentTextIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ArrowRightCircleIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

import {
  generateEvictionNotice,
  generateEvictionNoticePlainText,
} from "./generateEvictionNotice";

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

function formatISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function isNumberValue(v: number | string | null): v is number {
  return typeof v === "number";
}

interface EvictionNoticeGeneratorProps {
  initialState?: string;
}

export default function EvictionNoticeGenerator({
  initialState,
}: EvictionNoticeGeneratorProps) {
  const [stateCode, setStateCode] = useState<StateKey>(
    (initialState?.toLowerCase() as StateKey) || "ca"
  );
  const [reason, setReason] = useState<ReasonKey>("nonpayment");
  const [servedDate, setServedDate] = useState<string>(formatISODate(new Date()));
  const [tenantName, setTenantName] = useState<string>("");
  const [landlordName, setLandlordName] = useState<string>("");
  const [rentalAddress, setRentalAddress] = useState<string>("");
  const [rentalCity, setRentalCity] = useState<string>("");
  const [amountOwed, setAmountOwed] = useState<string>("");
  const [violationDescription, setViolationDescription] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Personal delivery");
  const [computed, setComputed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);

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
    if (!isNumberValue(noticeValue)) return null;
    const base = new Date(servedDate + "T00:00:00");
    if (isNaN(base.getTime())) return null;
    return addDays(base, noticeValue);
  }, [noticeValue, servedDate]);

  const deadlineStr = resultDeadline ? formatISODate(resultDeadline) : null;

  const noticeHtml = useMemo(() => {
    if (!computed) return "";
    return generateEvictionNotice({
      input: {
        stateCode,
        reason,
        servedDate,
        tenantName,
        landlordName,
        rentalAddress,
        rentalCity,
        amountOwed,
        violationDescription,
        additionalNotes,
        deliveryMethod,
      },
      rule,
      noticeValue,
      deadline: deadlineStr,
      reasonLabel: REASONS.find((r) => r.key === reason)?.label ?? reason,
    });
  }, [
    computed,
    stateCode,
    reason,
    servedDate,
    tenantName,
    landlordName,
    rentalAddress,
    rentalCity,
    amountOwed,
    violationDescription,
    additionalNotes,
    deliveryMethod,
    rule,
    noticeValue,
    deadlineStr,
  ]);

  const noticePlainText = useMemo(() => {
    if (!computed) return "";
    return generateEvictionNoticePlainText({
      input: {
        stateCode,
        reason,
        servedDate,
        tenantName,
        landlordName,
        rentalAddress,
        rentalCity,
        amountOwed,
        violationDescription,
        additionalNotes,
        deliveryMethod,
      },
      rule,
      noticeValue,
      deadline: deadlineStr,
      reasonLabel: REASONS.find((r) => r.key === reason)?.label ?? reason,
    });
  }, [
    computed,
    stateCode,
    reason,
    servedDate,
    tenantName,
    landlordName,
    rentalAddress,
    rentalCity,
    amountOwed,
    violationDescription,
    additionalNotes,
    deliveryMethod,
    rule,
    noticeValue,
    deadlineStr,
  ]);

  const handleGenerate = () => {
    setComputed(true);
    setCopied(false);
  };

  const handleCopy = useCallback(async () => {
    if (!noticePlainText) return;
    try {
      await navigator.clipboard.writeText(noticePlainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = noticePlainText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [noticePlainText]);

  const handleDownload = useCallback(() => {
    if (!noticePlainText) return;
    const blob = new Blob([noticePlainText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eviction-notice-${stateCode}-${servedDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [noticePlainText, stateCode, servedDate]);

  const handleStateChange = (code: StateKey) => {
    setStateCode(code);
    setComputed(false);
  };

  const handleReasonChange = (r: ReasonKey) => {
    setReason(r);
    setComputed(false);
  };

  const showAmountOwed = reason === "nonpayment";
  const showViolation = reason === "lease-violation";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <LCSection
        title="Eviction Notice Generator"
        description="Generate a jurisdiction-specific eviction notice letter for any US state. Fill in the details below to create a legally structured notice."
        icon={DocumentTextIcon}
        theme={theme}
      />

      {/* INPUTS */}
      <LCCard theme={theme} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
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
              onChange={(e) => {
                setServedDate(e.target.value);
                setComputed(false);
              }}
            />
          </LCField>

          <LCField label="Delivery method" theme={theme}>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              value={deliveryMethod}
              onChange={(e) => {
                setDeliveryMethod(e.target.value);
                setComputed(false);
              }}
            >
              <option>Personal delivery</option>
              <option>Certified mail, return receipt requested</option>
              <option>Posted on door</option>
              <option>Regular mail</option>
              <option>Process server</option>
            </select>
          </LCField>

          <LCField label="Tenant name" theme={theme}>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              placeholder="Full name of tenant"
              value={tenantName}
              onChange={(e) => {
                setTenantName(e.target.value);
                setComputed(false);
              }}
            />
          </LCField>

          <LCField label="Landlord name" theme={theme}>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              placeholder="Full name of landlord or property manager"
              value={landlordName}
              onChange={(e) => {
                setLandlordName(e.target.value);
                setComputed(false);
              }}
            />
          </LCField>

          <LCField label="Rental address" theme={theme}>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              placeholder="Street address"
              value={rentalAddress}
              onChange={(e) => {
                setRentalAddress(e.target.value);
                setComputed(false);
              }}
            />
          </LCField>

          <LCField label="City" theme={theme}>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              placeholder="City"
              value={rentalCity}
              onChange={(e) => {
                setRentalCity(e.target.value);
                setComputed(false);
              }}
            />
          </LCField>

          {showAmountOwed && (
            <LCField label="Amount owed" theme={theme}>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                placeholder="e.g., $1,500.00"
                value={amountOwed}
                onChange={(e) => {
                  setAmountOwed(e.target.value);
                  setComputed(false);
                }}
              />
            </LCField>
          )}

          {showViolation && (
            <LCField label="Violation description" theme={theme}>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                placeholder="e.g., Unauthorized pet, noise violations..."
                value={violationDescription}
                onChange={(e) => {
                  setViolationDescription(e.target.value);
                  setComputed(false);
                }}
              />
            </LCField>
          )}

          <LCField label="Additional notes (optional)" theme={theme}>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              placeholder="Any additional information to include in the notice"
              value={additionalNotes}
              onChange={(e) => {
                setAdditionalNotes(e.target.value);
                setComputed(false);
              }}
            />
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleGenerate}>
          <DocumentTextIcon className="w-4 h-4" />
          Generate Notice
        </LCButton>
      </LCCard>

      {/* PREVIEW */}
      {computed && (
        <>
          {/* Deadlines summary */}
          <LCCard theme={theme} className="space-y-4">
            <LCSection
              title={`${rule.name} Eviction Notice Summary`}
              description={`Based on ${REASONS.find((r) => r.key === reason)?.label.toLowerCase()}.`}
              icon={ExclamationTriangleIcon}
              theme={theme}
            />

            {isNumberValue(noticeValue) && resultDeadline ? (
              <>
                <LCNotice
                  label="Notice period required"
                  value={`${noticeValue} days`}
                  icon={CalendarDaysIcon}
                  theme={theme}
                />
                <LCNotice
                  label="Legal deadline"
                  value={resultDeadline.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  icon={CalendarDaysIcon}
                  theme={theme}
                />
              </>
            ) : noticeValue !== null ? (
              <LCNotice
                label="Notice period"
                value={String(noticeValue)}
                icon={ExclamationTriangleIcon}
                theme={theme}
              />
            ) : (
              <LCNotice
                label="Notice period"
                value="Varies by state and lease terms"
                icon={ExclamationTriangleIcon}
                theme={theme}
              />
            )}

            <div className="pt-2 border-t" style={{ borderColor: theme.colors.primary ? `${theme.colors.primary}33` : undefined }}>
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <HomeIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
                Additional rules for {rule.name}
              </h4>
              <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li><strong>Court filing:</strong> {rule.courtFilingTime}</li>
                <li>
                  <strong>Tenant answer deadline:</strong> {rule.answerDeadline}
                  {typeof rule.answerDeadline === "number" ? " days" : ""}
                </li>
                <li><strong>Hearing timeline:</strong> {rule.hearingTimeline}</li>
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

          {/* Document preview */}
          <LCCard theme={theme} className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <LCSection
                title="Generated Notice"
                description="Preview your eviction notice below."
                icon={DocumentTextIcon}
                theme={theme}
              />
              <div className="flex gap-2">
                <LCButton variant="ghost" theme={theme} onClick={handleCopy}>
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy text"}
                </LCButton>
                <LCButton variant="primary" theme={theme} onClick={handleDownload}>
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download .txt
                </LCButton>
              </div>
            </div>

            <div
              ref={previewRef}
              className="border rounded-lg overflow-hidden bg-white"
              style={{ borderColor: theme.colors.primary ? `${theme.colors.primary}33` : undefined }}
              dangerouslySetInnerHTML={{ __html: noticeHtml }}
            />
          </LCCard>
        </>
      )}

      {!computed && (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">
            Fill in the details above and click{" "}
            <strong>Generate Notice</strong> to create your eviction notice.
          </p>
        </div>
      )}
    </div>
  );
}
