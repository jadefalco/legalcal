"use client";

import { useState } from "react";
import { getRuleFromBundle } from "@/lib/authority/bundle";
import { getTheme } from "@/app/theme";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCField } from "@/app/components/lc/LCField";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCCard } from "@/app/components/lc/LCCard";
import {
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function BCConditionInspectionCalculator() {
  const theme = getTheme("ca", "bc");
  const [moveInDate, setMoveInDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    reportDue: string;
    reportDeadlineDays: number;
  } | null>(null);

  const rule = getRuleFromBundle("bc", "condition-inspection");
  const data = rule?.data as Record<string, unknown> | undefined;
  const reportDays =
    typeof data?.reportDeadlineDays === "number" ? data.reportDeadlineDays : 7;
  const inspectionRequired =
    typeof data?.inspectionRequired === "boolean"
      ? data.inspectionRequired
      : true;
  const moveInInspection =
    typeof data?.moveInInspection === "boolean"
      ? data.moveInInspection
      : true;
  const moveOutInspection =
    typeof data?.moveOutInspection === "boolean"
      ? data.moveOutInspection
      : true;
  const tenantHasRightToAttend =
    typeof data?.tenantHasRightToAttend === "boolean"
      ? data.tenantHasRightToAttend
      : true;
  const citations = rule?.citations || [];
  const notes = (data?.notes as string[]) || [];

  function handleCalculate() {
    setError(null);
    if (!moveInDate) {
      setError("Please select a move-in date.");
      setResult(null);
      return;
    }
    const date = new Date(moveInDate);
    if (isNaN(date.getTime())) {
      setError("Invalid date selected.");
      setResult(null);
      return;
    }
    const deadline = new Date(date.getTime() + reportDays * 24 * 60 * 60 * 1000);
    setResult({
      reportDue: deadline.toLocaleDateString(),
      reportDeadlineDays: reportDays,
    });
  }

  return (
    <div className="space-y-8">
      <LCSection
        title="BC Condition Inspection Checklist"
        description="Review condition inspection requirements and timelines for BC."
        icon={ClipboardDocumentCheckIcon}
        theme={theme}
      />

      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select your move-in date to calculate the inspection report deadline
          in British Columbia.
        </p>

        <LCField label="Move-In Date" theme={theme}>
          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </LCField>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <LCButton variant="primary" theme={theme} onClick={handleCalculate}>
          <CalendarDaysIcon className="w-4 h-4" />
          Calculate Report Deadline
        </LCButton>
      </LCCard>

      {result && (
        <LCCard theme={theme} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Inspection Report Due By
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.reportDue}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1">
              <div className="flex items-center gap-2">
                <ClipboardDocumentCheckIcon
                  className="w-4 h-4"
                  style={{ color: theme.colors.primary }}
                />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Deadline
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {result.reportDeadlineDays} days from move-in
              </p>
            </div>
          </div>
        </LCCard>
      )}

      <LCCard theme={theme} className="space-y-4">
        <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <ClipboardDocumentCheckIcon
            className="w-4 h-4"
            style={{ color: theme.colors.primary }}
          />
          Requirements
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <RequirementItem label="Inspection Required" value={inspectionRequired} />
          <RequirementItem label="Move-In Inspection" value={moveInInspection} />
          <RequirementItem label="Move-Out Inspection" value={moveOutInspection} />
          <RequirementItem
            label="Tenant Right to Attend"
            value={tenantHasRightToAttend}
          />
        </div>
      </LCCard>

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

function RequirementItem({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
      <div className="flex items-center gap-2">
        {value ? (
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
        ) : (
          <XCircleIcon className="w-4 h-4 text-red-600" />
        )}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p
        className={`text-base font-semibold ${
          value ? "text-green-700" : "text-slate-800"
        }`}
      >
        {value ? "Yes" : "No"}
      </p>
    </div>
  );
}
