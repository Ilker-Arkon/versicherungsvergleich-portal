import nodemailer from "nodemailer";
import { CUSTOMER_PROFILE } from "@/lib/data";

/**
 * Empfänger-Adresse für Kontaktanfragen.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || CUSTOMER_PROFILE.email;
export const EMAIL_FROM = process.env.EMAIL_FROM || `SicherTarif <${CONTACT_EMAIL}>`;

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Versand-Hook für Kontaktformular-E-Mails via IONOS SMTP.
 */
export async function sendContactEmail(
  data: ContactMessage,
): Promise<{ ok: boolean; error?: string }> {
  const host = process.env.SMTP_HOST || "smtp.ionos.de";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("[mailer] Keine SMTP-Zugangsdaten konfiguriert. Fallback auf Console-Log.");
    console.log(`[mailer] Kontaktanfrage an ${CONTACT_EMAIL}:`, JSON.stringify(data, null, 2));
    return { ok: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `[SicherTarif Anfrage] ${data.subject}`,
      text: `Neue Kontaktanfrage über SicherTarif:\n\nName: ${data.name}\nE-Mail: ${data.email}\nBetreff: ${data.subject}\n\nNachricht:\n${data.message}\n\n---\nGesendet über das Kontaktformular auf https://sichertarif.de`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Neue Kontaktanfrage</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">SicherTarif Portal (sichertarif.de)</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 90px; color: #64748b; font-size: 13px;">Absender:</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b; font-size: 13px;">E-Mail:</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b; font-size: 13px;">Betreff:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">${data.subject}</td>
              </tr>
            </table>
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; margin-top: 12px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Nachricht:</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${data.message}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              Tipp: Sie können direkt auf diese E-Mail antworten, um dem Absender zu schreiben.
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[mailer] E-Mail erfolgreich via IONOS versendet: ${info.messageId}`);
    return { ok: true };
  } catch (err: any) {
    console.error("[mailer] Fehler beim Versenden der E-Mail:", err);
    return { ok: false, error: err.message };
  }
}
