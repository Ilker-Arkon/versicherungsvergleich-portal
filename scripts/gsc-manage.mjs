#!/usr/bin/env node
// Verwaltet Service Accounts für die Google Search Console über die IAM API.
// Nutzung: node scripts/gsc-manage.mjs <keyFile.json> <list|create <name>|key <email>>
import { readFile, writeFile } from 'node:fs/promises';
import { createSign } from 'node:crypto';

const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

async function getToken(key, scope = 'https://www.googleapis.com/auth/cloud-platform') {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o) => b64url(JSON.stringify(o));
  const toSign = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({
    iss: key.client_email,
    scope,
    aud: key.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signer = createSign('RSA-SHA256');
  signer.update(toSign);
  signer.end();
  const jwt = `${toSign}.${b64url(signer.sign(key.private_key))}`;
  const res = await fetch(key.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`Token-Fehler: ${data.error} ${data.error_description || ''}`);
  return data.access_token;
}

const [, , keyPath, cmd, arg] = process.argv;
if (!keyPath || !cmd) {
  console.error('Nutzung: node gsc-manage.mjs <keyFile.json> <list|create <name>|key <email>>');
  process.exit(1);
}

const key = JSON.parse(await readFile(keyPath, 'utf8'));
const token = await getToken(key);
const project = key.project_id;
const base = `https://iam.googleapis.com/v1/projects/${project}/serviceAccounts`;
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

if (cmd === 'enable') {
  const svc = arg || 'iam.googleapis.com';
  const res = await fetch(`https://serviceusage.googleapis.com/v1/projects/${project}/services/${svc}:enable`, { method: 'POST', headers });
  const data = await res.json();
  if (data.error) {
    console.error('❌ API aktivieren fehlgeschlagen:', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }
  console.log('✅ API aktiviert:', svc);
} else if (cmd === 'list') {
  const res = await fetch(`${base}?pageSize=100`, { headers });
  const data = await res.json();
  if (data.error) {
    console.error('❌ Keine Berechtigung zum Auflisten:', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }
  console.log('✅ Bestehende Service Accounts im Projekt', project + ':');
  for (const sa of data.accounts || []) console.log('  -', sa.email, sa.displayName ? `(${sa.displayName})` : '');
} else if (cmd === 'create') {
  const name = arg || 'sichertarif-gsc';
  const res = await fetch(base, { method: 'POST', headers, body: JSON.stringify({ accountId: name, serviceAccount: { displayName: 'SicherTarif GSC' } }) });
  const data = await res.json();
  if (data.error) {
    console.error('❌ Erstellen fehlgeschlagen:', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }
  console.log('✅ Neues Konto erstellt:');
  console.log('  E-Mail:', data.email);
} else if (cmd === 'key') {
  const email = arg;
  const res = await fetch(`${base}/${encodeURIComponent(email)}/keys`, { method: 'POST', headers, body: JSON.stringify({ keyAlgorithm: 'KEY_ALG_RSA_2048' }) });
  const data = await res.json();
  if (data.error) {
    console.error('❌ Schlüssel erstellen fehlgeschlagen:', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }
  const out = {
    type: 'service_account',
    project_id: project,
    private_key_id: data.name.split('/').pop(),
    private_key: data.privateKeyData ? Buffer.from(data.privateKeyData, 'base64').toString('utf8') : undefined,
    client_email: email,
    client_id: data.validAfterTime ? undefined : undefined,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: data.disableReason ? undefined : undefined,
    universe_domain: 'googleapis.com',
  };
  const file = `gsc-${email.split('@')[0]}.json`;
  await writeFile(file, JSON.stringify(out, null, 2));
  console.log('✅ Schlüsseldatei gespeichert:', file);
}
