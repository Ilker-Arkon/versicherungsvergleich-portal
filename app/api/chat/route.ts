import { NextResponse } from "next/server";
import { askChat, hasChatKey, type ChatMessage } from "@/lib/chat";
import { isChatActive } from "@/lib/hybridHours";
import { CUSTOMER_PROFILE } from "@/lib/data";

// Chat ist immer dynamisch; keine statische Vorbestellung.
export const dynamic = "force-dynamic";
// Etwas Luft für den (nicht-streamenden) LLM-Call in der Serverless-Funktion.
export const maxDuration = 30;

const MAX_MESSAGES = 10;
const MAX_CHARS = 1000;

/** Freundliche Antwort außerhalb der Chat-Zeiten (tagsüber). */
function closedReply(): string {
  return [
    "Vielen Dank für Ihre Nachricht!",
    "",
    `Unser persönlicher Berater ist zu folgenden Zeiten für Sie da: ${CUSTOMER_PROFILE.serviceHours}.`,
    `Sie erreichen uns telefonisch unter ${CUSTOMER_PROFILE.phone} oder per WhatsApp.`,
  ].join("\n");
}

/** Antwort, wenn der Assistent technisch nicht verfügbar ist. */
function unavailableReply(): string {
  return [
    "Der automatische Assistent ist momentan nicht erreichbar.",
    `Bitte kontaktieren Sie uns telefonisch unter ${CUSTOMER_PROFILE.phone} oder per WhatsApp — wir melden uns ${CUSTOMER_PROFILE.responseTime.toLowerCase()}.`,
  ].join("\n");
}

export async function POST(request: Request) {
  // 1) Body lesen und Nachrichten validieren.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ reply: "Ungültige Anfrage." }, { status: 400 });
  }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw)) {
    return NextResponse.json({ reply: "Ungültige Anfrage." }, { status: 400 });
  }

  const history: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      continue;
    }
    const trimmed = content.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_CHARS) {
      continue;
    }
    history.push({ role: role as "user" | "assistant", content: trimmed });
  }
  if (history.length === 0) {
    return NextResponse.json(
      { reply: "Ihre Nachricht ist leer. Wie kann ich Ihnen helfen?" },
      { status: 400 },
    );
  }

  // 2) Zeit-Gate: außerhalb 20:00–08:00 Uhr nur Kontakt-Verweis, kein LLM-Call.
  if (!isChatActive()) {
    return NextResponse.json({ reply: closedReply() });
  }

  // 3) Ohne API-Schlüssel kein LLM-Call — sauber mit Hinweis antworten.
  if (!hasChatKey()) {
    return NextResponse.json({ reply: unavailableReply() });
  }

  // 4) Sprachmodell aufrufen; bei Fehler fallback auf Kontakt-Verweis.
  try {
    const reply = await askChat(history);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] Fehler beim LLM-Call:", err);
    return NextResponse.json({ reply: unavailableReply() });
  }
}
