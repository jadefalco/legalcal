"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import {
  DocumentTextIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PrinterIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  InformationCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import type { RentReceiptResult } from "./schema";

interface RentReceiptFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: () => void;
  result: RentReceiptResult | null;
}

export function RentReceiptForm({
  theme,
  stateName,
  onCalculate,
  result,
}: RentReceiptFormProps) {
  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          View rent receipt requirements for {stateName}. This calculator shows
          whether landlords must provide receipts, under what conditions, and
          through which delivery methods.
        </p>

        <LCButton variant="primary" theme={theme} onClick={onCalculate}>
          <DocumentTextIcon className="w-4 h-4" />
          Show Requirements
        </LCButton>
      </LCCard>

      {result && (
        <RentReceiptResultCard result={result} stateName={stateName} theme={theme} />
      )}
    </div>
  );
}

function RentReceiptResultCard({
  result,
  stateName,
  theme,
}: {
  result: RentReceiptResult;
  stateName: string;
  theme: Theme;
}) {
  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Rent Receipt Requirements
        </h3>
      </div>

      {/* Overall requirement */}
      <div className="grid gap-4 sm:grid-cols-2">
        <RequirementItem
          label="Receipts Required"
          value={result.required}
          icon={result.required ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Required for Cash"
          value={result.requiredWhenCash}
          icon={result.requiredWhenCash ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Required Upon Request"
          value={result.requiredWhenRequested}
          icon={result.requiredWhenRequested ? CheckCircleIcon : XCircleIcon}
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
      </div>

      {/* Delivery methods */}
      {result.deliveryMethods.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Allowed Delivery Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.deliveryMethods.map((method, i) => {
              const icons: Record<string, React.ComponentType<any>> = {
                paper: PrinterIcon,
                email: EnvelopeIcon,
                digital: DevicePhoneMobileIcon,
                text: DevicePhoneMobileIcon,
              };
              const Icon = icons[method.toLowerCase()] || DocumentTextIcon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {method}
                </span>
              );
            })}
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
