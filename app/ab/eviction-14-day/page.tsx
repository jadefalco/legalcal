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

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
}

export default function ABEviction14DayPage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddress, setLandlordAddress] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentalAddress, setRentalAddress] = useState("");
  const [rentAmountOwing, setRentAmountOwing] = useState("");
  const [rentPeriod, setRentPeriod] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [evictionDate, setEvictionDate] = useState("");
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
      !rentAmountOwing ||
      !rentPeriod ||
      !noticeDate ||
      !evictionDate
    ) {
      setError("All required fields must be filled.");
      setLoading(false);
      return;
    }

    if (daysBetween(noticeDate, evictionDate) < 14) {
      setError(
        "Eviction date must be at least 14 days after the notice date."
      );
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      landlordName,
      landlordAddress,
      tenantName,
      rentalAddress,
      rentAmountOwing: rentAmountOwing ? Number(rentAmountOwing) : 0,
      rentPeriod,
      noticeDate,
      evictionDate,
      additionalNotes: additionalNotes || undefined,
    };

    try {
      const res = await fetch("/api/checkout/ab-eviction-14-day", {
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
          title="Alberta 14-Day Eviction Notice"
          description="Generate a 14-day eviction notice for non-payment of rent under the Alberta Residential Tenancies Act."
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
              <LCField label="Rent Amount Owing (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={rentAmountOwing}
                  onChange={(e) => setRentAmountOwing(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Rent Period" theme={theme}>
                <input
                  type="text"
                  required
                  placeholder="e.g., March 2026 rent"
                  value={rentPeriod}
                  onChange={(e) => setRentPeriod(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Notice Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Notice Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Eviction Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={evictionDate}
                    onChange={(e) => setEvictionDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
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
                {loading ? "Processing..." : "Generate Notice — $5 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
