import type { Metadata } from "next";
import { CATEGORIES } from "./data";

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
      return {
        title,
        description: sub.description,
        openGraph: { title, description: sub.description },
      };
    }
  }
  return {};
}
