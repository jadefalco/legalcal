"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateLateRent } from "@/lib/bcLateRentRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCLateRentNoticePage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [monthlyRentAmount, setMonthlyRentAmount] = useState("");
  const [rentDueDate, setRentDueDate] = useState("");
  const [rentOutstandingAmount, setRentOutstandingAmount] = useState("");
  const [daysLate, setDaysLate] = useState("");
  const [noticeServeDate, setNoticeServeDate] = useState("");
  const [serviceMethod, setServiceMethod] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (rentDueDate && noticeServeDate) {
      const { valid } = validateLateRent(rentDueDate, noticeServeDate);
      if (!valid) {
        setError("The notice serve date must be after the rent due date.");
        setLoading(false);
        return;
      }
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
      rentDueDate,
      rentOutstandingAmount: rentOutstandingAmount
        ? Number(rentOutstandingAmount)
        : 0,
      daysLate: daysLate ? Number(daysLate) : 0,
      noticeServeDate,
      serviceMethod,
      additionalNotes: additionalNotes || undefined,
    };

    try {
      const res = await fetch("/api/checkout/bc-late-rent-notice", {
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
          title="BC Late Rent Notice"
          description="Generate a late rent notice under the British Columbia Residential Tenancy Act."
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
                <LCField label="Rent Due Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={rentDueDate}
                    onChange={(e) => setRentDueDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Rent Outstanding Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={rentOutstandingAmount}
                    onChange={(e) => setRentOutstandingAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Days Late" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    required
                    value={daysLate}
                    onChange={(e) => setDaysLate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
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
