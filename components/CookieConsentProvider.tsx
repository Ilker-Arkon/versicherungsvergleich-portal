"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ConsentState,
  DEFAULT_CONSENT,
  loadConsent,
  persistConsent,
} from "@/lib/cookieConsent";

interface CookieConsentContextValue {
  /** true, sobald localStorage gelesen wurde — verhindert Flash & vorzeitiges Skript-Laden. */
  ready: boolean;
  /** true, wenn der Nutzer eine (gespeicherte) Entscheidung getroffen hat. */
  hasChosen: boolean;
  consent: ConsentState;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  acceptNecessary: () => void;
  saveSelection: (consent: ConsentState) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export default function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    if (stored) {
      setConsent(stored);
      setHasChosen(true);
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setConsent(next);
    setHasChosen(true);
    setSettingsOpen(false);
    persistConsent(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, marketing: true });
  }, [persist]);

  const acceptNecessary = useCallback(() => {
    persist({ necessary: true, marketing: false });
  }, [persist]);

  const saveSelection = useCallback(
    (next: ConsentState) => {
      persist({ necessary: true, marketing: next.marketing === true });
    },
    [persist],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ready,
      hasChosen,
      consent,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessary,
      saveSelection,
    }),
    [
      ready,
      hasChosen,
      consent,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessary,
      saveSelection,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent muss innerhalb von <CookieConsentProvider> verwendet werden.",
    );
  }
  return ctx;
}
