import type { Metadata } from "next";
import { CUSTOMER_PROFILE } from '@/lib/data';
import { ShieldCheck, Mail, PhoneCall, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und gesetzliche Anbieterkennzeichnung von TarifVergleich.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Gesetzliche Anbieterkennzeichnung
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 mb-8">Impressum</h1>

          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Angaben gemäß § 5 TMG</h2>
              <p className="font-semibold text-slate-800">{CUSTOMER_PROFILE.name}</p>
              <p>TarifVergleich Direkt</p>
              <p>{CUSTOMER_PROFILE.street}</p>
              <p>{CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}</p>
              <p>{CUSTOMER_PROFILE.country}</p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Kontakt</h2>
              <p className="flex items-center mt-1">
                <PhoneCall className="w-4 h-4 mr-2 text-blue-600" />
                Telefon: {CUSTOMER_PROFILE.phone}
              </p>
              <p className="flex items-center mt-1">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                E-Mail: <a href={`mailto:${CUSTOMER_PROFILE.email}`} className="text-blue-600 hover:underline ml-1">{CUSTOMER_PROFILE.email}</a>
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Tätigkeitsart & Vermittlerregister</h2>
              <p>
                Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 der Gewerbeordnung (GewO).
              </p>
              <p className="mt-2">
                <strong>Zuständige Erlaubnis- und Aufsichtsbehörde:</strong><br />
                Industrie- und Handelskammer Nürnberg für Mittelfranken<br />
                Hauptmarkt 25/27, 90403 Nürnberg
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Schlichtungsstellen (Außergerichtliche Streitbeilegung)</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin (www.versicherungsombudsmann.de)</li>
                <li>Ombudsmann für die Private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin (www.pkv-ombudsmann.de)</li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>{CUSTOMER_PROFILE.name}</p>
              <p>{CUSTOMER_PROFILE.street}</p>
              <p>{CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
