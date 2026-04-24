"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type ClaimType =
  | "debt"
  | "damages"
  | "property"
  | "contract"
  | "employment"
  | "other";

interface SmallClaimsResult {
  message: string;
}

function calculateOntarioSmallClaims({
  amount,
  claimType,
}: {
  amount: number;
  claimType: ClaimType;
}): SmallClaimsResult {
  const msg = (text: string) => ({ message: text });

  if (!amount || amount <= 0) {
    return msg("Please enter a valid claim amount.");
  }

  // Monetary limit
  const limit = 35000;
  const withinLimit = amount <= limit;

  const eligibility = withinLimit
    ? `Your claim amount of $${amount.toFixed(
        2
      )} is within the Ontario Small Claims Court limit of $35,000.`
    : `Your claim amount of $${amount.toFixed(
        2
      )} exceeds the $35,000 limit for Ontario Small Claims Court. You may need to file in the Superior Court of Justice.`;

  // Filing fees (approximate)
  let filingFee = "";
  if (withinLimit) {
    if (amount <= 2500) filingFee = "Filing fee is typically around $102.";
    else filingFee = "Filing fee is typically around $229.";
  }

  // Claim type notes
  let typeNote = "";
  switch (claimType) {
    case "debt":
      typeNote =
        "Debt claims include unpaid invoices, loans, or rent. Provide contracts, statements, or communications.";
      break;
    case "damages":
      typeNote =
        "Damage claims include property damage or negligence. Provide photos, estimates, and receipts.";
      break;
    case "property":
      typeNote =
        "Property claims involve lost, damaged, or withheld personal property. Provide proof of ownership and value.";
      break;
    case "contract":
      typeNote =
        "Contract claims involve breaches of written or verbal agreements. Provide the contract and evidence of breach.";
      break;
    case "employment":
      typeNote =
        "Employment claims may include unpaid wages or vacation pay. Wrongful dismissal must be filed in Superior Court.";
      break;
    default:
      typeNote =
        "Provide documentation supporting your claim, including receipts, contracts, communications, or photos.";
  }

  // Service deadlines
  const service =
    "After filing, you must serve the claim on the defendant within 6 months. Service can be done personally or by alternative methods allowed by the court.";

  // Timelines
  const timelines = `
Typical timelines:
• Defendant has 20 days to file a Defence after being served.
• If no Defence is filed, you may request Default Judgment.
• If a Defence is filed, the court schedules a Settlement Conference (often 3–6 months later).
• If unresolved, a trial may occur 6–12+ months after the conference.
• After judgment, enforcement (garnishment, writs, etc.) may take additional weeks.`;

  const summary =
    "This tool provides general information only. Always confirm with the Ontario Small Claims Court procedures or seek legal advice.";

  return msg(
    `${eligibility}

${withinLimit ? filingFee : ""}

Claim type notes:
${typeNote}

Service requirements:
${service}

${timelines}

Summary:
${summary}`
  );
}

export default function OntarioSmallClaimsClient() {
  const [amount, setAmount] = useState<string>("");
  const [claimType, setClaimType] = useState<ClaimType>("debt");
  const [result, setResult] = useState<SmallClaimsResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amt = parseFloat(amount);
    const res = calculateOntarioSmallClaims({
      amount: amt,
      claimType,
    });

    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Ontario Small Claims Court Calculator"
      description="Determine eligibility, filing fees, service deadlines, and hearing timelines for Ontario Small Claims Court."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* CLAIM AMOUNT */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Claim amount (CAD)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
            placeholder="e.g. 5000"
          />
        </div>

        {/* CLAIM TYPE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Type of claim
          </label>
          <select
            value={claimType}
            onChange={(e) => setClaimType(e.target.value as ClaimType)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
          >
            <option value="debt">Debt / unpaid amount</option>
            <option value="damages">Damages</option>
            <option value="property">Property claim</option>
            <option value="contract">Contract dispute</option>
            <option value="employment">Employment (unpaid wages)</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00205B] transition-colors"
        >
          Analyze claim
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            Ontario Small Claims Court procedures or seek legal advice.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}