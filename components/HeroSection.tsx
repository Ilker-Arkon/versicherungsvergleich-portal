'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  HeartPulse, 
  Home, 
  Landmark, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export default function HeroSection() {
  const topCards = [
    {
      title: "Kfz-Versicherung",
      subtitle: "Bis zu 850 € / Jahr sparen",
      slug: "/kfz-versicherung",
      icon: <Car className="w-6 h-6 text-blue-600" />,
      badge: "Saison-Aktion",
      badgeColor: "bg-blue-100 text-blue-800",
      description: "Auto-Wechsel mit Bestpreis-Garantie & SF-Klassenübernahme."
    },
    {
      title: "Private Krankenversicherung",
      subtitle: "Ø 2.400 € Beitragsersparnis",
      slug: "/pkv",
      icon: <HeartPulse className="w-6 h-6 text-rose-600" />,
      badge: "Top-Leistung",
      badgeColor: "bg-rose-100 text-rose-800",
      description: "Erstklassiger Schutz für Selbstständige, Beamte & Angestellte."
    },
    {
      title: "Wohngebäudeversicherung",
      subtitle: "Optimaler Unwetterschutz",
      slug: "/wohngebaeude-versicherung",
      icon: <Home className="w-6 h-6 text-emerald-600" />,
      badge: "Inkl. Elementar",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Schutz bei Starkregen, Überschwemmung, Sturm & Feuer."
    },
    {
      title: "Girokonto-Vergleich",
      subtitle: "Bis zu 200 € Neukundenprämie",
      slug: "/girokonto-vergleich",
      icon: <Landmark className="w-6 h-6 text-amber-600" />,
      badge: "0 € Gebühren",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "Kostenlose Kontoführung + automatischer Wechselservice."
    }
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>100% Unabhängiger & Kostenloser Tarifvergleich</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Jetzt Tarife vergleichen und monatlich <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Geld sparen</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Finden Sie in unter 3 Minuten die besten Angebote für Versicherungen, Finanzen und Haushaltstarife. Transparent, kostenlos und mit sofortiger Spar-Garantie.
          </p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-600">
            <span className="flex items-center text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" /> Über 20 Jahre Erfahrung
            </span>
            <span className="flex items-center text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" /> In 3 Minuten zum Besttarif
            </span>
            <span className="flex items-center text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" /> 100% Kostenfrei & Unverbindlich
            </span>
          </div>
        </div>

        {/* 4 Direct Entry Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {topCards.map((card) => (
            <Link
              key={card.slug}
              href={card.slug}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-blue-300 transition-all card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    {card.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm font-semibold text-emerald-600 mt-1">{card.subtitle}</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Tarife vergleichen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
