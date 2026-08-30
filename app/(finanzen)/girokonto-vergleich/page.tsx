import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Leistungsvergleich from '@/components/Leistungsvergleich';
import { LEISTUNGEN } from '@/lib/leistungen';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/girokonto-vergleich");


const giroFaqs = [
  {
    question: "Wie erhalte ich Neukundenboni oder Wechselprämien bei Banken?",
    answer: "Viele Banken bieten attraktive Boni (z. B. bis zu 200 € Prämien) an. Um den Bonus zu erhalten, reicht oft die Eröffnung des Kontos über den Vergleichsrechner und die Nutzung als aktives Gehaltskonto."
  },
  {
    question: "Wie läuft der Kontowechsel ab?",
    answer: "Dank des gesetzlich geregelten digitalen Kontowechselservices werden Daueraufträge, Lastschriften und Zahlungspartner automatisch auf dein neues Konto übertragen."
  },
  {
    question: "Ist das Girokonto wirklich dauerhaft kostenlos?",
    answer: "Ja, bei vielen Direktbanken ist die Kontoführung bei einem regelmäßigen Geldeingang (oft ab 700 € / Monat) oder für Personen unter 28 Jahren dauerhaft ohne Grundgebühr."
  }
];

export default function GirokontoPage() {
  const widget = PARTNER_WIDGETS.girokonto;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Finanzen & Banken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Girokonto-Vergleich 2026: <span className="text-amber-600">0 € Gebühr & Prämien</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Finden Sie die besten kostenlosen Girokonten mit Visa/Mastercard, Top-Zinsen und attraktiven Willkommensprämien bis zu 200 €.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% gesetzliche deutsche Einlagensicherung (100.000 €)</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Schnelle Online-Eröffnung per VideoIdent</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Kostenloser Kündigungs- & Wechselservice</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Girokonto-Vergleichsrechner"
            badgeText="Tagesaktuelle Prämien & Konditionen"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-amber-600 mr-2" />
            Vorteile der Top-Girokonten 2026
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. 0 € Kontoführung</p>
              <p className="text-xs text-slate-500">Sparen Sie bis zu 180 € pro Jahr an Kontoführungs- und Buchungsgebühren im Vergleich zu Filialbanken.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Weltweit Bargeld</p>
              <p className="text-xs text-slate-500">Kostenlose Debit- oder Kreditkarten mit gebührenfreien Abhebungen im In- und Ausland.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Attraktive Startprämien</p>
              <p className="text-xs text-slate-500">Sichern Sie sich bis zu 200 € Willkommensbonus bei aktiver Nutzung als Gehaltskonto.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <Leistungsvergleich
            title={LEISTUNGEN.girokonto.title}
            subtitle={LEISTUNGEN.girokonto.subtitle}
            merkmale={LEISTUNGEN.girokonto.merkmale}
          />
        </div>

        <FAQAccordion items={giroFaqs} title="Häufige Fragen zum Girokonto-Wechsel" />
      </div>
    </div>
  );
}