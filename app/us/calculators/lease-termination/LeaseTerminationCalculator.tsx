"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateLeaseTermination } from "./logic";
import { LeaseTerminationForm } from "./ui";
import type { LeaseTerminationResult } from "./schema";

interface LeaseTerminationCalculatorProps {
  initialState?: string;
}

export default function LeaseTerminationCalculator({
  initialState,
}: LeaseTerminationCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<LeaseTerminationResult | null>(null);

  const stateInfo = usStates[stateCode as keyof typeof usStates];
  const theme = getTheme("us", stateCode);

  useEffect(() => {
    if (initialState && usStates[initialState.toLowerCase() as keyof typeof usStates]) {
      setStateCode(initialState.toLowerCase());
      setResult(null);
    }
  }, [initialState]);

  const handleCalculate = (moveOutDate: string, _reason: string) => {
    const calcResult = calculateLeaseTermination(stateCode, moveOutDate);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();
  const stateKeys = Object.keys(usStates).sort();

  return (
    <div className="space-y-8">
      <LCSection
        title="Lease Termination Notice Calculator"
        description={`Calculate lease termination notice periods and rules for ${stateName}. Select your move-out date to see the latest date you must serve notice.`}
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

      <LeaseTerminationForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
