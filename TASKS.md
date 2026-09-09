# ✅ Aufgaben & Plan — SicherVergleich Portal

> **Diese Datei wird von jeder neuen Session automatisch geladen** (via `CLAUDE.md` → `@TASKS.md`).
> Stand: 09. September 2026 · Sortierung: **Vom Einfachsten Richtung Schwer**

## Legende
- `[ ]` offen · `[x]` erledigt · `[⏸]` wartet auf externe Bereitstellung
- **Schwierigkeit:** 🟢 Leicht · 🟡 Mittel · 🔴 Komplex / Externe Abhängigkeit
- **KI-Zuweisung:**
  - ⚡ **Gemini Flash**: Schnelle Umsetzung, UI-Anpassungen, Skripte, Tests, CSS/HTML
  - 🧠 **Claude Sonnet (Thinking)**: Komplexe Backend-Logik, Sicherheitsanalysen, tiefes Debugging

---

## 📋 Aufgabenplan — Sortiert von Einfach nach Schwer

| Nr. | Aufgabe / Bereich | Stufe | Status | Empfohlene KI | Konkreter Arbeitsumfang |
|:---:|:---|:---:|:---:|:---:|:---|
| **01** | **Support- & Öffnungszeiten ergänzen** | 🟢 Leicht | [x] Erledigt (07.09.) | ⚡ **Gemini Flash** | Footer und `/kontakt` mit klaren Erreichbarkeitszeiten (Mo–Fr 09:00–18:00 Uhr) und Antwortgarantie versehen. |
| **02** | **Trust-Badges & Werbe-Claims bereinigen** | 🟢 Leicht | [x] Erledigt (07.09.) | ⚡ **Gemini Flash** | Unbelegte Behauptungen („TÜV-geprüft“, „150.000+ Nutzer“, „4,9/5“) in `HeroSection.tsx`, `data.ts` und `kfz-versicherung/page.tsx` durch 100% ehrliche, abmahnsichere Aussagen ersetzt. |
| **03** | **Hero-Bereich: Einheitliches Bild-Grid** | 🟢 Leicht | [x] Erledigt (07.09.) | ⚡ **Gemini Flash** | 3 weiße Boxen + 4 Bilder durch ein einheitliches, animiertes 6er-Bildkarten-Grid mit Zoom-Hover, dynamischem Gradient & Schnellwahl-Leiste ersetzt. |
| **04** | **Responsive Mobile Audit (375px)** | 🟢 Leicht | [x] Erledigt (07.09.) | ⚡ **Gemini Flash** | Playwright Mobile-Test (iPhone 375px): 6/6 Checks bestanden (Kein Überlauf, Burger-Menü mit ARIA-Accessibility, Rechner-Skalierung). |
| **05** | **Lighthouse Performance- & SEO-Messung** | 🟢 Leicht | [x] Erledigt (08.09.) | ⚡ **Gemini Flash** | Automatisiertes Lighthouse-Audit auf Live-Domain ausgeführt: Performance 93, Accessibility 91, Best Practices 100, SEO 100, CLS 0, FCP 1.1s. |
| **06** | **CSP- & Framing-Warnungen analysieren** | 🟡 Mittel | [x] Erledigt (09.09.) | ⚡ **Gemini Flash** | Untersuchung abgeschlossen: `idb.check24.de` ist ein harmloser Hintergrund-Sync-Frame von CHECK24 für Cookies/Cache; blockiert den eigentlichen Rechner nicht. |
| **07** | **Barrierefreiheit (Kontraste & Headings)** | 🟡 Mittel | **NÄCHSTER SCHRITT** | 🧠 **Claude Sonnet** | Farbkontraste (`text-slate-400` auf weiß) nach WCAG 2.1 AA anheben, Heading-Hierarchie (h1→h2→h3) semantisch bereinigen. |
| **08** | **E-Mail-Backend (IONOS SMTP / Nodemailer)** | 🟡 Mittel | [x] Erledigt (09.09.) | ⚡ **Gemini Flash** | Echter E-Mail-Versand über offizielles IONOS-Postfach `info@sichertarif.de` mit HTML-Vorlage, Absender-ReplyTo und Live-Test erfolgreich angebunden. |
| **09** | **Rechtstexte integrieren (Händlerbund)** | 🔴 Komplex | ⏸ Text nötig | ⚡ **Gemini Flash** | Sobald die Vorlagen vom Händlerbund vorliegen: 1:1 Einbindung in `/impressum`, `/datenschutz`, `/erstinformation` und `/agb`. |
| **10** | **Eigene Domain aufgeschaltet** | 🔴 Komplex | [x] Erledigt (08.09.) | ⚡ **Gemini Flash** | `sichertarif.de` & `www.sichertarif.de` mit Vercel DNS verbunden, SSL aktiv, SITE_URL gesetzt. |
| **11** | **Finale Go-Live-Abnahme** | 🔴 Komplex | ⏸ Nach 01–10 | ⚡ **Gemini Flash** | Vollständiger End-to-End-Smoke-Test aller 27 Rechner, Formulare und DSGVO-Einwilligungen unter Produktiv-Domain. |
| **12** | **24/7 Hybrid-Support (KI von 20:00 bis 08:00 Uhr)** | 🟡 Mittel | [ ] Offen | ⚡ **Gemini Flash** | Zeitgesteuerte Kundenbetreuung: Tagsüber (08:00–20:00 Uhr) persönlicher Berater (Telefon/WhatsApp), ab 20:00 Uhr bis 08:00 Uhr automatischer KI-Chatbot zur Kundenbetreuung. |
| **13** | **Logo Layout korrigieren** | 🟢 Leicht | [ ] Offen | ⚡ **Gemini Flash** | Fehler bei der Darstellung im Header beheben (Logo-Bereich anpassen, Kasten entfernen), sicherstellen dass das neue "sichervergleich" Logo perfekt auf Desktop & Mobile skaliert ohne weiße Ränder oben/unten. |

