'use client';

import React from 'react';
import Link from 'next/link';
import {
  Car,
  HeartPulse,
  Briefcase,
  ShieldCheck,
  Home,
  Scale,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface HeroCategoryCard {
  title: string;
  tag: string;
  badge: string;
  subtitle: string;
  slug: string;
  image: string;
  icon: React.ReactNode;
  accentGradient: string;
  borderGlow: string;
}

export default function HeroSection() {
  const heroCards: HeroCategoryCard[] = [
    {
      title: "Kfz-Versicherung",
      tag: "Fahrzeug & Mobilität",
      badge: "Bis zu 850 € / Jahr sparen",
      subtitle: "Über 330 Tarife im Live-Test · Sofortige eVB-Nummer per SMS",
      slug: "/kfz-versicherung",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
      icon: <Car className="w-4 h-4 text-blue-300" />,
      accentGradient: "from-blue-600 to-cyan-500",
      borderGlow: "group-hover:border-blue-400/80 group-hover:shadow-blue-500/20",
    },
    {
      title: "Private Krankenversicherung",
      tag: "Gesundheit & Medizin",
      badge: "Chefarzt & Top-Schutz",
      subtitle: "Freie Arztwahl, Einbettzimmer & hohe Beitragsrückerstattung",
      slug: "/pkv",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      icon: <HeartPulse className="w-4 h-4 text-rose-300" />,
      accentGradient: "from-rose-600 to-pink-500",
      borderGlow: "group-hover:border-rose-400/80 group-hover:shadow-rose-500/20",
    },
    {
      title: "Berufsunfähigkeit",
      tag: "Vorsorge & Einkommen",
      badge: "Existenzschutz Nr. 1",
      subtitle: "Monatliches Einkommen verlässlich sichern – ohne Verweisung",
      slug: "/berufsunfaehigkeit",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      icon: <Briefcase className="w-4 h-4 text-indigo-300" />,
      accentGradient: "from-indigo-600 to-violet-500",
      borderGlow: "group-hover:border-indigo-400/80 group-hover:shadow-indigo-500/20",
    },
    {
      title: "Privathaftpflicht",
      tag: "Sach & Familie",
      badge: "Ab 3,50 € / Monat",
      subtitle: "Bis zu 50 Mio. € Deckungssumme für Sie, Partner & Kinder",
      slug: "/haftpflicht",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-300" />,
      accentGradient: "from-emerald-600 to-teal-500",
      borderGlow: "group-hover:border-emerald-400/80 group-hover:shadow-emerald-500/20",
    },
    {
      title: "Hausrat & Wohnen",
      tag: "Heim & Eigentum",
      badge: "Optimaler Schutz",
      subtitle: "Schutz bei Feuer, Leitungswasser, Sturm & Fahrraddiebstahl",
      slug: "/hausrat",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      icon: <Home className="w-4 h-4 text-amber-300" />,
      accentGradient: "from-amber-600 to-orange-500",
      borderGlow: "group-hover:border-amber-400/80 group-hover:shadow-amber-500/20",
    },
    {
      title: "Rechtsschutzversicherung",
      tag: "Recht & Sicherheit",
      badge: "Ohne Wartezeit wählbar",
      subtitle: "Volle Kostendeckung bei Rechtsstreit, Anwalts- & Gerichtskosten",
      slug: "/rechtsschutz-versicherung",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
      icon: <Scale className="w-4 h-4 text-purple-300" />,
      accentGradient: "from-purple-600 to-indigo-600",
      borderGlow: "group-hover:border-purple-400/80 group-hover:shadow-purple-500/20",
    },
  ];

  const quickLinks = [
    { label: "Motorrad", slug: "/motorrad-versicherung" },
    { label: "Krankenzusatz", slug: "/krankenzusatz" },
    { label: "Risikoleben", slug: "/risikoleben" },
    { label: "Kredit-Vergleich", slug: "/kredit-vergleich" },
    { label: "Girokonto", slug: "/girokonto-vergleich" },
    { label: "Baufinanzierung", slug: "/baufinanzierung" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-12 md:py-20">
      {/* Dynamic Background Lighting Effects */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header-Bereich */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-slate-400/40"></div>
            <span className="text-slate-400 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
              Unabhängiger Live-Vergleich für Deutschland
            </span>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-slate-400/40"></div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Tarife vergleichen.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Sofort sparen.
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Finden Sie in unter 3 Minuten den optimalen Schutz aus Hunderten geprüften Anbietern — 100 % transparent, kostenfrei und unverbindlich.
          </p>

          {/* Trust Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
              100 % Kostenlos & Unabhängig
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="inline-flex items-center font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
              Über 300 Tarife im Live-Test
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="inline-flex items-center font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
              256-Bit SSL Datenschutz
            </span>
          </div>
        </div>

        {/* Einheitliches Bild-Karten Grid (3x2 Desktop, 2x3 Tablet, 1x6 Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16">
          {heroCards.map((card) => (
            <Link
              key={card.slug}
              href={card.slug}
              className={`group relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-white/10 ${card.borderGlow} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between p-6 bg-slate-900`}
            >
              {/* Hintergrundbild mit sanftem Zoom-Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Dynamisches Mehrstufen-Gradient für maximale Lesbarkeit */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 group-hover:via-slate-950/70 transition-colors" />
              </div>

                {/* Karte Oben: Vorteil-Badge (Zentriert & Größer) */}
                <div className="relative z-10 flex justify-center w-full">
                  <span className="whitespace-nowrap inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-widest text-white shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 border border-white/20">
                    {card.badge}
                  </span>
                </div>

              {/* Karte Unten: Kategorie, Titel, Subtitle & CTA (Alles zentriert gestapelt) */}
              <div className="relative z-10 flex flex-col items-center mt-auto text-center pt-8">
                {/* Kategorie-Pille (Zentriert über Titel) */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-xs sm:text-sm font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  {card.icon}
                  <span className="whitespace-nowrap">{card.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed font-normal">
                  {card.subtitle}
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-3 w-full text-xs sm:text-sm font-bold text-cyan-300 group-hover:text-white transition-colors">
                  <span className="tracking-wide uppercase text-[11px] sm:text-xs">Jetzt Tarife berechnen</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-blue-600 flex items-center justify-center transition-all shadow-md">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Schnellwahl-Leiste für weitere beliebte Sparten (Next-Level Design) */}
        <div className="relative max-w-5xl mx-auto pt-10 border-t border-white/5">
          <p className="text-center text-[10px] sm:text-xs font-semibold text-slate-500 tracking-[0.2em] uppercase mb-8">
            Entdecken Sie weitere Vergleiche
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-6 text-sm">
            {quickLinks.map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                className="group relative text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 font-medium"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400" />
                {/* Underline Hover-Effekt */}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
