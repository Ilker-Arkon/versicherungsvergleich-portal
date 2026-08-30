'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, HeartPulse } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const tierkrankenFaqs = [
  {
    question: "Was übernimmt eine Hundekrankenversicherung?",
    answer: "Sie erstattet die Tierarztkosten für ambulante und stationäre Behandlungen, Diagnostik (MRT, CT, Röntgen), Medikamente, Operationen unter Vollnarkose und Nachsorge bei Krankheit oder Unfall Ihres Hundes."
  },
  {
    question: "Was ist der Unterschied zwischen OP-Schutz und Vollkrankenversicherung?",
    answer: "Ein OP-Schutz übernimmt nur chirurgische Eingriffe und deren Nachbehandlung (besonders kostengünstig). Eine Vollkrankenversicherung übernimmt zusätzlich alle normalen Tierarztbesuche, Vorsorgeuntersuchungen und Behandlungen."
  }
];

export default function HundekrankenPage() {
  const widget = PARTNER_WIDGETS.tierkranken;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Hundekranken- & OP-Versicherung <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie sich vor explodierenden Tierarzt- und OP-Kosten: Bis zu 100% Erstattung für Operationen, Diagnostik und Medikamente.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Bis zu 4-facher GOT-Satz erstattungsfähig</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Freie Tierarzt- & Tierklinikwahl</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Schnelle Direkterstattung</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Hundekranken-Tarifrechner"
            badgeText="Bis zu 100% Kostenerstattung"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={tierkrankenFaqs} title="Häufige Fragen zur Tierkrankenversicherung" />
      </div>
    </div>
  );
}
