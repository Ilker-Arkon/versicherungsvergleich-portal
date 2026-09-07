import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://eager-pythagoras-iota.vercel.app';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function testNavigation() {
  console.log('========================================================================');
  console.log(`🧭 Starte Navigations-, Link- & 404-Audit auf: ${BASE_URL}`);
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  // Consent vorab setzen, damit keine Overlays stören
  await ctx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });

  const p = await ctx.newPage();
  await p.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(1500);

  // 1. Alle internen Links von der Homepage sammeln
  const links = await p.evaluate((base) => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const internalHrefs = anchors
      .map(a => a.getAttribute('href'))
      .filter(href => href && (href.startsWith('/') || href.startsWith(base)) && !href.startsWith('//') && !href.startsWith('tel:') && !href.startsWith('mailto:'));
    return Array.from(new Set(internalHrefs));
  }, BASE_URL);

  console.log(`Gefundene eindeutige interne Links auf der Homepage: ${links.length}\n`);

  let passedLinks = 0;
  let failedLinks = 0;
  const brokenLinks = [];

  for (let i = 0; i < links.length; i++) {
    const rawHref = links[i];
    const fullUrl = rawHref.startsWith('http') ? rawHref : `${BASE_URL}${rawHref.startsWith('/') ? '' : '/'}${rawHref}`;

    try {
      const resp = await p.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const status = resp ? resp.status() : 0;

      if (status === 200) {
        passedLinks++;
        console.log(`[${String(i + 1).padStart(2, '0')}/${links.length}] ✅ HTTP 200 | ${rawHref}`);
      } else {
        failedLinks++;
        console.log(`[${String(i + 1).padStart(2, '0')}/${links.length}] ❌ HTTP ${status} | ${rawHref}`);
        brokenLinks.push({ href: rawHref, status });
      }
    } catch (err) {
      failedLinks++;
      console.log(`[${String(i + 1).padStart(2, '0')}/${links.length}] ❌ FEHLER (${err.message}) | ${rawHref}`);
      brokenLinks.push({ href: rawHref, error: err.message });
    }
  }

  // 2. Custom 404 Not-Found Test
  console.log('\n--- Test 2: Custom 404 Not-Found-Seite ---');
  const notFoundUrl = `${BASE_URL}/nicht-existierende-seite-xyz-404`;
  const notFoundResp = await p.goto(notFoundUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  const notFoundStatus = notFoundResp ? notFoundResp.status() : 0;
  const has404Text = await p.evaluate(() => {
    const body = document.body ? document.body.innerText : '';
    return body.includes('404') || body.includes('nicht gefunden');
  });

  const notFoundOk = notFoundStatus === 404 && has404Text;
  console.log(`  404 HTTP-Status: ${notFoundStatus} (erwartet: 404)`);
  console.log(`  Branded 404-Text vorhanden: ${has404Text}`);
  console.log(`  Ergebnis 404-Test: ${notFoundOk ? '✅ BESTANDEN' : '❌ FEHLER'}`);

  console.log('\n========================================================================');
  console.log(`📊 TEST-ZUSAMMENFASSUNG NAVIGATION: ${passedLinks} von ${links.length} Links OK, ${failedLinks} defekt`);
  console.log('========================================================================\n');

  await browser.close();

  if (failedLinks > 0 || !notFoundOk) {
    process.exit(1);
  }
}

testNavigation().catch(err => {
  console.error('Fataler Navigations-Fehler:', err);
  process.exit(1);
});
