import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://eager-pythagoras-iota.vercel.app';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function testCookieConsentFlow() {
  console.log('========================================================================');
  console.log(`🍪 Starte Cookie-Consent Workflow-Test auf: ${BASE_URL}`);
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  let testsPassed = 0;
  let testsFailed = 0;

  const logResult = (name, passed, details = '') => {
    if (passed) {
      testsPassed++;
      console.log(`✅ [PASS] ${name} ${details ? '— ' + details : ''}`);
    } else {
      testsFailed++;
      console.log(`❌ [FAIL] ${name} ${details ? '— ' + details : ''}`);
    }
  };

  // -------------------------------------------------------------------------
  // Test 1: Erstaufruf ohne Cookies
  // -------------------------------------------------------------------------
  console.log('--- Test 1: Erstaufruf ohne Cookies ---');
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE_URL}/kfz-versicherung`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(2000);

    const bannerVisible = await p.locator('text=Cookie-Einstellungen').first().isVisible();
    const acceptAllBtn = await p.locator('button', { hasText: 'Alle akzeptieren' }).isVisible();
    const necessaryBtn = await p.locator('button', { hasText: 'Nur notwendige' }).isVisible();
    const detailsBtn = await p.locator('button', { hasText: 'Details anpassen' }).isVisible();

    const scriptCount = await p.evaluate(() => document.querySelectorAll('script[src*="partner-versicherung.de"]').length);
    const iframeCount = await p.evaluate(() => document.querySelectorAll('iframe').length);
    const placeholderVisible = await p.locator('button', { hasText: 'Rechner freischalten' }).isVisible();

    logResult('Banner wird angezeigt', bannerVisible && acceptAllBtn && necessaryBtn && detailsBtn);
    logResult('DSGVO-Sperre aktiv (0 Skripte, 0 iFrames)', scriptCount === 0 && iframeCount === 0, `Skripte: ${scriptCount}, iFrames: ${iframeCount}`);
    logResult('Freischalten-Placeholder sichtbar', placeholderVisible);

    await ctx.close();
  }

  // -------------------------------------------------------------------------
  // Test 2: Klick auf "Alle akzeptieren" -> Live-Freischaltung ohne Reload
  // -------------------------------------------------------------------------
  console.log('\n--- Test 2: Klick auf "Alle akzeptieren" ---');
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE_URL}/kfz-versicherung`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(1500);

    // Klick "Alle akzeptieren"
    await p.locator('button', { hasText: 'Alle akzeptieren' }).click();
    await sleep(3500);

    const bannerClosed = !(await p.locator('button', { hasText: 'Alle akzeptieren' }).isVisible());
    const consentInStorage = await p.evaluate(() => {
      const val = localStorage.getItem('tarifvergleich-consent-v1');
      return val ? JSON.parse(val) : null;
    });

    const iframeLoaded = await p.waitForSelector('#tcpp-iframe-kfz iframe', { timeout: 10000 }).then(() => true).catch(() => false);

    logResult('Banner schließt sich nach Klick', bannerClosed);
    logResult('Consent korrekt in localStorage gespeichert', consentInStorage?.marketing === true && consentInStorage?.necessary === true);
    logResult('Rechner lädt dynamisch nach (iFrame erscheint)', iframeLoaded);

    // -------------------------------------------------------------------------
    // Test 3: Persistenz nach Reload
    // -------------------------------------------------------------------------
    console.log('\n--- Test 3: Persistenz nach Page-Reload ---');
    await p.reload({ waitUntil: 'domcontentloaded' });
    await sleep(2500);

    const bannerStillClosed = !(await p.locator('button', { hasText: 'Alle akzeptieren' }).isVisible());
    const iframeStillThere = await p.evaluate(() => document.querySelectorAll('#tcpp-iframe-kfz iframe').length === 1);

    logResult('Banner bleibt nach Reload geschlossen', bannerStillClosed);
    logResult('Rechner rendert sofort nach Reload', iframeStillThere);

    await ctx.close();
  }

  // -------------------------------------------------------------------------
  // Test 4: Klick auf "Nur notwendige" -> Rechner bleibt gesperrt
  // -------------------------------------------------------------------------
  console.log('\n--- Test 4: Ablehnen ("Nur notwendige") ---');
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE_URL}/haftpflicht`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(1500);

    await p.locator('button', { hasText: 'Nur notwendige' }).click();
    await sleep(2000);

    const bannerClosed = !(await p.locator('button', { hasText: 'Nur notwendige' }).isVisible());
    const consentInStorage = await p.evaluate(() => {
      const val = localStorage.getItem('tarifvergleich-consent-v1');
      return val ? JSON.parse(val) : null;
    });

    const scriptCount = await p.evaluate(() => document.querySelectorAll('script[src*="partner-versicherung.de"]').length);
    const iframeCount = await p.evaluate(() => document.querySelectorAll('iframe').length);
    const placeholderStillVisible = await p.locator('button', { hasText: 'Rechner freischalten' }).isVisible();

    logResult('Banner schließt sich nach Ablehnung', bannerClosed);
    logResult('Consent in localStorage: marketing=false', consentInStorage?.marketing === false && consentInStorage?.necessary === true);
    logResult('Rechner bleibt gesperrt (0 Skripte, 0 iFrames)', scriptCount === 0 && iframeCount === 0);
    logResult('Placeholder mit "Rechner freischalten" bleibt sichtbar', placeholderStillVisible);

    // -------------------------------------------------------------------------
    // Test 5: Klick auf "Rechner freischalten" öffnet Einstellungs-Modal
    // -------------------------------------------------------------------------
    console.log('\n--- Test 5: "Rechner freischalten" öffnet Modal & erlaubt nachträgliche Aktivierung ---');
    await p.locator('button', { hasText: 'Rechner freischalten' }).first().click();
    await sleep(1000);

    const modalDialog = await p.locator('[role="dialog"][aria-label="Cookie-Einstellungen"]').isVisible();
    logResult('Einstellungs-Dialog öffnet sich', modalDialog);

    // Toggle aktivieren
    const toggle = p.locator('button[role="switch"][aria-label="Externe Inhalte erlauben"]');
    await toggle.click();
    await sleep(500);

    // Auswahl speichern
    await p.locator('button', { hasText: 'Auswahl speichern' }).click();
    await sleep(3500);

    const iframeNowLoaded = await p.waitForSelector('#tcpp-iframe-phv iframe', { timeout: 10000 }).then(() => true).catch(() => false);
    logResult('Nach Speichern im Modal lädt der Rechner', iframeNowLoaded);

    await ctx.close();
  }

  // -------------------------------------------------------------------------
  // Test 6: Footer-Link "Cookie-Einstellungen" öffnet Modal
  // -------------------------------------------------------------------------
  console.log('\n--- Test 6: Footer "Cookie-Einstellungen" Button ---');
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(1500);

    // Banner erst mal wegklicken
    if (await p.locator('button', { hasText: 'Nur notwendige' }).isVisible()) {
      await p.locator('button', { hasText: 'Nur notwendige' }).click();
      await sleep(1000);
    }

    // Footer Button suchen und klicken
    const footerBtn = p.locator('footer button', { hasText: 'Cookie-Einstellungen' });
    await footerBtn.scrollIntoViewIfNeeded();
    await footerBtn.click();
    await sleep(1000);

    const modalOpen = await p.locator('[role="dialog"][aria-label="Cookie-Einstellungen"]').isVisible();
    logResult('Footer-Button öffnet Einstellungs-Dialog', modalOpen);

    await ctx.close();
  }

  console.log('\n========================================================================');
  console.log(`📊 TEST-ZUSAMMENFASSUNG COOKIE-FLOW: ${testsPassed} bestanden, ${testsFailed} fehlgeschlagen`);
  console.log('========================================================================\n');

  await browser.close();

  if (testsFailed > 0) {
    process.exit(1);
  }
}

testCookieConsentFlow().catch((err) => {
  console.error('Testfehler:', err);
  process.exit(1);
});
