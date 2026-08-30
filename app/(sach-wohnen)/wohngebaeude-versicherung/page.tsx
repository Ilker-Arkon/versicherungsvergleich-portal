'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Home } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Leistungsvergleich from '@/components/Leistungsvergleich';
import { LEISTUNGEN } from '@/lib/leistungen';

const gebaeudeFaqs = [
  {
    question: "Warum ist eine Wohngebäudeversicherung für Hausbesitzer unverzichtbar?",
    answer: "Schäden durch Sturm, Unwetter, Hagel, Feuer oder Hochwasser können extrem teuer werden. Die Wohngebäudeversicherung schützt das Gebäude finanziell vor existenzbedrohenden Reparaturkosten."
  },
  {
    question: "Wird mir beim Wechsel oder der Kündigung der alten Versicherung geholfen?",
    answer: "Ja, bei den meisten Anbietern übernimmt der neue Versicherer auf Wunsch den Kündigungsservice direkt für dich."
  },
  {
    question: "Was bedeutet gleitender Neuwert?",
    answer: "Der gleitende Neuwert stellt sicher, dass Ihr Gebäude im Falle eines Totalschadens (z. B. nach einem Großbrand) unabhängig von künftigen Baupreiserhöhungen und Inflation vollständig zum aktuellen Wiederaufbauwert neu errichtet wird."
  }
];

export default function WohngebaeudePage() {
  const widget = PARTNER_WIDGETS.wohngebaeude;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Wohngebäudeversicherung <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Optimaler Rundum-Schutz für Ihr Eigenheim vor Feuer, Sturm, Leitungswasser und extremen Elementarschäden.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Gleitender Neuwertfaktor</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Elementarschäden optional zubuchbar</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Photovoltaik- & Wärmepumpenschutz</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Wohngebäude-Tarifrechner"
            badgeText="Geprüfter Gebäudeschutz"
            minHeight="700px"
          />
        </div>

        {/* Ratgeber-Sektion */}
        <div className="premium-card p-8 mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Dein Zuhause optimal schützen: Die Wohngebäudeversicherung im Überblick</h2>
              <p className="text-xs text-slate-500 mt-0.5">Was du wissen musst – klar und verständlich erklärt</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Das eigene Haus ist für die meisten Menschen der wertvollste Besitz. Doch unvorhersehbare Naturereignisse wie heftiger Starkregen, Sturmböen, Blitzeinschläge oder ein Brand können innerhalb weniger Minuten Schäden in <strong className="text-slate-900">fünf- oder sechsstelliger Höhe</strong> verursachen. Eine leistungsstarke Wohngebäudeversicherung bewahrt dich verlässlich vor existenzbedrohenden Reparaturkosten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/60">
              <p className="font-bold text-blue-900 text-sm mb-1">🌧️ Schutz vor Elementarschäden</p>
              <p className="text-xs text-blue-700">Überschwemmungen durch Starkregen, Rückstau oder Schneedruck nehmen zu. Der Elementarschutz stellt sicher, dass alle Schadensbeseitigungen übernommen werden.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200/60">
              <p className="font-bold text-orange-900 text-sm mb-1">🔥 Umfassender Feuerschutz</p>
              <p className="text-xs text-orange-700">Egal ob Kurzschluss, Kabelbrand oder Blitzeinschlag – die Versicherung kommt für die vollständige Wiederherstellung deines Gebäudes auf.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <p className="font-bold text-emerald-900 text-sm mb-1">📈 Gleitender Neuwert</p>
              <p className="text-xs text-emerald-700">Die Versicherungssumme wird automatisch an steigende Bau- und Materialpreise angepasst. Im Totalschadenfall wird dein Haus ohne finanzielle Lücke neu aufgebaut.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <Leistungsvergleich
            title={LEISTUNGEN.wohngebaeude.title}
            subtitle={LEISTUNGEN.wohngebaeude.subtitle}
            merkmale={LEISTUNGEN.wohngebaeude.merkmale}
          />
        </div>

        <FAQAccordion items={gebaeudeFaqs} title="Häufige Fragen zur Wohngebäudeversicherung" />
      </div>
    </div>
  );
}