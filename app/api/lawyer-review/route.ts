import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

function parseBase64Pdf(dataUrl: string): Buffer | null {
  const match = dataUrl.match(/^data:application\/pdf;base64,(.+)$/);
  if (!match) return null;
  return Buffer.from(match[1], "base64");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      landlordName,
      tenantName,
      rentalAddressLine1,
      rentalCity,
      rentalPostalCode,
      noticeReason,
      effectiveEndDate,
      noticeServeDate,
      serviceMethod,
      pdfBase64,
    } = body;

    if (!pdfBase64 || typeof pdfBase64 !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing PDF data" },
        { status: 400 }
      );
    }

    const pdfBuffer = parseBase64Pdf(pdfBase64);
    if (!pdfBuffer) {
      return NextResponse.json(
        { success: false, error: "Invalid PDF data" },
        { status: 400 }
      );
    }

    const lawyerEmail = process.env.LAWYER_REVIEW_EMAIL;
    if (!lawyerEmail) {
      // eslint-disable-next-line no-console
      console.log("[Lawyer Review] No LAWYER_REVIEW_EMAIL configured.");
    }

    const textLines = [
      "New BC Notice to End Tenancy — Lawyer Review Request",
      "",
      `Landlord: ${landlordName || "N/A"}`,
      `Tenant: ${tenantName || "N/A"}`,
      `Rental Address: ${rentalAddressLine1 || ""}, ${rentalCity || ""} ${rentalPostalCode || ""}`,
      `Reason: ${noticeReason || "N/A"}`,
      `Notice Serve Date: ${noticeServeDate || "N/A"}`,
      `Effective End Date: ${effectiveEndDate || "N/A"}`,
      `Service Method: ${serviceMethod || "N/A"}`,
      "",
      "Please review the attached PDF and confirm compliance with BC tenancy law.",
    ];

    await sendEmail({
      to: lawyerEmail || "review@legalcals.com",
      subject: "BC Notice to End Tenancy — Lawyer Review Request",
      text: textLines.join("\n"),
      attachments: [
        {
          filename: "bc-notice-to-end-tenancy.pdf",
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
