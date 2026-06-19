import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validateRepaymentPlan } from "@/lib/bcRepayDamagesRules";
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

    const estimatedRepairCost = Number(form.estimatedRepairCost || 0);
    const initialPaymentAmount = Number(form.initialPaymentAmount || 0);
    const numberOfInstallments = Number(form.numberOfInstallments || 0);
    const installmentAmount = Number(form.installmentAmount || 0);

    const { valid } = validateRepaymentPlan(
      estimatedRepairCost,
      initialPaymentAmount,
      numberOfInstallments,
      installmentAmount
    );
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Repayment plan validation failed" },
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
    const tenantName = String(form.tenantName || "");
    const tenantEmail = form.tenantEmail ? String(form.tenantEmail) : "";
    const tenantPhone = form.tenantPhone ? String(form.tenantPhone) : "";
    const rentalAddressLine1 = String(form.rentalAddressLine1 || "");
    const rentalAddressLine2 = form.rentalAddressLine2
      ? String(form.rentalAddressLine2)
      : "";
    const rentalCity = String(form.rentalCity || "");
    const rentalPostalCode = String(form.rentalPostalCode || "");
    const damageDescription = String(form.damageDescription || "");
    const damageDate = String(form.damageDate || "");
    const initialPaymentDate = String(form.initialPaymentDate || "");
    const installmentFrequency = String(form.installmentFrequency || "");
    const firstInstallmentDate = String(form.firstInstallmentDate || "");
    const missedPaymentConsequence = String(
      form.missedPaymentConsequence || ""
    );
    const lateFeeAmount = form.lateFeeAmount
      ? Number(form.lateFeeAmount)
      : 0;
    const additionalTerms = form.additionalTerms
      ? String(form.additionalTerms)
      : "";

    const frequencyLabels: Record<string, string> = {
      weekly: "Weekly",
      biweekly: "Biweekly",
      monthly: "Monthly",
    };

    const frequencyLabel =
      frequencyLabels[installmentFrequency] || installmentFrequency;

    let consequenceHtml = "";
    if (missedPaymentConsequence === "no_consequence") {
      consequenceHtml = `<p>There are no additional consequences for missed payments.</p>`;
    } else if (missedPaymentConsequence === "late_fee") {
      consequenceHtml = `<p>A late fee of ${formatCurrency(lateFeeAmount)} will apply to missed or late payments.</p>`;
    } else if (missedPaymentConsequence === "breach_notice") {
      consequenceHtml = `<p>Missed payments may result in a breach notice.</p>`;
    } else if (missedPaymentConsequence === "small_claims") {
      consequenceHtml = `<p>Missed payments may result in a Small Claims action.</p>`;
    }

    const additionalTermsHtml = additionalTerms
      ? `<h2>Additional Terms</h2><p>Additional terms: ${escapeHtml(additionalTerms)}</p>`
      : "";

    const html = `
<h1>Agreement to Repay Damages – British Columbia</h1>

<div style="margin-bottom: 16pt;">
  <p><strong>Landlord:</strong> ${escapeHtml(landlordName)}<br>
  ${landlordEmail ? escapeHtml(landlordEmail) + "<br>" : ""}
  ${landlordPhone ? escapeHtml(landlordPhone) + "<br>" : ""}</p>

  <p><strong>Tenant:</strong> ${escapeHtml(tenantName)}<br>
  ${tenantEmail ? escapeHtml(tenantEmail) + "<br>" : ""}
  ${tenantPhone ? escapeHtml(tenantPhone) + "<br>" : ""}</p>

  <p><strong>Rental Address:</strong><br>
  ${escapeHtml(rentalAddressLine1)}<br>
  ${rentalAddressLine2 ? escapeHtml(rentalAddressLine2) + "<br>" : ""}
  ${escapeHtml(rentalCity)}, ${escapeHtml(rentalPostalCode)}</p>
</div>

<h2>Damage Details</h2>
<ul>
  <li>Description of damage: ${escapeHtml(damageDescription)}</li>
  <li>Date of damage: ${formatDate(damageDate)}</li>
  <li>Estimated repair cost: ${formatCurrency(estimatedRepairCost)}</li>
</ul>

<h2>Repayment Plan</h2>
<ul>
  <li>Initial payment amount: ${formatCurrency(initialPaymentAmount)}</li>
  <li>Initial payment date: ${formatDate(initialPaymentDate)}</li>
  <li>Number of installments: ${numberOfInstallments}</li>
  <li>Installment amount: ${formatCurrency(installmentAmount)}</li>
  <li>Installment frequency: ${escapeHtml(frequencyLabel)}</li>
  <li>First installment date: ${formatDate(firstInstallmentDate)}</li>
</ul>

<h2>Consequences</h2>
${consequenceHtml}

${additionalTermsHtml}

<h2>Legal Reference</h2>
<p>This agreement is made voluntarily by both parties under the Residential Tenancy Act.</p>

<h2>Signatures</h2>
<p><strong>Landlord:</strong> ${escapeHtml(landlordName)}</p>
<p style="margin-top: 24pt;">______________________________<br>Signature</p>
<p style="margin-top: 16pt;">Date: ______________</p>

<p style="margin-top: 24pt;"><strong>Tenant:</strong> ${escapeHtml(tenantName)}</p>
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
        "Content-Disposition": `attachment; filename="bc-repay-damages-agreement.pdf"`,
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
