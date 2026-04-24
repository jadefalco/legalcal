"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type USState = "CA" | "WA" | "NY" | "FL" | "TX";

interface EmploymentResult {
  message: string;
}

function calculateTerminationUS({
  state,
}: {
  state: USState;
  years: number;
}): EmploymentResult {
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // UNIVERSAL US RULE (AT-WILL)
  // -----------------------------
  // All five states are at‑will employment jurisdictions.
  // No statutory notice is required for individual terminations.
  // WARN Act applies only to mass layoffs (60 days).
  const atWillNotice =
    "In this state, employment is at‑will. No statutory notice is required for individual terminations. Employers may terminate immediately unless a contract or policy states otherwise.";

  // -----------------------------
  // CALIFORNIA (CA)
  // -----------------------------
  if (state === "CA") {
    return msg(
      atWillNotice +
        " For mass layoffs affecting 50+ employees, the federal WARN Act and California WARN Act require 60 days’ advance written notice."
    );
  }

  // -----------------------------
  // WASHINGTON (WA)
  // -----------------------------
  if (state === "WA") {
    return msg(
      atWillNotice +
        " For mass layoffs, the federal WARN Act requires 60 days’ notice if thresholds are met."
    );
  }

  // -----------------------------
  // NEW YORK (NY)
  // -----------------------------
  if (state === "NY") {
    return msg(
      atWillNotice +
        " New York also has a state WARN Act requiring 90 days’ notice for certain mass layoffs."
    );
  }

  // -----------------------------
  // FLORIDA (FL)
  // -----------------------------
  if (state === "FL") {
    return msg(
      atWillNotice +
        " For mass layoffs, the federal WARN Act requires 60 days’ notice if thresholds are met."
    );
  }

  // -----------------------------
  // TEXAS (TX)
  // -----------------------------
  if (state === "TX") {
    return msg(
      atWillNotice +
        " For mass layoffs, the federal WARN Act requires 60 days’ notice if thresholds are met."
    );
  }

  return msg(
    "Termination rules vary by state and situation. Confirm with your state labor department."
  );
}

export default function EmploymentTerminationClient() {
  const [state, setState] = useState<USState>("CA");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<EmploymentResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(years);
    const res = calculateTerminationUS({ state, years: parsed });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="United States Employment Termination Notice Calculator"
      description="Estimate the minimum statutory notice period (or pay in lieu) for non-union employees in select US states, based on length of service. This is a simplified guide only."
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
            Length of continuous service (in years)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">
            Example: 0.5 for 6 months, 2.0 for 2 years, etc.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm hover:bg-slate-800"
        >
          Estimate minimum notice
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Estimated minimum statutory notice
          </h2>
          <p className="text-sm text-slate-800">{result.message}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Common law notice and
            individual contracts can provide greater entitlements. Always
            confirm with your state labor department or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}