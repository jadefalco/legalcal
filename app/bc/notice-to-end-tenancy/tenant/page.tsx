"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateTenantNoticePeriod } from "@/lib/bcTenantNoticePeriods";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCTenantNoticeToEndTenancyPage() {
  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddressLine1, setLandlordAddressLine1] = useState("");
  const [landlordAddressLine2, setLandlordAddressLine2] = useState("");
  const [landlordCity, setLandlordCity] = useState("");
  const [landlordPostalCode, setLandlordPostalCode] = useState("");
  const [tenancyStartDate, setTenancyStartDate] = useState("");
  const [monthlyRentAmount, setMonthlyRentAmount] = useState("");
  const [rentDueDayOfMonth, setRentDueDayOfMonth] = useState("");
  const [noticeReason, setNoticeReason] = useState("");
  const [noticeServeDate, setNoticeServeDate] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");
  const [serviceMethod, setServiceMethod] = useState("");
  const [landlordBreachDescription, setLandlordBreachDescription] = useState("");
  const [unsafeConditionDescription, setUnsafeConditionDescription] =
    useState("");
  const [familyViolenceDeclaration, setFamilyViolenceDeclaration] =
    useState(false);
  const [mutualAgreementDetails, setMutualAgreementDetails] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!noticeServeDate || !moveOutDate) {
      setError("Please enter both the notice serve date and move-out date.");
      setLoading(false);
      return;
    }

    const { valid } = validateTenantNoticePeriod(
      noticeReason,
      noticeServeDate,
      moveOutDate
    );

    if (!valid) {
      setError(
        "This move-out date does not meet the minimum notice period required for this reason."
      );
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      tenantName,
      tenantEmail,
      tenantPhone,
      rentalAddressLine1,
      rentalAddressLine2: rentalAddressLine2 || undefined,
      rentalCity,
      rentalPostalCode,
      landlordName,
      landlordAddressLine1,
      landlordAddressLine2: landlordAddressLine2 || undefined,
      landlordCity,
      landlordPostalCode,
      tenancyStartDate,
      monthlyRentAmount: monthlyRentAmount ? Number(monthlyRentAmount) : 0,
      rentDueDayOfMonth: rentDueDayOfMonth ? Number(rentDueDayOfMonth) : 0,
      noticeReason,
      noticeServeDate,
      moveOutDate,
      serviceMethod,
    };

    if (noticeReason === "landlord_breach" && landlordBreachDescription) {
      payload.landlordBreachDescription = landlordBreachDescription;
    }
    if (noticeReason === "unsafe_conditions" && unsafeConditionDescription) {
      payload.unsafeConditionDescription = unsafeConditionDescription;
    }
    if (noticeReason === "family_violence" && familyViolenceDeclaration) {
      payload.familyViolenceDeclaration = true;
    }
    if (noticeReason === "mutual_agreement" && mutualAgreementDetails) {
      payload.mutualAgreementDetails = mutualAgreementDetails;
    }

    try {
      const res = await fetch("/api/checkout/bc-notice-tenant", {
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
          title="BC Tenant Notice to End Tenancy"
          description="Generate a compliant tenant notice to end tenancy under the British Columbia Residential Tenancy Act."
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
                  <option value="tenant_moving_out">Tenant moving out</option>
                  <option value="landlord_breach">Landlord breach</option>
                  <option value="unsafe_conditions">Unsafe conditions</option>
                  <option value="family_violence">Family violence</option>
                  <option value="mutual_agreement">Mutual agreement</option>
                </select>
              </LCField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Date Notice is Given" theme={theme}>
                  <input
                    type="date"
                    required
                    value={noticeServeDate}
                    onChange={(e) => setNoticeServeDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Move-Out Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={moveOutDate}
                    onChange={(e) => setMoveOutDate(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>

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

            {noticeReason === "landlord_breach" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Landlord Breach Details
                </h3>
                <LCField label="Description of Breach" theme={theme}>
                  <textarea
                    rows={4}
                    value={landlordBreachDescription}
                    onChange={(e) => setLandlordBreachDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            {noticeReason === "unsafe_conditions" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Unsafe Condition Details
                </h3>
                <LCField label="Description of Unsafe Conditions" theme={theme}>
                  <textarea
                    rows={4}
                    value={unsafeConditionDescription}
                    onChange={(e) => setUnsafeConditionDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            )}

            {noticeReason === "family_violence" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Family Violence Declaration
                </h3>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={familyViolenceDeclaration}
                    onChange={(e) => setFamilyViolenceDeclaration(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  I am ending this tenancy due to family violence.
                </label>
              </div>
            )}

            {noticeReason === "mutual_agreement" && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Mutual Agreement Details
                </h3>
                <LCField label="Details of Mutual Agreement" theme={theme}>
                  <textarea
                    rows={4}
                    value={mutualAgreementDetails}
                    onChange={(e) => setMutualAgreementDetails(e.target.value)}
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
