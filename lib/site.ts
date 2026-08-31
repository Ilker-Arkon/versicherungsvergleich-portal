import { CUSTOMER_PROFILE } from "@/lib/data";

/**
 * Zentrale Site-Konfiguration.
 *
 * WICHTIG für den Livegang: `NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen
 * (z. B. https://www.tarifvergleich.de). Der Fallback ist nur für lokale
 * Entwicklung gedacht — in production wäre `localhost` in Sitemap/OG falsch.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE_NAME = "TarifVergleich";

/**
 * WhatsApp-Business-Nummer im internationalen Format ohne `+`
 * (z. B. "4915112345678"). Leer lassen, um den WhatsApp-Button auszublenden
 * (Standard — es ist noch keine WhatsApp-Nummer hinterlegt).
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

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
