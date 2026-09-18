/**
 * Zeitsteuerung für den 24/7-Hybrid-Support.
 *
 * Tagsüber (Mo.–Fr. 10:00–16:00 Uhr, Europe/Berlin) ist der persönliche
 * Berater telefonisch erreichbar. Außerhalb dieser Zeiten (Mo.–Fr. 16:00–10:00 Uhr
 * sowie samstags und sonntags ganztägig) übernimmt der KI-Assistent.
 *
 * Bewusst frei von `process.env`-Zugriffen, damit die Funktion sowohl im
 * Server (Route Handler) als auch im Client (Chat-Widget) importierbar ist.
 */

const TIME_ZONE = "Europe/Berlin";

/**
 * Gibt zurück, ob der KI-Chatbot aktuell aktiv ist.
 *
 * Aktiv außerhalb der telefonischen Erreichbarkeit (Mo–Fr 10:00–16:00 Uhr):
 * - An Wochenenden (Sa & So): ganztägig aktiv
 * - Unter der Woche: ab 16:00 Uhr nachmittags bis 10:00 Uhr morgens
 */
export function isChatActive(
  now: Date = new Date(),
  fromHour = 16,
  toHour = 10,
): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
  const h = parseInt(hourStr, 10) % 24;

  // Am Wochenende hat das Telefon-Team frei -> KI ganztägig aktiv
  if (weekday === "Sat" || weekday === "Sun") {
    return true;
  }

  // Mo–Fr: KI aktiv vor 10:00 Uhr und ab 16:00 Uhr
  return h >= fromHour || h < toHour;
}
