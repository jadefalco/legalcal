"use client";

import React, { useState } from "react";
import { evictionRules } from "../data/us/evictionRules";

type StateKey = keyof typeof evictionRules;

type ReasonKey = "nonpayment" | "violation";

const REASONS: { key: ReasonKey; label: string }[] = [
  { key: "nonpayment", label: "Nonpayment of rent" },
  { key: "violation", label: "Lease violation" },
];

export const EvictionCalculator: React.FC = () => {
  const stateKeys = Object.keys(evictionRules) as StateKey[];
  const [state, setState] = useState<StateKey>("ca");
  const [reason, setReason] = useState<ReasonKey>("nonpayment");

  const rules = evictionRules[state];

  const getNoticeValue = () => {
    if (reason === "nonpayment") return rules.noticeForNonpayment;
    if (reason === "violation") return rules.noticeForLeaseViolation;
    return null;
  };

  const notice = getNoticeValue();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Eviction Notice Calculator</h1>
      <p className="text-sm text-slate-600">
        Select a state and reason to see the typical notice period and basic
        eviction timeline. This is general information, not legal advice.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">State</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={state}
            onChange={(e) => setState(e.target.value as StateKey)}
          >
            {stateKeys.map((key) => (
              <option key={key} value={key}>
                {evictionRules[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Reason</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={reason}
            onChange={(e) => setReason(e.target.value as ReasonKey)}
          >
            {REASONS.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-slate-50 space-y-3">
        <div className="text-sm text-slate-600">
          <span className="font-semibold">{rules.name}</span> ·{" "}
          {reason === "nonpayment"
            ? "Nonpayment of rent"
            : "Lease violation"}
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Notice required
          </div>
          <div className="text-xl font-semibold">
            {notice === null
              ? "Varies"
              : typeof notice === "number"
              ? `${notice} days`
              : notice}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            When can the landlord file?
          </div>
          <div className="text-sm text-slate-700">
            {rules.courtFilingTime || "After the notice period expires."}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Tenant response / answer
            </div>
            <div className="text-sm text-slate-700">
              {rules.answerDeadline || "Varies by court and case type."}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Hearing timeline
            </div>
            <div className="text-sm text-slate-700">
              {rules.hearingTimeline || "Often a few weeks after filing."}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Lockout / physical eviction
          </div>
          <div className="text-sm text-slate-700">
            {rules.lockoutAllowedAfter ||
              "Only authorized officers may perform a physical lockout after a court order."}
          </div>
        </div>

        {rules.citations?.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Key citations
            </div>
            <ul className="text-xs text-slate-600 list-disc list-inside space-y-0.5">
              {rules.citations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-slate-500">
          This tool is for general educational purposes only and does not create
          an attorney–client relationship. Local rules, subsidized housing, and
          special programs may change the notice required.
        </p>
      </div>
    </div>
  );
};