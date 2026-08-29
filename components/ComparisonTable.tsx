'use client';

import React, { useState } from 'react';
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export interface TariffRow {
  id: string;
  provider: string;
  logoText: string;
  tariffName: string;
  priceMonthly: number;
  priceYearly?: number;
  rating: number;
  reviewCount: number;
  benefits: string[];
  bonus?: string;
  isTestsieger?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

interface ComparisonTableProps {
  title: string;
  subtitle: string;
  productType: string;
  tariffs: TariffRow[];
  widgetSlug?: string;
}

export default function ComparisonTable({ title, subtitle, productType, tariffs, widgetSlug }: ComparisonTableProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'testsieger' | 'cheapest'>('all');
  const [selectedTariff, setSelectedTariff] = useState<TariffRow | null>(null);

  const filteredTariffs = tariffs.filter((t) => {
    if (selectedFilter === 'testsieger') return t.isTestsieger;
    return true;
  }).sort((a, b) => {
    if (selectedFilter === 'cheapest') return a.priceMonthly - b.priceMonthly;
    return 0;
  });

  return (
    <div id="vergleichstabelle" className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Aktueller Marktvergleich 2026
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{title}</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Alle Tarife ({tariffs.length})
          </button>
          <button
            onClick={() => setSelectedFilter('testsieger')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'testsieger' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏆 Testsieger
          </button>
          <button
            onClick={() => setSelectedFilter('cheapest')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'cheapest' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Günstigste zuerst
          </button>
        </div>
      </div>

      {/* Table Rows */}
      <div className="mt-6 space-y-4">
        {filteredTariffs.map((t) => (
          <div
            key={t.id}
            className={`relative rounded-2xl border transition-all p-5 sm:p-6 ${
              t.isTestsieger 
                ? 'border-blue-300 bg-gradient-to-r from-blue-50/40 via-white to-white shadow-sm' 
                : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
            }`}
          >
            {t.isTestsieger && (
              <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center">
                <Sparkles className="w-3 h-3 mr-1" /> Stiftung Warentest & Focus Money Testsieger
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Provider Logo & Rating */}
              <div className="lg:col-span-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-xs">
                    {t.logoText}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{t.provider}</h4>
                    <p className="text-xs text-slate-500 font-medium">{t.tariffName}</p>
                    <div className="flex items-center mt-1 text-xs text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current mr-1" />
                      <span className="font-bold text-slate-800">{t.rating.toFixed(1)}</span>
                      <span className="text-slate-400 ml-1">({t.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="lg:col-span-5">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {t.benefits.map((b, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {t.bonus && (
                  <div className="mt-2 inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                    🎁 {t.bonus}
                  </div>
                )}
              </div>

              {/* Pricing & CTA */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t sm:border-t-0 pt-4 sm:pt-0">
                <div className="text-left sm:text-right lg:text-right">
                  <span className="text-xs text-slate-400 uppercase font-medium">Monatlich ab</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {t.priceMonthly.toFixed(2).replace('.', ',')} €
                  </div>
                  {t.priceYearly && (
                    <span className="text-[11px] text-slate-500">({t.priceYearly.toFixed(2).replace('.', ',')} € pro Jahr)</span>
                  )}
                </div>

                <Link
                  href={t.ctaLink || widgetSlug || '#vergleichstabelle'}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center space-x-2"
                >
                  <span>{t.ctaText || 'Jetzt kostenlos vergleichen'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-[11px] text-slate-400 text-center">
        * Beispielpreise zur Orientierung. Ihr tatsächlicher Beitrag wird im Vergleichsrechner individuell berechnet.
      </p>
    </div>
  );
}
