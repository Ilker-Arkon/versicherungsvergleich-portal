'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Heart } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const lebenFaqs = [
  {
    question: "Was ist der Unterschied zwischen einer Kapitallebensversicherung und einer Risikolebensversicherung?",
    answer: "Eine Risikolebensversicherung zahlt nur im Todesfall der versicherten Person an die Hinterbliebenen aus (sehr günstiger reiner Schutz). Eine Kapitallebensversicherung kombiniert den Hinterbliebenenschutz mit einem langfristigen Sparvorgang für das Alter."
  }
];

export default function LebensversicherungPage() {
  const widget = PARTNER_WIDGETS.leben;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Lebensversicherung <span className="text-purple-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Hinterbliebenenschutz und garantierte Auszahlung im offiziellen Live-Rechner vergleichen.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Ausgezeichnete Finanzstärke deutscher Versicherer</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Flexible Vertragslaufzeiten</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Lebensversicherungs-Tarifrechner"
            badgeText="Geprüfter Hinterbliebenenschutz"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={lebenFaqs} title="Häufige Fragen zur Lebensversicherung" />
      </div>
    </div>
  );
}
