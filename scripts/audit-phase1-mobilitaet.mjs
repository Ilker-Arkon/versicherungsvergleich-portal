import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/Home/.gemini/antigravity/brain/2dc5e61b-4a81-478b-97cb-9bdd0ce0162e/audit-screenshots/phase1-mobilitaet';

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

const pages = [
  { path: '/kfz-versicherung', name: 'kfz' },
  { path: '/motorrad-versicherung', name: 'motorrad' },
];

async function run() {
  console.log('🚀 Starte Audit für Phase 1: Kfz & Mobilität...');
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const results = [];

  for (const pageConfig of pages) {
    console.log(`\n📄 Prüfe Seite: ${pageConfig.path}`);
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
      try {
        await page.goto(`${BASE_URL}${pageConfig.path}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await sleep(2000);
      } catch (e) {
        console.error(`Fehler bei ${pageConfig.path}:`, e.message);
        await ctx.close();
        continue;
      }

      // Check overflow
      const analysis = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const overflowing = [];

        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1 || rect.left < -1) {
            if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none') {
              overflowing.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className || '').toString().slice(0, 100),
                text: (el.innerText || '').slice(0, 40).replace(/\n/g, ' '),
                right: Math.round(rect.right),
                docWidth,
              });
            }
          }
        });

        // Check bullet lists alignment
        const bullets = [];
        document.querySelectorAll('.flex.items-center, .flex.items-start').forEach((b) => {
          if (b.querySelector('svg.lucide-check-circle-2')) {
            bullets.push({
              text: b.innerText.slice(0, 35),
              isMultiline: b.clientHeight > 26,
              height: b.clientHeight,
              hasItemsStart: b.classList.contains('items-start'),
              hasItemsCenter: b.classList.contains('items-center'),
            });
          }
        });

        return {
          docWidth,
          scrollWidth,
          hasOverflow: scrollWidth > docWidth,
          overflowingCount: overflowing.length,
          overflowing: overflowing.slice(0, 5),
          bullets,
        };
      });

      const screenshotFile = `${pageConfig.name}_${vp.name}.png`;
      const screenshotPath = path.join(OUT_DIR, screenshotFile);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      // Also screenshot header area specifically for mobile 375
      if (vp.width === 375) {
        const headerArea = page.locator('.mb-8.text-center').first();
        if (await headerArea.isVisible()) {
          await headerArea.screenshot({ path: path.join(OUT_DIR, `${pageConfig.name}_header_375.png`) });
        }
        const adviceBox = page.locator('.premium-card, .bg-white.rounded-3xl').first();
        if (await adviceBox.isVisible()) {
          await adviceBox.screenshot({ path: path.join(OUT_DIR, `${pageConfig.name}_advice_375.png`) });
        }
      }

      console.log(`  [${vp.name}] Overflow: ${analysis.hasOverflow ? `❌ JA (${analysis.scrollWidth}px > ${analysis.docWidth}px)` : '✅ Nein'} | Bullets: ${analysis.bullets.length} (Multiline: ${analysis.bullets.filter(b => b.isMultiline).length})`);
      if (analysis.overflowing.length > 0) {
        console.log(`     Details:`, analysis.overflowing);
      }

      results.push({
        page: pageConfig.path,
        viewport: vp,
        analysis,
        screenshot: screenshotFile,
      });

      await ctx.close();
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'phase1-audit-report.json'), JSON.stringify(results, null, 2));
  console.log(`\n✅ Phase 1 Audit abgeschlossen. Ergebnisse in ${OUT_DIR}`);
  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
