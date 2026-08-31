import { CUSTOMER_PROFILE } from "@/lib/data";

/**
 * Zentrale Site-Konfiguration.
 *
 * Basis-URL der Seite, Ermittlungs-Reihenfolge:
 * 1. `NEXT_PUBLIC_SITE_URL` — manuell gesetzte Domain (nach Livegang, z. B. https://www.tarifvergleich.de)
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — automatisch von Vercel gesetzt (Production)
 * 3. `VERCEL_URL` — automatisch von Vercel gesetzt (Preview)
 * 4. `http://localhost:3000` — nur lokale Entwicklung
 *
 * Ohne den Vercel-Fallback würden canonical/OG/JSON-LD/robots/sitemap im
 * Deployment fälschlich auf `localhost` zeigen.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const SITE_NAME = "TarifVergleich";

/**
 * WhatsApp-Business-Nummer im internationalen Format ohne `+`
 * (z. B. "4915112345678").
 *
 * Quelle: `NEXT_PUBLIC_WHATSAPP_NUMBER`, falls gesetzt; sonst die hinterlegte
 * (Mobil-)Nummer aus `CUSTOMER_PROFILE.phone`. Dadurch erscheint der
 * WhatsApp-Button auch ohne gesetzte Env-Var (z. B. im Vercel-Deployment).
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  CUSTOMER_PROFILE.phone.replace(/\D/g, "");

/** Vorausgefüllter Text, wenn Besucher den WhatsApp-Chat öffnen. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hallo, ich habe eine Frage zum Tarifvergleich.";

/** Vollständiger `wa.me`-Link (leer, wenn keine Nummer konfiguriert ist). */
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_DEFAULT_MESSAGE,
    )}`
  : "";

/** Klickbarer `tel:`-Link aus der hinterlegten Telefonnummer. */
export const PHONE_URL = `tel:${CUSTOMER_PROFILE.phone.replace(/\s+/g, "")}`;
