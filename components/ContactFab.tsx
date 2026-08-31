import { PhoneCall, MessageCircle } from "lucide-react";
import { PHONE_URL, WHATSAPP_URL } from "@/lib/site";

/**
 * Schwebende Kontakt-Buttons (unten rechts, auf allen Seiten):
 * „Anrufen" (blau, oben) und „WhatsApp" (grün, darunter).
 * Der WhatsApp-Button erscheint nur, wenn `NEXT_PUBLIC_WHATSAPP_NUMBER` gesetzt ist.
 */
export default function ContactFab() {
  return (
    <div className="fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-3">
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
    </div>
  );
}
