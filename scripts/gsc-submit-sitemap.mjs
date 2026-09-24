#!/usr/bin/env node
// Reicht die Sitemap erneut ein (erzwingt frischen Crawl).
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

const key = JSON.parse(await readFile('C:/Users/Home/Desktop/AI_Projekte/ai-holding/config/google-credentials.json', 'utf8'));
const token = await getToken(key, 'https://www.googleapis.com/auth/webmasters');
const site = 'sc-domain:sichertarif.de';
const feed = 'https://sichertarif.de/sitemap.xml';

const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(feed)}`, {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: '{}',
});
console.log('HTTP', res.status);
const text = await res.text();
console.log(text ? text.slice(0, 500) : '✅ Sitemap erneut eingereicht (204 No Content = OK). Google liest sie nun neu.');
