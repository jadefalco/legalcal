"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  ClockIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import type { EntryNoticeResult } from "./schema";

interface EntryNoticeFormProps {
  theme: Theme;
  stateName: string;
  allowedReasons: string[];
  onCalculate: (entryReason: string, nowDateTime: string) => void;
  result: EntryNoticeResult | null;
}

export function EntryNoticeForm({
  theme,
  stateName,
  allowedReasons,
  onCalculate,
  result,
}: EntryNoticeFormProps) {
  const [entryReason, setEntryReason] = useState<string>(allowedReasons[0] || "Repairs");
  const [nowDateTime, setNowDateTime] = useState<string>("");

  const handleSubmit = () => {
    if (!nowDateTime) return;
    onCalculate(entryReason, nowDateTime);
  };

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const defaultDateTime = now.toISOString().slice(0, 16);

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <LCField label="Current Date & Time" theme={theme}>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={nowDateTime || defaultDateTime}
              onChange={(e) => setNowDateTime(e.target.value)}
            />
          </LCField>

          <LCField label="Reason for Entry" theme={theme}>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={entryReason}
              onChange={(e) => setEntryReason(e.target.value)}
            >
              {allowedReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <ClockIcon className="w-4 h-4" />
          Calculate Earliest Entry Time
        </LCButton>
      </LCCard>

      {result && (
        <EntryNoticeResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function EntryNoticeResultCard({
  result,
  stateName,
  theme,
}: {
  result: EntryNoticeResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Entry Notice Result
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultItem
          label="Required Notice"
          value={`${result.noticeHours} hours`}
          icon={ClockIcon}
          theme={theme}
        />
        <ResultItem
          label="Earliest Lawful Entry"
          value={result.earliestEntryDateTime}
          icon={CalendarDaysIcon}
          theme={theme}
        />
      </div>

      {result.emergencyAllowed && (
        <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
          <FireIcon className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700 font-medium">
            Emergency entry is allowed without advance notice for genuine emergencies.
          </span>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <ShieldCheckIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
          Allowed Reasons
        </h4>
        <div className="flex flex-wrap gap-2">
          {result.allowedReasons.map((reason, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700"
            >
              {reason}
            </span>
          ))}
        </div>
      </div>

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

      {result.weekendRules.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
            Weekend & Holiday Rules
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.weekendRules.map((rule, i) => (
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
