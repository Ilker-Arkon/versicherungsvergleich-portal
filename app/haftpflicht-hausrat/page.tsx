'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const sampleTariffs: TariffRow[] = [
  {
    id: 'standard-1',
    provider: 'Premium Partner Direkt',
    logoText: 'TOP',
    tariffName: 'Exklusiv Schutz 2026',
    priceMonthly: 12.50,
    priceYearly: 150.00,
    rating: 4.9,
    reviewCount: 1420,
    benefits: ['Geprüfter Testsieger-Schutz', 'Volle Leistung im Schadensfall', 'Keine Wartezeit', 'Täglich kündbar'],
    bonus: 'Ø 210 € / Jahr',
    isTestsieger: true,
    ctaText: 'Jetzt kostenlos vergleichen'
  },
  {
    id: 'standard-2',
    provider: 'Smart Schutz Digital',
    logoText: 'SMT',
    tariffName: 'Komfort Tarif',
    priceMonthly: 15.90,
    priceYearly: 190.80,
    rating: 4.8,
    reviewCount: 980,
    benefits: ['Rundum-Sorglos-Paket', '24/7 digitaler Kundenservice', 'Familienrabatt inklusive', 'Sofortige Antragsannahme'],
    isTestsieger: false,
    ctaText: 'Tarif wählen'
  }
];

const faqs = [
  {
    question: 'Wie läuft der Abschluss für Privathaftpflicht & Hausrat ab?',
    answer: 'In nur 3 Schritten: Daten eingeben, Tarife filtern und den gewünschten Vertrag direkt online abschließen oder unverbindlich per E-Mail anfordern.'
  }
];

export default function Page() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Eigentum, Wohnen & Recht
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Privathaftpflicht & Hausrat: <span className="text-blue-600">Beste Tarife im Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Der unverzichtbare Basisschutz für Familie, Wohnung und Vermögen.
          </p>
        </div>
        <div className="mb-14">
          <ComparisonTable 
            title="Die besten Angebote im Vergleich 2026"
            subtitle="Transparent verglichen mit voller Preistransparenz"
            productType="Privathaftpflicht & Hausrat"
            tariffs={sampleTariffs}
          />
        </div>
        <FAQAccordion items={faqs} title="Häufige Fragen zu Privathaftpflicht & Hausrat" />
      </div>
    </div>
  );
}