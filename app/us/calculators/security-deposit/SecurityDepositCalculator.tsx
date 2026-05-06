"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { BanknotesIcon } from "@heroicons/react/24/outline";

import { calculateSecurityDeposit } from "./logic";
import { SecurityDepositForm } from "./ui";
import type { SecurityDepositResult } from "./schema";

interface SecurityDepositCalculatorProps {
  initialState?: string;
}

export default function SecurityDepositCalculator({
  initialState,
}: SecurityDepositCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<SecurityDepositResult | null>(null);

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

  const handleCalculate = (monthlyRent: number, moveOutDate: string) => {
    const calcResult = calculateSecurityDeposit(stateCode, monthlyRent, moveOutDate);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Security Deposit Caps & Return Deadline"
        description={`Calculate security deposit limits, return deadlines, and penalties in ${stateName}.`}
        icon={BanknotesIcon}
        theme={theme}
      />

      <SecurityDepositForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
