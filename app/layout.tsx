import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsentProvider from "@/components/CookieConsentProvider";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ContactFab from "@/components/ContactFab";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { ogImageMeta } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Versicherungs- & Finanzportal | Top Tarife vergleichen",
    template: "%s | TarifVergleich",
  },
  description:
    "Vergleichen Sie kostenlos und unabhängig Tarife für Versicherungen, Finanzen und Vorsorge. Sparen Sie bares Geld mit unserem Experten-Vergleich.",
  openGraph: {
    title: "Versicherungs- & Finanzportal | Top Tarife vergleichen",
    description:
      "Vergleichen Sie kostenlos und unabhängig Tarife für Versicherungen, Finanzen und Vorsorge.",
    url: "/",
    siteName: "TarifVergleich",
    locale: "de_DE",
    type: "website",
    images: [ogImageMeta("Tarife vergleichen. Sofort sparen.")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Versicherungs- & Finanzportal | Top Tarife vergleichen",
    description:
      "Vergleichen Sie kostenlos und unabhängig Tarife für Versicherungen, Finanzen und Vorsorge.",
    images: [ogImageMeta("Tarife vergleichen. Sofort sparen.")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Zum Inhalt springen
        </a>
        <CookieConsentProvider>
          <Navbar />
          <main id="main-content" className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <CookieConsentBanner />
          <ContactFab />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/icon.svg`,
              }),
            }}
          />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
