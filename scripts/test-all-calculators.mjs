import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://eager-pythagoras-iota.vercel.app';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'scripts', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// 27 routes and their corresponding widget configuration keys & container IDs
const CALCULATOR_PAGES = [
  { slug: 'kfz-versicherung', key: 'kfz', containerId: 'tcpp-iframe-kfz', category: 'Mobilität' },
  { slug: 'motorrad-versicherung', key: 'motorrad', containerId: 'tcpp-iframe-mot', category: 'Mobilität' },
  { slug: 'haftpflicht', key: 'haftpflicht', containerId: 'tcpp-iframe-phv', category: 'Sach & Wohnen' },
  { slug: 'hausrat', key: 'hausrat', containerId: 'tcpp-iframe-hr', category: 'Sach & Wohnen' },
  { slug: 'rechtsschutz-versicherung', key: 'rechtsschutz', containerId: 'tcpp-iframe-rs', category: 'Sach & Wohnen' },
  { slug: 'wohngebaeude-versicherung', key: 'wohngebaeude', containerId: 'tcpp-iframe-wg', category: 'Sach & Wohnen' },
  { slug: 'hundeversicherung', key: 'tierhalter', containerId: 'tcpp-iframe-tie', category: 'Sach & Wohnen' },
  { slug: 'hundekrankenversicherung', key: 'tierkranken', containerId: 'tcpp-iframe-tkv', category: 'Sach & Wohnen' },
  { slug: 'grundbesitzerhaftpflicht', key: 'grundbesitzer', containerId: 'tcpp-iframe-hug', category: 'Sach & Wohnen' },
  { slug: 'firmenversicherung', key: 'gewerbe', containerId: 'tcpp-iframe-fc', category: 'Sach & Wohnen' },
  { slug: 'haftpflicht-hausrat', key: 'phv_kombi', containerId: 'tcpp-iframe-phv', category: 'Sach & Wohnen (Kombi)' },
  { slug: 'pkv', key: 'pkv', containerId: 'tcpp-iframe-pkv', category: 'Gesundheit' },
  { slug: 'pkv-beamte', key: 'pkv_beamte', containerId: 'tcpp-iframe-pkv-beamte', category: 'Gesundheit' },
  { slug: 'pkv-studenten', key: 'pkv_studenten', containerId: 'tcpp-iframe-pkv-s', category: 'Gesundheit' },
  { slug: 'krankenzusatz', key: 'krankenzusatz', containerId: 'tcpp-iframe-pkv-z', category: 'Gesundheit' },
  { slug: 'berufsunfaehigkeit', key: 'berufsunfaehigkeit', containerId: 'tcpp-iframe-buv', category: 'Vorsorge' },
  { slug: 'lebensversicherung', key: 'leben', containerId: 'tcpp-iframe-leben', category: 'Vorsorge' },
  { slug: 'risikoleben', key: 'risikoleben', containerId: 'tcpp-iframe-rlv', category: 'Vorsorge' },
  { slug: 'unfallversicherung', key: 'unfall', containerId: 'tcpp-iframe-unf', category: 'Vorsorge' },
  { slug: 'riester-rente', key: 'riester', containerId: 'tcpp-iframe-riester', category: 'Vorsorge' },
  { slug: 'ruerup-rente', key: 'ruerup', containerId: 'tcpp-iframe-r-rente', category: 'Vorsorge' },
  { slug: 'rente', key: 'rente', containerId: 'tcpp-iframe-rente', category: 'Vorsorge' },
  { slug: 'pflegezusatz', key: 'pflegezusatz', containerId: 'tcpp-iframe-prv', category: 'Vorsorge' },
  { slug: 'kredit-vergleich', key: 'kredit', containerId: 'tcpp-iframe-kredit', category: 'Finanzen' },
  { slug: 'baufinanzierung', key: 'baufinanzierung', containerId: 'tcpp-iframe-baufi', category: 'Finanzen' },
  { slug: 'girokonto-vergleich', key: 'girokonto', containerId: 'tcpp-iframe-giro', category: 'Finanzen' },
  { slug: 'kreditkarten', key: 'kreditkarte', containerId: 'tcpp-iframe-cc', category: 'Finanzen' },
];

