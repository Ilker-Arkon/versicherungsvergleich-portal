'use client';

import { useState, useRef, useEffect } from "react";
import { PhoneCall, MessageCircle, Mail, ChevronUp } from "lucide-react";
import { PHONE_URL, WHATSAPP_URL } from "@/lib/site";
import { CUSTOMER_PROFILE } from "@/lib/data";

/**
 * Schwebendes Kontakt-Menü (Speed-Dial, unten rechts):
 * Kompakter „Kontakt"-Button als sekundäre Option.
 * Beim Klick fächern sich Anrufen, WhatsApp und E-Mail nach oben auf.
 * Im geschlossenen Zustand nimmt das Menü 0 px Höhe ein (keine Geister-Lücke).
 */
export default function ContactFab() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Klick außerhalb oder Escape-Taste schließt das Aufklappmenü
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-end">
      {/* Aufklappbare Kontaktoptionen (nur im geöffneten Zustand im DOM -> verhindert Geister-Lücke) */}
      {isOpen && (
        <div
          className="flex flex-col items-end gap-2 mb-2.5 transition-all duration-200 origin-bottom-right animate-in fade-in slide-in-from-bottom-2"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Anrufen */}
          <a
            href={PHONE_URL}
            role="menuitem"
            aria-label={`Telefonisch anrufen: ${CUSTOMER_PROFILE.phone}`}
            className="flex items-center gap-2.5 rounded-full bg-blue-600 px-4 py-2.5 text-white font-medium text-xs sm:text-sm shadow-xl hover:bg-blue-700 active:scale-95 transition-all"
          >
            <PhoneCall className="h-4 w-4 shrink-0" />
            <span>Anrufen ({CUSTOMER_PROFILE.phone})</span>
          </a>

          {/* WhatsApp */}
          {WHATSAPP_URL && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              aria-label="WhatsApp-Chat starten"
              className="flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-white font-medium text-xs sm:text-sm shadow-xl hover:bg-[#1ebe5d] active:scale-95 transition-all"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>WhatsApp-Chat</span>
            </a>
          )}

          {/* E-Mail */}
          <a
            href={`mailto:${CUSTOMER_PROFILE.email}`}
            role="menuitem"
            aria-label={`E-Mail senden an ${CUSTOMER_PROFILE.email}`}
            className="flex items-center gap-2.5 rounded-full bg-slate-900 px-4 py-2.5 text-white font-medium text-xs sm:text-sm shadow-xl hover:bg-slate-800 active:scale-95 transition-all border border-slate-700/60"
          >
            <Mail className="h-4 w-4 shrink-0 text-blue-400" />
            <span>E-Mail ({CUSTOMER_PROFILE.email})</span>
          </a>
        </div>
      )}

      {/* Haupt-Kontakt-Button (Trigger - dezent als sekundäre Aktion) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={isOpen ? "Kontaktmöglichkeiten schließen" : "Kontaktmöglichkeiten öffnen"}
        className="inline-flex items-center gap-2 rounded-full bg-slate-900/95 text-slate-200 px-4 py-2.5 shadow-xl hover:bg-slate-800 hover:text-white active:scale-95 transition-all duration-200 border border-slate-700/80 cursor-pointer text-xs sm:text-sm font-medium group"
      >
        <PhoneCall className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-90 text-blue-400" : "text-emerald-400"}`} />
        <span>Kontakt</span>
        <ChevronUp className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
