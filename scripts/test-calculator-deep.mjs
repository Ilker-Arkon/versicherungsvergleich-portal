import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/Home/.gemini/antigravity/brain/2dc5e61b-4a81-478b-97cb-9bdd0ce0162e/audit-screenshots/calculator-deep-analysis';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targetPages = [
  { path: '/kfz-versicherung', name: 'kfz', label: 'Kfz-Versicherung' },
  { path: '/haftpflicht', name: 'haftpflicht', label: 'Privathaftpflicht' },
  { path: '/kredit-vergleich', name: 'kredit', label: 'Kredit-Vergleich' },
  { path: '/girokonto-vergleich', name: 'girokonto', label: 'Girokonto-Vergleich' },
  { path: '/pkv', name: 'pkv', label: 'Private Krankenversicherung' },
  { path: '/rechtsschutz-versicherung', name: 'rechtsschutz', label: 'Rechtsschutz' }
];

async function run() {
  console.log('🚀 Starte Deep-Analysis der Tarifrechner (Aufgabe 2: Finden & Analysieren)...');
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  const report = {
    testedAt: new Date().toISOString(),
    results: []
  };

  for (const item of targetPages) {
    console.log(`\n==================================================`);
    console.log(`🔍 Untersuche Rechner: ${item.label} (${item.path})`);
    console.log(`==================================================`);

    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    // Accept cookies in localStorage
    await ctx.addInitScript(() => {
      localStorage.setItem('tarifvergleich-consent-v1', JSON.stringify({ necessary: true, marketing: true }));
    });

    const page = await ctx.newPage();

    const consoleLogs = [];
    const consoleErrors = [];
    const networkRequests = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      consoleLogs.push({ type, text });
      if (type === 'error') {
        consoleErrors.push(text);
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(`Uncaught: ${err.message}`);
    });

    page.on('requestfailed', (req) => {
      failedRequests.push({
        url: req.url().slice(0, 120),
        failure: req.failure()?.errorText || 'unknown',
      });
    });

    page.on('response', (res) => {
      const url = res.url();
      if (url.includes('partner-versicherung') || url.includes('tarifcheck') || url.includes('form.')) {
        networkRequests.push({
          url: url.slice(0, 100),
          status: res.status(),
          contentType: res.headers()['content-type'] || '',
        });
      }
    });

    const pageResult = {
      name: item.name,
      label: item.label,
      path: item.path,
      iframeFound: false,
      iframeSrc: null,
      iframeSize: null,
      crossOriginFrames: [],
      formElementsDetected: [],
      interactiveInputs: [],
      buttons: [],
      testInteractionStatus: 'not_attempted',
      consoleErrors: [],
      cspErrors: [],
      screenshots: []
    };

    try {
      await page.goto(`${BASE_URL}${item.path}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
      // Warte auf Script-Injektion und iFrame-Aufbau
      await sleep(3500);

      // 1. Suche nach dem Partner-Container und iFrame
      const iframeInfo = await page.evaluate(() => {
        const widgetContainer = document.querySelector('[id^="tcpp-iframe-"]');
        if (!widgetContainer) return { found: false, reason: 'Container [id^="tcpp-iframe-"] nicht gefunden' };

        const iframe = widgetContainer.querySelector('iframe') || document.querySelector('iframe');
        if (!iframe) return { found: true, iframe: null, reason: 'Container existiert, aber noch kein iframe injiziert' };

        const rect = iframe.getBoundingClientRect();
        return {
          found: true,
          iframe: {
            src: iframe.src,
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0,
            hasResizer: !!iframe.getAttribute('data-resized') || !!iframe.id
          }
        };
      });

      pageResult.iframeFound = !!iframeInfo.iframe;
      if (iframeInfo.iframe) {
        pageResult.iframeSrc = iframeInfo.iframe.src;
        pageResult.iframeSize = `${Math.round(iframeInfo.iframe.width)}x${Math.round(iframeInfo.iframe.height)}`;
        console.log(`  ✓ iFrame gefunden: ${pageResult.iframeSize}px`);
        console.log(`  ✓ iFrame URL: ${pageResult.iframeSrc.slice(0, 80)}...`);
      } else {
        console.log(`  ⚠️ Kein iFrame im DOM: ${iframeInfo.reason}`);
      }

      // Screenshot initial
      const initialPic = path.join(OUT_DIR, `${item.name}_initial.png`);
      await page.screenshot({ path: initialPic, fullPage: false });
      pageResult.screenshots.push(initialPic);

      // 2. Inspiziere Frames in Playwright
      const frames = page.frames();
      console.log(`  ℹ️ Gefundene Playwright-Frames: ${frames.length}`);

      for (const frame of frames) {
        const frameUrl = frame.url();
        if (frameUrl === page.url()) continue; // Überspringe Haupt-Frame

        pageResult.crossOriginFrames.push(frameUrl.slice(0, 100));

        try {
          // Versuche Formularelemente im Frame zu finden
          const frameAnalysis = await frame.evaluate(() => {
            const inputs = Array.from(document.querySelectorAll('input, select, button, a[href]')).map((el) => {
              return {
                tag: el.tagName.toLowerCase(),
                type: el.getAttribute('type') || '',
                name: el.getAttribute('name') || '',
                id: el.getAttribute('id') || '',
                placeholder: el.getAttribute('placeholder') || '',
                text: (el.innerText || el.value || '').trim().slice(0, 30),
                isVisible: el.offsetWidth > 0 && el.offsetHeight > 0
              };
            });

            const headings = Array.from(document.querySelectorAll('h1, h2, h3, .headline, .title')).map((h) => (h.innerText || '').trim().slice(0, 40));

            return {
              title: document.title,
              headings: headings.slice(0, 3),
              totalElements: inputs.length,
              elements: inputs.filter(e => e.isVisible).slice(0, 10)
            };
          });

          pageResult.formElementsDetected.push({
            frameUrl: frameUrl.slice(0, 80),
            title: frameAnalysis.title,
            headings: frameAnalysis.headings,
            totalElements: frameAnalysis.totalElements,
            sampleElements: frameAnalysis.elements
          });

          console.log(`  ✓ Frame geladen: "${frameAnalysis.title || 'Kein Titel'}" mit ${frameAnalysis.totalElements} interaktiven Elementen`);
          if (frameAnalysis.elements.length > 0) {
            console.log(`    Beispiele:`, frameAnalysis.elements.slice(0, 3).map(e => `${e.tag}[${e.type || e.text}]`).join(', '));
          }

          // 3. Teste Interaktion (z. B. Klick auf Option oder Eingabe)
          const testInput = frame.locator('input[type="text"], input[type="tel"], input[type="number"], input:not([type="hidden"])').first();
          const hasInput = await testInput.count() > 0 && await testInput.isVisible().catch(() => false);

          if (hasInput) {
            console.log(`  👉 Teste Texteingabe in Input-Feld...`);
            await testInput.click().catch(() => {});
            await testInput.fill('10115').catch(() => {});
            await sleep(500);
            pageResult.testInteractionStatus = 'input_filled_10115';
          } else {
            const testBtn = frame.locator('button, .btn, input[type="submit"], [role="button"]').first();
            const hasBtn = await testBtn.count() > 0 && await testBtn.isVisible().catch(() => false);
            if (hasBtn) {
              const btnText = await testBtn.innerText().catch(() => 'Button');
              console.log(`  👉 Interaktions-Button gefunden: "${btnText.trim().slice(0, 30)}"`);
              pageResult.testInteractionStatus = `button_detected: ${btnText.trim().slice(0, 30)}`;
            } else {
              pageResult.testInteractionStatus = 'readonly_or_complex_layout';
            }
          }

          // Screenshot nach Frame-Interaktion
          const framePic = path.join(OUT_DIR, `${item.name}_interacted.png`);
          await page.screenshot({ path: framePic, fullPage: false });
          pageResult.screenshots.push(framePic);

        } catch (frameErr) {
          console.log(`  ⚠️ Frame-Zugriff eingeschränkt (Same-Origin-Policy oder CSP):`, frameErr.message.slice(0, 100));
          pageResult.formElementsDetected.push({
            frameUrl: frameUrl.slice(0, 80),
            error: frameErr.message
          });
        }
      }

      // 4. Filtere CSP und Fehler
      const cspErrors = consoleErrors.filter(e => e.toLowerCase().includes('content security policy') || e.toLowerCase().includes('csp') || e.toLowerCase().includes('blocked'));
      pageResult.consoleErrors = consoleErrors.slice(0, 5);
      pageResult.cspErrors = cspErrors;

      if (cspErrors.length > 0) {
        console.log(`  ⚠️ ${cspErrors.length} CSP-Meldungen registriert!`);
      } else {
        console.log(`  ✓ 0 blockierende CSP-Fehler.`);
      }

    } catch (err) {
      console.error(`  ❌ Fehler bei Seite ${item.path}:`, err.message);
      pageResult.testInteractionStatus = `error: ${err.message}`;
    }

    report.results.push(pageResult);
    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUT_DIR, 'calculator-deep-analysis-report.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  );

  console.log('\n==================================================');
  console.log('🏁 ANALYSE ABGESCHLOSSEN! Bericht gespeichert in:');
  console.log(path.join(OUT_DIR, 'calculator-deep-analysis-report.json'));
  console.log('==================================================');

  return report;
}

run().catch((e) => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
