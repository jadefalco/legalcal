"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateLateFee } from "./logic";
import { LateFeeForm } from "./ui";
import type { LateFeeResult } from "./schema";

interface LateFeeCalculatorProps {
  initialState?: string;
}

export default function LateFeeCalculator({
  initialState,
}: LateFeeCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<LateFeeResult | null>(null);

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

  const handleCalculate = (rentDueDate: string, rentAmount: number) => {
    const calcResult = calculateLateFee(stateCode, rentDueDate, rentAmount);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Late Fee Calculator"
        description={`Calculate legal limits on late rent fees for ${stateName}. Enter your rent due date and monthly rent to see grace periods and maximum allowable late fees.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <LateFeeForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
