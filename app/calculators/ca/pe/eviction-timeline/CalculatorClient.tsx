"use client";

import { notFound } from "next/navigation";
import { evictionRules } from "@/app/data/ca/evictionRules";
import type { CanadaEvictionRule } from "@/app/types/CanadaEvictionRules";
import type { Theme } from "@/app/types/Theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const provinceCode = "pe";
const rules: CanadaEvictionRule | undefined = evictionRules[provinceCode];

export default function CACalculatorClient({ theme }: { theme: Theme }) {
  if (!rules) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <LCSection
        title="Eviction Timeline Overview"
        description="This timeline summarizes the eviction process, including notice periods, court deadlines, and lockout rules."
        icon={ArrowRightCircleIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <h3 className="font-semibold mb-2">Notice Periods</h3>
        <ul className="list-disc ml-6">
          <li>Nonpayment of rent: {rules.noticeForNonpayment} days</li>
          <li>Lease violation: {rules.noticeForLeaseViolation} days</li>
        </ul>
      </LCCard>

      <LCCard theme={theme} className="space-y-6">
        <h3 className="font-semibold mb-2">Court Deadlines</h3>
        <ul className="list-disc ml-6">
          <li>Landlord may file after: {rules.courtFilingTime}</li>
          <li>Tenant answer deadline: {rules.answerDeadline} days</li>
          <li>Hearing typically occurs: {rules.hearingTimeline}</li>
        </ul>
      </LCCard>

      <LCCard theme={theme} className="space-y-6">
        <h3 className="font-semibold mb-2">Lockout Rules</h3>
        <p>{rules.lockoutAllowedAfter}</p>
      </LCCard>

      <LCCard theme={theme} className="space-y-6">
        <h3 className="font-semibold mb-2">Legal Citations</h3>
        <ul className="list-disc ml-6">
          {rules.citations.map((citation, index) => (
            <li key={index}>{citation}</li>
          ))}
        </ul>
      </LCCard>
    </div>
  );
}
