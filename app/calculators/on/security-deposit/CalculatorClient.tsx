"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

interface DepositResult {
  message: string;
}

function calculateOntarioDeposit({
  monthlyRent,
  yearsHeld,
  interestRate,
}: {
  monthlyRent: number;
  yearsHeld: number;
  interestRate: number;
}): DepositResult {
  const msg = (text: string) => ({ message: text });

  if (!monthlyRent || monthlyRent <= 0) {
    return msg("Please enter a valid monthly rent amount.");
  }

  if (yearsHeld < 0) {
    return msg("Years held cannot be negative.");
  }

  // Ontario interest is set annually by LTB (often 1.2%–2.5% historically)
  const interest = monthlyRent * (interestRate / 100) * yearsHeld;
  const total = monthlyRent + interest;

  return msg(
    `Ontario Security Deposit Rules

Allowed:
• Landlords may ONLY collect a “rent deposit,” which must be applied to the last month of rent.
• The deposit amount cannot exceed one month’s rent.

Not allowed:
• Damage deposits
• Key deposits (unless refundable and equal to actual key cost)
• Cleaning deposits
• Pet deposits (except in condos with pet bans)

Interest:
• Rent deposits must accrue interest at the guideline rate set by the LTB.
• Based on your inputs:
  - Monthly rent: $${monthlyRent.toFixed(2)}
  - Years held: ${yearsHeld}
  - Interest rate: ${interestRate}% per year
  - Total interest owed: $${interest.toFixed(2)}
  - Total deposit value after interest: $${total.toFixed(2)}

Additional notes:
• If rent increases, the landlord may request a “top‑up” to bring the deposit up to the new rent amount.
• If interest exceeds the top‑up amount, the landlord must pay the difference to the tenant.
• Interest must be paid annually or applied as a rent reduction.

Summary:
This tool reflects Ontario’s Residential Tenancies Act (RTA) rules. Always confirm with the LTB for current interest rates.`
  );
}

export default function OntarioSecurityDepositClient() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [yearsHeld, setYearsHeld] = useState<string>("1");
  const [interestRate, setInterestRate] = useState<string>("1.2"); // typical LTB guideline
  const [result, setResult] = useState<DepositResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rent = parseFloat(monthlyRent);
    const years = parseFloat(yearsHeld);
    const rate = parseFloat(interestRate);

    const res = calculateOntarioDeposit({
      monthlyRent: rent,
      yearsHeld: years,
      interestRate: rate,
    });

    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Ontario Security Deposit Calculator"
      description="Understand last month’s rent, interest, and prohibited deposits under Ontario law."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* MONTHLY RENT */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Monthly rent (CAD)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
            placeholder="e.g. 1800"
          />
        </div>

        {/* YEARS HELD */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Years deposit has been held
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={yearsHeld}
            onChange={(e) => setYearsHeld(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
            placeholder="e.g. 2"
          />
        </div>

        {/* INTEREST RATE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Annual interest rate (%)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
            placeholder="e.g. 1.2"
          />
          <p className="mt-1 text-xs text-gray-500">
            Use the LTB guideline rate for the year(s) in question.
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00205B] transition-colors"
        >
          Calculate deposit rules & interest
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