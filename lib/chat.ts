import { buildSystemPrompt } from "@/lib/chatKnowledge";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-haiku-4-5-20251001";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/** Zu nutzendes Modell, überschreibbar über `CHAT_MODEL`. */
export function getChatModel(): string {
  return process.env.CHAT_MODEL || DEFAULT_MODEL;
}

/** Ob ein API-Schlüssel für das Sprachmodell konfiguriert ist. */
export function hasChatKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/**
 * Fragt das Sprachmodell (Anthropic Messages API) mit dem Verlauf ab und gibt
 * den Antworttext zurück. Nicht-streamend, ohne zusätzliches SDK — ein simpler
 * HTTPS-POST, damit keine neue Laufzeit-Abhängigkeit entsteht.
 */
export async function askClaude(history: ChatMessage[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY ist nicht konfiguriert.");
  }

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: getChatModel(),
      max_tokens: 512,
      temperature: 0,
      system: buildSystemPrompt(),
      messages: history,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${detail.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((c) => c.type === "text")?.text;
  if (!text) {
    throw new Error("Leere Antwort vom Sprachmodell.");
  }
  return text;
}
