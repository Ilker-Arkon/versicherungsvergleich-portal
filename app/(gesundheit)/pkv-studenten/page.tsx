import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, GraduationCap } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/pkv-studenten");


const studentenFaqs = [
  {
    question: "Wann lohnt sich die private Krankenversicherung für Studenten?",
    answer: "Besonders für Kinder von Beamten (mit Beihilfeanspruch bis zum 25. Lebensjahr), für Studenten ab dem 30. Lebensjahr (wenn die günstige studentische GKV endet) oder für alle, die von Beginn an erstklassige medizinische Versorgung wünschen."
  }
];

export default function PkvStudentenPage() {
  const widget = PARTNER_WIDGETS.pkv_studenten;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Gesundheit & Kranken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            PKV für Studenten <span className="text-rose-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Günstige Spezialtarife für Studierende mit vollem Leistungsanspruch, freier Arztwahl und weltweitem Auslandsschutz.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Beiträge ab ca. 85 € / Monat</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Ideal auch für Beamtenkinder mit Beihilfe</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Weltweiter Schutz bei Auslandssemestern</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Studenten-PKV-Tarifrechner"
            badgeText="Günstige Studententarife"
            minHeight="700px"
          />
        </div>

        <FAQAccordion items={studentenFaqs} title="Häufige Fragen zur Studenten-PKV" />
      </div>
    </div>
  );
}
