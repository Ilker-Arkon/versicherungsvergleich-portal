import { ImageResponse } from "next/og";

/**
 * Dynamischer Open-Graph-Image-Generator.
 * Liefert ein gebrandetes 1200×630-PNG mit dem übergebenen `title`.
 * Wird von `lib/seo.ts` (Detailseiten) und `app/layout.tsx` (Default) referenziert.
 *
 * Hinweis: `request.url` macht die Route dynamisch (kein Build-Time-Prerendering) —
 * das ist gewollt, da der Titel pro URL variiert.
 */

function cleanTitle(raw: string | null, fallback: string): string {
  if (!raw) return fallback;
  const trimmed = raw.replace(/\s+/g, " ").trim().slice(0, 80);
  return trimmed || fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = cleanTitle(
    searchParams.get("title"),
    "Tarife vergleichen. Sofort sparen.",
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundImage:
            "linear-gradient(135deg, #1e40af 0%, #2563eb 45%, #06b6d4 100%)",
          color: "#ffffff",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            TV
          </div>
          <div style={{ marginLeft: 20, fontSize: 34, fontWeight: 700, display: "flex" }}>
            Tarif<span style={{ color: "#a5f3fc" }}>Vergleich</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "92%",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            Versicherungen &amp; Finanzen vergleichen · 100&nbsp;% kostenlos &amp;
            unverbindlich
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
