"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type USState = "CA" | "WA" | "NY" | "FL" | "TX";
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
  message: string;
}

function calculateNoticePeriodUS({
  state,
  tenancyType,
  party,
  reason,
}: {
  state: USState;
  tenancyType: TenancyType;
  party: Party;
  reason: Reason;
}): Result {
  // Helper to format output
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // CALIFORNIA (CA)
  // -----------------------------
  if (state === "CA") {
    // Tenant giving notice
    if (party === "tenant") {
      if (tenancyType === "month-to-month") {
        return msg(
          "California requires tenants to give 30 days’ notice if renting for under 1 year, or 60 days if renting for 1 year or more."
        );
      }
      if (tenancyType === "fixed") {
        return msg(
          "In California, tenants generally do not need to give notice when a fixed-term lease ends unless the lease requires it."
        );
      }
    }

    // Landlord giving notice
    if (party === "landlord") {
      if (reason === "non-payment") {
        return msg("California allows a 3‑day notice to pay or quit for non‑payment.");
      }
      if (reason === "landlord-use" || reason === "other") {
        return msg(
          "California requires 30 days’ notice if the tenant has lived there under 1 year, or 60 days if 1 year or more."
        );
      }
      if (reason === "renovation") {
        return msg(
          "California renovation or demolition notices typically require 60 days, but local rent‑control rules may impose additional requirements."
        );
      }
    }
  }

  // -----------------------------
  // WASHINGTON (WA)
  // -----------------------------
  if (state === "WA") {
    if (party === "tenant") {
      return msg("Washington requires tenants to give 20 days’ notice before the end of the rental period.");
    }

    if (party === "landlord") {
      if (reason === "non-payment") {
        return msg("Washington requires a 14‑day notice to pay or vacate for non‑payment.");
      }
      if (reason === "landlord-use" || reason === "other") {
        return msg("Washington requires 60 days’ notice for most no‑cause terminations.");
      }
      if (reason === "renovation") {
        return msg("Washington requires 120 days’ notice for substantial rehabilitation or demolition.");
      }
    }
  }

  // -----------------------------
  // NEW YORK (NY)
  // -----------------------------
  if (state === "NY") {
    if (party === "tenant") {
      return msg("New York requires tenants to give at least 30 days’ notice for most terminations.");
    }

    if (party === "landlord") {
      if (reason === "non-payment") {
        return msg("New York requires a 14‑day rent demand before filing for eviction.");
      }

      // No‑fault termination depends on tenancy length
      return msg(
        "New York no‑fault termination requires 30 days (<1 year), 60 days (1–2 years), or 90 days (>2 years)."
      );
    }
  }

  // -----------------------------
  // FLORIDA (FL)
  // -----------------------------
  if (state === "FL") {
    if (party === "tenant") {
      return msg("Florida requires 15 days’ notice for month‑to‑month tenancies.");
    }

    if (party === "landlord") {
      if (reason === "non-payment") {
        return msg("Florida allows a 3‑day notice to pay or vacate for non‑payment.");
      }
      if (reason === "cause") {
        return msg("Florida requires a 7‑day notice to cure or vacate for cause.");
      }
      return msg("Florida requires 15 days’ notice for month‑to‑month terminations.");
    }
  }

  // -----------------------------
  // TEXAS (TX)
  // -----------------------------
  if (state === "TX") {
    if (party === "tenant") {
      return msg("Texas generally requires 30 days’ notice unless the lease specifies otherwise.");
    }

    if (party === "landlord") {
      if (reason === "non-payment") {
        return msg("Texas allows a 3‑day notice to vacate for non‑payment unless the lease sets a different period.");
      }
      return msg("Texas generally requires 30 days’ notice unless the lease specifies otherwise.");
    }
  }

  // Fallback
  return msg("Notice rules vary by state and situation. Please confirm with local housing authorities.");
}

export default function NoticePeriodClient() {
  const [state, setState] = useState<USState>("CA");
  const [tenancyType, setTenancyType] = useState<TenancyType>("month-to-month");
  const [party, setParty] = useState<Party>("tenant");
  const [reason, setReason] = useState<Reason>("move-out-voluntary");
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateNoticePeriodUS({ state, tenancyType, party, reason });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="United States Notice Period Calculator"
      description="Estimate the minimum notice period for common residential tenancy situations in the United States. This tool is for general information only and does not replace legal advice."
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
          <h2 className="text-sm font-semibold text-slate-900">Result</h2>
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
