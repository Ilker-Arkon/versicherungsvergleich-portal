# ✅ Checkliste — Erledigt vs. Offen (Abrechnungsgrundlage)

> **Zweck:** Vollständige Übersicht über alle **gelieferten Leistungen** (erledigt)
> und alle **noch ausstehenden Arbeiten** (offen) — als Grundlage für die
> Rechnungsstellung.
>
> **Stand:** 31. August 2026 · Commit `5f0e820` · Branch `master`
>
> **Abgrenzung zu anderen Dateien:**
> - `TASKS.md` — laufende Arbeitsliste (Quelle der Wahrheit für offene Punkte)
> - `ROADMAP.md` — korrekte Ausführungsreihenfolge (Abhängigkeiten)
> - `PROJECT_STATUS.md` — technisches Handover für Entwickler
> - **`CHECKLISTE.md` (diese Datei)** — konsolidierte Abrechnungsübersicht

---

## ✅ Erledigt — gelieferte Leistungen

### 1. Bugfix & technische Qualität

| Leistung | Datum | Beschreibung |
|---|---|---|
| Doppelte Live-Rechner behoben | 30.08. | Root-Cause: React StrictMode → Partner-Skript 2× geladen → 2 iframes. Fix: Single-Injection-Guard in `components/PartnerWidget.tsx`. |
| Automatisierte Verifikation | 30.08. | `scripts/verify-widgets.mjs` + `playwright-core` (headless Chrome): jede Seite rendert genau **1** Rechner. |
| Statische `ComparisonTable` entfernt | 30.08. | 14 Unterseiten: fiktive Beispieltabelle (Preise/Anbieternamen) entfernt. |
| Ehrlicher `Leistungsvergleich` | 30.08. | `components/Leistungsvergleich.tsx` + `lib/leistungen.ts` — sachliche Leistungsmerkmale (Basis/Komfort/Premium) statt erfundener Preise. |

### 2. Struktur & Architektur

| Leistung | Datum | Beschreibung |
|---|---|---|
| Ordnerstruktur bereinigt | 30.08. | 27 Detailseiten in 5 Route Groups: `(mobilitaet)`, `(sach-wohnen)`, `(gesundheit)`, `(vorsorge)`, `(finanzen)`. URLs unverändert. |
| Verwaiste Seiten geklärt | 30.08. | `haftpflicht-hausrat` + `lebensversicherung` als echte Subkategorien in `lib/data.ts` aufgenommen, verlinkt, mit eigener Seite + Metadata. |
| Gefährlicher Generator entfernt | 30.08. | `build_all_pages.js` gelöscht (schrieb alte flache Pfade + fiktive Tarifdaten). |
| Ungenutzter Code entfernt | 30.08. | `ComparisonTable.tsx`, `InteractiveCalculator.tsx`, Boilerplate-SVGs (`public/`) gelöscht. |

### 3. SEO-Grundlage & Performance

| Leistung | Datum | Beschreibung |
|---|---|---|
| Sitemap & Robots & 404 | 30.08. | `app/sitemap.ts` (dynamisch aus `CATEGORIES`), `app/robots.ts`, `app/not-found.tsx` (gebrandet). |
| Metadata-Basis | 30.08. | `metadataBase` + `openGraph` + Title-Template in `layout.tsx`. |
| Per-Page-Metadata | 30.08. | `lib/seo.ts` → `subcategoryMetadata(slug)` für alle Detailseiten. |
| Favicon | 30.08. | `app/icon.svg` (blau→cyan Gradient + Schild-Checkmark). |
| OG-/Social-Preview-Images | 31.08. | Dynamischer Generator `app/api/og/route.tsx` (`ImageResponse`), pro Seite `openGraph.images` + `twitter`-Card. |
| JSON-LD `Organization` | 31.08. | Strukturierte Daten im `layout.tsx`. |
| Canonical-URLs | 31.08. | Auf allen Seiten (Detailseiten via `lib/seo.ts`, Homepage + statische Seiten). |
| Bild-Optimierung | 31.08. | `loading="lazy"` + `decoding="async"` + `width`/`height` auf Hero-Bildern. |

### 4. Compliance — technische Vorbereitung

