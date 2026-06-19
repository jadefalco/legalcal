import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validateTenantNoticePeriod } from "@/lib/bcTenantNoticePeriods";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

const reasonLabels: Record<string, string> = {
  tenant_moving_out: "The tenant is ending the tenancy and moving out.",
  landlord_breach: "The landlord has breached the tenancy agreement.",
  unsafe_conditions: "The rental unit is unsafe or uninhabitable.",
  family_violence: "The tenant is ending the tenancy due to family violence.",
  mutual_agreement: "The landlord and tenant have mutually agreed to end the tenancy.",
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
    const moveOutDate = String(form.moveOutDate || "");

    const { valid, requiredDays } = validateTenantNoticePeriod(
      noticeReason,
      noticeServeDate,
      moveOutDate
    );

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Notice period validation failed" },
        { status: 400 }
      );
    }

    const tenantName = String(form.tenantName || "");
    const tenantEmail = String(form.tenantEmail || "");
    const tenantPhone = String(form.tenantPhone || "");
    const rentalAddressLine1 = String(form.rentalAddressLine1 || "");
    const rentalAddressLine2 = form.rentalAddressLine2
      ? String(form.rentalAddressLine2)
      : "";
    const rentalCity = String(form.rentalCity || "");
    const rentalPostalCode = String(form.rentalPostalCode || "");
    const landlordName = String(form.landlordName || "");
    const landlordAddressLine1 = String(form.landlordAddressLine1 || "");
    const landlordAddressLine2 = form.landlordAddressLine2
      ? String(form.landlordAddressLine2)
      : "";
    const landlordCity = String(form.landlordCity || "");
    const landlordPostalCode = String(form.landlordPostalCode || "");
    const tenancyStartDate = String(form.tenancyStartDate || "");
    const monthlyRentAmount = Number(form.monthlyRentAmount || 0);
    const rentDueDayOfMonth = Number(form.rentDueDayOfMonth || 0);
    const serviceMethod = String(form.serviceMethod || "");

    const landlordBreachDescription = form.landlordBreachDescription
      ? String(form.landlordBreachDescription)
      : "";
    const unsafeConditionDescription = form.unsafeConditionDescription
      ? String(form.unsafeConditionDescription)
      : "";
    const familyViolenceDeclaration = form.familyViolenceDeclaration
      ? Boolean(form.familyViolenceDeclaration)
      : false;
    const mutualAgreementDetails = form.mutualAgreementDetails
      ? String(form.mutualAgreementDetails)
      : "";

    const reasonLabel = reasonLabels[noticeReason] || noticeReason;
    const serviceLabel = serviceMethodLabels[serviceMethod] || serviceMethod;

    let reasonSpecificHtml = "";
    if (noticeReason === "landlord_breach" && landlordBreachDescription) {
      reasonSpecificHtml += `<p>Description of breach: ${escapeHtml(landlordBreachDescription)}</p>`;
    }
    if (noticeReason === "unsafe_conditions" && unsafeConditionDescription) {
      reasonSpecificHtml += `<p>Description of unsafe conditions: ${escapeHtml(unsafeConditionDescription)}</p>`;
    }
    if (noticeReason === "family_violence" && familyViolenceDeclaration) {
      reasonSpecificHtml += `<p>The tenant has declared that they are ending the tenancy due to family violence.</p>`;
    }
    if (noticeReason === "mutual_agreement" && mutualAgreementDetails) {
      reasonSpecificHtml += `<p>Details of mutual agreement: ${escapeHtml(mutualAgreementDetails)}</p>`;
    }

    const noticePeriodSentence =
      requiredDays > 0
        ? `<p>This notice meets the minimum notice period required under the Residential Tenancy Act.</p>`
        : "";

    const html = `
<h1>Tenant Notice to End Tenancy – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}<br>
  Email: ${escapeHtml(tenantEmail)}<br>
  Phone: ${escapeHtml(tenantPhone)}</p>

  <p><strong>Rental Address:</strong><br>
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

<h2>Landlord Information</h2>
<p>${escapeHtml(landlordName)}<br>
${escapeHtml(landlordAddressLine1)}<br>
${landlordAddressLine2 ? escapeHtml(landlordAddressLine2) + "<br>" : ""}
${escapeHtml(landlordCity)}, ${escapeHtml(landlordPostalCode)}</p>

<h2>Reason for Ending Tenancy</h2>
<p>${escapeHtml(reasonLabel)}</p>
${reasonSpecificHtml}

<h2>Dates</h2>
<p>Date notice is given: ${formatDate(noticeServeDate)}</p>
<p>Move-out date: ${formatDate(moveOutDate)}</p>
${noticePeriodSentence}

<h2>Service Method</h2>
<p>${escapeHtml(serviceLabel)}</p>
<p>You must serve this notice using the method selected above and keep proof of service.</p>

<h2>Signature</h2>
<p>Tenant: ${escapeHtml(tenantName)}</p>
<p style="margin-top: 24pt;">______________________________<br>Signature</p>
<p style="margin-top: 16pt;">Date: ______________</p>

<div style="margin-top: 40pt; padding-top: 12pt; border-top: 1px solid #cbd5e1; font-size: 10pt; color: #64748b;">
  <p>Generated by LegalCals.com. This is not legal advice.</p>
</div>
`;

    const pdf = await renderPdfFromHtml(html);

    deleteSession(token);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="bc-tenant-notice-to-end-tenancy.pdf"`,
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
