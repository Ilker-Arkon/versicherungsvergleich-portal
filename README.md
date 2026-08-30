# TarifVergleich — Versicherungs- & Finanzvergleichsportal

Ein deutsches Vergleichsportal für Versicherungs- und Finanzprodukte (KFZ, Haftpflicht, Hausrat, PKV, BU, Baufinanzierung u. v. m.). Gebaut mit **Next.js 16** (App Router, Turbopack), **React 19**, **Tailwind CSS v4** und **Lucide Icons**.

## Features

- **27 Detailseiten** in 5 Kategorie-Route-Groups (`(mobilitaet)`, `(sach-wohnen)`, `(gesundheit)`, `(vorsorge)`, `(finanzen)`).
- **Live-Partner-Rechner** je Sparte (`components/PartnerWidget.tsx`) mit Single-Injection-Guard gegen doppelte iframes (React StrictMode).
- **Ehrliche Leistungstabellen** (`components/Leistungsvergleich.tsx`) statt fiktiver Preise.
- **Vollständige SEO-Grundlage:** `robots.ts`, `sitemap.ts`, `not-found.tsx`, `metadataBase`/`openGraph`, Per-Page-Metadata via `lib/seo.ts`, Favicon (`app/icon.svg`).

## Lokal starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

## Produktions-Build

```bash
npm run build
npm run start
```

## Widgets automatisiert prüfen

```bash
node scripts/verify-widgets.mjs
```

Der Test lädt jede Detailseite in headless Chrome und prüft, dass genau **1** sichtbarer Rechner gerendert wird (braucht einen laufenden Dev-Server und ein installiertes Google Chrome).

## Deploy

```bash
npx vercel --prod --yes
```

## Wichtige Hinweise

- **Produktion:** `NEXT_PUBLIC_SITE_URL` setzen (steuert `metadataBase`, `robots.txt` und `sitemap.xml`). Default ist `http://localhost:3000`.
- **Offene Compliance-Punkte:** Marketing-Behauptungen („TÜV-geprüft", „Testsieger", Nutzerzahlen), Impressum-Angaben und fiktive Anbieternamen müssen vor dem nächsten Livegang verifiziert werden — siehe `PROJECT_STATUS.md`.
- **Aufgaben & Plan:** Der aktuelle Stand offener Arbeit liegt in `TASKS.md`.
