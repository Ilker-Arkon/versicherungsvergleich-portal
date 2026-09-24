#!/usr/bin/env node
// Prüft Sitemap-Status + Indexierung aller URLs (via URL Inspection API).
import { readFile } from 'node:fs/promises';
import { createSign } from 'node:crypto';

const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
async function getToken(key, scope) {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => b64url(Buffer.from(JSON.stringify(o)));
  const toSign = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({ iss: key.client_email, scope, aud: key.token_uri || 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`;
  const signer = createSign('RSA-SHA256'); signer.update(toSign); signer.end();
  const jwt = `${toSign}.${b64url(signer.sign(key.private_key))}`;
  const res = await fetch(key.token_uri || 'https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }) });
  const d = await res.json(); if (d.error) throw new Error(`Token: ${d.error} ${d.error_description || ''}`); return d.access_token;
}

const key = JSON.parse(await readFile(process.argv[2] || 'C:/Users/Home/Desktop/AI_Projekte/ai-holding/config/google-credentials.json', 'utf8'));
const token = await getToken(key, 'https://www.googleapis.com/auth/webmasters.readonly');
const site = 'sc-domain:sichertarif.de';
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

// 1) Sitemaps
console.log('🗺️ Sitemap-Status:');
const sm = await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps`, { headers })).json();
if (sm.sitemap?.length) {
  for (const s of sm.sitemap) {
    console.log(`  - ${s.path}\n      Eingereicht: ${s.isPending ? 'ausstehend' : 'ja'} · Fehler: ${s.errors ?? 0} · Warnungen: ${s.warnings ?? 0} · Zuletzt gelesen: ${s.lastDownloaded || 'noch nie'} · ${s.contents?.length ?? 0} URLs`);
  }
} else {
  console.log('  ⚠️ Keine Sitemap eingereicht. Ich prüfe die Live-Sitemap und reiche sie ggf. ein.');
}

// 2) Live-Sitemap laden
const xml = await (await fetch('https://sichertarif.de/sitemap.xml', { redirect: 'follow' })).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`\n📄 Live-Sitemap: ${urls.length} URLs gefunden.`);

// 3) URL-Inspection für jede URL
console.log(`\n🔍 Indexierung (${urls.length} Seiten):\n`);
const buckets = {};
let indexed = 0;
for (const u of urls) {
  const r = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', { method: 'POST', headers, body: JSON.stringify({ inspectionUrl: u, siteUrl: site }) });
  if (r.status === 429) { await new Promise((res) => setTimeout(res, 2000)); continue; }
  const d = await r.json();
  const st = d.inspectionResult?.indexStatusResult;
  const state = st?.coverageState || (d.error ? `API-Fehler: ${d.error.message}` : 'keine Daten');
  const fetchState = st?.pageFetchState || '';
  const isIndexed = /indexed/i.test(state) && !/not indexed/i.test(state);
  const flag = isIndexed ? '🟢' : /discovered|crawled/i.test(state) ? '🟡' : '🔴';
  if (isIndexed) indexed++;
  buckets[state] = (buckets[state] || 0) + 1;
  console.log(`  ${flag} ${state.padEnd(42)} ${fetchState ? '· ' + fetchState : ''}  ${u.replace('https://sichertarif.de', '') || '/'}`);
  await new Promise((res) => setTimeout(res, 150));
}

console.log(`\n📈 Zusammenfassung: ${indexed}/${urls.length} indexiert`);
for (const [k, v] of Object.entries(buckets)) console.log(`  ${String(v).padStart(3)} × ${k}`);
