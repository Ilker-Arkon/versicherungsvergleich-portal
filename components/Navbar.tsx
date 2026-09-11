'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
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
      {/* Trust Bar (Stimmig & Harmonisch) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-2 px-4 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-6">
            <span className="flex items-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> 100 % Kostenlos & Unverbindlich
            </span>
            <span className="hidden lg:flex items-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Über 300 Tarife im Live-Test
            </span>
            <span className="flex items-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Über 20 Jahre Erfahrung
            </span>
            <span className="hidden xl:flex items-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Sicher & Datenschutzkonform
            </span>
            <span className="flex items-center font-medium text-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> In unter 3 Min. zum Bestpreis
            </span>
          </div>
          <a href={`tel:${CUSTOMER_PROFILE.phone.replace(/\s+/g, '')}`} className="flex items-center hover:text-white transition-colors shrink-0 ml-4 font-semibold text-blue-400">
            <PhoneCall className="w-3 h-3 mr-1.5" />
            {CUSTOMER_PROFILE.phone}
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
          
          {/* 1. Mobile Menu Button (Left on mobile, hidden on desktop) */}
          <div className="xl:hidden flex items-center justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 -ml-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* 2. Logo (Center on mobile, Left on desktop) */}
          <div className="shrink-0 flex justify-center items-center xl:justify-start mr-2 sm:mr-4 xl:mr-6">
            <Link href="/" className="group inline-block" aria-label="Zur Startseite">
              <BrandLogo variant="header" />
            </Link>
          </div>

          {/* 3. Desktop Navigation (Center on desktop, hidden on mobile/tablet) */}
          <nav className="hidden xl:flex flex-none items-center space-x-0.5 2xl:space-x-1 h-full">
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
                  className={`flex items-center px-2 2xl:px-3.5 py-2 text-[13px] 2xl:text-sm font-medium rounded-lg transition-colors ${
                    activeDropdown === cat.id 
                      ? 'bg-slate-100 text-blue-600 font-semibold' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === cat.id}
                >
                  <span>{cat.title.replace(/^[0-9]\.\s*/, '')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                    activeDropdown === cat.id ? 'transform rotate-180 text-blue-600' : 'text-slate-500'
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
                        <span className="text-[11px] text-slate-600 font-medium">{cat.subcategories.length} Angebote</span>
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

          {/* 4. Actions (Right) */}
          <div className="flex items-center justify-end space-x-1 sm:space-x-2">
            <Link
              href="/kfz-versicherung"
              className="hidden 2xl:inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Jetzt vergleichen
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>

            <a
              href={PHONE_URL}
              aria-label="Anrufen"
              title="Anrufen"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
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
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav aria-label="Mobiles Menü" className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="border-b border-slate-100 pb-3">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 px-1">
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
        </nav>
      )}
    </header>
  );
}
