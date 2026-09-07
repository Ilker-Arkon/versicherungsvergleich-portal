# ✅ Aufgaben & Plan — TarifVergleich Portal

> **Diese Datei wird von jeder neuen Session automatisch geladen** (via `CLAUDE.md` → `@TASKS.md`).
> Stand: 07. September 2026 · Sortierung: **Vom Einfachsten Richtung Schwer**

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
| **03** | **Responsive Mobile Audit (375px & 768px)** | 🟢 Leicht | [ ] Offen | ⚡ **Gemini Flash** | Playwright-Skript zur automatischen Prüfung auf Smartphones & Tablets (Burger-Menü, Buttons, Rechner-Skalierung). |
| **04** | **Lighthouse Performance- & SEO-Messung** | 🟢 Leicht | [ ] Offen | ⚡ **Gemini Flash** | Automatisiertes Lighthouse-Audit ausführen, Core Web Vitals (LCP, CLS, FID) und SEO-Score dokumentieren. |
| **05** | **CSP- & Framing-Warnungen analysieren** | 🟡 Mittel | [ ] Offen | 🧠 **Claude Sonnet** | Browser-Konsolenmeldungen bei CHECK24-iFrames (`idb.check24.de`) untersuchen und saubere Konfiguration sicherstellen. |
| **06** | **Barrierefreiheit (Kontraste & Headings)** | 🟡 Mittel | [ ] Offen | 🧠 **Claude Sonnet** | Farbkontraste (`text-slate-400` auf weiß) nach WCAG 2.1 AA anheben, Heading-Hierarchie (h1→h2→h3) semantisch bereinigen. |
| **07** | **E-Mail-Backend (Resend/Nodemailer)** | 🟡 Mittel | [ ] Offen | 🧠 **Claude Sonnet** | Bisherigen Console-Stub in `lib/mailer.ts` durch echten E-Mail-Versand (Resend API) mit Benachrichtigungstemplate ersetzen. |
| **08** | **Rechtstexte integrieren (Händlerbund)** | 🔴 Komplex | ⏸ Text nötig | ⚡ **Gemini Flash** | Sobald die Vorlagen vom Händlerbund vorliegen: 1:1 Einbindung in `/impressum`, `/datenschutz`, `/erstinformation` und `/agb`. |
| **09** | **Eigene Domain & E-Mail-Postfach aufschalten** | 🔴 Komplex | ⏸ Domain nötig | ⚡ **Gemini Flash** | Echte Domain (z. B. `tarifvergleich.de`) auf Vercel konfigurieren, `NEXT_PUBLIC_SITE_URL` setzen und geschäftliche E-Mail hinterlegen. |
| **10** | **Finale Go-Live-Abnahme** | 🔴 Komplex | ⏸ Nach 01–09 | ⚡ **Gemini Flash** | Vollständiger End-to-End-Smoke-Test aller 27 Rechner, Formulare und DSGVO-Einwilligungen unter Produktiv-Domain. |

---

## ✅ Bereits vollständig erledigt & verifiziert

- [x] **27 Kostenrechner auf allen Unterseiten aktiv:** Exakt 1 Rechner pro Seite, kein Doppel-Mount (Playwright: 27/27 OK).
- [x] **Partner-ID `75137` in allen Widgets & Direct-Links:** Vollständig verifiziert (27/27 OK).
- [x] **Cookie-Consent-Banner & DSGVO-Vorabsperre:** 0 Drittanbieter-Skripte vor Einwilligung, dynamische Nachladung nach Klick, Persistenz und Einstellungs-Dialog (Playwright: 15/15 Checks OK).
- [x] **Navigation, interne Links & 404:** Alle 33 Seiten liefern HTTP 200, Custom 404-Fehlerseite funktioniert (Playwright: 33/33 OK).
- [x] **Kontaktformular-Funktionstest:** Client-Validierung, Bot-Abwehr via Honeypot, Server Action (Playwright: 11/11 Checks OK).
- [x] **Next.js Production Build:** 40 Routen erfolgreich und fehlerfrei kompiliert (Turbopack + TypeScript 0 Fehler).
- [x] **Route Groups & saubere Architektur:** 27 Sparten in 5 Gruppen gegliedert (`mobilitaet`, `sach-wohnen`, `gesundheit`, `vorsorge`, `finanzen`).
- [x] **SEO-Grundlage:** Sitemap dynamisch, robots.txt, automatische OpenGraph-Images pro Sparte.
- [x] **Kontaktkanäle im Layout:** WhatsApp-Button, Anrufen-Button und `/kontakt`-Seite implementiert.
