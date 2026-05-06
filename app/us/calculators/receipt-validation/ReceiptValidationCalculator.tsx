"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

import { calculateReceiptValidation } from "./logic";
import { ReceiptValidationForm } from "./ui";
import type { ReceiptValidationResult } from "./schema";

interface ReceiptValidationCalculatorProps {
  initialState?: string;
}

export default function ReceiptValidationCalculator({
  initialState,
}: ReceiptValidationCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<ReceiptValidationResult | null>(null);

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

  const handleCalculate = (providedFields: string[]) => {
    const calcResult = calculateReceiptValidation(stateCode, providedFields);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Rent Receipt Validation"
        description={`Check whether a rent receipt meets ${stateName} legal requirements and identify any missing required fields.`}
        icon={ClipboardDocumentCheckIcon}
        theme={theme}
      />

      <ReceiptValidationForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
