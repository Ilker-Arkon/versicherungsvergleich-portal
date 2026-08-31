'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES, CUSTOMER_PROFILE } from '@/lib/data';
import { PHONE_URL, WHATSAPP_URL } from '@/lib/site';

const CATEGORY_COLORS: Record<string, string> = {
  mobilitaet: 'bg-blue-500',
  'sach-wohnen': 'bg-emerald-500',
  gesundheit: 'bg-rose-500',
  vorsorge: 'bg-indigo-500',
  finanzen: 'bg-amber-500',
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms grace period so mouse movement feels natural
  };

  const toggleDropdown = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(prev => (prev === id ? null : id));
  };

  // Close dropdown on pathname change or outside click
  React.useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Trust Bar */}
      <div className="bg-slate-900 text-slate-400 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center divide-x divide-slate-700">
            <span className="flex items-center text-emerald-400 font-semibold pr-4">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 shrink-0" /> 100 % Kostenlos & Unverbindlich
            </span>
            <span className="flex items-center px-4 text-slate-300">
              ✦ Über 20 Jahre Erfahrung
            </span>
            <span className="flex items-center px-4">
              🔒 Sicher & Datenschutzkonform
            </span>
            <span className="flex items-center pl-4 text-amber-400 font-semibold">
              ⚡ In unter 3 Min. zum Bestpreis
            </span>
          </div>
          <a href={`tel:${CUSTOMER_PROFILE.phone.replace(/\s+/g, '')}`} className="flex items-center hover:text-white transition-colors shrink-0 ml-4">
            <PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            {CUSTOMER_PROFILE.phone}
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Tarif<span className="text-blue-600">Vergleich</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 h-full">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(cat.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleDropdown(cat.id)}
                  aria-haspopup="true"
                  className={`flex items-center px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeDropdown === cat.id 
                      ? 'bg-slate-100 text-blue-600 font-semibold' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === cat.id}
                >
                  <span>{cat.title.replace(/^[0-9]\.\s*/, '')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                    activeDropdown === cat.id ? 'transform rotate-180 text-blue-600' : 'text-slate-400'
                  }`} />
                </button>

                {/* Dropdown with invisible safe hover bridge */}
                {activeDropdown === cat.id && (
                  <div 
                    className={`absolute top-full pt-2 w-[460px] z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                      cat.id === 'finanzen' || cat.id === 'vorsorge' ? 'right-0' : 'left-0'
                    }`}
                    onMouseEnter={() => handleMouseEnter(cat.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Container without any scrollbars */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 overflow-hidden ring-1 ring-black/5">
                      <div className="px-3 py-2 mb-2 border-b border-slate-100/80 bg-slate-50/70 rounded-xl flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{cat.title.replace(/^[0-9]\.\s*/, '')}</p>
                        <span className="text-[11px] text-slate-400 font-medium">{cat.subcategories.length} Angebote</span>
                      </div>
                      <div className="space-y-1">
                        {cat.subcategories.map((sub) => {
                          const isActive = pathname === sub.slug;
                          return (
                            <Link
                              key={sub.slug + sub.title}
                              href={sub.slug}
                              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                                isActive 
                                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                              }`}
                            >
                              <div className="flex items-center space-x-3 min-w-0 pr-3">
                                <div className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_COLORS[cat.id] || 'bg-blue-500'}`} />
                                <span className="font-medium whitespace-nowrap text-slate-900">{sub.title}</span>
                              </div>
                              <div className="flex items-center space-x-2 shrink-0">
                                {sub.badge && (
                                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-md whitespace-nowrap">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Mobile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              href="/kfz-versicherung"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Jetzt vergleichen
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>

            <a
              href={PHONE_URL}
              aria-label="Anrufen"
              title="Anrufen"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden xl:inline">Anrufen</span>
            </a>

            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="border-b border-slate-100 pb-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  {cat.title.replace(/^[0-9]\.\s*/, '')}
                </p>
                <div className="space-y-0.5">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug + sub.title}
                      href={sub.slug}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[cat.id] || 'bg-blue-500'}`} />
                        <span>{sub.title}</span>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">{sub.savingsPotential}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/kfz-versicherung"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Jetzt kostenlos vergleichen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
