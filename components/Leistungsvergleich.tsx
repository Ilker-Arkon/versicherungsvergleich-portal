import React from 'react';
import { Check, Info } from 'lucide-react';
import type { LeistungsMerkmal } from '@/lib/leistungen';

interface LeistungsvergleichProps {
  title: string;
  subtitle?: string;
  merkmale: LeistungsMerkmal[];
}

export default function Leistungsvergleich({ title, subtitle, merkmale }: LeistungsvergleichProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Leistungsmerkmale im Überblick
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">{subtitle}</p>}
      </div>

      {/* Merkmale */}
      <div className="divide-y divide-slate-100">
        {merkmale.map((m, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-2 sm:gap-6 px-6 sm:px-8 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">{m.name}</p>
                {m.empfohlen !== undefined && (
                  <span
                    className={`inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                      m.empfohlen
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {m.empfohlen ? 'Empfohlen' : 'Situativ'}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Ehrlichkeits-Hinweis */}
      <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
        <p className="leading-relaxed">
          Bewusst ohne Preis- und Bewertungsangaben: Preise, Verfügbarkeit und Anbieter ändern sich tagesaktuell.
          Ihren individuellen Beitrag zeigt der Rechner oben in Echtzeit.
        </p>
      </div>
    </div>
  );
}
