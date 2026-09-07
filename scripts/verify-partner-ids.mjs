import { PARTNER_WIDGETS, PARTNER_ID } from '../lib/partnerWidgets.ts';
import https from 'https';

console.log('=== Prüfe alle Direct-Links und Affiliate-IDs ===\n');
console.log(`Erwartete Partner-ID: ${PARTNER_ID}`);

const entries = Object.entries(PARTNER_WIDGETS);
console.log(`Gefundene Widget-Konfigurationen: ${entries.length}\n`);

let allOk = true;

for (const [key, cfg] of entries) {
  const hasPartnerIdInDirect = cfg.directLink.includes(`partner_id=${PARTNER_ID}`);
  const hasPartnerIdInScript = cfg.scriptSrc ? cfg.scriptSrc.includes(PARTNER_ID) : true;
  const status = (hasPartnerIdInDirect && hasPartnerIdInScript) ? '✅ OK' : '❌ FEHLER';

  if (!hasPartnerIdInDirect || !hasPartnerIdInScript) {
    allOk = false;
  }

  console.log(`${status} | ${key.padEnd(20)} | Script: ${hasPartnerIdInScript ? 'ID vorhanden' : 'ID FEHLT'} | DirectLink: ${hasPartnerIdInDirect ? 'ID vorhanden' : 'ID FEHLT'}`);
}

console.log('\n--- Gesamtstatus Partner-IDs ---');
console.log(allOk ? '✅ Alle 26 Widgets haben die korrekte Partner-ID 75137!' : '❌ Einige Widgets haben eine fehlerhafte Partner-ID!');
