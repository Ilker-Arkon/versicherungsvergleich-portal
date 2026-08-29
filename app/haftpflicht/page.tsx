'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Link from 'next/link';

const tariffs: TariffRow[] = [
  {
    id: 'huk-phv-plus',
    provider: 'HUK24',
    logoText: 'HUK',
    tariffName: 'PHV Plus Familienschutz',
    priceMonthly: 3.90,
    priceYearly: 46.80,
    rating: 4.9,
    reviewCount: 3890,
    benefits: ['50 Mio. € Versicherungssumme', 'Forderungsausfalldeckung inkl.', 'Schlüsselverlust bis 50.000 €', 'Gefälligkeitsschäden mitversichert'],
    bonus: 'Testsieger Stiftung Warentest',
    isTestsieger: true,
    ctaText: 'Tarif berechnen',
    ctaLink: '/haftpflicht'
  },
  {
    id: 'axa-boxflex',
    provider: 'AXA',
    logoText: 'AXA',
    tariffName: 'BOXflex Premium',
    priceMonthly: 4.80,
    priceYearly: 57.60,
    rating: 4.8,
    reviewCount: 2120,
    benefits: ['Unbegrenzte Versicherungssumme', 'Drohnen bis 5 kg inkl.', 'Schäden an gemieteten Sachen', 'Internetschutz bis 100.000 €'],
    isTestsieger: false,
    ctaText: 'Jetzt vergleichen',
    ctaLink: '/haftpflicht'
  }
];

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

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
            Wichtige Kriterien beim Vergleich
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Deckungssumme 50 Mio. Euro</p>
              <p className="text-xs text-slate-500">Wählen Sie stets eine pauschale Deckungssumme von mindestens 50 Mio. Euro für Personen-, Sach- und Vermögensschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Forderungsausfalldeckung</p>
              <p className="text-xs text-slate-500">Zahlt, wenn Ihnen ein unversicherter Dritter einen Schaden zufügt und selbst nicht zahlen kann.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Schlüsselverlust privat und beruflich</p>
              <p className="text-xs text-slate-500">Kosten für den Austausch von Schließanlagen in Mietshäusern oder am Arbeitsplatz sind mitversichert.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable
            title="Empfohlene Privathaftpflicht-Tarife 2026"
            subtitle="Testsieger mit exzellentem Preis-Leistungs-Verhältnis (Stiftung Warentest, Focus Money)"
            productType="Privathaftpflichtversicherung"
            tariffs={tariffs}
            widgetSlug="/haftpflicht"
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zur Privathaftpflichtversicherung" />
      </div>
    </div>
  );
}
