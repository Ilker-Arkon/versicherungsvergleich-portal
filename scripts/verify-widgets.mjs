// Verifikation: zählt iframes in den Partner-Widgets (erkennt doppelte Rechner)
// Nutzt system-Chrome via playwright-core (kein Browser-Download nötig).
import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// (Name, containerId) — IDs direkt aus lib/partnerWidgets.ts
const PAGES = [
  ['kfz-versicherung', 'tcpp-iframe-kfz'],
  ['motorrad-versicherung', 'tcpp-iframe-mot'],
  ['haftpflicht', 'tcpp-iframe-phv'],
  ['hausrat', 'tcpp-iframe-hr'],
  ['pkv', 'tcpp-iframe-pkv'],
  ['rechtsschutz-versicherung', 'tcpp-iframe-rs'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

for (const [name, containerId] of PAGES) {
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  const errors = [];
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', (e) => errors.push(String(e)));

  try {
    await p.goto(`http://localhost:3000/${name}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForSelector(`#${containerId} iframe`, { timeout: 8000 }).catch(() => {});
    await sleep(2500);

    const stats = await p.evaluate((cid) => {
      const container = document.getElementById(cid);
      const iframesInContainer = container ? container.querySelectorAll('iframe').length : -1;
      const allIframes = Array.from(document.querySelectorAll('iframe')).map(f => f.src || '(leer)');
      const scriptCount = document.querySelectorAll('script[src*="form.partner-versicherung.de"]').length;
      return { containerFound: !!container, iframesInContainer, allIframes, scriptCount };
    }, containerId);

    const verdict = stats.iframesInContainer === 1 ? 'OK (1)' :
      (stats.iframesInContainer > 1 ? `DOPPELT (${stats.iframesInContainer})` :
      (stats.iframesInContainer === 0 ? 'LEER (0)' : 'CONTAINER FEHLT'));

    console.log(`\n=== ${name}  [#${containerId}] ===`);
    console.log(`  Verdict: ${verdict}   |  Partner-Skripte: ${stats.scriptCount}`);
    console.log(`  iframes gesamt: ${stats.allIframes.length}`);
    stats.allIframes.forEach((s, i) => console.log(`    [${i}] ${s.slice(0, 90)}`));
    if (errors.length) console.log(`  Console-Fehler (${errors.length}): ${[...new Set(errors)].slice(0, 4).join(' || ')}`);
  } catch (e) {
    console.log(`\n=== ${name} === FEHLER: ${e.message}`);
  } finally {
    await ctx.close();
  }
}

// --- Spezialfall: haftpflicht-hausrat (2 Widgets via Tabs) ---
try {
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/haftpflicht-hausrat', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(4000);
  const countIframes = () => p.evaluate(() => ({
    phv: document.querySelectorAll('#tcpp-iframe-phv iframe').length,
    hr: document.querySelectorAll('#tcpp-iframe-hr iframe').length,
    total: document.querySelectorAll('iframe').length,
    scripts: document.querySelectorAll('script[src*="form.partner-versicherung.de"]').length,
  }));
  console.log('\n=== haftpflicht-hausrat (Tab 1) ===', JSON.stringify(await countIframes()));
  // Versuche, den Tab zu wechseln (Buttons mit "Hausrat" suchen)
  const tabBtn = p.locator('button', { hasText: 'Hausrat' }).first();
  if (await tabBtn.count()) {
    await tabBtn.click();
    await sleep(4000);
    console.log('=== haftpflicht-hausrat (Tab 2) ===', JSON.stringify(await countIframes()));
  } else {
    console.log('  (kein Hausrat-Tab-Button gefunden)');
  }
  await ctx.close();
} catch (e) {
  console.log('haftpflicht-hausrat FEHLER:', e.message);
}

await browser.close();
console.log('\n--- Verifikation abgeschlossen ---');
