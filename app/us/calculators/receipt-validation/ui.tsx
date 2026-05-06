"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentCheckIcon,
  ComputerDesktopIcon,
  PencilSquareIcon,
  ListBulletIcon,
  BookOpenIcon,
  InformationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import type { ReceiptValidationResult } from "./schema";

const ALL_RECEIPT_FIELDS = [
  "Amount paid",
  "Date of payment",
  "Tenant name",
  "Property address",
  "Payment period",
  "Landlord name",
  "Payment method",
  "Late fees",
  "Security deposit credit",
  "Balance forward",
  "Signature",
];

interface ReceiptValidationFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (providedFields: string[]) => void;
  result: ReceiptValidationResult | null;
}

export function ReceiptValidationForm({
  theme,
  stateName,
  onCalculate,
  result,
}: ReceiptValidationFormProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = () => {
    onCalculate(selectedFields);
  };

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select the fields included in your rent receipt to check whether it
          meets {stateName} legal requirements.
        </p>

        <LCField label="Fields included in your receipt" theme={theme}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ALL_RECEIPT_FIELDS.map((field) => (
              <label
                key={field}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                  checked={selectedFields.includes(field)}
                  onChange={() => toggleField(field)}
                />
                <span className="text-sm text-slate-700">{field}</span>
              </label>
            ))}
          </div>
        </LCField>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <ClipboardDocumentCheckIcon className="w-4 h-4" />
          Validate Receipt
        </LCButton>
      </LCCard>

      {result && (
        <ReceiptValidationResultCard
          result={result}
          stateName={stateName}
          theme={theme}
        />
      )}
    </div>
  );
}

function ReceiptValidationResultCard({
  result,
  stateName,
  theme,
}: {
  result: ReceiptValidationResult;
  stateName: string;
  theme: Theme;
}) {
  const isValid = result.missingFields.length === 0;

  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Receipt Validation Result
        </h3>
      </div>

      <div
        className={`p-4 rounded-lg flex items-center gap-3 ${
          isValid ? "bg-green-50" : "bg-red-50"
        }`}
      >
        {isValid ? (
          <CheckCircleIcon className="w-6 h-6 text-green-600 shrink-0" />
        ) : (
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 shrink-0" />
        )}
        <div>
          <p
            className={`font-semibold ${
              isValid ? "text-green-800" : "text-red-800"
            }`}
          >
            {isValid
              ? "Receipt meets all legal requirements"
              : `Receipt is missing ${result.missingFields.length} required field${
                  result.missingFields.length > 1 ? "s" : ""
                }`}
          </p>
          <p className="text-sm text-slate-600">
            {isValid
              ? "All required fields are present."
              : "Add the missing fields below to bring the receipt into compliance."}
          </p>
        </div>
      </div>

      {result.requiredFields.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentCheckIcon
              className="w-4 h-4"
              style={{ color: theme.colors.primary }}
            />
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

      {result.missingFields.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <XCircleIcon className="w-4 h-4 text-red-500" />
            Missing Fields
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.missingFields.map((field, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <RequirementItem
          label="Digital Receipts Allowed"
          value={result.digitalAllowed}
          icon={result.digitalAllowed ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Signature Required"
          value={result.signatureRequired}
          icon={result.signatureRequired ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Itemization Required"
          value={result.itemizationRequired}
          icon={result.itemizationRequired ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
      </div>

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
