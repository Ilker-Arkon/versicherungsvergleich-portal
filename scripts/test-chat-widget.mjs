import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = process.env.TEST_URL || 'https://sichertarif.de';
const SS_DIR = path.join(process.cwd(), 'scripts', 'screenshots', 'chat');

if (!fs.existsSync(SS_DIR)) {
  fs.mkdirSync(SS_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function testChatWidget() {
  console.log('========================================================================');
  console.log(`🤖 Starte Chat-Widget-Test (Nacht-Fenster simuliert) auf: ${BASE_URL}`);
  console.log('========================================================================\n');

  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  // Cookie-Consent vorab setzen (der Chat selbst ist davon unabhängig, räumt aber Overlays weg).
  await ctx.addInitScript(() => {
    localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
  });

  const page = await ctx.newPage();

  // Uhr auf 23:00 Uhr Europe/Berlin stellen (Nachtfenster 20:00–08:00 Uhr).
  await page.clock.setFixedTime(new Date('2026-09-11T23:00:00+02:00'));

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

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(2000);

  // 1) Launcher ist nachts sichtbar.
  const launcher = page.locator('button[aria-label="Chat öffnen"]');
  const launcherVisible = await launcher.isVisible().catch(() => false);
  log('Chat-Launcher ist nachts sichtbar', launcherVisible);

  if (!launcherVisible) {
    await page.screenshot({ path: path.join(SS_DIR, 'chat-launcher-missing.png') });
    console.log('\n========================================================================');
    console.log(`📊 TEST-ZUSAMMENFASSUNG CHAT: ${passed} bestanden, ${failed} fehlgeschlagen`);
    console.log('========================================================================\n');
    await browser.close();
    process.exit(1);
  }

  // 2) Panel öffnet sich.
  await launcher.click();
  await sleep(400);
  const dialog = page.locator('[role="dialog"][aria-label="Support-Chat"]');
  const dialogOpen = await dialog.isVisible().catch(() => false);
  log('Chat-Panel öffnet sich', dialogOpen);

  // 3) Nachricht senden und Antwort abwarten.
  const input = dialog.locator('input[type="text"]');
  await input.fill('Was ist der Unterschied zwischen einer Haftpflicht- und einer Hausratversicherung?');
  await dialog.locator('button[aria-label="Nachricht senden"]').click();

  const assistant = dialog.locator('[data-role="assistant"]').first();
  const replied = await assistant
    .waitFor({ state: 'visible', timeout: 45000 })
    .then(() => true)
    .catch(() => false);
  log('Assistent antwortet auf die Frage', replied);

  if (replied) {
    const replyText = (await assistant.innerText().catch(() => '')).trim();
    console.log(`\n   Antwort (Auszug): ${replyText.slice(0, 120).replace(/\n/g, ' ')}…\n`);
    log('Antwort ist nicht leer', replyText.length > 0);
  }

  await page.screenshot({ path: path.join(SS_DIR, 'chat-panel.png') });

  console.log('\n========================================================================');
  console.log(`📊 TEST-ZUSAMMENFASSUNG CHAT: ${passed} bestanden, ${failed} fehlgeschlagen`);
  console.log('========================================================================\n');

  await browser.close();
  if (failed > 0) process.exit(1);
}

testChatWidget().catch((err) => {
  console.error('Fataler Chat-Test-Fehler:', err);
  process.exit(1);
});
