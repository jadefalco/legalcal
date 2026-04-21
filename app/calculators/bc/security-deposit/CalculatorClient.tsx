"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

interface DepositResult {
  deadline: Date | null;
  notes: string;
}

function calculateDepositDeadline(moveOutDate: string): DepositResult {
  if (!moveOutDate) {
    return {
      deadline: null,
      notes: "Enter a move-out date to estimate the deadline.",
    };
  }

  const date = new Date(moveOutDate);
  if (isNaN(date.getTime())) {
    return {
      deadline: null,
      notes: "The date entered is not valid.",
    };
  }

  const deadline = new Date(date);
  deadline.setDate(deadline.getDate() + 15);

  return {
    deadline,
    notes:
      "In many BC residential tenancies, landlords must return the deposit or apply for dispute resolution within 15 days of the later of (a) the tenancy ending, and (b) receiving the tenant's forwarding address in writing.",
  };
}

export default function SecurityDepositClient() {
  const [moveOutDate, setMoveOutDate] = useState("");
  const [result, setResult] = useState<DepositResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateDepositDeadline(moveOutDate);
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="BC Security Deposit Return Deadline"
      description="Estimate the deadline for returning a residential tenancy security deposit in British Columbia. This is a simplified guide only."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
          {result.deadline ? (
            <>
              <p className="text-sm text-slate-800">
                Based on the move-out date you entered, the{" "}
                <span className="font-semibold">
                  estimated deadline to return the deposit or apply for dispute
                  resolution
                </span>{" "}
                is:
              </p>
              <p className="text-base font-semibold text-slate-900">
                {result.deadline.toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-800">
              This tool could not estimate a deadline.
            </p>
          )}
          <p className="text-xs text-slate-600">{result.notes}</p>
          <p className="text-xs text-slate-500">
            This is a general information tool only. Always confirm current
            rules with the BC Residential Tenancy Branch or a legal
            professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
