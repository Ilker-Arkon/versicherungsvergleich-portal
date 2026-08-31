'use client';

import React, { useState } from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Umbrella, Home } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const phvFaqs = [
  {
    question: "Warum ist die Privathaftpflichtversicherung unverzichtbar?",
    answer: "Nach § 823 BGB haften Sie in Deutschland mit Ihrem gesamten gegenwärtigen und zukünftigen Vermögen unbegrenzt für Schäden, die Sie Dritten zufügen. Eine Privathaftpflicht schützt Sie vor dem finanziellen Ruin."
  },
  {
    question: "Was deckt eine Hausratversicherung ab?",
    answer: "Die Hausratversicherung ersetzt den Neuwert aller Einrichtungs-, Gebrauchs- und Verbrauchsgegenstände Ihrer Wohnung bei Schäden durch Feuer, Leitungswasser, Sturm/Hagel, Einbruchdiebstahl und Vandalismus."
  },
  {
    question: "Was ist der Unterversicherungsverzicht bei der Hausrat?",
    answer: "Wenn Sie pro Quadratmeter Wohnfläche mindestens den empfohlenen Richtwert (meist 650 € / m²) versichern, verzichtet der Versicherer im Schadenfall auf die Prüfung einer Unterversicherung und zahlt den Schaden voll aus."
  }
];

export default function HaftpflichtHausratPage() {
  const [activeTab, setActiveTab] = useState<'phv' | 'hr'>('phv');

  const currentWidget = activeTab === 'phv' ? PARTNER_WIDGETS.haftpflicht : PARTNER_WIDGETS.hausrat;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Haftpflicht & Hausrat <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie Ihr Vermögen, Ihre Familie und Ihr Zuhause mit den besten Tarifen ab wenigen Euro im Monat.
          </p>

          {/* Toggle Tab */}
          <div className="mt-6 inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('phv')}
              className={`flex items-center px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'phv'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Umbrella className="w-4 h-4 mr-2" />
              Privathaftpflicht-Rechner
            </button>
            <button
              onClick={() => setActiveTab('hr')}
              className={`flex items-center px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'hr'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Hausratversicherungs-Rechner
            </button>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            key={activeTab}
            containerId={currentWidget.containerId}
            scriptSrc={currentWidget.scriptSrc}
            directLink={currentWidget.directLink}
            title={activeTab === 'phv' ? "Offizieller Privathaftpflicht-Tarifrechner" : "Offizieller Hausrat-Tarifrechner"}
            badgeText={activeTab === 'phv' ? "Ab 3,50 € / Monat" : "Neuwertentschädigung 100%"}
            minHeight="680px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
            Wichtige Kriterien beim Versicherungsschutz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Forderungsausfalldeckung</p>
              <p className="text-xs text-slate-500">Ihre Haftpflicht zahlt auch dann, wenn Ihnen jemand einen Schaden zufügt, der selbst mittellos und unversichert ist.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Schlüsselverlust privat & Beruf</p>
              <p className="text-xs text-slate-500">Kosten für den Austausch von Schließanlagen in Mietshäusern oder am Arbeitsplatz sollten voll mitversichert sein.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Fahrrad- & Fahrraddiebstahl</p>
              <p className="text-xs text-slate-500">In der Hausratversicherung lohnt sich die 24h-Klausel für Fahrräder & E-Bikes gegen Diebstahl auf offener Straße.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={phvFaqs} title="Häufige Fragen zu Haftpflicht & Hausrat" />
      </div>
    </div>
  );
}