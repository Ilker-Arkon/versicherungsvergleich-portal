import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/motorrad-versicherung");


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
            Motorrad&shy;versicherung vergleichen & <span className="text-blue-600">Top-Schutz sichern</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maßgeschneiderte Tarife für Motorräder, Roller, Chopper und Quads. Vergleichen Sie Haftpflicht, Teil- und Vollkasko im offiziellen Live-Rechner.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-xs font-semibold text-emerald-700 max-w-2xl mx-auto text-left">
            <span className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500 shrink-0 mt-0.5" /> Sofortige elektronische Versicherungs&shy;bestätigung (eVB)</span>
            <span className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500 shrink-0 mt-0.5" /> Saisonkennzeichen-Unterstützung</span>
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

        <div className="premium-card p-6 sm:p-8 mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-start gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <span>Tipps für den optimalen Motorradschutz</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Schutzkleidung & Helm</p>
              <p className="text-xs text-slate-500 leading-relaxed">Achten Sie auf ausreichende Versicherungssummen für beschädigte Lederkombis und Schutzhelme bei Sturzschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Tierbisse & Kurzschlüsse</p>
              <p className="text-xs text-slate-500 leading-relaxed">Marder- und Tierbisse an Kabeln und Schläuchen sollten inklusive teurer Folgeschäden abgedeckt sein.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Rabattschutz</p>
              <p className="text-xs text-slate-500 leading-relaxed">Verhindert eine Rückstufung der SF-Klasse nach dem ersten gemeldeten Schaden im Kalenderjahr.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={motorradFaqs} title="Häufige Fragen zur Motorradversicherung" />
      </div>
    </div>
  );
}