# 📋 TarifVergleich Portal — Projektstatus & Handover

> **Dokumentation für alle zukünftigen Sessions und Entwickler.**  
> Zuletzt aktualisiert: 07. September 2026 · Stand: Sprint 1 & Basissicherung abgeschlossen

---

## 🎯 1. Projekt-Überblick & Architektur

* **Projektname:** TarifVergleich (Versicherungsvergleich Portal)
* **Framework:** Next.js 16 (App Router, Turbopack, Tailwind CSS, Lucide Icons)
* **GitHub Repository:** `https://github.com/Ilker-Arkon/versicherungsvergleich-portal`
* **Live Deployment (Vercel):** `https://eager-pythagoras-iota.vercel.app`
* **VS Code Workspace:** Integriert im Multi-Root-Workspace `AI-Projekte.code-workspace`

---

## 🎨 2. Umgesetzte Features & Verifizierungen (Stand 07.09.)

1. **Live-Rechner & Widget-Schutz (`components/PartnerWidget.tsx`):**
   * **27 von 27 Kostenrechnern** vollständig verifiziert: Jeder Rechner rendert exakt 1 iFrame (kein Doppel-Mount).
   * **Partner-ID `75137`:** Auf allen 27 Seiten in Skripten und Direct-Links aktiv und geprüft.
   * **DSGVO Consent-Gate:** 0 Drittanbieter-Skripte vor Einwilligung, sofortige Freischaltung nach Klick.

2. **Cookie-Consent-Workflow (`components/CookieConsentBanner.tsx`):**
   * Vollständig getestet (15/15 Checks): Banner-Anzeige, Klick auf „Alle akzeptieren“, Ablehnen („Nur notwendige“), nachträgliche Aktivierung im Rechner-Placeholder, Einstellungs-Modal und Footer-Reopen.

3. **Navigation & Links (`components/Navbar.tsx` & `components/Footer.tsx`):**
   * 33 von 33 internen Links liefern HTTP 200 (keine Broken Links).
   * Gebrandete 404-Fehlerseite aktiv und verifiziert.
   * Mobiles Burger-Menü mit `aria-expanded` und semantischem `<nav>` optimiert.

4. **Kontaktformular & Spamschutz (`app/kontakt/page.tsx`):**
   * Client- & Server-Validierung, Honeypot-Bot-Abwehr und Server Action end-to-end verifiziert (11/11 Checks).

5. **Servicezeiten & Claims-Bereinigung:**
   * Erreichbarkeitszeiten (Mo–Fr 09:00–18:00 Uhr) in Footer und Kontaktseite hinterlegt.
   * Abmahngefährdete Werbeaussagen („TÜV-geprüft“, „150.000+ Nutzer“, „4,9/5“) durch seriöse Aussagen („Über 300 Tarife“, „100% Kostenlos & Unabhängig“) ersetzt.

6. **Mobile Responsiveness:**
   * Getestet auf 375px (iPhone SE): Kein horizontaler Überlauf, Burger-Menü öffnet zuverlässig, Rechner skalieren mobil.

---

## 🛠️ 3. Bereitgestellte Test-Befehle

* **Rechner-Batch-Test (27 Seiten):** `node scripts/test-all-calculators.mjs`
* **Cookie-Consent Workflow:** `node scripts/test-cookie-consent-flow.mjs`
* **Navigation- & 404-Audit:** `node scripts/test-navigation.mjs`
* **Kontaktformular-Test:** `node scripts/test-contact-form.mjs`
* **Mobile-Responsive Audit:** `node scripts/test-mobile-responsive.mjs`
* **Produktions-Build:** `npm run build`

---

## 🗺️ 4. Master-Aufgabenplan für die nächste Session (Einfach → Schwer)

| Nr. | Aufgabe / Bereich | Stufe | Status | Empfohlene KI | Nächste Aktion |
|:---:|:---|:---:|:---:|:---:|:---|
| **01** | Support- & Öffnungszeiten | 🟢 Leicht | [x] Erledigt | ⚡ Gemini Flash | Eingebaut in Footer & `/kontakt`. |
| **02** | Trust-Badges & Claims bereinigen | 🟢 Leicht | [x] Erledigt | ⚡ Gemini Flash | Unbelegte Behauptungen entfernt. |
| **03** | Hero-Bereich: Einheitliches Bild-Grid | 🟢 Leicht | [x] Erledigt | ⚡ Gemini Flash | 6er-Bildkarten-Grid mit Zoom-Hover & Schnellwahl umgesetzt. |
| **04** | Mobile Viewport Audit (375px) | 🟢 Leicht | [x] Erledigt | ⚡ Gemini Flash | 6/6 Tests auf 375px bestanden. |
| **05** | **Lighthouse Performance- & SEO-Messung** | 🟢 Leicht | **NÄCHSTER SCHRITT** | ⚡ **Gemini Flash** | Lighthouse-Audit für Core Web Vitals ausführen & dokumentieren. |
| **06** | **CSP- & Framing-Warnungen analysieren** | 🟡 Mittel | [ ] Offen | 🧠 **Claude Sonnet** | CHECK24-iFrame CSP Warnings (`idb.check24.de`) analysieren. |
| **07** | **Barrierefreiheit (Kontraste & Headings)** | 🟡 Mittel | [ ] Offen | 🧠 **Claude Sonnet** | Kontraste & Heading-Hierarchie nach WCAG 2.1 AA optimieren. |
| **08** | **E-Mail-Backend (Resend/Nodemailer)** | 🟡 Mittel | [ ] Offen | 🧠 **Claude Sonnet** | Console-Stub in `lib/mailer.ts` durch Resend API ersetzen. |
| **09** | **Rechtstexte integrieren (Händlerbund)** | 🔴 Komplex | ⏸ Wartet auf Vorlagen | ⚡ **Gemini Flash** | Texte vom Händlerbund 1:1 einbinden (Impressum, Datenschutz, Erstinfo, AGB). |
| **10** | **Eigene Domain & E-Mail aufschalten** | 🔴 Komplex | ⏸ Domain nötig | ⚡ **Gemini Flash** | Domain auf Vercel konfigurieren, `NEXT_PUBLIC_SITE_URL` setzen. |
| **11** | **Finale Go-Live-Abnahme** | 🔴 Komplex | ⏸ Nach 05–10 | ⚡ **Gemini Flash** | End-to-End-Smoke-Test unter Produktiv-Domain. |
