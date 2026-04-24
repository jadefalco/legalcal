"use client";

import { evictionRules } from "@/app/data/us/evictionRules";
import { usStates } from "@/app/config/usStates";

const state = usStates["tx"];

// @ts-expect-error - state.slug may not exist in evictionRules type
const rules = evictionRules[state.slug];

export default function USCalculatorClient() {
  if (!rules) {
    return (
      <div className="p-4 border rounded bg-red-50">
        <p>No eviction data available for this state yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold">Eviction Timeline Overview</h2>
        <p>
          This timeline summarizes the eviction process in {state.name}, including notice
          periods, court deadlines, and lockout rules.
        </p>
      </section>

      <section className="border rounded p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Notice Periods</h3>
        <ul className="list-disc ml-6">
          <li>Nonpayment of rent: {rules.noticeForNonpayment} days</li>
          <li>Lease violation: {rules.noticeForLeaseViolation} days</li>
        </ul>
      </section>

      <section className="border rounded p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Court Deadlines</h3>
        <ul className="list-disc ml-6">
          <li>Landlord may file after: {rules.courtFilingTime}</li>
          <li>Tenant answer deadline: {rules.answerDeadline} days</li>
          <li>Hearing typically occurs: {rules.hearingTimeline}</li>
        </ul>
      </section>

      <section className="border rounded p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Lockout Rules</h3>
        <p>{rules.lockoutAllowedAfter}</p>
      </section>

      <section className="border rounded p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Legal Citations</h3>
        <ul className="list-disc ml-6">
          {rules.citations.map((cite: string, i: number) => (
            <li key={i}>{cite}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}