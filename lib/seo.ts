import type { Metadata } from "next";
import { CATEGORIES } from "./data";

/** URL des dynamischen OG-Image-Generators (`app/api/og/route.tsx`). */
export function ogImageUrl(title: string): string {
  return `/api/og?title=${encodeURIComponent(title)}`;
}

/** OG-/Twitter-Bild-Metadaten für einen Titel. */
export function ogImageMeta(title: string) {
  return {
    url: ogImageUrl(title),
    width: 1200,
    height: 630,
    alt: title,
  };
}

/**
 * Leitet Title/Description einer Detailseite aus `CATEGORIES` ab.
 * Vermeidet doppeltes „Vergleich" (z. B. bei „Girokonto-Vergleich").
 */
export function subcategoryMetadata(slug: string): Metadata {
  for (const cat of CATEGORIES) {
    const sub = cat.subcategories.find((s) => s.slug === slug);
    if (sub) {
      const title = /vergleich/i.test(sub.title)
        ? sub.title
        : `${sub.title} Vergleich`;
      const image = ogImageMeta(title);
      return {
        title,
        description: sub.description,
        alternates: { canonical: slug },
        openGraph: { title, description: sub.description, images: [image] },
        twitter: {
          card: "summary_large_image",
          title,
          description: sub.description,
          images: [image],
        },
      };
    }
  }
  return {};
}
