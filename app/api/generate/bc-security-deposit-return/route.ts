import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validateDepositReturn } from "@/lib/bcDepositRules";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

const reasonLabels: Record<string, string> = {
  normal_move_out:
    "The tenancy has ended and the tenant is requesting the return of their security deposit.",
  landlord_did_not_provide_condition_report:
    "The landlord did not provide a move-in or move-out condition inspection report.",
  deposit_not_returned_in_time:
    "The landlord has not returned the deposit within the required 15-day period.",
  dispute_over_deductions:
    "The tenant disputes the deductions made from the security deposit.",
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
    const tenancyEndDate = String(form.tenancyEndDate || "");
    const depositAmount = Number(form.depositAmount || 0);
    const dateDepositPaid = String(form.dateDepositPaid || "");
    const reason = String(form.reason || "");
    const deductionDisputeDescription = form.deductionDisputeDescription
      ? String(form.deductionDisputeDescription)
      : "";

    const today = new Date().toISOString().split("T")[0];
    const { daysSinceMoveOut } = validateDepositReturn(tenancyEndDate, today);

    const reasonLabel = reasonLabels[reason] || reason;

    let reasonSpecificHtml = "";
    if (reason === "dispute_over_deductions" && deductionDisputeDescription) {
      reasonSpecificHtml += `<p>Dispute description: ${escapeHtml(deductionDisputeDescription)}</p>`;
    }

    const html = `
<h1>Security Deposit Return Request – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}<br>
  Email: ${escapeHtml(tenantEmail)}<br>
  Phone: ${escapeHtml(tenantPhone)}</p>

  <p><strong>Rental Address:</strong><br>
  ${escapeHtml(rentalAddressLine1)}<br>
  ${rentalAddressLine2 ? escapeHtml(rentalAddressLine2) + "<br>" : ""}
  ${escapeHtml(rentalCity)}, ${escapeHtml(rentalPostalCode)}</p>
</div>

<h2>Landlord Information</h2>
<p>${escapeHtml(landlordName)}<br>
${escapeHtml(landlordAddressLine1)}<br>
${landlordAddressLine2 ? escapeHtml(landlordAddressLine2) + "<br>" : ""}
${escapeHtml(landlordCity)}, ${escapeHtml(landlordPostalCode)}</p>

<h2>Tenancy Details</h2>
<ul>
  <li>Tenancy start date: ${formatDate(tenancyStartDate)}</li>
  <li>Tenancy end date: ${formatDate(tenancyEndDate)}</li>
  <li>Deposit amount: ${formatCurrency(depositAmount)}</li>
  <li>Date deposit was paid: ${formatDate(dateDepositPaid)}</li>
  <li>Days since move-out: ${daysSinceMoveOut}</li>
</ul>

<h2>Reason for Request</h2>
<p>${escapeHtml(reasonLabel)}</p>
${reasonSpecificHtml}

<h2>Legal Reference</h2>
<p>Under the Residential Tenancy Act, landlords must return security deposits within 15 days unless both parties agree in writing to deductions.</p>

<h2>Request</h2>
<p>The tenant requests the full return of the security deposit immediately.</p>

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
        "Content-Disposition": `attachment; filename="bc-security-deposit-return-letter.pdf"`,
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
