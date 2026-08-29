'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  Home, 
  HeartPulse, 
  Landmark, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

const ACCENT_BARS: Record<string, string> = {
  mobilitaet: 'accent-bar-blue',
  'sach-wohnen': 'accent-bar-green',
  gesundheit: 'accent-bar-rose',
  vorsorge: 'accent-bar-indigo',
  finanzen: 'accent-bar-amber',
};

const ICON_COLORS: Record<string, string> = {
  mobilitaet: 'bg-blue-50 text-blue-600',
  'sach-wohnen': 'bg-emerald-50 text-emerald-600',
  gesundheit: 'bg-rose-50 text-rose-600',
  vorsorge: 'bg-indigo-50 text-indigo-600',
  finanzen: 'bg-amber-50 text-amber-600',
};

export default function CategoryShowcase() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
      case 'CarFront':
      case 'Bike': return <Car className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'HeartPulse':
      case 'Activity': return <HeartPulse className="w-5 h-5" />;
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'ShieldCheck':
      case 'ShieldAlert': return <ShieldCheck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Spartenübersicht
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Alle Vergleiche im Überblick
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Wählen Sie Ihren gewünschten Bereich und sichern Sie sich geprüfte Testsieger-Tarife mit garantierter Ersparnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`premium-card p-6 flex flex-col justify-between ${ACCENT_BARS[category.id] || 'accent-bar-blue'}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ICON_COLORS[category.id] || 'bg-blue-50 text-blue-600'}`}>
                    {getIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">
                      {category.title.replace(/^[0-9]\.\s*/, '')}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{category.description}</p>
                  </div>
                </div>

                {/* Subcategories List */}
                <div className="space-y-1.5 mt-5">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug + sub.title}
                      href={sub.slug}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                            {sub.title}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                        {sub.savingsPotential}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-blue-600">
                <Link
                  href={category.subcategories[0]?.slug || '/'}
                  className="flex items-center hover:text-blue-700 transition-colors w-full justify-between"
                >
                  <span>{category.subcategories.length} Tarife vergleichen</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
