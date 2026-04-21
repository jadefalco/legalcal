"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type DisputeType =
  | "debt"
  | "unpaid-wages"
  | "property-damage"
  | "contract"
  | "personal-injury"
  | "other";

interface SmallClaimsResult {
  eligible: boolean | null;
  notes: string;
}

function checkSmallClaimsEligibility(
  amount: number
): SmallClaimsResult {
  if (isNaN(amount) || amount <= 0) {
    return {
      eligible: null,
      notes: "Enter a valid claim amount.",
    };
  }

  if (amount <= 5000) {
    return {
      eligible: true,
      notes:
        "Smaller claims may be handled through online dispute resolution (such as the Civil Resolution Tribunal) or Provincial Court Small Claims, depending on the type of dispute.",
    };
  } else if (amount <= 35000) {
    return {
      eligible: true,
      notes:
        "Claims in this range are often within the jurisdiction of Provincial Court Small Claims in BC.",
    };
  } else {
    return {
      eligible: false,
      notes:
        "The amount entered appears to be above typical Small Claims limits. You may need to consider Supreme Court or legal advice.",
    };
  }
}

export default function SmallClaimsClient() {
  const [amount, setAmount] = useState<string>("");
  const [disputeType, setDisputeType] = useState<DisputeType>("debt");
  const [result, setResult] = useState<SmallClaimsResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    const res = checkSmallClaimsEligibility(parsed);
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="BC Small Claims Eligibility Checker"
      description="Check whether your claim amount is likely within the range for Small Claims Court or similar processes in British Columbia. This is a simplified guide only."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Approximate claim amount (CAD)
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Type of dispute
          </label>
          <select
            value={disputeType}
            onChange={(e) => setDisputeType(e.target.value as DisputeType)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="debt">Unpaid debt / loan</option>
            <option value="unpaid-wages">Unpaid wages</option>
            <option value="property-damage">Property damage</option>
            <option value="contract">Contract dispute</option>
            <option value="personal-injury">Personal injury</option>
            <option value="other">Other / not sure</option>
          </select>
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
          <h2 className="text-sm font-semibold text-slate-900">
            Eligibility result
          </h2>
          {result.eligible === true && (
            <p className="text-sm text-slate-800">
              Based on the amount entered, your claim{" "}
              <span className="font-semibold">
                appears to be within a typical range for Small Claims processes
                in BC.
              </span>
            </p>
          )}
          {result.eligible === false && (
            <p className="text-sm text-slate-800">
              Based on the amount entered, your claim{" "}
              <span className="font-semibold">
                may be above the usual Small Claims limit.
              </span>{" "}
              You may need to consider other courts or legal options.
            </p>
          )}
          {result.eligible === null && (
            <p className="text-sm text-slate-800">
              This tool could not determine eligibility from the information
              entered.
            </p>
          )}
          <p className="text-xs text-slate-600">{result.notes}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Jurisdiction and limits can
            change and may depend on the type of dispute. Always confirm with
            official BC court resources or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
