// Überträgt die Werte aus .env.local nach Vercel (production).
//
// Aufruf aus dem Repo-Root:  node scripts/push-env-to-vercel.mjs
//
// Sicherheit: Die Werte werden zur Laufzeit aus .env.local gelesen und
// direkt als Prozess-Argument an die Vercel-CLI (dist/vc.js) übergeben —
// ohne Shell, ohne Ausgabe der Secrets im Terminal. SMTP_USER/SMTP_PASS
// werden als --sensitive hinterlegt.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(import.meta.dirname);
const VC_JS = 'C:\\Users\\Home\\AppData\\Roaming\\npm\\node_modules\\vercel\\dist\\vc.js';

// .env.local einlesen (dotenv-konform: umschließende Anführungszeichen entfernen)
const env = {};
const envText = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8');
for (const line of envText.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) {
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[m[1]] = v;
  }
}

const VARS = [
  ['SMTP_HOST', false],
  ['SMTP_PORT', false],
  ['SMTP_USER', true],
  ['SMTP_PASS', true],
  ['CONTACT_EMAIL', false],
  ['EMAIL_FROM', false],
  ['NEXT_PUBLIC_SITE_URL', false],
  ['NEXT_PUBLIC_WHATSAPP_NUMBER', false],
];

let failed = false;
for (const [name, sensitive] of VARS) {
  const value = env[name];
  if (value === undefined || value === '') {
    console.log(`SKIP  ${name} (leer)`);
    continue;
  }
  const args = ['env', 'add', name, 'production', '--value', value, '--force', '-y'];
  if (sensitive) args.push('--sensitive');

  const r = spawnSync(process.execPath, [VC_JS, ...args], {
    cwd: ROOT,
    shell: false,
    encoding: 'utf8',
    timeout: 60000,
  });

  if (r.status === 0) {
    console.log(`OK    ${name}${sensitive ? ' (sensitive)' : ''}`);
  } else {
    failed = true;
    const msg = String(r.stderr || r.stdout || '').replace(/\s+/g, ' ').trim().slice(0, 160);
    console.log(`FAIL  ${name} → ${msg}`);
  }
}

console.log(
  failed
    ? '\n⚠️ Mindestens ein Wert konnte nicht gesetzt werden — siehe oben.'
    : '\n✅ Alle Env-Vars wurden nach Vercel (production) übertragen.',
);
