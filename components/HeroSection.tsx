'use client';

import React from 'react';
import Link from 'next/link';
import {
  Car,
  HeartPulse,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Star,
} from 'lucide-react';

export default function HeroSection() {
  const topCards = [
    {
      title: "Kfz-Versicherung",
      subtitle: "Bis zu 850 € sparen",
      slug: "/kfz-versicherung",
      icon: <Car className="w-5 h-5" />,
      accentClass: "accent-bar-blue",
      iconBg: "bg-blue-50 text-blue-600",
      description: "Über 330 Tarife im Live-Vergleich mit Bestpreis-Garantie."
    },
    {
      title: "Private Krankenversicherung",
      subtitle: "Ø 2.400 € Ersparnis",
      slug: "/pkv",
      icon: <HeartPulse className="w-5 h-5" />,
      accentClass: "accent-bar-rose",
      iconBg: "bg-rose-50 text-rose-600",
      description: "Chefarzt, 1-Bett-Zimmer & Top-Zahnersatz zum Besttarif."
    },
    {
      title: "Berufsunfähigkeit",
      subtitle: "Existenzschutz Nr. 1",
      slug: "/berufsunfaehigkeit",
      icon: <Briefcase className="w-5 h-5" />,
      accentClass: "accent-bar-indigo",
      iconBg: "bg-indigo-50 text-indigo-600",
      description: "Ihr Einkommen absichern — ohne abstrakte Verweisung."
    }
  ];

  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Tarife vergleichen.{' '}
            <span className="text-gradient">Sofort sparen.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
            Versicherungen & Finanzen — kostenlos, unverbindlich und in unter 3 Minuten zum besten Angebot.
          </p>

          {/* Social Proof Row */}
          <div className="mt-6 inline-flex items-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center font-medium">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
              <strong className="text-slate-700">4,9/5</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-medium">150.000+ Nutzer</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              TÜV-geprüft
            </span>
          </div>
        </div>

        {/* 3 Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {topCards.map((card) => (
            <Link
              key={card.slug}
              href={card.slug}
              className={`premium-card p-6 flex flex-col justify-between group ${card.accentClass}`}
            >
              <div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm font-semibold text-emerald-600 mt-1">{card.subtitle}</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Tarife berechnen</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
