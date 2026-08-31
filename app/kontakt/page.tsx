import type { Metadata } from "next";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import { CUSTOMER_PROFILE } from "@/lib/data";
import { ogImageMeta } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie das TarifVergleich-Team: telefonisch, per E-Mail oder direkt über das Kontaktformular.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt",
    description:
      "Kontaktieren Sie das TarifVergleich-Team: telefonisch, per E-Mail oder direkt über das Kontaktformular.",
    images: [ogImageMeta("Kontakt")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt",
    description: "Kontaktieren Sie das TarifVergleich-Team.",
    images: [ogImageMeta("Kontakt")],
  },
};

export default function KontaktPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Wir sind für Sie da
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3">Kontakt</h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Fragen zu einem Vergleich, zu einem Tarif oder zu Ihrer Anfrage? Schreiben
            Sie uns — wir melden uns schnellstmöglich zurück.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kontaktdaten */}
          <div className="space-y-4">
            <a
              href={`tel:${CUSTOMER_PROFILE.phone.replace(/\s+/g, "")}`}
              className="flex items-start space-x-4 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:border-blue-300 transition"
            >
              <div className="p-3 bg-blue-600/10 text-blue-600 rounded-xl">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Telefon</p>
                <p className="text-sm text-slate-600 mt-0.5">
                  {CUSTOMER_PROFILE.phone}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${CUSTOMER_PROFILE.email}`}
              className="flex items-start space-x-4 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:border-blue-300 transition"
            >
              <div className="p-3 bg-emerald-600/10 text-emerald-600 rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">E-Mail</p>
                <p className="text-sm text-slate-600 mt-0.5 break-all">
                  {CUSTOMER_PROFILE.email}
                </p>
              </div>
            </a>

            <div className="flex items-start space-x-4 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="p-3 bg-amber-600/10 text-amber-600 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Anschrift</p>
                <p className="text-sm text-slate-600 mt-0.5">
                  {CUSTOMER_PROFILE.name}
                </p>
                <p className="text-sm text-slate-600">
                  {CUSTOMER_PROFILE.street}
                </p>
                <p className="text-sm text-slate-600">
                  {CUSTOMER_PROFILE.zip} {CUSTOMER_PROFILE.city}
                </p>
              </div>
            </div>
          </div>

          {/* Formular */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Nachricht senden
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
