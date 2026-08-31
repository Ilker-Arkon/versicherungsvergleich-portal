# 🗺️ Roadmap — TarifVergleich Portal

> **Reihenfolge nach Abhängigkeiten, nicht nach Prio.**
> Diese Datei ergänzt `TASKS.md` (Quelle der Wahrheit für offene Punkte) um die
> **korrekte Ausführungsreihenfolge** und die Begründung dafür.
> Stand: 31. August 2026

---

## Reihenfolge auf einen Blick

```
Phase 0  Grundlagen & Fakten klären        ← BLOCKIERT alles andere (Entscheidungen)
Phase 1  Compliance & Recht                ← Livegang-Blocker (zwingend)
Phase 2  Domain, Marke & Infrastruktur     ← Voraussetzung für E-Mail, Sitemap/OG
Phase 3  Kontakt & Support                 ← braucht Domain-E-Mail + Compliance
Phase 4  Technischer Feinschliff & Launch  ← erst sinnvoll, wenn 0–3 sitzen
```

**Warum genau diese Reihenfolge?** Compliance (Impressum, Datenschutz, Consent)
kann erst **korrekt** geschrieben werden, wenn die **Fakten** stimmen (Name,
Rechtsform, Register-Nr., verifizierte Behauptungen). Kontakt/Support wiederum
braucht eine **domaingebundene E-Mail** und eine **Datenschutzerklärung, die das
Formular abdeckt**. Technik-Feinschliff kommt zuletzt, weil er auf stabile
Entscheidungen aus 0–3 aufbaut.

---

## Phase 0 — Grundlagen & Fakten (Entscheidungen des Auftraggebers)

> **Blockiert:** Impressum, Datenschutz, alle Trust-Badges, Branding.
> Diese Punkte kann ich **nicht selbst** lösen — sie brauchen Input vom Auftraggeber.

- [ ] **Marken-/Firmenname + Rechtsform festlegen** (steuert Logo, E-Mail, Impressum)
- [ ] **Behauptungen verifizieren:** „TÜV-geprüft", „Stiftung Warentest & Focus Money
      Testsieger", „150.000+ Nutzer", „4,9/5", konkrete Sparpotenziale („bis 850 €",
      „über 330 Tarife", „über 400 Banken") — **Belege anfordern oder Texte entschärfen**
- [ ] **Vermittlerstatus gegenprüfen:** „Versicherungsmakler § 34d GewO", IHK Nürnberg,
      `Vermittlerregister`-Nr. — stimmt das wirklich? (TASKS.md: ⚠️ Querschnitt)
- [ ] **Fiktive Anbieternamen/-preise** (Allianz Direct, HUK24, AXA, CosmosDirekt …)
      rechtlich bewerten — stehen die bei uns oder nur im Partner-iFrame?

**Ergebnis dieser Phase:** eine verbindliche Faktenliste, aus der Impressum,
Datenschutz und alle Vertrauens-Badges abgeleitet werden können.

---

## Phase 1 — Compliance & Recht (Livegang-Blocker)

> **Reihenfolge innerhalb der Phase: Consent zuerst**, weil die Partner-Widgets
> **bereits jetzt** Cookies setzen (im Live-Deploy!). Jeder Tag ohne Banner ist ein
> laufender DSGVO-Verstoß.

- [x] **Cookie-Consent-Banner** — Einwilligung **vor** dem Laden der Partner-Skripte
      (`components/PartnerWidget.tsx`). Blockiert funktional. **(31.08. erledigt + verifiziert)**
- [ ] **Impressum korrigieren** — `app/impressum/page.tsx`: `§ 5 TMG` → **`§ 5 DDG`**,
      USt-ID, Vertretungsberechtigter, `Vermittlerregister`-Nr. (falls § 34d bestätigt)
- [ ] **Datenschutzerklärung ausbauen** — `app/datenschutz/page.tsx`: Partner-iFrames,
      Cookies/Tracking, Drittdienste (Mr-Money / Partner-Versicherung), Betroffenenrechte
      (vollständig), Aufbewahrungsfristen, Beschwerderecht bei Aufsichtsbehörde
- [ ] **Erstinformation (§ 15 VersVermV)** — `app/erstinformation/page.tsx` inhaltlich
      gegenprüfen und vervollständigen
- [ ] **AGB + Widerrufsbelehrung** — falls eigene Leistung/Lead-Weiterleitung angeboten wird
- [ ] **AV-Verträge / Partnervereinbarungen** — mit Vermittlern & Trackern dokumentieren

---

## Phase 2 — Domain, Marke & Infrastruktur

> **Voraussetzung** für: professionelle E-Mail, korrekte `metadataBase`/Sitemap/OG.

- [ ] **Domain registrieren** (z. B. `tarifvergleich.de`) und auf Vercel anbinden
- [ ] **Professionelles E-Mail-Postfach** (Google Workspace / Microsoft 365 / Mailserver) —
      ersetzt die private Gmail in `CUSTOMER_PROFILE.email`
- [ ] **Logo** (Vektor/SVG, Favicon-Varianten, OG-/Social-Preview-Image)
- [ ] **`NEXT_PUBLIC_SITE_URL`** auf die echte Domain setzen (behebt den `localhost`-
      Fallback in `lib/site.ts` → `metadataBase`, `robots.txt`, `sitemap.xml`)

---

## Phase 3 — Kontakt & Support

> **Abhängig von Phase 0–2:** Kontaktformular sammelt personenbezogene Daten →
> braucht Datenschutz + Consent + ein E-Mail-Backend.

- [ ] **Telefonnummer** (professionell, ggf. getrennt von privater Nummer)
- [x] **WhatsApp Business / Live-Chat-Widget** — schwebender Button (unten rechts) **(31.08. erledigt)**; aktivieren via `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [x] **Kontaktformular** — `/kontakt` + Server Action + Honeypot + Consent-Checkbox
      **(31.08. erledigt)**; E-Mail-Versand (Resend) folgt mit Domain.
- [ ] **Support-/Öffnungszeiten + Reaktionszeit** angeben (Vertrauen)

---

## Phase 4 — Technischer Feinschliff & Launch

> **Zuletzt**, baut auf stabilen Entscheidungen aus 0–3 auf.

- [ ] **Formular-Backend** finalisieren (Resend / Nodemailer)
- [ ] **DSGVO-konforme Analytics** (Plausible/Matomo statt Google Analytics)
- [x] **OG-/Social-Preview-Images** pro Seite **(31.08. erledigt + verifiziert)**
- [x] **Barrierefreiheit** — Skip-Link, Fokus-Styles, FAQ-ARIA, Live-Regionen **(31.08. erledigt)**; Kontrast-/Headings-Feinschliff offen
- [x] **SEO-/Performance-Audit** — JSON-LD, canonical, Bild-Optimierung **(31.08. erledigt)**; Lighthouse-Messung + Analytics offen
- [ ] **Go-Live-Checkliste** — erst nach Phase 0–4 vollständig abhaken

---

## 🎯 Nächster konkreter Schritt

Der höchste Hebel mit Livegang-Relevanz ist **Phase 1 → Cookie-Consent-Banner**,
weil das Skript-Laden bereits live passiert. Parallel dazu müssen die **Phase-0-
Fakten** beim Auftraggeber angefragt werden (ohne sie bleiben Impressum/Datenschutz
Stubs).
