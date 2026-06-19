"use client";

import { useState, useMemo } from "react";

import { getTheme } from "@/app/theme";
import { classifyBreach } from "@/lib/bcBreachRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCBreachNoticePage() {
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
  const [breachType, setBreachType] = useState("");
  const [breachDescription, setBreachDescription] = useState("");
  const [dateBreachOccurred, setDateBreachOccurred] = useState("");
  const [hasEvidence, setHasEvidence] = useState(false);
  const [requiredActionDescription, setRequiredActionDescription] = useState("");
  const [deadlineToFix, setDeadlineToFix] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const breachInfo = useMemo(() => {
    if (!breachType) return null;
    const { severity, recommendedFixDays } = classifyBreach(breachType);
    return `This breach is classified as ${severity}. Recommended correction timeline: ${recommendedFixDays} days.`;
  }, [breachType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

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
      breachType,
      breachDescription,
      dateBreachOccurred,
      hasEvidence,
      requiredActionDescription,
      deadlineToFix,
    };

    try {
      const res = await fetch("/api/checkout/bc-breach-notice", {
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
          title="BC Breach Notice"
          description="Generate a compliant breach notice under the British Columbia Residential Tenancy Act."
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

          {breachInfo && (
            <div className="flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm">
              {breachInfo}
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
                Tenant & Rental Information
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
              <h3 className="font-semibold text-slate-800">Breach Details</h3>
              <LCField label="Breach Type" theme={theme}>
                <select
                  required
                  value={breachType}
                  onChange={(e) => setBreachType(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a breach type</option>
                  <option value="non_payment">Non-payment of rent</option>
                  <option value="unauthorized_occupants">Unauthorized occupants</option>
                  <option value="unauthorized_pets">Unauthorized pets</option>
                  <option value="noise_disturbance">Noise disturbance</option>
                  <option value="property_damage">Property damage</option>
                  <option value="illegal_activity">Illegal activity</option>
                  <option value="other">Other</option>
                </select>
              </LCField>
              <LCField label="Description of Breach" theme={theme}>
                <textarea
                  rows={4}
                  required
                  value={breachDescription}
                  onChange={(e) => setBreachDescription(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Date Breach Occurred" theme={theme}>
                <input
                  type="date"
                  required
                  value={dateBreachOccurred}
                  onChange={(e) => setDateBreachOccurred(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={hasEvidence}
                  onChange={(e) => setHasEvidence(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                I have evidence available upon request.
              </label>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Required Action</h3>
              <LCField label="Required Action Description" theme={theme}>
                <textarea
                  rows={4}
                  required
                  value={requiredActionDescription}
                  onChange={(e) => setRequiredActionDescription(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Deadline to Fix" theme={theme}>
                <input
                  type="date"
                  required
                  value={deadlineToFix}
                  onChange={(e) => setDeadlineToFix(e.target.value)}
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
                {loading ? "Processing..." : "Generate Notice — $5 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
