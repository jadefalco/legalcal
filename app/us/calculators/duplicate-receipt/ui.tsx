"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import {
  DocumentDuplicateIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClockIcon,
  BanknotesIcon,
  ListBulletIcon,
  BookOpenIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { DuplicateReceiptResult } from "./schema";

interface DuplicateReceiptFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: () => void;
  result: DuplicateReceiptResult | null;
}

export function DuplicateReceiptForm({
  theme,
  stateName,
  onCalculate,
  result,
}: DuplicateReceiptFormProps) {
  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Check whether tenants in {stateName} have a right to request a duplicate
          rent receipt, whether landlords must provide it, and what rules apply.
        </p>

        <LCButton variant="primary" theme={theme} onClick={onCalculate}>
          <DocumentDuplicateIcon className="w-4 h-4" />
          Show Duplicate Receipt Rules
        </LCButton>
      </LCCard>

      {result && (
        <DuplicateReceiptResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function DuplicateReceiptResultCard({
  result,
  stateName,
  theme,
}: {
  result: DuplicateReceiptResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Duplicate Receipt Rules
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <RequirementItem
          label="Tenant Right to Copy"
          value={result.tenantRightToCopy}
          icon={result.tenantRightToCopy ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Landlord Must Provide"
          value={result.landlordMustProvide}
          icon={result.landlordMustProvide ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Timeframe
            </span>
          </div>
          <p className="text-base font-semibold text-slate-800">{result.timeframe}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <BanknotesIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Allowed Fee
            </span>
          </div>
          <p className="text-base font-semibold text-slate-800">
            {result.allowedFee !== null ? `$${result.allowedFee.toFixed(2)}` : "Not specified"}
          </p>
        </div>
      </div>

      {result.requiredFields.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <ListBulletIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Required Fields
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.requiredFields.map((field, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.statutes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <BookOpenIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
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
}: {
  label: string;
  value: boolean;
  icon: React.ComponentType<any>;
  theme: Theme;
}) {
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
