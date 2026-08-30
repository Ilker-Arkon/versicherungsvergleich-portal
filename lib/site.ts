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
