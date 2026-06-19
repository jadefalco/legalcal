"use client";

import { useState } from "react";

import { getTheme } from "@/app/theme";
import { validateInspection } from "@/lib/bcInspectionRules";

import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";
import { LCField } from "@/app/components/lc/LCField";

import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

const conditionOptions = [
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
  { value: "not_applicable", label: "N/A" },
];

const roomConfig = [
  { key: "entryway", label: "Entryway" },
  { key: "livingRoom", label: "Living Room" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "bedroom1", label: "Bedroom 1" },
  { key: "bedroom2", label: "Bedroom 2" },
  { key: "bedroom3", label: "Bedroom 3" },
];

interface RoomState {
  condition: string;
  notes: string;
}

export default function BCConditionInspectionReportPage() {
  const [inspectionType, setInspectionType] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
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

  const [rooms, setRooms] = useState<Record<string, RoomState>>({
    entryway: { condition: "", notes: "" },
    livingRoom: { condition: "", notes: "" },
    kitchen: { condition: "", notes: "" },
    bathroom: { condition: "", notes: "" },
    bedroom1: { condition: "", notes: "" },
    bedroom2: { condition: "", notes: "" },
    bedroom3: { condition: "", notes: "" },
  });

  const [otherRoomName, setOtherRoomName] = useState("");
  const [otherRoomCondition, setOtherRoomCondition] = useState("");
  const [otherRoomNotes, setOtherRoomNotes] = useState("");
  const [generalConditionNotes, setGeneralConditionNotes] = useState("");
  const [issuesOrDamage, setIssuesOrDamage] = useState("");
  const [tenantAcknowledges, setTenantAcknowledges] = useState(false);
  const [landlordAcknowledges, setLandlordAcknowledges] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateRoom(key: string, field: keyof RoomState, value: string) {
    setRooms((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { valid } = validateInspection(inspectionType, inspectionDate);
    if (!valid) {
      setError("Please select a valid inspection type and date.");
      setLoading(false);
      return;
    }

    const payload: Record<string, unknown> = {
      inspectionType,
      inspectionDate,
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
      ...rooms,
      otherRoomName: otherRoomName || undefined,
      otherRoomCondition: otherRoomName ? otherRoomCondition || undefined : undefined,
      otherRoomNotes: otherRoomName ? otherRoomNotes || undefined : undefined,
      generalConditionNotes: generalConditionNotes || undefined,
      issuesOrDamage: issuesOrDamage || undefined,
      tenantAcknowledges,
      landlordAcknowledges,
    };

    try {
      const res = await fetch("/api/checkout/bc-condition-inspection-report", {
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
          title="BC Condition Inspection Report"
          description="Generate a compliant condition inspection report under the British Columbia Residential Tenancy Act."
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
                Inspection Metadata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LCField label="Inspection Type" theme={theme}>
                  <select
                    required
                    value={inspectionType}
                    onChange={(e) => setInspectionType(e.target.value)}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select type</option>
                    <option value="move_in">Move-In</option>
                    <option value="move_out">Move-Out</option>
                  </select>
                </LCField>
                <LCField label="Inspection Date" theme={theme}>
                  <input
                    type="date"
                    required
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
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
              <h3 className="font-semibold text-slate-800">Rental Unit</h3>
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
                Room-by-Room Condition
              </h3>
              {roomConfig.map((room) => (
                <div key={room.key} className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-slate-700">
                    {room.label}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LCField label="Condition" theme={theme}>
                      <select
                        required
                        value={rooms[room.key].condition}
                        onChange={(e) =>
                          updateRoom(room.key, "condition", e.target.value)
                        }
                        className={`${inputClass} bg-white`}
                      >
                        <option value="">Select</option>
                        {conditionOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </LCField>
                    <LCField label="Notes (Optional)" theme={theme}>
                      <input
                        type="text"
                        value={rooms[room.key].notes}
                        onChange={(e) =>
                          updateRoom(room.key, "notes", e.target.value)
                        }
                        className={inputClass}
                      />
                    </LCField>
                  </div>
                </div>
              ))}

              <div className="space-y-2 pt-4 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-700">
                  Other Room (Optional)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <LCField label="Room Name" theme={theme}>
                    <input
                      type="text"
                      value={otherRoomName}
                      onChange={(e) => setOtherRoomName(e.target.value)}
                      className={inputClass}
                    />
                  </LCField>
                  <LCField label="Condition" theme={theme}>
                    <select
                      value={otherRoomCondition}
                      onChange={(e) =>
                        setOtherRoomCondition(e.target.value)
                      }
                      className={`${inputClass} bg-white`}
                    >
                      <option value="">Select</option>
                      {conditionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </LCField>
                  <LCField label="Notes" theme={theme}>
                    <input
                      type="text"
                      value={otherRoomNotes}
                      onChange={(e) => setOtherRoomNotes(e.target.value)}
                      className={inputClass}
                    />
                  </LCField>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">General Notes</h3>
              <LCField label="General Condition Notes (Optional)" theme={theme}>
                <textarea
                  rows={3}
                  value={generalConditionNotes}
                  onChange={(e) => setGeneralConditionNotes(e.target.value)}
                  className={inputClass}
                />
              </LCField>
              <LCField label="Issues or Damage (Optional)" theme={theme}>
                <textarea
                  rows={3}
                  value={issuesOrDamage}
                  onChange={(e) => setIssuesOrDamage(e.target.value)}
                  className={inputClass}
                />
              </LCField>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800">
                Acknowledgements
              </h3>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={tenantAcknowledges}
                  onChange={(e) => setTenantAcknowledges(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                The tenant acknowledges the accuracy of this inspection.
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={landlordAcknowledges}
                  onChange={(e) => setLandlordAcknowledges(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                The landlord acknowledges the accuracy of this inspection.
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
                {loading ? "Processing..." : "Generate Report — $5 CAD"}
              </LCButton>
            </div>
          </form>
        </LCCard>
      </div>
    </main>
  );
}
