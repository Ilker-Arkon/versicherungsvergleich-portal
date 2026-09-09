import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/Home/.gemini/antigravity/brain/2dc5e61b-4a81-478b-97cb-9bdd0ce0162e/audit-screenshots/full-site-verification';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const viewports = [
  { width: 360, height: 740, name: 'mobile-360' },
  { width: 375, height: 667, name: 'mobile-375' },
  { width: 390, height: 844, name: 'mobile-390' },
  { width: 768, height: 1024, name: 'tablet-768' },
  { width: 1280, height: 800, name: 'desktop-1280' },
];

const allPages = [
  // Mobilitaet
  { path: '/kfz-versicherung', name: 'kfz' },
  { path: '/motorrad-versicherung', name: 'motorrad' },

  // Sach & Wohnen
  { path: '/haftpflicht', name: 'haftpflicht' },
  { path: '/hausrat', name: 'hausrat' },
  { path: '/haftpflicht-hausrat', name: 'haftpflicht-hausrat' },
  { path: '/wohngebaeude-versicherung', name: 'wohngebaeude' },
  { path: '/rechtsschutz-versicherung', name: 'rechtsschutz' },
  { path: '/hundeversicherung', name: 'hunde' },
  { path: '/hundekrankenversicherung', name: 'hundekranken' },
  { path: '/grundbesitzerhaftpflicht', name: 'grundbesitzer' },
  { path: '/firmenversicherung', name: 'firmen' },

  // Gesundheit
  { path: '/pkv', name: 'pkv' },
  { path: '/pkv-beamte', name: 'pkv-beamte' },
  { path: '/pkv-studenten', name: 'pkv-studenten' },
  { path: '/krankenzusatz', name: 'krankenzusatz' },

  // Vorsorge
  { path: '/berufsunfaehigkeit', name: 'bu' },
  { path: '/risikoleben', name: 'risikoleben' },
  { path: '/lebensversicherung', name: 'leben' },
  { path: '/unfallversicherung', name: 'unfall' },
  { path: '/rente', name: 'rente' },
  { path: '/riester-rente', name: 'riester' },
  { path: '/ruerup-rente', name: 'ruerup' },
  { path: '/pflegezusatz', name: 'pflegezusatz' },

  // Finanzen
  { path: '/kredit-vergleich', name: 'kredit' },
  { path: '/girokonto-vergleich', name: 'girokonto' },
  { path: '/baufinanzierung', name: 'baufinanzierung' },
  { path: '/kreditkarten', name: 'kreditkarten' },

  // Service & Root
  { path: '/', name: 'homepage' },
  { path: '/ratgeber', name: 'ratgeber' },
  { path: '/kontakt', name: 'kontakt' },
  { path: '/impressum', name: 'impressum' },
  { path: '/datenschutz', name: 'datenschutz' },
  { path: '/erstinformation', name: 'erstinformation' },
];

async function run() {
  console.log(`🚀 Starte vollständige Gesamtprüfung für ALLE ${allPages.length} Seiten über 5 Viewports...`);
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  const summary = {
    totalChecked: 0,
    totalPages: allPages.length,
    viewportCount: viewports.length,
    pagesWithDocOverflow: [],
    pagesWithElementOverflow: [],
    consoleErrors: [],
    details: [],
  };

  for (const pageConfig of allPages) {
    process.stdout.write(`\n🔍 Prüfe: ${pageConfig.path.padEnd(30, ' ')} `);

    for (const vp of viewports) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        isMobile: vp.width < 768,
        hasTouch: vp.width < 768,
      });

      await ctx.addInitScript(() => {
        localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
      });

      const page = await ctx.newPage();
      const pageErrors = [];
      page.on('pageerror', (err) => pageErrors.push({ path: pageConfig.path, vp: vp.name, error: err.message }));

      try {
        const resp = await page.goto(`${BASE_URL}${pageConfig.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        if (!resp || resp.status() >= 400) {
          console.error(`\n❌ HTTP Fehler ${resp ? resp.status() : 'keine Antwort'} auf ${pageConfig.path}`);
        }
        await sleep(800);
      } catch (e) {
        console.error(`\n❌ Fehler beim Laden von ${pageConfig.path}:`, e.message);
        await ctx.close();
        continue;
      }

      summary.totalChecked++;

      const check = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const overflowing = [];

        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1 || rect.left < -1) {
            if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none') {
              overflowing.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className || '').toString().slice(0, 80),
                text: (el.innerText || '').slice(0, 30).replace(/\n/g, ' '),
                right: Math.round(rect.right),
                docWidth,
              });
            }
          }
        });

        return {
          docWidth,
          scrollWidth,
          hasDocOverflow: scrollWidth > docWidth,
          overflowCount: overflowing.length,
          overflowing: overflowing.slice(0, 3),
        };
      });

      if (check.hasDocOverflow) {
        summary.pagesWithDocOverflow.push({
          page: pageConfig.path,
          viewport: vp.name,
          docWidth: check.docWidth,
          scrollWidth: check.scrollWidth,
          diff: check.scrollWidth - check.docWidth,
        });
        process.stdout.write(` [❌ ${vp.name}: +${check.scrollWidth - check.docWidth}px]`);
      } else {
        process.stdout.write(` [✓ ${vp.name}]`);
      }

      if (pageErrors.length > 0) {
        summary.consoleErrors.push(...pageErrors);
      }

      await ctx.close();
    }
  }

  await browser.close();

  console.log('\n\n==================================================');
  console.log('🏁 GESAMTERGEBNIS DES INTEGRITÄTSTESTS:');
  console.log(`Geprüfte Seiten: ${summary.totalPages}`);
  console.log(`Geprüfte Viewport-Kombinationen: ${summary.totalChecked}`);
  console.log(`Seiten mit horizontalem Scrollbar / Überlauf: ${summary.pagesWithDocOverflow.length}`);
  console.log(`Seiten mit Konsolen- / Laufzeitfehlern: ${summary.consoleErrors.length}`);
  console.log('==================================================');

  fs.writeFileSync(
    path.join(OUT_DIR, 'full-site-verification.json'),
    JSON.stringify(summary, null, 2),
    'utf-8'
  );

  return summary;
}

run().catch((e) => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
