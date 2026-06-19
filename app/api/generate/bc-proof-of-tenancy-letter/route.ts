import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validateTenancyDates } from "@/lib/bcProofOfTenancyRules";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

    const tenancyStartDate = String(form.tenancyStartDate || "");
    const rentPaidUpToDate = String(form.rentPaidUpToDate || "");

    const { valid } = validateTenancyDates(tenancyStartDate, rentPaidUpToDate);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Tenancy date validation failed" },
        { status: 400 }
      );
    }

    const landlordName = String(form.landlordName || "");
    const landlordEmail = form.landlordEmail
      ? String(form.landlordEmail)
      : "";
    const landlordPhone = form.landlordPhone
      ? String(form.landlordPhone)
      : "";
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
    const tenancyEndDate = form.tenancyEndDate
      ? String(form.tenancyEndDate)
      : "";
    const monthlyRentAmount = Number(form.monthlyRentAmount || 0);
    const purpose = String(form.purpose || "");
    const purposeOtherDescription = form.purposeOtherDescription
      ? String(form.purposeOtherDescription)
      : "";

    const purposeLabels: Record<string, string> = {
      immigration: "Immigration",
      employment: "Employment",
      school: "School",
      government_benefits: "Government Benefits",
      insurance: "Insurance",
      banking: "Banking",
      general_verification: "General Verification",
      other: "Other",
    };

    const purposeLabel = purposeLabels[purpose] || purpose;

    let purposeHtml = "";
    if (purpose === "other" && purposeOtherDescription) {
      purposeHtml = `<p>Purpose: ${escapeHtml(purposeOtherDescription)}</p>`;
    } else {
      purposeHtml = `<p>Purpose: ${escapeHtml(purposeLabel)}</p>`;
    }

    const tenancyEndDateHtml = tenancyEndDate
      ? `<li>Tenancy end date: ${formatDate(tenancyEndDate)}</li>`
      : "";

    const html = `
<h1>Proof of Tenancy Letter – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}<br>
  ${escapeHtml(landlordAddressLine1)}<br>
  ${landlordAddressLine2 ? escapeHtml(landlordAddressLine2) + "<br>" : ""}
  ${escapeHtml(landlordCity)}, ${escapeHtml(landlordPostalCode)}<br>
  ${landlordEmail ? escapeHtml(landlordEmail) + "<br>" : ""}
  ${landlordPhone ? escapeHtml(landlordPhone) + "<br>" : ""}</p>
</div>

<h2>Tenant &amp; Rental Information</h2>
<p><strong>Tenant:</strong> ${escapeHtml(tenantName)}<br>
<strong>Rental Address:</strong><br>
${escapeHtml(rentalAddressLine1)}<br>
${rentalAddressLine2 ? escapeHtml(rentalAddressLine2) + "<br>" : ""}
${escapeHtml(rentalCity)}, ${escapeHtml(rentalPostalCode)}</p>

<h2>Tenancy Details</h2>
<ul>
  <li>Tenancy start date: ${formatDate(tenancyStartDate)}</li>
  ${tenancyEndDateHtml}
  <li>Monthly rent amount: ${formatCurrency(monthlyRentAmount)}</li>
  <li>Rent paid up to: ${formatDate(rentPaidUpToDate)}</li>
</ul>

<h2>Purpose of Letter</h2>
${purposeHtml}

<h2>Statement of Confirmation</h2>
<p>This letter confirms that the above-named tenant resides at the stated address under a valid residential tenancy agreement.</p>

<h2>Signature</h2>
<p>Landlord: ${escapeHtml(landlordName)}</p>
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
        "Content-Disposition": `attachment; filename="bc-proof-of-tenancy-letter.pdf"`,
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
