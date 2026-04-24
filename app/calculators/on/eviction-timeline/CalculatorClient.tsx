"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type NoticeType =
  | "N4"
  | "N5"
  | "N6"
  | "N7"
  | "N12"
  | "N13";

interface TimelineResult {
  message: string;
}

function calculateTimeline(notice: NoticeType): TimelineResult {
  const msg = (text: string) => ({ message: text });

  switch (notice) {
    case "N4":
      return msg(
        `N4 – Non‑payment of Rent

Notice period:
• 14 days (monthly tenancy)
• 7 days (weekly tenancy)

Tenant can void by:
• Paying all rent + costs before the L1 hearing.

Typical timeline:
• After notice expires, landlord files L1 with the LTB.
• Hearing scheduling: often 2–4 months depending on backlog.
• If eviction ordered, tenant usually gets 11 days to pay and void.
• Sheriff enforcement: typically 4–8 weeks after the order is issued.

Total estimated timeline: 3–6+ months.`
      );

    case "N5":
      return msg(
        `N5 – Substantial Interference / Damage / Overcrowding

Notice period:
• First N5: 7 days to correct the issue.
• Second N5 within 6 months: no correction period.

Timeline:
• If not corrected, landlord files L2.
• Hearing scheduling: 2–5 months.
• Sheriff enforcement: 4–8 weeks after order.

Total estimated timeline: 3–7+ months.`
      );

    case "N6":
      return msg(
        `N6 – Illegal Acts

Notice period:
• 10 days.

Timeline:
• Landlord may file L2 immediately after notice expires.
• Hearing scheduling: 1–4 months.
• Sheriff enforcement: 4–8 weeks after order.

Total estimated timeline: 2–6+ months.`
      );

    case "N7":
      return msg(
        `N7 – Safety Risk / Serious Impairment

Notice period:
• 10 days.
• No right to void.

Timeline:
• L2 application after notice expires.
• Hearing scheduling: 1–4 months.
• Sheriff enforcement: 4–8 weeks after order.

Total estimated timeline: 2–6+ months.`
      );

    case "N12":
      return msg(
        `N12 – Landlord’s Own Use / Family Use

Notice period:
• 60 days.
• Must give one month’s compensation.

Timeline:
• L2 application after notice expires.
• Hearing scheduling: 3–6 months.
• Sheriff enforcement: 4–8 weeks after order.

Total estimated timeline: 6–10+ months.`
      );

    case "N13":
      return msg(
        `N13 – Renovation / Demolition / Conversion

Notice period:
• 120 days.
• Compensation required (1–3 months depending on reason).

Timeline:
• L2 application after notice expires.
• Hearing scheduling: 3–7 months.
• Sheriff enforcement: 4–8 weeks after order.

Total estimated timeline: 8–14+ months.`
      );

    default:
      return msg("Select a valid notice type.");
  }
}

export default function OntarioEvictionTimelineClient() {
  const [notice, setNotice] = useState<NoticeType>("N4");
  const [result, setResult] = useState<TimelineResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateTimeline(notice);
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Ontario Eviction Timeline Calculator"
      description="Estimate eviction timelines under Ontario’s Residential Tenancies Act."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NOTICE TYPE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Notice type
          </label>
          <select
            value={notice}
            onChange={(e) => setNotice(e.target.value as NoticeType)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
          >
            <option value="N4">N4 – Non‑payment of rent</option>
            <option value="N5">N5 – Substantial interference / damage</option>
            <option value="N6">N6 – Illegal acts</option>
            <option value="N7">N7 – Safety risk / serious impairment</option>
            <option value="N12">N12 – Landlord’s own use</option>
            <option value="N13">N13 – Renovation / demolition</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00205B] transition-colors"
        >
          Calculate eviction timeline
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            Ontario Residential Tenancies Act and Landlord and Tenant Board
            (LTB) rules.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}