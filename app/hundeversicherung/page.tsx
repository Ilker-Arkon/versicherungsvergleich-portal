'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Dog } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Link from 'next/link';

const hundeFaqs = [
  {
    question: "Ist die Hundehalterhaftpflicht in Deutschland gesetzliche Pflicht?",
    answer: "In den meisten Bundesländern (z. B. Berlin, Hamburg, Niedersachsen, Schleswig-Holstein, Thüringen u. a.) ist die Hundehaftpflicht für jeden Hundehalter gesetzlich vorgeschrieben. In anderen Ländern gilt die Pflicht für bestimmte Rassen oder größere Hunde. Aufgrund der unbegrenzten Gefährdungshaftung nach § 833 BGB ist sie für jeden Hundehalter dringend anzuraten."
  },
  {
    question: "Sind Mietsachschäden und Fremdhüter mitversichert?",
    answer: "Ja, in guten Tarifen sind Schäden an gemieteten Wohnungen (z. B. zerkratzte Türen, Parkettböden) sowie Schäden, die entstehen, wenn Freunde oder Nachbarn den Hund ausführen, vollständig mitversichert."
  }
];

export default function HundeversicherungPage() {
  const widget = PARTNER_WIDGETS.tierhalter;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach & Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Hundehalterhaftpflicht <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Zuverlässiger Schutz bei Personen-, Sach- und Vermögensschäden durch Ihren Hund – ab nur ca. 3,50 € im Monat.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/hundeversicherung" className="px-3.5 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-xs">
              Hundehalterhaftpflicht
            </Link>
            <Link href="/hundekrankenversicherung" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 text-xs font-semibold rounded-lg transition-colors">
              Hundekranken- & OP-Schutz
            </Link>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Hundehaftpflicht-Tarifrechner"
            badgeText="Ohne Leinenzwang & inkl. Mietsachschäden"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={hundeFaqs} title="Häufige Fragen zur Hundehalterhaftpflicht" />
      </div>
    </div>
  );
}
