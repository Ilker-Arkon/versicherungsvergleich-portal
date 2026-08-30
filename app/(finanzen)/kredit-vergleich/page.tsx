'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Banknote } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Leistungsvergleich from '@/components/Leistungsvergleich';
import { LEISTUNGEN } from '@/lib/leistungen';

const kreditFaqs = [
  {
    question: "Ist die Kreditanfrage SCHUFA-neutral?",
    answer: "Ja! Jede Konditionsanfrage über unseren Vergleichsrechner erfolgt streng nach dem Merkmal 'Anfrage Kreditkondition' (KK). Dies ist zu 100 % SCHUFA-neutral und hat keinerlei negativen Einfluss auf Ihren SCHUFA-Score."
  },
  {
    question: "Wann wird der Kreditbetrag auf mein Konto überwiesen?",
    answer: "Bei digitalem Kontoblick und VideoIdent-Legitimation wird der gewünschte Kreditbetrag bei vielen Banken bereits innerhalb von 24 bis 48 Stunden vollständig auf Ihr Girokonto ausgezahlt."
  },
  {
    question: "Kann ich bestehende teure Kredite zusammenfassen und umschulden?",
    answer: "Ja, eine Umschuldung ist eine der effektivsten Möglichkeiten, um monatliche Zinskosten zu senken und die monatliche Gesamtbelastung spürbar zu reduzieren."
  }
];

export default function KreditPage() {
  const widget = PARTNER_WIDGETS.kredit;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Finanzen & Banken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Kredit & Ratenkredit <span className="text-amber-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Finden Sie die günstigsten Zinsen für Ihren Wunschkredit. 100% unverbindlich, SCHUFA-neutral und mit schneller Sofortentscheidung.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% SCHUFA-neutrale Konditionsanfrage</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Sofortauszahlung in 24–48 Stunden möglich</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Kostenlose Sondertilgungen</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Kredit-Vergleichsrechner"
            badgeText="Günstige Top-Zinsen ab 3,49%"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-amber-600 mr-2" />
            Tipps für den besten Ratenkredit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Zweiten Kreditnehmer angeben</p>
              <p className="text-xs text-slate-500">Ein zweiter Antragsteller (z. B. Partner) erhöht die Bonität und senkt den Zinssatz oft signifikant.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Freie Sondertilgung nutzen</p>
              <p className="text-xs text-slate-500">Achten Sie darauf, dass Sie den Kredit jederzeit ganz oder teilweise ohne Vorfälligkeitsentschädigung ablösen können.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Auf 2/3-Zinssatz achten</p>
              <p className="text-xs text-slate-500">Der gesetzliche 2/3-Zins zeigt Ihnen den realistischen Zinssatz, den mindestens zwei Drittel aller Kunden erhalten.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <Leistungsvergleich
            title={LEISTUNGEN.kredit.title}
            subtitle={LEISTUNGEN.kredit.subtitle}
            merkmale={LEISTUNGEN.kredit.merkmale}
          />
        </div>

        <FAQAccordion items={kreditFaqs} title="Häufige Fragen zum Ratenkredit" />
      </div>
    </div>
  );
}