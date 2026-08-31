import { CUSTOMER_PROFILE } from "@/lib/data";

/**
 * Empfänger-Adresse für Kontaktanfragen.
 * Vor dem Livegang: `CONTACT_EMAIL` auf die domaingebundene Adresse setzen
 * (z. B. `info@tarifvergleich.de`). Fallback ist die bisherige private Adresse.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || CUSTOMER_PROFILE.email;

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Versand-Hook für Kontaktformular-E-Mails.
 *
 * ⚠️ Aktuell ist noch KEIN E-Mail-Backend konfiguriert (keine Domain, kein
 * API-Key). Die Anfrage wird deshalb nur in die Server-Konsole geschrieben.
 * Beim Livegang hier Resend/Nodemailer anbinden:
 *
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "TarifVergleich <noreply@tarifvergleich.de>",
 *     to: CONTACT_EMAIL,
 *     replyTo: data.email,
 *     subject: `Kontaktanfrage: ${data.subject}`,
 *     text: `Von: ${data.name}\nE-Mail: ${data.email}\n\n${data.message}`,
 *   });
 */
export async function sendContactEmail(
  data: ContactMessage,
): Promise<{ ok: boolean }> {
  console.log(
    `[mailer] Kontaktanfrage (kein E-Mail-Backend konfiguriert) → Empfänger ${CONTACT_EMAIL}\n` +
      JSON.stringify(data, null, 2),
  );
  return { ok: true };
}
