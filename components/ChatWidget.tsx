"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isChatActive } from "@/lib/hybridHours";
import {
  Loader2,
  MessageCircle,
  Send,
  X,
  RotateCcw,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY_OPEN = "sichertarif_chat_open";
const STORAGE_KEY_MSGS = "sichertarif_chat_messages";

/**
 * Wandelt URLs und Markdown-Links in klickbare, interaktive Links um.
 * Interne Links führen per Next.js router.push() zu einer nahtlosen
 * Client-Side-Navigation, ohne dass das Chat-Fenster schließt!
 */
function renderFormattedContent(
  text: string,
  onNavigate: (href: string) => void,
) {
  // Regex für Markdown-Links [Text](URL) oder direkte URLs https?://...
  const regex = /(\[[^\]]+\]\([^\)]+\)|https?:\/\/[^\s\)\],]+)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Markdown Link: [Titel](URL)
    const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdMatch) {
      const [, label, href] = mdMatch;
      return renderLinkItem(href, label, index, onNavigate);
    }

    // 2. Rohe URL: https://...
    if (/^https?:\/\//i.test(part)) {
      const cleanUrl = part.replace(/[.,;!?]+$/, "");
      const trailingPunctuation = part.slice(cleanUrl.length);
      return (
        <span key={index}>
          {renderLinkItem(cleanUrl, cleanUrl, index, onNavigate)}
          {trailingPunctuation}
        </span>
      );
    }

    // 3. Normaler Text
    return <span key={index}>{part}</span>;
  });
}

function renderLinkItem(
  href: string,
  label: string,
  key: number,
  onNavigate: (href: string) => void,
) {
  const isInternal =
    href.startsWith("/") ||
    href.includes("sichertarif.de") ||
    href.includes("localhost:3000") ||
    href.includes("vercel.app");

  let internalPath = href;
  if (isInternal) {
    try {
      if (href.startsWith("http")) {
        const u = new URL(href);
        internalPath = u.pathname + u.search + u.hash;
      }
    } catch {
      internalPath = href;
    }
  }

  if (isInternal) {
    return (
      <button
        key={key}
        type="button"
        onClick={() => onNavigate(internalPath)}
        className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 break-all text-left cursor-pointer transition-colors"
      >
        <span>{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 inline shrink-0 text-blue-500" />
      </button>
    );
  }

  return (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 break-all transition-colors"
    >
      <span>{label}</span>
      <ExternalLink className="w-3.5 h-3.5 inline shrink-0 text-blue-500" />
    </a>
  );
}

/**
 * 24/7 Hybrid-Support-Chatbot:
 * - Bleibt bei Seitenwechsel geöffnet und behält den Chatverlauf (sessionStorage).
 * - Sendet der KI immer den aktuellen Seitenpfad (usePathname).
 * - Rendert alle URLs als anklickbare Links.
 * - Sanfte, flüssige Animationen & Übergänge.
 */
export default function ChatWidget() {
  const pathname = usePathname();
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Initialisierung & Wiederherstellung aus sessionStorage
  useEffect(() => {
    setActive(isChatActive());

    try {
      const savedOpen = sessionStorage.getItem(STORAGE_KEY_OPEN);
      if (savedOpen === "true") {
        setOpen(true);
      }
      const savedMsgs = sessionStorage.getItem(STORAGE_KEY_MSGS);
      if (savedMsgs) {
        const parsed = JSON.parse(savedMsgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Sicherheits-Fallback bei restriktiven Browser-Einstellungen
    }
  }, []);

  // 2. Offen-Zustand dauerhaft merken
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_OPEN, open ? "true" : "false");
    } catch {}
  }, [open]);

  // 3. Nachrichten dauerhaft merken
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
      }
    } catch {}
  }, [messages]);

  // 4. Auto-Scroll bei neuen Nachrichten
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading]);

  if (!active) return null;

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next,
          currentPath: pathname, // Aktuelle Seite des Nutzers mitsenden!
        }),
      });
      const data = (await res.json().catch(() => null)) as { reply?: string } | null;
      const reply =
        data?.reply ??
        "Entschuldigung, das hat nicht geklappt. Bitte versuchen Sie es später erneut.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "Entschuldigung, das hat nicht geklappt. Bitte versuchen Sie es später erneut.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleResetChat() {
    setMessages([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY_MSGS);
    } catch {}
  }

  function handleNavigate(targetUrl: string) {
    // Sanfte Client-Side-Navigation, ohne dass das Chat-Widget schließt!
    router.push(targetUrl);
  }

  return (
    <>
      {/* Schwebender Chat-Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        aria-expanded={open}
        className="flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span
          className={`transform transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
      </button>

      {/* Sanft einblendbares Chat-Panel (origin-bottom-right mit Smooth Transitions) */}
      <div
        role="dialog"
        aria-label="Support-Chat"
        className={`fixed bottom-20 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
          <div>
            <p className="text-sm font-semibold">SicherTarif Assistent</p>
            <p className="text-xs text-blue-100">
              Automatische Hilfe · außerhalb der Telefonzeiten
            </p>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleResetChat}
                title="Chatverlauf zurücksetzen"
                aria-label="Chatverlauf zurücksetzen"
                className="rounded-lg p-1.5 text-blue-200 hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
              className="rounded-lg p-1.5 text-blue-200 hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Nachrichten-Bereich */}
        <div
          ref={scrollRef}
          aria-live="polite"
          className="flex max-h-[50vh] min-h-[220px] flex-col gap-3 overflow-y-auto bg-slate-50 p-4 transition-all"
        >
          {messages.length === 0 && (
            <div className="rounded-2xl bg-white p-3.5 text-sm text-slate-600 shadow-sm border border-slate-100 animate-in fade-in duration-300">
              Guten Tag! Ich bin der automatische Assistent von SicherTarif und
              helfe Ihnen bei Fragen zu unseren Vergleichsrechnern und Tarifen.
              Womit kann ich Ihnen weiterhelfen?
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
            >
              <div
                data-role={m.role}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm shadow-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                }`}
              >
                {m.role === "user"
                  ? m.content
                  : renderFormattedContent(m.content, handleNavigate)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-in fade-in duration-200">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm text-slate-500 shadow-sm border border-slate-100">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span>Schreibt …</span>
              </div>
            </div>
          )}
        </div>

        {/* Eingabe */}
        <div className="border-t border-slate-200 p-2.5 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ihre Frage …"
              maxLength={1000}
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Nachricht senden"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-1.5 px-1 text-[11px] leading-snug text-slate-400">
            Bitte keine persönlichen Daten eingeben. Für persönliche Beratung
            erreichen Sie Herrn Gülec zu den Servicezeiten.
          </p>
        </div>
      </div>
    </>
  );
}
