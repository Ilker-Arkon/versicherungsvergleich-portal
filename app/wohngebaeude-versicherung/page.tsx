'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const wohngebaeudeTariffs: TariffRow[] = [
  {
    id: 'rhion-gebaeude',
    provider: 'Rhion Digital',
    logoText: 'RHI',
    tariffName: 'Wohngebäude Exzellent Plus',
    priceMonthly: 18.50,
    priceYearly: 222.00,
    rating: 4.9,
    reviewCount: 1120,
    benefits: ['Inkl. Elementargefahren (Starkregen, Überschwemmung)', 'Grobe Fahrlässigkeit bis 100% mitversichert', 'Photovoltaik- & Wärmepumpenschutz', 'Aufräum- & Abbruchkosten unbegrenzt'],
    isTestsieger: true,
    ctaText: 'Jetzt berechnen'
  },
  {
    id: 'arag-gebaeude',
    provider: 'ARAG',
    logoText: 'ARA',
    tariffName: 'Premium Gebäude-Schutz',
    priceMonthly: 21.30,
    priceYearly: 255.60,
    rating: 4.8,
    reviewCount: 940,
    benefits: ['Rohrbruch- & Frostschäden an Außenleitungen', 'Graffiti-Beseitigung & Vandalismus', 'Hotelkosten bei Unbewohnbarkeit bis 200 Tage', '24h Handwerker-Sofortservice'],
    isTestsieger: false,
    ctaText: 'Tarif wählen'
  },
  {
    id: 'ergo-gebaeude',
    provider: 'ERGO',
    logoText: 'ERG',
    tariffName: 'Klassik Wohngebäude',
    priceMonthly: 16.90,
    priceYearly: 202.80,
    rating: 4.7,
    reviewCount: 1650,
    benefits: ['Feuer, Leitungswasser, Sturm & Hagel', 'Schäden durch Überspannung & Blitzschlag', 'Verzicht auf Einwand grober Fahrlässigkeit', 'Attraktiver Neubaurabatt bis zu 40%'],
    isTestsieger: false,
    ctaText: 'Jetzt vergleichen'
  }
];

const faqs = [
  {
    question: "Was deckt eine Wohngebäudeversicherung genau ab?",
    answer: "Die Wohngebäudeversicherung sichert das Gebäude selbst sowie alle fest eingebauten Teile (Heizung, Fenster, Sanitäreinrichtungen) gegen Schäden durch Feuer, Leitungswasser, Sturm und Hagel ab."
  },
  {
    question: "Warum ist die Elementarschadendeckung so wichtig?",
    answer: "Starkregen, Hochwasser, Schneedruck und Erdbeben sind in der Standardpolice meist nicht enthalten. Durch den Klimawandel häufen sich Extremwetterereignisse – die Elementarschadenklausel schützt vor dem finanziellen Ruin."
  }
];

export default function WohngebaeudePage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Eigentum, Wohnen & Recht
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Wohngebäudeversicherung: <span className="text-emerald-600">Rundum-Schutz fürs Haus</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie Ihre Immobilie zuverlässig vor Sturm-, Brand-, Leitungswasser- und Elementarschäden. Günstige Tarife mit bis zu 480 € Ersparnis pro Jahr.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Wohngebäudeversicherungen im Vergleich"
            subtitle="Inklusive modernem Elementarschutz & Neubau-Vorteilen"
            productType="Wohngebäudeversicherung"
            tariffs={wohngebaeudeTariffs}
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zur Wohngebäudeversicherung" />
      </div>
    </div>
  );
}