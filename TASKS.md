# ✅ Aufgaben & Plan — TarifVergleich Portal

> **Diese Datei wird von jeder neuen Session automatisch geladen** (via `CLAUDE.md` → `@TASKS.md`).
> Stand: 30. August 2026 · Letzte Änderung: siehe Git-Log

## Legende

- `[ ]` offen · `[x]` erledigt
- 🔴 kritisch · 🟡 wichtig · 🟢 nice-to-have
- Diese Datei ist die **einzige Quelle der Wahrheit** für offene Arbeit. Erledigte Punkte auf `[x]` setzen und unter „Erledigt" dokumentieren.

---

## 🔴 Prio 1 — Doppelte Rechner beseitigen (ZWEI getrennte Probleme)

### Problem A — der EIGENTLICHE Bug: zwei identische LIVE-Rechner (iframes)
**Root-Cause (am 30.08. bestätigt):** Next.js App Router hat Strict Mode standardmäßig AN
(`next.config.ts` → `reactStrictMode` default `true`). Dadurch wird der `useEffect` in
`components/PartnerWidget.tsx` in dev **doppelt** ausgeführt → das Partner-Skript
(`form.partner-versicherung.de/.../*-iframe.js`) wird **zweimal** geladen. Das Skript hängt
seinen iframe per `appendChild(host)` an denselben Container (`tcpp-iframe-*`) — ohne
Idempotenz-Check → **zwei identische Rechner übereinander**.

**Fix (30.08.):** Single-Injection-Guard in `components/PartnerWidget.tsx`:
- `injectedKeyRef` (`useRef`) merkt sich `scriptSrc::containerId`.
- Zweiter Strict-Mode-Lauf bricht früh ab (kein zweites Skript).
- `innerHTML=''` aus dem Cleanup entfernt (hätte beim Remount das iframe-Ziel gelöscht).

**Verifiziert (30.08., headless Chrome via `playwright-core` + `scripts/verify-widgets.mjs`):**
jede Seite rendert genau **1** sichtbaren Rechner:
`kfz` ✅ · `motorrad` ✅ (2. iframe = 0×0-Cookie-Tracker, kein Rechner) · `haftpflicht` ✅ ·
`hausrat` ✅ · `pkv` ✅ · `rechtsschutz` ✅ · `haftpflicht-hausrat` je Tab genau 1 ✅

- [x] Root-Cause identifiziert (StrictMode-Doppel-Mount → Skript 2× → 2 iframes)
- [x] Fix implementiert (`PartnerWidget.tsx`)
- [x] Fix per headless-Chrome automatisiert verifiziert

### Problem B — statische `ComparisonTable` zusätzlich zum Live-Rechner (Redundanz)
14 Unterseiten renderten früher **zusätzlich** eine statische Beispieltabelle mit fiktiven
Preisen unterhalb des Live-Rechners. Das war eine *separate* Redundanz (nicht der
Doppel-Rechner-Bug oben).

- [x] `ComparisonTable` auf den 14 Seiten entfernt (Import, `TariffRow[]`-Block, JSX-Block). Verifiziert: 0 Treffer in `app/`.
- [x] **Ersetzt (30.08.), wieder entfernt (31.08.):** Ehrliche `Leistungsvergleich`-Tabelle wurde eingebaut, dann aber wegen **ungeprüfter fachlicher Aussagen** (Compliance-Risiko) wieder entfernt. Eigene Leistungstabellen bleiben bis zur fachlichen Freigabe durch den Makler draußen — die verbindlichen Tarife/Leistungen liefert der Live-Rechner.

---

## 🟡 Prio 2 — Ordnerstruktur an Kategorie-Hierarchie anpassen

**Ist:** 25 Unterseiten liegen flach in `app/`, die 5 Kategorien aus `lib/data.ts` (`mobilitaet`, `sach-wohnen`, `gesundheit`, `vorsorge`, `finanzen`) sind im Dateisystem nicht abgebildet.

