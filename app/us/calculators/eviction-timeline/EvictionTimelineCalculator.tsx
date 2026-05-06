"use client";

import { useState, useEffect } from "react";
import { getTheme } from "@/app/theme";
import { usStates } from "@/app/config/usStates";
import { LCSection } from "@/app/components/lc/LCSection";
import { CalculatorIcon } from "@heroicons/react/24/outline";

import { calculateEvictionTimeline } from "./logic";
import { EvictionTimelineForm } from "./ui";
import type { EvictionTimelineResult } from "./schema";

interface EvictionTimelineCalculatorProps {
  initialState?: string;
}

export default function EvictionTimelineCalculator({
  initialState,
}: EvictionTimelineCalculatorProps) {
  const [stateCode, setStateCode] = useState<string>(
    initialState?.toLowerCase() || "ca"
  );
  const [result, setResult] = useState<EvictionTimelineResult | null>(null);

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
    const calcResult = calculateEvictionTimeline(stateCode, noticeDate);
    setResult(calcResult);
  };

  const stateName = stateInfo?.name || stateCode.toUpperCase();

  return (
    <div className="space-y-8">
      <LCSection
        title="Eviction Timeline Calculator"
        description={`Calculate eviction deadlines and court timelines for ${stateName}. Enter the date the notice was served to see the earliest filing date, estimated hearing, and lockout schedule.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <EvictionTimelineForm
        theme={theme}
        stateName={stateName}
        onCalculate={handleCalculate}
        result={result}
      />
    </div>
  );
}
