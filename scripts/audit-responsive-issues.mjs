import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://sichertarif.de';
const ARTIFACT_DIR = 'scripts/screenshots';

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runResponsiveAudit() {
  console.log('🚀 Starte detaillierten Responsive-Design-Audit...');
  console.log(`🌐 Ziel-URL: ${BASE_URL}`);
  console.log(`📁 Screenshot-Ordner: ${ARTIFACT_DIR}\n`);

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  const findings = [];

  // Helper to test a page at specific viewport
  async function testViewport(urlPath, viewport, deviceName) {
    const ctx = await browser.newContext({
      viewport,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      isMobile: viewport.width < 768,
      hasTouch: viewport.width < 768,
    });

    await ctx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });

    const page = await ctx.newPage();
    const fullUrl = `${BASE_URL}${urlPath}`;
    
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await sleep(2500); // Wait for styles, hydration and layout to settle
    } catch (e) {
      console.error(`Fehler beim Aufruf von ${fullUrl}:`, e.message);
      await ctx.close();
      return;
    }

    // 1. Check Horizontal Overflow of Document
    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const overflowingElements = [];

      const all = document.querySelectorAll('*');
      for (const el of all) {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1 || rect.left < -1) {
          // Ignore SVG defs or zero-size elements
          if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none') {
            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              className: (el.className || '').toString().slice(0, 80),
              id: el.id || '',
              text: (el.innerText || '').slice(0, 40).replace(/\n/g, ' '),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              docWidth
            });
          }
        }
      }

      return {
        hasDocOverflow: scrollWidth > docWidth,
        docWidth,
        scrollWidth,
        overflowingElements: overflowingElements.slice(0, 8)
      };
    });

    // 2. Specific Analysis for CategoryShowcase (on homepage)
    if (urlPath === '/') {
      const categoryAnalysis = await page.evaluate(() => {
        const results = [];
        const cards = document.querySelectorAll('.premium-card');
        
        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const titleEl = card.querySelector('h3');
          const title = titleEl ? titleEl.innerText : `Card ${idx}`;
          
          // Check rows inside card
          const rows = card.querySelectorAll('a.group');
          const rowDetails = [];
          rows.forEach((row) => {
            const rowRect = row.getBoundingClientRect();
            const textSpan = row.querySelector('.truncate');
            const badgeSpan = row.querySelector('.shrink-0');
            
            let isTextTruncated = false;
            let textSpanWidth = 0;
            let textSpanScrollWidth = 0;
            let badgeWidth = 0;
            let textContent = '';
            let badgeContent = '';

            if (textSpan) {
              textContent = textSpan.innerText;
              textSpanWidth = Math.round(textSpan.getBoundingClientRect().width);
              textSpanScrollWidth = textSpan.scrollWidth;
              isTextTruncated = textSpan.scrollWidth > textSpan.clientWidth;
            }

            if (badgeSpan) {
              badgeContent = badgeSpan.innerText;
              badgeWidth = Math.round(badgeSpan.getBoundingClientRect().width);
            }

            rowDetails.push({
              title: textContent,
              badge: badgeContent,
              isTextTruncated,
              textSpanWidth,
              textSpanScrollWidth,
              badgeWidth,
              rowWidth: Math.round(rowRect.width)
            });
          });

          results.push({
            title,
            height: Math.round(cardRect.height),
            width: Math.round(cardRect.width),
            rowCount: rows.length,
            rowDetails
          });
        });

        return results;
      });

      // 3. Hero Section Cards Analysis
      const heroAnalysis = await page.evaluate(() => {
        const heroSection = document.querySelector('section.bg-gradient-to-br');
        if (!heroSection) return null;
        
        const heroCards = heroSection.querySelectorAll('a.group');
        const cardInfos = [];

        heroCards.forEach((c) => {
          const badge = c.querySelector('span.whitespace-nowrap');
          const title = c.querySelector('h3');
          const subtitle = c.querySelector('p.text-slate-300');
          const rect = c.getBoundingClientRect();

          cardInfos.push({
            title: title ? title.innerText : '',
            badgeText: badge ? badge.innerText : '',
            subtitle: subtitle ? subtitle.innerText : '',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            badgeScrollWidth: badge ? badge.scrollWidth : 0,
            badgeClientWidth: badge ? badge.clientWidth : 0
          });
        });

        return cardInfos;
      });

      // 4. Trust Badges analysis
      const trustBadgesAnalysis = await page.evaluate(() => {
        const trustSection = document.querySelector('.bg-blue-50');
        if (!trustSection) return null;
        const items = trustSection.querySelectorAll('.text-center');
        const itemData = [];
        items.forEach((item) => {
          const p1 = item.querySelectorAll('p')[0]?.innerText || '';
          const p2 = item.querySelectorAll('p')[1]?.innerText || '';
          const p3 = item.querySelectorAll('p')[2]?.innerText || '';
          const rect = item.getBoundingClientRect();
          itemData.push({ p1, p2, p3, width: Math.round(rect.width) });
        });
        return { count: items.length, items: itemData };
      });

      findings.push({
        urlPath,
        viewport,
        deviceName,
        overflowInfo,
        categoryAnalysis,
        heroAnalysis,
        trustBadgesAnalysis
      });
    } else {
      // Subpage checks (advice box, widget headers, trust badges)
      const subpageAnalysis = await page.evaluate(() => {
        const adviceBox = document.querySelector('.premium-card, .bg-white.rounded-3xl');
        let adviceCardsInfo = [];
        if (adviceBox) {
          const adviceCards = adviceBox.querySelectorAll('.p-4.bg-slate-50, .p-4.rounded-xl, .p-4.rounded-2xl');
          adviceCards.forEach((ac) => {
            const rect = ac.getBoundingClientRect();
            adviceCardsInfo.push({
              title: (ac.querySelector('p.font-bold') || ac.querySelector('h4') || {}).innerText || '',
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          });
        }

        // Check widget header wrapping
        const widgetHeader = document.querySelector('.bg-slate-900.text-white');
        let widgetHeaderWrapped = false;
        if (widgetHeader) {
          const badge = widgetHeader.querySelector('.bg-emerald-950\\/80');
          widgetHeaderWrapped = badge ? window.getComputedStyle(badge).display === 'none' : false;
        }

        return {
          adviceCardsInfo,
          widgetHeaderWrapped
        };
      });

      findings.push({
        urlPath,
        viewport,
        deviceName,
        overflowInfo,
        subpageAnalysis
      });
    }

    await ctx.close();
  }

  // --- Run Systematic Viewport Matrix ---
  const viewports = [
    { width: 360, height: 740, name: 'Android-Small-360px' },
    { width: 375, height: 667, name: 'iPhone-SE-375px' },
    { width: 390, height: 844, name: 'iPhone-14-390px' },
    { width: 768, height: 1024, name: 'iPad-Tablet-768px' },
    { width: 1280, height: 800, name: 'Desktop-1280px' },
  ];

  console.log('📱 Teste Startseite auf verschiedenen Viewports...');
  for (const vp of viewports) {
    await testViewport('/', { width: vp.width, height: vp.height }, vp.name);
  }

  console.log('📄 Teste Unterseiten & Kategorien auf mobilen Viewports (375px & 390px)...');
  const testSubpages = [
    '/kfz-versicherung',
    '/haftpflicht',
    '/haftpflicht-hausrat',
    '/pkv',
    '/pkv-studenten',
    '/girokonto-vergleich',
    '/berufsunfaehigkeit',
    '/kredit-vergleich',
    '/ratgeber',
    '/kontakt'
  ];

  for (const sp of testSubpages) {
    await testViewport(sp, { width: 375, height: 667 }, 'iPhone-SE-375px');
  }

  // --- Now Capture Targeted Screenshots of the Discovered Issues ---
  console.log('\n📸 Erstelle zielgerichtete Screenshots der Problemstellen...');
  const ssCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  await ssCtx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });

  const ssPage = await ssCtx.newPage();

  // Screenshot 1: Homepage Category Showcase (Spartenübersicht - die Spar-Badges & Textabschneidungen)
  await ssPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);

  const categorySection = ssPage.locator('section.section-alt').first();
  if (await categorySection.isVisible()) {
    await categorySection.scrollIntoViewIfNeeded();
    await sleep(500);
    await categorySection.screenshot({
      path: path.join(ARTIFACT_DIR, '01_kategorie_spartenuebersicht_mobile375.png')
    });
    console.log('  -> Screenshot gespeichert: 01_kategorie_spartenuebersicht_mobile375.png');

    // Individual category cards for fine detail
    const cards = categorySection.locator('.premium-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await card.screenshot({
        path: path.join(ARTIFACT_DIR, `01b_kategorie_karte_${i+1}_mobile375.png`)
      });
    }
    console.log(`  -> ${count} Detail-Karten der Kategorien gespeichert.`);
  }

  // Screenshot 2: Trust Badges on Mobile 375px
  const trustSection = ssPage.locator('.bg-blue-50').first();
  if (await trustSection.isVisible()) {
    await trustSection.scrollIntoViewIfNeeded();
    await sleep(300);
    await trustSection.screenshot({
      path: path.join(ARTIFACT_DIR, '02_trust_badges_3spalten_mobile375.png')
    });
    console.log('  -> Screenshot gespeichert: 02_trust_badges_3spalten_mobile375.png');
  }

  // Screenshot 3: Hero Section on Mobile 375px
  const heroSection = ssPage.locator('section.bg-gradient-to-br').first();
  if (await heroSection.isVisible()) {
    await heroSection.scrollIntoViewIfNeeded();
    await sleep(300);
    await heroSection.screenshot({
      path: path.join(ARTIFACT_DIR, '03_hero_karten_mobile375.png')
    });
    console.log('  -> Screenshot gespeichert: 03_hero_karten_mobile375.png');
  }

  // Screenshot 4: Promo Cards on Mobile 375px
  const promoSection = ssPage.locator('section.section-white').first();
  if (await promoSection.isVisible()) {
    await promoSection.scrollIntoViewIfNeeded();
    await sleep(300);
    await promoSection.screenshot({
      path: path.join(ARTIFACT_DIR, '04_aktuelle_sparaktionen_mobile375.png')
    });
    console.log('  -> Screenshot gespeichert: 04_aktuelle_sparaktionen_mobile375.png');
  }

  // Screenshot 5: Subcategory / Rechner Page (/pkv - Quick Sub-Nav & Advice Grid)
  await ssPage.goto(`${BASE_URL}/pkv`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await ssPage.screenshot({
    path: path.join(ARTIFACT_DIR, '05_pkv_mobile_overview.png'),
    fullPage: false
  });
  console.log('  -> Screenshot gespeichert: 05_pkv_mobile_overview.png');

  // Advice Grid on PKV
  const pkvAdvice = ssPage.locator('.premium-card').first();
  if (await pkvAdvice.isVisible()) {
    await pkvAdvice.scrollIntoViewIfNeeded();
    await sleep(300);
    await pkvAdvice.screenshot({
      path: path.join(ARTIFACT_DIR, '05b_pkv_advice_grid_mobile375.png')
    });
    console.log('  -> Screenshot gespeichert: 05b_pkv_advice_grid_mobile375.png');
  }

  // Screenshot 6: Subcategory / Rechner Page (/girokonto-vergleich - Long Bullet Text)
  await ssPage.goto(`${BASE_URL}/girokonto-vergleich`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  const giroHeaderArea = ssPage.locator('.mb-8.text-center').first();
  if (await giroHeaderArea.isVisible()) {
    await giroHeaderArea.screenshot({
      path: path.join(ARTIFACT_DIR, '06_girokonto_header_bullets_mobile375.png')
    });
    console.log('  -> Screenshot gespeichert: 06_girokonto_header_bullets_mobile375.png');
  }

  // Screenshot 7: Subcategory / Rechner Page (/haftpflicht-hausrat - Kombi-Vergleich)
  await ssPage.goto(`${BASE_URL}/haftpflicht-hausrat`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await ssPage.screenshot({
    path: path.join(ARTIFACT_DIR, '07_haftpflicht_hausrat_mobile375.png'),
    fullPage: false
  });
  console.log('  -> Screenshot gespeichert: 07_haftpflicht_hausrat_mobile375.png');

  // Screenshot 8: Tablet iPad (768px) Category Showcase to show grid column unevenness
  const tabletCtx = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  await tabletCtx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  const tabletCat = tabletPage.locator('section.section-alt').first();
  if (await tabletCat.isVisible()) {
    await tabletCat.scrollIntoViewIfNeeded();
    await sleep(300);
    await tabletCat.screenshot({
      path: path.join(ARTIFACT_DIR, '08_kategorie_spartenuebersicht_tablet768.png')
    });
    console.log('  -> Screenshot gespeichert: 08_kategorie_spartenuebersicht_tablet768.png');
  }

  // Save audit data to JSON
  const reportPath = path.join(ARTIFACT_DIR, 'audit-summary.json');
  fs.writeFileSync(reportPath, JSON.stringify(findings, null, 2));
  console.log(`\n✅ Audit-Daten exportiert: ${reportPath}`);

  await browser.close();
  console.log('🎉 Responsive Design Audit erfolgreich abgeschlossen!');
}

runResponsiveAudit().catch((err) => {
  console.error('Audit-Fehler:', err);
  process.exit(1);
});
