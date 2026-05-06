"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

import { calculateLedgerValidation } from "./logic";
import { LedgerValidationForm } from "./ui";
import type { LedgerValidationResult, PaymentEntry, ChargeEntry } from "./schema";

interface LedgerValidationCalculatorProps {
  initialState?: string;
}

export default function LedgerValidationCalculator({
  initialState,
}: LedgerValidationCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<LedgerValidationResult | null>(null);

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

  const handleCalculate = (payments: PaymentEntry[], charges: ChargeEntry[]) => {
    const calcResult = calculateLedgerValidation(stateCode, payments, charges);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Rent Ledger Validation"
        description={`Check whether a landlord&apos;s rent ledger is accurate and legally compliant in ${stateName}. Identify illegal fees and misapplied payments.`}
        icon={DocumentChartBarIcon}
        theme={theme}
      />

      <LedgerValidationForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
