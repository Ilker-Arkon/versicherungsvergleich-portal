'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Landmark } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const baufiFaqs = [
  {
    question: "Wie viele Banken werden im Baufinanzierungs-Vergleich geprüft?",
    answer: "Unser Rechner vergleicht tagesaktuelle Zinskonditionen von über 400 regionalen und überregionalen Banken, Sparkassen, Volksbanken und Versicherungen deutschlandweit."
  },
  {
    question: "Ist der Vergleich und die Beratung für Bauherren kostenlos?",
    answer: "Ja, der gesamte Zinsvergleich, die Vorprüfung und die persönliche Finanzierungsberatung sind für Sie zu 100 % kostenfrei und unverbindlich."
  }
];

export default function BaufinanzierungPage() {
  const widget = PARTNER_WIDGETS.baufinanzierung;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Finanzen & Banken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Baufinanzierung <span className="text-amber-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Finden Sie die besten Zinsen für Hauskauf, Neubau oder Anschlussfinanzierung aus über 400 Anbietern.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Über 400 Darlehensgeber im Vergleich</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> KfW-Förderprogramme optimal integrieren</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Tausende Euro Zinsersparnis über die Zinsbindung</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Baufinanzierungs-Rechner"
            badgeText="Top-Konditionen aus 400+ Banken"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={baufiFaqs} title="Häufige Fragen zur Baufinanzierung" />
      </div>
    </div>
  );
}
