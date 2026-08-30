'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Heart } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Leistungsvergleich from '@/components/Leistungsvergleich';
import { LEISTUNGEN } from '@/lib/leistungen';

const rlvFaqs = [
  {
    question: "Für wen ist eine Risikolebensversicherung unverzichtbar?",
    answer: "Für Familien mit Kindern, Paare mit gemeinsamen Krediten (z. B. Baufinanzierung) sowie Geschäftspartner. Im Todesfall sichert die vertraglich vereinbarte Auszahlungssumme den Lebensstandard der Hinterbliebenen oder tilgt die Restschuld des Immobilienkredits."
  },
  {
    question: "Was ist der Unterschied zwischen konstanter und fallender Versicherungssumme?",
    answer: "Eine konstante Summe bleibt über die gesamte Laufzeit gleich hoch (ideal zur Familienabsicherung). Eine fallende Summe sinkt parallel zur Tilgung eines Baukredits und ist nochmals deutlich günstiger im Monatsbeitrag."
  }
];

export default function RisikolebenPage() {
  const widget = PARTNER_WIDGETS.risikoleben;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Risikolebensversicherung <span className="text-purple-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Zuverlässiger Schutz für Ihre Familie und finanzielle Sicherheit für Immobilienkredite ab wenigen Euro im Monat.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Auszahlung 100% einkommensteuerfrei</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Günstige Sonderkonditionen für Nichtraucher</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Optionale Über-Kreuz-Versicherung (Erbschaftsteuer-Vorteil)</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Risikoleben-Tarifrechner"
            badgeText="Familienabsicherung ab 5 € / Monat"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 text-purple-600 mr-2" />
            Empfohlene Absicherungshöhe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Familie mit kleinen Kindern</p>
              <p className="text-xs text-slate-500">Das 4- bis 5-fache Bruttojahreseinkommen des Hauptverdieners, bis die Kinder ihre Ausbildung abgeschlossen haben.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Immobilienfinanzierung</p>
              <p className="text-xs text-slate-500">Mindestens die Höhe des offenen Restdarlehens mit fallender Versicherungssumme zur günstigen Tilgungsabsicherung.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Über-Kreuz-Vertrag</p>
              <p className="text-xs text-slate-500">Für unverheiratete Paare: Jeder versichert das Leben des Partners, um die Erbschaftsteuerfreibeträge optimal zu nutzen.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <Leistungsvergleich
            title={LEISTUNGEN.risikoleben.title}
            subtitle={LEISTUNGEN.risikoleben.subtitle}
            merkmale={LEISTUNGEN.risikoleben.merkmale}
          />
        </div>

        <FAQAccordion items={rlvFaqs} title="Häufige Fragen zur Risikolebensversicherung" />
      </div>
    </div>
  );
}
