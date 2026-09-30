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
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

const CATEGORY_THEMES: Record<string, {
  accentBorder: string;
  activeTab: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
}> = {
  mobilitaet: {
    accentBorder: 'border-t-blue-500',
    activeTab: 'bg-blue-600 text-white shadow-blue-500/25 border-blue-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/60',
  },
  'sach-wohnen': {
    accentBorder: 'border-t-emerald-500',
    activeTab: 'bg-emerald-600 text-white shadow-emerald-500/25 border-emerald-600',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  },
  gesundheit: {
    accentBorder: 'border-t-rose-500',
    activeTab: 'bg-rose-600 text-white shadow-rose-500/25 border-rose-600',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/60',
  },
  vorsorge: {
    accentBorder: 'border-t-indigo-500',
    activeTab: 'bg-indigo-600 text-white shadow-indigo-500/25 border-indigo-600',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  },
  finanzen: {
    accentBorder: 'border-t-amber-500',
    activeTab: 'bg-amber-600 text-white shadow-amber-500/25 border-amber-600',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/60',
  },
};

export default function CategoryShowcase() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(CATEGORIES[0]?.id || 'mobilitaet');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<boolean>(false);

  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0];
  const activeTheme = CATEGORY_THEMES[activeCategory.id] || CATEGORY_THEMES.mobilitaet;
  const currentIndex = CATEGORIES.findIndex(c => c.id === activeCategory.id);

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

  const getMainIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Car': return <Car className={className} />;
      case 'Home': return <Home className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const isTwoCols = activeCategory.subcategories.length === 2;

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Spartenübersicht
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Alle Vergleiche im Überblick
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Wählen Sie Ihre gewünschte Sparte und vergleichen Sie geprüfte Testsieger-Tarife mit direktem Sparpotenzial.
          </p>
        </div>

        {/* 1. MOBILE ONLY: ELEGANTER DROPDOWN MIT PFEIL */}
        <div className="md:hidden mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            <span>Sparte auswählen</span>
            <span className="text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 text-[11px] font-bold">
              {currentIndex + 1} von {CATEGORIES.length} Sparten
            </span>
          </div>

          {/* Der elegante Dropdown-Button mit Überschrift & Pfeil */}
          <button
            type="button"
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className={`w-full bg-white border-2 rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.99] transition-all cursor-pointer ${
              mobileDropdownOpen ? 'border-blue-600 ring-4 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
            }`}
            aria-expanded={mobileDropdownOpen}
            aria-label="Sparte auswählen und Leistungen öffnen"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${activeTheme.iconBg} ${activeTheme.iconColor} shrink-0`}>
                {getMainIcon(activeCategory.iconName, 'w-6 h-6')}
              </div>
              <div className="text-left min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Aktive Sparte (Tippen zum Wechseln)
                </span>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate mt-0.5">
                  {activeCategory.title.replace(/^[0-9]\.\s*/, '')}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                {activeCategory.subcategories.length} Tarife
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                mobileDropdownOpen 
                  ? 'bg-blue-600 text-white rotate-180 shadow-md' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                <ChevronDown className="w-5 h-5 transition-transform duration-300" />
              </div>
            </div>
          </button>

          {/* Aufgeklapptes Dropdown-Menü mit allen 5 Kategorien */}
          {mobileDropdownOpen && (
            <div className="mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Alle 5 Sparten ({CATEGORIES.reduce((acc, c) => acc + c.subcategories.length, 0)} Vergleiche)
                </span>
                <span className="text-[11px] text-blue-600 font-semibold">Tippen zum Öffnen</span>
              </div>

              {CATEGORIES.map((category) => {
                const isCurrent = category.id === activeCategoryId;
                const theme = CATEGORY_THEMES[category.id] || CATEGORY_THEMES.mobilitaet;
                const cleanTitle = category.title.replace(/^[0-9]\.\s*/, '');

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(category.id);
                      setMobileDropdownOpen(false);
                    }}
                    className={`w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isCurrent 
                        ? 'bg-blue-50/80 text-blue-900 font-bold' 
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg} ${theme.iconColor}`}>
                        {getMainIcon(category.iconName, 'w-5 h-5')}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {cleanTitle}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {category.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {category.subcategories.length} Tarife
                      </span>
                      {isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Schnelle Vor-/Zurück-Blättern Buttons auf Mobile */}
          <div className="flex items-center justify-between gap-2 mt-3 px-1">
            <button
              type="button"
              onClick={() => {
                const prevIndex = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
                setActiveCategoryId(CATEGORIES[prevIndex].id);
                setMobileDropdownOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <span>‹</span>
              <span className="truncate max-w-[130px]">{CATEGORIES[(currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length].title.replace(/^[0-9]\.\s*/, '')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const nextIndex = (currentIndex + 1) % CATEGORIES.length;
                setActiveCategoryId(CATEGORIES[nextIndex].id);
                setMobileDropdownOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <span className="truncate max-w-[130px]">{CATEGORIES[(currentIndex + 1) % CATEGORIES.length].title.replace(/^[0-9]\.\s*/, '')}</span>
              <span>›</span>
            </button>
          </div>
        </div>

        {/* 2. DESKTOP ONLY: HORIZONTALE SPARTEN-TABS */}
        <div className="hidden md:flex items-center justify-center gap-2.5 overflow-x-auto pb-4 pt-1 mb-10 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isActive = category.id === activeCategoryId;
            const theme = CATEGORY_THEMES[category.id] || CATEGORY_THEMES.mobilitaet;
            const cleanTitle = category.title.replace(/^[0-9]\.\s*/, '');

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 border cursor-pointer ${
                  isActive
                    ? `${theme.activeTab} shadow-lg font-bold scale-[1.02]`
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                }`}
                aria-pressed={isActive}
              >
                <span className={`p-1.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : `${theme.iconBg} ${theme.iconColor}`
                }`}>
                  {getMainIcon(category.iconName, 'w-4 h-4')}
                </span>
                <span>{cleanTitle}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-0.5 ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {category.subcategories.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. DESKTOP ACTIVE CATEGORY BANNER */}
        <div className="hidden md:flex bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${activeTheme.iconBg} ${activeTheme.iconColor} shrink-0 shadow-xs`}>
              {getMainIcon(activeCategory.iconName, 'w-6 h-6')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                  {activeCategory.title.replace(/^[0-9]\.\s*/, '')}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {activeCategory.subcategories.length} {activeCategory.subcategories.length === 1 ? 'Tarif' : 'Tarife'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {activeCategory.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-xl shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Kostenlos & unverbindlich vergleichen</span>
          </div>
        </div>

        {/* 4. DIE LEISTUNGEN: UNIFORM PRODUCT CARDS GRID */}
        <div className={`grid gap-6 ${
          isTwoCols 
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {activeCategory.subcategories.map((sub) => (
            <Link
              key={sub.slug + sub.title}
              href={sub.slug}
              className={`group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden`}
            >
              {/* Subtle Category Color Strip on Top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${activeCategory.color}`} />

              <div>
                {/* Header: Icon & Savings Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTheme.iconBg} ${activeTheme.iconColor} group-hover:scale-105 transition-transform shrink-0`}>
                    {getSubIcon(sub.iconName, 'w-6 h-6')}
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full shadow-2xs">
                      {sub.savingsPotential}
                    </span>
                    {sub.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {sub.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subcategory Title */}
                <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {sub.title}
                </h4>

                {/* Subcategory Description */}
                <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                  Tarife berechnen
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Jetzt vergleichen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 5. TRUST & ASSISTANCE STRIP BELOW GRID */}
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
