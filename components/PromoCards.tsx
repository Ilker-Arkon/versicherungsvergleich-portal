'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROMO_HIGHLIGHTS } from '@/lib/data';

export default function PromoCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Aktuelle Spar-Aktionen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Exklusive Wechsel-Prämien & Spar-Deals
            </h2>
          </div>
          <p className="text-slate-500 text-sm mt-2 md:mt-0 max-w-md">
            Profitieren Sie von zeitlich befristeten Sonderkonditionen direkt bei den Marktführern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_HIGHLIGHTS.map((promo) => (
            <div
              key={promo.id}
              className={`rounded-2xl p-7 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${promo.color}`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md shadow-xs">
                    {promo.tag}
                  </span>
                  <span className="text-xs font-extrabold text-amber-900 bg-amber-200/70 px-2.5 py-1 rounded-full">
                    {promo.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{promo.headline}</h3>
                <p className="text-xs font-semibold text-slate-700 mt-1">{promo.title}</p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{promo.description}</p>
              </div>

              <div className="mt-8">
                <Link
                  href={promo.link}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-900 hover:text-white shadow-sm border border-slate-200 hover:border-slate-900 transition-all group"
                >
                  <span>{promo.buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
