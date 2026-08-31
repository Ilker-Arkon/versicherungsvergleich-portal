'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  MapPin
} from 'lucide-react';
import { CATEGORIES, CUSTOMER_PROFILE } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Trust & Guarantees Strip */}
      <div className="border-b border-slate-800/80 py-10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">100% Kostenlos & Unabhängig</h4>
                <p className="text-xs text-slate-400 mt-1">Keine versteckten Gebühren, neutraler und transparenter Marktüberblick.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">256-Bit SSL Datenschutz</h4>
                <p className="text-xs text-slate-400 mt-1">DSGVO-konforme Übertragung nach höchsten deutschen Sicherheitsstandards.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-3 bg-amber-600/10 text-amber-400 rounded-xl border border-amber-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Bestpreis- & Spar-Garantie</h4>
                <p className="text-xs text-slate-400 mt-1">Geprüfte Tarife & Originalkonditionen direkt vom Anbieter.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-3 bg-rose-600/10 text-rose-400 rounded-xl border border-rose-500/20">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Kostenfreie Experten-Hotline</h4>
                <p className="text-xs text-slate-400 mt-1">Persönliche Beratung unter {CUSTOMER_PROFILE.phone}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Tarif<span className="text-blue-500">Vergleich</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Ihr unabhängiges Vergleichsportal für Versicherungen & Finanzen. Inhaber: {CUSTOMER_PROFILE.name}, {CUSTOMER_PROFILE.city}.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center">
                <PhoneCall className="w-3.5 h-3.5 mr-2 text-blue-400" />
                <a href={`tel:${CUSTOMER_PROFILE.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  Telefon: {CUSTOMER_PROFILE.phone}
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2 text-blue-400" />
                <a href={`mailto:${CUSTOMER_PROFILE.email}`} className="hover:text-white transition-colors">
                  {CUSTOMER_PROFILE.email}
                </a>
              </p>
              <p className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-2 text-blue-400" />
                {CUSTOMER_PROFILE.street}, {CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}
              </p>
            </div>
          </div>

          {/* Dynamic Categories */}
          {CATEGORIES.slice(0, 4).map((cat) => (
            <div key={cat.id}>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
                {cat.title.replace(/^[0-9]\.\s*/, '')}
              </h5>
              <ul className="space-y-2 text-sm">
                {cat.subcategories.slice(0, 6).map((sub) => (
                  <li key={sub.slug + sub.title}>
                    <Link href={sub.slug} className="text-slate-400 hover:text-white transition-colors flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform">{sub.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Category 5, Ratgeber & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mt-10 pt-8 border-t border-slate-800/80">
          <div className="lg:col-span-2">
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              {CATEGORIES[4]?.title.replace(/^[0-9]\.\s*/, '') || "Finanzen & Banken"}
            </h5>
            <ul className="space-y-2 text-sm">
              {CATEGORIES[4]?.subcategories.map((sub) => (
                <li key={sub.slug + sub.title}>
                  <Link href={sub.slug} className="text-slate-400 hover:text-white transition-colors">
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Ratgeber & Spartipps
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kfz-versicherung" className="text-slate-400 hover:text-white">Kfz-Versicherungs-Wechsel Fristen</Link></li>
              <li><Link href="/pkv" className="text-slate-400 hover:text-white">PKV Beitragsoptimierung</Link></li>
              <li><Link href="/berufsunfaehigkeit" className="text-slate-400 hover:text-white">Berufsunfähigkeit Schutzratgeber</Link></li>
              <li><Link href="/girokonto-vergleich" className="text-slate-400 hover:text-white">Kostenloses Girokonto mit Prämie</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-slate-500 pl-2">
              Rechtliches & Information
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kontakt" className="text-slate-400 hover:text-white">Kontakt</Link></li>
              <li><Link href="/impressum" className="text-slate-400 hover:text-white">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-slate-400 hover:text-white">Datenschutzerklärung</Link></li>
              <li><Link href="/erstinformation" className="text-slate-400 hover:text-white">Erstinformation gem. § 15 VersVermV</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950/90 py-5 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} TarifVergleich · Inhaber: {CUSTOMER_PROFILE.name}. Alle Rechte vorbehalten.</p>
          <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Geprüfte Vergleichsstandards</span>
        </div>
      </div>
    </footer>
  );
}
