"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type TenancyType = "fixed" | "month-to-month";
type Party = "tenant" | "landlord";
type Reason =
  | "end-of-fixed-term"
  | "move-out-voluntary"
  | "landlord-use"
  | "renovation"
  | "non-payment"
  | "cause"
  | "other";

interface Result {
  minimumNoticeDays: number | null;
  notes: string;
}

function calculateNoticePeriod(
  tenancyType: TenancyType,
  party: Party,
  reason: Reason
): Result {
  if (party === "tenant") {
    if (tenancyType === "month-to-month") {
      return {
        minimumNoticeDays: 30,
        notes:
          "Tenants generally must give at least one full month of written notice before the day rent is due.",
      };
    }
    if (tenancyType === "fixed" && reason === "end-of-fixed-term") {
      return {
        minimumNoticeDays: 0,
        notes:
          "If the fixed-term agreement is ending and not converting, the tenant usually moves out by the end date.",
      };
    }
    return {
      minimumNoticeDays: 30,
      notes:
        "This is a general guideline. Check your tenancy agreement and BC Residential Tenancy Branch resources.",
    };
  }

  if (party === "landlord") {
    switch (reason) {
      case "landlord-use":
      case "renovation":
        return {
          minimumNoticeDays: 60,
          notes:
            "For landlord use or major renovations, landlords often must give at least 2 months' written notice and may owe compensation.",
        };
      case "non-payment":
        return {
          minimumNoticeDays: 10,
          notes:
            "For non-payment of rent, a 10-day notice is commonly used. Tenants may have a short period to pay and cancel the notice.",
        };
      case "cause":
        return {
          minimumNoticeDays: 30,
          notes:
            "For cause (other than non-payment), 1 month notice is often used. Details depend on the specific situation.",
        };
      default:
        return {
          minimumNoticeDays: 30,
          notes:
            "This is a general guideline. Landlord notice rules depend on the reason and tenancy type.",
        };
    }
  }

  return {
    minimumNoticeDays: null,
    notes:
      "Unable to calculate. Please review BC Residential Tenancy Branch resources or speak with a legal professional.",
  };
}

export default function NoticePeriodClient() {
  const [tenancyType, setTenancyType] = useState<TenancyType>("month-to-month");
  const [party, setParty] = useState<Party>("tenant");
  const [reason, setReason] = useState<Reason>("move-out-voluntary");
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateNoticePeriod(tenancyType, party, reason);
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="BC Notice Period Calculator"
      description="Estimate the minimum notice period for common residential tenancy situations in British Columbia. This tool is for general information only and does not replace legal advice."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Who is giving notice?
            </label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setParty("tenant")}
                className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                  party === "tenant"
                    ? "border-slate-900 bg-slate-900 text-slate-50"
                    : "border-slate-300 bg-white text-slate-800"
                }`}
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => setParty("landlord")}
                className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                  party === "landlord"
                    ? "border-slate-900 bg-slate-900 text-slate-50"
                    : "border-slate-300 bg-white text-slate-800"
                }`}
              >
                Landlord
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Tenancy type
            </label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setTenancyType("month-to-month")}
                className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                  tenancyType === "month-to-month"
                    ? "border-slate-900 bg-slate-900 text-slate-50"
                    : "border-slate-300 bg-white text-slate-800"
                }`}
              >
                Month-to-month
              </button>
              <button
                type="button"
                onClick={() => setTenancyType("fixed")}
                className={`flex-1 rounded-md border px-3 py-2 text-sm ${
                  tenancyType === "fixed"
                    ? "border-slate-900 bg-slate-900 text-slate-50"
                    : "border-slate-300 bg-white text-slate-800"
                }`}
              >
                Fixed-term
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Main reason for notice
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as Reason)}
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {party === "tenant" && (
              <>
                <option value="move-out-voluntary">
                  Tenant is choosing to move out
                </option>
                <option value="end-of-fixed-term">
                  End of fixed-term agreement
                </option>
                <option value="other">Other / not sure</option>
              </>
            )}
            {party === "landlord" && (
              <>
                <option value="landlord-use">
                  Landlord or close family member moving in
                </option>
                <option value="renovation">
                  Major renovation or demolition
                </option>
                <option value="non-payment">Non-payment of rent</option>
                <option value="cause">
                  Cause (repeated late payment, disturbance, etc.)
                </option>
                <option value="other">Other / not sure</option>
              </>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm hover:bg-slate-800"
        >
          Calculate notice period
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Estimated minimum notice
          </h2>
          {result.minimumNoticeDays !== null ? (
            <p className="text-sm text-slate-800">
              Based on your answers, a{" "}
              <span className="font-semibold">
                minimum of {result.minimumNoticeDays} days&apos; written notice
              </span>{" "}
              is commonly required in similar situations in BC.
            </p>
          ) : (
            <p className="text-sm text-slate-800">
              This tool could not estimate a notice period for the selected
              situation.
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
