"use client";

import { useState } from "react";
import { LCJurisdictionSelect } from "@/app/components/lc/LCJurisdictionSelect";
import { calculateNoticePeriod } from "./engine";
import { Result } from "./components/Result";
import type { Jurisdiction } from "./types";

export default function Page() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("bc");
  const [years, setYears] = useState(1);
  const [result, setResult] = useState<any>(null);

  function handleCalculate() {
    const output = calculateNoticePeriod(jurisdiction, years);
    setResult(output);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Notice Period Calculator
      </h1>

      {/* Jurisdiction Selector */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-slate-700 font-medium">Jurisdiction</span>
          <LCJurisdictionSelect
            value={jurisdiction}
            onChange={setJurisdiction}
          />
        </label>
      </div>

      {/* Years of Service */}
      <label className="block">
        <span className="text-slate-700 font-medium">Years of Service</span>
        <input
          type="number"
          min="0"
          step="0.1"
          className="mt-1 w-full border rounded p-2"
          value={years}
          onChange={(e) => setYears(parseFloat(e.target.value))}
        />
      </label>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
      >
        Calculate Notice Period
      </button>

      {/* Result */}
      {result && (
        <Result
          weeks={result.weeks}
          explanation={result.explanation}
          citation={result.citation}
        />
      )}
    </div>
  );
}