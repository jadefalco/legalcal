"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validatePetDeposit } from "@/lib/bcPetAgreementRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

export default function BCPetAgreementAddendumPage() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [rentalAddressLine1, setRentalAddressLine1] = useState("");
  const [rentalAddressLine2, setRentalAddressLine2] = useState("");
  const [rentalCity, setRentalCity] = useState("");
  const [rentalPostalCode, setRentalPostalCode] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petWeightKg, setPetWeightKg] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [petDamageResponsibility, setPetDamageResponsibility] = useState(false);
  const [petNoiseResponsibility, setPetNoiseResponsibility] = useState(false);
  const [petWasteResponsibility, setPetWasteResponsibility] = useState(false);
  const [petSupervisionRequirement, setPetSupervisionRequirement] =
    useState(false);
  const [additionalPetRules, setAdditionalPetRules] = useState("");
  const [petDepositAmount, setPetDepositAmount] = useState("");
  const [petDepositPaid, setPetDepositPaid] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const petDepositAmountNum = petDepositAmount ? Number(petDepositAmount) : 0;
    const { valid } = validatePetDeposit(petDepositAmountNum);
    if (!valid) {
      setError("The pet deposit amount must be between $0 and $250.");
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      landlordName,
      landlordEmail: landlordEmail || undefined,
      landlordPhone: landlordPhone || undefined,
      tenantName,
      tenantEmail: tenantEmail || undefined,
      tenantPhone: tenantPhone || undefined,
      rentalAddressLine1,
      rentalAddressLine2: rentalAddressLine2 || undefined,
      rentalCity,
      rentalPostalCode,
      petType,
      petBreed: petBreed || undefined,
      petName,
      petAge,
      petWeightKg: petWeightKg ? Number(petWeightKg) : 0,
      petDescription: petDescription || undefined,
      petDamageResponsibility,
      petNoiseResponsibility,
      petWasteResponsibility,
      petSupervisionRequirement,
      additionalPetRules: additionalPetRules || undefined,
      petDepositAmount: petDepositAmountNum,
      petDepositPaid,
    };

    try {
      const res = await fetch("/api/checkout/bc-pet-agreement-addendum", {
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

  const checkboxClass =
    "h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500";

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="BC Pet Agreement Addendum"
          description="Generate a pet agreement addendum under the British Columbia Residential Tenancy Act."
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
                <LCField label="Tenant Email (Optional)" theme={theme}>
                  <input
                    type="email"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Tenant Phone (Optional)" theme={theme}>
                  <input
                    type="tel"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
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
              <h3 className="font-semibold text-slate-800">Pet Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Pet Type" theme={theme}>
                  <input
                    type="text"
                    required
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className={inputClass}
                    placeholder="e.g., dog, cat, rabbit"
                  />
                </LCField>
                <LCField label="Pet Breed (Optional)" theme={theme}>
                  <input
                    type="text"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Pet Name" theme={theme}>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Pet Age" theme={theme}>
                  <input
                    type="text"
                    required
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Pet Weight (kg)" theme={theme}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    value={petWeightKg}
                    onChange={(e) => setPetWeightKg(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
                <LCField label="Pet Description (Optional)" theme={theme}>
                  <input
                    type="text"
                    value={petDescription}
                    onChange={(e) => setPetDescription(e.target.value)}
                    className={inputClass}
                  />
                </LCField>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Pet Rules</h3>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={petDamageResponsibility}
                  onChange={(e) => setPetDamageResponsibility(e.target.checked)}
                  className={checkboxClass}
                />
                The tenant is responsible for any damage caused by the pet.
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={petNoiseResponsibility}
                  onChange={(e) => setPetNoiseResponsibility(e.target.checked)}
                  className={checkboxClass}
                />
                The tenant must ensure the pet does not create excessive noise.
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={petWasteResponsibility}
                  onChange={(e) => setPetWasteResponsibility(e.target.checked)}
                  className={checkboxClass}
                />
                The tenant must properly dispose of all pet waste.
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={petSupervisionRequirement}
                  onChange={(e) =>
                    setPetSupervisionRequirement(e.target.checked)
                  }
                  className={checkboxClass}
                />
                The tenant must supervise the pet to prevent disturbances or
                damage.
              </label>
              <LCField label="Additional Pet Rules (Optional)" theme={theme}>
                <textarea
                  rows={3}
                  value={additionalPetRules}
                  onChange={(e) => setAdditionalPetRules(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">Deposit</h3>
              <LCField label="Pet Deposit Amount (CAD)" theme={theme}>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  value={petDepositAmount}
                  onChange={(e) => setPetDepositAmount(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={petDepositPaid}
                  onChange={(e) => setPetDepositPaid(e.target.checked)}
                  className={checkboxClass}
                />
                The pet deposit has been paid.
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
                {loading ? "Processing..." : "Generate Addendum — $4 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
