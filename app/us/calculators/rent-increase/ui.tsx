"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  CalendarDaysIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ScaleIcon,
  ClockIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import type { RentIncreaseResult } from "./schema";

interface RentIncreaseFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (noticeDate: string) => void;
  result: RentIncreaseResult | null;
}

export function RentIncreaseForm({
  theme,
  stateName,
  onCalculate,
  result,
}: RentIncreaseFormProps) {
  const [noticeDate, setNoticeDate] = useState<string>("");

  const handleSubmit = () => {
    if (!noticeDate) return;
    onCalculate(noticeDate);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <LCField label="Date Notice Is Served" theme={theme}>
          <input
            type="date"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={noticeDate}
            max={today}
            onChange={(e) => setNoticeDate(e.target.value)}
          />
        </LCField>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <BanknotesIcon className="w-4 h-4" />
          Calculate Rent Increase Deadline
        </LCButton>
      </LCCard>

      {result && (
        <RentIncreaseResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function RentIncreaseResultCard({
  result,
  stateName,
  theme,
}: {
  result: RentIncreaseResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Rent Increase Result
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultItem
          label="Notice Required"
          value={`${result.noticeDays} days`}
          icon={ClockIcon}
          theme={theme}
        />
        <ResultItem
          label="Effective Date"
          value={result.effectiveDate}
          icon={CalendarDaysIcon}
          theme={theme}
        />
      </div>

      {result.maxIncreasePercent !== null && (
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <NoSymbolIcon className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Max Allowable Increase
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            {result.maxIncreasePercent}%
          </p>
        </div>
      )}

      {result.rentControl && (
        <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
          <ScaleIcon className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-700 font-medium">
            Rent control or rent stabilization applies in this state or local jurisdictions.
          </span>
        </div>
      )}

      {result.frequencyLimit && (
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Frequency Limit
            </span>
          </div>
          <p className="text-base font-semibold text-slate-800">{result.frequencyLimit}</p>
        </div>
      )}

      {result.specialRules.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <InformationCircleIcon
              className="w-4 h-4"
              style={{ color: theme.colors.primary }}
            />
            Special Rules
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.specialRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
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
