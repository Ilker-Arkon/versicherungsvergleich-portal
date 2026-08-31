'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShieldCheck, Sparkles, RefreshCw, Lock } from 'lucide-react';
import { useCookieConsent } from '@/components/CookieConsentProvider';

interface PartnerWidgetProps {
  containerId?: string;
  scriptSrc?: string;
  dataStyle?: string;
  dataScrollTo?: string;
  iframeUrl?: string;
  directLink?: string;
  title?: string;
  badgeText?: string;
  minHeight?: string;
}

export default function PartnerWidget({
  containerId,
  scriptSrc,
  dataStyle,
  dataScrollTo,
  iframeUrl,
  directLink,
  title = "Offizieller Tarifrechner & Live-Vergleich",
  badgeText = "Tagesaktuelle Konditionen",
  minHeight = "650px"
}: PartnerWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedKeyRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { ready, consent, openSettings } = useCookieConsent();
  const hasMarketingConsent = consent.marketing;
  const showConsentPlaceholder = ready && !hasMarketingConsent;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    // DSGVO: externe Partner-Skripte/-iFrames erst NACH Einwilligung laden.
    // `ready` bleibt false, bis localStorage gelesen wurde — davor wird nichts geladen
    // (kein Flash, kein vorzeitiges Setzen von Drittanbieter-Cookies).
    if (!ready) {
      return () => { isMounted = false; };
    }
    if (!hasMarketingConsent) {
      setIsLoading(false);
      return () => { isMounted = false; };
    }

    if (iframeUrl) {
      // iFrame-Modus: isLoading wird via onLoad-Event des <iframe> zurückgesetzt.
      // Kein künstliches Timeout nötig.
      return () => { isMounted = false; };
    }

    if (!scriptSrc || !containerId) return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // Strict Mode (dev, im App Router standardmäßig aktiv) führt diesen Effect
    // doppelt aus. Ohne Guard würde das Partner-Skript zweimal geladen und über
    // `appendChild` zwei identische iframes in denselben Container gehängt.
    const injectionKey = `${scriptSrc}::${containerId}`;
    if (injectedKeyRef.current === injectionKey) {
      setIsLoading(false);
      return;
    }
    injectedKeyRef.current = injectionKey;

    currentContainer.innerHTML = '';

    const widgetTarget = document.createElement('div');
    widgetTarget.id = containerId;
    widgetTarget.style.width = '100%';
    if (dataStyle) {
      widgetTarget.setAttribute('data-style', dataStyle);
    }
    if (dataScrollTo) {
      widgetTarget.setAttribute('data-scrollto', dataScrollTo);
    }
    currentContainer.appendChild(widgetTarget);

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => {
      if (isMounted) {
        // 100 ms reicht, damit der iframe des Partner-Skripts im DOM erscheint,
        // bevor wir den Ladebalken ausblenden (war: 600 ms — unnötig lang).
        setTimeout(() => setIsLoading(false), 100);
      }
    };
    script.onerror = () => {
      if (isMounted) {
        setIsLoading(false);
        setHasError(true);
      }
    };

    currentContainer.appendChild(script);

    // Fallback: Falls onload nicht feuert (z. B. CORS), nach 1500 ms trotzdem
    // den Ladebalken ausblenden (war: 2500 ms).
    const timeoutTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 1500);

    // Den Container im Cleanup bewusst NICHT leeren: Der iframe wird vom asynchron
    // geladenen Skript eingefügt. Ein Leeren hier würde beim Strict-Mode-Remount
    // das Ziel löschen und beim zweiten Lauf zu einem doppelten iframe führen.
    return () => {
      isMounted = false;
      clearTimeout(timeoutTimer);
    };
  }, [containerId, scriptSrc, dataStyle, dataScrollTo, iframeUrl, ready, hasMarketingConsent]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden my-8">
      {/* Widget Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center">
              {title}
            </h3>
            <p className="text-xs text-slate-400 flex items-center mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              100% kostenlos, unverbindlich & DSGVO-konform
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-flex text-xs font-semibold px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 rounded-full">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Widget Container Area */}
      <div className="p-4 sm:p-6 bg-slate-50/50 relative">
        {/* Loading Skeleton */}
        {isLoading && (
          <div role="status" aria-live="polite" className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center z-10 p-6 min-h-[400px]">
            <RefreshCw aria-hidden="true" className="w-7 h-7 text-blue-600 animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-800">Vergleichsrechner wird geladen...</p>
            <p className="text-xs text-slate-500 mt-1">Echtzeit-Tarife und Konditionen werden synchronisiert</p>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && directLink && (
          <div className="p-8 text-center bg-amber-50 rounded-xl border border-amber-200 my-4">
            <p className="text-amber-800 font-bold mb-2">Rechner konnte nicht direkt eingebettet werden</p>
            <p className="text-xs text-amber-700 mb-4">Nutzen Sie den direkten Vergleichslink unseres Partners:</p>
            <a
              href={directLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Jetzt zum offiziellen Tarifrechner
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        )}

        {/* Consent-Placeholder: Rechner erst nach Einwilligung */}
        {showConsentPlaceholder && (
          <div className="flex flex-col items-center justify-center text-center py-10 px-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-200 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              Vergleichsrechner erst nach Ihrer Einwilligung
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Der Live-Tarifrechner wird von unserem Partner bereitgestellt. Beim Laden werden
              Daten (z. B. IP-Adresse) an{" "}
              <span className="font-medium">form.partner-versicherung.de</span> übertragen und
              Cookies gesetzt.
            </p>
            <button
              type="button"
              onClick={openSettings}
              className="mt-4 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Rechner freischalten
            </button>
          </div>
        )}

        {/* Script Target Container */}
        {hasMarketingConsent && !iframeUrl && containerId && scriptSrc && (
          <div
            ref={containerRef}
            style={{ minHeight }}
            className="w-full flex justify-center items-start overflow-x-auto"
          />
        )}

        {/* Direct iframe container */}
        {hasMarketingConsent && iframeUrl && (
          <iframe
            src={iframeUrl}
            width="100%"
            style={{ minHeight, border: 'none' }}
            title={title}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
        )}
      </div>

      {/* Trust Footer Bar */}
      <div className="bg-slate-100/80 px-6 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center">
          <Lock className="w-3 h-3 text-emerald-600 mr-1.5" />
          256-Bit SSL-gesicherte Datenübertragung
        </span>
        <span>Unabhängiger Marktvergleich</span>
      </div>
    </div>
  );
}
