/**
 * Cookie-Consent: geteilte Typen & Konstanten.
 *
 * Wird ausschließlich von Client-Komponenten importiert (greift auf `localStorage` zu).
 * Zweck-Modell nach DSGVO:
 *  - `necessary`  → technisch erforderlich, immer aktiv, nicht abwählbar
 *  - `marketing`  → externe Inhalte (Partner-Vergleichsrechner, form.partner-versicherung.de).
 *                   Setzt Cookies/Tracking und überträgt Daten (z. B. IP-Adresse) an Dritte.
 */

export type ConsentPurpose = "necessary" | "marketing";

export interface ConsentState {
  necessary: boolean;
  marketing: boolean;
}

export const CONSENT_STORAGE_KEY = "tarifvergleich-consent-v1";

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  marketing: false,
};

/** Liest den gespeicherten Consent. `null`, wenn noch keine Entscheidung vorliegt. */
export function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      necessary: true,
      marketing: parsed.marketing === true,
    };
  } catch {
    // localStorage kann in privaten Fenstern / blockierten Cookies werfen.
    return null;
  }
}

/** Persistiert den Consent. Fehler (z. B. blockiertes Storage) werden ignoriert —
 *  die Einwilligung gilt dann nur für die aktuelle Session. */
export function persistConsent(state: ConsentState): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // bewusst ignorieren
  }
}
