import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, FileText, PhoneCall, Handshake } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { GENERAL_FAQS } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Tarife vergleichen. <span className="text-blue-200">Sofort sparen.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-50">
                Versicherungen & Finanzen — 100 % kostenlos, unverbindlich und in unter 3 Minuten zum besten Angebot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kfz-versicherung"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-center shadow-lg"
                >
                  KFZ vergleichen
                </Link>
                <Link
                  href="/haftpflicht"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-center"
                >
                  Haftpflicht vergleichen
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
                  alt="Versicherungsvergleich - Familie und Sicherheit"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Kostenlos & Unverbindlich</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="text-5xl font-bold text-blue-600 mb-2">300+</div>
              <div className="text-slate-600 font-medium">Versicherer im Vergleich</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="text-5xl font-bold text-blue-600 mb-2">850€</div>
              <div className="text-slate-600 font-medium">Durchschnittliche Ersparnis</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Category Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Welche Versicherung möchten Sie vergleichen?
            </h2>
            <p className="text-xl text-slate-600">
              Wählen Sie den passenden Vergleichsrechner für Ihre Bedürfnisse
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* KFZ */}
            <Link href="/kfz-versicherung" className="group">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80"
                    alt="KFZ-Versicherung"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">KFZ</h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    TOP
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Vergleichen Sie über 330 Kfz-Tarife und sparen Sie bis zu 850€ pro Jahr.
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition">
                    Jetzt vergleichen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Haftpflicht */}
            <Link href="/haftpflicht" className="group">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80"
                    alt="Haftpflichtversicherung"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Haftpflicht</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Die wichtigste Versicherung! Schützen Sie sich vor hohen Schadensersatzforderungen.
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition">
                    Jetzt vergleichen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Hausrat */}
            <Link href="/hausrat" className="group">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
                    alt="Hausratversicherung"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Hausrat</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Schützen Sie Ihr Hab und Gut vor Einbruch, Feuer und Wasserschäden.
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition">
                    Jetzt vergleichen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Rechtsschutz */}
            <Link href="/rechtsschutz-versicherung" className="group">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"
                    alt="Rechtsschutzversicherung"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Rechtsschutz</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Sichern Sie sich effektiv ab gegen hohe Anwalts- und Gerichtskosten.
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition">
                    Jetzt vergleichen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us / Vorteile Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ihre Vorteile auf einen Blick
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition">
              <div className="text-blue-600 mb-6">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">100% Kostenlos</h3>
              <p className="text-slate-600 leading-relaxed">
                Unser Vergleichsrechner ist komplett kostenlos, transparent und ohne versteckte Gebühren.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition">
              <div className="text-blue-600 mb-6">
                <Clock className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Schneller Wechsel</h3>
              <p className="text-slate-600 leading-relaxed">
                Wechseln Sie in wenigen Minuten digital zu einer günstigeren Versicherung.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition">
              <div className="text-blue-600 mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">TÜV-geprüft</h3>
              <p className="text-slate-600 leading-relaxed">
                Alle unsere angebundenen Versicherer und Rechner sind TÜV-geprüft und zertifiziert.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition">
              <div className="text-blue-600 mb-6">
                <FileText className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Bis zu 850€ sparen</h3>
              <p className="text-slate-600 leading-relaxed">
                Durchschnittliche jährliche Ersparnis beim Versicherungswechsel über unsere Tarifrechner.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition">
              <div className="text-blue-600 mb-6">
                <Handshake className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Jährlich kündbar</h3>
              <p className="text-slate-600 leading-relaxed">
                Flexible Vertragslaufzeiten und jährliches Kündigungsrecht für maximale Freiheit.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition">
              <div className="text-blue-600 mb-6">
                <PhoneCall className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Persönliche Beratung</h3>
              <p className="text-slate-600 leading-relaxed">
                Bei Fragen oder Unklarheiten steht Ihnen unser Expertenteam jederzeit zur Verfügung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section (Kept for SEO/Value) */}
      <FAQAccordion items={GENERAL_FAQS} title="Häufig gestellte Fragen" />

      {/* 6. Final Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bereit für Ihren Fixkosten-Check?</h2>
          <p className="text-xl mb-10 text-blue-50">
            Starten Sie jetzt unverbindlich und entdecken Sie Ihr persönliches Sparpotenzial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kfz-versicherung"
              className="inline-flex justify-center items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition text-lg shadow-lg"
            >
              KFZ vergleichen
            </Link>
            <Link
              href="/haftpflicht"
              className="inline-flex justify-center items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition text-lg"
            >
              Haftpflicht vergleichen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
