"use server";

import { sendContactEmail } from "@/lib/mailer";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1) Honeypot: verstecktes Feld, das nur Bots ausfüllen.
  //    Bots bekommen ein "Erfolg"-Signal, aber es wird nichts versendet.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { status: "success", message: "Vielen Dank für Ihre Nachricht." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // 2) Server-seitige Validierung (Client-`required` ist kein Schutz).
  if (name.length < 2 || name.length > 100) {
    return { status: "error", message: "Bitte geben Sie einen gültigen Namen an." };
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
    };
  }
  if (subject.length > 200) {
    return { status: "error", message: "Der Betreff ist zu lang." };
  }
  if (message.length < 10 || message.length > 5000) {
    return {
      status: "error",
      message: "Ihre Nachricht muss zwischen 10 und 5.000 Zeichen lang sein.",
    };
  }
  // Einwilligung muss aktiv gesetzt sein.
  if (formData.get("consent") !== "on") {
    return {
      status: "error",
      message: "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.",
    };
  }

  // 3) Versand (aktuell Console-Fallback, siehe lib/mailer.ts).
  const result = await sendContactEmail({ name, email, subject, message });
  if (!result.ok) {
    return {
      status: "error",
      message:
        "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
    };
  }

  return {
    status: "success",
    message: "Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.",
  };
}
