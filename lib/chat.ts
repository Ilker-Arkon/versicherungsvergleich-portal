import { buildSystemPrompt } from "@/lib/chatKnowledge";

// DeepSeek stellt eine OpenAI-kompatible API bereit (günstige LLM-Variante).
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = "deepseek-v4-flash";

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
  return Boolean(process.env.DEEPSEEK_API_KEY);
}

/**
 * Fragt das Sprachmodell (DeepSeek Chat Completions) mit dem Verlauf ab und
 * gibt den Antworttext zurück. Nicht-streamend, ohne zusätzliches SDK — ein
 * simpler HTTPS-POST, damit keine neue Laufzeit-Abhängigkeit entsteht.
 */
export async function askChat(history: ChatMessage[]): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY ist nicht konfiguriert.");
  }

  const res = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getChatModel(),
      max_tokens: 512,
      temperature: 0,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...history],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`DeepSeek API ${res.status}: ${detail.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Leere Antwort vom Sprachmodell.");
  }
  return text;
}
