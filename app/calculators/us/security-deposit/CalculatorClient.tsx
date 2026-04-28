"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type USState = "CA" | "WA" | "NY" | "FL" | "TX";

interface DepositResult {
  message: string;
}

function calculateDepositDeadlineUS({
  state,
}: {
  state: USState;
  moveOutDate: string;
}): DepositResult {
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // CALIFORNIA (CA)
  // -----------------------------
  if (state === "CA") {
    return msg(
      "California requires landlords to return the security deposit within 21 days after the tenant moves out. An itemized list of deductions must be provided."
    );
  }

  // -----------------------------
  // WASHINGTON (WA)
  // -----------------------------
  if (state === "WA") {
    return msg(
      "Washington requires landlords to return the security deposit within 21 days after move‑out, along with an itemized statement of deductions."
    );
  }

  // -----------------------------
  // NEW YORK (NY)
  // -----------------------------
  if (state === "NY") {
    return msg(
      "New York requires landlords to return the security deposit within 14 days after the tenant moves out. If the landlord misses the deadline, they forfeit all deductions."
    );
  }

  // -----------------------------
  // FLORIDA (FL)
  // -----------------------------
  if (state === "FL") {
    return msg(
      "Florida requires landlords to return the deposit within 15 days if there are no deductions. If deductions are claimed, the landlord must send written notice within 30 days."
    );
  }

  // -----------------------------
  // TEXAS (TX)
  // -----------------------------
  if (state === "TX") {
    return msg(
      "Texas requires landlords to return the security deposit within 30 days after move‑out. Tenants must provide a forwarding address, but landlords must still act in good faith."
    );
  }

  return msg("Security deposit rules vary by state. Confirm with your local housing authority.");
}

export default function SecurityDepositClient() {
  const [state, setState] = useState<USState>("CA");
  const [moveOutDate, setMoveOutDate] = useState("");
  const [result, setResult] = useState<DepositResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateDepositDeadlineUS({ state, moveOutDate });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="United States Security Deposit Return Deadline"
      description="Estimate the deadline for returning a residential tenancy security deposit in select US states. This is a simplified guide only."
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
            Tenant&apos;s move-out date
          </label>
          <input
            type="date"
            value={moveOutDate}
            onChange={(e) => setMoveOutDate(e.target.value)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">
            This assumes the tenancy has ended and the tenant has provided a
            forwarding address in writing.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm hover:bg-slate-800"
        >
          Calculate deadline
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Estimated deadline
          </h2>
          <p className="text-sm text-slate-800">{result.message}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Always confirm current
            rules with your state housing authority or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
