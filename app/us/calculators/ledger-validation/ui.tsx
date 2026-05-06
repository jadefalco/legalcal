"use client";

import { useState } from "react";
import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";
import {
  DocumentChartBarIcon,
  BanknotesIcon,
  ReceiptRefundIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ScaleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { LedgerValidationResult, PaymentEntry, ChargeEntry } from "./schema";

interface LedgerValidationFormProps {
  theme: Theme;
  stateName: string;
  onCalculate: (payments: PaymentEntry[], charges: ChargeEntry[]) => void;
  result: LedgerValidationResult | null;
}

export function LedgerValidationForm({
  theme,
  stateName,
  onCalculate,
  result,
}: LedgerValidationFormProps) {
  const [payments, setPayments] = useState<PaymentEntry[]>([
    { date: "", amount: 0 },
  ]);
  const [charges, setCharges] = useState<ChargeEntry[]>([
    { date: "", type: "", amount: 0 },
  ]);

  const addPayment = () => {
    setPayments((prev) => [...prev, { date: "", amount: 0 }]);
  };

  const removePayment = (index: number) => {
    setPayments((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePayment = (index: number, field: keyof PaymentEntry, value: string | number) => {
    setPayments((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addCharge = () => {
    setCharges((prev) => [...prev, { date: "", type: "", amount: 0 }]);
  };

  const removeCharge = (index: number) => {
    setCharges((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCharge = (index: number, field: keyof ChargeEntry, value: string | number) => {
    setCharges((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = () => {
    const validPayments = payments.filter((p) => p.date && p.amount > 0);
    const validCharges = charges.filter((c) => c.date && c.type && c.amount > 0);
    if (validPayments.length === 0 && validCharges.length === 0) return;
    onCalculate(validPayments, validCharges);
  };

  return (
    <div className="space-y-6">
      <LCCard theme={theme} className="space-y-5">
        <p className="text-sm text-slate-600">
          Enter your rent payments and the landlord&apos;s charges to check whether the
          ledger is accurate and legally compliant in {stateName}.
        </p>

        {/* Payments section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <BanknotesIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Payments Made
          </h4>
          {payments.map((payment, index) => (
            <div key={index} className="grid gap-3 grid-cols-[1fr_1fr_auto] items-end">
              <LCField label="Date" theme={theme}>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={payment.date}
                  onChange={(e) => updatePayment(index, "date", e.target.value)}
                />
              </LCField>
              <LCField label="Amount" theme={theme}>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={payment.amount || ""}
                  onChange={(e) => updatePayment(index, "amount", parseFloat(e.target.value) || 0)}
                />
              </LCField>
              <button
                type="button"
                onClick={() => removePayment(index)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                disabled={payments.length === 1}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPayment}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Add Payment
          </button>
        </div>

        {/* Charges section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <ReceiptRefundIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Landlord Charges
          </h4>
          {charges.map((charge, index) => (
            <div key={index} className="grid gap-3 grid-cols-[1fr_1fr_1fr_auto] items-end">
              <LCField label="Date" theme={theme}>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={charge.date}
                  onChange={(e) => updateCharge(index, "date", e.target.value)}
                />
              </LCField>
              <LCField label="Type" theme={theme}>
                <input
                  type="text"
                  placeholder="e.g. rent, late fee"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={charge.type}
                  onChange={(e) => updateCharge(index, "type", e.target.value)}
                />
              </LCField>
              <LCField label="Amount" theme={theme}>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={charge.amount || ""}
                  onChange={(e) => updateCharge(index, "amount", parseFloat(e.target.value) || 0)}
                />
              </LCField>
              <button
                type="button"
                onClick={() => removeCharge(index)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                disabled={charges.length === 1}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCharge}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Add Charge
          </button>
        </div>

        <LCButton variant="primary" theme={theme} onClick={handleSubmit}>
          <DocumentChartBarIcon className="w-4 h-4" />
          Validate Ledger
        </LCButton>
      </LCCard>

      {result && (
        <LedgerValidationResultCard
          result={result}
          stateName={stateName}
          theme={theme}
        />
      )}
    </div>
  );
}

function LedgerValidationResultCard({
  result,
  stateName,
  theme,
}: {
  result: LedgerValidationResult;
  stateName: string;
  theme: Theme;
}) {
  const hasIssues = result.illegalFeesFound.length > 0 || result.misappliedPayments.length > 0;

  return (
    <LCCard theme={theme} className="space-y-5">
      <div className="flex items-center gap-2">
        <ArrowPathIcon className="w-5 h-5" style={{ color: theme.colors.primary }} />
        <h3 className="font-semibold text-slate-800">
          {stateName} Ledger Validation Result
        </h3>
      </div>

      {/* Status banner */}
      <div
        className={`p-4 rounded-lg flex items-center gap-3 ${
          hasIssues ? "bg-red-50" : "bg-green-50"
        }`}
      >
        {hasIssues ? (
          <NoSymbolIcon className="w-6 h-6 text-red-600 shrink-0" />
        ) : (
          <DocumentChartBarIcon className="w-6 h-6 text-green-600 shrink-0" />
        )}
        <div>
          <p
            className={`font-semibold ${
              hasIssues ? "text-red-800" : "text-green-800"
            }`}
          >
            {hasIssues
              ? "Issues found in the ledger"
              : "Ledger appears compliant"}
          </p>
          <p className="text-sm text-slate-600">
            {hasIssues
              ? "Review the issues below."
              : "No illegal fees or misapplied payments detected."}
          </p>
        </div>
      </div>

      {/* Balance summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ScaleIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Tenant Balance
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            ${result.balanceAccordingToTenant.toFixed(2)}
          </p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ScaleIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Correct Balance
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            ${result.balanceAccordingToLandlord.toFixed(2)}
          </p>
        </div>
        <div className={`p-3 rounded-lg space-y-1 ${result.difference !== 0 ? "bg-red-50" : "bg-slate-50"}`}>
          <div className="flex items-center gap-2">
            <ScaleIcon className="w-4 h-4" style={{ color: result.difference !== 0 ? "#dc2626" : theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Difference
            </span>
          </div>
          <p className={`text-lg font-semibold ${result.difference !== 0 ? "text-red-700" : "text-slate-800"}`}>
            ${result.difference.toFixed(2)}
          </p>
        </div>
      </div>

      {result.illegalFeesFound.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <NoSymbolIcon className="w-4 h-4 text-red-500" />
            Illegal Fees Found
          </h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {result.illegalFeesFound.map((fee, i) => (
              <li key={i}>{fee}</li>
            ))}
          </ul>
        </div>
      )}

      {result.misappliedPayments.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-amber-500" />
            Potential Misapplied Payments
          </h4>
          <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
            {result.misappliedPayments.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {result.paymentApplicationOrder.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            Required Payment Application Order
          </h4>
          <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
            {result.paymentApplicationOrder.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <ReceiptRefundIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Late Fee Rules
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">{result.lateFeeRules}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg space-y-1">
          <div className="flex items-center gap-2">
            <BanknotesIcon className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Partial Payment Rules
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">{result.partialPaymentRules}</p>
        </div>
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
