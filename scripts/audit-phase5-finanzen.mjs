import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/Home/.gemini/antigravity/brain/2dc5e61b-4a81-478b-97cb-9bdd0ce0162e/audit-screenshots/phase5-finanzen';

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
  { path: '/girokonto-vergleich', name: 'girokonto-vergleich' },
  { path: '/kredit-vergleich', name: 'kredit-vergleich' },
  { path: '/baufinanzierung', name: 'baufinanzierung' },
  { path: '/kreditkarten', name: 'kreditkarten' },
];

async function run() {
  console.log('🚀 Starte Audit für Phase 5: Finanzen & Banken (4 Unterseiten)...');
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
        await sleep(1500);
      } catch (e) {
        console.error(`Fehler bei ${pageConfig.path}:`, e.message);
        await ctx.close();
        continue;
      }

      // Analysis of document overflow & layout
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
              text: b.innerText.slice(0, 40),
              isMultiline: b.clientHeight > 26,
              height: b.clientHeight,
              hasItemsStart: b.classList.contains('items-start'),
              hasItemsCenter: b.classList.contains('items-center'),
            });
          }
        });

        // Check H1, H2 titles for overflow
        const headings = [];
        document.querySelectorAll('h1, h2, h3').forEach((h) => {
          headings.push({
            tag: h.tagName.toLowerCase(),
            text: h.innerText.slice(0, 50),
            scrollWidth: h.scrollWidth,
            clientWidth: h.clientWidth,
            isOverflowing: h.scrollWidth > h.clientWidth + 1,
          });
        });

        return {
          docWidth,
          scrollWidth,
          hasDocOverflow: scrollWidth > docWidth,
          overflowingElementsCount: overflowing.length,
          topOverflowElements: overflowing.slice(0, 5),
          multilineBulletsWithItemsCenter: bullets.filter((b) => b.isMultiline && b.hasItemsCenter),
          overflowingHeadings: headings.filter((h) => h.isOverflowing),
        };
      });

      const reportEntry = {
        page: pageConfig.path,
        viewport: vp.name,
        width: vp.width,
        ...analysis,
      };
      results.push(reportEntry);

      if (analysis.hasDocOverflow || analysis.overflowingHeadings.length > 0 || analysis.multilineBulletsWithItemsCenter.length > 0) {
        console.warn(`  ⚠️ [${vp.name}] Overflow: doc=${analysis.scrollWidth}px vs ${analysis.docWidth}px, headingsOverflow=${analysis.overflowingHeadings.length}, badBullets=${analysis.multilineBulletsWithItemsCenter.length}`);
      } else {
        console.log(`  ✅ [${vp.name}] OK (doc: ${analysis.docWidth}px, no overflow)`);
      }

      // Take screenshot for 360 and 375 always, and any viewport with issues
      if (vp.width <= 375 || analysis.hasDocOverflow) {
        const shotPath = path.join(OUT_DIR, `${pageConfig.name}_${vp.name}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });

        // Capture hero section
        const hero = page.locator('section').first();
        if (await hero.count() > 0) {
          const heroShotPath = path.join(OUT_DIR, `${pageConfig.name}_header_${vp.name}.png`);
          await hero.screenshot({ path: heroShotPath });
        }
      }

      await ctx.close();
    }
  }

  await browser.close();

  const reportFile = path.join(OUT_DIR, 'phase5-audit-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(results, null, 2));
  console.log(`\n📊 Audit abgeschlossen! Report gespeichert in: ${reportFile}`);
}

run().catch((e) => {
  console.error('Fataler Fehler:', e);
  process.exit(1);
});
