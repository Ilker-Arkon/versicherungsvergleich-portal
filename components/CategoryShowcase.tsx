'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  Bike,
  Home, 
  HeartPulse, 
  Landmark, 
  ShieldCheck, 
  Shield,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Scale,
  Dog,
  Briefcase,
  Building,
  Umbrella,
  Activity,
  Award,
  GraduationCap,
  Heart,
  TrendingUp,
  HeartHandshake,
  Coins,
  FileSpreadsheet,
  UserCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

const CATEGORY_THEMES: Record<string, {
  borderColor: string;
  activeBorder: string;
  iconBg: string;
  iconColor: string;
  arrowActive: string;
  badgeActive: string;
  topGradient: string;
}> = {
  mobilitaet: {
    borderColor: 'border-slate-200',
    activeBorder: 'border-blue-500 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    arrowActive: 'bg-blue-600 text-white shadow-sm',
    badgeActive: 'bg-blue-50 text-blue-700 border-blue-200',
    topGradient: 'from-blue-600 to-cyan-600',
  },
  'sach-wohnen': {
    borderColor: 'border-slate-200',
    activeBorder: 'border-emerald-500 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    arrowActive: 'bg-emerald-600 text-white shadow-sm',
    badgeActive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    topGradient: 'from-emerald-600 to-teal-600',
  },
  gesundheit: {
    borderColor: 'border-slate-200',
    activeBorder: 'border-rose-500 shadow-md shadow-rose-500/5 ring-1 ring-rose-500/20',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    arrowActive: 'bg-rose-600 text-white shadow-sm',
    badgeActive: 'bg-rose-50 text-rose-700 border-rose-200',
    topGradient: 'from-rose-600 to-pink-600',
  },
  vorsorge: {
    borderColor: 'border-slate-200',
    activeBorder: 'border-indigo-500 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    arrowActive: 'bg-indigo-600 text-white shadow-sm',
    badgeActive: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    topGradient: 'from-indigo-600 to-purple-600',
  },
  finanzen: {
    borderColor: 'border-slate-200',
    activeBorder: 'border-amber-500 shadow-md shadow-amber-500/5 ring-1 ring-amber-500/20',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    arrowActive: 'bg-amber-600 text-white shadow-sm',
    badgeActive: 'bg-amber-50 text-amber-700 border-amber-200',
    topGradient: 'from-amber-600 to-orange-600',
  },
};

export default function CategoryShowcase() {
  // Erste Kategorie ist standardmaessig geoeffnet
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(CATEGORIES[0]?.id || 'mobilitaet');

  const toggleCategory = (categoryId: string) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  const getSubIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Car':
      case 'CarFront': return <Car className={className} />;
      case 'Bike': return <Bike className={className} />;
      case 'Home': return <Home className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'Dog': return <Dog className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Umbrella': return <Umbrella className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Award': return <Award className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Coins': return <Coins className={className} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'Banknote': return <Banknote className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const getMainIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Car': return <Car className={className} />;
      case 'Home': return <Home className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <section className="py-20 section-alt relative overflow-hidden" id="vergleiche">
      {/* Dekorativer, transparenter Hintergrund */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&fm=webp" 
          alt="" 
          className="w-full h-full object-cover grayscale" 
          loading="lazy" 
        />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Spartenübersicht
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Alle Vergleiche im Überblick
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Wählen Sie Ihre gewünschte Sparte und öffnen Sie die geprüften Tarife mit direktem Sparpotenzial.
          </p>
        </div>

        {/* DIE 5 AUFKLAPPBAREN SPARTEN / LEISTUNGEN */}
        <div className="space-y-4">
          {CATEGORIES.map((category) => {
            const isOpen = openCategoryId === category.id;
            const theme = CATEGORY_THEMES[category.id] || CATEGORY_THEMES.mobilitaet;
            const cleanTitle = category.title.replace(/^[0-9]\.\s*/, '');
            const isTwoCols = category.subcategories.length === 2;

            return (
              <div
                key={category.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? theme.activeBorder
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow'
                }`}
              >
                {/* 1. Header Button mit Icon, Überschrift & elegantem Pfeil */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer group select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                    {/* Icon */}
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold shrink-0 transition-transform duration-200 ${theme.iconBg} ${theme.iconColor} ${isOpen ? 'scale-105' : 'group-hover:scale-105'}`}>
                      {getMainIcon(category.iconName, 'w-6 h-6')}
                    </div>

                    {/* Überschrift & Beschreibung */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors">
                          {cleanTitle}
                        </h3>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                          isOpen 
                            ? theme.badgeActive
                            : 'bg-slate-100 text-slate-600 border-slate-200/80'
                        }`}>
                          {category.subcategories.length} {category.subcategories.length === 1 ? 'Tarif' : 'Tarife'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1 sm:line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Eleganter Pfeil */}
                  <div className="shrink-0 pl-2">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? `${theme.arrowActive} rotate-180` 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                    }`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </div>
                </button>

                {/* 2. Aufgeklappter Inhalt: Die Leistungen */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-slate-100 bg-slate-50/50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className={`grid gap-4 sm:gap-5 mt-3 ${
                      isTwoCols 
                        ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' 
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug + sub.title}
                          href={sub.slug}
                          className="group/card bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden"
                        >
                          {/* Subtiler Farbakzent oben */}
                          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />

                          <div>
                            {/* Card Header: Icon & Badge */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.iconBg} ${theme.iconColor} group-hover/card:scale-105 transition-transform shrink-0`}>
                                {getSubIcon(sub.iconName, 'w-5 h-5')}
                              </div>
                              
                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="inline-flex items-center text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-2xs">
                                  {sub.savingsPotential}
                                </span>
                                {sub.badge && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card Title */}
                            <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover/card:text-blue-600 transition-colors leading-snug">
                              {sub.title}
                            </h4>

                            {/* Card Description */}
                            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>

                          {/* Card Footer Action */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-medium text-slate-400 group-hover/card:text-slate-600 transition-colors">
                              Online vergleichen
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover/card:text-blue-700 transition-colors">
                              <span>Jetzt vergleichen</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust & Assistance Strip below Grid */}
        <div className="mt-14 pt-8 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Über 300 Tarife im Live-Vergleich</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Garantiert 100% kostenfrei & ohne Vermittlungsgebühr</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Persönlicher Wechselservice & Beratung</span>
          </div>
        </div>
      </div>
    </section>
  );
}
