import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { getNoticePeriodDays } from "@/lib/bcNoticePeriods";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

function addDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const reasonLabels: Record<string, string> = {
  non_payment: "Non-payment of rent",
  breach_of_agreement: "Breach of tenancy agreement",
  landlord_use: "Landlord use of property",
  renovation_or_demolition: "Renovation or demolition",
  end_of_fixed_term: "End of fixed-term tenancy",
  illegal_activity: "Illegal activity",
};

const serviceMethodLabels: Record<string, string> = {
  in_person: "In person",
  posted_on_door: "Posted on door",
  registered_mail: "Registered mail",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

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

    const noticeReason = String(form.noticeReason || "");
    const noticeServeDate = String(form.noticeServeDate || "");
    const noticePeriodDays = getNoticePeriodDays(noticeReason);
    const effectiveEndDate = addDays(noticeServeDate, noticePeriodDays);

    const landlordName = String(form.landlordName || "");
    const landlordAddressLine1 = String(form.landlordAddressLine1 || "");
    const landlordAddressLine2 = form.landlordAddressLine2
      ? String(form.landlordAddressLine2)
      : "";
    const landlordCity = String(form.landlordCity || "");
    const landlordPostalCode = String(form.landlordPostalCode || "");
    const tenantName = String(form.tenantName || "");
    const rentalAddressLine1 = String(form.rentalAddressLine1 || "");
    const rentalAddressLine2 = form.rentalAddressLine2
      ? String(form.rentalAddressLine2)
      : "";
    const rentalCity = String(form.rentalCity || "");
    const rentalPostalCode = String(form.rentalPostalCode || "");
    const tenancyStartDate = String(form.tenancyStartDate || "");
    const monthlyRentAmount = Number(form.monthlyRentAmount || 0);
    const rentDueDayOfMonth = Number(form.rentDueDayOfMonth || 0);
    const serviceMethod = String(form.serviceMethod || "");

    const rentArrearsAmount = form.rentArrearsAmount
      ? Number(form.rentArrearsAmount)
      : null;
    const breachDescription = form.breachDescription
      ? String(form.breachDescription)
      : "";
    const landlordUseDescription = form.landlordUseDescription
      ? String(form.landlordUseDescription)
      : "";
    const renovationDescription = form.renovationDescription
      ? String(form.renovationDescription)
      : "";
    const illegalActivityDescription = form.illegalActivityDescription
      ? String(form.illegalActivityDescription)
      : "";

    const reasonLabel = reasonLabels[noticeReason] || noticeReason;
    const serviceLabel = serviceMethodLabels[serviceMethod] || serviceMethod;

    let reasonSpecificHtml = "";
    if (noticeReason === "non_payment" && rentArrearsAmount !== null) {
      reasonSpecificHtml += `<p>Rent arrears amount: ${formatCurrency(rentArrearsAmount)}</p>`;
    }
    if (noticeReason === "breach_of_agreement" && breachDescription) {
      reasonSpecificHtml += `<p>Description of breach: ${escapeHtml(breachDescription)}</p>`;
    }
    if (noticeReason === "landlord_use" && landlordUseDescription) {
      reasonSpecificHtml += `<p>Landlord use description: ${escapeHtml(landlordUseDescription)}</p>`;
    }
    if (noticeReason === "renovation_or_demolition" && renovationDescription) {
      reasonSpecificHtml += `<p>Renovation or demolition description: ${escapeHtml(renovationDescription)}</p>`;
    }
    if (noticeReason === "illegal_activity" && illegalActivityDescription) {
      reasonSpecificHtml += `<p>Illegal activity description: ${escapeHtml(illegalActivityDescription)}</p>`;
    }

    const html = `
<h1>Notice to End Tenancy – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}<br>
  ${escapeHtml(landlordAddressLine1)}<br>
  ${landlordAddressLine2 ? escapeHtml(landlordAddressLine2) + "<br>" : ""}
  ${escapeHtml(landlordCity)}, ${escapeHtml(landlordPostalCode)}</p>

  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}<br>
  ${escapeHtml(rentalAddressLine1)}<br>
  ${rentalAddressLine2 ? escapeHtml(rentalAddressLine2) + "<br>" : ""}
  ${escapeHtml(rentalCity)}, ${escapeHtml(rentalPostalCode)}</p>
</div>

<h2>Tenancy Details</h2>
<ul>
  <li>Tenancy start date: ${formatDate(tenancyStartDate)}</li>
  <li>Monthly rent amount: ${formatCurrency(monthlyRentAmount)}</li>
  <li>Rent due day: ${rentDueDayOfMonth}</li>
</ul>

<h2>Reason for Ending Tenancy</h2>
<p>${escapeHtml(reasonLabel)}</p>
${reasonSpecificHtml}

<h2>Dates</h2>
<p>Date notice is given: ${formatDate(noticeServeDate)}</p>
<p>Effective end date of tenancy: ${formatDate(effectiveEndDate)}</p>
<p>This notice complies with the minimum notice period required under the Residential Tenancy Act.</p>

<h2>Service Method</h2>
<p>${escapeHtml(serviceLabel)}</p>
<p>You must serve this notice using the method selected above and keep proof of service.</p>

<h2>Signature</h2>
<p>Landlord: ${escapeHtml(landlordName)}</p>
<p style="margin-top: 24pt;">______________________________<br>Signature</p>
<p style="margin-top: 16pt;">Date: ______________</p>

<div style="margin-top: 40pt; padding-top: 12pt; border-top: 1px solid #cbd5e1; font-size: 10pt; color: #64748b;">
  <p>Generated by LegalCals.com. This is not legal advice.</p>
</div>
`;

    const pdf = await renderPdfFromHtml(html);

    // Clean up session after PDF generation
    deleteSession(token);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="bc-notice-to-end-tenancy.pdf"`,
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
