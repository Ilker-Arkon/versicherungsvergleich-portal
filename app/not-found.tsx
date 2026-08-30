import Link from "next/link";
import { Compass, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6">
          <SearchX className="w-10 h-10" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          404 — Seite nicht gefunden
        </h1>
        <p className="mt-4 text-slate-600 text-base leading-relaxed">
          Die aufgerufene Seite existiert nicht oder wurde verschoben. Nutzen Sie
          die Navigation oder kehren Sie zur Startseite zurück, um den passenden
          Tarifvergleich zu finden.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-md hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Zur Startseite
          </Link>
          <Link
            href="/kfz-versicherung"
            className="inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Compass className="w-4 h-4 mr-2" />
            Zum Tarifvergleich
          </Link>
        </div>
      </div>
    </div>
  );
}
