import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Building } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/grundbesitzerhaftpflicht");


const hugFaqs = [
  {
    question: "Wer benötigt eine Haus- und Grundbesitzerhaftpflicht?",
    answer: "Eigentümer von vermieteten Ein- und Mehrfamilienhäusern, Eigentümergemeinschaften (WEG) sowie Besitzer von unbebauten Grundstücken. Bei selbst bewohnten Einfamilienhäusern ist das Risiko bereits über die Privathaftpflicht abgedeckt."
  },
  {
    question: "Welche Schäden werden abgedeckt?",
    answer: "Schäden, die durch die Verletzung von Verkehrssicherungspflichten entstehen (z. B. Passant rutscht im Winter auf nicht geräumtem Gehweg aus, herabfallender Dachziegel beschädigt ein parkendes Auto, unzureichende Beleuchtung im Treppenhaus)."
  }
];

export default function GrundbesitzerPage() {
  const widget = PARTNER_WIDGETS.grundbesitzer;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Haus- & Grundbesitzerhaftpflicht <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Unverzichtbarer Schutz für Vermieter und Grundstückseigentümer vor gesetzlichen Schadenersatzansprüchen Dritter.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Schutz bei Verletzung der Streu- & Räumpflicht</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Abwehr unberechtigter Ansprüche (passiver Rechtsschutz)</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Auf Mieter über die Nebenkostenabrechnung umlagefähig</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Grundbesitzerhaftpflicht-Tarifrechner"
            badgeText="Umlagefähig auf Nebenkosten"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={hugFaqs} title="Häufige Fragen zur Grundbesitzerhaftpflicht" />
      </div>
    </div>
  );
}
