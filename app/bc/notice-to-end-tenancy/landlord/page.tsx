"use client";

import { useState } from "react";


import { getTheme } from "@/app/theme";
import { getNoticePeriodDays } from "@/lib/bcNoticePeriods";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

function addDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function BCNoticeToEndTenancyLandlordPage() {

  const [landlordName, setLandlordName] = useState("");
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
  const [monthlyRentAmount, setMonthlyRentAmount] = useState("");
  const [rentDueDayOfMonth, setRentDueDayOfMonth] = useState("");
  const [noticeReason, setNoticeReason] = useState("");
  const [noticeServeDate, setNoticeServeDate] = useState("");
  const [serviceMethod, setServiceMethod] = useState("");
  const [rentArrearsAmount, setRentArrearsAmount] = useState("");
  const [breachDescription, setBreachDescription] = useState("");
  const [landlordUseDescription, setLandlordUseDescription] = useState("");
  const [renovationDescription, setRenovationDescription] = useState("");
  const [illegalActivityDescription, setIllegalActivityDescription] =
    useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!noticeServeDate) {
      setError("Please enter the date notice is given.");
      setLoading(false);
      return;
    }

    const noticePeriodDays = getNoticePeriodDays(noticeReason);
    const effectiveEndDate = addDays(noticeServeDate, noticePeriodDays);

    const payload: Record<string, unknown> = {
      landlordName,
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
      monthlyRentAmount: monthlyRentAmount ? Number(monthlyRentAmount) : 0,
      rentDueDayOfMonth: rentDueDayOfMonth ? Number(rentDueDayOfMonth) : 0,
      noticeReason,
      noticeServeDate,
      serviceMethod,
      effectiveEndDate,
    };

    if (noticeReason === "non_payment" && rentArrearsAmount) {
      payload.rentArrearsAmount = Number(rentArrearsAmount);
    }
    if (noticeReason === "breach_of_agreement" && breachDescription) {
      payload.breachDescription = breachDescription;
    }
    if (noticeReason === "landlord_use" && landlordUseDescription) {
      payload.landlordUseDescription = landlordUseDescription;
    }
    if (noticeReason === "renovation_or_demolition" && renovationDescription) {
      payload.renovationDescription = renovationDescription;
    }
    if (noticeReason === "illegal_activity" && illegalActivityDescription) {
      payload.illegalActivityDescription = illegalActivityDescription;
    }

    try {
      const res = await fetch("/api/checkout/bc-notice-landlord", {
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
          title="BC Notice to End Tenancy (Landlord)"
          description="Generate a compliant notice to end tenancy under the British Columbia Residential Tenancy Act."
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
                <LCField label="Rent Due Day of Month" theme={theme}>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    required
                    value={rentDueDayOfMonth}
                    onChange={(e) => setRentDueDayOfMonth(e.target.value)}
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
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Notice Details</h3>
              <LCField label="Reason for Ending Tenancy" theme={theme}>
                <select
                  required
                  value={noticeReason}
                  onChange={(e) => setNoticeReason(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select a reason</option>
                  <option value="non_payment">Non-payment of rent</option>
                  <option value="breach_of_agreement">
                    Breach of tenancy agreement
                  </option>
                  <option value="landlord_use">Landlord use of property</option>
                  <option value="renovation_or_demolition">
                    Renovation or demolition
                  </option>
                  <option value="end_of_fixed_term">
                    End of fixed-term tenancy
                  </option>
                  <option value="illegal_activity">Illegal activity</option>
                </select>
              </LCField>

              <LCField label="Date Notice is Given" theme={theme}>
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
                  <option value="in_person">In person</option>
                  <option value="posted_on_door">Posted on door</option>
                  <option value="registered_mail">Registered mail</option>
                </select>
              </LCField>
            </div>

            {noticeReason === "non_payment" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Non-payment Details
                </h3>
                <LCField label="Rent Arrears Amount (CAD)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={rentArrearsAmount}
                    onChange={(e) => setRentArrearsAmount(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            {noticeReason === "breach_of_agreement" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Breach Details
                </h3>
                <LCField
                  label="Description of Breach"
                  theme={theme}
                >
                  <textarea
                    rows={4}
                    value={breachDescription}
                    onChange={(e) => setBreachDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            {noticeReason === "landlord_use" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Landlord Use Details
                </h3>
                <LCField
                  label="Landlord Use Description"
                  theme={theme}
                >
                  <textarea
                    rows={4}
                    value={landlordUseDescription}
                    onChange={(e) => setLandlordUseDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            {noticeReason === "renovation_or_demolition" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Renovation or Demolition Details
                </h3>
                <LCField
                  label="Renovation or Demolition Description"
                  theme={theme}
                >
                  <textarea
                    rows={4}
                    value={renovationDescription}
                    onChange={(e) => setRenovationDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            {noticeReason === "illegal_activity" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Illegal Activity Details
                </h3>
                <LCField
                  label="Illegal Activity Description"
                  theme={theme}
                >
                  <textarea
                    rows={4}
                    value={illegalActivityDescription}
                    onChange={(e) =>
                      setIllegalActivityDescription(e.target.value)
                    }
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            <div className="pt-4">
              <LCButton
                variant="primary"
                theme={theme}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Processing..." : "Generate Notice — $9 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
