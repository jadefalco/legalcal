"use client";

import { useState, useMemo } from "react";

import { getTheme } from "@/app/theme";
import { classifyRepairUrgency } from "@/lib/bcRepairRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCRequestForRepairsPage() {
  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [landlordAddressLine1, setLandlordAddressLine1] = useState("");
  const [landlordAddressLine2, setLandlordAddressLine2] = useState("");
  const [landlordCity, setLandlordCity] = useState("");
  const [landlordPostalCode, setLandlordPostalCode] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [dateIssueNoticed, setDateIssueNoticed] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [hasPhotos, setHasPhotos] = useState(false);
  const [preferredResolutionDate, setPreferredResolutionDate] = useState("");
  const [tenantBelievesHealthOrSafetyRisk, setTenantBelievesHealthOrSafetyRisk] =
    useState(false);
  const [tenantBelievesBreachOfStandard, setTenantBelievesBreachOfStandard] =
    useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const urgencyInfo = useMemo(() => {
    if (!urgencyLevel) return null;
    const { category, recommendedTimelineDays } = classifyRepairUrgency(
      urgencyLevel,
      tenantBelievesHealthOrSafetyRisk
    );
    return `Based on your answers, this repair is classified as: ${category}. Recommended response time: ${recommendedTimelineDays} days.`;
  }, [urgencyLevel, tenantBelievesHealthOrSafetyRisk]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload: Record<string, unknown> = {
      tenantName,
      tenantEmail,
      tenantPhone,
      rentalAddressLine1,
      rentalAddressLine2: rentalAddressLine2 || undefined,
      rentalCity,
      rentalPostalCode,
      landlordName,
      landlordEmail: landlordEmail || undefined,
      landlordPhone: landlordPhone || undefined,
      landlordAddressLine1,
      landlordAddressLine2: landlordAddressLine2 || undefined,
      landlordCity,
      landlordPostalCode,
      issueDescription,
      dateIssueNoticed,
      urgencyLevel,
      hasPhotos,
      preferredResolutionDate,
      tenantBelievesHealthOrSafetyRisk,
      tenantBelievesBreachOfStandard,
    };

    try {
      const res = await fetch("/api/checkout/bc-request-for-repairs", {
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
          title="BC Request for Repairs"
          description="Generate a compliant repair request letter under the British Columbia Residential Tenancy Act."
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

          {urgencyInfo && (
            <div className="flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm">
              {urgencyInfo}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                <LCField label="Tenant Email" theme={theme}>
                  <input
                    type="email"
                    required
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Tenant Phone" theme={theme}>
                  <input
                    type="tel"
                    required
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Rental Address</h3>
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
              <h3 className="font-semibold text-slate-800">Repair Details</h3>
              <LCField label="Description of Issue" theme={theme}>
                <textarea
                  rows={4}
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Date Issue Was First Noticed" theme={theme}>
                <input
                  type="date"
                  required
                  value={dateIssueNoticed}
                  onChange={(e) => setDateIssueNoticed(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Urgency Level" theme={theme}>
                <select
                  required
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select urgency</option>
                  <option value="urgent">Urgent</option>
                  <option value="non_urgent">Non-urgent</option>
                </select>
              </LCField>
              <LCField label="Preferred Resolution Date" theme={theme}>
                <input
                  type="date"
                  required
                  value={preferredResolutionDate}
                  onChange={(e) => setPreferredResolutionDate(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={hasPhotos}
                  onChange={(e) => setHasPhotos(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                I have photos of the issue available upon request.
              </label>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Legal Basis</h3>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={tenantBelievesHealthOrSafetyRisk}
                  onChange={(e) =>
                    setTenantBelievesHealthOrSafetyRisk(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                I believe this issue poses a health or safety risk.
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={tenantBelievesBreachOfStandard}
                  onChange={(e) =>
                    setTenantBelievesBreachOfStandard(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                I believe this issue breaches the landlord’s obligation to maintain the rental unit.
              </label>
            </div>

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Processing..." : "Generate Letter — $5 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
