"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

import { calculatePaymentProof } from "./logic";
import { PaymentProofForm } from "./ui";
import type { PaymentProofResult } from "./schema";

interface PaymentProofCalculatorProps {
  initialState?: string;
}

export default function PaymentProofCalculator({
  initialState,
}: PaymentProofCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<PaymentProofResult | null>(null);

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

  const handleCalculate = (providedProof: string[]) => {
    const calcResult = calculatePaymentProof(stateCode, providedProof);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Payment Proof Validity"
        description={`Check whether your proof of rent payment is legally valid in ${stateName} and what forms of proof are accepted or rejected.`}
        icon={ShieldCheckIcon}
        theme={theme}
      />

      <PaymentProofForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
