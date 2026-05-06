"use client"

import { useState } from "react"
import type { StateData } from "@/types/stateData"

import { LCCard } from "@/app/components/lc/LCCard"
import { LCButton } from "@/app/components/lc/LCButton"
import { LCSection } from "@/app/components/lc/LCSection"
import { defaultTheme } from "@/app/theme"

import {
  CalculatorIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"

interface Props {
  data: StateData
}

export default function ALCalculator({ data }: Props) {
  const theme = defaultTheme
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    // Example: month-to-month calculation
    const days = data.noticePeriods.monthToMonth
    setResult(days)
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">

      {/* HEADER */}
      <LCSection
        title={`${data.state} Notice Period Calculator`}
        description={`Calculate residential lease notice periods for ${data.state} using official statutes and rules.`}
        icon={CalculatorIcon}
        theme={theme}
      />

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT COLUMN — CALCULATOR */}
        <div className="md:col-span-2 space-y-6">

          <LCCard theme={theme} className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Calculate Required Notice
            </h2>

            <p className="text-slate-600 text-sm">
              This calculator uses the official month‑to‑month notice period defined in{" "}
              {data.state} statutes.
            </p>

            <LCButton
              variant="primary"
              theme={theme}
              className="w-full py-3 text-lg"
              onClick={calculate}
            >
              <CalculatorIcon className="w-5 h-5" />
              Calculate Notice Period
            </LCButton>

            {result !== null && (
              <LCCard theme={theme} className="p-5 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  Required Notice
                </h3>
                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {result} days
                </p>
              </LCCard>
            )}
          </LCCard>

          {/* CITATIONS */}
          <LCCard theme={theme} className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              Legal Citations
            </h2>

            <ul className="list-disc ml-6 space-y-2 text-slate-700">
              {data.citations.map((c, i) => (
                <li key={i}>
                  <a
                    href={c.url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {c.text}
                  </a>
                </li>
              ))}
            </ul>
          </LCCard>

        </div>

        {/* RIGHT COLUMN — INFO SIDEBAR */}
        <div className="space-y-6">

          <LCCard theme={theme} className="p-6 space-y-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <InformationCircleIcon className="w-5 h-5 text-blue-600" />
              About This Calculator
            </h3>
            <p className="text-sm text-slate-600">
              This tool calculates the minimum notice required for a month‑to‑month
              residential lease termination in {data.state}. Additional rules may apply
              for week‑to‑week or year‑to‑year tenancies.
            </p>
          </LCCard>

          <LCCard theme={theme} className="p-6 space-y-3">
            <h3 className="font-semibold text-slate-800">Other Notice Periods</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Week‑to‑week: {data.noticePeriods.weekToWeek} days</li>
              <li>• Year‑to‑year: {data.noticePeriods.yearToYear} days</li>
            </ul>
          </LCCard>

          <LCCard theme={theme} className="p-6 space-y-3">
            <h3 className="font-semibold text-slate-800">Last Updated</h3>
            <p className="text-sm text-slate-600">{data.metadata.lastUpdated}</p>
          </LCCard>

        </div>

      </div>

    </div>
  )
}