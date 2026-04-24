"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type TenancyStatus = "ongoing" | "ended";

interface DepositResult {
  message: string;
}

function calculateSecurityDeposit({
  monthlyRent,
  depositAmount,
  tenancyStatus,
  daysSinceMoveOut,
}: {
  monthlyRent: number;
  depositAmount: number;
  tenancyStatus: TenancyStatus;
  daysSinceMoveOut: number | null;
}): DepositResult {
  const msg = (text: string) => ({ message: text });

  if (!monthlyRent || !depositAmount || monthlyRent <= 0 || depositAmount <= 0) {
    return msg("Please enter valid amounts for monthly rent and security deposit.");
  }

  const maxAllowed = monthlyRent; // Alberta: max = one month’s rent
  const overCap = depositAmount > maxAllowed;

  let capText = `In Alberta, the maximum security deposit is one month's rent. Based on the monthly rent you entered, the maximum lawful deposit is $${maxAllowed.toFixed(
    2
  )}.`;

  if (overCap) {
    capText += ` The deposit you entered ($${depositAmount.toFixed(
      2
    )}) appears to be above this maximum, which may not comply with the Residential Tenancies Act.`;
  } else {
    capText += ` The deposit you entered ($${depositAmount.toFixed(
      2
    )}) is at or below this maximum.`;
  }

  let returnText = "";
  if (tenancyStatus === "ongoing") {
    returnText =
      "Because the tenancy is still ongoing, the landlord does not yet have to return the security deposit. It must be held in trust and cannot be used as regular rent.";
  } else {
    returnText =
      "Once the tenancy ends, the landlord generally has 10 days to either return the deposit (with interest) or provide a written statement of account explaining any deductions.";
    if (daysSinceMoveOut !== null && daysSinceMoveOut >= 0) {
      if (daysSinceMoveOut <= 10) {
        returnText += ` Based on the number of days since move-out (${daysSinceMoveOut} days), the 10-day deadline may not have passed yet.`;
      } else {
        returnText += ` Based on the number of days since move-out (${daysSinceMoveOut} days), the 10-day deadline appears to have passed. If you have not received the deposit or a statement of account, the landlord may be out of compliance.`;
      }
    }
  }

  const interestText =
    "Alberta requires landlords to pay interest on security deposits at regulated rates set by the province. Interest is usually payable annually or at the end of the tenancy. The exact rate depends on the year the deposit was received, so you should check the current Government of Alberta interest rate tables.";

  const summary =
    "This summary is general information only. Always confirm with the Alberta Residential Tenancies Act, regulations, and official interest rate bulletins, or speak with a legal professional.";

  return msg(
    `${capText}

${returnText}

Interest on deposits:
${interestText}

Summary:
${summary}`
  );
}

export default function SecurityDepositClient() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [tenancyStatus, setTenancyStatus] = useState<TenancyStatus>("ongoing");
  const [daysSinceMoveOut, setDaysSinceMoveOut] = useState<string>("");
  const [result, setResult] = useState<DepositResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rentNum = parseFloat(monthlyRent);
    const depositNum = parseFloat(depositAmount);
    const daysNum =
      tenancyStatus === "ended" && daysSinceMoveOut.trim() !== ""
        ? parseInt(daysSinceMoveOut, 10)
        : null;

    const res = calculateSecurityDeposit({
      monthlyRent: rentNum,
      depositAmount: depositNum,
      tenancyStatus,
      daysSinceMoveOut: daysNum,
    });

    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Alberta Security Deposit Calculator"
      description="Check maximum security deposit limits, return deadlines, and interest rules under Alberta’s Residential Tenancies Act."
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
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
            placeholder="e.g. 1500"
          />
        </div>

        {/* DEPOSIT AMOUNT */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Security deposit amount (CAD)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
            placeholder="e.g. 1500"
          />
        </div>

        {/* TENANCY STATUS */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Tenancy status
          </label>
          <select
            value={tenancyStatus}
            onChange={(e) =>
              setTenancyStatus(e.target.value as TenancyStatus)
            }
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="ongoing">Tenancy is ongoing</option>
            <option value="ended">Tenancy has ended</option>
          </select>
        </div>

        {/* DAYS SINCE MOVE-OUT (ONLY IF ENDED) */}
        {tenancyStatus === "ended" && (
          <div>
            <label className="block text-sm font-medium text-navy">
              Days since move-out
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={daysSinceMoveOut}
              onChange={(e) => setDaysSinceMoveOut(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
              placeholder="e.g. 12"
            />
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0077C8] transition-colors"
        >
          Analyze security deposit
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            Alberta Residential Tenancies Act, regulations, and official
            interest rate tables, or speak with a legal professional.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}