'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Leistungsvergleich from '@/components/Leistungsvergleich';
import { LEISTUNGEN } from '@/lib/leistungen';
import Link from 'next/link';

const renteFaqs = [
  {
    question: "Warum reicht die gesetzliche Rente in der Regel nicht aus?",
    answer: "Durch den demografischen Wandel sinkt das gesetzliche Rentenniveau kontinuierlich. Wer im Alter seinen gewohnten Lebensstandard beibehalten möchte, muss die entstehende Rentenlücke durch private oder geförderte Altersvorsorge schließen."
  },
  {
    question: "Wie wird die private Rentenversicherung im Ruhestand versteuert?",
    answer: "Privatrenten profitieren vom günstigen Ertragsanteil: Bei einem Rentenbeginn mit 67 Jahren müssen beispielsweise nur 17 % der monatlichen Rente mit dem individuellen Steuersatz versteuert werden. Der Großteil (83 %) bleibt komplett steuerfrei!"
  }
];

export default function RentePage() {
  const widget = PARTNER_WIDGETS.rente;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Private Rentenversicherung <span className="text-purple-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schließen Sie Ihre Rentenlücke: Lebenslange garantierte Zusatzrente und steuerbegünstigter Vermögensaufbau für Ihren Ruhestand.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/rente" className="px-3.5 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg shadow-xs">
              Private Rente & ETF-Police
            </Link>
            <Link href="/riester-rente" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 text-xs font-semibold rounded-lg transition-colors">
              Riester-Rente mit Zulagen
            </Link>
            <Link href="/ruerup-rente" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 text-xs font-semibold rounded-lg transition-colors">
              Rürup-Rente mit Steuervorteil
            </Link>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Rentenversicherungs-Tarifrechner"
            badgeText="Steuerbegünstigte Altersvorsorge"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
            Ihre Vorteile einer privaten Rentenversicherung
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Lebenslange Rentengarantie</p>
              <p className="text-xs text-slate-500">Ihre private Rente wird bis zum Lebensende zuverlässig ausgezahlt – egal wie alt Sie werden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Enorme Steuervorteile</p>
              <p className="text-xs text-slate-500">Keine Abgeltungsteuer während der Sparphase und extrem günstige Ertragsanteilsbesteuerung bei Rentenbezug.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Volle Flexibilität</p>
              <p className="text-xs text-slate-500">Wahlrecht zwischen lebenslanger Rente, einmaliger Gesamtauszahlung oder einer Kombination aus beidem.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <Leistungsvergleich
            title={LEISTUNGEN.rente.title}
            subtitle={LEISTUNGEN.rente.subtitle}
            merkmale={LEISTUNGEN.rente.merkmale}
          />
        </div>

        <FAQAccordion items={renteFaqs} title="Häufige Fragen zur privaten Rentenversicherung" />
      </div>
    </div>
  );
}
