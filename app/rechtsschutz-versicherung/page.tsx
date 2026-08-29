'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Scale } from 'lucide-react';
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

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <Scale className="w-5 h-5 text-emerald-600 mr-2" />
            Die wichtigsten Bausteine im Rechtsschutz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Privatrecht</p>
              <p className="text-xs text-slate-500">Vertragsstreitigkeiten, Internetkäufe, Reisemängel und Schadenersatzansprüche.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Berufsrecht</p>
              <p className="text-xs text-slate-500">Kündigungsschutzklagen, Abfindungsverhandlungen und Streit um Arbeitszeugnisse.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Verkehrsrecht</p>
              <p className="text-xs text-slate-500">Verkehrsunfälle, Bußgeldbescheide, Fahrverbote und Streit beim Autokauf.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">Wohnungsrecht</p>
              <p className="text-xs text-slate-500">Mietminderung, Nebenkostenabrechnungen, Eigenbedarfskündigungen & Nachbarschaft.</p>
            </div>
          </div>
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