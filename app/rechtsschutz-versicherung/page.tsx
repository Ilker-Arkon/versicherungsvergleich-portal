'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const rechtsschutzTariffs: TariffRow[] = [
  {
    id: 'arag-aktiv',
    provider: 'ARAG',
    logoText: 'ARA',
    tariffName: 'Aktiv-Rechtsschutz Premium',
    priceMonthly: 19.80,
    priceYearly: 237.60,
    rating: 4.9,
    reviewCount: 3200,
    benefits: ['Privat-, Berufs-, Verkehrs- & Mietrechtsschutz', 'Unbegrenzte Versicherungssumme weltweit', 'Kostenlose 24/7 telefonische Anwaltsberatung', 'Ohne Wartezeit im Arbeits- & Verkehrsrecht'],
    bonus: 'Keine Selbstbeteiligung bei Partneranwalt',
    isTestsieger: true,
    ctaText: 'Jetzt vergleichen'
  },
  {
    id: 'adac-recht',
    provider: 'ADAC Schutz',
    logoText: 'ADA',
    tariffName: 'Kompakt Rechtsschutz',
    priceMonthly: 15.40,
    priceYearly: 184.80,
    rating: 4.8,
    reviewCount: 4100,
    benefits: ['Hervorragender Verkehrsrechtsschutz', 'Schutz für die gesamte Familie', 'Mediation & außergerichtliche Streitbeilegung', 'Kostenübernahme für Gutachter & Zeugen'],
    isTestsieger: false,
    ctaText: 'Tarif berechnen'
  },
  {
    id: 'roland-komfort',
    provider: 'ROLAND',
    logoText: 'ROL',
    tariffName: 'Komfort-Rechtsschutz',
    priceMonthly: 22.10,
    priceYearly: 265.20,
    rating: 4.7,
    reviewCount: 1450,
    benefits: ['Freie Anwaltswahl in ganz Deutschland', 'Cyber-Rechtsschutz für Online-Käufe inkl.', 'Steuer- & Sozialrechtsschutz vor Gerichten', 'Vorsorge-Rechtsschutz bei Erbschaftsberatung'],
    isTestsieger: false,
    ctaText: 'Tarif wählen'
  }
];

const faqs = [
  {
    question: "Gibt es Rechtsschutzversicherungen ohne Wartezeit?",
    answer: "Im Verkehrsrecht und bei telefonischer Erstberatung gilt oft keine Wartezeit. Im Arbeits- und Mietrechtsschutz beträgt die übliche Wartezeit 3 Monate, es sei denn, Sie wechseln nahtlos von einer Vorversicherung."
  },
  {
    question: "Welche Bereiche deckt der Rundum-Rechtsschutz ab?",
    answer: "Ein Komplettpaket deckt die 4 zentralen Säulen ab: Privat-Rechtsschutz, Berufs-Rechtsschutz (Arbeitsrecht), Verkehrs-Rechtsschutz und Wohn-/Miet-Rechtsschutz."
  }
];

export default function RechtsschutzPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Eigentum, Wohnen & Recht
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Rechtsschutzversicherung: <span className="text-emerald-600">Ihr gutes Recht absichern</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Übernehmen Sie keine Anwalts- und Gerichtskosten mehr aus eigener Tasche. Top-Tarife für Privat, Beruf, Verkehr und Miete ab 15,40 € monatlich.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten Rechtsschutz-Tarife 2026"
            subtitle="Testsieger mit freier Anwaltswahl und Sofort-Beratung"
            productType="Rechtsschutzversicherung"
            tariffs={rechtsschutzTariffs}
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zum Rechtsschutz" />
      </div>
    </div>
  );
}