- [x] **Ansatz gewählt (30.08.):** Route Groups — URLs bleiben identisch, nur Dateisystem wird sauberer.
- [x] Seiten in 5 Kategorie-Gruppen umgezogen: `(mobilitaet)`, `(sach-wohnen)`, `(gesundheit)`, `(vorsorge)`, `(finanzen)`. Rechtstexte + `ratgeber` bleiben auf `app/`-Root.
- [x] Verwaiste Seiten geklärt (30.08.): `haftpflicht-hausrat` + `lebensversicherung` in `lib/data.ts` als echte Subkategorien aufgenommen (→ in Navigation/Startseite verlinkt) und mit eigenen Seiten + Per-Page-Metadata ausgestattet.
- [x] `build_all_pages.js` gelöscht (30.08. — gefährlicher Generator, schrieb alte flache Pfade + fiktive Tarifdaten; würde echte Seiten überschreiben)

---

## 🔴 Prio 3 — SEO-Grundlage

- [x] `app/sitemap.ts` angelegt (dynamisch aus `CATEGORIES` + statischen Seiten)
- [x] `app/robots.ts` angelegt
- [x] `app/not-found.tsx` angelegt
- [x] `metadataBase` + `openGraph` in `layout.tsx` gesetzt
- [x] Per-Page-Metadata: `subcategoryMetadata(slug)` in `lib/seo.ts` für alle Detailseiten (aus `CATEGORIES` abgeleitet); `haftpflicht-hausrat` über eigenes `layout.tsx` (Seite behält `'use client'` wegen Tab-`useState`)
- [x] Rechtstexte (`impressum`, `datenschutz`, `erstinformation`) + `ratgeber` von `'use client'` zu Server Components umgebaut, damit `metadata` greift

---

## 🟢 Prio 4 — Aufräumen & Branding

- [x] `components/InteractiveCalculator.tsx` gelöscht (ungenutzt)
- [x] `components/ComparisonTable.tsx` gelöscht (seit 30.08. **komplett ungenutzt** — alle 14 Verwendungen entfernt)
- [x] `public/` Boilerplate-SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) entfernt
- [x] Favicon gesetzt: `app/icon.svg` (blau→cyan Gradient + Schild-Checkmark, passt zu `from-blue-600 to-cyan-500`-Branding)

---

## 🟡 Prio 5 — Kontakt & Support bereitstellen

- [x] **WhatsApp / Live-Chat** — schwebender Button unten rechts **und** im Header (`components/ContactFab.tsx` + `components/Navbar.tsx`); sichtbar, sobald `NEXT_PUBLIC_WHATSAPP_NUMBER` gesetzt ist
- [x] **Telefonnummer** (Mobil +49 1525 2592531) — als `tel:`-Link in Header-Trust-Bar, schwebendem „Anrufen"-Button (über WhatsApp) und Footer verlinkt
- [x] **Kontaktformular** (`/kontakt` + Server Action + Honeypot + Server-Validierung + Consent-Checkbox; E-Mail-Versand als austauschbarer Hook in `lib/mailer.ts`, Resend folgt beim Livegang)
- [ ] **Professionelle E-Mail-Adresse** (domaingebunden, z. B. `info@…` / `kontakt@…`)
- [ ] **Support-/Öffnungszeiten** + Reaktionszeit angeben (schafft Vertrauen)

---

## 🔴 Prio 6 — Rechtstexte & Compliance vollständig machen

> **Hinweis (31.08.):** Die vollständigen Rechtstexte (Impressum, Datenschutz, Erstinformation, AGB)
> werden von einer **Anwaltskanzlei nach der Registrierung** bereitgestellt und **vor Veröffentlichung**
> eingespielt. Hier also **keinen Rechtsinhalt selbst schreiben** — nur technische Vorbereitung.

- [ ] **Impressum** (§ 5 DDG): Firma, Anschrift, Vertretung, USt-ID, Aufsichtsbehörde, `Vermittlerregister`-Nr.
- [ ] **Datenschutzerklärung** (DSGVO): Partner-iFrames, Tracking, Drittdienste, Betroffenenrechte
- [x] **Cookie-Consent-Banner** (Einwilligung für Tracking + Partner-Skripte — zwingend, weil die Partner-Widgets Cookies setzen)
- [ ] **Erstinformation** (§ 11 VersVermV) inhaltlich gegenprüfen
- [ ] **AGB + Widerrufsbelehrung** (falls eigene Leistung/Lead-Weiterleitung angeboten wird)
- [ ] **AV-Verträge / Partnervereinbarungen** mit Vermittlern & Trackern

---

