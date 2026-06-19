"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateRepaymentPlan } from "@/lib/bcRepayDamagesRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCRepayDamagesAgreementPage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [damageDescription, setDamageDescription] = useState("");
  const [damageDate, setDamageDate] = useState("");
  const [estimatedRepairCost, setEstimatedRepairCost] = useState("");
  const [initialPaymentAmount, setInitialPaymentAmount] = useState("");
  const [initialPaymentDate, setInitialPaymentDate] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [installmentFrequency, setInstallmentFrequency] = useState("");
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");
  const [missedPaymentConsequence, setMissedPaymentConsequence] = useState("");
  const [lateFeeAmount, setLateFeeAmount] = useState("");
  const [additionalTerms, setAdditionalTerms] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const estimatedRepairCostNum = estimatedRepairCost
      ? Number(estimatedRepairCost)
      : 0;
    const initialPaymentAmountNum = initialPaymentAmount
      ? Number(initialPaymentAmount)
      : 0;
    const numberOfInstallmentsNum = numberOfInstallments
      ? Number(numberOfInstallments)
      : 0;
    const installmentAmountNum = installmentAmount
      ? Number(installmentAmount)
      : 0;

    const { valid } = validateRepaymentPlan(
      estimatedRepairCostNum,
      initialPaymentAmountNum,
      numberOfInstallmentsNum,
      installmentAmountNum
    );
    if (!valid) {
      setError(
        "The repayment amounts do not add up to the total repair cost."
      );
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      landlordName,
      landlordEmail: landlordEmail || undefined,
      landlordPhone: landlordPhone || undefined,
      tenantName,
      tenantEmail: tenantEmail || undefined,
      tenantPhone: tenantPhone || undefined,
      rentalAddressLine1,
      rentalAddressLine2: rentalAddressLine2 || undefined,
      rentalCity,
      rentalPostalCode,
      damageDescription,
      damageDate,
      estimatedRepairCost: estimatedRepairCostNum,
      initialPaymentAmount: initialPaymentAmountNum,
      initialPaymentDate,
      numberOfInstallments: numberOfInstallmentsNum,
      installmentAmount: installmentAmountNum,
      installmentFrequency,
      firstInstallmentDate,
      missedPaymentConsequence,
      lateFeeAmount:
        missedPaymentConsequence === "late_fee"
          ? lateFeeAmount
            ? Number(lateFeeAmount)
            : undefined
          : undefined,
      additionalTerms: additionalTerms || undefined,
    };

    try {
      const res = await fetch("/api/checkout/bc-repay-damages-agreement", {
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
          title="BC Agreement to Repay Damages"
          description="Generate an agreement to repay damages under the British Columbia Residential Tenancy Act."
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
                Landlord Information
              </h3>
              <LCField label="Landlord Name" theme={theme}>
                <input
                  type="text"
                  required
                  value={landlordName}
                  onChange={(e) => setLandlordName(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Landlord Email (Optional)" theme={theme}>
                  <input
                    type="email"
                    value={landlordEmail}
                    onChange={(e) => setLandlordEmail(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Landlord Phone (Optional)" theme={theme}>
                  <input
                    type="tel"
                    value={landlordPhone}
                    onChange={(e) => setLandlordPhone(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Tenant Information
              </h3>
              <LCField label="Tenant Name" theme={theme}>
                <input
                  type="text"
                  required
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Tenant Email (Optional)" theme={theme}>
                  <input
                    type="email"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Tenant Phone (Optional)" theme={theme}>
                  <input
                    type="tel"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Rental Unit Information
              </h3>
              <LCField label="Rental Address Line 1" theme={theme}>
                <input
                  type="text"
                  required
                  value={rentalAddressLine1}
                  onChange={(e) => setRentalAddressLine1(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Rental Address Line 2 (Optional)" theme={theme}>
                <input
                  type="text"
                  value={rentalAddressLine2}
                  onChange={(e) => setRentalAddressLine2(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="City" theme={theme}>
                  <input
                    type="text"
                    required
                    value={rentalCity}
                    onChange={(e) => setRentalCity(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Postal Code" theme={theme}>
                  <input
                    type="text"
                    required
                    value={rentalPostalCode}
                    onChange={(e) => setRentalPostalCode(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Damage Details</h3>
              <LCField label="Description of Damage" theme={theme}>
                <textarea
                  rows={4}
                  required
                  value={damageDescription}
                  onChange={(e) => setDamageDescription(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Date of Damage" theme={theme}>
                  <input
                    type="date"
                    required
                    value={damageDate}
                    onChange={(e) => setDamageDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Estimated Repair Cost (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={estimatedRepairCost}
                    onChange={(e) => setEstimatedRepairCost(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Repayment Plan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Initial Payment Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={initialPaymentAmount}
                    onChange={(e) => setInitialPaymentAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Initial Payment Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={initialPaymentDate}
                    onChange={(e) => setInitialPaymentDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Number of Installments" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    required
                    value={numberOfInstallments}
                    onChange={(e) => setNumberOfInstallments(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Installment Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={installmentAmount}
                    onChange={(e) => setInstallmentAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Installment Frequency" theme={theme}>
                  <select
                    required
                    value={installmentFrequency}
                    onChange={(e) => setInstallmentFrequency(e.target.value)}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select frequency</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </LCField>
                <LCField label="First Installment Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={firstInstallmentDate}
                    onChange={(e) => setFirstInstallmentDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Consequences</h3>
              <LCField label="Missed Payment Consequence" theme={theme}>
                <select
                  required
                  value={missedPaymentConsequence}
                  onChange={(e) =>
                    setMissedPaymentConsequence(e.target.value)
                  }
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a consequence</option>
                  <option value="no_consequence">
                    No additional consequences
                  </option>
                  <option value="late_fee">Late fee</option>
                  <option value="breach_notice">Breach notice</option>
                  <option value="small_claims">Small Claims action</option>
                </select>
              </LCField>

              {missedPaymentConsequence === "late_fee" && (
                <LCField label="Late Fee Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={lateFeeAmount}
                    onChange={(e) => setLateFeeAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Optional Terms</h3>
              <LCField label="Additional Terms (Optional)" theme={theme}>
                <textarea
                  rows={3}
                  value={additionalTerms}
                  onChange={(e) => setAdditionalTerms(e.target.value)}
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
                  : "Generate Agreement — $5 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
