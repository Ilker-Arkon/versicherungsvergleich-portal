import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { PhoneCall, MessageCircle, CheckCircle2, Clock, Mail } from "lucide-react";
import { CUSTOMER_PROFILE } from "@/lib/data";
import { PHONE_URL, WHATSAPP_URL } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/**
 * „Ihr persönlicher Ansprechpartner"-Sektion für die Startseite.
 *
 * Platzierung: Zwischen dem „Warum Verbraucher auf uns setzen"-Block und
 * der FAQ-Sektion. Zeigt das Foto des Beraters, seine Kontaktdaten und
 * direkte Erreichbarkeit per WhatsApp & Telefon.
 */
export default function AdvisorSection() {
  const benefits = [
    "Kostenlose Erstberatung – kein Kleingedrucktes",
    "Unabhängig: Kein Anbieter zahlt für unser Urteil",
    "Hilfe bei Kündigung, Wechsel & Unterlagen",
    "Antwort in der Regel innerhalb von 24 Stunden",
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Ihr persönlicher Ansprechpartner
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4">
            Echte Beratung statt anonymer Algorithmen
          </h2>
          <p className="text-slate-500 text-base mt-3 max-w-2xl mx-auto">
            Vergleichen Sie bequem online – und wenn Sie Fragen haben oder
            nicht weiterwissen, bin ich persönlich für Sie da.
          </p>
        </div>

        {/* Main card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Photo */}
            <div className="relative h-96 sm:h-[480px] lg:h-auto min-h-[480px] lg:min-h-[520px] overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
              <Image
                src="/berater-hueseyin-guelec.jpg"
                alt={`${CUSTOMER_PROFILE.name} – Ihr persönlicher Versicherungsberater bei SicherTarif`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                priority
              />
              {/* Availability badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {CUSTOMER_PROFILE.serviceHours}
                </span>
              </div>
            </div>

            {/* Right: Info & CTAs */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              {/* Name & title */}
              <div className="mb-6">
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-1">
                  Unabhängiger Versicherungsmakler
                </p>
                <h3 className={`text-3xl sm:text-4xl text-white font-semibold tracking-wide ${playfair.className}`}>
                  Herr Gülec
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  {CUSTOMER_PROFILE.city} · Ihr persönlicher Ansprechpartner
                </p>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-blue-500 pl-4 mb-6">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  „Sie sind unsicher, welcher Tarif der richtige ist, oder
                  kommen im Rechner nicht weiter? Schreiben Sie mir direkt oder
                  rufen Sie an – ich helfe Ihnen unkompliziert und kostenlos
                  weiter."
                </p>
              </blockquote>

              {/* Benefits list */}
              <ul className="space-y-2 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Klickbare Kontakt-Leiste mit oberen/unteren Linien & Trennlinien */}
              <div className="border-y border-slate-700/70 py-3.5 my-6">
                <div className="grid grid-cols-3 divide-x divide-slate-700/70 text-center">
                  {/* 1. WhatsApp */}
                  {WHATSAPP_URL ? (
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-1.5 sm:gap-2 py-1 px-2 text-slate-200 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm sm:text-base font-semibold">WhatsApp</span>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-400 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300 ease-out" />
                    </a>
                  ) : null}

                  {/* 2. Anruf */}
                  <a
                    href={PHONE_URL}
                    className="group relative flex items-center justify-center gap-1.5 sm:gap-2 py-1 px-2 text-slate-200 hover:text-blue-400 transition-colors duration-200"
                  >
                    <PhoneCall className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm sm:text-base font-semibold">Anruf</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-400 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300 ease-out" />
                  </a>

                  {/* 3. Mail */}
                  <a
                    href={`mailto:${CUSTOMER_PROFILE.email}`}
                    className="group relative flex items-center justify-center gap-1.5 sm:gap-2 py-1 px-2 text-slate-200 hover:text-sky-300 transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm sm:text-base font-semibold">Mail</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sky-400 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300 ease-out" />
                  </a>
                </div>
              </div>

              {/* Service hours note */}
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Persönliche Beratung {CUSTOMER_PROFILE.serviceHours} · {CUSTOMER_PROFILE.responseTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
