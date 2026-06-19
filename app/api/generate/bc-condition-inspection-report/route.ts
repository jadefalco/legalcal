import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validateInspection } from "@/lib/bcInspectionRules";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

const inspectionTypeLabels: Record<string, string> = {
  move_in: "Move-In",
  move_out: "Move-Out",
};

const conditionLabels: Record<string, string> = {
  good: "Good",
  fair: "Fair",
  poor: "Poor",
  not_applicable: "N/A",
};

const roomNames: Record<string, string> = {
  entryway: "Entryway",
  livingRoom: "Living Room",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  bedroom1: "Bedroom 1",
  bedroom2: "Bedroom 2",
  bedroom3: "Bedroom 3",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface RoomData {
  condition: string;
  notes?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const data = getSession(token);
    if (!data) {
      return NextResponse.json(
        { success: false, error: "Session not found or expired" },
        { status: 404 }
      );
    }

    const form = data as Record<string, unknown>;

    const inspectionType = String(form.inspectionType || "");
    const inspectionDate = String(form.inspectionDate || "");

    const { valid } = validateInspection(inspectionType, inspectionDate);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Inspection validation failed" },
        { status: 400 }
      );
    }

    const landlordName = String(form.landlordName || "");
    const tenantName = String(form.tenantName || "");
    const rentalAddressLine1 = String(form.rentalAddressLine1 || "");
    const rentalAddressLine2 = form.rentalAddressLine2
      ? String(form.rentalAddressLine2)
      : "";
    const rentalCity = String(form.rentalCity || "");
    const rentalPostalCode = String(form.rentalPostalCode || "");
    const generalConditionNotes = form.generalConditionNotes
      ? String(form.generalConditionNotes)
      : "";
    const issuesOrDamage = form.issuesOrDamage
      ? String(form.issuesOrDamage)
      : "";
    const tenantAcknowledges = Boolean(form.tenantAcknowledges);
    const landlordAcknowledges = Boolean(form.landlordAcknowledges);

    const typeLabel = inspectionTypeLabels[inspectionType] || inspectionType;

    let roomsHtml = "";
    for (const [key, label] of Object.entries(roomNames)) {
      const roomData = (form[key] as RoomData | undefined) || {
        condition: "",
        notes: "",
      };
      const condition = String(roomData.condition || "");
      const notes = roomData.notes ? String(roomData.notes) : "";
      const conditionLabel = conditionLabels[condition] || condition;

      roomsHtml += `
<div style="margin-bottom: 12pt;">
  <p><strong>${escapeHtml(label)}</strong></p>
  <p>Condition: ${escapeHtml(conditionLabel)}</p>
  ${notes ? `<p>Notes: ${escapeHtml(notes)}</p>` : ""}
</div>
`;
    }

    const otherRoomName = form.otherRoomName
      ? String(form.otherRoomName)
      : "";
    const otherRoomCondition = form.otherRoomCondition
      ? String(form.otherRoomCondition)
      : "";
    const otherRoomNotes = form.otherRoomNotes
      ? String(form.otherRoomNotes)
      : "";

    if (otherRoomName && otherRoomCondition) {
      const otherConditionLabel =
        conditionLabels[otherRoomCondition] || otherRoomCondition;
      roomsHtml += `
<div style="margin-bottom: 12pt;">
  <p><strong>${escapeHtml(otherRoomName)}</strong></p>
  <p>Condition: ${escapeHtml(otherConditionLabel)}</p>
  ${otherRoomNotes ? `<p>Notes: ${escapeHtml(otherRoomNotes)}</p>` : ""}
</div>
`;
    }

    let generalNotesHtml = "";
    if (generalConditionNotes) {
      generalNotesHtml += `<p><strong>General condition notes:</strong> ${escapeHtml(generalConditionNotes)}</p>`;
    }
    if (issuesOrDamage) {
      generalNotesHtml += `<p><strong>Issues or damage:</strong> ${escapeHtml(issuesOrDamage)}</p>`;
    }

    let acknowledgementsHtml = "";
    if (tenantAcknowledges) {
      acknowledgementsHtml += `<p>The tenant acknowledges the accuracy of this inspection.</p>`;
    }
    if (landlordAcknowledges) {
      acknowledgementsHtml += `<p>The landlord acknowledges the accuracy of this inspection.</p>`;
    }

    const html = `
<h1>Condition Inspection Report – British Columbia</h1>

<p><strong>Inspection Type:</strong> ${escapeHtml(typeLabel)}</p>
<p><strong>Inspection Date:</strong> ${formatDate(inspectionDate)}</p>

<div style="margin-bottom: 16pt;">
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}</p>
  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}</p>
  <p><strong>Rental Address:</strong><br>
  ${escapeHtml(rentalAddressLine1)}<br>
  ${rentalAddressLine2 ? escapeHtml(rentalAddressLine2) + "<br>" : ""}
  ${escapeHtml(rentalCity)}, ${escapeHtml(rentalPostalCode)}</p>
</div>

<h2>Room-by-Room Condition</h2>
${roomsHtml}

<h2>General Notes</h2>
${generalNotesHtml || "<p>None</p>"}

<h2>Acknowledgements</h2>
${acknowledgementsHtml || "<p>None</p>"}

<h2>Signatures</h2>

<div style="margin-bottom: 24pt;">
  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}</p>
  <p style="margin-top: 16pt;">______________________________<br>Signature</p>
  <p style="margin-top: 8pt;">Date: ______________</p>
</div>

<div>
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}</p>
  <p style="margin-top: 16pt;">______________________________<br>Signature</p>
  <p style="margin-top: 8pt;">Date: ______________</p>
</div>

<div style="margin-top: 40pt; padding-top: 12pt; border-top: 1px solid #cbd5e1; font-size: 10pt; color: #64748b;">
  <p>Generated by LegalCals.com. This is not legal advice.</p>
</div>
`;

    const pdf = await renderPdfFromHtml(html);

    deleteSession(token);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="bc-condition-inspection-report.pdf"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
