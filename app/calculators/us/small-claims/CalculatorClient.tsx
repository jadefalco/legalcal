"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type USState = "CA" | "WA" | "NY" | "FL" | "TX";

interface SmallClaimsResult {
  message: string;
}

function checkSmallClaimsUS({
  state,
  amount,
  isBusiness,
}: {
  state: USState;
  amount: number;
  isBusiness: boolean;
}): SmallClaimsResult {
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // CALIFORNIA (CA)
  // -----------------------------
  if (state === "CA") {
    const limit = isBusiness ? 6250 : 12500;
    if (amount <= limit) {
      return msg(
        `California small claims limit is $${limit.toLocaleString()}. Your claim appears eligible.`
      );
    }
    return msg(
      `California small claims limit is $${limit.toLocaleString()}. Your claim exceeds the limit and must be filed in a higher court.`
    );
  }

  // -----------------------------
  // WASHINGTON (WA)
  // -----------------------------
  if (state === "WA") {
    const limit = isBusiness ? 5000 : 10000;
    if (amount <= limit) {
      return msg(
        `Washington small claims limit is $${limit.toLocaleString()}. Your claim appears eligible.`
      );
    }
    return msg(
      `Washington small claims limit is $${limit.toLocaleString()}. Your claim exceeds the limit and must be filed in district court.`
    );
  }

  // -----------------------------
  // NEW YORK (NY)
  // -----------------------------
  if (state === "NY") {
    const limit = 10000;
    if (amount <= limit) {
      return msg(
        `New York small claims limit is $${limit.toLocaleString()}. Your claim appears eligible.`
      );
    }
    return msg(
      `New York small claims limit is $${limit.toLocaleString()}. Your claim exceeds the limit and must be filed in civil court.`
    );
  }

  // -----------------------------
  // FLORIDA (FL)
  // -----------------------------
  if (state === "FL") {
    const limit = 8000;
    if (amount <= limit) {
      return msg(
        `Florida small claims limit is $${limit.toLocaleString()}. Your claim appears eligible.`
      );
    }
    return msg(
      `Florida small claims limit is $${limit.toLocaleString()}. Your claim exceeds the limit and must be filed in county court.`
    );
  }

  // -----------------------------
  // TEXAS (TX)
  // -----------------------------
  if (state === "TX") {
    const limit = 20000;
    if (amount <= limit) {
      return msg(
        `Texas small claims limit is $${limit.toLocaleString()}. Your claim appears eligible.`
      );
    }
    return msg(
      `Texas small claims limit is $${limit.toLocaleString()}. Your claim exceeds the limit and must be filed in justice court.`
    );
  }

  return msg("Small claims rules vary by state. Confirm with your local court.");
}

export default function SmallClaimsClient() {
  const [state, setState] = useState<USState>("CA");
  const [amount, setAmount] = useState<string>("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [result, setResult] = useState<SmallClaimsResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    const res = checkSmallClaimsUS({
      state,
      amount: parsed,
      isBusiness,
    });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="United States Small Claims Eligibility Checker"
      description="Check whether your claim amount falls within the small claims court limit in select US states. This is a simplified guide only."
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
            Claim amount (USD)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isBusiness"
            type="checkbox"
            checked={isBusiness}
            onChange={(e) => setIsBusiness(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <label htmlFor="isBusiness" className="text-sm font-medium text-slate-700">
            Claim is being filed by a business
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm hover:bg-slate-800"
        >
          Check eligibility
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Result</h2>
          <p className="text-sm text-slate-800">{result.message}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Always confirm current rules
            with your state court or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
