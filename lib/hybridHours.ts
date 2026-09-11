/**
 * Zeitsteuerung für den 24/7-Hybrid-Support.
 *
 * Tagsüber (08:00–20:00 Uhr, Europe/Berlin) betreut der menschliche Berater
 * (Telefon/WhatsApp), nachts (20:00–08:00 Uhr) übernimmt der KI-Chatbot.
 *
 * Bewusst frei von `process.env`-Zugriffen, damit die Funktion sowohl im
 * Server (Route Handler) als auch im Client (Chat-Widget) importierbar ist.
 */

const TIME_ZONE = "Europe/Berlin";

/** Aktuelle Stunde (0–23) in der Ziel-Zeitzone. */
function hourInTimeZone(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone,
    hour: "2-digit",
    hour12: false,
  }).format(now);
  // `% 24` fängt die seltene "24"-Darstellung für Mitternacht ab.
  return parseInt(parts, 10) % 24;
}

/**
 * Gibt zurück, ob der KI-Chatbot aktuell aktiv ist.
 *
 * Aktiv ist das Nachtfenster: Stunde >= `fromHour` (Standard 20) ODER
 * Stunde < `toHour` (Standard 8), also 20:00 bis 08:00 Uhr.
 */
export function isChatActive(
  now: Date = new Date(),
  fromHour = 20,
  toHour = 8,
): boolean {
  const h = hourInTimeZone(now, TIME_ZONE);
  return h >= fromHour || h < toHour;
}
