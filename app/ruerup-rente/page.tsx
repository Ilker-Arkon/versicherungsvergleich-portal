'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const ruerupFaqs = [
  {
    question: "Für wen ist die Rürup-Rente (Basisrente) besonders vorteilhaft?",
    answer: "Vor allem für Selbstständige, Freiberufler, Unternehmer und gut verdienende Angestellte, da die Einzahlungen fast vollständig als Sonderausgaben vom zu versteuernden Einkommen abgezogen werden können."
  },
  {
    question: "Wie hoch ist der maximale Steuervorteil?",
    answer: "Beiträge zur Basisrente können bis zum Höchstbetrag der knappschaftlichen Rentenversicherung (über 27.500 € für Alleinstehende, über 55.000 € für Verheiratete) zu 100 % steuerlich geltend gemacht werden."
  }
];

export default function RuerupPage() {
  const widget = PARTNER_WIDGETS.ruerup;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Rürup-Rente <span className="text-purple-600">(Basisrente) Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maximale Steuerersparnis und garantierte lebenslange Rentenzahlung für Selbstständige, Freiberufler und Besserverdiener.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% steuerlich absetzbare Beiträge</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Pfändungs- & insolvenzsicher</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Flexible Einmalzahlungen zum Jahresende</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Rürup-Renten-Tarifrechner"
            badgeText="Bis zu 10.000 € Steuerersparnis"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <FileSpreadsheet className="w-5 h-5 text-purple-600 mr-2" />
            Kernvorteile der Rürup-Basisrente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Direkter Steuerabzug</p>
              <p className="text-xs text-slate-500">Jeder eingezahlte Euro senkt direkt Ihr zu versteuerndes Einkommen und führt zu einer spürbaren Steuererstattung.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Insolvenz- & Pfändungsschutz</p>
              <p className="text-xs text-slate-500">Das gebildete Altersvorsorgekapital ist gesetzlich vor dem Zugriff von Gläubigern geschützt.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Kombination mit BU</p>
              <p className="text-xs text-slate-500">Eine Berufsunfähigkeits-Zusatzversicherung (BUZ) kann steuermindernd in den Rürup-Vertrag integriert werden.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={ruerupFaqs} title="Häufige Fragen zur Basisrente" />
      </div>
    </div>
  );
}
