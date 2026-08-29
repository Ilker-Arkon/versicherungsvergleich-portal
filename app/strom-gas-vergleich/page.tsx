'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const stromTariffs: TariffRow[] = [
  {
    id: 'vattenfall-strom',
    provider: 'Vattenfall',
    logoText: 'VAT',
    tariffName: 'NaturStrom Easy 12',
    priceMonthly: 68.50,
    priceYearly: 822.00,
    rating: 4.9,
    reviewCount: 8900,
    benefits: ['100% zertifizierter Ökostrom aus Wasserkraft', '12 Monate volle Preisgarantie', 'Günstiger Arbeitspreis (26,4 ct/kWh)', 'Voller Wechselservice ohne Stromunterbrechung'],
    bonus: '180 € Sofortbonus + Neukundenrabatt',
    isTestsieger: true,
    ctaText: 'Jetzt wechseln & sparen'
  },
  {
    id: 'eon-strom',
    provider: 'E.ON',
    logoText: 'EON',
    tariffName: 'E.ON Strom Öko 24',
    priceMonthly: 72.00,
    priceYearly: 864.00,
    rating: 4.8,
    reviewCount: 14200,
    benefits: ['24 Monate Preissicherheit', 'Klimaneutral durch Ausgleichszertifikate', 'Prämienprogramm im E.ON Vorteilsportal', 'Smart-Meter ready'],
    bonus: '150 € Wechselbonus',
    isTestsieger: false,
    ctaText: 'Tarif prüfen'
  },
  {
    id: 'greenpeace-strom',
    provider: 'Green Planet Energy',
    logoText: 'GPE',
    tariffName: 'Ökostrom Aktiv',
    priceMonthly: 74.50,
    priceYearly: 894.00,
    rating: 4.9,
    reviewCount: 4100,
    benefits: ['100% sauberer Strom aus Wind- & Solarparks', 'Frei von Kohle- & Atomstrom', 'Förderung des regionalen Netzausbaus', 'Keine Mindestvertragslaufzeit'],
    isTestsieger: false,
    ctaText: 'Ökostrom wählen'
  }
];

const faqs = [
  {
    question: "Kann mir beim Stromwechsel der Strom abgestellt werden?",
    answer: "Nein, niemals! Die unterbrechungsfreie Stromversorgung ist in Deutschland gesetzlich garantiert. Sollte beim Wechselprozess etwas verzögert sein, springt nahtlos die Grundversorgung ein."
  },
  {
    question: "Wie viel Geld kann ich durch den Wechsel sparen?",
    answer: "Verbraucher, die noch im Basistarif des Grundversorgers sind, sparen durch den Wechsel zu einem günstigen Alternativtarif durchschnittlich 750 € bis 900 € im Jahr bei Strom und Gas."
  }
];

export default function StromGasPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Energie & Haushalt
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Strom- & Gastarife vergleichen: <span className="text-emerald-600">Bis 900 € sparen</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Senken Sie Ihre monatlichen Energiekosten mit wenigen Klicks. TÜV-geprüfte Anbieter, garantierte Preisstabilität und attraktive Sofortboni.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Aktuelle Stromtarife im Vergleich"
            subtitle="Berechnet für einen Durchschnittshaushalt (2.500 kWh / Jahr)"
            productType="Strom & Gas"
            tariffs={stromTariffs}
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zum Strom- & Gasanbieterwechsel" />
      </div>
    </div>
  );
}