"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { ClockIcon } from "@heroicons/react/24/outline";

import { calculateLateStatus } from "./logic";
import { LateStatusForm } from "./ui";
import type { LateStatusResult } from "./schema";

interface LateStatusCalculatorProps {
  initialState?: string;
}

export default function LateStatusCalculator({
  initialState,
}: LateStatusCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<LateStatusResult | null>(null);

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

  const handleCalculate = (dueDate: string, today: string) => {
    const calcResult = calculateLateStatus(stateCode, dueDate, today);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Rent Payment Timeline & Late Status"
        description={`Check whether rent is legally late in ${stateName}, when late fees may begin, and whether weekends or holidays extend the due date.`}
        icon={ClockIcon}
        theme={theme}
      />

      <LateStatusForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
