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
  ShieldCheckIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  LockClosedIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import type { WithholdRentResult } from "./schema";

interface WithholdRentFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (noticeDate: string) => void;
  result: WithholdRentResult | null;
}

export function WithholdRentForm({
  theme,
  stateName,
  onCalculate,
  result,
}: WithholdRentFormProps) {
  const [noticeDate, setNoticeDate] = useState<string>("");

  const handleSubmit = () => {
    if (!noticeDate) return;
    onCalculate(noticeDate);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <LCField label="Date Notice Was Sent to Landlord" theme={theme}>
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
          Calculate Withholding Rules
        </LCButton>
      </LCCard>

      {result && (
        <WithholdRentResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function WithholdRentResultCard({
  result,
  stateName,
  theme,
}: {
  result: WithholdRentResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Withhold Rent Result
        </h3>
      </div>

      {result.allowed ? (
        <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700 font-medium">
            Rent withholding is allowed in this state under certain conditions.
          </span>
        </div>
      ) : (
        <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
          <NoSymbolIcon className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-700 font-medium">
            Rent withholding is not explicitly permitted in this state. Consult an attorney before withholding rent.
          </span>
        </div>
      )}

      {result.allowed && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultItem
              label="Notice Required"
              value={`${result.noticeRequirementDays} days`}
              icon={ClockIcon}
              theme={theme}
            />
            <ResultItem
              label="Earliest Withholding Date"
              value={result.earliestWithholdingDate}
              icon={CalendarDaysIcon}
              theme={theme}
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-lg space-y-1">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Severity Threshold
              </span>
            </div>
            <p className="text-base font-semibold text-slate-800">{result.severityThreshold}</p>
          </div>

          {result.escrowRequired && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
              <LockClosedIcon className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">
                Rent must be placed in an escrow account. You cannot simply keep the money.
              </span>
            </div>
          )}

          {!result.escrowRequired && (
            <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-2">
              <BanknotesIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                Escrow is not required in this state, but it is still strongly recommended to protect yourself.
              </span>
            </div>
          )}
        </>
      )}

      {result.retaliationProtection && (
        <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-2">
          <ShieldExclamationIcon className="w-4 h-4 text-indigo-600" />
          <span className="text-sm text-indigo-700 font-medium">
            Retaliation protection applies — your landlord cannot evict or penalize you for lawfully withholding rent.
          </span>
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
