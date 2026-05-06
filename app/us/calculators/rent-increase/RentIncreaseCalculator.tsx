"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateRentIncrease } from "./logic";
import { RentIncreaseForm } from "./ui";
import type { RentIncreaseResult } from "./schema";

interface RentIncreaseCalculatorProps {
  initialState?: string;
}

export default function RentIncreaseCalculator({
  initialState,
}: RentIncreaseCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<RentIncreaseResult | null>(null);

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

  const handleCalculate = (noticeDate: string) => {
    const calcResult = calculateRentIncrease(stateCode, noticeDate);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Rent Increase Calculator"
        description={`Calculate rent increase notice periods and legal deadlines for ${stateName}. Enter the date the notice is served to see the earliest effective date.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <RentIncreaseForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
