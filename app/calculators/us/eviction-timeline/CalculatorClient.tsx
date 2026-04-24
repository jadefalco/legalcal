"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type USState = "CA" | "WA" | "NY" | "FL" | "TX";

type EvictionReason =
  | "non-payment"
  | "landlord-use"
  | "renovation"
  | "cause"
  | "end-of-fixed-term"
  | "other";

interface EvictionResult {
  message: string;
}

function calculateEvictionTimelineUS({
  state,
  reason,
}: {
  state: USState;
  reason: EvictionReason;
  noticeDate: string;
  disputed: boolean;
}): EvictionResult {
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // CALIFORNIA (CA)
  // -----------------------------
  if (state === "CA") {
    if (reason === "non-payment") {
      return msg(
        "California requires a 3‑day notice to pay or quit for non‑payment. Eviction can proceed only after the notice expires and the landlord files an unlawful detainer."
      );
    }
    if (reason === "landlord-use") {
      return msg(
        "California owner move‑in or family move‑in typically requires 30–60 days’ notice depending on tenancy length, followed by an unlawful detainer if the tenant does not vacate."
      );
    }
    if (reason === "renovation") {
      return msg(
        "California substantial renovation or demolition usually requires 60 days’ notice. Local rent‑control rules may add relocation assistance or extended timelines."
      );
    }
    return msg(
      "California no‑fault evictions generally require 30–60 days’ notice depending on tenancy length, followed by an unlawful detainer if the tenant does not vacate."
    );
  }

  // -----------------------------
  // WASHINGTON (WA)
  // -----------------------------
  if (state === "WA") {
    if (reason === "non-payment") {
      return msg(
        "Washington requires a 14‑day notice to pay or vacate for non‑payment. After 14 days, the landlord may file an eviction action."
      );
    }
    if (reason === "landlord-use") {
      return msg(
        "Washington requires 60 days’ notice for most no‑cause terminations. Eviction can proceed only after the notice expires and a court order is obtained."
      );
    }
    if (reason === "renovation") {
      return msg(
        "Washington requires 120 days’ notice for substantial rehabilitation or demolition."
      );
    }
    return msg("Washington no‑cause terminations generally require 60 days’ notice.");
  }

  // -----------------------------
  // NEW YORK (NY)
  // -----------------------------
  if (state === "NY") {
    if (reason === "non-payment") {
      return msg(
        "New York requires a 14‑day rent demand before the landlord can file a non‑payment eviction case in Housing Court."
      );
    }
    if (reason === "landlord-use" || reason === "other") {
      return msg(
        "New York no‑fault termination requires 30 days (<1 year), 60 days (1–2 years), or 90 days (>2 years), followed by a court proceeding if the tenant does not vacate."
      );
    }
    if (reason === "renovation") {
      return msg(
        "New York renovation‑based evictions require proper notice and a court order; timelines vary by jurisdiction."
      );
    }
  }

  // -----------------------------
  // FLORIDA (FL)
  // -----------------------------
  if (state === "FL") {
    if (reason === "non-payment") {
      return msg(
        "Florida requires a 3‑day notice to pay or vacate for non‑payment. After 3 days, the landlord may file for eviction."
      );
    }
    if (reason === "cause") {
      return msg(
        "Florida requires a 7‑day notice to cure or vacate for cause. If not cured, the landlord may file for eviction."
      );
    }
    return msg(
      "Florida month‑to‑month terminations require 15 days’ notice before the end of the rental period."
    );
  }

  // -----------------------------
  // TEXAS (TX)
  // -----------------------------
  if (state === "TX") {
    if (reason === "non-payment") {
      return msg(
        "Texas generally requires a 3‑day notice to vacate for non‑payment unless the lease specifies a different period. After that, the landlord may file an eviction case."
      );
    }
    return msg(
      "Texas typically requires 30 days’ notice for most terminations unless the lease specifies otherwise."
    );
  }

  return msg(
    "Eviction timelines vary by state and situation. Confirm with local housing authorities."
  );
}

export default function EvictionTimelineClient() {
  const [state, setState] = useState<USState>("CA");
  const [reason, setReason] = useState<EvictionReason>("non-payment");
  const [noticeDate, setNoticeDate] = useState("");
  const [disputed, setDisputed] = useState(false);
  const [result, setResult] = useState<EvictionResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateEvictionTimelineUS({
      state,
      reason,
      noticeDate,
      disputed,
    });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="United States Eviction Timeline Calculator"
      description="Estimate a rough earliest possible eviction date based on a notice given in select US states. This tool is a simplified guide and not legal advice."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as USState)}
            required
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="CA">California (CA)</option>
            <option value="WA">Washington (WA)</option>
            <option value="NY">New York (NY)</option>
            <option value="FL">Florida (FL)</option>
            <option value="TX">Texas (TX)</option>
          </select>
        </div>

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
          <h2 className="text-sm font-semibold text-slate-900">Result</h2>
          <p className="text-sm text-slate-800">{result.message}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Eviction processes are
            technical and time-sensitive. Always confirm with your state court
            or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
