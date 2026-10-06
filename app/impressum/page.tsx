import type { Metadata } from "next";
import { CUSTOMER_PROFILE } from '@/lib/data';
import { ShieldCheck, Mail, PhoneCall, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und gesetzliche Anbieterkennzeichnung von SicherTarif.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Gesetzliche Anbieterkennzeichnung
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 mb-8">Impressum</h1>

          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Angaben gemäß § 5 DDG</h2>
              <p className="font-semibold text-slate-800">{CUSTOMER_PROFILE.name}</p>
              <p>SicherTarif Direkt</p>
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
              <h2 className="text-lg font-bold text-slate-900 mb-2">Tätigkeitsart</h2>
              <p>
                SicherTarif betreibt ein unabhängiges Online-Vergleichsportal und ist ausschließlich als{" "}
                <strong>Tippgeber</strong> tätig. SicherTarif ist <strong>kein Versicherungsvermittler</strong> und
                erbringt keine Versicherungsvermittlung oder -beratung im Sinne des § 34d GewO.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Vergleiche powered by TARIFCHECK24 GmbH</h2>
              <p>
                Alle auf dieser Webseite eingebundenen Tarifvergleiche, Vergleichsrechner und Vergleichsformulare werden
                bereitgestellt durch:
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                TARIFCHECK24 GmbH<br />
                Zollstr. 11b<br />
                21465 Wentorf bei Hamburg
              </p>
              <p className="mt-2">
                Tel. 040 - 73098288<br />
                Fax 040 - 73098289<br />
                E-Mail: <a href="mailto:info@tarifcheck.de" className="text-blue-600 hover:underline">info@tarifcheck.de</a>
              </p>
              <div className="mt-4">
                <iframe
                  src="https://a.partner-versicherung.de/filestore/ad/1166/index.php?partner_id=75137"
                  width="100%"
                  scrolling="no"
                  title="Impressum und Verantwortliche für Versicherungsvergleiche"
                  loading="lazy"
                  style={{ border: "none", minHeight: "700px" }}
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
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
