'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const pflegeFaqs = [
  {
    question: "Warum ist eine private Pflegezusatzversicherung ratsam?",
    answer: "Die gesetzliche Pflegepflichtversicherung ist lediglich eine 'Teilkaskoversicherung'. Im Pflegefall (besonders bei stationärer Heimunterbringung) verbleibt ein monatlicher Eigenanteil von oft über 2.500 bis 3.000 €. Reicht die eigene Rente nicht, muss das eigene Ersparte oder das Vermögen der Angehörigen eingesetzt werden."
  },
  {
    question: "Was ist der Unterschied zwischen Pflegetagegeld und Pflegekostenversicherung?",
    answer: "Beim Pflegetagegeld erhalten Sie bei Vorliegen eines Pflegegrades einen fest vereinbarten täglichen oder monatlichen Geldbetrag zur völlig freien Verfügung, ohne Nachweise erbringen zu müssen."
  }
];

export default function PflegezusatzPage() {
  const widget = PARTNER_WIDGETS.pflegezusatz;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Pflegezusatzversicherung <span className="text-purple-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie Ihr mühsam aufgebautes Vermögen und entlasten Sie Ihre Familie zuverlässig vor hohen Pflegeheimkosten.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Schutz vor hohen Eigenanteilen</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Freie Verwendung des Pflegetagegelds</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Keine Wartezeiten bei unfallbedingter Pflege</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Pflegezusatz-Tarifrechner"
            badgeText="Vermögensschutz für die Familie"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
            Wichtige Leistungen beim Pflegeschutz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Leistung ab Pflegegrad 1 / 2</p>
              <p className="text-xs text-slate-500">Gute Tarife leisten bereits bei leichten Beeinträchtigungen und Pflegegrad 1 oder 2 finanzielle Unterstützung.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Ambulant & Stationär</p>
              <p className="text-xs text-slate-500">Gleiche Leistung sowohl bei Pflege durch Angehörige zu Hause als auch im professionellen Pflegeheim.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Beitragsbefreiung im Pflegefall</p>
              <p className="text-xs text-slate-500">Sobald Sie pflegebedürftig werden, entfallen die monatlichen Beitragszahlungen für den Vertrag vollständig.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={pflegeFaqs} title="Häufige Fragen zur Pflegezusatzversicherung" />
      </div>
    </div>
  );
}
