"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateTenancyDates } from "@/lib/bcProofOfTenancyRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCProofOfTenancyLetterPage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [landlordAddressLine1, setLandlordAddressLine1] = useState("");
  const [landlordAddressLine2, setLandlordAddressLine2] = useState("");
  const [landlordCity, setLandlordCity] = useState("");
  const [landlordPostalCode, setLandlordPostalCode] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [tenancyStartDate, setTenancyStartDate] = useState("");
  const [tenancyEndDate, setTenancyEndDate] = useState("");
  const [monthlyRentAmount, setMonthlyRentAmount] = useState("");
  const [rentPaidUpToDate, setRentPaidUpToDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [purposeOtherDescription, setPurposeOtherDescription] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (tenancyStartDate && rentPaidUpToDate) {
      const { valid } = validateTenancyDates(tenancyStartDate, rentPaidUpToDate);
      if (!valid) {
        setError(
          "The rent-paid-to date must be on or after the tenancy start date."
        );
        setLoading(false);
        return;
      }
    }

    const payload: Record<string, unknown> = {
      landlordName,
      landlordEmail: landlordEmail || undefined,
      landlordPhone: landlordPhone || undefined,
      landlordAddressLine1,
      landlordAddressLine2: landlordAddressLine2 || undefined,
      landlordCity,
      landlordPostalCode,
      tenantName,
      rentalAddressLine1,
      rentalAddressLine2: rentalAddressLine2 || undefined,
      rentalCity,
      rentalPostalCode,
      tenancyStartDate,
      tenancyEndDate: tenancyEndDate || undefined,
      monthlyRentAmount: monthlyRentAmount ? Number(monthlyRentAmount) : 0,
      rentPaidUpToDate,
      purpose,
      purposeOtherDescription:
        purpose === "other"
          ? purposeOtherDescription || undefined
          : undefined,
    };

    try {
      const res = await fetch("/api/checkout/bc-proof-of-tenancy-letter", {
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
          title="BC Proof of Tenancy Letter"
          description="Generate a proof of tenancy letter under the British Columbia Residential Tenancy Act."
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
              <LCField label="Landlord Address Line 1" theme={theme}>
                <input
                  type="text"
                  required
                  value={landlordAddressLine1}
                  onChange={(e) => setLandlordAddressLine1(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Landlord Address Line 2 (Optional)" theme={theme}>
                <input
                  type="text"
                  value={landlordAddressLine2}
                  onChange={(e) => setLandlordAddressLine2(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="City" theme={theme}>
                  <input
                    type="text"
                    required
                    value={landlordCity}
                    onChange={(e) => setLandlordCity(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Postal Code" theme={theme}>
                  <input
                    type="text"
                    required
                    value={landlordPostalCode}
                    onChange={(e) => setLandlordPostalCode(e.target.value)}
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
              <h3 className="font-semibold text-slate-800">Tenancy Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Tenancy Start Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={tenancyStartDate}
                    onChange={(e) => setTenancyStartDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Tenancy End Date (Optional)" theme={theme}>
                  <input
                    type="date"
                    value={tenancyEndDate}
                    onChange={(e) => setTenancyEndDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
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
              <LCField label="Rent Paid Up To Date" theme={theme}>
                <input
                  type="date"
                  required
                  value={rentPaidUpToDate}
                  onChange={(e) => setRentPaidUpToDate(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Purpose of Letter
              </h3>
              <LCField label="Purpose" theme={theme}>
                <select
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a purpose</option>
                  <option value="immigration">Immigration</option>
                  <option value="employment">Employment</option>
                  <option value="school">School</option>
                  <option value="government_benefits">
                    Government Benefits
                  </option>
                  <option value="insurance">Insurance</option>
                  <option value="banking">Banking</option>
                  <option value="general_verification">
                    General Verification
                  </option>
                  <option value="other">Other</option>
                </select>
              </LCField>

              {purpose === "other" && (
                <LCField label="Purpose Other Description" theme={theme}>
                  <input
                    type="text"
                    required
                    value={purposeOtherDescription}
                    onChange={(e) => setPurposeOtherDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              )}
            </div>

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Processing..." : "Generate Letter — $3 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
