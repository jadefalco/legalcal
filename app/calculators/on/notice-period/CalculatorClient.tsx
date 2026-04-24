"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type Reason =
  | "nonpayment"
  | "breach"
  | "illegal"
  | "landlordOwnUse"
  | "renovation"
  | "demolition"
  | "caregiver"
  | "tenantTermination";

interface NoticeResult {
  message: string;
}

function calculateOntarioNotice(reason: Reason): NoticeResult {
  const msg = (text: string) => ({ message: text });

  switch (reason) {
    case "nonpayment":
      return msg(
        `N4 – Non‑payment of Rent:
• Landlord may give an N4 as soon as rent is late.
• Tenant has 14 days (monthly tenancy) or 7 days (weekly tenancy) to pay.
• If unpaid after the deadline, landlord may apply to the LTB for eviction (L1 application).`
      );

    case "breach":
      return msg(
        `N5 – Substantial Interference / Damage / Overcrowding:
• First N5: Tenant has 7 days to correct the issue.
• If not corrected, landlord may apply to the LTB.
• Second N5 within 6 months: No correction period; landlord may apply immediately.`
      );

    case "illegal":
      return msg(
        `N6 / N7 – Illegal Acts or Safety Risks:
• N6 (illegal acts): 10‑day notice.
• N7 (serious impairment or safety risk): 10‑day notice.
• No right to void by correcting the issue.`
      );

    case "landlordOwnUse":
      return msg(
        `N12 – Landlord’s Own Use:
• 60‑day notice.
• Must be for landlord, spouse, child, parent, or caregiver.
• Must provide one month’s compensation or offer another acceptable unit.`
      );

    case "renovation":
      return msg(
        `N13 – Renovation / Repairs Requiring Vacancy:
• 120‑day notice.
• Applies when work requires the unit to be empty.
• Tenant has right of first refusal to return at the same rent (if building has 5+ units).`
      );

    case "demolition":
      return msg(
        `N13 – Demolition or Conversion:
• 120‑day notice.
• One month’s compensation or alternative accommodation must be offered.`
      );

    case "caregiver":
      return msg(
        `N12 – Caregiver / Family Member Move‑In:
• 60‑day notice.
• Must be genuine and in good faith.
• One month’s compensation required.`
      );

    case "tenantTermination":
      return msg(
        `Tenant Notice to Terminate:
• Monthly tenancy: 60‑day notice.
• Fixed‑term: 60‑day notice ending on the lease end date.
• Victims of domestic or sexual violence: 28‑day notice (Form N15).`
      );

    default:
      return msg("Select a valid reason.");
  }
}

export default function OntarioNoticeClient() {
  const [reason, setReason] = useState<Reason>("nonpayment");
  const [result, setResult] = useState<NoticeResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateOntarioNotice(reason);
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Ontario Notice Period Calculator"
      description="Calculate notice periods under Ontario’s Residential Tenancies Act."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* REASON */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Reason for notice
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as Reason)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
          >
            <option value="nonpayment">Non‑payment of rent (N4)</option>
            <option value="breach">Substantial interference / damage (N5)</option>
            <option value="illegal">Illegal acts / safety risk (N6 / N7)</option>
            <option value="landlordOwnUse">Landlord’s own use (N12)</option>
            <option value="renovation">Renovation requiring vacancy (N13)</option>
            <option value="demolition">Demolition / conversion (N13)</option>
            <option value="caregiver">Caregiver / family move‑in (N12)</option>
            <option value="tenantTermination">Tenant ending tenancy</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00205B] transition-colors"
        >
          Calculate notice period
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            Ontario Residential Tenancies Act and Landlord and Tenant Board
            (LTB) rules.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}