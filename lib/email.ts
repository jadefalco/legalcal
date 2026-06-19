/**
 * Minimal email utility for sending transactional messages.
 * Falls back to console logging when SMTP is not configured.
 */

import { createTransport } from "nodemailer";

const hasSmtpConfig =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

const transporter = hasSmtpConfig
  ? createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

export async function sendEmail(params: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}): Promise<void> {
  const { to, subject, text, html, attachments } = params;

  if (!transporter) {
    // eslint-disable-next-line no-console
    console.log("[Email fallback - no SMTP configured]");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "LegalCals <noreply@legalcals.com>",
    to,
    subject,
    text,
    html,
    attachments,
  });
}
