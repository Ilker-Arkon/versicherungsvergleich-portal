'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PROMO_HIGHLIGHTS } from '@/lib/data';

const ACCENT_BARS = [
  'accent-bar-amber',
  'accent-bar-rose',
  'accent-bar-indigo',
];

export default function PromoCards() {
  return (
    <section className="py-20 section-white relative overflow-hidden">
      {/* Dekorativer, transparenter Hintergrund */}
      <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1920&fm=webp" 
          alt="" 
          className="w-full h-full object-cover grayscale" 
          loading="lazy" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              Aktuelle Spar-Aktionen
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Exklusive Wechsel-Vorteile
            </h2>
          </div>
          <p className="text-slate-500 text-sm mt-2 md:mt-0 max-w-md">
            Nutzen Sie aktuelle Sonderkonditionen und Wechselservices direkt bei den Marktführern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_HIGHLIGHTS.map((promo, idx) => (
            <div
              key={promo.id}
              className={`premium-card p-7 flex flex-col justify-between ${ACCENT_BARS[idx % ACCENT_BARS.length]}`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {promo.tag}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                    {promo.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{promo.headline}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-1">{promo.title}</p>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">{promo.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href={promo.link}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 transition-all group shadow-2xs"
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
