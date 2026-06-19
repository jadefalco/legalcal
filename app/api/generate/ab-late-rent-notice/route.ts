import { NextRequest, NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session";
import { renderPdfFromHtml } from "@/lib/documents/renderPdf";

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

    const landlordName = String(form.landlordName || "");
    const landlordAddress = String(form.landlordAddress || "");
    const tenantName = String(form.tenantName || "");
    const rentalAddress = String(form.rentalAddress || "");
    const rentDueDate = String(form.rentDueDate || "");
    const rentAmount = Number(form.rentAmount || 0);
    const daysLate = Number(form.daysLate || 0);
    const additionalNotes = form.additionalNotes
      ? String(form.additionalNotes)
      : "";

    if (
      !landlordName ||
      !landlordAddress ||
      !tenantName ||
      !rentalAddress ||
      !rentDueDate
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const hasAdditionalNotes = additionalNotes.trim().length > 0;
    const additionalNotesDisplay = hasAdditionalNotes
      ? escapeHtml(additionalNotes)
      : "No additional notes provided.";

    const generatedDate = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @page {
      size: letter portrait;
      margin: 0.60in 0.75in;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
      width: 7.0in;
    }
  </style>
</head>
<body>
  <!-- HEADER BAR -->
  <div style="background: #163A5F; height: 72px; display: flex; justify-content: space-between; align-items: center; padding: 0 24px; margin: 0 -0.75in; width: calc(7.0in + 1.5in);">
    <div style="color: #fff; font-size: 20pt; font-weight: bold;">LegalCals</div>
    <div style="color: #fff; font-size: 10pt; text-transform: uppercase; letter-spacing: 0.8px;">Alberta Residential Tenancies Act</div>
  </div>

  <!-- DOCUMENT TITLE AREA -->
  <div style="text-align: center; margin: 32px 0 28px 0;">
    <div style="font-size: 24pt; font-weight: bold; color: #111827;">Late Rent Notice</div>
    <div style="font-size: 12pt; color: #6B7280; margin-top: 4px;">Province of Alberta</div>
    <div style="font-size: 10pt; color: #9CA3AF; margin-top: 6px;">${generatedDate}</div>
  </div>

  <!-- PARTIES SECTION -->
  <div style="border: 1px solid #D1D5DB; background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; padding-right: 24px; vertical-align: top;">
          <div style="font-size: 10pt; text-transform: uppercase; color: #6B7280; font-weight: 600; margin-bottom: 12px;">Landlord</div>
          <div style="font-size: 11pt; color: #111827; font-weight: 500; margin-bottom: 12px;">${escapeHtml(landlordName)}</div>
          <div style="font-size: 11pt; color: #111827; font-weight: 500;">${escapeHtml(landlordAddress)}</div>
        </td>
        <td style="width: 50%; padding-left: 24px; vertical-align: top; border-left: 1px solid #E5E7EB;">
          <div style="font-size: 10pt; text-transform: uppercase; color: #6B7280; font-weight: 600; margin-bottom: 12px;">Tenant</div>
          <div style="font-size: 11pt; color: #111827; font-weight: 500; margin-bottom: 12px;">${escapeHtml(tenantName)}</div>
          <div style="font-size: 11pt; color: #111827; font-weight: 500;">${escapeHtml(rentalAddress)}</div>
        </td>
      </tr>
    </table>
  </div>

  <!-- KEY DETAILS BOX -->
  <div style="background: #F8FAFC; border-left: 4px solid #2563EB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; padding-right: 16px; vertical-align: top;">
          <div style="font-size: 10pt; text-transform: uppercase; color: #6B7280; font-weight: 600; margin-bottom: 6px;">Rent Due Date</div>
          <div style="font-size: 14pt; color: #111827; font-weight: 700;">${formatDate(rentDueDate)}</div>
        </td>
        <td style="width: 50%; padding-left: 16px; vertical-align: top;">
          <div style="font-size: 10pt; text-transform: uppercase; color: #6B7280; font-weight: 600; margin-bottom: 6px;">Rent Amount</div>
          <div style="font-size: 14pt; color: #111827; font-weight: 700;">$${rentAmount.toFixed(2)}</div>
        </td>
      </tr>
      <tr>
        <td style="width: 50%; padding-right: 16px; padding-top: 16px; vertical-align: top;">
          <div style="font-size: 10pt; text-transform: uppercase; color: #6B7280; font-weight: 600; margin-bottom: 6px;">Days Late</div>
          <div style="font-size: 14pt; color: #111827; font-weight: 700;">${daysLate}</div>
        </td>
        <td style="width: 50%; padding-left: 16px; padding-top: 16px; vertical-align: top;"></td>
      </tr>
    </table>
  </div>

  <!-- LEGAL STATEMENT SECTION -->
  <div style="margin: 24px 0;">
    <div style="font-size: 13pt; text-transform: uppercase; font-weight: bold; color: #163A5F; margin-bottom: 8px;">Legal Statement</div>
    <div style="border-top: 1px solid #E5E7EB; margin-bottom: 12px;"></div>
    <div style="font-size: 11pt; font-weight: 400; line-height: 18pt;">
      <p style="margin: 0 0 12px 0;">This notice is to inform the tenant that rent has not been received by the due date listed above. The tenant is required to pay the outstanding rent immediately. Continued non‑payment may result in further action under the Alberta Residential Tenancies Act.</p>
    </div>
    <div style="background: #F8FAFC; border-left: 4px solid #163A5F; padding: 16px; margin-top: 12px;">
      <p style="margin: 0; font-size: 10pt; color: #374151; font-weight: 500;">Important: Failure to pay rent may result in eviction proceedings under the Alberta Residential Tenancies Act.</p>
    </div>
  </div>

  <!-- ADDITIONAL NOTES -->
  <div style="background: #FAFAFA; border: 1px dashed #D1D5DB; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <div style="font-size: 10pt; text-transform: uppercase; color: #6B7280; font-weight: 600; margin-bottom: 8px;">Additional Notes</div>
    <div style="font-size: 11pt; color: ${hasAdditionalNotes ? '#111827' : '#9CA3AF'}; font-weight: 500;">${additionalNotesDisplay}</div>
  </div>

  <!-- SIGNATURE BLOCK -->
  <table style="width: 100%; border-collapse: collapse; margin-top: 36px;">
    <tr>
      <td style="width: 50%; padding-right: 24px; vertical-align: bottom;">
        <div style="width: 220px; border-bottom: 1.5px solid #111827; height: 32px;"></div>
        <div style="font-size: 10pt; color: #6B7280; margin-top: 6px;">Authorized Landlord / Agent</div>
      </td>
      <td style="width: 50%; padding-left: 24px; vertical-align: bottom;">
        <div style="width: 220px; border-bottom: 1.5px solid #111827; height: 32px;"></div>
        <div style="font-size: 10pt; color: #6B7280; margin-top: 6px;">Date</div>
      </td>
    </tr>
  </table>

  <!-- FOOTER -->
  <div style="border-top: 1px solid #E5E7EB; padding: 12px 0; margin-top: 48px; display: flex; justify-content: space-between; align-items: center; font-size: 8pt; color: #9CA3AF;">
    <div>Generated by LegalCals</div>
    <div>${generatedDate}</div>
    <div>This document is not legal advice.</div>
  </div>
</body>
</html>
`;

    const pdf = await renderPdfFromHtml(html);

    deleteSession(token);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="ab-late-rent-notice.pdf"`,
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
