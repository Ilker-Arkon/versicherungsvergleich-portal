'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const rechtsschutzTariffs: TariffRow[] = [
  {
    id: 'arag-aktiv-premium',
    provider: 'ARAG',
    logoText: 'ARAG',
    tariffName: 'Aktiv-Rechtsschutz Premium',
    priceMonthly: 19.80,
    priceYearly: 237.60,
    rating: 4.9,
    reviewCount: 3120,
    benefits: ['Unbegrenzte Versicherungssumme', 'Privat-, Berufs-, Verkehrs- & Wohnungsrecht', 'Kostenlose telefonische Anwaltsberatung', 'Weltweiter Schutz rund um die Uhr'],
    bonus: 'Keine Wartezeit bei Vorversicherung',
    isTestsieger: true,
    ctaText: 'Jetzt Tarif berechnen'
  },
  {
    id: 'roland-komfort',
    provider: 'Roland Rechtsschutz',
    logoText: 'ROL',
    tariffName: 'Komfort Schutz Plus',
    priceMonthly: 17.50,
    priceYearly: 210.00,
    rating: 4.8,
    reviewCount: 1940,
    benefits: ['Freie Anwaltswahl', 'Mediation zur Konfliktlösung inkl.', 'Cyber-Rechtsschutz & Identitätsdiebstahl', 'Reduzierte Selbstbeteiligung bei Partneranwalt'],
    isTestsieger: false,
    ctaText: 'Tarif ansehen'
  }
];

const rechtsschutzFaqs = [
  {
    question: "Welche Bereiche deckt eine Rechtsschutzversicherung ab?",
    answer: "Je nach gewähltem Baustein übernimmt die Rechtsschutzversicherung Anwalts- und Gerichtskosten bei Streitigkeiten im Alltag – zum Beispiel im Mietrecht, bei Kündigungen im Beruf oder nach Verkehrsunfällen."
  },
  {
    question: "Wird mir beim Wechsel oder der Kündigung der alten Versicherung geholfen?",
    answer: "Ja, bei den meisten Anbietern übernimmt der neue Versicherer auf Wunsch den Kündigungsservice direkt für dich."
  },
  {
    question: "Gibt es Tarife ohne Wartezeit?",
    answer: "Ja. Bei einem nahtlosen Wechsel von einer Vorversicherung entfällt die reguläre 3-monatige Wartezeit vollständig. Zudem sind verkehrsrechtliche Streitigkeiten und Notfall-Telefonberatungen oft ab Tag 1 versichert."
  }
];

export default function RechtsschutzPage() {
  const widget = PARTNER_WIDGETS.rechtsschutz;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Rechtsschutzversicherung <span className="text-emerald-600">Vergleich 2026</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Sichern Sie Ihr gutes Recht in Beruf, Straßenverkehr, Mietstreitigkeiten und im Privatleben. Vergleichen Sie Top-Tarife im offiziellen Live-Rechner.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Unbegrenzte Deckungssummen</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Sofortige telefonische Erstberatung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% freie Anwaltswahl</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Rechtsschutz-Tarifrechner"
            badgeText="Geprüfte Tarife mit Bestnoten"
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
              <h2 className="text-xl font-bold text-slate-900">Recht haben und Recht bekommen: Keine Angst vor teuren Anwaltskosten</h2>
              <p className="text-xs text-slate-500 mt-0.5">Rechtsschutzversicherung einfach erklärt</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Ein unerwarteter Streit mit dem Vermieter, eine ungerechtfertigte Kündigung oder ein Verkehrsunfall mit strittiger Schuldfrage: Im Alltag kann man schneller in einen Rechtsstreit geraten, als man denkt. Anwaltsgebühren, Gerichtskosten und Gutachter summieren sich selbst bei kleineren Streitwerten rasch auf <strong className="text-slate-900">mehrere tausend Euro</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🏠', title: 'Privat- & Vertragsrecht', text: 'Schutz bei Ärger rund um Online-Käufe, Verträge und Dienstleistungen.' },
              { icon: '💼', title: 'Arbeitsrecht', text: 'Absicherung bei Abmahnungen, Kündigungen oder Streitigkeiten um das Arbeitszeugnis.' },
              { icon: '🔑', title: 'Miet- & Immobilienrecht', text: 'Hilfe bei Konflikten um Mieterhöhungen, Kündigungen wegen Eigenbedarf oder Mängeln.' },
              { icon: '🚗', title: 'Verkehrsrecht', text: 'Schutz nach Unfällen, bei drohendem Fahrverbot oder Bußgeldbescheiden.' },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">Viele moderne Tarife bieten dir neben der freien Anwaltswahl auch kostenlose telefonische Erstberatungen und unbürokratische Schlichtungsverfahren (Mediation).</p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten Rechtsschutzversicherer im Vergleich"
            subtitle="Tarife mit Top-Bewertungen bei Stiftung Warentest Finanztest"
            productType="Rechtsschutzversicherung"
            tariffs={rechtsschutzTariffs}
            widgetSlug="/rechtsschutz-versicherung"
          />
        </div>

        <FAQAccordion items={rechtsschutzFaqs} title="Häufige Fragen zur Rechtsschutzversicherung" />
      </div>
    </div>
  );
}