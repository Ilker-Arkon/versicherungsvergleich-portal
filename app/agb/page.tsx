import type { Metadata } from "next";
import { FileText, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description: "Allgemeine Geschäftsbedingungen (AGB) von SicherTarif.",
  alternates: { canonical: "/agb" },
};

export default function AgbPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3">
            <FileText className="w-4 h-4 mr-1.5" /> Rechtstext
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-8 break-words">
            Allgemeine Geschäfts&shy;bedingungen (AGB)
          </h1>

          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
            <p className="flex items-start gap-2.5 text-sm text-amber-900 leading-relaxed">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <span>
                Die verbindlichen AGB werden derzeit vom <strong>Händlerbund</strong> bereitgestellt und
                anschließend 1:1 auf dieser Seite eingebunden. Bis zur Freigabe ist dieser Bereich noch nicht
                mit rechtsverbindlichem Inhalt befüllt.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
