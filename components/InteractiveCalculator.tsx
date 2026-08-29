'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Star
} from 'lucide-react';

interface InteractiveCalculatorProps {
  title: string;
  categorySlug: string;
}

export default function InteractiveCalculator({ title, categorySlug }: InteractiveCalculatorProps) {
  const [coverageType, setCoverageType] = useState<'haftpflicht' | 'teilkasko' | 'vollkasko'>('vollkasko');
  const [annualKm, setAnnualKm] = useState(15000);
  const [sfClass, setSfClass] = useState(12);
  const [deductible, setDeductible] = useState(300);

  // Dynamic price model
  const baseRate = coverageType === 'haftpflicht' ? 24 : coverageType === 'teilkasko' ? 38 : 52;
  const kmMultiplier = annualKm / 15000;
  const sfDiscount = Math.max(0.35, 1 - (sfClass * 0.035));
  const deductibleDiscount = deductible === 150 ? 1 : deductible === 300 ? 0.88 : 0.78;

  const currentPrice = Math.round(baseRate * kmMultiplier * sfDiscount * deductibleDiscount * 10) / 10;
  const oldAverage = Math.round(currentPrice * 1.65);
  const calculatedSavings = Math.round((oldAverage - currentPrice) * 12);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            <Zap className="w-3.5 h-3.5" /> Interaktiver Tarif-Rechner 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">{title}</h2>
          <p className="text-slate-400 text-sm mt-1">Passen Sie Ihre Kriterien an und ermitteln Sie sofort den Bestpreis.</p>
        </div>

        {/* Live Savings Badge */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-4 rounded-2xl text-center shadow-lg border border-emerald-400/30">
          <span className="text-[11px] uppercase font-bold text-emerald-100 tracking-wider">Ihr Sparpotenzial</span>
          <div className="text-2xl sm:text-3xl font-black text-white">ca. {calculatedSavings} €</div>
          <span className="text-[10px] text-emerald-100">jährliche Ersparnis im Besttarif</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {/* Coverage Option */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Deckungsumfang
          </label>
          <div className="space-y-2">
            {[
              { id: 'haftpflicht', label: 'Haftpflicht' },
              { id: 'teilkasko', label: 'Teilkasko' },
              { id: 'vollkasko', label: 'Vollkasko (Empfohlen)' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCoverageType(opt.id as any)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  coverageType === opt.id 
                    ? 'bg-blue-600 text-white font-bold shadow-sm' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kilometers Slider */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fahrleistung</label>
              <span className="text-sm font-black text-blue-400">{annualKm.toLocaleString('de-DE')} km / Jahr</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Durchschnittliche jährliche Fahrstrecke</p>
          </div>
          <input
            type="range"
            min="5000"
            max="35000"
            step="2500"
            value={annualKm}
            onChange={(e) => setAnnualKm(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* SF-Klasse */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">SF-Klasse</label>
              <span className="text-sm font-black text-emerald-400">SF {sfClass} ({Math.round(sfDiscount * 100)}%)</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Schadenfreie Jahre</p>
          </div>
          <input
            type="range"
            min="0"
            max="35"
            step="1"
            value={sfClass}
            onChange={(e) => setSfClass(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Selbstbeteiligung */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Selbstbeteiligung (SB)
            </label>
            <p className="text-[11px] text-slate-400 mb-3">Kaskoschutz Selbstbehalt</p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[150, 300, 500].map((sb) => (
              <button
                key={sb}
                onClick={() => setDeductible(sb)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  deductible === sb 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sb} €
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculated Top Results */}
      <div className="mt-8 pt-8 border-t border-slate-800">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          Gefundene Testsieger-Tarife für Ihre Konfiguration:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Premium Schutz Plus", provider: "Allianz Direct", rating: "4.9", price: currentPrice, badge: "Testsieger" },
            { name: "Komfort Spar-Tarif", provider: "HUK24", rating: "4.8", price: Math.round((currentPrice * 1.05) * 10) / 10, badge: "Preis-Tipp" },
            { name: "Classic Smart", provider: "CosmosDirekt", rating: "4.7", price: Math.round((currentPrice * 1.12) * 10) / 10, badge: "Beliebt" },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-blue-400">{item.provider}</span>
                  <span className="text-[10px] font-extrabold bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h5 className="text-base font-bold text-white">{item.name}</h5>
                <div className="flex items-center text-xs text-amber-400 mt-1">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{item.rating} Bewertung</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Monatsbeitrag</span>
                  <div className="text-xl font-black text-emerald-400">{item.price.toFixed(2).replace('.', ',')} €</div>
                </div>
                <a
                  href="#vergleichstabelle"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Tarif wählen
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
