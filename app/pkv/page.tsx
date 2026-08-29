'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Award, HeartPulse } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Link from 'next/link';

const pkvTariffs: TariffRow[] = [
  {
    id: 'hallesche-prime',
    provider: 'HALLESCHE',
    logoText: 'HAL',
    tariffName: 'NK.select Premium',
    priceMonthly: 385.00,
    priceYearly: 4620.00,
    rating: 4.9,
    reviewCount: 1890,
    benefits: ['100% Chefarzt & Privatarzt', '1-Bett-Zimmer mit Rooming-in', '100% Zahnbehandlung & 90% Zahnersatz', 'Hohe Beitragsrückerstattung bei Leistungsfreiheit'],
    bonus: 'Bis zu 3 Monatsbeiträge Rückerstattung',
    isTestsieger: true,
    ctaText: 'Tarifdetails ansehen'
  },
  {
    id: 'signal-iduna-exklusiv',
    provider: 'Signal Iduna',
    logoText: 'SIG',
    tariffName: 'Prime Exklusiv Plus',
    priceMonthly: 410.00,
    priceYearly: 4920.00,
    rating: 4.8,
    reviewCount: 2310,
    benefits: ['Weltweiter Versicherungsschutz', 'Psychotherapie & Heilpraktiker 100%', 'Vorsorgeuntersuchungen ohne SB-Anrechnung', 'Garantierte Alterungsrückstellungen'],
    isTestsieger: false,
    ctaText: 'Angebot anfordern'
  },
  {
    id: 'axa-vital',
    provider: 'AXA',
    logoText: 'AXA',
    tariffName: 'ActiveMe Pro',
    priceMonthly: 349.00,
    priceYearly: 4188.00,
    rating: 4.7,
    reviewCount: 1650,
    benefits: ['Offener Hilfsmittelkatalog', 'Gesundheitsbonus & Vorsorge-App', 'Digitale Sprechstunde 24/7', 'Flexibler Selbstbehalt wählbar'],
    isTestsieger: false,
    ctaText: 'Kostenlos berechnen'
  }
];

const pkvFaqs = [
  {
    question: "Wer kann in die Private Krankenversicherung (PKV) wechseln?",
    answer: "Ein Wechsel in die PKV steht vor allem Selbstständigen, Freiberuflern, Beamten sowie Angestellten offen, deren Einkommen über der gesetzlichen Versicherungspflichtgrenze liegt."
  },
  {
    question: "Ist die Anfrage für eine Krankenversicherung verbindlich?",
    answer: "Nein. Wenn du ein Angebot anforderst, erhältst du unverbindliche Tarifvorschläge und Informationen. Erst wenn du einen Antrag explizit unterschreibst und einreichst, wird der Schutz aktiv."
  },
  {
    question: "Was geschieht mit den Beiträgen im Rentenalter?",
    answer: "Moderne PKV-Tarife bilden gesetzlich vorgeschriebene Alterungsrückstellungen und bieten flexible Entlastungstarife, um Beiträge im Ruhestand stabil und bezahlbar zu halten."
  }
];

export default function PkvPage() {
  const widget = PARTNER_WIDGETS.pkv;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Gesundheit & Kranken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Private Krankenversicherung (PKV) <span className="text-gradient">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Spitzenmedizin, Chefarztbehandlung und 1-Bett-Komfort: Vergleichen Sie die besten PKV-Tarife für Selbstständige, Beamte, Angestellte und Studenten.
          </p>

          {/* Quick Sub-navigation for Special Target Groups */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/pkv" className="px-3.5 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-xs">
              PKV Vollversicherung
            </Link>
            <Link href="/pkv-beamte" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors">
              Für Beamte & Beihilfe
            </Link>
            <Link href="/krankenzusatz" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors">
              Zahn- & Zusatzversicherung
            </Link>
            <Link href="/pkv-studenten" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors">
              Für Studenten
            </Link>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller PKV-Vergleichsrechner"
            badgeText="Geprüfte Tarife & Expertenberatung"
            minHeight="700px"
          />
        </div>

        {/* Ratgeber-Sektion */}
        <div className="premium-card p-8 mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Deine Gesundheit, deine Wahl: Die Private Krankenversicherung einfach erklärt</h2>
              <p className="text-xs text-slate-500 mt-0.5">Für wen lohnt sich der Wechsel in die PKV?</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Die gesetzliche Krankenversicherung bietet eine solide Basisversorgung – doch viele Menschen wünschen sich mehr Flexibilität, schnellere Termine bei Fachärzten und maßgeschneiderte medizinische Leistungen. Mit einer Privaten Krankenversicherung gestaltest du deinen Gesundheitsschutz genau so, wie er zu deinen persönlichen Bedürfnissen passt.
          </p>
          <div className="mb-5 p-4 bg-blue-50 border border-blue-200/60 rounded-xl">
            <p className="text-sm font-bold text-blue-900 mb-2">Für wen lohnt sich der Wechsel?</p>
            <p className="text-xs text-blue-800">Eine private Absicherung ist besonders interessant für <strong>Selbstständige & Freiberufler</strong>, <strong>Beamte</strong> sowie <strong>Angestellte</strong>, deren Einkommen über der gesetzlichen Versicherungspflichtgrenze liegt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">⭐ Individuelle Wunschleistungen</p>
              <p className="text-xs text-slate-500">Wähle selbst zwischen Chefarztbehandlung, Einbettzimmer oder umfangreicher Zahngesundheit.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <p className="font-bold text-emerald-900 text-sm mb-1">🔒 Garantierter Schutz</p>
              <p className="text-xs text-emerald-700">Deine gewählten Leistungen können von der Versicherung nicht einseitig gekürzt werden – anders als in der gesetzlichen Kasse.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">💶 Attraktive Beiträge</p>
              <p className="text-xs text-slate-500">Passgenaue Tarife, die oft umfassendere Leistungen bieten als die gesetzliche Kasse – bei ähnlichem oder geringerem Beitrag.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="PKV-Tarife im Leistungs- & Beitragsvergleich"
            subtitle="Top bewertete Tarife von unabhängigen Ratingagenturen (Morgen & Morgen, Franke und Bornberg)"
            productType="Private Krankenversicherung"
            tariffs={pkvTariffs}
            widgetSlug="/pkv"
          />
        </div>

        <FAQAccordion items={pkvFaqs} title="Häufige Fragen zur Privaten Krankenversicherung" />
      </div>
    </div>
  );
}