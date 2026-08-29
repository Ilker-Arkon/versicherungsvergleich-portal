'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Home } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const wohngebaeudeTariffs: TariffRow[] = [
  {
    id: 'rhion-gebaeude-top',
    provider: 'Rhion Digital',
    logoText: 'RHI',
    tariffName: 'Wohngebäude Plus Elementar',
    priceMonthly: 24.50,
    priceYearly: 294.00,
    rating: 4.9,
    reviewCount: 1650,
    benefits: ['Gleitender Neuwert 100%', 'Elementarschäden (Starkregen, Schneedruck)', 'Graffitischäden & Photovoltaik inkl.', 'Ableitungsrohre auf & außerhalb Grundstück'],
    bonus: 'Testsieger Preis-Leistung',
    isTestsieger: true,
    ctaText: 'Jetzt Tarif berechnen'
  },
  {
    id: 'axa-gebaeude',
    provider: 'AXA',
    logoText: 'AXA',
    tariffName: 'BOXflex Wohngebäude',
    priceMonthly: 27.90,
    priceYearly: 334.80,
    rating: 4.8,
    reviewCount: 2240,
    benefits: ['Grobe Fahrlässigkeit bis 100%', 'Hotelkosten bei Unbewohnbarkeit', 'Mietausfall bis 36 Monate', 'Schadenservice mit Handwerker-Netzwerk'],
    isTestsieger: false,
    ctaText: 'Tarif ansehen'
  }
];

const gebaeudeFaqs = [
  {
    question: "Warum ist eine Wohngebäudeversicherung für Hausbesitzer unverzichtbar?",
    answer: "Schäden durch Sturm, Unwetter, Hagel, Feuer oder Hochwasser können extrem teuer werden. Die Wohngebäudeversicherung schützt das Gebäude finanziell vor existenzbedrohenden Reparaturkosten."
  },
  {
    question: "Wird mir beim Wechsel oder der Kündigung der alten Versicherung geholfen?",
    answer: "Ja, bei den meisten Anbietern übernimmt der neue Versicherer auf Wunsch den Kündigungsservice direkt für dich."
  },
  {
    question: "Was bedeutet gleitender Neuwert?",
    answer: "Der gleitende Neuwert stellt sicher, dass Ihr Gebäude im Falle eines Totalschadens (z. B. nach einem Großbrand) unabhängig von künftigen Baupreiserhöhungen und Inflation vollständig zum aktuellen Wiederaufbauwert neu errichtet wird."
  }
];

export default function WohngebaeudePage() {
  const widget = PARTNER_WIDGETS.wohngebaeude;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Wohngebäudeversicherung <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Optimaler Rundum-Schutz für Ihr Eigenheim vor Feuer, Sturm, Leitungswasser und extremen Elementarschäden.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Gleitender Neuwertfaktor</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Elementarschäden optional zubuchbar</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Photovoltaik- & Wärmepumpenschutz</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Wohngebäude-Tarifrechner"
            badgeText="Geprüfter Gebäudeschutz"
            minHeight="700px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
            Worauf Hauseigentümer beim Vergleich achten sollten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Elementargefahren einschließen</p>
              <p className="text-xs text-slate-500">Starkregen-Ereignisse nehmen zu. Ohne Elementarbaustein besteht kein Versicherungsschutz bei Überflutung und Rückstau.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Grobe Fahrlässigkeit 100%</p>
              <p className="text-xs text-slate-500">Volle Kostenübernahme selbst wenn eine Kerze vergessen wurde oder ein Fenster bei Sturm gekippt war.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Rohrbruch außerhalb Gebäude</p>
              <p className="text-xs text-slate-500">Achten Sie auf ausreichende Summen für Erdarbeiten und Reparaturen von Ableitungsrohren auf dem Grundstück.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Top Wohngebäude-Tarife im Vergleich"
            subtitle="Umfassender Versicherungsschutz für Ein- und Mehrfamilienhäuser"
            productType="Wohngebäudeversicherung"
            tariffs={wohngebaeudeTariffs}
            widgetSlug="/wohngebaeude-versicherung"
          />
        </div>

        <FAQAccordion items={gebaeudeFaqs} title="Häufige Fragen zur Wohngebäudeversicherung" />
      </div>
    </div>
  );
}