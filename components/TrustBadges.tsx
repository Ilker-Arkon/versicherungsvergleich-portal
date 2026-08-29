'use client';

import React from 'react';

export default function TrustBadges() {
  const stats = [
    { value: "20+", label: "Jahre Erfahrung", sub: "Unabhängige Beratung" },
    { value: "3 Min.", label: "Zum Besttarif", sub: "Sofortige Berechnung" },
    { value: "100%", label: "Kostenfrei", sub: "Keine versteckten Gebühren" },
  ];

  return (
    <div className="section-white border-y border-slate-200/80 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-semibold text-blue-600 mt-1">{stat.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
