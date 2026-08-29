'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';

const beamteFaqs = [
  {
    question: "Wie funktioniert die Beihilfe für Beamte und Referendare?",
    answer: "Der Dienstherr (Bund oder Bundesland) erstattet über die Beihilfe zwischen 50 % und 80 % aller anfallenden Krankheitskosten für Sie und Ihre berücksichtigungsfähigen Angehörigen. Über eine private Krankenversicherung für Beamte sichern Sie lediglich den verbleibenden Restanteil (20–50 %) zu extrem günstigen Beiträgen ab."
  },
  {
    question: "Gibt es spezielle Tarife für Lehramts- und Rechtsreferendare?",
    answer: "Ja! Für die Zeit des Vorbereitungsdienstes (Referendariat) bieten die privaten Krankenversicherer hochattraktive Anwärtertarife mit vollem Leistungsumfang ab ca. 60–90 € im Monat an."
  }
];

export default function PkvBeamtePage() {
  const widget = PARTNER_WIDGETS.pkv_beamte;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Gesundheit & Kranken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            PKV für Beamte & Referendare <span className="text-rose-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maßgeschneiderte Beihilfe-Restkostentarife mit bis zu 80% Kostenerstattung und Spitzenmedizin zum Beihilfetarif.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Spezielle Tarife für Bundes- & Landesbeamte</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Günstige Anwärterkonditionen für Referendare</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Optionale Beihilfe-Ergänzungstarife</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Beamten-PKV-Tarifrechner"
            badgeText="Beihilfe-optimierter Schutz"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={beamteFaqs} title="Häufige Fragen zur PKV für Beamte" />
      </div>
    </div>
  );
}