---

## ✅ Bereits vollständig erledigt & verifiziert

- [x] **Echtes E-Mail-Backend aktiv:** IONOS SMTP (`info@sichertarif.de`) via `nodemailer` angebunden. Live-Test und automatisierte Übertragung verifiziert (09.09.).
- [x] **Offizielle Domain-E-Mail überall hinterlegt:** `info@sichertarif.de` ersetzt die private Gmail in `CUSTOMER_PROFILE.email`, Kontaktseite, Footer, Impressum, Datenschutz und Erstinformation.
- [x] **Responsive Mobile Audit (33 Seiten über 5 Viewports):** Alle 27 Sparten + Homepage + Service-Seiten auf 360px bis 1280px mit 0 Überläufen verifiziert (09.09.).
- [x] **27 Kostenrechner auf allen Unterseiten aktiv:** Exakt 1 Rechner pro Seite, kein Doppel-Mount (Playwright: 27/27 OK).
- [x] **Partner-ID `75137` in allen Widgets & Direct-Links:** Vollständig verifiziert (27/27 OK).
- [x] **Cookie-Consent-Banner & DSGVO-Vorabsperre:** 0 Drittanbieter-Skripte vor Einwilligung, dynamische Nachladung nach Klick, Persistenz und Einstellungs-Dialog (Playwright: 15/15 Checks OK).
- [x] **Navigation, interne Links & 404:** Alle 33 Seiten liefern HTTP 200, Custom 404-Fehlerseite funktioniert (Playwright: 33/33 OK).
- [x] **Kontaktformular-Funktionstest:** Client-Validierung, Bot-Abwehr via Honeypot, Server Action (Playwright: 11/11 Checks OK).
- [x] **Next.js Production Build:** 40 Routen erfolgreich und fehlerfrei kompiliert (Turbopack + TypeScript 0 Fehler).
- [x] **Route Groups & saubere Architektur:** 27 Sparten in 5 Gruppen gegliedert (`mobilitaet`, `sach-wohnen`, `gesundheit`, `vorsorge`, `finanzen`).
- [x] **SEO-Grundlage:** Sitemap dynamisch, robots.txt, automatische OpenGraph-Images pro Sparte.
- [x] **Kontaktkanäle im Layout:** WhatsApp-Button, Anrufen-Button und `/kontakt`-Seite implementiert.
- [x] **Hero-Bereich Bild-Karten Redesign:** Einheitliches, animiertes 6er-Bildkarten-Grid mit sanftem Zoom-Hover, dynamischem Gradient-Overlay, Glassmorphism-Badges und Schnellwahl-Leiste (07.09.).
- [x] **Top-Bar & Branding Update:** Markenname auf "SicherVergleich" geändert, Trust-Bar im Header harmonisiert und erweitert (08.09.).
- [x] **Lighthouse Performance- & SEO-Messung:** Audit direkt gegen Live-Domain https://sichertarif.de bestanden — Performance: 93, Accessibility: 91, Best Practices: 100, SEO: 100, CLS: 0, FCP: 1.1s (08.09.).
- [x] **Vercel Projekt-Bereinigung:** Projekt von 'eager-pythagoras' in 'sichervergleich' umbenannt, package.json angepasst (08.09.).
