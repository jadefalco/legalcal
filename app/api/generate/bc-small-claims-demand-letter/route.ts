import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validateSmallClaims } from "@/lib/bcSmallClaimsRules";
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

    const claimAmount = Number(form.claimAmount || 0);
    const { valid } = validateSmallClaims(claimAmount);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Claim amount validation failed" },
        { status: 400 }
      );
    }

    const senderName = String(form.senderName || "");
    const senderEmail = form.senderEmail ? String(form.senderEmail) : "";
    const senderPhone = form.senderPhone ? String(form.senderPhone) : "";
    const senderAddressLine1 = String(form.senderAddressLine1 || "");
    const senderAddressLine2 = form.senderAddressLine2
      ? String(form.senderAddressLine2)
      : "";
    const senderCity = String(form.senderCity || "");
    const senderPostalCode = String(form.senderPostalCode || "");
    const recipientName = String(form.recipientName || "");
    const recipientAddressLine1 = String(form.recipientAddressLine1 || "");
    const recipientAddressLine2 = form.recipientAddressLine2
      ? String(form.recipientAddressLine2)
      : "";
    const recipientCity = String(form.recipientCity || "");
    const recipientPostalCode = String(form.recipientPostalCode || "");
    const claimReason = String(form.claimReason || "");
    const claimReasonOtherDescription = form.claimReasonOtherDescription
      ? String(form.claimReasonOtherDescription)
      : "";
    const incidentDate = String(form.incidentDate || "");
    const claimDescription = String(form.claimDescription || "");
    const paymentDeadlineDate = String(form.paymentDeadlineDate || "");
    const preferredPaymentMethod = String(form.preferredPaymentMethod || "");
    const preferredPaymentMethodOtherDescription =
      form.preferredPaymentMethodOtherDescription
        ? String(form.preferredPaymentMethodOtherDescription)
        : "";
    const additionalNotes = form.additionalNotes
      ? String(form.additionalNotes)
      : "";

    const claimReasonLabels: Record<string, string> = {
      unpaid_rent: "Unpaid Rent",
      property_damage: "Property Damage",
      unreturned_deposit: "Unreturned Deposit",
      unpaid_utilities: "Unpaid Utilities",
      breach_of_agreement: "Breach of Agreement",
      other: "Other",
    };

    const preferredPaymentMethodLabels: Record<string, string> = {
      e_transfer: "E-Transfer",
      cheque: "Cheque",
      cash: "Cash",
      other: "Other",
    };

    const claimReasonLabel = claimReasonLabels[claimReason] || claimReason;
    const preferredPaymentMethodLabel =
      preferredPaymentMethodLabels[preferredPaymentMethod] ||
      preferredPaymentMethod;

    let claimReasonHtml = `<p>Claim reason: ${escapeHtml(claimReasonLabel)}</p>`;
    if (claimReason === "other" && claimReasonOtherDescription) {
      claimReasonHtml += `<p>Reason: ${escapeHtml(claimReasonOtherDescription)}</p>`;
    }

    let paymentMethodHtml = `<p>Preferred payment method: ${escapeHtml(preferredPaymentMethodLabel)}</p>`;
    if (preferredPaymentMethod === "other" && preferredPaymentMethodOtherDescription) {
      paymentMethodHtml += `<p>Payment method: ${escapeHtml(preferredPaymentMethodOtherDescription)}</p>`;
    }

    const additionalNotesHtml = additionalNotes
      ? `<h2>Additional Notes</h2><p>Notes: ${escapeHtml(additionalNotes)}</p>`
      : "";

    const html = `
<h1>Small Claims Demand Letter – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Sender:</strong> ${escapeHtml(senderName)}<br>
  ${escapeHtml(senderAddressLine1)}<br>
  ${senderAddressLine2 ? escapeHtml(senderAddressLine2) + "<br>" : ""}
  ${escapeHtml(senderCity)}, ${escapeHtml(senderPostalCode)}<br>
  ${senderEmail ? escapeHtml(senderEmail) + "<br>" : ""}
  ${senderPhone ? escapeHtml(senderPhone) + "<br>" : ""}</p>

  <p><strong>Recipient:</strong> ${escapeHtml(recipientName)}<br>
  ${escapeHtml(recipientAddressLine1)}<br>
  ${recipientAddressLine2 ? escapeHtml(recipientAddressLine2) + "<br>" : ""}
  ${escapeHtml(recipientCity)}, ${escapeHtml(recipientPostalCode)}</p>
</div>

<h2>Claim Details</h2>
<ul>
  <li>Claim amount: ${formatCurrency(claimAmount)}</li>
  <li>Incident date: ${formatDate(incidentDate)}</li>
  <li>Description of the issue: ${escapeHtml(claimDescription)}</li>
</ul>

${claimReasonHtml}

<h2>Demand</h2>
<p>This letter serves as a formal demand for payment before commencing a claim in the Provincial Court of British Columbia (Small Claims Division).</p>

<h2>Payment Instructions</h2>
<ul>
  <li>Payment deadline date: ${formatDate(paymentDeadlineDate)}</li>
</ul>

${paymentMethodHtml}

${additionalNotesHtml}

<h2>Legal Reference</h2>
<p>If payment is not received by the deadline stated above, the sender may proceed with a Small Claims action without further notice.</p>

<h2>Signature</h2>
<p>Sender: ${escapeHtml(senderName)}</p>
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
        "Content-Disposition": `attachment; filename="bc-small-claims-demand-letter.pdf"`,
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