## 🟡 Prio 7 — Branding, Domain & Infrastruktur

- [ ] **Domain** registrieren (z. B. `tarifvergleich.de`) und auf Vercel anbinden
- [ ] **Firmen-/Markenname** festlegen (steuert Logo, E-Mail, Impressum)
- [ ] **Professionelles Logo** (Vektor/SVG, Favicon-Varianten, OG-Image/Social-Preview)
- [ ] **E-Mail-Postfach** einrichten (Google Workspace / Microsoft 365 / eigener Mailserver)
- [ ] **`NEXT_PUBLIC_SITE_URL`** für Produktion setzen (steuert `metadataBase`, `robots.txt`, `sitemap.xml`)

---

## 🟢 Prio 8 — Technischer Feinschliff

- [ ] **Formular-Backend**: E-Mail-Versand finalisieren (Resend/Nodemailer). Server Action + Honeypot-Spam-Schutz sind fertig (`app/kontakt/actions.ts`), Versand-Hook vorbereitet (`lib/mailer.ts`).
- [ ] **DSGVO-konforme Analytics** (z. B. Plausible/Matomo statt Google Analytics)
- [x] **OG-/Social-Preview-Images** pro Seite
- [x] **Barrierefreiheit — Kernfixes**: Skip-Link (`layout.tsx`), globaler `:focus-visible`-Fokus (`globals.css`), FAQ-Accordion `aria-expanded`/`aria-controls`, Live-Region im Rechner-Loading, dekorative Icons `aria-hidden`, Navbar `aria-haspopup`.
- [ ] **Barrierefreiheit — vertieft**: Farbkontrast-Messung (z. B. `text-slate-400`-Stellen unter 4.5:1) + Headings-Hierarchie (h1→h3-Sprünge) beheben.
- [x] **SEO-/Performance-Audit — Meta & Struktur**: JSON-LD `Organization` (`layout.tsx`), canonical auf allen Seiten (Detailseiten via `lib/seo.ts`, statische Seiten + Homepage), `loading="lazy"`/`decoding="async"` auf Hero-Bildern.
- [ ] **SEO-/Performance-Audit — Messung**: Lighthouse/Core-Web-Vitals-Lauf + Analytics (Plausible/Matomo) stehen noch aus.

---

## ⚠️ Querschnitt — Compliance / Recht (vor nächstem Livegang klären)

