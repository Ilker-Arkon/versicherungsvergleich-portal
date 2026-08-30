import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

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
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
