import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validatePaymentPlan } from "@/lib/bcPaymentPlanRules";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

const frequencyLabels: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Biweekly",
  monthly: "Monthly",
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

    const totalAmountOwed = Number(form.totalAmountOwed || 0);
    const initialPaymentAmount = Number(form.initialPaymentAmount || 0);
    const numberOfInstallments = Number(form.numberOfInstallments || 0);
    const installmentAmount = Number(form.installmentAmount || 0);

    const { valid } = validatePaymentPlan(
      totalAmountOwed,
      initialPaymentAmount,
      numberOfInstallments,
      installmentAmount
    );
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Payment plan validation failed" },
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
    const initialPaymentDate = String(form.initialPaymentDate || "");
    const installmentFrequency = String(form.installmentFrequency || "");
    const firstInstallmentDate = String(form.firstInstallmentDate || "");
    const latePaymentConsequence = String(form.latePaymentConsequence || "");
    const lateFeeAmount = form.lateFeeAmount ? Number(form.lateFeeAmount) : null;
    const additionalTerms = form.additionalTerms
      ? String(form.additionalTerms)
      : "";

    const frequencyLabel = frequencyLabels[installmentFrequency] || installmentFrequency;

    let latePaymentHtml = "";
    if (latePaymentConsequence === "no_consequence") {
      latePaymentHtml = `<p>There are no additional consequences for late payment.</p>`;
    } else if (latePaymentConsequence === "late_fee" && lateFeeAmount !== null) {
      latePaymentHtml = `<p>A late fee of ${formatCurrency(lateFeeAmount)} will apply to missed or late payments.</p>`;
    } else if (latePaymentConsequence === "breach_notice") {
      latePaymentHtml = `<p>Failure to make payments on time may result in a breach notice.</p>`;
    }

    const additionalTermsHtml = additionalTerms
      ? `<p>Additional terms: ${escapeHtml(additionalTerms)}</p>`
      : "";

    const html = `
<h1>Payment Plan Agreement – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}</p>
  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}</p>
  <p><strong>Rental Address:</strong><br>
  ${escapeHtml(rentalAddressLine1)}<br>
  ${rentalAddressLine2 ? escapeHtml(rentalAddressLine2) + "<br>" : ""}
  ${escapeHtml(rentalCity)}, ${escapeHtml(rentalPostalCode)}</p>
</div>

<h2>Amount Owed</h2>
<ul>
  <li>Total amount owed: ${formatCurrency(totalAmountOwed)}</li>
  <li>Initial payment amount: ${formatCurrency(initialPaymentAmount)}</li>
  <li>Initial payment date: ${formatDate(initialPaymentDate)}</li>
</ul>

<h2>Installment Schedule</h2>
<ul>
  <li>Number of installments: ${numberOfInstallments}</li>
  <li>Installment amount: ${formatCurrency(installmentAmount)}</li>
  <li>Installment frequency: ${escapeHtml(frequencyLabel)}</li>
  <li>First installment date: ${formatDate(firstInstallmentDate)}</li>
</ul>

<h2>Late Payment Consequences</h2>
${latePaymentHtml}

${additionalTermsHtml}

<h2>Legal Reference</h2>
<p>This agreement is made voluntarily by both parties under the Residential Tenancy Act.</p>

<h2>Signatures</h2>

<div style="margin-bottom: 24pt;">
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}</p>
  <p style="margin-top: 16pt;">______________________________<br>Signature</p>
  <p style="margin-top: 8pt;">Date: ______________</p>
</div>

<div>
  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}</p>
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
        "Content-Disposition": `attachment; filename="bc-payment-plan-agreement.pdf"`,
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
