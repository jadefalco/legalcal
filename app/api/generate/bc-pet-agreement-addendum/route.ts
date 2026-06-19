import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { validatePetDeposit } from "@/lib/bcPetAgreementRules";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
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

    const petDepositAmount = Number(form.petDepositAmount || 0);
    const { valid } = validatePetDeposit(petDepositAmount);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Pet deposit validation failed" },
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
    const petType = String(form.petType || "");
    const petBreed = form.petBreed ? String(form.petBreed) : "";
    const petName = String(form.petName || "");
    const petAge = String(form.petAge || "");
    const petWeightKg = Number(form.petWeightKg || 0);
    const petDescription = form.petDescription
      ? String(form.petDescription)
      : "";
    const petDamageResponsibility = Boolean(form.petDamageResponsibility);
    const petNoiseResponsibility = Boolean(form.petNoiseResponsibility);
    const petWasteResponsibility = Boolean(form.petWasteResponsibility);
    const petSupervisionRequirement = Boolean(form.petSupervisionRequirement);
    const additionalPetRules = form.additionalPetRules
      ? String(form.additionalPetRules)
      : "";
    const petDepositPaid = Boolean(form.petDepositPaid);

    let petRulesHtml = "";
    if (petDamageResponsibility) {
      petRulesHtml += `<p>The tenant is responsible for any damage caused by the pet.</p>`;
    }
    if (petNoiseResponsibility) {
      petRulesHtml += `<p>The tenant must ensure the pet does not create excessive noise.</p>`;
    }
    if (petWasteResponsibility) {
      petRulesHtml += `<p>The tenant must properly dispose of all pet waste.</p>`;
    }
    if (petSupervisionRequirement) {
      petRulesHtml += `<p>The tenant must supervise the pet to prevent disturbances or damage.</p>`;
    }
    if (additionalPetRules) {
      petRulesHtml += `<p>Additional rules: ${escapeHtml(additionalPetRules)}</p>`;
    }

    const depositStatusHtml = petDepositPaid
      ? `<p>The pet deposit has been paid.</p>`
      : `<p>The pet deposit has not yet been paid.</p>`;

    const petBreedHtml = petBreed
      ? `<li>Breed: ${escapeHtml(petBreed)}</li>`
      : "";
    const petDescriptionHtml = petDescription
      ? `<li>Description: ${escapeHtml(petDescription)}</li>`
      : "";

    const html = `
<h1>Pet Agreement Addendum – British Columbia</h1>

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

<h2>Pet Details</h2>
<ul>
  <li>Pet type: ${escapeHtml(petType)}</li>
  ${petBreedHtml}
  <li>Name: ${escapeHtml(petName)}</li>
  <li>Age: ${escapeHtml(petAge)}</li>
  <li>Weight: ${petWeightKg} kg</li>
  ${petDescriptionHtml}
</ul>

<h2>Pet Rules</h2>
${petRulesHtml}

<h2>Deposit</h2>
<ul>
  <li>Pet deposit amount: ${formatCurrency(petDepositAmount)}</li>
</ul>
${depositStatusHtml}

<h2>Legal Reference</h2>
<p>This addendum forms part of the tenancy agreement and is made under the Residential Tenancy Act.</p>

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
        "Content-Disposition": `attachment; filename="bc-pet-agreement-addendum.pdf"`,
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
