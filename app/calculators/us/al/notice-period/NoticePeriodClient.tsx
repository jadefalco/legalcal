"use client";

import { useState } from "react";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { defaultTheme } from "@/app/theme";

import {
  CalendarDaysIcon,
  CalculatorIcon
} from "@heroicons/react/24/outline";

export default function NoticePeriodClient({ data }: { data: any }) {
  const theme = defaultTheme;

  const [type, setType] = useState<"monthToMonth" | "weekToWeek" | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!type) return;
    setResult(data.statutes[type].noticeDays);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">

      <LCSection
        title="Alabama Notice Period Calculator"
        description="Calculate the legally required notice period for Alabama tenants and landlords."
        icon={CalendarDaysIcon}
        theme={theme}
      />

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-800">Select Tenancy Type</h3>

        <div className="flex gap-4">
          <LCButton
            variant={type === "monthToMonth" ? "primary" : "ghost"}
            onClick={() => setType("monthToMonth")}
            theme={theme}
          >
            Month‑to‑Month
          </LCButton>

          <LCButton
            variant={type === "weekToWeek" ? "primary" : "ghost"}
            onClick={() => setType("weekToWeek")}
            theme={theme}
          >
            Week‑to‑Week
          </LCButton>
        </div>
      </div>

      <LCButton
        variant="primary"
        className="w-full"
        onClick={calculate}
        theme={theme}
      >
        <CalculatorIcon className="w-5 h-5 mr-2" />
        Calculate Notice Period
      </LCButton>

      {result !== null && (
        <div className="p-6 border rounded-lg bg-slate-50">
          <h3 className="font-semibold text-slate-800 mb-2">
            Required Notice
          </h3>
          <p className="text-lg font-bold text-blue-700">
            {result} days
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Statute: {data.statutes[type!].citation}
          </p>
        </div>
      )}
    </main>
  );
}