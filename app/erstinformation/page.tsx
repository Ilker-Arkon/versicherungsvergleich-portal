import type { Metadata } from "next";
import { CUSTOMER_PROFILE } from '@/lib/data';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: "Tippgeber-Information",
  description: "Transparenzhinweis: SicherTarif ist Tippgeber – die Versicherungsvermittlung erfolgt durch die TARIFCHECK24 GmbH.",
  alternates: { canonical: "/erstinformation" },
};

export default function ErstinformationPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> Transparenzhinweis
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 break-words">Tippgeber-Information</h1>
          <p className="text-sm text-slate-500 mb-8">
            Transparenz über die Rollenverteilung zwischen Portalbetreiber und Vermittler beim ersten Geschäftskontakt.
          </p>

          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h2 className="text-base font-bold text-slate-900 mb-3">1. SicherTarif ist Tippgeber, kein Versicherungsvermittler</h2>
              <p>
                {CUSTOMER_PROFILE.name} (SicherTarif) betreibt ein unabhängiges Online-Vergleichsportal und ist
                ausschließlich als <strong>Tippgeber</strong> tätig. SicherTarif ist{" "}
                <strong>kein Versicherungsvermittler</strong> und erbringt keine Versicherungsvermittlung oder
                -beratung im Sinne des § 34d GewO.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Letztendlicher Vermittler</h2>
              <p>
                Die Versicherungsvermittlung sowie der Betrieb der Vergleichsrechner und Vergleichsformulare erfolgen durch:
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                TARIFCHECK24 GmbH<br />
                Zollstr. 11b<br />
                21465 Wentorf bei Hamburg
              </p>
              <p className="mt-2">
                Tel. 040 - 73098288 · Fax 040 - 73098289<br />
                E-Mail: <a href="mailto:info@tarifcheck.de" className="text-blue-600 hover:underline break-all">info@tarifcheck.de</a>
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Kontakt zum Portalbetreiber</h2>
              <p className="font-semibold text-slate-800">{CUSTOMER_PROFILE.name}</p>
              <p>SicherTarif Direkt</p>
              <p>{CUSTOMER_PROFILE.street}</p>
              <p>{CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}</p>
              <p className="mt-2">Telefon: {CUSTOMER_PROFILE.phone}</p>
              <p>E-Mail: {CUSTOMER_PROFILE.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
