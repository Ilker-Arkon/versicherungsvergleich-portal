"use client";

import { useEffect, useRef, useState } from "react";
import { isChatActive } from "@/lib/hybridHours";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Nachts aktiver Support-Chatbot (20:00–08:00 Uhr, Europe/Berlin).
 *
 * Tagsüber rendert die Komponente nichts — dann sind die Telefon-/WhatsApp-
 * Buttons (`ContactFab`) der Kanal. Die Zeit wird erst nach dem Mount geprüft,
 * um Hydration-Mismatches und falsche Server-Uhrzeiten zu vermeiden.
 */
export default function ChatWidget() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(isChatActive());
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
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
        body: JSON.stringify({ messages: next }),
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

  return (
    <>
      {/* Launcher (wird über den Layout-Container neben ContactFab gestapelt) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        aria-expanded={open}
        className="flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Support-Chat"
          className="fixed bottom-20 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">SicherTarif Assistent</p>
              <p className="text-xs text-blue-100">Automatische Hilfe · nachts aktiv</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
              className="rounded-lg p-1 hover:bg-blue-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex max-h-[50vh] min-h-[200px] flex-col gap-3 overflow-y-auto bg-slate-50 p-4"
          >
            {messages.length === 0 && (
              <div className="rounded-lg bg-white p-3 text-sm text-slate-500 shadow-sm">
                Guten Abend! Ich bin der automatische Assistent von SicherTarif und
                helfe Ihnen bei Fragen zum Vergleich und zur Navigation. Worum geht es?
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  data-role={m.role}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm text-slate-500 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" /> Schreibt …
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-2.5">
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
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Nachricht senden"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-1.5 px-1 text-[11px] leading-snug text-slate-400">
              Bitte keine persönlichen Daten eingeben. Für persönliche Beratung
              erreichen Sie uns tagsüber telefonisch oder per WhatsApp.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
