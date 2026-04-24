"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type Reason =
  | "nonpayment"
  | "breach"
  | "illegal"
  | "periodic"
  | "renovation"
  | "condo"
  | "fixed"
  | "emergency";

type TenancyType = "monthly" | "weekly" | "fixed";
type Path = "rtdrs" | "court";

interface TimelineResult {
  message: string;
}

function calculateEvictionTimeline({
  reason,
  tenancyType,
  path,
}: {
  reason: Reason;
  tenancyType: TenancyType;
  path: Path;
}): TimelineResult {
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // NOTICE PERIODS
  // -----------------------------
  let notice = "";
  if (reason === "nonpayment") notice = "14-day notice for non-payment.";
  if (reason === "breach") notice = "14-day notice for substantial breach.";
  if (reason === "illegal") notice = "24-hour notice for illegal activity.";
  if (reason === "periodic") {
    notice =
      tenancyType === "monthly"
        ? "3 full tenancy months of notice to end a monthly periodic tenancy."
        : "1 full tenancy week of notice to end a weekly periodic tenancy.";
  }
  if (reason === "renovation" || reason === "condo") {
    notice = "365-day notice for major renovation, demolition, or condo conversion.";
  }
  if (reason === "fixed") {
    notice =
      "No notice required. A fixed-term tenancy ends automatically on the end date unless renewed.";
  }
  if (reason === "emergency") {
    notice = "24-hour termination for emergency situations involving safety or severe damage.";
  }

  // -----------------------------
  // RTDRS VS COURT TIMELINES
  // -----------------------------
  let filing = "";
  let hearing = "";
  let enforcement = "";

  if (path === "rtdrs") {
    filing = "Landlord may file with RTDRS immediately after the notice period expires.";
    hearing = "RTDRS hearings are typically scheduled within 5–15 days.";
    enforcement =
      "If granted, a Possession Order can be enforced by a Civil Enforcement Agency within 3–10 days.";
  } else {
    filing = "Landlord may file in Provincial Court after the notice period expires.";
    hearing = "Court hearings often take 4–8 weeks depending on availability.";
    enforcement =
      "If granted, a Possession Order is enforced by a Civil Enforcement Agency, usually within 7–14 days.";
  }

  // -----------------------------
  // TOTAL ESTIMATED TIMELINE
  // -----------------------------
  const total =
    path === "rtdrs"
      ? "Most RTDRS-based evictions take 3–6 weeks from notice to enforcement."
      : "Court-based evictions often take 6–12 weeks from notice to enforcement.";

  return msg(
    `
    Notice period: ${notice}

    Filing: ${filing}

    Hearing timeline: ${hearing}

    Enforcement: ${enforcement}

    Estimated total eviction duration: ${total}

    Always confirm with the Alberta Residential Tenancies Act and RTDRS guidelines.
    `
  );
}

export default function EvictionTimelineClient() {
  const [reason, setReason] = useState<Reason>("nonpayment");
  const [tenancyType, setTenancyType] = useState<TenancyType>("monthly");
  const [path, setPath] = useState<Path>("rtdrs");
  const [result, setResult] = useState<TimelineResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateEvictionTimeline({ reason, tenancyType, path });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Alberta Eviction Timeline Calculator"
      description="Estimate how long an eviction takes in Alberta, including notice periods, RTDRS filing timelines, hearing wait times, possession orders, and enforcement steps."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* REASON */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Reason for eviction
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as Reason)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="nonpayment">Non-payment of rent</option>
            <option value="breach">Substantial breach</option>
            <option value="illegal">Illegal activity (24-hour)</option>
            <option value="periodic">Ending periodic tenancy</option>
            <option value="renovation">Major renovation / demolition</option>
            <option value="condo">Condo conversion</option>
            <option value="fixed">Fixed-term ending</option>
            <option value="emergency">Emergency (24-hour)</option>
          </select>
        </div>

        {/* TENANCY TYPE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Tenancy type
          </label>
          <select
            value={tenancyType}
            onChange={(e) => setTenancyType(e.target.value as TenancyType)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="fixed">Fixed-term</option>
          </select>
        </div>

        {/* PATH */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Filing path
          </label>
          <select
            value={path}
            onChange={(e) => setPath(e.target.value as Path)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="rtdrs">RTDRS (recommended)</option>
            <option value="court">Provincial Court</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0077C8] transition-colors"
        >
          Calculate timeline
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            Alberta Residential Tenancies Act and RTDRS guidelines.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}