| Leistung | Datum | Beschreibung |
|---|---|---|
| Cookie-Consent-Banner | 31.08. | `CookieConsentProvider.tsx` (Context + `localStorage`), `CookieConsentBanner.tsx` (Erst-Banner, Einstellungs-Dialog, Reopen), `lib/cookieConsent.ts`. |
| Consent-gated Widgets | 31.08. | `PartnerWidget` lädt Partner-Skripte/-iFrames **erst nach** Marketing-Einwilligung (sonst Platzhalter „Rechner freischalten"). |

### 5. Kontakt & Support

| Leistung | Datum | Beschreibung |
|---|---|---|
| Kontaktformular | 31.08. | `/kontakt` + `ContactForm.tsx` (`useActionState`), Server Action (`app/kontakt/actions.ts`) mit Honeypot, Server-Validierung, Consent-Checkbox. |
| E-Mail-Hook | 31.08. | `lib/mailer.ts` — austauschbarer Versand-Hook (Console-Fallback, Resend beim Livegang). |
| WhatsApp-Button | 31.08. | Schwebender Button (grün) auf allen Seiten. |
| Anrufen-Button | 31.08. | Schwebend (blau, **über** WhatsApp) + im Header — `components/ContactFab.tsx`. |
| Header-Kontakt-Buttons | 31.08. | „Anrufen" + „WhatsApp" in `components/Navbar.tsx` (leicht zugänglich, `xl+` mit Textlabel). |
| Mobilnummer umgestellt | 31.08. | `CUSTOMER_PROFILE.phone` → `+49 1525 2592531` (zentrale `tel:`-Quelle, Header + Footer + Floating). |
| Zentrale Link-Konstanten | 31.08. | `PHONE_URL` + `WHATSAPP_URL` in `lib/site.ts`. |

### 6. Barrierefreiheit — Kernfixes

| Leistung | Datum | Beschreibung |
|---|---|---|
| Skip-Link | 31.08. | „Zum Inhalt springen" + `<main id="main-content">` in `layout.tsx`. |
| Fokus-Styling | 31.08. | Globaler `:focus-visible`-Outline in `globals.css`. |
| FAQ-Accordion | 31.08. | `useId`, `aria-expanded`, `aria-controls`, `role="region"`. |
| Live-Region | 31.08. | Rechner-Loading als `role="status"` / `aria-live`. |
| Navbar | 31.08. | `aria-haspopup` auf Dropdown-Buttons, dekorative Icons `aria-hidden`. |

### 7. Handover & Dokumentation

| Leistung | Datum | Beschreibung |
|---|---|---|
| Projekt-Status | 30.08. | `PROJECT_STATUS.md` aktualisiert. |
| README | 30.08. | Echte Projekt-Infos statt `create-next-app`-Boilerplate. |
| Roadmap | 31.08. | `ROADMAP.md` — Ausführungsreihenfolge nach Abhängigkeiten. |

---

## ⏳ Offen — noch ausstehende Arbeiten

### 🔴 Compliance / Recht — **BLOCKIERT** (Anwaltskanzlei nach Registrierung)

> Die vollständigen Rechtstexte werden von der Kanzlei bereitgestellt und **vor
> Veröffentlichung** eingespielt. **Keinen Rechtsinhalt selbst schreiben** — nur
> technische Vorbereitung.

- [ ] **Impressum** (§ 5 DDG): Firma, Anschrift, Vertretung, USt-ID, Aufsichtsbehörde, `Vermittlerregister`-Nr.
- [ ] **Datenschutzerklärung** (DSGVO): Partner-iFrames, Tracking, Drittdienste, Betroffenenrechte
- [ ] **Erstinformation** (§ 15 VersVermV) inhaltlich gegenprüfen
- [ ] **AGB + Widerrufsbelehrung** (falls eigene Leistung / Lead-Weiterleitung)
- [ ] **AV-Verträge / Partnervereinbarungen** mit Vermittlern & Trackern
- [ ] **Behauptungen verifizieren**: „TÜV-geprüft", „Stiftung Warentest & Focus Money Testsieger", „150.000+ Nutzer", „4,9/5", konkrete Ersparnisse
- [ ] **Impressum-Angaben gegenprüfen** („Versicherungsmakler § 34d GewO", IHK Nürnberg, `Vermittlerregister`)
- [ ] **Fiktive Anbieternamen/-preise** rechtlich bewerten (Allianz Direct, HUK24, AXA, CosmosDirekt …)

### 🟡 Branding, Domain & Infrastruktur

- [ ] **Domain** registrieren (z. B. `tarifvergleich.de`) und auf Vercel anbinden
- [ ] **Firmen-/Markenname** festlegen (steuert Logo, E-Mail, Impressum)
- [ ] **Professionelles Logo** (Vektor/SVG, Favicon-Varianten, OG-Image/Social-Preview)
- [ ] **E-Mail-Postfach** (domaingebunden, z. B. `info@…` / `kontakt@…`) — ersetzt private Gmail
- [ ] **`NEXT_PUBLIC_SITE_URL`** für Produktion setzen (steuert `metadataBase`, `robots.txt`, `sitemap.xml`)

### 🟡 Kontakt & Support (Reste)

- [ ] **Support-/Öffnungszeiten** + Reaktionszeit angeben (schafft Vertrauen)

### 🟢 Technischer Feinschliff

- [ ] **Formular-Backend** finalisieren (Resend/Nodemailer) — Server Action + Honeypot fertig, Versand-Hook vorbereitet
- [ ] **DSGVO-konforme Analytics** (Plausible/Matomo statt Google Analytics)
- [ ] **Barrierefreiheit — vertieft**: Farbkontrast (z. B. `text-slate-400` unter 4.5:1) + Headings-Hierarchie (h1→h3-Sprünge)
- [ ] **SEO-/Performance-Messung**: Lighthouse / Core-Web-Vitals-Lauf

---

## 📊 Zusammenfassung

| Bereich | Erledigt | Offen |
|---|---|---|
| Bugfix & Qualität | 4 | 0 |
| Struktur & Architektur | 4 | 0 |
| SEO & Performance | 8 | 1 (Lighthouse-Messung) |
| Compliance | 2 (technisch) | 8 (Kanzlei-Blocker) |
| Kontakt & Support | 7 | 1 (Öffnungszeiten) |
| Barrierefreiheit | 5 | 1 (vertieft) |
| Branding/Domain/Infra | 0 | 5 |
| Handover & Doku | 3 | 0 |
