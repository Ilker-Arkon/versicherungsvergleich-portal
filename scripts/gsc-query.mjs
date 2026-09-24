#!/usr/bin/env node
// Liest Google-Search-Console-Daten (Klicks, Impressions, Position, Seiten) für sichertarif.de.
// Nutzung: node scripts/gsc-query.mjs <keyFile.json>
import { readFile } from 'node:fs/promises';
import { createSign } from 'node:crypto';

const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

async function getToken(key, scope) {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => b64url(Buffer.from(JSON.stringify(o)));
  const toSign = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({
    iss: key.client_email, scope, aud: key.token_uri || 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const signer = createSign('RSA-SHA256');
  signer.update(toSign); signer.end();
  const jwt = `${toSign}.${b64url(signer.sign(key.private_key))}`;
  const res = await fetch(key.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const d = await res.json();
  if (d.error) throw new Error(`Token: ${d.error} ${d.error_description || ''}`);
  return d.access_token;
}

const keyPath = process.argv[2] || 'C:/Users/Home/Desktop/AI_Projekte/ai-holding/config/google-credentials.json';
const key = JSON.parse(await readFile(keyPath, 'utf8'));
const token = await getToken(key, 'https://www.googleapis.com/auth/webmasters.readonly');
const api = 'https://searchconsole.googleapis.com/webmasters/v3';
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

// 1) Zugängliche Properties auflisten
const sitesRes = await fetch(`${api}/sites`, { headers });
const sites = await sitesRes.json();
const targets = (sites.siteEntry || []).filter((s) => s.siteUrl.includes('sichertarif'));
console.log('🔎 Properties mit Zugriff (sichertarif):');
for (const s of targets) console.log('  -', s.siteUrl, `(${s.permissionLevel})`);
const site = targets[0]?.siteUrl;
if (!site) {
  console.log('⚠️ Kein sichertarif-Property gefunden. Alle Properties:');
  for (const s of sites.siteEntry || []) console.log('  -', s.siteUrl, `(${s.permissionLevel})`);
  process.exit(0);
}

const today = new Date();
const end = today.toISOString().slice(0, 10);
const start = new Date(today.getTime() - 27 * 864e5).toISOString().slice(0, 10);
const encSite = encodeURIComponent(site);

async function query(dimensions, rowLimit = 50) {
  const res = await fetch(`${api}/sites/${encSite}/searchAnalytics/query`, {
    method: 'POST', headers,
    body: JSON.stringify({ startDate: start, endDate: end, dimensions, rowLimit }),
  });
  const d = await res.json();
  if (d.error) throw new Error(JSON.stringify(d.error, null, 2));
  return d.rows || [];
}

// 2) Top-Suchanfragen
console.log(`\n📊 Top-Suchanfragen (${start} → ${end}):`);
const qRows = await query(['query'], 20);
for (const r of qRows) {
  console.log(
    `  ${String(r.clicks).padStart(4)} Klicks | ${String(r.impressions).padStart(6)} Impr. | Pos ${r.position.toFixed(1)} | CTR ${(r.ctr * 100).toFixed(1)}% | "${r.keys[0]}"`
  );
}

// 3) Top-Seiten
console.log(`\n📄 Top-Seiten (${start} → ${end}):`);
const pRows = await query(['page'], 30);
for (const r of pRows) {
  console.log(
    `  ${String(r.clicks).padStart(4)} Klicks | ${String(r.impressions).padStart(6)} Impr. | Pos ${r.position.toFixed(1)} | ${r.keys[0]}`
  );
}

// 4) Gesamt
console.log('\n📈 Gesamt im Zeitraum:');
const tot = await query([], 1);
if (tot.length) {
  const t = tot[0];
  console.log(`  Klicks: ${t.clicks}  ·  Impressions: ${t.impressions}  ·  CTR: ${(t.ctr * 100).toFixed(2)}%  ·  Ø Position: ${t.position.toFixed(1)}`);
}
