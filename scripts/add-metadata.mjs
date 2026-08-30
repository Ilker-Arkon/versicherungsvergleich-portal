// Einmaliges Skript: wandelt die hook-freien Detailseiten von 'use client'
// zu Server Components um und ergänzt export const metadata.
// Idempotent: Seiten, die bereits subcategoryMetadata referenzieren, werden übersprungen.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const pages = [
  ["app/(mobilitaet)/kfz-versicherung/page.tsx", "/kfz-versicherung"],
  ["app/(mobilitaet)/motorrad-versicherung/page.tsx", "/motorrad-versicherung"],
  ["app/(sach-wohnen)/firmenversicherung/page.tsx", "/firmenversicherung"],
  ["app/(sach-wohnen)/grundbesitzerhaftpflicht/page.tsx", "/grundbesitzerhaftpflicht"],
  ["app/(sach-wohnen)/hundekrankenversicherung/page.tsx", "/hundekrankenversicherung"],
  ["app/(sach-wohnen)/hundeversicherung/page.tsx", "/hundeversicherung"],
  ["app/(sach-wohnen)/haftpflicht/page.tsx", "/haftpflicht"],
  ["app/(sach-wohnen)/hausrat/page.tsx", "/hausrat"],
  ["app/(sach-wohnen)/rechtsschutz-versicherung/page.tsx", "/rechtsschutz-versicherung"],
  ["app/(sach-wohnen)/wohngebaeude-versicherung/page.tsx", "/wohngebaeude-versicherung"],
  ["app/(gesundheit)/krankenzusatz/page.tsx", "/krankenzusatz"],
  ["app/(gesundheit)/pkv-beamte/page.tsx", "/pkv-beamte"],
  ["app/(gesundheit)/pkv-studenten/page.tsx", "/pkv-studenten"],
  ["app/(gesundheit)/pkv/page.tsx", "/pkv"],
  ["app/(vorsorge)/lebensversicherung/page.tsx", "/lebensversicherung"],
  ["app/(vorsorge)/pflegezusatz/page.tsx", "/pflegezusatz"],
  ["app/(vorsorge)/riester-rente/page.tsx", "/riester-rente"],
  ["app/(vorsorge)/ruerup-rente/page.tsx", "/ruerup-rente"],
  ["app/(vorsorge)/berufsunfaehigkeit/page.tsx", "/berufsunfaehigkeit"],
  ["app/(vorsorge)/unfallversicherung/page.tsx", "/unfallversicherung"],
  ["app/(vorsorge)/risikoleben/page.tsx", "/risikoleben"],
  ["app/(vorsorge)/rente/page.tsx", "/rente"],
  ["app/(finanzen)/baufinanzierung/page.tsx", "/baufinanzierung"],
  ["app/(finanzen)/kreditkarten/page.tsx", "/kreditkarten"],
  ["app/(finanzen)/girokonto-vergleich/page.tsx", "/girokonto-vergleich"],
  ["app/(finanzen)/kredit-vergleich/page.tsx", "/kredit-vergleich"],
];

let updated = 0;
let skipped = 0;

for (const [rel, slug] of pages) {
  const fp = resolve(rel);
  let src = readFileSync(fp, "utf8");

  if (src.includes("subcategoryMetadata")) {
    skipped++;
    continue;
  }

  const before = src;

  // 'use client' entfernen (CRLF-tolerant)
  src = src.replace(/^'use client';\r?\n\r?\n/, "");

  // Metadaten-Import + Export nach dem letzten Import einfügen
  const importRegex = /^import\s.+$/gm;
  const matches = [...src.matchAll(importRegex)];
  if (matches.length === 0) {
    throw new Error(`Kein Import gefunden in ${rel}`);
  }
  const last = matches[matches.length - 1];
  const insertAt = last.index + last[0].length;
  const block =
    `\nimport type { Metadata } from "next";` +
    `\nimport { subcategoryMetadata } from "@/lib/seo";` +
    `\n\nexport const metadata: Metadata = subcategoryMetadata("${slug}");\n`;

  src = src.slice(0, insertAt) + block + src.slice(insertAt);

  if (src !== before) {
    writeFileSync(fp, src);
    updated++;
  }
}

console.log(`Aktualisiert: ${updated}, übersprungen: ${skipped}, gesamt: ${pages.length}`);
