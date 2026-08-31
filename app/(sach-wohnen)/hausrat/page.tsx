import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Link from 'next/link';
import type { Metadata } from "next";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/hausrat");


const faqs = [
  {
    question: 'Was deckt eine Hausratversicherung ab?',
    answer: 'Die Hausratversicherung ersetzt den Neuwert aller Einrichtungs-, Gebrauchs- und Verbrauchsgegenstände Ihrer Wohnung bei Schäden durch Feuer, Leitungswasser, Sturm/Hagel, Einbruchdiebstahl und Vandalismus.'
  },
  {
    question: 'Was ist der Unterversicherungsverzicht?',
    answer: 'Wenn Sie pro Quadratmeter Wohnfläche mindestens den empfohlenen Richtwert (meist 650 Euro/m2) versichern, verzichtet der Versicherer im Schadenfall auf die Prüfung einer Unterversicherung und zahlt den Schaden voll aus.'
  },
  {
    question: 'Ist Fahrraddiebstahl mitversichert?',
    answer: 'Fahrrad- und E-Bike-Diebstahl ist in vielen Premium-Tarifen rund um die Uhr mitversichert (24h-Klausel). Achten Sie beim Vergleich darauf, dass auch E-Bikes bis zum Originalwert abgedeckt sind.'
  }
];

export default function HausratPage() {
  const widget = PARTNER_WIDGETS.hausrat;
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sach &amp; Eigentum
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Hausratversicherung <span className="text-emerald-600">Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie Möbel, Elektronik und Wertsachen vor Einbruch, Feuer und Wasserschäden — zum Bestpreis.
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Neuwertentschädigung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Fahrraddiebstahl 24h</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Elementarschutz zubuchbar</span>
          </div>
          <div className="mt-4">
            <Link href="/haftpflicht" className="text-xs font-semibold text-slate-500 hover:text-emerald-600 underline underline-offset-2 transition-colors">
              Auch Privathaftpflicht vergleichen
            </Link>
          </div>
        </div>

        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller Hausrat-Tarifrechner"
            badgeText="Neuwertentschädigung 100%"
            minHeight="680px"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
            Wichtige Kriterien beim Hausrat-Vergleich
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Neuwertentschädigung</p>
              <p className="text-xs text-slate-500">Der Versicherer ersetzt den vollen Wiederbeschaffungswert — ohne Abzug für Alter oder Abnutzung.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Grobe Fahrlässigkeit</p>
              <p className="text-xs text-slate-500">Im Schadenfall zahlt der Versicherer auch dann, wenn Sie den Schaden grob fahrlässig verursacht haben (z.B. vergessene Kerze).</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Elementarschadenschutz</p>
              <p className="text-xs text-slate-500">Ergänzen Sie den Standard-Hausratschutz um Elementargefahren wie Überschwemmung und Starkregen.</p>
            </div>
          </div>
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zur Hausratversicherung" />
      </div>
    </div>
  );
}
