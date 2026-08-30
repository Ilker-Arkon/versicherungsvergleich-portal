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
- [x] **Ersetzt (30.08.):** Ehrliche `Leistungsvergleich`-Tabelle (`components/Leistungsvergleich.tsx` + `lib/leistungen.ts`) — nur sachliche Leistungsmerkmale, **keine** Preise/Bewertungen/Anbieternamen — auf allen 14 Seiten eingebunden.

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
- [x] (30.08.) **SEO-Grundlage fertig:** `robots.ts`, `sitemap.ts`, `not-found.tsx`, `metadataBase`+`openGraph` im Layout, Per-Page-Metadata via `lib/seo.ts`, Rechtstexte + `ratgeber` als Server Components. `next build` grün (38 statische Seiten).
- [x] (30.08.) **Aufräumen & Branding fertig:** `ComparisonTable`, `InteractiveCalculator`, `build_all_pages.js`, Boilerplate-SVGs gelöscht; Favicon `app/icon.svg` gesetzt.
- [x] (30.08.) **Handover:** `PROJECT_STATUS.md` + `README.md` aktualisiert.
