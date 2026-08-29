'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import TrustBadges from '@/components/TrustBadges';
import CategoryShowcase from '@/components/CategoryShowcase';
import PromoCards from '@/components/PromoCards';
import GuidePreview from '@/components/GuidePreview';
import FAQAccordion from '@/components/FAQAccordion';
import { GENERAL_FAQS } from '@/lib/data';
import Link from 'next/link';

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
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Ihre Vorteile
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3">
              Warum Millionen Verbraucher auf uns vertrauen
            </h2>
            <p className="text-slate-400 text-base mt-3">
              Wir vergleichen über 1.200 Tarife in Echtzeit. Sparen Sie Zeit, Nerven und hunderte Euro pro Jahr.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-white mb-2">100% Kostenlos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Volle Transparenz ohne versteckte Gebühren. Unser Service ist und bleibt für Sie komplett gebührenfrei.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-white mb-2">In 3 Min. zum Besttarif</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unsere intelligenten Vergleichsrechner filtern in Sekundenschnelle die besten Angebote für Ihre Situation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Einfacher Wechselservice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kein lästiger Papierkram. Kündigung des Altvertrags und Neuabschluss laufen bequem volldigital.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Datenschutz Garantiert</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ihre Daten werden sicher mit 256-Bit-SSL verschlüsselt und ausschließlich nach strengstem deutschen DSGVO-Recht verarbeitet.
              </p>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-black">Bereit für Ihren Fixkosten-Check?</h3>
              <p className="text-blue-100 text-sm mt-1">Starten Sie jetzt unverbindlich und entdecken Sie Ihr persönliches Sparpotenzial.</p>
            </div>
            <Link
              href="/kfz-versicherung"
              className="px-8 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 shadow-md transition-all active:scale-95 shrink-0"
            >
              Jetzt unverbindlich vergleichen
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
