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

## 🎨 2. Getroffene Design- & Inhaltsentscheidungen

1. **Startseite (`app/page.tsx`):**
   * **Hero-Bereich:** Klassischer, vertrauensvoller blauer Gradient (`bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700`) mit dem Unsplash-Bild (Unterschrift/Dokumente) und 2 klaren CTA-Buttons (KFZ & Haftpflicht).
   * **Inhalt & Texte:** Kaufpsychologisch optimierte NotebookLM-Texte (*„Tarife vergleichen. Sofort sparen.“*, *„Bereit für Ihren Fixkosten-Check?“*).
   * **Statistiken & Kacheln:** 3 prominente Trust-Boxen (`100% Kostenlos`, `300+ Versicherer`, `850€ Ersparnis`) + 4 große Bildkacheln für Top-Sparten.
   * **Vorteile & FAQs:** 6 Vorteile-Kacheln mit blauen Icons + ausklappbare `GENERAL_FAQS`.

2. **Navigation (`components/Navbar.tsx`):**
   * Trust-Leiste ganz oben (*100% Kostenlos & Unverbindlich*, *4.9/5 Bewertungen*, *In 3 Min. zum Besttarif*, *TÜV-Datenschutz*).
   * Menü-Dropdowns mit Hover-Debounce (kein plötzliches Zuklappen), voller Breite und ohne störende Scrollbalken.

3. **Unterseiten / Ratgeber:**
   * Ausführliche Ratgeber-Sektionen auf den Detailseiten (`/berufsunfaehigkeit`, `/wohngebaeude-versicherung`, `/rechtsschutz-versicherung`, `/haftpflicht`, `/unfallversicherung`, `/pkv`).

---

## 📌 3. Offene Aufgaben & Nächste Schritte (Roadmap)

### 🔴 Prio 1: Doppelte Vergleichstabellen entfernen (Performance)
* **Problem:** Auf vielen Unterseiten werden aktuell versehentlich zwei Vergleichstabellen / Widgets geladen.
* **Ziel:** Jede Unterseite darf nur **eine einzige, saubere und performante Tabelle** enthalten, um Ladezeiten, JavaScript-Overhead und Layout-Verschiebungen (CLS) drastisch zu reduzieren.

### 🟡 Prio 2: Unterseiten-Design fertigstellen & vereinheitlichen
* **Ziel:** Das visuelle Erscheinungsbild aller Unterseiten an das überarbeitete Design der Startseite anpassen (Typografie, Farbgebung, harmonische Card-Container).

---

## 🛠️ 4. Wichtige Befehle

* **Lokaler Dev-Server:** `npm run dev`
* **Produktions-Build prüfen:** `npm run build`
* **Live-Deploy via Vercel CLI:** `npx vercel --prod --yes`
* **Git Sync:** Immer `master` und `main` synchron halten (`git merge master` auf `main`).
