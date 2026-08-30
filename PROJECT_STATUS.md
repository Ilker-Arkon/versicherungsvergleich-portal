# 📋 TarifVergleich Portal — Projektstatus & Handover

> **Dokumentation für alle zukünftigen Sessions und Entwickler.**  
> Zuletzt aktualisiert: 30. August 2026

---

## 🎯 1. Projekt-Überblick & Architektur

* **Projektname:** TarifVergleich (Versicherungsvergleich Portal)
* **Framework:** Next.js 16 (App Router, Turbopack, Tailwind CSS, Lucide Icons)
* **GitHub Repository:** `https://github.com/Ilker-Arkon/versicherungsvergleich-portal`
* **Live Deployment (Vercel):** `https://eager-pythagoras-iota.vercel.app`
* **VS Code Workspace:** Integriert im Multi-Root-Workspace `AI-Projekte.code-workspace`

---

## 🎨 2. Umgesetzte Features & Design

1. **Startseite (`app/page.tsx`):**
   * **Hero-Bereich:** Klassischer, vertrauensvoller blauer Gradient (`bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800`) mit Texten (*„Tarife vergleichen. Sofort sparen.“*), Social-Proof-Zeile (4.9/5, 150k+ Nutzer, TÜV-geprüft).
   * **Schnellkarten & Bildkacheln:** 3 hervorgehobene Schnellkarten + 4 große Bildkacheln für Top-Sparten (KFZ, Haftpflicht, Hausrat, BU).
   * **Inhalte:** Trust-Badges (`bg-blue-50`), Spartenübersicht, exklusive Wechsel-Vorteile, Ratgeber-Vorschau (`GuidePreview`), Vorteile-Kacheln und FAQs.

2. **Navigation (`components/Navbar.tsx`):**
   * Trust-Leiste ganz oben (*100% Kostenlos & Unverbindlich*, *4.9/5 Bewertungen*, *In 3 Min. zum Besttarif*, *TÜV-Datenschutz*).
   * Menü-Dropdowns mit Hover-Debounce (kein plötzliches Zuklappen), voller Breite und ohne störende Scrollbalken.

3. **Live-Rechner & Widget-Schutz (`components/PartnerWidget.tsx`):**
   * **Single-Injection-Guard:** Schutz gegen React StrictMode / doppeltes Mounten. Verhindert, dass externe Partnerskripte (Mr-Money / Partner-Versicherung) doppelte iFrames in die Seite einfügen.
   * Auf allen Unterkategorien wird zuverlässig genau **1 Rechner** gerendert.

4. **Transparenter Leistungsvergleich (`components/Leistungsvergleich.tsx`):**
   * Ersetzt statische Test-Tarife durch übersichtliche, ehrliche Leistungskriterien je Sparte (Basis vs. Komfort vs. Premium).

5. **Struktur:**
   * 27 Detailseiten sind sauber in 5 Route Groups organisiert (`(mobilitaet)`, `(sach-wohnen)`, `(gesundheit)`, `(vorsorge)`, `(finanzen)`).

6. **SEO-Grundlage (erledigt 30.08.):**
   * `app/robots.ts` — `MetadataRoute.Robots` mit Sitemap-Verweis.
   * `app/sitemap.ts` — dynamisch aus `CATEGORIES` (statische Seiten + alle Unterseiten, Priority 0.8/weekly).
   * `app/not-found.tsx` — gebrandete 404-Seite.
   * `app/layout.tsx` — `metadataBase`, Title-Template (`%s | TarifVergleich`) + `openGraph`.
   * Per-Page-Metadata über `lib/seo.ts` → `subcategoryMetadata(slug)`, abgeleitet aus `CATEGORIES`.
   * Rechtstexte (`impressum`, `datenschutz`, `erstinformation`) + `ratgeber` zu Server Components umgebaut.
   * Favicon: `app/icon.svg` (blau→cyan Gradient + Schild-Checkmark).

7. **Aufräumen (erledigt 30.08.):**
   * Gelöscht: `components/ComparisonTable.tsx`, `components/InteractiveCalculator.tsx`, `build_all_pages.js`, Boilerplate-SVGs in `public/`.

---

## 🛠️ 3. Wichtige Befehle

* **Lokaler Dev-Server:** `npm run dev`
* **Produktions-Build prüfen:** `npm run build`
* **Widgets automatisiert prüfen:** `node scripts/verify-widgets.mjs` (braucht laufenden Dev-Server + system-Chrome)
* **Live-Deploy via Vercel CLI:** `npx vercel --prod --yes`
* **Git Remote:** `git push origin master`

---

## ⚠️ 4. Offene Punkte (vor Livegang)

* **Compliance / Recht (BLOCKIERT — wartet auf User-Input):**
  * Behauptungen verifizieren: „TÜV-geprüft", „Stiftung Warentest & Focus Money Testsieger", „150.000+ Nutzer", „4,9/5", konkrete Ersparnisse.
  * Impressum-Angaben („Versicherungsmakler § 34d GewO", IHK Nürnberg, `Vermittlerregister`) mit Auftraggeber gegenprüfen.
  * Fiktive Anbieternamen/-preise (Allianz Direct, HUK24, AXA, CosmosDirekt …) rechtlich bewerten.
* **Verwaiste Seiten klären:** `haftpflicht-hausrat` und `lebensversicherung` — entweder verlinken oder entfernen.
* **`NEXT_PUBLIC_SITE_URL`** für Produktion setzen (steuert `metadataBase`, `robots.txt`-Sitemap-URL und `sitemap.xml`-URLs; Default `http://localhost:3000`).
