import { chromium } from 'playwright-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.join(process.cwd(), 'scripts', 'screenshots', 'new-layout');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log('🚀 Starte Next.js Server auf Port ' + PORT + '...');
  const server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log('[server]', d.toString().trim()));
  server.stderr.on('data', (d) => console.error('[server err]', d.toString().trim()));

  // Wait for server to be ready
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        ready = true;
        console.log('✅ Server ist bereit!');
        break;
      }
    } catch {}
  }

  if (!ready) {
    console.error('❌ Server konnte nicht gestartet werden');
    server.kill();
    process.exit(1);
  }

  try {
    const browser = await chromium.launch({ executablePath: CHROME, headless: true });
    
    // 1. Mobile Check (iPhone X 375x812)
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    });

    await ctx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });

    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await sleep(1000);

    // Screenshot 1: Mobile Top + AdvisorSection right under Hero
    await page.screenshot({ path: path.join(OUT_DIR, '01-mobile-hero-and-advisor.png'), fullPage: false });
    console.log('📸 Screenshot 01 gespeichert (Hero & Advisor auf Mobile)');

    // Scroll to AdvisorSection
    const advisor = page.locator('text=Ihr persönlicher Ansprechpartner').first();
    await advisor.scrollIntoViewIfNeeded();
    await sleep(500);
    await page.screenshot({ path: path.join(OUT_DIR, '02-mobile-advisor-placement.png'), fullPage: false });
    console.log('📸 Screenshot 02 gespeichert (AdvisorSection Platzierung)');

    // Check Floating Buttons
    const soforthilfeBtn = page.locator('text=Soforthilfe').first();
    const kontaktBtn = page.locator('button:has-text("Kontakt")').first();
    console.log('Soforthilfe Button sichtbar:', await soforthilfeBtn.isVisible());
    console.log('Kontakt Button sichtbar:', await kontaktBtn.isVisible());

    // Screenshot 3: Floating Buttons default state
    await page.screenshot({ path: path.join(OUT_DIR, '03-floating-buttons-collapsed.png'), fullPage: false });
    console.log('📸 Screenshot 03 gespeichert (Floating Buttons geschlossen)');

    // Click Kontakt Button to open speed-dial
    await kontaktBtn.click();
    await sleep(400);

    const anrufenLink = page.locator('a[role="menuitem"]:has-text("Anrufen")').first();
    const whatsappLink = page.locator('a[role="menuitem"]:has-text("WhatsApp")').first();
    const emailLink = page.locator('a[role="menuitem"]:has-text("E-Mail")').first();

    console.log('Speed-Dial Anrufen sichtbar:', await anrufenLink.isVisible());
    console.log('Speed-Dial WhatsApp sichtbar:', await whatsappLink.isVisible());
    console.log('Speed-Dial E-Mail sichtbar:', await emailLink.isVisible());

    await page.screenshot({ path: path.join(OUT_DIR, '04-floating-buttons-expanded.png'), fullPage: false });
    console.log('📸 Screenshot 04 gespeichert (Speed-Dial geöffnet)');

    // 2. Desktop Check (1440x900)
    const desktopCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    await desktopCtx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await sleep(500);
    await desktopPage.screenshot({ path: path.join(OUT_DIR, '05-desktop-hero-and-buttons.png'), fullPage: false });
    console.log('📸 Screenshot 05 gespeichert (Desktop Hero & Buttons)');

    await browser.close();
  } finally {
    console.log('🛑 Beende Server...');
    server.kill();
  }
  console.log('🎉 Alle visuellen Tests erfolgreich abgeschlossen!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
