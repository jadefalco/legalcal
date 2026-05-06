"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  CalendarDaysIcon,
  WrenchIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  NoSymbolIcon,
  FireIcon,
  ClockIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import type { RepairDeductResult } from "./schema";

interface RepairDeductFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (noticeDate: string) => void;
  result: RepairDeductResult | null;
}

export function RepairDeductForm({
  theme,
  stateName,
  onCalculate,
  result,
}: RepairDeductFormProps) {
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
          <WrenchIcon className="w-4 h-4" />
          Calculate Repair &amp; Deduct Rules
        </LCButton>
      </LCCard>

      {result && (
        <RepairDeductResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function RepairDeductResultCard({
  result,
  stateName,
  theme,
}: {
  result: RepairDeductResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Repair &amp; Deduct Result
        </h3>
      </div>

      {result.allowed ? (
        <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700 font-medium">
            Repair &amp; deduct is allowed in this state under certain conditions.
          </span>
        </div>
      ) : (
        <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
          <NoSymbolIcon className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-700 font-medium">
            Repair &amp; deduct is not explicitly allowed in this state. Consult an attorney before proceeding.
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
              label="Earliest Repair Date"
              value={result.earliestRepairDate}
              icon={CalendarDaysIcon}
              theme={theme}
            />
          </div>

          {result.maxDeduction !== null && (
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <BanknotesIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Max Deduction
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                ${result.maxDeduction.toFixed(2)}
              </p>
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

          {result.emergencyAllowed && (
            <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
              <FireIcon className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">
                Emergency repairs may be performed immediately without waiting for the notice period.
              </span>
            </div>
          )}
        </>
      )}

      {!result.allowed && result.emergencyAllowed && (
        <div className="p-3 bg-amber-50 rounded-lg flex items-center gap-2">
          <FireIcon className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-700 font-medium">
            Emergency repairs may still be allowed in extreme circumstances. Consult an attorney.
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
