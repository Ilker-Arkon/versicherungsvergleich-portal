'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Briefcase } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const firmenFaqs = [
  {
    question: "Was gehört zur gewerblichen Absicherung für Selbstständige und Firmen?",
    answer: "Kernbausteine sind die Betriebshaftpflicht (Schutz bei Personen- und Sachschäden im Geschäftsbetrieb), die gewerbliche Inhaltsversicherung (Waren, Büro, Werkzeuge) sowie der Firmenrechtsschutz."
  }
];

export default function FirmenversicherungPage() {
  const widget = PARTNER_WIDGETS.gewerbe;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Gewerbe- & Firmenversicherung <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maßgeschneiderter Schutz für Selbstständige, Freiberufler, Handwerker und mittelständische Unternehmen.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Betriebshaftpflicht & Vermögensschadenhaftpflicht</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Individuell branchenspezifisch anpassbar</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Sofortige Deckungszusage</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Gewerbeversicherungs-Tarifrechner"
            badgeText="Branchenoptimierter Schutz"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={firmenFaqs} title="Häufige Fragen zur Firmenversicherung" />
      </div>
    </div>
  );
}
