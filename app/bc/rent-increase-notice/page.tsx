"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateRentIncrease } from "@/lib/bcRentIncreaseNoticeRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCRentIncreaseNoticePage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [currentRentAmount, setCurrentRentAmount] = useState("");
  const [proposedRentAmount, setProposedRentAmount] = useState("");
  const [rentIncreasePercent, setRentIncreasePercent] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [noticeServeDate, setNoticeServeDate] = useState("");
  const [serviceMethod, setServiceMethod] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const current = Number(currentRentAmount);
    const proposed = Number(proposedRentAmount);
    const percent = Number(rentIncreasePercent);

    const { valid } = validateRentIncrease(
      current,
      proposed,
      percent,
      noticeServeDate,
      effectiveDate
    );

    if (!valid) {
      setError(
        "BC law requires at least three full months' notice before a rent increase takes effect."
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
      currentRentAmount: current,
      proposedRentAmount: proposed,
      rentIncreasePercent: percent,
      effectiveDate,
      noticeServeDate,
      serviceMethod,
    };

    try {
      const res = await fetch("/api/checkout/bc-rent-increase-notice", {
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
          title="BC Rent Increase Notice"
          description="Generate an RTB-7 compliant rent increase notice under the British Columbia Residential Tenancy Act."
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
              <h3 className="font-semibold text-slate-800">Rent Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Current Rent Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={currentRentAmount}
                    onChange={(e) => setCurrentRentAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Proposed Rent Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={proposedRentAmount}
                    onChange={(e) => setProposedRentAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <LCField label="Rent Increase Percent (%)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  required
                  value={rentIncreasePercent}
                  onChange={(e) => setRentIncreasePercent(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Effective Date" theme={theme}>
                <input
                  type="date"
                  required
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Notice Details</h3>
              <LCField label="Notice Serve Date" theme={theme}>
                <input
                  type="date"
                  required
                  value={noticeServeDate}
                  onChange={(e) => setNoticeServeDate(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Service Method" theme={theme}>
                <select
                  required
                  value={serviceMethod}
                  onChange={(e) => setServiceMethod(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a method</option>
                  <option value="in_person">In Person</option>
                  <option value="posted_on_door">Posted on Door</option>
                  <option value="registered_mail">Registered Mail</option>
                  <option value="email">Email</option>
                </select>
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
                {loading ? "Processing..." : "Generate Notice — $5 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
