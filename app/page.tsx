import React from 'react';
import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import TrustBadges from '@/components/TrustBadges';
import CategoryShowcase from '@/components/CategoryShowcase';
import PromoCards from '@/components/PromoCards';
import GuidePreview from '@/components/GuidePreview';
import FAQAccordion from '@/components/FAQAccordion';
import { GENERAL_FAQS } from '@/lib/data';
import Link from 'next/link';
import { ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Badges Strip */}
      <TrustBadges />

      {/* 3. Category Showcase Grid */}
      <CategoryShowcase />

      {/* 4. Action Highlights / Promo Banner */}
      <PromoCards />

      {/* 5. Why Choose Us Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Ihre Vorteile
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Warum Verbraucher auf unseren Vergleich setzen
            </h2>
            <p className="text-slate-400 text-base mt-3">
              Unabhängige Rechner filtern in Sekunden die passenden Tarife — transparent und ohne versteckte Kosten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg mb-5 border border-blue-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">100% Kostenlos & Unabhängig</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Volle Transparenz ohne versteckte Gebühren. Unser Service ist und bleibt für Sie komplett kostenfrei.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg mb-5 border border-emerald-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">In 3 Min. zum Besttarif</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Echtzeit-Berechnung aus Hunderten Tarifen — sofort online abschließen oder Unterlagen anfordern.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-5 border border-amber-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Einfacher Wechselservice</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Kein lästiger Papierkram. Kündigung des Altvertrags und Neuabschluss laufen bequem volldigital.
                </p>
              </div>
            </div>
          </div>

          {/* Integrated CTA Box */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold">Bereit für Ihren Fixkosten-Check?</h3>
              <p className="text-blue-100 text-sm mt-1">Starten Sie jetzt unverbindlich und entdecken Sie Ihr persönliches Sparpotenzial.</p>
            </div>
            <Link
              href="/kfz-versicherung"
              className="inline-flex items-center px-7 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-md transition-all active:scale-95 shrink-0"
            >
              <span>Jetzt unverbindlich vergleichen</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Guide Preview */}
      <GuidePreview />

      {/* 7. FAQ Section */}
      <FAQAccordion items={GENERAL_FAQS} />
    </div>
  );
}
