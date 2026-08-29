'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Briefcase } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const buTariffs: TariffRow[] = [
  {
    id: 'alte-leipziger-bu',
    provider: 'Alte Leipziger',
    logoText: 'AL',
    tariffName: 'SecurAL BU Premium',
    priceMonthly: 38.50,
    priceYearly: 462.00,
    rating: 4.9,
    reviewCount: 3150,
    benefits: ['Verzicht auf abstrakte Verweisung', 'Leistung ab 50% Berufsunfähigkeit', '6 Monate rückwirkende Leistung', 'Umfangreiche Nachversicherungsgarantien ohne erneute Gesundheitsprüfung'],
    bonus: 'Dauertestsieger bei Finanztest',
    isTestsieger: true,
    ctaText: 'Jetzt BU berechnen'
  },
  {
    id: 'canada-life-bu',
    provider: 'Canada Life',
    logoText: 'CL',
    tariffName: 'Berufsunfähigkeitsschutz',
    priceMonthly: 36.20,
    priceYearly: 434.40,
    rating: 4.8,
    reviewCount: 2280,
    benefits: ['Weltweiter Versicherungsschutz', 'Gelbe-Schein-Regelung bei langer Krankschreibung', 'Infektionsklausel für medizinische Berufe', 'Garantierte Rentensteigerung im Leistungsfall'],
    isTestsieger: false,
    ctaText: 'Tarif ansehen'
  }
];

const buFaqs = [
  {
    question: "Warum ist die Berufsunfähigkeitsversicherung so wichtig?",
    answer: "Statistisch wird jeder vierte Arbeitnehmer im Laufe seines Lebens vorübergehend oder dauerhaft berufsunfähig – meistens durch psychische Erkrankungen (z. B. Burnout, Depression) oder Erkrankungen des Bewegungsapparats. Die staatliche Erwerbsminderungsrente reicht im Ernstfall nicht zum Leben aus."
  },
  {
    question: "Was bedeutet der Verzicht auf abstrakte Verweisung?",
    answer: "Das ist die wichtigste Klausel überhaupt: Der Versicherer darf Sie bei Berufsunfähigkeit nicht auf einen theoretisch anderen Beruf verweisen (z. B. Pförtner), sondern muss zahlen, wenn Sie Ihren zuletzt ausgeübten Beruf zu mindestens 50 % nicht mehr ausüben können."
  },
  {
    question: "Wann sollte man eine BU abschließen?",
    answer: "Je jünger und gesünder Sie beim Abschluss sind, desto günstiger sind die Monatsbeiträge für die gesamte Vertragslaufzeit. Zudem gibt es noch keine oder kaum Vorerkrankungen, die zu Ausschlüssen oder Risikozuschlägen führen könnten."
  }
];

export default function BerufsunfaehigkeitPage() {
  const widget = PARTNER_WIDGETS.berufsunfaehigkeit;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Berufsunfähigkeitsversicherung <span className="text-purple-600">(BU) Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Sichern Sie Ihr wertvollstes Gut: Ihr monatliches Arbeitseinkommen. Vergleichen Sie zertifizierte BU-Tarife im offiziellen Live-Rechner.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Verzicht auf abstrakte Verweisung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% anonyme & unverbindliche Berechnung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Nachversicherungsgarantie ohne Gesundheitsprüfung</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller BU-Tarifrechner"
            badgeText="Existenzschutz Nr. 1"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 text-purple-600 mr-2" />
            Checkliste: Darauf kommt es bei einer guten BU-Police an
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Ausreichende BU-Rentenhöhe</p>
              <p className="text-xs text-slate-500">Wir empfehlen mindestens 70–80 % des aktuellen Nettoeinkommens abzusichern, um den gewohnten Lebensstandard zu halten.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Laufzeit bis Endalter 67</p>
              <p className="text-xs text-slate-500">Vereinbaren Sie die Leistungsdauer idealerweise bis zum gesetzlichen Renteneintrittsalter, um Rentenlücken zu vermeiden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Nachversicherungsoptionen</p>
              <p className="text-xs text-slate-500">Erhöhung der BU-Rente bei Heirat, Geburt eines Kindes, Immobilienkauf oder Gehaltssprung ohne erneute Gesundheitsfragen.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die beliebtesten Berufsunfähigkeits-Tarife"
            subtitle="Testsieger mit Höchstnoten bei Morgen & Morgen und Stiftung Warentest"
            productType="Berufsunfähigkeitsversicherung"
            tariffs={buTariffs}
            widgetSlug="/berufsunfaehigkeit"
          />
        </div>

        <FAQAccordion items={buFaqs} title="Häufige Fragen zur Berufsunfähigkeitsversicherung" />
      </div>
    </div>
  );
}
