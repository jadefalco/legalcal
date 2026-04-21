"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type EvictionReason =
  | "non-payment"
  | "landlord-use"
  | "renovation"
  | "cause"
  | "end-of-fixed-term"
  | "other";

interface EvictionResult {
  earliestDays: number | null;
  notes: string;
}

function calculateEvictionTimeline(
  reason: EvictionReason,
  noticeDate: string,
  disputed: boolean
): EvictionResult {
  let baseDays: number | null = null;
  let notes = "";

  switch (reason) {
    case "non-payment":
      baseDays = 10;
      notes =
        "Non-payment notices are often 10 days. Tenants may cancel the notice by paying within a short period.";
      break;
    case "landlord-use":
    case "renovation":
      baseDays = 60;
      notes =
        "For landlord use or major renovations, 2 months' notice is commonly required, plus possible compensation.";
      break;
    case "cause":
      baseDays = 30;
      notes =
        "For cause (other than non-payment), 1 month notice is often used. Details depend on the situation.";
      break;
    case "end-of-fixed-term":
      baseDays = 0;
      notes =
        "If a fixed-term tenancy is not continuing, the move-out date is usually the end of the term.";
      break;
    default:
      baseDays = null;
      notes =
        "The timeline depends heavily on the specific reason and tenancy details.";
  }

  if (baseDays === null) {
    return {
      earliestDays: null,
      notes,
    };
  }

  if (disputed) {
    return {
      earliestDays: baseDays + 30,
      notes:
        notes +
        " If the notice is disputed at the Residential Tenancy Branch, the actual timeline may be extended significantly.",
    };
  }

  return {
    earliestDays: baseDays,
    notes,
  };
}

export default function EvictionTimelineClient() {
  const [reason, setReason] = useState<EvictionReason>("non-payment");
  const [noticeDate, setNoticeDate] = useState("");
  const [disputed, setDisputed] = useState(false);
  const [result, setResult] = useState<EvictionResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateEvictionTimeline(reason, noticeDate, disputed);
    setResult(res);
  };

  const parsedDate = noticeDate ? new Date(noticeDate) : null;
  let estimatedDate: Date | null = null;
  if (parsedDate && result?.earliestDays != null) {
    estimatedDate = new Date(parsedDate);
    estimatedDate.setDate(estimatedDate.getDate() + result.earliestDays);
  }

  return (
    <CalculatorLayout
      title="BC Eviction Timeline Calculator"
      description="Estimate a rough earliest possible eviction date based on a notice given in British Columbia. This tool is a simplified guide and not legal advice."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Main reason for eviction notice
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as EvictionReason)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="non-payment">Non-payment of rent</option>
            <option value="landlord-use">
              Landlord or close family member moving in
            </option>
            <option value="renovation">Major renovation or demolition</option>
            <option value="cause">
              Cause (repeated late payment, disturbance, etc.)
            </option>
            <option value="end-of-fixed-term">
              End of fixed-term tenancy (not continuing)
            </option>
            <option value="other">Other / not sure</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Date the notice was given
            </label>
            <input
              type="date"
              value={noticeDate}
              onChange={(e) => setNoticeDate(e.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              id="disputed"
              type="checkbox"
              checked={disputed}
              onChange={(e) => setDisputed(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <label
              htmlFor="disputed"
              className="text-sm font-medium text-slate-700"
            >
              The tenant has applied (or plans to apply) to dispute the notice
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm hover:bg-slate-800"
        >
          Estimate eviction timeline
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Estimated earliest eviction date
          </h2>
          {result.earliestDays != null && estimatedDate ? (
            <>
              <p className="text-sm text-slate-800">
                Based on your answers, the{" "}
                <span className="font-semibold">
                  earliest possible eviction date
                </span>{" "}
                in a straightforward case could be around:
              </p>
              <p className="text-base font-semibold text-slate-900">
                {estimatedDate.toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-slate-600">
                This assumes approximately {result.earliestDays} days from the
                notice date. Actual timelines can be longer.
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-800">
              This tool could not estimate a specific date for the selected
              situation.
            </p>
          )}
          <p className="text-xs text-slate-600">{result.notes}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Eviction processes are
            technical and time-sensitive. Always confirm with the BC Residential
            Tenancy Branch or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
