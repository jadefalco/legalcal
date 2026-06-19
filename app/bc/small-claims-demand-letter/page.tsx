"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateSmallClaims } from "@/lib/bcSmallClaimsRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCSmallClaimsDemandLetterPage() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddressLine1, setSenderAddressLine1] = useState("");
  const [senderAddressLine2, setSenderAddressLine2] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostalCode, setSenderPostalCode] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddressLine1, setRecipientAddressLine1] = useState("");
  const [recipientAddressLine2, setRecipientAddressLine2] = useState("");
  const [recipientCity, setRecipientCity] = useState("");
  const [recipientPostalCode, setRecipientPostalCode] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimReason, setClaimReason] = useState("");
  const [claimReasonOtherDescription, setClaimReasonOtherDescription] =
    useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [claimDescription, setClaimDescription] = useState("");
  const [paymentDeadlineDate, setPaymentDeadlineDate] = useState("");
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState("");
  const [preferredPaymentMethodOtherDescription,
    setPreferredPaymentMethodOtherDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const claimAmountNum = claimAmount ? Number(claimAmount) : 0;
    const { valid } = validateSmallClaims(claimAmountNum);
    if (!valid) {
      setError(
        "The claim amount must be between $1 and $35,000 to fall within BC Small Claims Court jurisdiction."
      );
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      senderName,
      senderEmail: senderEmail || undefined,
      senderPhone: senderPhone || undefined,
      senderAddressLine1,
      senderAddressLine2: senderAddressLine2 || undefined,
      senderCity,
      senderPostalCode,
      recipientName,
      recipientAddressLine1,
      recipientAddressLine2: recipientAddressLine2 || undefined,
      recipientCity,
      recipientPostalCode,
      claimAmount: claimAmountNum,
      claimReason,
      claimReasonOtherDescription:
        claimReason === "other"
          ? claimReasonOtherDescription || undefined
          : undefined,
      incidentDate,
      claimDescription,
      paymentDeadlineDate,
      preferredPaymentMethod,
      preferredPaymentMethodOtherDescription:
        preferredPaymentMethod === "other"
          ? preferredPaymentMethodOtherDescription || undefined
          : undefined,
      additionalNotes: additionalNotes || undefined,
    };

    try {
      const res = await fetch("/api/checkout/bc-small-claims-demand-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.url) {
        setError(json.error || "Failed to create checkout session.");
        setLoading(false);
        return;
      }

      window.location.assign(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="BC Small Claims Demand Letter"
          description="Generate a demand letter for BC Small Claims Court."
          icon={DocumentTextIcon}
          theme={theme}
        />

        <LCCard theme={theme} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
              <ExclamationTriangleIcon className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">
                Sender Information
              </h3>
              <LCField label="Sender Name" theme={theme}>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Sender Email (Optional)" theme={theme}>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Sender Phone (Optional)" theme={theme}>
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <LCField label="Sender Address Line 1" theme={theme}>
                <input
                  type="text"
                  required
                  value={senderAddressLine1}
                  onChange={(e) => setSenderAddressLine1(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Sender Address Line 2 (Optional)" theme={theme}>
                <input
                  type="text"
                  value={senderAddressLine2}
                  onChange={(e) => setSenderAddressLine2(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="City" theme={theme}>
                  <input
                    type="text"
                    required
                    value={senderCity}
                    onChange={(e) => setSenderCity(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Postal Code" theme={theme}>
                  <input
                    type="text"
                    required
                    value={senderPostalCode}
                    onChange={(e) => setSenderPostalCode(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Recipient Information
              </h3>
              <LCField label="Recipient Name" theme={theme}>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Recipient Address Line 1" theme={theme}>
                <input
                  type="text"
                  required
                  value={recipientAddressLine1}
                  onChange={(e) => setRecipientAddressLine1(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField
                label="Recipient Address Line 2 (Optional)"
                theme={theme}
              >
                <input
                  type="text"
                  value={recipientAddressLine2}
                  onChange={(e) => setRecipientAddressLine2(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="City" theme={theme}>
                  <input
                    type="text"
                    required
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Postal Code" theme={theme}>
                  <input
                    type="text"
                    required
                    value={recipientPostalCode}
                    onChange={(e) => setRecipientPostalCode(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Claim Details</h3>
              <LCField label="Claim Amount (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  required
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Claim Reason" theme={theme}>
                <select
                  required
                  value={claimReason}
                  onChange={(e) => setClaimReason(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a reason</option>
                  <option value="unpaid_rent">Unpaid Rent</option>
                  <option value="property_damage">Property Damage</option>
                  <option value="unreturned_deposit">Unreturned Deposit</option>
                  <option value="unpaid_utilities">Unpaid Utilities</option>
                  <option value="breach_of_agreement">
                    Breach of Agreement
                  </option>
                  <option value="other">Other</option>
                </select>
              </LCField>

              {claimReason === "other" && (
                <LCField
                  label="Claim Reason Other Description"
                  theme={theme}
                >
                  <input
                    type="text"
                    required
                    value={claimReasonOtherDescription}
                    onChange={(e) =>
                      setClaimReasonOtherDescription(e.target.value)
                    }
                    className={inputClass}
                  />
                </LCField>
              )}

              <LCField label="Incident Date" theme={theme}>
                <input
                  type="date"
                  required
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Description of the Issue" theme={theme}>
                <textarea
                  rows={4}
                  required
                  value={claimDescription}
                  onChange={(e) => setClaimDescription(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Deadline &amp; Notice
              </h3>
              <LCField label="Payment Deadline Date" theme={theme}>
                <input
                  type="date"
                  required
                  value={paymentDeadlineDate}
                  onChange={(e) => setPaymentDeadlineDate(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Preferred Payment Method" theme={theme}>
                <select
                  required
                  value={preferredPaymentMethod}
                  onChange={(e) => setPreferredPaymentMethod(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a method</option>
                  <option value="e_transfer">E-Transfer</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                  <option value="other">Other</option>
                </select>
              </LCField>

              {preferredPaymentMethod === "other" && (
                <LCField
                  label="Preferred Payment Method Other Description"
                  theme={theme}
                >
                  <input
                    type="text"
                    required
                    value={preferredPaymentMethodOtherDescription}
                    onChange={(e) =>
                      setPreferredPaymentMethodOtherDescription(e.target.value)
                    }
                    className={inputClass}
                  />
                </LCField>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Optional Notes</h3>
              <LCField label="Additional Notes (Optional)" theme={theme}>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading
                  ? "Processing..."
                  : "Generate Demand Letter — $7 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
