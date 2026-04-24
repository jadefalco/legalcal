"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type Party = "tenant" | "landlord";
type TenancyType = "monthly" | "weekly" | "fixed";

interface NoticeResult {
  message: string;
}

function calculateNoticeAB({
  party,
  tenancyType,
  reason,
}: {
  party: Party;
  tenancyType: TenancyType;
  reason: string;
}): NoticeResult {
  const msg = (text: string) => ({ message: text });

  // -----------------------------
  // TENANT GIVING NOTICE
  // -----------------------------
  if (party === "tenant") {
    if (tenancyType === "monthly") {
      return msg(
        "A tenant ending a monthly tenancy must give at least one full tenancy month of notice. The notice must align with the rental period (e.g., before the first day of the month)."
      );
    }

    if (tenancyType === "weekly") {
      return msg(
        "A tenant ending a weekly tenancy must give at least one full tenancy week of notice."
      );
    }

    if (tenancyType === "fixed") {
      return msg(
        "A tenant ending a fixed-term tenancy generally does not need to give notice unless the lease requires it. The tenancy ends automatically on the fixed-term end date."
      );
    }
  }

  // -----------------------------
  // LANDLORD GIVING NOTICE
  // -----------------------------
  if (party === "landlord") {
    // Substantial breach
    if (reason === "breach") {
      return msg(
        "For substantial breach, a landlord may issue a 14‑day notice to terminate the tenancy. The notice must state the breach and give the tenant 14 clear days before termination."
      );
    }

    // Non-payment
    if (reason === "nonpayment") {
      return msg(
        "For non‑payment of rent, a landlord may issue a 14‑day notice. The notice becomes void if the tenant pays all rent owing before the termination date."
      );
    }

    // Ending periodic tenancy
    if (reason === "periodic") {
      if (tenancyType === "monthly") {
        return msg(
          "To end a monthly periodic tenancy, a landlord must give at least 3 full tenancy months of notice."
        );
      }
      if (tenancyType === "weekly") {
        return msg(
          "To end a weekly periodic tenancy, a landlord must give at least one full tenancy week of notice."
        );
      }
      return msg(
        "Fixed‑term tenancies cannot be ended early by notice unless the lease allows it. Otherwise, they end automatically on the fixed‑term end date."
      );
    }

    // Major renovation / demolition
    if (reason === "renovation") {
      return msg(
        "For major renovation, demolition, or change of use, a landlord must give at least 365 days of notice under Alberta law."
      );
    }

    // Condo conversion
    if (reason === "condo") {
      return msg(
        "For condominium conversion, a landlord must give at least 365 days of notice."
      );
    }
  }

  return msg(
    "Notice rules vary based on tenancy type and reason. Please review your tenancy agreement and the Alberta Residential Tenancies Act."
  );
}

export default function NoticePeriodClient() {
  const [party, setParty] = useState<Party>("tenant");
  const [tenancyType, setTenancyType] = useState<TenancyType>("monthly");
  const [reason, setReason] = useState<string>("periodic");
  const [result, setResult] = useState<NoticeResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateNoticeAB({ party, tenancyType, reason });
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Alberta Notice Period Calculator"
      description="Estimate the minimum notice required under Alberta’s Residential Tenancies Act."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* PARTY */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Who is giving notice?
          </label>
          <select
            value={party}
            onChange={(e) => setParty(e.target.value as Party)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>

        {/* TENANCY TYPE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Tenancy type
          </label>
          <select
            value={tenancyType}
            onChange={(e) => setTenancyType(e.target.value as TenancyType)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="fixed">Fixed-term</option>
          </select>
        </div>

        {/* REASON (LANDLORD ONLY) */}
        {party === "landlord" && (
          <div>
            <label className="block text-sm font-medium text-navy">
              Reason for notice
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
            >
              <option value="periodic">Ending periodic tenancy</option>
              <option value="breach">Substantial breach</option>
              <option value="nonpayment">Non-payment of rent</option>
              <option value="renovation">Major renovation / demolition</option>
              <option value="condo">Condo conversion</option>
            </select>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0077C8] transition-colors"
        >
          Calculate notice
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            Alberta Residential Tenancies Act or a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}