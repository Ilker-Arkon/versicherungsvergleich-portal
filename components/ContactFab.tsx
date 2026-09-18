import { PhoneCall, MessageCircle, Mail } from "lucide-react";
import { PHONE_URL, WHATSAPP_URL } from "@/lib/site";
import { CUSTOMER_PROFILE } from "@/lib/data";

/**
 * Schwebende Kontakt-Buttons (unten rechts, auf allen Seiten):
 * 1. „Anrufen" (blau)
 * 2. „WhatsApp" (grün)
 * 3. „E-Mail" (dunkel/slate)
 */
export default function ContactFab() {
  return (
    <div className="flex flex-col items-end gap-3">
      {/* Anrufen */}
      <a
        href={PHONE_URL}
        aria-label="Anrufen"
        title="Anrufen"
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white font-semibold text-sm shadow-lg hover:bg-blue-700 transition-colors"
      >
        <PhoneCall className="h-5 w-5" />
        <span className="hidden sm:inline">Anrufen</span>
      </a>

      {/* WhatsApp */}
      {WHATSAPP_URL && (
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kontakt über WhatsApp"
          title="Kontakt über WhatsApp"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white font-semibold text-sm shadow-lg hover:bg-[#1ebe5d] transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      )}

      {/* E-Mail */}
      <a
        href={`mailto:${CUSTOMER_PROFILE.email}`}
        aria-label="E-Mail senden"
        title={`E-Mail an ${CUSTOMER_PROFILE.email}`}
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-white font-semibold text-sm shadow-lg hover:bg-slate-800 transition-colors border border-slate-700/60"
      >
        <Mail className="h-5 w-5 text-blue-400" />
        <span className="hidden sm:inline">E-Mail</span>
      </a>
    </div>
  );
}
