'use client';

import React from 'react';
import { CUSTOMER_PROFILE } from '@/lib/data';
import { ShieldCheck, FileText, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function ErstinformationPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> Gesetzliche Pflichtinformation
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Erstinformation gemäß § 15 VersVermV</h1>
          <p className="text-sm text-slate-500 mb-8">
            Status- und Kontaktinformationen für Kunden und Interessenten beim ersten Geschäftskontakt.
          </p>

          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h2 className="text-base font-bold text-slate-900 mb-3">1. Vermittlerangaben</h2>
              <p className="font-semibold text-slate-800">{CUSTOMER_PROFILE.name}</p>
              <p>TarifVergleich Direkt</p>
              <p>{CUSTOMER_PROFILE.street}</p>
              <p>{CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}</p>
              <p className="mt-2">Telefon: {CUSTOMER_PROFILE.phone}</p>
              <p>E-Mail: {CUSTOMER_PROFILE.email}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Status und Berufsbezeichnung</h2>
              <p>
                {CUSTOMER_PROFILE.name} ist tätig als <strong>Versicherungsmakler</strong> mit Erlaubnis nach § 34d Abs. 1 GewO (Bundesrepublik Deutschland).
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Aufsichtsbehörde & Register</h2>
              <p>
                Zuständige IHK: Industrie- und Handelskammer Nürnberg für Mittelfranken, Hauptmarkt 25/27, 90403 Nürnberg.<br />
                Gemeinsame Registerstelle: Deutscher Industrie- und Handelskammertag (DIHK) e.V., Breite Straße 29, 10178 Berlin, Telefon: 0180 600 58 50, <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.vermittlerregister.info</a>.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Beteiligungen & Unabhängigkeit</h2>
              <p>
                Der Vermittler hält keine unmittelbare oder mittelbare Beteiligung von mehr als 10 % an den Stimmrechten oder am Kapital eines Versicherungsunternehmens. Kein Versicherungsunternehmen hält eine Beteiligung am Unternehmen des Vermittlers.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">5. Schlichtungsstellen</h2>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
                <li>Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin</li>
                <li>Ombudsmann Private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