- [ ] Behauptungen verifizieren: „TÜV-geprüft", „Stiftung Warentest & Focus Money Testsieger", „150.000+ Nutzer", „4,9/5", konkrete Ersparnisse
- [ ] Impressum-Angaben („Versicherungsmakler § 34d GewO", IHK Nürnberg, `Vermittlerregister`) mit Auftraggeber gegenprüfen
- [ ] Fiktive Anbieternamen/-preise (Allianz Direct, HUK24, AXA, CosmosDirekt …) rechtlich bewerten

---

## 📦 Handover

- [x] `PROJECT_STATUS.md` aktualisiert (SEO-Grundlage + Aufräumen als erledigt, offene Compliance-Punkte dokumentiert)
- [x] `README.md` um echte Projekt-Infos ersetzt (kein `create-next-app`-Boilerplate mehr)

---

## ✅ Erledigt

- [x] (30.08.) **Doppelte Live-Rechner behoben:** Single-Injection-Guard in `PartnerWidget.tsx` gegen StrictMode-Doppel-Mount. Headless-Chrome-Verifikation: jede Seite genau 1 Rechner.
- [x] (30.08.) Statische `ComparisonTable` auf 14 Seiten entfernt (separate Redundanz, reversibel).
- [x] (30.08.) Ordnerstruktur: 27 Detailseiten in 5 Route Groups (`(mobilitaet)`, `(sach-wohnen)`, `(gesundheit)`, `(vorsorge)`, `(finanzen)`) umgezogen, URLs unverändert.
- [x] (30.08.) Test-Harness: `scripts/verify-widgets.mjs` + `playwright-core` (devDependency) zum automatisierten Prüfen der iframe-Anzahl.
- [x] (30.08.) Ehrliche Leistungstabelle: `Leistungsvergleich`-Komponente (sachliche Leistungsmerkmale, keine erfundenen Preise/Bewertungen) auf 14 Seiten als Ersatz für `ComparisonTable` eingebunden. TS-Check grün, Rechner unverändert je 1.
- [x] (31.08.) **Eigene Leistungstabelle wieder entfernt:** `Leistungsvergleich`-Komponente + `lib/leistungen.ts` gelöscht, Einbindung aus allen 14 Seiten entfernt. Grund: ungeprüfte fachliche Leistungsmerkmale (u. a. Hausrat-„Elementarschäden“-Fehler) = Compliance-Risiko. Reversibel im Git-Verlauf, nach fachlicher Freigabe reaktivierbar.
- [x] (30.08.) **SEO-Grundlage fertig:** `robots.ts`, `sitemap.ts`, `not-found.tsx`, `metadataBase`+`openGraph` im Layout, Per-Page-Metadata via `lib/seo.ts`, Rechtstexte + `ratgeber` als Server Components. `next build` grün (38 statische Seiten).
- [x] (30.08.) **Aufräumen & Branding fertig:** `ComparisonTable`, `InteractiveCalculator`, `build_all_pages.js`, Boilerplate-SVGs gelöscht; Favicon `app/icon.svg` gesetzt.
- [x] (30.08.) **Handover:** `PROJECT_STATUS.md` + `README.md` aktualisiert.
- [x] (31.08.) **Cookie-Consent-Banner implementiert:** `components/CookieConsentProvider.tsx` (Context + `localStorage`), `components/CookieConsentBanner.tsx` (Erst-Banner, Einstellungs-Dialog, Reopen-Button), `lib/cookieConsent.ts`. `PartnerWidget` lädt Partner-Skripte/-iFrames **erst nach** Marketing-Einwilligung, sonst Platzhalter mit „Rechner freischalten". `app/layout.tsx` verdrahtet. Verifiziert via `scripts/verify-widgets.mjs` (Test 1: ohne Consent 0 Skripte/iframes; Test 2: mit Consent je 1 Rechner). `next build` grün (38 Seiten).
- [x] (31.08.) **OG-/Social-Preview-Images:** dynamischer Generator `app/api/og/route.tsx` (`ImageResponse` aus `next/og`), `lib/seo.ts` liefert pro Detailseite `openGraph.images` + `twitter`-Card (`summary_large_image`), `app/layout.tsx` Default-Bild. Verifiziert in dev + production (HTTP 200 PNG, Meta-Tags korrekt).
- [x] (31.08.) **Kontaktformular:** `/kontakt`-Seite + `components/ContactForm.tsx` (`useActionState`), Server Action `app/kontakt/actions.ts` (Honeypot + Server-Validierung + Consent-Check), austauschbarer E-Mail-Hook `lib/mailer.ts` (Console-Fallback, Resend beim Livegang). Footer + `sitemap.ts` verlinkt. `next build` grün (39 Seiten).
- [x] (31.08.) **WhatsApp-Button:** schwebender Chat-Button `components/WhatsAppButton.tsx` (unten rechts, `wa.me`-Link, vorausgefüllte Nachricht), in `app/layout.tsx` verdrahtet. Sichtbar erst mit `NEXT_PUBLIC_WHATSAPP_NUMBER` (international, ohne `+`); ohne Nummer ausgeblendet. Verifiziert (Build + Startseite zeigt `wa.me`-Link).
- [x] (31.08.) **Barrierefreiheit — Kernfixes:** Skip-Link („Zum Inhalt springen") + `<main id="main-content">` in `layout.tsx`; globaler `:focus-visible`-Outline in `globals.css`; FAQ-Accordion mit `useId`, `aria-expanded`, `aria-controls`, `role="region"`; Rechner-Loading als `role="status"`-Live-Region; dekorative Icons `aria-hidden`; Navbar-Dropdown `aria-haspopup`. `next build` grün. (Vertieft offen: Kontrast-Messung + Headings-Hierarchie.)
- [x] (31.08.) **SEO-/Performance-Audit — Meta & Struktur:** JSON-LD `Organization` (`app/layout.tsx`), canonical-URLs auf allen Seiten (Detailseiten via `subcategoryMetadata`, Homepage + statische Seiten), `loading="lazy"` + `decoding="async"` + `width`/`height` auf Hero-Bildern. Verifiziert (canonical + JSON-LD im HTML). `next build` grün. (Lighthouse-Messung + Analytics offen.)
