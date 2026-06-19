"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateArrears } from "@/lib/bcRentArrearsRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

interface MonthOwed {
  monthLabel: string;
  amountOwed: string;
}

export default function BCRentArrearsStatementPage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [monthlyRentAmount, setMonthlyRentAmount] = useState("");
  const [monthsOwed, setMonthsOwed] = useState<MonthOwed[]>([
    { monthLabel: "", amountOwed: "" },
  ]);
  const [totalArrears, setTotalArrears] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function addMonth() {
    setMonthsOwed([...monthsOwed, { monthLabel: "", amountOwed: "" }]);
  }

  function removeMonth(index: number) {
    setMonthsOwed(monthsOwed.filter((_, i) => i !== index));
  }

  function updateMonth(
    index: number,
    field: keyof MonthOwed,
    value: string
  ) {
    const next = [...monthsOwed];
    next[index] = { ...next[index], [field]: value };
    setMonthsOwed(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const monthsOwedData = monthsOwed
      .filter((m) => m.monthLabel.trim() !== "")
      .map((m) => ({
        monthLabel: m.monthLabel,
        amountOwed: m.amountOwed ? Number(m.amountOwed) : 0,
      }));

    const totalArrearsNum = totalArrears ? Number(totalArrears) : 0;

    const { valid } = validateArrears(monthsOwedData, totalArrearsNum);
    if (!valid) {
      setError(
        "The total arrears amount does not match the sum of the monthly amounts."
      );
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      landlordName,
      landlordEmail: landlordEmail || undefined,
      landlordPhone: landlordPhone || undefined,
      tenantName,
      rentalAddressLine1,
      rentalAddressLine2: rentalAddressLine2 || undefined,
      rentalCity,
      rentalPostalCode,
      monthlyRentAmount: monthlyRentAmount ? Number(monthlyRentAmount) : 0,
      monthsOwed: monthsOwedData,
      totalArrears: totalArrearsNum,
      additionalNotes: additionalNotes || undefined,
    };

    try {
      const res = await fetch("/api/checkout/bc-rent-arrears-statement", {
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
          title="BC Rent Arrears Statement"
          description="Generate a rent arrears statement under the British Columbia Residential Tenancy Act."
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
                Tenant &amp; Rental Information
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
              <h3 className="font-semibold text-slate-800">Arrears Details</h3>
              <LCField label="Monthly Rent Amount (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={monthlyRentAmount}
                  onChange={(e) => setMonthlyRentAmount(e.target.value)}
                  className={inputClass}
                />
              </LCField>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-800">Months Owed</h4>
                  <button
                    type="button"
                    onClick={addMonth}
                    className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add month
                  </button>
                </div>

                {monthsOwed.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <LCField label="Month Label" theme={theme}>
                        <input
                          type="text"
                          required
                          placeholder="e.g., January 2025"
                          value={month.monthLabel}
                          onChange={(e) =>
                            updateMonth(index, "monthLabel", e.target.value)
                          }
                          className={inputClass}
                        />
                      </LCField>
                      <LCField label="Amount Owed (CAD)" theme={theme}>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          required
                          value={month.amountOwed}
                          onChange={(e) =>
                            updateMonth(index, "amountOwed", e.target.value)
                          }
                          className={inputClass}
                        />
                      </LCField>
                    </div>
                    {monthsOwed.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMonth(index)}
                        className="mt-7 text-slate-400 hover:text-red-600"
                        title="Remove month"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <LCField label="Total Arrears (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={totalArrears}
                  onChange={(e) => setTotalArrears(e.target.value)}
                  className={inputClass}
                />
              </LCField>
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
                  : "Generate Statement — $3 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
