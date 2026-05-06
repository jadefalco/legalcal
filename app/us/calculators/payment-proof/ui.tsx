"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentCheckIcon,
  NoSymbolIcon,
  ComputerDesktopIcon,
  EnvelopeIcon,
  ScaleIcon,
  BookOpenIcon,
  InformationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import type { PaymentProofResult } from "./schema";

const ALL_PROOF_OPTIONS = [
  "Bank statement",
  "Cancelled check",
  "Money order stub",
  "Zelle/Venmo screenshot",
  "PayPal receipt",
  "Text message confirmation",
  "Email confirmation",
  "Landlord-written note",
  "Lease clause referencing payment",
  "Cash receipt",
  "Other",
];

interface PaymentProofFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (providedProof: string[]) => void;
  result: PaymentProofResult | null;
}

export function PaymentProofForm({
  theme,
  stateName,
  onCalculate,
  result,
}: PaymentProofFormProps) {
  const [selectedProof, setSelectedProof] = useState<string[]>([]);

  const toggleProof = (proof: string) => {
    setSelectedProof((prev) =>
      prev.includes(proof) ? prev.filter((p) => p !== proof) : [...prev, proof]
    );
  };

  const handleSubmit = () => {
    onCalculate(selectedProof);
  };

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Select the proof of payment you have to check whether it is legally
          valid in {stateName}.
        </p>

        <LCField label="What proof of payment do you have?" theme={theme}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ALL_PROOF_OPTIONS.map((proof) => (
              <label
                key={proof}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                  checked={selectedProof.includes(proof)}
                  onChange={() => toggleProof(proof)}
                />
                <span className="text-sm text-slate-700">{proof}</span>
              </label>
            ))}
          </div>
        </LCField>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <ShieldCheckIcon className="w-4 h-4" />
          Check Payment Proof Validity
        </LCButton>
      </LCCard>

      {result && (
        <PaymentProofResultCard
          result={result}
          stateName={stateName}
          theme={theme}
        />
      )}
    </div>
  );
}

function PaymentProofResultCard({
  result,
  stateName,
  theme,
}: {
  result: PaymentProofResult;
  stateName: string;
  theme: Theme;
}) {
  const hasMissingProof = result.missingRequiredProof.length > 0;

  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Payment Proof Validity
        </h3>
      </div>

      {/* Status banner */}
      <div
        className={`p-4 rounded-lg flex items-center gap-3 ${
          hasMissingProof ? "bg-amber-50" : "bg-green-50"
        }`}
      >
        {hasMissingProof ? (
          <NoSymbolIcon className="w-6 h-6 text-amber-600 shrink-0" />
        ) : (
          <CheckCircleIcon className="w-6 h-6 text-green-600 shrink-0" />
        )}
        <div>
          <p
            className={`font-semibold ${
              hasMissingProof ? "text-amber-800" : "text-green-800"
            }`}
          >
            {hasMissingProof
              ? "Your proof may be incomplete"
              : "Your proof meets state requirements"}
          </p>
          <p className="text-sm text-slate-600">
            {hasMissingProof
              ? `You are missing ${result.missingRequiredProof.length} accepted proof type${result.missingRequiredProof.length > 1 ? "s" : ""}.`
              : "You have at least one form of proof accepted by state law."}
          </p>
        </div>
      </div>

      {result.acceptedProof.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentCheckIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Accepted Proof Types
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.acceptedProof.map((proof, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700"
              >
                {proof}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.rejectedProof.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <NoSymbolIcon className="w-4 h-4 text-red-500" />
            Rejected Proof Types
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.rejectedProof.map((proof, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700"
              >
                {proof}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.missingRequiredProof.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <XCircleIcon className="w-4 h-4 text-red-500" />
            Missing Accepted Proof Types
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.missingRequiredProof.map((proof, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700"
              >
                {proof}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <RequirementItem
          label="Digital Proof Allowed"
          value={result.digitalProofAllowed}
          icon={result.digitalProofAllowed ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
        <RequirementItem
          label="Landlord Must Acknowledge"
          value={result.landlordMustAcknowledge}
          icon={result.landlordMustAcknowledge ? CheckCircleIcon : XCircleIcon}
          theme={theme}
        />
      </div>

      <div className="p-3 bg-slate-50 rounded-lg space-y-1">
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Acknowledgement Timeframe
          </span>
        </div>
        <p className="text-base font-semibold text-slate-800">
          {result.acknowledgementTimeframe}
        </p>
      </div>

      <div className="p-3 bg-slate-50 rounded-lg space-y-1">
        <div className="flex items-center gap-2">
          <ScaleIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Burden of Proof Rule
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-800">
          {result.burdenOfProofRule}
        </p>
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
