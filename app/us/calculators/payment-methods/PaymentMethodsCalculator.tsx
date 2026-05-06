"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CreditCardIcon } from "@heroicons/react/24/outline";

import { calculatePaymentMethods } from "./logic";
import { PaymentMethodsForm } from "./ui";
import type { PaymentMethodsResult } from "./schema";

interface PaymentMethodsCalculatorProps {
  initialState?: string;
}

export default function PaymentMethodsCalculator({
  initialState,
}: PaymentMethodsCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<PaymentMethodsResult | null>(null);

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

  const handleCalculate = () => {
    const calcResult = calculatePaymentMethods(stateCode);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Rent Payment Methods & Refusal Rules"
        description={`Check which rent payment methods landlords in ${stateName} must accept, whether they can refuse cash, require online-only payments, or charge processing fees.`}
        icon={CreditCardIcon}
        theme={theme}
      />

      <PaymentMethodsForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
