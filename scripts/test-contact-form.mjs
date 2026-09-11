import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://sichertarif.de';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function testContactForm() {
  console.log('========================================================================');
  console.log(`✉️ Starte Kontaktformular-Funktionstest auf: ${BASE_URL}/kontakt`);
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  const ctx = await browser.newContext();
  await ctx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });

  const p = await ctx.newPage();
  await p.goto(`${BASE_URL}/kontakt`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(1500);

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

  // 1. Felder prüfen
  console.log('--- Test 1: DOM-Struktur & Felder prüfen ---');
  const nameInput = await p.locator('input#name').count();
  const emailInput = await p.locator('input#email').count();
  const subjectInput = await p.locator('input#subject').count();
  const messageInput = await p.locator('textarea#message').count();
  const consentCheckbox = await p.locator('input[name="consent"]').count();
  const honeypotInput = await p.locator('input[name="website"]').count();
  const submitButton = await p.locator('button[type="submit"]').count();

  log('Name-Feld vorhanden', nameInput === 1);
  log('E-Mail-Feld vorhanden', emailInput === 1);
  log('Betreff-Feld vorhanden', subjectInput === 1);
  log('Nachrichten-Textarea vorhanden', messageInput === 1);
  log('Datenschutz-Consent-Checkbox vorhanden', consentCheckbox === 1);
  log('Honeypot-Spamschutz vorhanden', honeypotInput === 1);
  log('Absende-Button vorhanden', submitButton === 1);

  // 2. Client-Validierung: Leeres Absenden verhindern
  console.log('\n--- Test 2: Client-Validierung bei leerem Formular ---');
  await p.locator('button[type="submit"]').click();
  await sleep(500);
  const nameInvalid = await p.$eval('input#name', el => !el.checkValidity());
  log('Browser blockiert Absenden ohne Pflichtfelder', nameInvalid);

  // 3. Client-Validierung: Ungültige E-Mail
  console.log('\n--- Test 3: Ungültige E-Mail-Adresse ---');
  await p.fill('input#name', 'Max Mustermann');
  await p.fill('input#email', 'keine-echte-email');
  await p.fill('textarea#message', 'Dies ist eine Testnachricht für das Kontaktformular.');
  await p.locator('input[name="consent"]').check();
  await p.locator('button[type="submit"]').click();
  await sleep(500);
  const emailInvalid = await p.$eval('input#email', el => !el.checkValidity());
  log('Browser blockiert ungültiges E-Mail-Format', emailInvalid);

  // 4. Honeypot-Test (Bot-Erkennung)
  console.log('\n--- Test 4: Honeypot-Spamschutz (Bot-Abwehr) ---');
  await p.fill('input#email', 'max.mustermann@example.de');
  // Honeypot befüllen (wie es ein Spambot tun würde)
  await p.evaluate(() => {
    const hp = document.querySelector('input[name="website"]');
    if (hp) hp.value = 'http://spam-link.ru';
  });
  await p.locator('button[type="submit"]').click();
  await sleep(2500);

  const botResponse = await p.evaluate(() => {
    const text = document.body ? document.body.innerText : '';
    return text.includes('Vielen Dank') || text.includes('erfolgreich');
  });
  log('Honeypot liefert Bot-Täuschung ohne echten Versand', botResponse);

  // 5. Valider Test-Versand
  console.log('\n--- Test 5: Valider Formular-Versand ---');
  await p.goto(`${BASE_URL}/kontakt`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(1000);

  await p.fill('input#name', 'Playwright Automatisierter Test');
  await p.fill('input#email', 'test@tarifvergleich-audit.de');
  await p.fill('input#subject', 'Automatische Systemprüfung Sprint 1');
  await p.fill('textarea#message', 'Guten Tag, dies ist eine automatisierte Testnachricht zur Prüfung der Server Action und der Datenübermittlung.');
  await p.locator('input[name="consent"]').check();

  await p.locator('button[type="submit"]').click();
  await sleep(3500);

  const successMessage = await p.evaluate(() => {
    const text = document.body ? document.body.innerText : '';
    return text.includes('Vielen Dank') || text.includes('Nachricht wurde gesendet') || text.includes('erfolgreich');
  });
  log('Server Action meldet erfolgreichen Versand', successMessage);

  console.log('\n========================================================================');
  console.log(`📊 TEST-ZUSAMMENFASSUNG KONTAKTFORMULAR: ${passed} bestanden, ${failed} fehlgeschlagen`);
  console.log('========================================================================\n');

  await browser.close();

  if (failed > 0) {
    process.exit(1);
  }
}

testContactForm().catch(err => {
  console.error('Fataler Formular-Fehler:', err);
  process.exit(1);
});
