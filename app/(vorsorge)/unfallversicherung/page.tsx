import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/unfallversicherung");


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

        {/* Ratgeber-Sektion */}
        <div className="premium-card p-8 mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Warum die gesetzliche Unfallkasse nicht ausreicht: Dein 24/7-Schutz für Freizeit & Familie</h2>
              <p className="text-xs text-slate-500 mt-0.5">Die gefährliche Lücke im gesetzlichen Schutz</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200/70 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-amber-900 mb-1">⚠️ Das Problem: Über 70 % der Unfälle passieren in der Freizeit</p>
            <p className="text-xs text-amber-800 leading-relaxed">Die gesetzliche Unfallversicherung greift ausschließlich am Arbeitsplatz sowie auf dem direkten Hin- und Rückweg. Beim Heimwerken, im Garten, beim Sport, beim Radfahren oder im Familienurlaub leistet die gesetzliche Kasse <strong>keinen einzigen Cent</strong>.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">🌍 Lückenloser 24/7-Weltweitschutz</p>
              <p className="text-xs text-slate-500">Du und deine Familie seid rund um die Uhr abgesichert – egal ob zu Hause, beim Sport, auf Reisen oder bei Hobbyaktivitäten.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">💰 Finanzielle Unabhängigkeit bei Invalidität</p>
              <p className="text-xs text-slate-500">Nach einem schweren Unfall entstehen oft hohe Kosten für barrierefreie Wohnungsumbauten. Die Versicherung zahlt eine vereinbarte Kapital-Einmalsumme.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">🏥 Krankenhaustagegeld & Unfallrente</p>
              <p className="text-xs text-slate-500">Wichtige Zusatzleistungen wie Krankenhaustagegeld, Bergungskosten oder monatliche Unfallrenten sichern den Lebensstandard dauerhaft ab.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <p className="font-bold text-emerald-900 text-sm mb-1">👨👩👧 Familienfreundliche Tarife</p>
              <p className="text-xs text-emerald-700">Kinder und Partner lassen sich kostengünstig in einem gemeinsamen Vertrag mit absichern.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={unfallFaqs} title="Häufige Fragen zur Unfallversicherung" />
      </div>
    </div>
  );
}