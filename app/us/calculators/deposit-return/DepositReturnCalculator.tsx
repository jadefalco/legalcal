"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateDepositReturn } from "./logic";
import { DepositReturnForm } from "./ui";
import type { DepositReturnResult } from "./schema";

interface DepositReturnCalculatorProps {
  initialState?: string;
}

export default function DepositReturnCalculator({
  initialState,
}: DepositReturnCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<DepositReturnResult | null>(null);

  const stateInfo = usStates[stateCode as keyof typeof usStates];
  const theme = getTheme("us", stateCode);

  useEffect(() => {
    if (initialState && usStates[initialState.toLowerCase() as keyof typeof usStates]) {
      setStateCode(initialState.toLowerCase());
      setResult(null);
    }
  }, [initialState]);

  const handleCalculate = (moveOutDate: string, longTermTenant: boolean) => {
    const calcResult = calculateDepositReturn(stateCode, moveOutDate, longTermTenant);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();
  const stateKeys = Object.keys(usStates).sort();

  return (
    <div className="space-y-8">
      <LCSection
        title="Deposit Return Calculator"
        description={`Calculate security deposit return deadlines and allowable deductions for ${stateName}. Enter your move-out date to see when your landlord must return your deposit.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      {/* State selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">State:</label>
        <select
          className="px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={stateCode}
          onChange={(e) => {
            setStateCode(e.target.value);
            setResult(null);
          }}
        >
          {stateKeys.map((code) => (
            <option key={code} value={code}>
              {usStates[code as keyof typeof usStates].name}
            </option>
          ))}
        </select>
      </div>

      <DepositReturnForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
