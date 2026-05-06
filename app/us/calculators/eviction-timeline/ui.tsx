"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  CalendarDaysIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ClockIcon,
  ShieldExclamationIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import type { EvictionTimelineResult } from "./schema";

interface EvictionTimelineFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (noticeDate: string) => void;
  result: EvictionTimelineResult | null;
}

export function EvictionTimelineForm({
  theme,
  stateName,
  onCalculate,
  result,
}: EvictionTimelineFormProps) {
  const [noticeDate, setNoticeDate] = useState<string>("");

  const handleSubmit = () => {
    if (!noticeDate) return;
    onCalculate(noticeDate);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <LCField label="Notice Served Date" theme={theme}>
          <input
            type="date"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={noticeDate}
            max={today}
            onChange={(e) => setNoticeDate(e.target.value)}
          />
        </LCField>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <ScaleIcon className="w-4 h-4" />
          Calculate Eviction Timeline
        </LCButton>
      </LCCard>

      {result && (
        <EvictionTimelineResultCard
          result={result}
          stateName={stateName}
          theme={theme}
        />
      )}
    </div>
  );
}

function EvictionTimelineResultCard({
  result,
  stateName,
  theme,
}: {
  result: EvictionTimelineResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Eviction Timeline Result
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultItem
          label="Notice Period"
          value={`${result.noticePeriod} days`}
          icon={ClockIcon}
          theme={theme}
        />
        <ResultItem
          label="Earliest Filing Date"
          value={result.filingDate}
          icon={DocumentTextIcon}
          theme={theme}
        />
        <ResultItem
          label="Estimated Hearing Date"
          value={result.hearingDate}
          icon={ScaleIcon}
          theme={theme}
        />
        <ResultItem
          label="Estimated Lockout Date"
          value={result.lockoutDate}
          icon={HomeIcon}
          theme={theme}
        />
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
            <ShieldExclamationIcon className="w-4 h-4 text-blue-500" />
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
