import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/kfz-versicherung");


const kfzFaqs = [
  {
    question: "Bis wann kann ich meine Kfz-Versicherung regulär wechseln?",
    answer: "Der Stichtag für den regulären Wechsel der Kfz-Versicherung ist üblicherweise der 30. November. Wenn du deine Kündigung bis zu diesem Datum einreichst, gilt der neue Vertrag ab dem 1. Januar des Folgejahres."
  },
  {
    question: "Habe ich ein Sonderkündigungsrecht bei einer Beitragserhöhung?",
    answer: "Ja! Wenn deine bisherige Versicherung die Beiträge erhöht, ohne dass sich deine Leistungen verbessern, hast du ein vierwöchiges Sonderkündigungsrecht ab Erhalt der Beitragsrechnung."
  },
  {
    question: "Welche Unterlagen brauche ich für den Kfz-Tarifvergleich?",
    answer: "Für einen genauen Vergleich benötigst du lediglich deinen aktuellen Fahrzeugschein (Zulassungsbescheinigung Teil I) sowie deine letzte Beitragsrechnung für die aktuelle Schadenfreiheitsklasse (SF-Klasse)."
  }
];

export default function KfzPage() {
  const widget = PARTNER_WIDGETS.kfz;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Fahrzeug & Mobilität
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Gleicher Schutz, weniger zahlen: <span className="text-gradient">Jetzt Kfz-Tarife vergleichen</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Über 330 Kfz-Tarife im transparenten Echtzeit-Vergleich. Sichern Sie sich starken Vollkasko-, Teilkasko- oder Haftpflichtschutz — und sparen Sie jedes Jahr Hunderte Euro.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> TÜV-geprüfte Tarifberechnung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Sofortige eVB-Nummer per SMS</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> In 3 Minuten zum Bestpreis</span>
          </div>
        </div>

        {/* Live Partner Comparison Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Kfz-Versicherungs-Vergleichsrechner"
            badgeText="Über 330 Tarife im Live-Test"
            minHeight="700px"
          />
        </div>

        {/* Advice box */}
        <div className="premium-card p-8 mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />
            Worauf Sie beim Kfz-Versicherungsvergleich 2026 achten sollten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Deckungssumme 100 Mio. €</p>
              <p className="text-xs text-slate-500">Wählen Sie stets die pauschale Höchstdeckung von 100 Mio. € für Personen-, Sach- und Vermögensschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Erweiterte Elementarschäden</p>
              <p className="text-xs text-slate-500">Achten Sie auf Absicherung bei Lawinen, Muren, Erdrutsch sowie Tierbisse aller Art inkl. Folgeschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Mallorca-Police</p>
              <p className="text-xs text-slate-500">Erhöht die oft zu niedrigen Mindestdeckungssummen bei Mietwagen im europäischen Ausland auf deutsches Niveau.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={kfzFaqs} title="Häufige Fragen zur Kfz-Versicherung" />
      </div>
    </div>
  );
}