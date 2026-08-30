import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/krankenzusatz");


const zusatzFaqs = [
  {
    question: "Was leistet eine Zahnzusatzversicherung?",
    answer: "Sie übernimmt bis zu 100 % der Kosten für hochwertigen Zahnersatz (Kronen, Brücken, Implantate, Inlays), professionelle Zahnreinigungen (PZR) und kieferorthopädische Behandlungen, bei denen die gesetzliche Krankenkasse nur minimale Festzuschüsse zahlt."
  },
  {
    question: "Gibt es Tarife ohne Wartezeit und für bereits angeratene Behandlungen?",
    answer: "Ja! Moderne Zahnzusatztarife verzichten auf die klassische 8-monatige Wartezeit. Einige Spezialtarife leisten sogar für bereits vom Zahnarzt angeratene Maßnahmen oder fehlende Zähne."
  }
];

export default function KrankenzusatzPage() {
  const widget = PARTNER_WIDGETS.krankenzusatz;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Gesundheit & Kranken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Zahn- & Krankenzusatzversicherung <span className="text-rose-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schließen Sie die Eigenanteil-Lücken der gesetzlichen Kasse: Bis zu 100% Erstattung für Zahnersatz, Implantate, 1-Bett-Zimmer und Heilpraktiker.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Bis zu 100% Erstattung für Implantate & Inlays</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Tarife ohne Wartezeit wählbar</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Kostenübernahme für professionelle Zahnreinigung</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Krankenzusatz-Tarifrechner"
            badgeText="Top-Zahn- & Stationärschutz"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={zusatzFaqs} title="Häufige Fragen zu Zusatzversicherungen" />
      </div>
    </div>
  );
}
