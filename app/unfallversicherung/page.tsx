'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const unfallTariffs: TariffRow[] = [
  {
    id: 'ergo-unfall-plus',
    provider: 'ERGO',
    logoText: 'ERG',
    tariffName: 'Unfallschutz Vital Premium',
    priceMonthly: 14.80,
    priceYearly: 177.60,
    rating: 4.9,
    reviewCount: 2410,
    benefits: ['500% Progression bei Vollinvalidität', 'Bergungskosten bis 100.000 €', 'Schmerzensgeld & Knochenbruch-Geld', 'Reha-Management & Sofortleistung'],
    bonus: 'Testsieger Focus Money',
    isTestsieger: true,
    ctaText: 'Jetzt Tarif berechnen'
  },
  {
    id: 'allianz-unfall',
    provider: 'Allianz',
    logoText: 'ALZ',
    tariffName: 'UnfallSicher Plus',
    priceMonthly: 16.50,
    priceYearly: 198.00,
    rating: 4.8,
    reviewCount: 1850,
    benefits: ['Weltweiter 24-Stunden-Schutz', 'Infektionen durch Insektenstiche/Zecken', 'Kosmetische Operationen bis 50.000 €', 'Lebenslange Unfallrente wählbar'],
    isTestsieger: false,
    ctaText: 'Tarif anzeigen'
  }
];

const unfallFaqs = [
  {
    question: "Wovor schützt mich eine private Unfallversicherung?",
    answer: "Die gesetzliche Unfallversicherung greift nur am Arbeitsplatz und auf dem direkten Weg dorthin. Eine private Unfallversicherung schützt dich und deine Familie rund um die Uhr – auch bei Freizeit-, Sport- und Reiseaktivitäten."
  },
  {
    question: "Ist die Anfrage für eine Unfallversicherung verbindlich?",
    answer: "Nein. Wenn du ein Angebot anforderst, erhältst du unverbindliche Tarifvorschläge und Informationen. Erst wenn du einen Antrag explizit unterschreibst und einreichst, wird der Schutz aktiv."
  },
  {
    question: "Was bedeutet die Progression bei der Unfallversicherung?",
    answer: "Eine Progression (z. B. 350 % oder 500 %) vervielfacht die Auszahlungssumme bei schweren Invaliditätsgraden überproportional, um teure Umbauten an Haus oder Auto abzusichern."
  }
];

export default function UnfallPage() {
  const widget = PARTNER_WIDGETS.unfall;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Private Unfallversicherung <span className="text-indigo-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Finanzielle Sicherheit und Sofortkapital bei Freizeit-, Haushalts- und Sportunfällen – rund um die Uhr und weltweit.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 24/7 weltweiter Rundum-Schutz</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Hohe Progressionen bis 500%</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Schutz bei Zeckenbissen & Insektenstichen</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Unfallversicherungs-Tarifrechner"
            badgeText="Weltweiter 24h Schutz"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-indigo-600 mr-2" />
            Wichtige Leistungen beim Unfallschutz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Ausreichende Grundsumme</p>
              <p className="text-xs text-slate-500">Wir empfehlen eine Grundinvaliditätssumme von mindestens 100.000 bis 150.000 € mit 350% bis 500% Progression.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Hohe Bergungskosten</p>
              <p className="text-xs text-slate-500">Such- und Rettungseinsätze (z. B. mit Hubschrauber in den Bergen) sollten mit mindestens 50.000 bis 100.000 € versichert sein.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Erweiterter Unfallbegriff</p>
              <p className="text-xs text-slate-500">Schutz bei Unfällen durch Eigenbewegung, erhöhte Kraftanstrengung sowie Vergiftungen und Tierbisse.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten Unfallversicherungen 2026"
            subtitle="Tarife mit Top-Gliedertaxen und Sofortleistungen"
            productType="Unfallversicherung"
            tariffs={unfallTariffs}
            widgetSlug="/unfallversicherung"
          />
        </div>

        <FAQAccordion items={unfallFaqs} title="Häufige Fragen zur Unfallversicherung" />
      </div>
    </div>
  );
}