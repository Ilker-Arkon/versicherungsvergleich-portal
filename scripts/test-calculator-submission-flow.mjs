import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/Home/.gemini/antigravity/brain/2dc5e61b-4a81-478b-97cb-9bdd0ce0162e/audit-screenshots/calculator-submission-flow';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log('🚀 Starte detaillierten Durchklick-Test (Submission Flow Analysis)...');
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  // 1. TEST: Privathaftpflicht (/haftpflicht)
  console.log('\n--- 1. Teste Privathaftpflicht (/haftpflicht) ---');
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    await ctx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });

    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/haftpflicht`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await sleep(3000);

    const frames = page.frames();
    const phvFrame = frames.find(f => f.url().includes('partner-versicherung.de') || f.url().includes('tarifcheck'));

    if (phvFrame) {
      console.log(`  ✓ Phv-Frame gefunden: ${phvFrame.url().slice(0, 80)}...`);
      
      // Suche nach dem Vergleichs-Button im Frame
      const submitBtn = phvFrame.locator('input[type="submit"], button[type="submit"], .btn-submit, input[value*="Vergleich"], button:has-text("Vergleich"), button:has-text("berechnen")').first();
      const count = await submitBtn.count();
      console.log(`  ℹ️ Submit-Buttons gefunden: ${count}`);

      if (count > 0) {
        const btnVal = await submitBtn.getAttribute('value') || await submitBtn.innerText() || 'Submit';
        console.log(`  👉 Klicke Button: "${btnVal.trim()}"...`);

        // Screenshot vor Klick
        await page.screenshot({ path: path.join(OUT_DIR, 'phv_before_click.png'), fullPage: false });

        // Klick auf Berechnen
        await submitBtn.click().catch(e => console.log('Click warn:', e.message));
        await sleep(4000);

        // Screenshot nach Klick
        await page.screenshot({ path: path.join(OUT_DIR, 'phv_after_click.png'), fullPage: false });
        console.log('  ✓ Screenshot phv_after_click.png gespeichert.');

        // Prüfe, ob Ergebnisseite oder Tariftabelle geladen hat
        const frameContent = await phvFrame.content().catch(() => '');
        const hasTarife = frameContent.includes('Tarif') || frameContent.includes('Euro') || frameContent.includes('€') || frameContent.includes('Gesellschaft');
        console.log(`  📊 Wurden Tarife / Ergebnisse geladen? ${hasTarife ? 'JA (Ergebnistabelle sichtbar)' : 'NEIN (noch Eingabemaske oder Validierungsfehler)'}`);
      }
    }
    await ctx.close();
  }

  // 2. TEST: Kfz-Versicherung (/kfz-versicherung)
  console.log('\n--- 2. Teste Kfz-Versicherung (/kfz-versicherung) ---');
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    await ctx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });

    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/kfz-versicherung`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await sleep(3500);

    const frames = page.frames();
    const kfzFrame = frames.find(f => f.url().includes('check24.de') || f.url().includes('partner-versicherung.de'));

    if (kfzFrame) {
      console.log(`  ✓ Kfz-Frame gefunden: ${kfzFrame.url().slice(0, 80)}...`);

      // Screenshot vor Klick
      await page.screenshot({ path: path.join(OUT_DIR, 'kfz_step1.png'), fullPage: false });

      // Suche nach dem "weiter"-Button
      const nextBtn = kfzFrame.locator('button:has-text("weiter"), input[value*="weiter"]').first();
      const hasNext = await nextBtn.count() > 0;
      console.log(`  ℹ️ "weiter"-Button vorhanden: ${hasNext}`);

      if (hasNext) {
        console.log('  👉 Klicke "weiter" im Kfz-Rechner...');
        await nextBtn.click().catch(e => console.log('Click warn:', e.message));
        await sleep(2500);

        // Screenshot nach Klick
        await page.screenshot({ path: path.join(OUT_DIR, 'kfz_step2.png'), fullPage: false });
        console.log('  ✓ Screenshot kfz_step2.png gespeichert.');

        // Prüfe aktuellen Status des Kfz-Rechners
        const frameTitle = await kfzFrame.title();
        console.log(`  📊 Kfz-Frame Titel nach Klick: "${frameTitle}"`);
      }
    }
    await ctx.close();
  }

  // 3. TEST: Kredit-Vergleich (/kredit-vergleich)
  console.log('\n--- 3. Teste Kredit-Vergleich (/kredit-vergleich) ---');
  {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    await ctx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });

    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/kredit-vergleich`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await sleep(3500);

    const frames = page.frames();
    const kreditFrame = frames.find(f => f.url().includes('partner-versicherung.de') || f.url().includes('kredit'));

    if (kreditFrame) {
      console.log(`  ✓ Kredit-Frame gefunden: ${kreditFrame.url().slice(0, 80)}...`);

      // Screenshot vor Klick
      await page.screenshot({ path: path.join(OUT_DIR, 'kredit_before.png'), fullPage: false });

      // Suche nach Vergleich starten
      const compareBtn = kreditFrame.locator('button, input[type="submit"]').first();
      if (await compareBtn.count() > 0) {
        const text = await compareBtn.innerText().catch(() => 'Submit');
        console.log(`  👉 Klicke Button: "${text.trim().slice(0, 30)}"...`);
        await compareBtn.click().catch(e => console.log('Click warn:', e.message));
        await sleep(3000);
        await page.screenshot({ path: path.join(OUT_DIR, 'kredit_after.png'), fullPage: false });
        console.log('  ✓ Screenshot kredit_after.png gespeichert.');
      }
    }
    await ctx.close();
  }

  await browser.close();
  console.log('\n🏁 DURCHKLICK-TEST ERFOLGREICH BEENDET.');
}

run().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
