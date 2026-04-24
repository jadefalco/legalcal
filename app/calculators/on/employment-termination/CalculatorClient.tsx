"use client";

import React, { useState } from "react";
import CalculatorLayout from "@/app/components/CalculatorLayout";

interface TerminationResult {
  message: string;
}

function calculateOntarioTermination({
  years,
  weeklyEarnings,
  payroll,
  isMassTermination,
}: {
  years: number;
  weeklyEarnings: number | null;
  payroll: number;
  isMassTermination: boolean;
}): TerminationResult {
  const msg = (text: string) => ({ message: text });

  if (years < 0) return msg("Years of service cannot be negative.");

  // ESA NOTICE (termination pay)
  let noticeWeeks = 0;
  if (years < 1) noticeWeeks = 1;
  else if (years >= 1 && years < 2) noticeWeeks = 2;
  else if (years >= 2 && years < 3) noticeWeeks = 3;
  else if (years >= 3 && years < 4) noticeWeeks = 4;
  else if (years >= 4 && years < 5) noticeWeeks = 5;
  else if (years >= 5 && years < 6) noticeWeeks = 6;
  else if (years >= 6 && years < 7) noticeWeeks = 7;
  else noticeWeeks = 8; // ESA max

  // MASS TERMINATION OVERRIDE
  let massNotice = null;
  if (isMassTermination) {
    if (years >= 0) {
      // mass termination is based on # of employees, not years
      // but we simplify because user is calculating individually
      // typical rules:
      // 50–199 employees → 8 weeks
      // 200–499 → 12 weeks
      // 500+ → 16 weeks
      massNotice =
        "Mass termination rules apply. Depending on the number of employees terminated:\n• 50–199 employees: 8 weeks\n• 200–499 employees: 12 weeks\n• 500+ employees: 16 weeks\nThis replaces the standard ESA notice period.";
    }
  }

  // SEVERANCE PAY (separate from notice)
  // Requirements:
  // • 5+ years of service AND
  // • Employer payroll ≥ $2.5M OR 50+ employees terminated
  let severanceEligible = false;
  let severanceWeeks = 0;

  if (years >= 5 && payroll >= 2500000) {
    severanceEligible = true;
    severanceWeeks = Math.min(years * 1, 26); // 1 week per year, max 26
  }

  // PAY CALCULATIONS
  let noticePay = null;
  let severancePay = null;

  if (weeklyEarnings && weeklyEarnings > 0) {
    noticePay = noticeWeeks * weeklyEarnings;
    if (severanceEligible) {
      severancePay = severanceWeeks * weeklyEarnings;
    }
  }

  const summary = `
Ontario ESA Minimum Standards Summary

Notice (termination pay):
• Standard ESA notice: ${noticeWeeks} week(s)
${massNotice ? `\nMass termination:\n${massNotice}\n` : ""}

Severance pay:
• Eligible: ${severanceEligible ? "Yes" : "No"}
${severanceEligible ? `• Severance weeks: ${severanceWeeks}` : ""}

Estimated pay amounts:
${
  weeklyEarnings
    ? `• Weekly earnings: $${weeklyEarnings.toFixed(2)}
• Notice pay: ${
        noticePay ? `$${noticePay.toFixed(2)}` : "N/A"
      }
• Severance pay: ${
        severancePay ? `$${severancePay.toFixed(2)}` : "N/A"
      }`
    : "Enter weekly earnings to estimate pay in lieu."
}

Important:
• ESA provides minimums only. Common law notice is often significantly higher.
• Severance pay is separate from termination pay.
• Always confirm with the ESA and consider legal advice for specific cases.
`;

  return msg(summary);
}

export default function OntarioEmploymentTerminationClient() {
  const [years, setYears] = useState<string>("1");
  const [weeklyEarnings, setWeeklyEarnings] = useState<string>("");
  const [payroll, setPayroll] = useState<string>("2500000");
  const [isMassTermination, setIsMassTermination] = useState<boolean>(false);
  const [result, setResult] = useState<TerminationResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const yrs = parseFloat(years);
    const weekly = weeklyEarnings ? parseFloat(weeklyEarnings) : null;
    const pr = parseFloat(payroll);

    const res = calculateOntarioTermination({
      years: yrs,
      weeklyEarnings: weekly,
      payroll: pr,
      isMassTermination,
    });

    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Ontario Employment Termination Calculator"
      description="Estimate ESA minimum notice, termination pay, and severance pay."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* YEARS OF SERVICE */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Years of service
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
          />
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
            value={weeklyEarnings}
            onChange={(e) => setWeeklyEarnings(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
            placeholder="Optional, but enables pay calculations"
          />
        </div>

        {/* PAYROLL */}
        <div>
          <label className="block text-sm font-medium text-navy">
            Employer’s annual payroll (CAD)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={payroll}
            onChange={(e) => setPayroll(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#00205B] focus:ring-[#00205B]"
          />
          <p className="mt-1 text-xs text-gray-500">
            Used to determine severance eligibility (≥ $2.5M).
          </p>
        </div>

        {/* MASS TERMINATION */}
        <div className="flex items-center gap-2">
          <input
            id="massTermination"
            type="checkbox"
            checked={isMassTermination}
            onChange={(e) => setIsMassTermination(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#00205B] focus:ring-[#00205B]"
          />
          <label htmlFor="massTermination" className="text-sm font-medium text-navy">
            This is part of a mass termination (50+ employees)
          </label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00205B] transition-colors"
        >
          Calculate ESA minimums
        </button>
      </form>

      {result && (
        <div className="mt-8 whitespace-pre-line space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-navy">Result</h2>
          <p className="text-sm text-gray-800">{result.message}</p>
          <p className="text-xs text-gray-500">
            This tool provides general information only. Always confirm with the
            ESA and consider legal advice for specific cases.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}