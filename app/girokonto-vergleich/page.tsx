'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const girokontoTariffs: TariffRow[] = [
  {
    id: 'comdirect-giro',
    provider: 'comdirect',
    logoText: 'COM',
    tariffName: 'Girokonto Aktiv',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.9,
    reviewCount: 5410,
    benefits: ['0 € Kontoführungsgebühr bei aktiver Nutzung', 'Kostenlose Visa-Debitkarte & girocard', 'Weltweit kostenfrei Bargeld abheben', 'Apple Pay & Google Pay'],
    bonus: 'Bis zu 150 € Willkommensbonus',
    isTestsieger: true,
    ctaText: 'Konto online eröffnen'
  },
  {
    id: 'dkb-giro',
    provider: 'DKB',
    logoText: 'DKB',
    tariffName: 'DKB Cash Girokonto',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.8,
    reviewCount: 8900,
    benefits: ['0 € Kontoführung für Aktivkunden', 'Kostenfreie Visa Debitkarte', 'Weltweit ohne Auslandseinsatzentgelt bezahlen', 'Attraktives Tagesgeld-Konto zubuchbar'],
    bonus: 'Kostenloser Kontowechsel-Service in 8 Min.',
    isTestsieger: false,
    ctaText: 'Jetzt beantragen'
  },
  {
    id: 'ing-giro',
    provider: 'ING',
    logoText: 'ING',
    tariffName: 'Girokonto Free',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.9,
    reviewCount: 12400,
    benefits: ['0 € Kontoführung ab 700 € Geldeingang', 'Kostenlos Bargeld an 97% aller Geldautomaten', 'Ausgezeichnete Mobile-Banking App', 'Zusätzliches Extra-Konto mit Top-Zinsen'],
    bonus: '200 € Neukundenprämie',
    isTestsieger: true,
    ctaText: 'Prämie sichern'
  },
  {
    id: 'n26-standard',
    provider: 'N26',
    logoText: 'N26',
    tariffName: 'N26 Standard Smart',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.7,
    reviewCount: 6300,
    benefits: ['Bedingungslos 0 € ohne Mindestgeldeingang', '100% mobiles Smartphone-Banking', 'Echtzeit-Push-Nachrichten bei jeder Transaktion', 'Virtuelle Mastercard sofort einsatzbereit'],
    isTestsieger: false,
    ctaText: 'In 5 Min. eröffnen'
  }
];

const girokontoFaqs = [
  {
    question: "Wie funktioniert der Kontowechselservice?",
    answer: "Der gesetzliche Wechselservice ist für Sie vollständig automatisiert. Die neue Bank informiert alle Lastschriftempfänger (z. B. Strom, Miete, Fitnessstudio) und richtet Ihre bestehenden Daueraufträge neu ein."
  },
  {
    question: "Welche Voraussetzungen gibt es für das kostenlose Girokonto?",
    answer: "Die meisten Direktbanken verlangen entweder keinen Mindestgeldeingang (wie N26) oder einen monatlichen Geldeingang von 700 € (z. B. Gehalt, Rente), um die Kontoführungsgebühr dauerhaft auf 0 € zu setzen."
  }
];

export default function GirokontoPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Finanzen & Banken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Girokonto-Vergleich: <span className="text-amber-600">0 € Gebühren + bis 200 € Prämie</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Vergleichen Sie die besten gebührenfreien Girokonten mit Gratis-Debitkarte, weltweiter Bargeldversorgung und automatischem Wechselservice.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Kostenlose Girokonten im Vergleich 2026"
            subtitle="Inklusive Prämien, Karten und Dispozinsen"
            productType="Girokonto"
            tariffs={girokontoTariffs}
          />
        </div>

        <FAQAccordion items={girokontoFaqs} title="Häufige Fragen zum Girokonto-Wechsel" />
      </div>
    </div>
  );
}