"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type ClaimType =
  | "debt"
  | "damages"
  | "securityDeposit"
  | "property"
  | "contract"
  | "other";

interface SmallClaimsResult {
  message: string;
}

function calculateSmallClaims({
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
  const limit = 100000;
  const withinLimit = amount <= limit;

  const eligibility = withinLimit
    ? `Your claim amount of $${amount.toFixed(
        2
      )} is within the Alberta Small Claims (Provincial Court Civil) limit of $100,000.`
    : `Your claim amount of $${amount.toFixed(
        2
      )} exceeds the $100,000 limit for Alberta Small Claims Court. You may need to file in the Court of King's Bench.`;

  // Filing fees (approximate ranges)
  let filingFee = "";
  if (withinLimit) {
    if (amount <= 7500) filingFee = "Filing fee is typically around $100.";
    else if (amount <= 25000) filingFee = "Filing fee is typically around $200.";
    else filingFee = "Filing fee is typically around $300.";
  }

  // Claim type notes
  let typeNote = "";
  switch (claimType) {
    case "debt":
      typeNote =
        "Debt claims often involve unpaid invoices, loans, or rent. Ensure you have documentation such as contracts, statements, or communications.";
      break;
    case "damages":
      typeNote =
        "Damage claims may involve property damage, negligence, or repair costs. Evidence such as photos, estimates, and receipts is helpful.";
      break;
    case "securityDeposit":
      typeNote =
        "Security deposit disputes often relate to improper deductions or failure to return deposits. Ensure you have move-in/out inspection reports.";
      break;
    case "property":
      typeNote =
        "Property claims may involve lost, damaged, or withheld personal property. Provide proof of ownership and value.";
      break;
    case "contract":
      typeNote =
        "Contract claims involve breaches of written or verbal agreements. Provide the contract and evidence of the breach.";
      break;
    default:
      typeNote =
        "Ensure you have documentation supporting your claim, including receipts, contracts, communications, or photos.";
  }

  // Service deadlines
  const service =
    "After filing, you must serve the Civil Claim on the defendant within 1 year. Service can be done personally or by recorded mail.";

  // Timelines
  const timelines = `
Typical timelines:
• After service, the defendant has 20 days (in Alberta) or 30 days (outside Alberta) to file a Dispute Note.
• If no Dispute Note is filed, you may request a Default Judgment.
• If a Dispute Note is filed, the court may schedule a pre-trial conference or mediation.
• Hearings often occur within 3–9 months depending on court availability.
• After judgment, enforcement (garnishment, seizure, etc.) may take additional weeks.
`;

  const summary =
    "This tool provides general information only. Always confirm with the Alberta Provincial Court Civil procedures or seek legal advice.";

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

export default function SmallClaimsClient() {
  const [amount, setAmount] = useState<string>("");
  const [claimType, setClaimType] = useState<ClaimType>("debt");
  const [result, setResult] = useState<SmallClaimsResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amt = parseFloat(amount);
    const res = calculateSmallClaims({
      amount: amt,
      claimType,
    });

    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Alberta Small Claims Calculator"
      description="Determine eligibility, filing fees, service deadlines, and hearing timelines for Alberta Provincial Court Civil (Small Claims)."
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
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
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
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="debt">Debt / unpaid amount</option>
            <option value="damages">Damages</option>
            <option value="securityDeposit">Security deposit dispute</option>
            <option value="property">Property claim</option>
            <option value="contract">Contract dispute</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0077C8] transition-colors"
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
            Alberta Provincial Court Civil procedures or seek legal advice.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}