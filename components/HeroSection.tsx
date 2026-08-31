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
      subtitle: "Jedes Jahr Hunderte € sparen",
      slug: "/kfz-versicherung",
      icon: <Car className="w-5 h-5" />,
      accentClass: "accent-bar-blue",
      iconBg: "bg-blue-50 text-blue-600",
      cta: "Jetzt Beitrag berechnen & sparen",
      description: "Gleicher Schutz, weniger zahlen — über 330 Tarife im Live-Vergleich."
    },
    {
      title: "Private Krankenversicherung",
      subtitle: "Chefarzt & Einzelzimmer",
      slug: "/pkv",
      icon: <HeartPulse className="w-5 h-5" />,
      accentClass: "accent-bar-rose",
      iconBg: "bg-rose-50 text-rose-600",
      cta: "Unverbindliches Angebot anfordern",
      description: "Maßgeschneiderter Gesundheitsschutz — garantiert und nicht kürzbar."
    },
    {
      title: "Berufsunfähigkeit",
      subtitle: "Existenzschutz Nr. 1",
      slug: "/berufsunfaehigkeit",
      icon: <Briefcase className="w-5 h-5" />,
      accentClass: "accent-bar-indigo",
      iconBg: "bg-indigo-50 text-indigo-600",
      cta: "In 2 Minuten zum besten Tarif",
      description: "Dein Einkommen absichern — ohne abstrakte Verweisung."
    }
  ];

  const photoCards = [
    {
      title: "KFZ-Versicherung",
      slug: "/kfz-versicherung",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
      badge: "Bis zu 850 € sparen",
    },
    {
      title: "Haftpflicht",
      slug: "/haftpflicht",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
      badge: "Ab 3,50 € / Monat",
    },
    {
      title: "Hausrat & Wohnen",
      slug: "/hausrat",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      badge: "Testsieger 2026",
    },
    {
      title: "Berufsunfähigkeit",
      slug: "/berufsunfaehigkeit",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
      badge: "Existenzschutz Nr. 1",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0 md:pt-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Tarife vergleichen.{' '}
            <span className="text-blue-200">Sofort sparen.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-blue-100 leading-relaxed">
            Versicherungen & Finanzen — 100 % kostenlos, unverbindlich und in unter 3 Minuten zum besten Angebot.
          </p>

          {/* Social Proof Row */}
          <div className="mt-6 inline-flex items-center space-x-4 text-sm text-blue-100">
            <span className="flex items-center font-medium">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
              <strong className="text-white">4,9/5</strong>
            </span>
            <span className="text-blue-300">|</span>
            <span className="font-medium">150.000+ Nutzer</span>
            <span className="text-blue-300">|</span>
            <span className="flex items-center font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              TÜV-geprüft
            </span>
          </div>
        </div>

        {/* 3 Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-14">
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
                <span>{card.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Photo Tiles Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {photoCards.map((card) => (
            <Link
              key={card.slug}
              href={card.slug}
              className="relative h-52 overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              {/* Badge top-right */}
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {card.badge}
              </span>
              {/* Title + CTA bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-base leading-tight">{card.title}</h3>
                <span className="inline-flex items-center text-blue-200 text-xs font-semibold mt-1 group-hover:text-white transition-colors">
                  Jetzt vergleichen <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
