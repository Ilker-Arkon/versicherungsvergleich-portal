import type { Metadata } from "next";
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import { GUIDE_ARTICLES } from '@/lib/data';
import { ShieldCheck, ArrowRight, BookOpen, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Ratgeber & Spartipps",
  description: "Experten-Ratgeber, Spartipps und Wechselfristen für Versicherungen und Finanzen.",
  alternates: { canonical: "/ratgeber" },
};

const ratgeberFaqs = [
  {
    question: "Wann lohnt sich ein regelmäßiger Versicherungsvergleich?",
    answer: "Mindestens einmal pro Jahr! Viele Versicherer (insbesondere bei Kfz, Haftpflicht und Rechtsschutz) überarbeiten ihre Tarife jährlich. Neuere Tarife bieten häufig bessere Leistungen bei oft deutlich günstigeren Beiträgen."
  },
  {
    question: "Was ist bei Sonderkündigungsrechten zu beachten?",
    answer: "Erhöht Ihr Versicherer die Beiträge oder ändert die Vertragsbedingungen, haben Sie ab Erhalt der Mitteilung genau einen Monat Zeit, um von Ihrem Sonderkündigungsrecht Gebrauch zu machen und zu einem günstigeren Anbieter zu wechseln."
  },
  {
    question: "Wie hilft der Kündigungsservice beim Anbieterwechsel?",
    answer: "In vielen Sparten (wie Kfz, Girokonto oder Privathaftpflicht) übernimmt der neue Anbieter die Kündigung bei der alten Gesellschaft für Sie automatisch, sodass Sie keinen lästigen Papierkram erledigen müssen."
  }
];

export default function RatgeberPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Verbraucher-Wissen & Ratgeber
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Experten-Ratgeber, Spartipps & <span className="text-blue-600">Wechselfristen</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Fundiertes Fachwissen, verständlich erklärt. Erfahren Sie, wie Sie mit einfachen Schritten Ihre Fixkosten dauerhaft um hunderte Euro senken können.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {GUIDE_ARTICLES.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                  <Link href={article.slug}>{article.title}</Link>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{article.date}</span>
                <Link
                  href={article.slug}
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Zum Ratgeber & Tarifvergleich
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">
              Kostenlose Tarifberatung
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Haben Sie Fragen zu einem Tarif?
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Unsere Experten stehen Ihnen unverbindlich zur Seite und helfen Ihnen bei der Auswahl des optimalen Versicherungsschutzes.
            </p>
          </div>
          <Link
            href="/kfz-versicherung"
            className="px-8 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 shadow-md transition-all active:scale-95 shrink-0"
          >
            Jetzt Tarife vergleichen
          </Link>
        </div>

        <FAQAccordion items={ratgeberFaqs} title="Häufige Fragen zu Wechselfristen & Ersparnis" />
      </div>
    </div>
  );
}