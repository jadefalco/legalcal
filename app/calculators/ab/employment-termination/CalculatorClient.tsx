"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

type ServiceBand =
  | "under90"
  | "90to2"
  | "2to4"
  | "4to6"
  | "6to8"
  | "8to10"
  | "10plus";

type TerminationReason =
  | "withoutCause"
  | "justCause"
  | "temporaryLayoff"
  | "groupTermination"
  | "seasonal"
  | "fixedTermEnd";

type PayStructure = "hourly" | "salary" | "weekly";

interface TerminationResult {
  message: string;
}

function getWeeksOfNotice(serviceBand: ServiceBand): number {
  switch (serviceBand) {
    case "under90":
      return 0;
    case "90to2":
      return 1;
    case "2to4":
      return 2;
    case "4to6":
      return 4;
    case "6to8":
      return 5;
    case "8to10":
      return 6;
    case "10plus":
      return 8;
    default:
      return 0;
  }
}

function calculateEmploymentTermination({
  serviceBand,
  reason,
  weeklyEarnings,
  isGroupTermination,
}: {
  serviceBand: ServiceBand;
  reason: TerminationReason;
  weeklyEarnings: number | null;
  isGroupTermination: boolean;
}): TerminationResult {
  const msg = (text: string) => ({ message: text });

  // Just cause: no notice required (statutorily)
  if (reason === "justCause") {
    return msg(
      "For just cause terminations, the Alberta Employment Standards Code does not require notice or pay in lieu. However, just cause is a high threshold and may be challenged. Employees may still have common law rights beyond the Code."
    );
  }

  // Temporary layoff
  if (reason === "temporaryLayoff") {
    return msg(
      "For temporary layoffs, Alberta’s Employment Standards Code generally allows a limited layoff period (often up to 90 days within a 120-day period, subject to exceptions). If the layoff exceeds the permitted period, it may be deemed a termination, triggering notice or pay in lieu based on length of service."
    );
  }

  // Seasonal or fixed-term ending
  if (reason === "seasonal" || reason === "fixedTermEnd") {
    return msg(
      "For seasonal employment or the natural end of a fixed-term contract, notice may not be required if the end date or seasonal nature was clear and agreed in advance. However, if the contract is effectively ongoing or repeatedly renewed, termination rules similar to indefinite employment may apply."
    );
  }

  // Without cause (regular individual termination)
  const weeks = getWeeksOfNotice(serviceBand);

  let baseText = "";
  if (weeks === 0) {
    baseText =
      "For employees with less than 90 days of service, the Alberta Employment Standards Code does not require statutory notice or pay in lieu.";
  } else {
    baseText = `Based on the length of service you selected, the minimum statutory notice under the Alberta Employment Standards Code is ${weeks} week${
      weeks > 1 ? "s" : ""
    } of notice or pay in lieu.`;
  }

  let payText = "";
  if (weeklyEarnings && weeklyEarnings > 0 && weeks > 0) {
    const totalPay = weeklyEarnings * weeks;
    payText = `If the employer provides pay in lieu instead of working notice, the minimum statutory amount would be approximately $${totalPay.toFixed(
      2
    )} (based on weekly earnings of $${weeklyEarnings.toFixed(
      2
    )} and ${weeks} week${weeks > 1 ? "s" : ""} of notice).`;
  } else if (weeks > 0) {
    payText =
      "If the employer provides pay in lieu instead of working notice, the minimum statutory amount is calculated as the employee’s regular wages for the notice period.";
  }

  // Group termination overlay
  let groupText = "";
  if (isGroupTermination) {
    groupText =
      "Because this appears to be a group termination (50 or more employees at a single location within a 4-week period), the employer may also have to give the Director of Employment Standards additional group termination notice (4, 8, or 12 weeks depending on the number of employees), separate from individual notice obligations.";
  }

  const summary =
    "This calculator only reflects minimum standards under the Alberta Employment Standards Code. Employees may have greater rights under common law or contracts, and employers often provide more than the minimum to reduce legal risk. Always confirm with the Code, regulations, and consider obtaining legal advice.";

  return msg(
    `${baseText}

${payText}

${groupText ? `Group termination:\n${groupText}\n` : ""}

Summary:
${summary}`
  );
}

