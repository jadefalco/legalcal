"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import type { Theme } from "@/app/types/Theme";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCNotice } from "@/app/components/lc/LCNotice";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  CalculatorIcon,
  ArrowRightCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type StateKey = keyof typeof usStates;

export default function FinalPaycheckDeadlineCalculator({
  initialState,
}: {
  initialState?: string;
}) {
  const [stateCode, setStateCode] = useState<StateKey>(
    (initialState?.toLowerCase() as StateKey) || "ca"
  );
  const theme: Theme = getTheme("us", stateCode);

  useEffect(() => {
    if (initialState && usStates[initialState.toLowerCase() as StateKey]) {
      setStateCode(initialState.toLowerCase() as StateKey);
    }
  }, [initialState]);

  return (
    <div className="space-y-8">
      <LCSection
        title="US Final Paycheck Deadline Calculator"
        description="Select a state to view final paycheck deadline rules and calculate deadlines."
        icon={CalculatorIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-6">
        <LCField label="State" theme={theme}>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value as StateKey)}
          >
            {Object.entries(usStates).map(([key, state]) => (
              <option key={key} value={key}>
                {state.name}
              </option>
            ))}
          </select>
        </LCField>

        <LCNotice
          label="Status"
          value="Calculator logic coming soon."
          icon={ExclamationTriangleIcon}
          theme={theme}
        />

        <Link href={`/calculators/us/${stateCode}/final-paycheck-deadline`}>
          <LCButton variant="primary" theme={theme}>
            <ArrowRightCircleIcon className="w-4 h-4" />
            View State-Specific Final Paycheck Deadline Calculator
          </LCButton>
        </Link>
      </LCCard>
    </div>
  );
}
