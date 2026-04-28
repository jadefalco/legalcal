/**
 * Pure function to generate an eviction notice letter.
 *
 * Returns an HTML string containing a jurisdiction-specific eviction notice.
 * No UI dependencies — reusable for PDF, email, and API responses.
 */

import type { EvictionRule } from "@/app/types/EvictionRules";
import type { EvictionNoticeInput } from "@/app/types/EvictionNotice";

export interface EvictionNoticeData {
  input: EvictionNoticeInput;
  rule: EvictionRule;
  noticeValue: number | string | null;
  deadline: string | null;
  reasonLabel: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateEvictionNotice(data: EvictionNoticeData): string {
  const { input, rule, noticeValue, deadline, reasonLabel } = data;

  const servedDateDisplay = formatDisplayDate(input.servedDate);
  const deadlineDisplay = deadline ? formatDisplayDate(deadline) : "N/A";
  const noticePeriodText =
    typeof noticeValue === "number" ? `${noticeValue} days` : String(noticeValue ?? "Varies");

  let bodyParagraphs = "";

  if (input.reason === "nonpayment") {
    bodyParagraphs = `
      <p>
        You are hereby notified that you owe <strong>${escapeHtml(input.amountOwed || "the amount specified in your lease")}</strong> 
        in unpaid rent for the property located at the address above.
      </p>
      <p>
        You have <strong>${escapeHtml(noticePeriodText)}</strong> from the date of this notice 
        (${escapeHtml(servedDateDisplay)}) to pay the full amount owed or vacate the premises. 
        If you fail to pay or vacate by <strong>${escapeHtml(deadlineDisplay)}</strong>, 
        the landlord may file an eviction action in court.
      </p>
    `;
  } else if (input.reason === "lease-violation") {
    bodyParagraphs = `
      <p>
        You are hereby notified that you have violated the terms of your lease as follows: 
        <strong>${escapeHtml(input.violationDescription || "A violation of the lease terms")}</strong>.
      </p>
      <p>
        You have <strong>${escapeHtml(noticePeriodText)}</strong> from the date of this notice 
        (${escapeHtml(servedDateDisplay)}) to cure the violation or vacate the premises. 
        If you fail to cure or vacate by <strong>${escapeHtml(deadlineDisplay)}</strong>, 
        the landlord may file an eviction action in court.
      </p>
    `;
  } else if (input.reason === "month-to-month") {
    bodyParagraphs = `
      <p>
        You are hereby notified that your month-to-month tenancy is being terminated.
      </p>
      <p>
        You have <strong>${escapeHtml(noticePeriodText)}</strong> from the date of this notice 
        (${escapeHtml(servedDateDisplay)}) to vacate the premises. 
        You must vacate by <strong>${escapeHtml(deadlineDisplay)}</strong>.
      </p>
    `;
  } else {
    bodyParagraphs = `
      <p>
        You are hereby notified that your tenancy is being terminated for the following reason: 
        <strong>${escapeHtml(reasonLabel)}</strong>.
      </p>
      <p>
        You have <strong>${escapeHtml(noticePeriodText)}</strong> from the date of this notice 
        (${escapeHtml(servedDateDisplay)}) to vacate the premises. 
        You must vacate by <strong>${escapeHtml(deadlineDisplay)}</strong>.
      </p>
    `;
  }

  const additionalNotesHtml = input.additionalNotes
    ? `<div class="additional-notes">
         <h3>Additional Notes</h3>
         <p>${escapeHtml(input.additionalNotes)}</p>
       </div>`
    : "";

  const citationsHtml =
    rule.citations.length > 0
      ? `<div class="citations">
           <h3>Legal Authority</h3>
           <ul>
             ${rule.citations.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
           </ul>
         </div>`
      : "";

  const deliveryHtml = input.deliveryMethod
    ? `<p class="delivery-method">
         <strong>Method of delivery:</strong> ${escapeHtml(input.deliveryMethod)}
       </p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Eviction Notice — ${escapeHtml(rule.name)}</title>
  <style>
    .notice-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      font-family: Georgia, "Times New Roman", serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fff;
    }
    .notice-header {
      text-align: center;
      border-bottom: 2px solid #1a1a1a;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .notice-header h1 {
      font-size: 24px;
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .notice-header .state-name {
      font-size: 16px;
      color: #555;
    }
    .notice-date {
      text-align: right;
      margin-bottom: 30px;
      font-size: 14px;
    }
    .party-block {
      margin-bottom: 20px;
    }
    .party-block .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 12px;
      color: #555;
      letter-spacing: 0.5px;
    }
    .party-block .value {
      font-size: 15px;
      margin-top: 4px;
    }
    .notice-body {
      margin: 30px 0;
    }
    .notice-body p {
      margin-bottom: 16px;
      text-align: justify;
    }
    .deadline-box {
      background: #f8f9fa;
      border-left: 4px solid #1a1a1a;
      padding: 16px 20px;
      margin: 24px 0;
    }
    .deadline-box strong {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .additional-notes, .citations {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    .additional-notes h3, .citations h3 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .citations ul {
      margin: 0;
      padding-left: 20px;
    }
    .citations li {
      margin-bottom: 6px;
      font-size: 14px;
    }
    .signature-block {
      margin-top: 40px;
    }
    .signature-line {
      margin-top: 30px;
      border-top: 1px solid #1a1a1a;
      width: 300px;
      padding-top: 8px;
      font-size: 14px;
    }
    .disclaimer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
      line-height: 1.5;
    }
    .delivery-method {
      margin-top: 16px;
      font-size: 14px;
      color: #555;
    }
    @media print {
      .notice-container { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="notice-container">
    <div class="notice-header">
      <h1>Notice to Quit / Eviction Notice</h1>
      <div class="state-name">${escapeHtml(rule.name)}</div>
    </div>

    <div class="notice-date">
      <strong>Date of Notice:</strong> ${escapeHtml(servedDateDisplay)}
    </div>

    <div class="party-block">
      <div class="label">To (Tenant)</div>
      <div class="value">${escapeHtml(input.tenantName || "Tenant")}</div>
    </div>

    <div class="party-block">
      <div class="label">From (Landlord / Property Manager)</div>
      <div class="value">${escapeHtml(input.landlordName || "Landlord")}</div>
    </div>

    <div class="party-block">
      <div class="label">Property Address</div>
      <div class="value">${escapeHtml(input.rentalAddress)}${input.rentalCity ? `, ${escapeHtml(input.rentalCity)}` : ""}</div>
    </div>

    <div class="notice-body">
      <p><strong>RE: ${escapeHtml(reasonLabel)} — ${escapeHtml(noticePeriodText)} Notice</strong></p>
      ${bodyParagraphs}
    </div>

    <div class="deadline-box">
      <strong>Important Deadlines</strong>
      <div>Notice period: ${escapeHtml(noticePeriodText)}</div>
      <div>Deadline to comply or vacate: ${escapeHtml(deadlineDisplay)}</div>
      ${deliveryHtml}
    </div>

    ${additionalNotesHtml}
    ${citationsHtml}

    <div class="signature-block">
      <p>Sincerely,</p>
      <div class="signature-line">
        ${escapeHtml(input.landlordName || "Landlord")}
      </div>
      <p class="delivery-method">
        <strong>Date signed:</strong> ${escapeHtml(servedDateDisplay)}
      </p>
    </div>

    <div class="disclaimer">
      <strong>Disclaimer:</strong> This notice is generated for informational purposes only 
      and does not constitute legal advice. Landlord-tenant laws vary by jurisdiction and 
      change frequently. You should consult with a licensed attorney in ${escapeHtml(rule.name)} 
      before serving any eviction notice. Failure to comply with statutory notice requirements 
      may result in dismissal of an eviction action. 
      <em>Legal citations referenced: ${rule.citations.map((c) => escapeHtml(c)).join("; ")}.</em>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate a plain-text version of the eviction notice for download/clipboard.
 */
export function generateEvictionNoticePlainText(data: EvictionNoticeData): string {
  const { input, rule, noticeValue, deadline, reasonLabel } = data;

  const servedDateDisplay = formatDisplayDate(input.servedDate);
  const deadlineDisplay = deadline ? formatDisplayDate(deadline) : "N/A";
  const noticePeriodText =
    typeof noticeValue === "number" ? `${noticeValue} days` : String(noticeValue ?? "Varies");

  let body = "";

  if (input.reason === "nonpayment") {
    body = `You are hereby notified that you owe ${input.amountOwed || "the amount specified in your lease"} in unpaid rent for the property located at the address above.

You have ${noticePeriodText} from the date of this notice (${servedDateDisplay}) to pay the full amount owed or vacate the premises. If you fail to pay or vacate by ${deadlineDisplay}, the landlord may file an eviction action in court.`;
  } else if (input.reason === "lease-violation") {
    body = `You are hereby notified that you have violated the terms of your lease as follows: ${input.violationDescription || "A violation of the lease terms"}.

You have ${noticePeriodText} from the date of this notice (${servedDateDisplay}) to cure the violation or vacate the premises. If you fail to cure or vacate by ${deadlineDisplay}, the landlord may file an eviction action in court.`;
  } else if (input.reason === "month-to-month") {
    body = `You are hereby notified that your month-to-month tenancy is being terminated.

You have ${noticePeriodText} from the date of this notice (${servedDateDisplay}) to vacate the premises. You must vacate by ${deadlineDisplay}.`;
  } else {
    body = `You are hereby notified that your tenancy is being terminated for the following reason: ${reasonLabel}.

You have ${noticePeriodText} from the date of this notice (${servedDateDisplay}) to vacate the premises. You must vacate by ${deadlineDisplay}.`;
  }

  const additionalNotesText = input.additionalNotes
    ? `\n\nADDITIONAL NOTES\n${input.additionalNotes}\n`
    : "";

  const citationsText =
    rule.citations.length > 0
      ? `\n\nLEGAL AUTHORITY\n${rule.citations.map((c) => `- ${c}`).join("\n")}\n`
      : "";

  const deliveryText = input.deliveryMethod
    ? `\nMethod of delivery: ${input.deliveryMethod}\n`
    : "";

  return `NOTICE TO QUIT / EVICTION NOTICE
${rule.name.toUpperCase()}

Date of Notice: ${servedDateDisplay}

TO (Tenant):
${input.tenantName || "Tenant"}

FROM (Landlord / Property Manager):
${input.landlordName || "Landlord"}

PROPERTY ADDRESS:
${input.rentalAddress}${input.rentalCity ? `, ${input.rentalCity}` : ""}

RE: ${reasonLabel} — ${noticePeriodText} Notice

${body}

IMPORTANT DEADLINES
Notice period: ${noticePeriodText}
Deadline to comply or vacate: ${deadlineDisplay}
${deliveryText}
${additionalNotesText}${citationsText}
Sincerely,

_______________________________
${input.landlordName || "Landlord"}
Date signed: ${servedDateDisplay}

---
DISCLAIMER: This notice is generated for informational purposes only and does not constitute legal advice. Landlord-tenant laws vary by jurisdiction and change frequently. You should consult with a licensed attorney in ${rule.name} before serving any eviction notice. Failure to comply with statutory notice requirements may result in dismissal of an eviction action. Legal citations referenced: ${rule.citations.join("; ")}.
`;
}