export default function EmploymentTerminationClient() {
  const [serviceBand, setServiceBand] = useState<ServiceBand>("90to2");
  const [reason, setReason] = useState<TerminationReason>("withoutCause");
  const [payStructure, setPayStructure] = useState<PayStructure>("weekly");
  const [weeklyEarningsInput, setWeeklyEarningsInput] = useState<string>("");
  const [isGroupTermination, setIsGroupTermination] = useState<boolean>(false);
  const [result, setResult] = useState<TerminationResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let weeklyEarnings: number | null = null;

    if (weeklyEarningsInput.trim() !== "") {
      const val = parseFloat(weeklyEarningsInput);
      if (!isNaN(val) && val > 0) {
        weeklyEarnings = val;
      }
    }

    const res = calculateEmploymentTermination({
      serviceBand,
      reason,
      weeklyEarnings,
      isGroupTermination,
    });

    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Alberta Employment Termination Calculator"
      description="Estimate minimum statutory notice or pay in lieu under Alberta’s Employment Standards Code based on length of service and reason for termination."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* LENGTH OF SERVICE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Length of service
          </label>
          <select
            value={serviceBand}
            onChange={(e) => setServiceBand(e.target.value as ServiceBand)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="under90">Under 90 days</option>
            <option value="90to2">90 days to 2 years</option>
            <option value="2to4">2 to 4 years</option>
            <option value="4to6">4 to 6 years</option>
            <option value="6to8">6 to 8 years</option>
            <option value="8to10">8 to 10 years</option>
            <option value="10plus">10+ years</option>
          </select>
        </div>

        {/* REASON FOR TERMINATION */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Reason for termination
          </label>
          <select
            value={reason}
            onChange={(e) =>
              setReason(e.target.value as TerminationReason)
            }
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="withoutCause">Without cause</option>
            <option value="justCause">Just cause</option>
            <option value="temporaryLayoff">Temporary layoff</option>
            <option value="groupTermination">Group termination context</option>
            <option value="seasonal">Seasonal employment ending</option>
            <option value="fixedTermEnd">Fixed-term contract ending</option>
          </select>
        </div>

        {/* PAY STRUCTURE (LABEL ONLY, FOR CONTEXT) */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Pay structure (for context)
          </label>
          <select
            value={payStructure}
            onChange={(e) =>
              setPayStructure(e.target.value as PayStructure)
            }
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
          >
            <option value="weekly">Weekly earnings known</option>
            <option value="salary">Salary (convert to weekly)</option>
            <option value="hourly">Hourly (estimate weekly earnings)</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            This does not change the law, but helps frame how you think about
            weekly earnings for pay in lieu.
          </p>
        </div>

        {/* WEEKLY EARNINGS */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Weekly earnings (CAD)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={weeklyEarningsInput}
            onChange={(e) => setWeeklyEarningsInput(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0077C8] focus:ring-[#0077C8]"
            placeholder="e.g. 1200"
          />
          <p className="mt-1 text-xs text-gray-500">
            Optional, but entering this allows the calculator to estimate
            minimum statutory pay in lieu.
          </p>
        </div>

        {/* GROUP TERMINATION TOGGLE */}
        <div className="flex items-center gap-2">
          <input
            id="groupTermination"
            type="checkbox"
            checked={isGroupTermination}
            onChange={(e) => setIsGroupTermination(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#0077C8] focus:ring-[#0077C8]"
          />
          <label
            htmlFor="groupTermination"
            className="text-sm font-medium text-navy"
          >
            This is part of a group termination (50+ employees at one location
            within 4 weeks)
          </label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0077C8] transition-colors"
        >
          Calculate minimum notice / pay
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. It reflects minimum
            standards under the Alberta Employment Standards Code and does not
            account for common law or contractual rights. Consider obtaining
            legal advice for specific situations.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}