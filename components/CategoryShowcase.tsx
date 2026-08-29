'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  Home, 
  HeartPulse, 
  Landmark, 
  Plane, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export default function CategoryShowcase() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Landmark': return <Landmark className="w-6 h-6" />;
      case 'Plane': return <Plane className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Alle Vergleichsbereiche im Überblick
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Wählen Sie Ihren gewünschten Bereich und sichern Sie sich geprüfte Testsieger-Tarife mit bis zu 65 % Ersparnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-sm`}>
                    {getIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{category.title}</h3>
                    <p className="text-xs text-slate-500">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Subcategories List */}
              <div className="p-6 bg-white space-y-3 flex-1">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={sub.slug}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {sub.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sub.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {sub.savingsPotential}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-blue-600">
                <span>{category.subcategories.length} Tarife vergleichen</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
