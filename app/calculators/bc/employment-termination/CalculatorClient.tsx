"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

interface EmploymentResult {
  weeksNotice: number | null;
  notes: string;
}

function calculateEmploymentNotice(years: number): EmploymentResult {
  if (isNaN(years) || years < 0) {
    return {
      weeksNotice: null,
      notes: "Enter a valid length of service.",
    };
  }

  if (years < 0.5) {
    return {
      weeksNotice: 0,
      notes:
        "In some very short-term situations, there may be no minimum statutory notice, but common law may differ.",
    };
  } else if (years < 1) {
    return {
      weeksNotice: 1,
      notes:
        "Employees with at least 3 months but less than 1 year of service often have a minimum of 1 week notice or pay in lieu.",
    };
  } else if (years < 3) {
    return {
      weeksNotice: 2,
      notes:
        "Employees with 1–3 years of service often have a minimum of 2 weeks notice or pay in lieu.",
    };
  } else if (years < 4) {
    return {
      weeksNotice: 3,
      notes:
        "Employees with 3–4 years of service often have a minimum of 3 weeks notice or pay in lieu.",
    };
  } else {
    return {
      weeksNotice: 4,
      notes:
        "Employees with 4 or more years of service often have a minimum of 4 weeks notice or pay in lieu. Common law notice can be higher.",
    };
  }
}

export default function EmploymentTerminationClient() {
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<EmploymentResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(years);
    const res = calculateEmploymentNotice(parsed);
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="BC Employment Termination Notice Calculator"
      description="Estimate the minimum statutory notice period (or pay in lieu) for non-union employees in British Columbia, based on length of service. This is a simplified guide only."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
          {result.weeksNotice !== null ? (
            <p className="text-sm text-slate-800">
              Based on the length of service entered, the{" "}
              <span className="font-semibold">
                estimated minimum statutory notice
              </span>{" "}
              (or pay in lieu) under BC Employment Standards is approximately{" "}
              <span className="font-semibold">
                {result.weeksNotice} week
                {result.weeksNotice === 1 ? "" : "s"}.
              </span>
            </p>
          ) : (
            <p className="text-sm text-slate-800">
              This tool could not estimate a notice period.
            </p>
          )}
          <p className="text-xs text-slate-600">{result.notes}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Common law notice and
            individual contracts can provide greater entitlements. Always
            confirm with the Employment Standards Branch or a legal
            professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
