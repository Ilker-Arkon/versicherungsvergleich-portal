# 📋 SicherTarif Portal — Projektstatus & Handover

> **Dokumentation für alle zukünftigen Sessions und Entwickler.**  
> Zuletzt aktualisiert: 18. September 2026 · Stand: Sprint 2 (Ansprechpartner-Integration, Erreichbarkeits-Harmonisierung & KI-Chatbot Produktivbetrieb)

---

## 🎯 1. Projekt-Überblick & Architektur

* **Projektname:** SicherTarif (Versicherungsvergleich Portal)
* **Framework:** Next.js 16 (App Router, Turbopack, Tailwind CSS, Lucide Icons)
* **GitHub Repository:** `https://github.com/Ilker-Arkon/versicherungsvergleich-portal`
* **Live Deployment (Vercel):** `https://sichertarif.de` (Alias aktiv, SSL A+ aktiv)
* **Vercel Project:** `sichertarif` (`ilkers-projects-c05564a9/sichervergleich`)
* **VS Code Workspace:** Integriert im Multi-Root-Workspace `AI-Projekte.code-workspace`

---

## 🎨 2. Umgesetzte Features & Verifizierungen (Stand 18.09.)

1. **Ansprechpartner-Bereich & Berater-Präsentation (`components/AdvisorSection.tsx`):**
   * **Porträtfoto:** `public/berater-hueseyin-guelec.jpg` zentriert eingebunden (`objectPosition: "center 40%"` für perfekte Ausrichtung von Kopf, Schultern und Hemd).
   * **Typografie & Name:** Offizieller Anzeigename **Herr Gülec** in eleganter Serifenschrift (`next/font/google` -> `Playfair Display`).
   * **3-Spalten-Kontaktleiste:** Gleichmäßig aufgeteilter, responsiver Block (`WhatsApp | Anruf | Mail`) mit dezenten horizontalen Begrenzungslinien (`border-y border-slate-700/70`) und gleitender Unterstrich-Hover-Animation.
   * **Rechtliche Bereinigung:** Alle Nennungen von Paragrafen (§ 34d, § 15, BGB) sowie Steuerclaims („steuerbegünstigt“) aus Marketing- und Beratertexten vollständig entfernt.

2. **Erreichbarkeits-Harmonisierung & Servicezeiten:**
   * **Telefonzeiten:** Einheitlich portalweit auf **Mo. – Fr. 10:00 – 16:00 Uhr** gesetzt (`CUSTOMER_PROFILE.serviceHours`, Navbar, Footer, Kontaktseite, Rechner-Seiten).
   * **E-Mail-Kontaktpunkte:** E-Mail als klickbares Briefumschlag-Icon in der Navbar, dritter schwebender Button im `ContactFab` sowie klickbare `mailto:info@sichertarif.de`-Aktionen.

3. **24/7 Hybrid-Support & KI-Assistent (`components/ChatWidget.tsx`, `lib/chat.ts`, `lib/hybridHours.ts`):**
   * **Zeitsteuerung:** Tagsüber (Mo.–Fr. 10:00–16:00 Uhr) persönlicher Berater im Fokus; außerhalb der Telefonzeiten (Mo.–Fr. 16:00–10:00 Uhr und an Wochenenden ganztägig) übernimmt der KI-Assistent.
   * **Seitenwechsel-Persistenz:** Das Chat-Widget bleibt beim Navigieren durch Unterseiten geöffnet, der Gesprächsverlauf bleibt via `sessionStorage` nahtlos erhalten.
   * **Klickbare Rechner-Links:** URLs in Chat-Antworten werden als Buttons/Links formatiert. Klicks auf interne Rechner nutzen den Next.js Client-Router (`router.push`), sodass der Chat offen bleibt und die Seite im Hintergrund wechselt.
   * **Seitenerkennung (`currentPath`):** Das Widget übermittelt den aktuellen Pfad an `/api/chat`. Der Systemprompt reagiert spartenspezifisch und passgenau auf die Seite, auf der sich der Nutzer gerade befindet.
   * **Automatischer Retry & Ausfallsicherheit:** Bis zu 2 Abfrageversuche mit AbortController-Timeout und 800 ms Backoff bei temporären API-Aussetzern; grammatikalisch sauberer Fallback mit direktem Verweis auf Herrn Gülec.

4. **Live-Rechner & Widget-Schutz (`components/PartnerWidget.tsx`):**
   * **27 von 27 Kostenrechnern** vollständig verifiziert: Jeder Rechner rendert exakt 1 iFrame (kein Doppel-Mount).
   * **Partner-ID `75137`:** Auf allen 27 Seiten in Skripten und Direct-Links aktiv und geprüft.
   * **DSGVO Consent-Gate:** 0 Drittanbieter-Skripte vor Einwilligung, sofortige Freischaltung nach Klick.

5. **E-Mail-Backend (IONOS SMTP / Nodemailer):**
   * Echter E-Mail-Versand über offizielles IONOS-Postfach `info@sichertarif.de` mit HTML-Vorlage, Absender-ReplyTo und Live-Test erfolgreich angebunden.

---

## 🛠️ 3. Wichtige Befehle & Test-Suites

* **Produktions-Build:** `npm run build`
* **TypeScript-Check:** `npx tsc --noEmit`
* **Rechner-Batch-Test (27 Seiten):** `node scripts/test-all-calculators.mjs`
* **Cookie-Consent Workflow:** `node scripts/test-cookie-consent-flow.mjs`
* **Navigation- & 404-Audit:** `node scripts/test-navigation.mjs`
* **Kontaktformular-Test:** `node scripts/test-contact-form.mjs`
* **Mobile-Responsive Audit:** `node scripts/test-mobile-responsive.mjs`
* **Vercel Deployment:** `npx vercel --prod --yes`

---

## 🔑 4. Umgebungsvariablen & Vercel-Konfiguration

Folgende Umgebungsvariablen sind sowohl in `.env.local` als auch in Vercel (`Production`, `Preview`, `Development`) hinterlegt:

| Variable | Zweck |
|:---|:---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp-Direktkontakt (`4915252592531`) |
| `NEXT_PUBLIC_SITE_URL` | Offizielle Domain (`https://sichertarif.de`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | IONOS Mailserver (`smtp.ionos.de`, 465, true) |
| `SMTP_USER` / `SMTP_PASS` | Authentifizierung für `info@sichertarif.de` |
| `CONTACT_EMAIL` / `EMAIL_FROM` | Empfänger- & Absenderadresse |
| `DEEPSEEK_API_KEY` | API-Schlüssel für den automatischen Support-Chatbot |

> ⚠️ **Handover-Hinweis:** Der aktuell hinterlegte `DEEPSEEK_API_KEY` ist aktiv und mit Guthaben ausgestattet. Nach der Übergabe kann der Kunde jederzeit seinen eigenen Key in den Vercel Project Settings austauschen.
