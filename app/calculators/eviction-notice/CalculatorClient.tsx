"use client";

import React, { useEffect, useState } from "react";
import { evictionRules } from "@/app/data/us/evictionRules";
import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";

// LC Components
import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCTimeline } from "@/app/components/lc/LCTimeline";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCStickySidebar } from "@/app/components/lc/LCStickySidebar";

// Icons
import {
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
  ShareIcon,
  PrinterIcon,
  LinkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof evictionRules;
type ReasonKey = "nonpayment" | "violation";

const REASONS: { key: ReasonKey; label: string }[] = [
  { key: "nonpayment", label: "Nonpayment of rent" },
  { key: "violation", label: "Lease violation" },
];

// Normalize all values to strings (fixes all TS errors)
const toStr = (v: string | number | null) =>
  v === null ? "Varies" : typeof v === "number" ? `${v}` : v;

export default function CalculatorClient() {
  const stateKeys = Object.keys(evictionRules) as StateKey[];
  const [state, setState] = useState<StateKey>("ca");
  const [reason, setReason] = useState<ReasonKey>("nonpayment");
  const [mounted, setMounted] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const theme: Theme = getTheme("us", state);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("state") as StateKey | null;
      const r = params.get("reason") as ReasonKey | null;

      if (s && evictionRules[s]) setState(s);
      if (r === "nonpayment" || r === "violation") setReason(r);
    }
  }, []);

  const rules = evictionRules[state];

  const rawNotice =
    reason === "nonpayment"
      ? rules.noticeForNonpayment
      : rules.noticeForLeaseViolation;

  const notice = toStr(
    typeof rawNotice === "number" ? `${rawNotice} days` : rawNotice
  );

  const timelineSteps = [
    {
      title: "Notice Period",
      description: notice,
      icon: ExclamationTriangleIcon,
      color: "text-amber-600",
    },
    {
      title: "Landlord Can File",
      description: toStr(rules.courtFilingTime),
      icon: CalendarDaysIcon,
      color: "text-blue-600",
    },
    {
      title: "Tenant Answer Deadline",
      description: toStr(rules.answerDeadline),
      icon: ClockIcon,
      color: "text-purple-600",
    },
    {
      title: "Hearing Timeline",
      description: toStr(rules.hearingTimeline),
      icon: ClockIcon,
      color: "text-green-600",
    },
    {
      title: "Lockout / Physical Eviction",
      description: toStr(rules.lockoutAllowedAfter),
      icon: ExclamationTriangleIcon,
      color: "text-red-600",
    },
  ];

  const copyResults = () => {
    const text = `
Eviction Notice Results — ${rules.name}

Reason: ${reason === "nonpayment" ? "Nonpayment of rent" : "Lease violation"}

Notice Required:
${notice}

When Landlord Can File:
${rules.courtFilingTime}

Tenant Answer Deadline:
${rules.answerDeadline}

Hearing Timeline:
${rules.hearingTimeline}

Lockout / Physical Eviction:
${rules.lockoutAllowedAfter}

Citations:
${rules.citations?.join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopyStatus("copied");
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const copyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("state", state);
    url.searchParams.set("reason", reason);

    navigator.clipboard.writeText(url.toString());
    setShareStatus("copied");
    setTimeout(() => setShareStatus("idle"), 2000);
  };

  const exportPDF = () => window.print();

  return (
    <div
      className={`max-w-5xl mx-auto py-10 transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        {/* MAIN COLUMN */}
        <div className="space-y-6">
          <LCSection
            title="Eviction Notice Calculator"
            description="Select a state and reason to see the required notice period and eviction timeline."
            icon={ArrowRightCircleIcon}
            theme={theme}
          />

          <LCCard theme={theme}>
            {/* Inputs */}
            <div className="grid gap-6 md:grid-cols-2">
              <LCField label="State" theme={theme}>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={state}
                  onChange={(e) => setState(e.target.value as StateKey)}
                >
                  {stateKeys.map((key) => (
                    <option key={key} value={key}>
                      {evictionRules[key].name}
                    </option>
                  ))}
                </select>
              </LCField>

              <LCField label="Reason" theme={theme}>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={reason}
                  onChange={(e) => setReason(e.target.value as ReasonKey)}
                >
                  {REASONS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </LCField>
            </div>

            {/* Notice */}
            <LCNotice
              label="Notice Required"
              value={notice}
              icon={ExclamationTriangleIcon}
              theme={theme}
            />

            {/* Filing */}
            <LCNotice
              label="When can the landlord file?"
              value={toStr(rules.courtFilingTime)}
              icon={CalendarDaysIcon}
              color="text-slate-700"
              theme={theme}
            />

            {/* Answer + Hearing */}
            <div className="grid gap-4 md:grid-cols-2">
              <LCNotice
                label="Tenant answer deadline"
                value={toStr(rules.answerDeadline)}
                icon={ClockIcon}
                color="text-slate-700"
                theme={theme}
              />
              <LCNotice
                label="Hearing timeline"
                value={toStr(rules.hearingTimeline)}
                icon={ClockIcon}
                color="text-slate-700"
                theme={theme}
              />
            </div>

            {/* Lockout */}
            <LCNotice
              label="Lockout / physical eviction"
              value={toStr(rules.lockoutAllowedAfter)}
              icon={ExclamationTriangleIcon}
              color="text-slate-700"
              theme={theme}
            />

            {/* Citations */}
            {rules.citations?.length > 0 && (
              <div className="mt-4">
                <LCSection title="Key Citations" icon={DocumentTextIcon} theme={theme} />
                <ul className="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                  {rules.citations.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline */}
            <LCTimeline
              title="Eviction Process Timeline"
              icon={ArrowRightCircleIcon}
              steps={timelineSteps}
              theme={theme}
            />

            {/* Disclaimer */}
            <p className="text-xs text-slate-500 mt-4 flex items-start gap-1">
              <InformationCircleIcon className="w-4 h-4 mt-0.5 text-slate-400" />
              This tool is for general educational purposes only and does not
              create an attorney–client relationship.
            </p>
          </LCCard>
        </div>

        {/* SIDEBAR */}
        <LCStickySidebar theme={theme}>
          <LCCard theme={theme} className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <DocumentTextIcon className="w-4 h-4 text-slate-600" />
              Summary for {rules.name}
            </h3>

            <p className="text-xs text-slate-600">
              {reason === "nonpayment" ? "Nonpayment of rent" : "Lease violation"}
              {" · "}
              {notice}
            </p>

            <LCButton onClick={copyResults} variant="primary" theme={theme}>
              <DocumentTextIcon className="w-4 h-4" />
              {copyStatus === "copied" ? "Copied!" : "Copy results"}
            </LCButton>

            <LCButton onClick={copyShareLink} variant="secondary" theme={theme}>
              <ShareIcon className="w-4 h-4" />
              {shareStatus === "copied" ? "Link copied!" : "Copy share link"}
            </LCButton>

            <LCButton onClick={exportPDF} variant="ghost" theme={theme}>
              <PrinterIcon className="w-4 h-4" />
              Print / Save as PDF
            </LCButton>
          </LCCard>

          <LCCard theme={theme}>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              State details page
            </h3>
            <code className="block text-[11px] bg-slate-900 text-slate-100 rounded px-2 py-1 mt-2">
              /us/states/{state}
            </code>
          </LCCard>
        </LCStickySidebar>
      </div>
    </div>
  );
}
