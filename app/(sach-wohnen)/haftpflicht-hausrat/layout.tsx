import type { Metadata } from "next";
import type { ReactNode } from "react";
import { subcategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = subcategoryMetadata("/haftpflicht-hausrat");

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
