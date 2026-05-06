"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateWithholdRent } from "./logic";
import { WithholdRentForm } from "./ui";
import type { WithholdRentResult } from "./schema";

interface WithholdRentCalculatorProps {
  initialState?: string;
}

export default function WithholdRentCalculator({
  initialState,
}: WithholdRentCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<WithholdRentResult | null>(null);

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
    const calcResult = calculateWithholdRent(stateCode, noticeDate);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Withhold Rent Calculator"
        description={`Calculate when tenants may legally withhold rent due to habitability issues in ${stateName}. Enter the date you notified your landlord to see the earliest lawful withholding date and requirements.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <WithholdRentForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
