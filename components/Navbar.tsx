'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles,
  Car,
  Home,
  HeartPulse,
  Landmark,
  Plane,
  Zap
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-5 h-5 text-blue-500" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-500" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-500" />;
      case 'Plane': return <Plane className="w-5 h-5 text-indigo-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-500" />;
      default: return <ShieldCheck className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Trust Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 100% Kostenloser & Unabhängiger Marktvergleich
            </span>
            <span>⭐ 4.9/5 von über 150.000 Kunden bewertet</span>
            <span className="text-slate-400">TÜV-geprüfte Sicherheit</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:08001234567" className="flex items-center hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Kostenlose Beratung: 0800 123 4567
            </a>
            <Link href="/ratgeber" className="hover:text-white transition-colors">
              Ratgeber & Spartipps
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
                Tarif<span className="text-blue-600">Vergleich</span>
                <span className="ml-1 text-xs uppercase px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">Direkt</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">DAS VERBRAUCHERPORTAL</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="flex items-center px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span>{cat.title.replace(/^[0-9]\.\s*/, '')}</span>
                  <ChevronDown className="w-4 h-4 ml-1 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === cat.id && (
                  <div className="absolute left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{cat.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{cat.description}</p>
                    </div>
                    <div className="space-y-1">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={sub.slug}
                          className="flex items-start p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                        >
                          <div className="mt-0.5 mr-3 p-2 bg-slate-100 rounded-lg group-hover:bg-white text-blue-600 transition-colors shadow-xs">
                            {getCategoryIcon(cat.iconName)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {sub.title}
                              </span>
                              {sub.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{sub.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/kfz-versicherung"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-600/25 hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Jetzt Tarife vergleichen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="border-b border-slate-100 pb-3">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  {cat.title}
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={sub.slug}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-slate-800 hover:bg-slate-50 font-medium"
                    >
                      <span>{sub.title}</span>
                      <span className="text-xs text-emerald-600 font-semibold">{sub.savingsPotential}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link
                href="/kfz-versicherung"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md"
              >
                Jetzt kostenlos vergleichen
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
