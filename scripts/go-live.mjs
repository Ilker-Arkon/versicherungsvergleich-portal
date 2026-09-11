// 🏁 Go-Live-Abnahme (Task 11)
// Bündelt alle E2E-Smoke-Tests gegen die Produktiv-Domain und aggregiert
// das Ergebnis in einem einzigen Report (scripts/go-live-report.json).
//
// Aufruf:  node scripts/go-live.mjs            → gegen https://sichertarif.de
//          TEST_URL=https://staging.example.de node scripts/go-live.mjs
//
// Hinweis: Der Kontaktformular-Test versendet EINE echte Test-E-Mail an
// info@sichertarif.de (verifiziert SMTP/Server Action end-to-end).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.TEST_URL || 'https://sichertarif.de';

const LOG_DIR = path.join(process.cwd(), 'scripts', 'screenshots', 'go-live-logs');
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const SUITES = [
  { id: 'navigation',      label: 'Navigation, interne Links & 404',               script: 'test-navigation.mjs' },
  { id: 'cookie-consent',  label: 'DSGVO Cookie-Consent-Flow',                      script: 'test-cookie-consent-flow.mjs' },
  { id: 'calculators',     label: '27 Vergleichsrechner (genau 1 je Seite + IDs)',  script: 'test-all-calculators.mjs' },
  { id: 'widgets',         label: 'Widget DSGVO-Gate & kein Doppel-Mount',          script: 'verify-widgets.mjs' },
  { id: 'contact-form',    label: 'Kontaktformular (Validierung + Honeypot + SMTP)', script: 'test-contact-form.mjs' },
  { id: 'mobile',          label: 'Mobile Responsive (375 px)',                     script: 'test-mobile-responsive.mjs' },
  { id: 'full-site',       label: 'Voll-Site Integrität (33 Seiten × 5 Viewports)', script: 'verify-full-site.mjs' },
];

const results = [];
let allPassed = true;

console.log('='.repeat(72));
console.log('🏁 GO-LIVE-ABNAHME — SicherTarif');
console.log(`🎯 Ziel-Domain: ${BASE_URL}`);
console.log('='.repeat(72));

for (const suite of SUITES) {
  console.log(`\n${'─'.repeat(72)}`);
  console.log(`▶ ${suite.label}`);
  console.log(`${'─'.repeat(72)}`);

  const started = Date.now();
  const res = spawnSync(process.execPath, [path.join('scripts', suite.script)], {
    cwd: process.cwd(),
    env: { ...process.env, TEST_URL: BASE_URL },
    encoding: 'utf8',
    timeout: 15 * 60 * 1000, // 15 Minuten pro Suite
  });
  const durationMs = Date.now() - started;

  const logFile = path.join(LOG_DIR, `${suite.id}.log`);
  fs.writeFileSync(logFile, `${res.stdout || ''}\n--- STDERR ---\n${res.stderr || ''}`, 'utf8');

  let status;
  if (res.error) {
    status = `ABBRUCH (${res.error.message})`;
  } else if (res.signal) {
    status = `TIMEOUT (${res.signal})`;
  } else if (res.status === 0) {
    status = 'OK';
  } else {
    status = `FEHLGESCHLAGEN (Exit ${res.status})`;
  }

  // Rechner-Suite: exakten Bestanden-Zähler aus dem JSON-Report ziehen.
  let detail = '';
  if (suite.id === 'calculators') {
    try {
      const report = JSON.parse(fs.readFileSync(path.join('scripts', 'test-results.json'), 'utf8'));
      const passed = report.filter((r) => r.passed).length;
      detail = `${passed}/${report.length} Rechner bestanden`;
      if (passed < report.length) {
        status = 'TEILWEISE FEHLGESCHLAGEN';
      }
    } catch {
      detail = 'Report nicht lesbar';
    }
  }

  const ok = status === 'OK';
  if (!ok) allPassed = false;
  results.push({ id: suite.id, label: suite.label, status, detail, durationMs });
  console.log(`\n  → ${ok ? '✅' : '❌'} ${status}${detail ? ` — ${detail}` : ''} (${(durationMs / 1000).toFixed(0)}s) · Log: ${logFile}`);
}

console.log(`\n\n${'='.repeat(72)}`);
console.log('🏁 GESAMTERGEBNIS');
console.log(`${'='.repeat(72)}`);
for (const r of results) {
  const ok = r.status === 'OK';
  console.log(`  ${ok ? '✅' : '❌'} ${r.label}: ${r.status}${r.detail ? ` — ${r.detail}` : ''}`);
}
console.log(`${'='.repeat(72)}`);
console.log(allPassed ? '✅ ALLE PRÜFUNGEN BESTANDEN' : '❌ NICHT BESTANDEN — Details siehe Logs');
console.log(`${'='.repeat(72)}\n`);

const reportFile = path.join(process.cwd(), 'scripts', 'go-live-report.json');
fs.writeFileSync(
  reportFile,
  JSON.stringify(
    { baseUrl: BASE_URL, timestamp: new Date().toISOString(), allPassed, suites: results },
    null,
    2,
  ),
  'utf8',
);
console.log(`Report gespeichert: ${reportFile}\n`);

process.exit(allPassed ? 0 : 1);
