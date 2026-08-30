'use client';

import React from 'react';
import PartnerWidget from '@/components/PartnerWidget';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck, CheckCircle2, Briefcase } from 'lucide-react';
import { PARTNER_WIDGETS } from '@/lib/partnerWidgets';
import Leistungsvergleich from '@/components/Leistungsvergleich';
import { LEISTUNGEN } from '@/lib/leistungen';

const buFaqs = [
  {
    question: "Warum ist die Berufsunfähigkeitsversicherung so wichtig?",
    answer: "Statistisch wird jeder vierte Arbeitnehmer im Laufe seines Lebens vorübergehend oder dauerhaft berufsunfähig – meistens durch psychische Erkrankungen (z. B. Burnout, Depression) oder Erkrankungen des Bewegungsapparats. Die staatliche Erwerbsminderungsrente reicht im Ernstfall nicht zum Leben aus."
  },
  {
    question: "Was bedeutet der Verzicht auf abstrakte Verweisung?",
    answer: "Das ist die wichtigste Klausel überhaupt: Der Versicherer darf Sie bei Berufsunfähigkeit nicht auf einen theoretisch anderen Beruf verweisen (z. B. Pförtner), sondern muss zahlen, wenn Sie Ihren zuletzt ausgeübten Beruf zu mindestens 50 % nicht mehr ausüben können."
  },
  {
    question: "Wann sollte man eine BU abschließen?",
    answer: "Je jünger und gesünder Sie beim Abschluss sind, desto günstiger sind die Monatsbeiträge für die gesamte Vertragslaufzeit. Zudem gibt es noch keine oder kaum Vorerkrankungen, die zu Ausschlüssen oder Risikozuschlägen führen könnten."
  }
];

export default function BerufsunfaehigkeitPage() {
  const widget = PARTNER_WIDGETS.berufsunfaehigkeit;

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Vorsorge & Leben
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Berufsunfähigkeitsversicherung <span className="text-purple-600">(BU) Vergleich</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Sichern Sie Ihr wertvollstes Gut: Ihr monatliches Arbeitseinkommen. Vergleichen Sie zertifizierte BU-Tarife im offiziellen Live-Rechner.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-emerald-700">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Verzicht auf abstrakte Verweisung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> 100% anonyme & unverbindliche Berechnung</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> Nachversicherungsgarantie ohne Gesundheitsprüfung</span>
          </div>
        </div>

        {/* Live Partner Widget */}
        <div className="mb-14">
          <PartnerWidget
            containerId={widget.containerId}
            scriptSrc={widget.scriptSrc}
            directLink={widget.directLink}
            title="Offizieller BU-Tarifrechner"
            badgeText="Existenzschutz Nr. 1"
            minHeight="700px"
          />
        </div>

        {/* Ratgeber-Sektion */}
        <div className="premium-card p-8 mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Dein wertvollstes Gut schützen: Sichere dein monatliches Einkommen ab</h2>
              <p className="text-xs text-slate-500 mt-0.5">Berufsunfähigkeitsversicherung (BU) einfach erklärt</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            Hast du dir schon einmal überlegt, wie viel Geld du im Laufe deines Arbeitslebens verdienst? Für die meisten Menschen ist das eigene Gehalt ein Millionenvermögen. Doch was passiert, wenn du deinen Beruf durch eine unerwartete Krankheit, ein Burnout oder einen Unfall langfristig nicht mehr ausüben kannst?
          </p>
          <div className="bg-red-50 border border-red-200/70 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-800 mb-1">⚠️ Die gefährliche gesetzliche Lücke</p>
            <p className="text-xs text-red-700 leading-relaxed">Wer nach 1961 geboren ist, erhält vom Staat keine gesetzliche Berufsunfähigkeitsrente mehr. Die staatliche Erwerbsminderungsrente greift erst, wenn du gar keiner Tätigkeit am Arbeitsmarkt mehr nachgehen kannst – und selbst dann reicht die staatliche Hilfe meist kaum aus, um den gewohnten Lebensstandard oder laufende Mieten und Kredite zu decken.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">💰 Monatliche Rente sichern</p>
              <p className="text-xs text-slate-500">Du bestimmst die Höhe deiner gewünschten monatlichen BU-Rente, die im Leistungsfall zuverlässig ausgezahlt wird.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-1">🛡️ Schutz bei allen Berufen</p>
              <p className="text-xs text-slate-500">Egal ob Bürokraft, Handwerker, Pflegekraft oder Akademiker – der Schutz gilt exakt für deinen zuletzt ausgeübten Beruf.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <p className="font-bold text-emerald-900 text-sm mb-1">📅 Früh abschließen & sparen</p>
              <p className="text-xs text-emerald-700">Je jünger und gesünder du bei Vertragsabschluss bist, desto günstiger sind deine monatlichen Beiträge über die gesamte Laufzeit.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <Leistungsvergleich
            title={LEISTUNGEN.berufsunfaehigkeit.title}
            subtitle={LEISTUNGEN.berufsunfaehigkeit.subtitle}
            merkmale={LEISTUNGEN.berufsunfaehigkeit.merkmale}
          />
        </div>

        <FAQAccordion items={buFaqs} title="Häufige Fragen zur Berufsunfähigkeitsversicherung" />
      </div>
    </div>
  );
}
