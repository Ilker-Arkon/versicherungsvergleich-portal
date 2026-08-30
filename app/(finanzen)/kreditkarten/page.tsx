import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/kreditkarten");


const cardFaqs = [
  {
    question: "Welche Kreditkarten sind dauerhaft ohne Jahresgebühr?",
    answer: "Viele moderne Kreditkarten (wie z. B. von Barclays, TF Bank, PayVIP oder DKB) erheben 0 € Jahresgebühr – dauerhaft und ohne Mindestumsatz."
  },
  {
    question: "Was ist der Unterschied zwischen Charge-, Revolving- und Debit-Kreditkarten?",
    answer: "Bei einer Charge-Karte werden alle Umsätze einmal monatlich gesammelt vom Girokonto abgebucht. Bei einer Revolving-Karte ist eine flexible Teilzahlung in Raten möglich. Eine Debitkarte bucht jeden Betrag direkt wenige Sekunden nach der Zahlung ab."
  }
];

export default function KreditkartenPage() {
  const widget = PARTNER_WIDGETS.kreditkarte;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Finanzen & Banken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Kreditkarten-Vergleich: <span className="text-amber-600">0 € Jahresgebühr</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Finden Sie die perfekte Kreditkarte für Alltag, Online-Shopping und weltweites Reisen ohne versteckte Gebühren.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Dauerhaft 0 € Jahresgebühr</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Weltweit gebührenfrei Geld abheben & bezahlen</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Google Pay & Apple Pay fähig</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Kreditkarten-Vergleichsrechner"
            badgeText="Kostenlose Karten im Test"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={cardFaqs} title="Häufige Fragen zu Kreditkarten" />
      </div>
    </div>
  );
}