const grantConsent = () => {
  try {
    localStorage.setItem(
      'tarifvergleich-consent-v1',
      JSON.stringify({ necessary: true, marketing: true })
    );
  } catch {}
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runTests() {
  console.log('========================================================================');
  console.log(`🚀 Starte Playwright Rechner- & Verbindungstest auf: ${BASE_URL}`);
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  const results = [];

  // -------------------------------------------------------------------------
  // 1. DSGVO Consent-Gate Test (Ohne Einwilligung)
  // -------------------------------------------------------------------------
  console.log('--- 1. Test: DSGVO Consent-Gate ohne Einwilligung ---');
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    const url = `${BASE_URL}/kfz-versicherung`;
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await sleep(2000);

    const check = await p.evaluate(() => {
      const scripts = document.querySelectorAll('script[src*="partner-versicherung.de"]').length;
      const iframes = document.querySelectorAll('iframe').length;
      const button = Array.from(document.querySelectorAll('button')).some(b =>
        (b.textContent || '').includes('Rechner freischalten')
      );
      return { scripts, iframes, hasUnlockButton: button };
    });

    const pass = check.scripts === 0 && check.iframes === 0 && check.hasUnlockButton;
    console.log(`  Ergebnis Consent-Gate: ${pass ? '✅ BESTANDEN' : '❌ FEHLER'}`);
    console.log(`    - Partner-Skripte geladen: ${check.scripts} (erwartet: 0)`);
    console.log(`    - iFrames geladen: ${check.iframes} (erwartet: 0)`);
    console.log(`    - 'Rechner freischalten' sichtbar: ${check.hasUnlockButton} (erwartet: true)\n`);
    await ctx.close();
  }

  // -------------------------------------------------------------------------
  // 2. Alle 27 Rechner & Tabellen mit Einwilligung prüfen
  // -------------------------------------------------------------------------
  console.log('--- 2. Test: Alle 27 Vergleichsrechner & Tabellen mit Einwilligung ---');
  console.log('Prüfe Container, Rechner-iFrame, Skript-URLs & Verbindungen...\n');

  for (let i = 0; i < CALCULATOR_PAGES.length; i++) {
    const item = CALCULATOR_PAGES[i];
    const url = `${BASE_URL}/${item.slug}`;
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    await ctx.addInitScript(grantConsent);
    const p = await ctx.newPage();

    const consoleErrors = [];
    p.on('console', (msg) => {
      if (msg.type() === 'error') {
        const txt = msg.text();
        if (!txt.includes('favicon') && !txt.includes('chrome-extension')) {
          consoleErrors.push(txt);
        }
      }
    });

    let httpStatus = 0;
    let containerFound = false;
    let visibleCalculators = 0;
    let totalIframes = 0;
    let partnerScriptCount = 0;
    let calculatorSrc = '';
    let partnerIdInScript = false;
    let passed = false;
    let errorMsg = '';
    let screenshotSaved = false;

    try {
      const resp = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
      httpStatus = resp ? resp.status() : 0;

      await p.waitForSelector(`#${item.containerId} iframe`, { timeout: 12000 }).catch(() => {});
      await sleep(2500);

      const evalData = await p.evaluate((cid) => {
        const container = document.getElementById(cid);
        const iframes = container ? Array.from(container.querySelectorAll('iframe')) : [];
        const allIframes = Array.from(document.querySelectorAll('iframe'));
        const partnerScripts = Array.from(document.querySelectorAll('script[src*="partner-versicherung.de"]'));

        // Ein echter Rechner-iFrame ist sichtbar (Höhe > 50px oder nicht 0x0)
        const realCalcIframes = iframes.filter(f => {
          const w = f.offsetWidth || parseInt(f.getAttribute('width') || '100', 10);
          const h = f.offsetHeight || parseInt(f.getAttribute('height') || '100', 10);
          return (w > 50 && h > 50) || (f.src && !f.src.includes('third-party-cookie-checker'));
        });

        return {
          containerFound: !!container,
          visibleCalculators: realCalcIframes.length,
          totalIframes: allIframes.length,
          partnerScriptCount: partnerScripts.length,
          scriptSrcs: partnerScripts.map(s => s.src),
          calculatorSrcs: realCalcIframes.map(f => f.src),
        };
      }, item.containerId);

      containerFound = evalData.containerFound;
      visibleCalculators = evalData.visibleCalculators;
      totalIframes = evalData.totalIframes;
      partnerScriptCount = evalData.partnerScriptCount;
      calculatorSrc = evalData.calculatorSrcs[0] || '';
      partnerIdInScript = evalData.scriptSrcs.some(s => s.includes('75137'));

      // Passed if HTTP 200, container found, exactly 1 visible calculator, partner script present
      passed = httpStatus === 200 && containerFound && visibleCalculators === 1 && partnerIdInScript;

      // Screenshots für Kernsparten speichern
      const screenshotCandidates = ['kfz-versicherung', 'motorrad-versicherung', 'haftpflicht', 'hausrat', 'rechtsschutz-versicherung', 'pkv', 'berufsunfaehigkeit', 'rente', 'kredit-vergleich', 'girokonto-vergleich'];
      if (screenshotCandidates.includes(item.slug)) {
        const ssPath = path.join(SCREENSHOTS_DIR, `${item.slug}.png`);
        await p.screenshot({ path: ssPath, fullPage: false });
        screenshotSaved = true;
      }
    } catch (err) {
      errorMsg = err.message;
      passed = false;
    } finally {
      await ctx.close();
    }

    const result = {
      index: i + 1,
      category: item.category,
      slug: item.slug,
      containerId: item.containerId,
      httpStatus,
      containerFound,
      visibleCalculators,
      totalIframes,
      partnerScriptCount,
      partnerIdInScript,
      calculatorSrc: calculatorSrc ? calculatorSrc.substring(0, 85) + '...' : '(keiner)',
      consoleErrorsCount: consoleErrors.length,
      screenshotSaved,
      passed,
      error: errorMsg || null
    };

    results.push(result);

    const statusBadge = passed ? '✅ OK' : '❌ FEHLER';
    console.log(`[${String(i + 1).padStart(2, '0')}/27] ${statusBadge} | ${item.category.padEnd(20)} | /${item.slug.padEnd(28)} | Rechner: ${visibleCalculators} | HTTP ${httpStatus}`);
  }

  // -------------------------------------------------------------------------
  // 3. Spezialfall: /haftpflicht-hausrat Tab-Switch
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Test: Spezialfall /haftpflicht-hausrat (Tab-Umschaltung) ---');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(grantConsent);
    const p = await ctx.newPage();
    await p.goto(`${BASE_URL}/haftpflicht-hausrat`, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await sleep(3000);

    const phvBefore = await p.evaluate(() => ({
      phvIframes: document.querySelectorAll('#tcpp-iframe-phv iframe').length,
      hrIframes: document.querySelectorAll('#tcpp-iframe-hr iframe').length,
    }));
    console.log(`  Tab 1 (Haftpflicht aktiv): PHV-iFrames=${phvBefore.phvIframes}, HR-iFrames=${phvBefore.hrIframes}`);

    const hrBtn = p.locator('button', { hasText: 'Hausrat' }).first();
    let tabSwitchOk = false;
    if (await hrBtn.count()) {
      await hrBtn.click();
      await sleep(3500);
      const hrAfter = await p.evaluate(() => ({
        phvIframes: document.querySelectorAll('#tcpp-iframe-phv iframe').length,
        hrIframes: document.querySelectorAll('#tcpp-iframe-hr iframe').length,
      }));
      console.log(`  Tab 2 (Hausrat aktiviert): PHV-iFrames=${hrAfter.phvIframes}, HR-iFrames=${hrAfter.hrIframes}`);
      tabSwitchOk = hrAfter.hrIframes === 1;
      console.log(`  Ergebnis Tab-Umschaltung: ${tabSwitchOk ? '✅ BESTANDEN' : '⚠️ FEHLER'}`);
    }
    await ctx.close();
  }

  // Summary
  const passedCount = results.filter(r => r.passed).length;
  console.log('\n========================================================================');
  console.log(`📊 TEST-ZUSAMMENFASSUNG: ${passedCount} von ${results.length} Rechnern erfolgreich getestet!`);
  console.log('========================================================================');

  const reportPath = path.join(process.cwd(), 'scripts', 'test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Ergebnisse gespeichert in: ${reportPath}\n`);

  await browser.close();
}

runTests().catch(err => {
  console.error('Fataler Test-Fehler:', err);
  process.exit(1);
});
