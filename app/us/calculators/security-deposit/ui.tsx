"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  BanknotesIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import type { SecurityDepositResult } from "./schema";

interface SecurityDepositFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (monthlyRent: number, moveOutDate: string) => void;
  result: SecurityDepositResult | null;
}

export function SecurityDepositForm({
  theme,
  stateName,
  onCalculate,
  result,
}: SecurityDepositFormProps) {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [moveOutDate, setMoveOutDate] = useState<string>("");

  const handleSubmit = () => {
    const rent = parseFloat(monthlyRent);
    if (!rent || !moveOutDate) return;
    onCalculate(rent, moveOutDate);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your monthly rent and move-out date to calculate the maximum
          legal security deposit and return deadline in {stateName}.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <LCField label="Monthly Rent Amount" theme={theme}>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 1500"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
            />
          </LCField>

          <LCField label="Move-out Date" theme={theme}>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={moveOutDate}
              max={today}
              onChange={(e) => setMoveOutDate(e.target.value)}
            />
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <BanknotesIcon className="w-4 h-4" />
          Calculate Deposit Rules
        </LCButton>
      </LCCard>

      {result && (
        <SecurityDepositResultCard
          result={result}
          stateName={stateName}
          theme={theme}
        />
      )}
    </div>
  );
}

function SecurityDepositResultCard({
  result,
  stateName,
  theme,
}: {
  result: SecurityDepositResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Security Deposit Rules
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <BanknotesIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Maximum Deposit
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            {result.maxDepositAmount !== null
              ? `$${result.maxDepositAmount.toFixed(2)}`
              : "No statutory cap"}
          </p>
          {result.maxMonthsRent !== null && (
            <p className="text-xs text-slate-500">
              ({result.maxMonthsRent} month{result.maxMonthsRent !== 1 ? "s" : ""} rent)
            </p>
          )}
        </div>

        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Return Deadline
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            {result.returnDeadlineDate}
          </p>
        </div>

        <RequirementItem
          label="Separate Pet Deposit"
          value={result.separatePetDepositAllowed}
          icon={result.separatePetDepositAllowed ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Nonrefundable Fees"
          value={result.nonrefundableFeesAllowed}
          icon={result.nonrefundableFeesAllowed ? CheckCircleIcon : XCircleIcon}
          theme={theme}
          invertColor
        />
        <RequirementItem
          label="Itemized Statement Required"
          value={result.itemizedStatementRequired}
          icon={result.itemizedStatementRequired ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
      </div>

      {result.penaltyMultiple !== null && (
        <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 shrink-0" />
          <div>
            <p className="font-semibold text-red-800">
              Penalty for Bad-Faith Withholding
            </p>
            <p className="text-sm text-slate-600">
              Up to {result.penaltyMultiple}x the deposit amount may be awarded as damages.
            </p>
          </div>
        </div>
      )}

      {result.statutes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
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
            <InformationCircleIcon className="w-4 h-4 text-blue-500" />
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

function RequirementItem({
  label,
  value,
  icon: Icon,
  theme,
  invertColor = false,
}: {
  label: string;
  value: boolean;
  icon: React.ComponentType<any>;
  theme: Theme;
  invertColor?: boolean;
}) {
  const isPositive = invertColor ? !value : value;
  return (
    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
      <div className="flex items-center gap-2">
        <Icon
          className="w-4 h-4"
          style={{ color: isPositive ? "#16a34a" : theme.colors.primary }}
        />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p
        className={`text-base font-semibold ${
          isPositive ? "text-green-700" : "text-slate-800"
        }`}
      >
        {value ? "Yes" : "No"}
      </p>
    </div>
  );
}
