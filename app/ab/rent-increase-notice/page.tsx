"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

export default function ABRentIncreaseNoticePage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddress, setLandlordAddress] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentalAddress, setRentalAddress] = useState("");
  const [currentRent, setCurrentRent] = useState("");
  const [newRent, setNewRent] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      !landlordName ||
      !landlordAddress ||
      !tenantName ||
      !rentalAddress ||
      !currentRent ||
      !newRent ||
      !effectiveDate
    ) {
      setError("All required fields must be filled.");
      setLoading(false);
      return;
    }

    const current = Number(currentRent);
    const next = Number(newRent);

    if (next <= current) {
      setError("New rent must be greater than current rent.");
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      landlordName,
      landlordAddress,
      tenantName,
      rentalAddress,
      currentRent: current,
      newRent: next,
      effectiveDate,
      additionalNotes: additionalNotes || undefined,
    };

    try {
      const res = await fetch("/api/checkout/ab-rent-increase-notice", {
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
          title="Alberta Rent Increase Notice"
          description="Generate a rent increase notice under the Alberta Residential Tenancies Act."
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
              <LCField label="Landlord Address" theme={theme}>
                <input
                  type="text"
                  required
                  value={landlordAddress}
                  onChange={(e) => setLandlordAddress(e.target.value)}
                  className={inputClass}
                />
              </LCField>
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
              <LCField label="Rental Address" theme={theme}>
                <input
                  type="text"
                  required
                  value={rentalAddress}
                  onChange={(e) => setRentalAddress(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Rent Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Current Rent (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={currentRent}
                    onChange={(e) => setCurrentRent(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="New Rent (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={newRent}
                    onChange={(e) => setNewRent(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
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
                {loading ? "Processing..." : "Generate Notice — $3 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
