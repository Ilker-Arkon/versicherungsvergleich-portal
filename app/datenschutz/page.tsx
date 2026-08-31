import type { Metadata } from "next";
import { CUSTOMER_PROFILE } from '@/lib/data';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von TarifVergleich – Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-3">
            <Lock className="w-4 h-4 mr-1.5" /> DSGVO-Konform
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-6">Datenschutzerklärung</h1>

          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Datenschutz auf einen Blick</h2>
              <p>
                Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Datenschutzerklärung.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Verantwortliche Stelle</h2>
              <p className="font-semibold text-slate-800">{CUSTOMER_PROFILE.name}</p>
              <p>TarifVergleich Direkt</p>
              <p>{CUSTOMER_PROFILE.street}</p>
              <p>{CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}</p>
              <p>Telefon: {CUSTOMER_PROFILE.phone}</p>
              <p>E-Mail: {CUSTOMER_PROFILE.email}</p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Datenerfassung bei Nutzung unserer Vergleichsrechner</h2>
              <p>
                Wenn Sie unsere kostenlosen Tarifvergleiche nutzen, werden ausschließlich die für den jeweiligen Vergleich notwendigen technischen und tarifrelevanten Parameter (z. B. Postleitzahl, Fahrzeugtyp, gewünschter Deckungsumfang) verschlüsselt verarbeitet.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 256-Bit-SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Ihre Rechte als betroffene Person</h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
