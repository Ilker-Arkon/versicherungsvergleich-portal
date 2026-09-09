import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/Home/.gemini/antigravity/brain/2dc5e61b-4a81-478b-97cb-9bdd0ce0162e/audit-screenshots';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log('🚀 Starte Live-Test des Kontaktformulars mit echtem IONOS-Mailversand...');
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  await ctx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });

  const page = await ctx.newPage();

  page.on('console', msg => console.log('Browser log:', msg.text()));

  await page.goto(`${BASE_URL}/kontakt`, { waitUntil: 'domcontentloaded' });
  await sleep(1000);

  // Fülle das Kontaktformular aus
  console.log('Fülle Formularfelder aus...');
  await page.fill('input[name="name"]', 'Max Mustermann (Testkunde)');
  await page.fill('input[name="email"]', 'testkunde@sichervergleich.de');
  await page.fill('input[name="subject"]', 'Test-Anfrage: Beratung zur Kfz-Versicherung');
  await page.fill('textarea[name="message"]', 'Guten Tag,\n\ndies ist eine echte Testnachricht über das Kontaktformular auf SicherVergleich (sichertarif.de).\nBitte prüfen Sie, ob die E-Mail ordnungsgemäß im IONOS-Postfach info@sichertarif.de angekommen ist.\n\nViele Grüße,\nMax Mustermann');

  // Checkbox Datenschutz/Einwilligung ankreuzen
  console.log('Setze Häkchen bei Einwilligung...');
  await page.check('input[name="consent"]');

  // Screenshot vor Absenden
  await page.screenshot({ path: path.join(OUT_DIR, 'contact_form_filled.png'), fullPage: false });

  // Absenden
  console.log('Klicke auf Absenden...');
  await page.click('button[type="submit"]');

  // Warte auf die Antwort der Server Action
  await sleep(4000);

  // Screenshot nach Absenden
  await page.screenshot({ path: path.join(OUT_DIR, 'contact_form_submitted.png'), fullPage: false });

  // Prüfe Erfolgsmeldung im DOM
  const successText = await page.locator('text=Vielen Dank').or(page.locator('.text-emerald-800')).first();
  const isSuccess = await successText.isVisible().catch(() => false);
  const text = isSuccess ? await successText.innerText() : 'Keine Erfolgsmeldung gefunden';

  console.log(`\n==================================================`);
  console.log(`Ergebnis des Formular-Tests: ${isSuccess ? '✅ ERFOLGREICH!' : '⚠️ NICHT ERFOLGREICH'}`);
  console.log(`Angezeigte Meldung: "${text.trim()}"`);
  console.log(`==================================================\n`);

  await browser.close();
}

run().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
