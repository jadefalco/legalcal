"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  ClockIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import type { LateStatusResult } from "./schema";

interface LateStatusFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (dueDate: string, today: string) => void;
  result: LateStatusResult | null;
}

export function LateStatusForm({
  theme,
  stateName,
  onCalculate,
  result,
}: LateStatusFormProps) {
  const [dueDate, setDueDate] = useState<string>("");
  const [today, setToday] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = () => {
    if (!dueDate || !today) return;
    onCalculate(dueDate, today);
  };

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter the rent due date and the current date to check whether rent is
          legally late in {stateName} and when late fees may begin.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <LCField label="Rent Due Date" theme={theme}>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </LCField>

          <LCField label="Today's Date" theme={theme}>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={today}
              onChange={(e) => setToday(e.target.value)}
            />
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <ClockIcon className="w-4 h-4" />
          Check Late Status
        </LCButton>
      </LCCard>

      {result && (
        <LateStatusResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function LateStatusResultCard({
  result,
  stateName,
  theme,
}: {
  result: LateStatusResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Late Status Result
        </h3>
      </div>

      {/* Status banner */}
      <div
        className={`p-4 rounded-lg flex items-center gap-3 ${
          result.isLateToday ? "bg-red-50" : "bg-green-50"
        }`}
      >
        {result.isLateToday ? (
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 shrink-0" />
        ) : (
          <CheckCircleIcon className="w-6 h-6 text-green-600 shrink-0" />
        )}
        <div>
          <p
            className={`font-semibold ${
              result.isLateToday ? "text-red-800" : "text-green-800"
            }`}
          >
            {result.isLateToday
              ? "Rent is legally late"
              : "Rent is not yet late"}
          </p>
          <p className="text-sm text-slate-600">
            {result.isLateToday
              ? "The adjusted due date has passed."
              : "Today is on or before the adjusted due date."}
          </p>
        </div>
      </div>

      {/* Late fees banner */}
      <div
        className={`p-4 rounded-lg flex items-center gap-3 ${
          result.lateFeesAllowedToday ? "bg-amber-50" : "bg-green-50"
        }`}
      >
        {result.lateFeesAllowedToday ? (
          <BanknotesIcon className="w-6 h-6 text-amber-600 shrink-0" />
        ) : (
          <CheckCircleIcon className="w-6 h-6 text-green-600 shrink-0" />
        )}
        <div>
          <p
            className={`font-semibold ${
              result.lateFeesAllowedToday ? "text-amber-800" : "text-green-800"
            }`}
          >
            {result.lateFeesAllowedToday
              ? "Late fees may be charged"
              : "Late fees may not yet be charged"}
          </p>
          <p className="text-sm text-slate-600">
            {result.lateFeesAllowedToday
              ? "The grace period (if any) has ended."
              : "The grace period or adjusted due date has not yet passed."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultItem
          label="Original Due Date"
          value={result.dueDate}
          icon={CalendarDaysIcon}
          theme={theme}
        />
        <ResultItem
          label="Adjusted Due Date"
          value={result.adjustedDueDate}
          icon={CalendarDaysIcon}
          theme={theme}
        />
        <ResultItem
          label="Grace Period Ends"
          value={result.gracePeriodEnds}
          icon={ClockIcon}
          theme={theme}
        />
        <StatusItem
          label="Weekend Extension"
          value={result.weekendExtension}
          theme={theme}
        />
        <StatusItem
          label="Holiday Extension"
          value={result.holidayExtension}
          theme={theme}
        />
      </div>

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
      <p className="text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function StatusItem({
  label,
  value,
  theme,
}: {
  label: string;
  value: boolean;
  theme: Theme;
}) {
  const Icon = value ? CheckCircleIcon : XCircleIcon;
  return (
    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
      <div className="flex items-center gap-2">
        <Icon
          className="w-4 h-4"
          style={{ color: value ? "#16a34a" : theme.colors.primary }}
        />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className={`text-base font-semibold ${value ? "text-green-700" : "text-slate-800"}`}>
        {value ? "Yes" : "No"}
      </p>
    </div>
  );
}
