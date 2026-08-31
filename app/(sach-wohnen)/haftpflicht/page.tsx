import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Link from 'next/link';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/haftpflicht");


const faqs = [
  {
    question: 'Warum ist die Privathaftpflichtversicherung unverzichtbar?',
    answer: 'Nach § 823 BGB haften Sie in Deutschland mit Ihrem gesamten gegenwärtigen und zukünftigen Vermögen unbegrenzt für Schäden, die Sie Dritten zufügen. Eine Privathaftpflicht schützt Sie vor dem finanziellen Ruin.'
  },
  {
    question: 'Was ist die Forderungsausfalldeckung?',
    answer: 'Fügt Ihnen jemand einen Schaden zu, der selbst mittellos und unversichert ist, springt Ihre eigene Haftpflichtversicherung für den Schaden ein — so sind Sie auch in diesem Fall nicht auf Ihren Kosten sitzen.'
  },
  {
    question: 'Sind Kinder mit meiner PHV mitversichert?',
    answer: 'In der Regel ja: unverheiratete Kinder, die noch in der Erstausbildung sind, sind beitragsfrei über den Familientarif der Eltern mitversichert — auch wenn sie bereits im Studium auswärts wohnen.'
  }
];

export default function HaftpflichtPage() {
  const widget = PARTNER_WIDGETS.haftpflicht;
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach &amp; Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Privathaftpflicht <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie sich vor unbegrenzter Haftung — bereits ab 3,50 Euro im Monat.
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Deckung bis 50 Mio. Euro</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Für Singles und Familien</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Sofort-Deckung möglich</span>
          </div>
          <div className="mt-4">
            <Link href="/hausrat" className="text-xs font-semibold text-slate-500 hover:text-emerald-600 underline underline-offset-2 transition-colors">
              Auch Hausratversicherung vergleichen
            </Link>
          </div>
        </div>

        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Privathaftpflicht-Rechner"
            badgeText="Ab 3,50 Euro / Monat"
            minHeight="680px"
          />
        </div>

        {/* Ratgeber-Sektion */}
        <div className="premium-card p-8 mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Existenzschutz vor Schadenersatz: Warum die Privathaftpflicht unverzichtbar ist</h2>
              <p className="text-xs text-slate-500 mt-0.5">Ein Unachsamkeitsmoment kann teuer werden</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Du stößt versehentlich das teure Smartphone eines Bekannten um, fügst als Fußgänger einem Radfahrer einen Schaden zu – oder in deiner Wohnung tritt unbemerkt Wasser aus. Ein Unachsamkeitsmoment im Alltag genügt. Nach dem Bürgerlichen Gesetzbuch <strong className="text-slate-900">(§ 823 BGB)</strong> haftest du unbegrenzt mit deinem gesamten privaten Vermögen – auch mit zukünftigem Einkommen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">💶 Personen-, Sach- & Vermögensschäden</p>
              <p className="text-xs text-slate-500">Eine gute Privathaftpflicht schützt dich vor finanziellen Forderungen in Millionenhöhe – und das für wenige Euro im Monat.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/60">
              <p className="font-bold text-blue-900 text-sm mb-1">🛡️ Passiver Rechtsschutz inklusive</p>
              <p className="text-xs text-blue-700">Unberechtigte Ansprüche Dritter werden von der Versicherung auf deren Kosten geprüft und abgewehrt.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zur Privathaftpflichtversicherung" />
      </div>
    </div>
  );
}
