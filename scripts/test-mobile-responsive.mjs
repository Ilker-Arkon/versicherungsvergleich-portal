import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://sichertarif.de';
const MOBILE_SS_DIR = path.join(process.cwd(), 'scripts', 'screenshots', 'mobile');

if (!fs.existsSync(MOBILE_SS_DIR)) {
  fs.mkdirSync(MOBILE_SS_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function testMobileResponsive() {
  console.log('========================================================================');
  console.log(`📱 Starte Mobile Responsive Audit auf: ${BASE_URL} (Viewport 375x667)`);
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  // Mobile iPhone SE Viewport
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });

  await ctx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });

  const p = await ctx.newPage();
  let passed = 0;
  let failed = 0;
  const log = (msg, ok) => {
    if (ok) {
      passed++;
      console.log(`✅ [PASS] ${msg}`);
    } else {
      failed++;
      console.log(`❌ [FAIL] ${msg}`);
    }
  };

  // 1. Homepage Mobile Check
  console.log('--- Test 1: Startseite Mobile (375px) ---');
  await p.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(2000);

  // Horizontal Overflow Check
  const homeOverflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  log('Kein horizontaler Überlauf auf der Startseite', !homeOverflow);

  // Burger-Menü Button sichtbar?
  const burgerBtn = p.locator('button[aria-label="Menü"], button[aria-label="Menü öffnen"]').first();
  const burgerVisible = await burgerBtn.isVisible();
  log('Mobile Burger-Menü Button sichtbar', burgerVisible);

  // Burger-Menü Klicktest
  if (burgerVisible) {
    await burgerBtn.click();
    await sleep(600);
    const menuOpen = await p.locator('nav[aria-label="Mobiles Menü"]').isVisible();
    log('Burger-Menü öffnet sich beim Klick', menuOpen);
  }

  await p.screenshot({ path: path.join(MOBILE_SS_DIR, 'home-mobile.png') });

  // 2. Rechner-Seite Mobile Check (/kfz-versicherung)
  console.log('\n--- Test 2: Rechner-Seite Mobile (/kfz-versicherung) ---');
  await p.goto(`${BASE_URL}/kfz-versicherung`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(3500);

  const kfzOverflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  log('Kein horizontaler Überlauf auf /kfz-versicherung', !kfzOverflow);

  const calcIframe = await p.waitForSelector('#tcpp-iframe-kfz iframe', { timeout: 10000 }).then(() => true).catch(() => false);
  log('Rechner-iFrame lädt im mobilen Viewport', calcIframe);

  await p.screenshot({ path: path.join(MOBILE_SS_DIR, 'kfz-mobile.png') });

  // 3. Floating Buttons Check (WhatsApp / Anrufen)
  console.log('\n--- Test 3: Floating Action Buttons Überlappung ---');
  const buttonsOverlap = await p.evaluate(() => {
    const wa = document.querySelector('a[href*="wa.me"]');
    const call = document.querySelector('a[href^="tel:"]');
    if (!wa || !call) return false;
    const r1 = wa.getBoundingClientRect();
    const r2 = call.getBoundingClientRect();
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  });
  log('Floating Buttons überlappen sich nicht', !buttonsOverlap);

  console.log('\n========================================================================');
  console.log(`📊 TEST-ZUSAMMENFASSUNG MOBILE AUDIT: ${passed} bestanden, ${failed} fehlgeschlagen`);
  console.log('========================================================================\n');

  await browser.close();

  if (failed > 0) {
    process.exit(1);
  }
}

testMobileResponsive().catch(err => {
  console.error('Fataler Mobile-Testfehler:', err);
  process.exit(1);
});
