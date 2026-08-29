'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const motorradTariffs: TariffRow[] = [
  {
    id: 'ergo-bike',
    provider: 'ERGO',
    logoText: 'ERG',
    tariffName: 'Motorrad-Schutz Plus',
    priceMonthly: 12.40,
    priceYearly: 148.80,
    rating: 4.9,
    reviewCount: 1240,
    benefits: ['100 Mio. € Deckung', 'Schutzbekleidung bis 2.000 € mitversichert', 'Saisonkennzeichen-Rabatt', 'Freie Werkstattwahl'],
    bonus: 'Rabatt für Garagenfahrzeuge',
    isTestsieger: true,
    ctaText: 'Jetzt berechnen'
  },
  {
    id: 'huk-motorrad',
    provider: 'HUK24',
    logoText: 'HUK',
    tariffName: 'Classic Bike Tarif',
    priceMonthly: 9.80,
    priceYearly: 117.60,
    rating: 4.8,
    reviewCount: 2150,
    benefits: ['Schutzbrief zubuchbar', 'Zubehör bis 5.000 € beitragsfrei', 'Grobe Fahrlässigkeit versichert', 'Rabattschutz möglich'],
    isTestsieger: false,
    ctaText: 'Tarif anzeigen'
  }
];

const motorradFaqs = [
  {
    question: "Wie spare ich bei der Motorradversicherung mit Saisonkennzeichen?",
    answer: "Mit einem Saisonkennzeichen (z. B. 03–10) zahlen Sie Steuern und Versicherungsbeiträge nur für die angemeldeten Monate. Außerhalb der Saison gilt eine beitragsfreie Ruheversicherung auf privatem Grund."
  },
  {
    question: "Ist die Motorrad-Schutzkleidung (Helm, Kombi) mitversichert?",
    answer: "In modernen Teilkasko- und Vollkaskotarifen ist hochwertige Schutzkleidung und der Motorradhelm bei vielen Anbietern bis zu festgelegten Beträgen (z. B. 2.000 bis 5.000 €) mitversichert."
  }
];

export default function MotorradPage() {
  const widget = PARTNER_WIDGETS.motorrad;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Fahrzeug & Mobilität
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Motorradversicherung vergleichen & <span className="text-blue-600">Top-Schutz sichern</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maßgeschneiderte Tarife für Motorräder, Roller, Chopper und Quads. Vergleichen Sie Haftpflicht, Teil- und Vollkasko im offiziellen Live-Rechner.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Sofortige elektronische Versicherungsbestätigung (eVB)</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Saisonkennzeichen-Unterstützung</span>
          </div>
        </div>

        {/* Live Partner Comparison Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Motorrad-Tarifrechner"
            badgeText="Live-Prämien aller Anbieter"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />
            Tipps für den optimalen Motorradschutz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Schutzkleidung & Helm</p>
              <p className="text-xs text-slate-500">Achten Sie auf ausreichende Versicherungssummen für beschädigte Lederkombis und Schutzhelme bei Sturzschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Tierbisse & Kurzschlüsse</p>
              <p className="text-xs text-slate-500">Marder- und Tierbisse an Kabeln und Schläuchen sollten inklusive teurer Folgeschäden abgedeckt sein.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Rabattschutz</p>
              <p className="text-xs text-slate-500">Verhindert eine Rückstufung der SF-Klasse nach dem ersten gemeldeten Schaden im Kalenderjahr.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Beliebte Motorrad-Versicherer im Test"
            subtitle="Leistungsstarke Tarife für Neu- und Wiederzulassungen"
            productType="Motorradversicherung"
            tariffs={motorradTariffs}
            widgetSlug="/motorrad-versicherung"
          />
        </div>

        <FAQAccordion items={motorradFaqs} title="Häufige Fragen zur Motorradversicherung" />
      </div>
    </div>
  );
}