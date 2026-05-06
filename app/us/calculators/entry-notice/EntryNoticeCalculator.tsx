"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateEntryNotice } from "./logic";
import { EntryNoticeForm } from "./ui";
import type { EntryNoticeResult } from "./schema";

interface EntryNoticeCalculatorProps {
  initialState?: string;
}

export default function EntryNoticeCalculator({
  initialState,
}: EntryNoticeCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<EntryNoticeResult | null>(null);

  const stateInfo = usStates[stateCode as keyof typeof usStates];
  const theme = getTheme("us", stateCode);

  useEffect(() => {
    if (
      initialState &&
      usStates[initialState.toLowerCase() as keyof typeof usStates]
    ) {
      setStateCode(initialState.toLowerCase());
      setResult(null);
    }
  }, [initialState]);

  const handleCalculate = (entryReason: string, nowDateTime: string) => {
    const calcResult = calculateEntryNotice(stateCode, entryReason, nowDateTime);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Entry Notice Calculator"
        description={`Calculate the required advance notice before a landlord may lawfully enter a rental unit in ${stateName}. Select the reason for entry to see the earliest lawful entry time.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <EntryNoticeForm
        theme={theme}
        stateName={stateName}
        allowedReasons={result?.allowedReasons || ["Repairs", "Inspections", "Showings", "Emergencies"]}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
