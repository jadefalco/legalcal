"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  CalendarDaysIcon,
  BanknotesIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { LateFeeResult } from "./schema";

interface LateFeeFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (rentDueDate: string, rentAmount: number) => void;
  result: LateFeeResult | null;
}

export function LateFeeForm({
  theme,
  stateName,
  onCalculate,
  result,
}: LateFeeFormProps) {
  const [rentDueDate, setRentDueDate] = useState<string>("");
  const [rentAmount, setRentAmount] = useState<string>("");

  const handleSubmit = () => {
    const amount = parseFloat(rentAmount);
    if (!rentDueDate || isNaN(amount) || amount <= 0) return;
    onCalculate(rentDueDate, amount);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <LCField label="Rent Due Date" theme={theme}>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={rentDueDate}
              max={today}
              onChange={(e) => setRentDueDate(e.target.value)}
            />
          </LCField>

          <LCField label="Monthly Rent Amount ($)" theme={theme}>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="1500.00"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
            />
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <BanknotesIcon className="w-4 h-4" />
          Calculate Late Fee Limits
        </LCButton>
      </LCCard>

      {result && (
        <LateFeeResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function LateFeeResultCard({
  result,
  stateName,
  theme,
}: {
  result: LateFeeResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Late Fee Result
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultItem
          label="Rent Due Date"
          value={result.dueDate}
          icon={CalendarDaysIcon}
          theme={theme}
        />
        <ResultItem
          label="Grace Period Ends"
          value={result.gracePeriodEnds}
          icon={ClockIcon}
          theme={theme}
        />
      </div>

      {result.allowedLateFee !== null && (
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Maximum Allowed Late Fee
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${result.allowedLateFee.toFixed(2)}
          </p>
        </div>
      )}

      {result.allowedLateFee === null && (
        <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
          <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-700 font-medium">
            No statutory late fee cap. Fees must be reasonable and tied to actual costs.
          </span>
        </div>
      )}

      {result.dailyLateFee !== null && (
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Daily Late Fee
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            ${result.dailyLateFee.toFixed(2)} per day
          </p>
        </div>
      )}

      {result.percentageCap !== null && (
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <BanknotesIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Percentage Cap
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            {result.percentageCap}% of monthly rent
          </p>
        </div>
      )}

      {result.statutes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentTextIcon
              className="w-4 h-4"
              style={{ color: theme.colors.primary }}
            />
            Applicable Statutes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.statutes.map((statute, i) => (
              <li key={i}>{statute}</li>
            ))}
          </ul>
        </div>
      )}

      {result.notes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4 text-blue-500" />
            Notes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </LCCard>
  );
}

function ResultItem({
  label,
  value,
  icon: Icon,
  theme,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  theme: Theme;
}) {
  return (
    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: theme.colors.primary }} />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-lg font-semibold text-slate-800">{value}</p>
    </div>
  );
}
