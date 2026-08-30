import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Coins } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/riester-rente");


const riesterFaqs = [
  {
    question: "Wer profitiert besonders von der Riester-Rente?",
    answer: "Familien mit Kindern (durch die Kinderzulage von 300 € pro Kind/Jahr), Gutverdiener (durch den Sonderausgabenabzug bis 2.100 €) sowie Berufseinsteiger (durch den einmaligen 200 € Starterbonus)."
  },
  {
    question: "Wie hoch sind die staatlichen Riester-Zulagen?",
    answer: "Die Grundzulage beträgt 175 € pro Erwachsenem und Jahr. Für jedes ab 2008 geborene Kind zahlt der Staat zusätzlich 300 € pro Jahr (185 € für vor 2008 geborene Kinder) direkt in Ihren Vertrag ein."
  }
];

export default function RiesterPage() {
  const widget = PARTNER_WIDGETS.riester;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Riester-Rente <span className="text-purple-600">Vergleich 2026</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Sichern Sie sich staatliche Förderungen, Kinderzulagen und hohe Steuervorteile für Ihre private Altersvorsorge.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 175 € Grundzulage + 300 € pro Kind</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% Beitragsgarantie zum Rentenbeginn</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Bis zu 2.100 € Steuervorteil</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Riester-Tarifrechner"
            badgeText="Volle staatliche Förderung"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <Coins className="w-5 h-5 text-purple-600 mr-2" />
            Warum sich die Riester-Förderung lohnt
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Staatliche Zulagen</p>
              <p className="text-xs text-slate-500">Der Staat zahlt bares Geld direkt in Ihren Vorsorgevertrag ein und erhöht damit Ihre Rendite deutlich.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">100% Kapitalschutz</p>
              <p className="text-xs text-slate-500">Gesetzliche Garantie: Alle eingezahlten Beiträge und staatlichen Zulagen stehen Ihnen zu Rentenbeginn garantiert zur Verfügung.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Pfändungssicher</p>
              <p className="text-xs text-slate-500">Das angesparte Riester-Guthaben ist in der Ansparphase vor Pfändung und Anrechnung bei Bürgergeld geschützt.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={riesterFaqs} title="Häufige Fragen zur Riester-Rente" />
      </div>
    </div>
  );
}
