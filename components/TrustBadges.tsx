'use client';

import React from 'react';
import { ShieldCheck, Clock, Award, Users, Star } from 'lucide-react';
import { TRUST_STATS } from '@/lib/data';

export default function TrustBadges() {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Award className="w-6 h-6 text-blue-600" />;
      case 1: return <Clock className="w-6 h-6 text-emerald-600" />;
      case 2: return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      case 3: return <Users className="w-6 h-6 text-indigo-600" />;
      default: return <Star className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white border-y border-slate-200/80 py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="flex items-center space-x-4 p-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                {getIcon(i)}
              </div>
              <div>
                <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-blue-600">{stat.label}</p>
                <p className="text-[11px] text-slate-500">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
