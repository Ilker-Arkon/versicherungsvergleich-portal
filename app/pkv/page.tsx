'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const pkvTariffs: TariffRow[] = [
  {
    id: 'hallesche-nk',
    provider: 'HALLESCHE',
    logoText: 'HAL',
    tariffName: 'Primo / NK Select Premium',
    priceMonthly: 312.00,
    priceYearly: 3744.00,
    rating: 4.9,
    reviewCount: 1840,
    benefits: ['Chefarztbehandlung & 1-Bett-Zimmer', 'Zahnersatz bis zu 90%', 'Hohe Beitragsrückerstattung bei Leistungsfreiheit', 'Heilpraktiker & Naturheilverfahren inkl.'],
    bonus: 'Bis zu 1.200 € Beitragsrückzahlung / Jahr',
    isTestsieger: true,
    ctaText: 'Angebot kostenlos anfordern'
  },
  {
    id: 'signal-iduna',
    provider: 'SIGNAL IDUNA',
    logoText: 'SIG',
    tariffName: 'Exklusiv-Plus Tarif',
    priceMonthly: 345.00,
    priceYearly: 4140.00,
    rating: 4.8,
    reviewCount: 2150,
    benefits: ['Weltweiter Versicherungsschutz', 'Offener Hilfsmittelkatalog', 'Freie Arzt- und Klinikwahl', 'Inkl. Kurtagegeld & Psychotherapie'],
    bonus: 'Sonderkonditionen für Angestellte & Beamte',
    isTestsieger: false,
    ctaText: 'Tarif prüfen'
  },
  {
    id: 'hansemerkur',
    provider: 'HanseMerkur',
    logoText: 'HM',
    tariffName: 'Business Fit PKV',
    priceMonthly: 268.00,
    priceYearly: 3216.00,
    rating: 4.7,
    reviewCount: 3120,
    benefits: ['Attraktiver Einstiegsbeitrag für Gründer', 'Vorsorgeuntersuchungen ohne SB', 'Arbeitgeberzuschuss bis zu 50%', 'Digitale Gesundheits-App'],
    bonus: 'Besonders beliebt bei Selbstständigen',
    isTestsieger: false,
    ctaText: 'Jetzt vergleichen'
  }
];

const pkvFaqs = [
  {
    question: "Wer kann in die Private Krankenversicherung wechseln?",
    answer: "In die PKV wechseln können Selbstständige, Freiberufler, Beamte (und Beamtenanwärter) sowie Angestellte, deren Jahresbruttoeinkommen über der Versicherungspflichtgrenze (JAEG) liegt."
  },
  {
    question: "Zahlt der Arbeitgeber auch bei der PKV einen Zuschuss?",
    answer: "Ja, angestellte PKV-Versicherte erhalten vom Arbeitgeber denselben steuerfreien Beitragszuschuss wie in der gesetzlichen Kasse (bis zu 50 % des Beitrags)."
  },
  {
    question: "Wie stabil sind die Beiträge im Alter?",
    answer: "Moderne PKV-Tarife bilden gesetzliche Alterungsrückstellungen und bieten flexible Entlastungstarife, um Beiträge im Ruhestand stabil und bezahlbar zu halten."
  }
];

export default function PKVPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Gesundheit & Personenschutz
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Private Krankenversicherung: <span className="text-rose-600">Top-Medizin zum Sparpreis</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maßgeschneiderte PKV-Tarife für Selbstständige, Beamte und Angestellte. Chefarztbehandlung, beste Klinikunterbringung und bis zu 2.400 € Beitragsersparnis im Jahr.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten PKV-Tarife im Vergleich"
            subtitle="Zertifizierte Tarife mit herausragender Leistungsabdeckung und solider Beitragsstabilität"
            productType="Private Krankenversicherung"
            tariffs={pkvTariffs}
          />
        </div>

        <FAQAccordion items={pkvFaqs} title="Häufige Fragen zur Privaten Krankenversicherung" />
      </div>
    </div>
  );
}