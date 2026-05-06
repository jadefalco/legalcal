"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  CalendarDaysIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { LeaseTerminationResult } from "./schema";

interface LeaseTerminationFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (moveOutDate: string, reason: string) => void;
  result: LeaseTerminationResult | null;
}

export function LeaseTerminationForm({
  theme,
  stateName,
  onCalculate,
  result,
}: LeaseTerminationFormProps) {
  const [moveOutDate, setMoveOutDate] = useState<string>("");
  const [reason, setReason] = useState<string>("no-fault");

  const handleSubmit = () => {
    if (!moveOutDate) return;
    onCalculate(moveOutDate, reason);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <LCField label="Planned Move-Out Date" theme={theme}>
            <input
              type="date"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={moveOutDate}
              min={today}
              onChange={(e) => setMoveOutDate(e.target.value)}
            />
          </LCField>

          <LCField label="Reason for Termination (optional)" theme={theme}>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="no-fault">No-fault / End of lease</option>
              <option value="domestic-violence">Domestic violence</option>
              <option value="lease-violation">Lease violation by landlord</option>
              <option value="military">Military deployment (SCRA)</option>
              <option value="other">Other</option>
            </select>
          </LCField>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <CalendarDaysIcon className="w-4 h-4" />
          Calculate Notice Deadline
        </LCButton>
      </LCCard>

      {result && (
        <LeaseTerminationResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function LeaseTerminationResultCard({
  result,
  stateName,
  theme,
}: {
  result: LeaseTerminationResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Lease Termination Result
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultItem
          label="Notice Required"
          value={`${result.noticeRequired} days`}
          icon={CalendarDaysIcon}
          theme={theme}
        />
        <ResultItem
          label="Latest Notice Deadline"
          value={result.deadlineDate}
          icon={ExclamationTriangleIcon}
          theme={theme}
        />
      </div>

      {result.specialRules.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Special Rules
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.specialRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
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

      {result.penalties.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
            Potential Penalties
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {result.penalties.map((penalty, i) => (
              <li key={i}>{penalty}</li>
            ))}
          </ul>
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
