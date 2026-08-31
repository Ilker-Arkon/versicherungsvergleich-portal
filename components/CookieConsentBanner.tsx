"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useCookieConsent } from "@/components/CookieConsentProvider";

export default function CookieConsentBanner() {
  const {
    ready,
    hasChosen,
    consent,
    settingsOpen,
    openSettings,
    closeSettings,
    acceptAll,
    acceptNecessary,
    saveSelection,
  } = useCookieConsent();

  const [marketing, setMarketing] = useState(consent.marketing);

  useEffect(() => {
    if (settingsOpen) setMarketing(consent.marketing);
  }, [settingsOpen, consent.marketing]);

  // Vor dem localStorage-Read nichts rendern (kein Flash, kein vorzeitiges Laden).
  if (!ready) return null;

  return (
    <>
      {/* Kompakter Erst-Banner */}
      {!hasChosen && !settingsOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-2xl p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 items-center justify-center">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-slate-900">Cookie-Einstellungen</h2>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Wir nutzen Cookies, um die Website funktionsfähig zu halten und Ihnen unseren
                  kostenlosen Live-Vergleich zu ermöglichen. Details in unserer{" "}
                  <Link
                    href="/datenschutz"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={acceptNecessary}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Details anpassen
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Einstellungs-Dialog (Erst-Einrichtung oder späteres Ändern) */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={closeSettings}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Cookie-Einstellungen"
            className="relative w-full max-w-2xl rounded-t-2xl sm:rounded-2xl sm:mb-6 border border-slate-200 bg-white shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Cookie-Einstellungen</h2>
              <button
                type="button"
                onClick={closeSettings}
                aria-label="Schließen"
                className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Notwendig */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Notwendig
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Erforderlich für die Grundfunktionen der Website (z. B. Sicherheit, Anzeige).
                    Immer aktiv.
                  </p>
                </div>
                <span className="shrink-0 mt-0.5 inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Immer aktiv
                </span>
              </div>

              {/* Externe Inhalte / Marketing */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">
                    Externe Inhalte (Live-Vergleichsrechner)
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Lädt den Tarifrechner unseres Partners. Dabei werden Daten (z. B. IP-Adresse)
                    an{" "}
                    <span className="font-medium text-slate-600">
                      form.partner-versicherung.de
                    </span>{" "}
                    übertragen und Cookies gesetzt. Ohne Zustimmung ist der Rechner nicht verfügbar.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketing}
                  aria-label="Externe Inhalte erlauben"
                  onClick={() => setMarketing((v) => !v)}
                  className={`shrink-0 mt-0.5 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    marketing ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      marketing ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => saveSelection({ necessary: true, marketing })}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow"
              >
                Auswahl speichern
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Sie können Ihre Einwilligung jederzeit über „Cookie-Einstellungen“ ändern oder
              widerrufen. Details in der{" "}
              <Link href="/datenschutz" className="text-blue-600 hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        </div>
      )}

    </>
  );
}
