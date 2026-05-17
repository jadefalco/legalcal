"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import {
  WrenchIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCRepairRequestCalculator() {
  const theme = getTheme("ca", "bc");
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [requestDate, setRequestDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    deadline: string;
    timeline: string;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "repair-request");
  const data = rule?.data as Record<string, unknown> | undefined;
  const urgentHours =
    typeof data?.repairUrgentTimelineHours === "number"
      ? data.repairUrgentTimelineHours
      : 24;
  const nonUrgentDays =
    typeof data?.repairNonUrgentTimelineDays === "number"
      ? data.repairNonUrgentTimelineDays
      : 7;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    if (!requestDate) {
      setError("Please select a repair request date.");
      setResult(null);
      return;
    }
    const date = new Date(requestDate);
    if (isNaN(date.getTime())) {
      setError("Invalid date selected.");
      setResult(null);
      return;
    }

    if (isUrgent) {
      const deadline = new Date(date.getTime() + urgentHours * 60 * 60 * 1000);
      setResult({
        deadline: deadline.toLocaleString(),
        timeline: `${urgentHours} hours`,
      });
    } else {
      const deadline = new Date(
        date.getTime() + nonUrgentDays * 24 * 60 * 60 * 1000
      );
      setResult({
        deadline: deadline.toLocaleDateString(),
        timeline: `${nonUrgentDays} days`,
      });
    }
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Repair Request Calculator"
        description="Calculate the deadline for landlord repairs in BC."
        icon={WrenchIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select the repair request date and indicate if the repair is urgent to
          calculate the landlord&apos;s deadline in British Columbia.
        </p>

        <LCField label="Repair Request Date" theme={theme}>
          <input
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        <div className="flex items-center gap-2">
          <input
            id="urgent"
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <label htmlFor="urgent" className="text-sm text-slate-700">
            This is an urgent repair (e.g., major leak, heating failure,
            electrical hazard)
          </label>
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <WrenchIcon className="w-4 h-4" />
          Calculate Deadline
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <WrenchIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Repair Deadline
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.deadline}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ClockIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Expected Timeline
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.timeline}
              </p>
            </div>
          </div>
        </LCCard>
      )}

      {citations.length > 0 && (
        <LCCard theme={theme} className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentTextIcon
              className="w-4 h-4"
              style={{ color: theme.colors.primary }}
            />
            Applicable Statutes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {citations.map((c, i) => (
              <li key={i}>{c.statute}</li>
            ))}
          </ul>
        </LCCard>
      )}

      {notes.length > 0 && (
        <LCCard theme={theme} className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <InformationCircleIcon className="w-4 h-4 text-blue-500" />
            Notes
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </LCCard>
      )}
    </div>
  );
}
