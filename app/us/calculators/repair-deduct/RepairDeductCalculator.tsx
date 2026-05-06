"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateRepairDeduct } from "./logic";
import { RepairDeductForm } from "./ui";
import type { RepairDeductResult } from "./schema";

interface RepairDeductCalculatorProps {
  initialState?: string;
}

export default function RepairDeductCalculator({
  initialState,
}: RepairDeductCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<RepairDeductResult | null>(null);

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
    const calcResult = calculateRepairDeduct(stateCode, noticeDate);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Repair &amp; Deduct Calculator"
        description={`Calculate when tenants may repair issues and deduct costs from rent in ${stateName}. Enter the date you notified your landlord to see the earliest lawful repair date and deduction limits.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <RepairDeductForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
