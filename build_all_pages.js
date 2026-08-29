const fs = require('fs');
const path = require('path');

function save(p, content) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, content.trim(), 'utf8');
}

// 1. KFZ
save('app/kfz-versicherung/page.tsx', `'use client';

import React from 'react';
import InteractiveCalculator from '@/components/InteractiveCalculator';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';
import { ShieldCheck } from 'lucide-react';

const kfzTariffs: TariffRow[] = [
  {
    id: 'huk24-classic',
    provider: 'HUK24',
    logoText: 'HUK',
    tariffName: 'Classic Kfz-Tarif',
    priceMonthly: 31.50,
    priceYearly: 378.00,
    rating: 4.9,
    reviewCount: 3420,
    benefits: ['100 Mio. € Deckungssumme', 'Freie Werkstattwahl wählbar', 'Mallorca-Police inklusive', 'Schutzbrief ab 9 € / Jahr'],
    bonus: 'Bis zu 850 € Sparpotenzial',
    isTestsieger: true,
    ctaText: 'Jetzt kostenlos vergleichen'
  },
  {
    id: 'allianz-direct',
    provider: 'Allianz Direct',
    logoText: 'ALZ',
    tariffName: 'Direct Plus Vollkasko',
    priceMonthly: 34.20,
    priceYearly: 410.40,
    rating: 4.8,
    reviewCount: 2890,
    benefits: ['Neupreisentschädigung 24 Monate', 'Marderbiss & Folgeschäden bis 10.000 €', 'Tierbiss aller Tierarten', 'Schnelle 24h Schadenregulierung'],
    bonus: '50 € Amazon Gutschein bei Wechsel',
    isTestsieger: false,
    ctaText: 'Tarif anzeigen'
  },
  {
    id: 'cosmos-comfort',
    provider: 'CosmosDirekt',
    logoText: 'COS',
    tariffName: 'Comfort Schutz',
    priceMonthly: 28.90,
    priceYearly: 346.80,
    rating: 4.7,
    reviewCount: 1950,
    benefits: ['Fahrerschutzversicherung inkl.', 'Grobe Fahrlässigkeit mitversichert', 'Schaden-Soforthilfe per App', 'Täglich kündbar im 1. Monat'],
    bonus: 'Sonderrabatt für Garagenbesitzer',
    isTestsieger: false,
    ctaText: 'Jetzt berechnen'
  },
  {
    id: 'ergo-smart',
    provider: 'ERGO Direkt',
    logoText: 'ERG',
    tariffName: 'Smart Drive Kasko',
    priceMonthly: 36.80,
    priceYearly: 441.60,
    rating: 4.7,
    reviewCount: 1420,
    benefits: ['Schadenfreiheitsrabatt-Retter', 'Zusatzfahrer flexibel zubuchbar', 'Elektro- & Hybrid-Akkuschutz', '24/7 Notfallservice'],
    isTestsieger: false,
    ctaText: 'Angebot anfordern'
  }
];

const kfzFaqs = [
  {
    question: "Wann kann ich meine Kfz-Versicherung wechseln?",
    answer: "Der reguläre Stichtag für den Wechsel der Autoversicherung ist der 30. November. Bei einer Beitragserhöhung, einem Schadenfall oder einem Fahrzeugwechsel haben Sie zudem ein 4-wöchiges Sonderkündigungsrecht."
  },
  {
    question: "Übernimmt der neue Anbieter die Kündigung für mich?",
    answer: "Ja! Beim regulären Wechsel zum 30.11. oder bei Neuabschluss können Sie im Antrag einfach den automatischen Kündigungsservice aktivieren."
  },
  {
    question: "Was bedeutet SF-Klasse und wie wird sie übertragen?",
    answer: "Die Schadenfreiheitsklasse (SF-Klasse) bestimmt Ihren Rabatt anhand unfallfreier Jahre. Beim Wechsel übermittelt Ihr bisheriger Versicherer die SF-Klasse automatisch an den neuen Anbieter."
  }
];

export default function KfzPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Fahrzeug & Mobilität
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Kfz-Versicherung vergleichen & bis zu <span className="text-blue-600">850 € sparen</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Über 330 Kfz-Tarife im transparenten Echtzeit-Vergleich. Sichern Sie sich starken Vollkasko- oder Teilkaskoschutz mit garantierter Beitragsersparnis und vollem Schadenservice.
          </p>
        </div>

        <div className="mb-14">
          <InteractiveCalculator title="Kfz-Versicherungs-Tarifrechner" categorySlug="kfz" />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />
            Worauf Sie beim Kfz-Versicherungsvergleich 2026 achten sollten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">1. Deckungssumme 100 Mio. €</p>
              <p className="text-xs text-slate-500">Wählen Sie stets die pauschale Höchstdeckung von 100 Mio. € für Personen-, Sach- und Vermögensschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">2. Erweiterte Elementarschäden</p>
              <p className="text-xs text-slate-500">Achten Sie auf Absicherung bei Lawinen, Muren, Erdrutsch sowie Tierbisse aller Art inkl. Folgeschäden.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-1">3. Mallorca-Police</p>
              <p className="text-xs text-slate-500">Erhöht die oft zu niedrigen Mindestdeckungssummen bei Mietwagen im europäischen Ausland auf deutsches Niveau.</p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten Kfz-Versicherungstarife 2026"
            subtitle="Geprüfte Tarife mit Bestnoten bei Stiftung Warentest & Focus Money"
            productType="Kfz-Versicherung"
            tariffs={kfzTariffs}
          />
        </div>

        <FAQAccordion items={kfzFaqs} title="Häufige Fragen zur Kfz-Versicherung" />
      </div>
    </div>
  );
}
`);

// 2. PKV
save('app/pkv/page.tsx', `'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const pkvTariffs: TariffRow[] = [
  {
    id: 'hallesche-nk',
    provider: 'HALLESCHE',
    logoText: 'HAL',
    tariffName: 'Primo / NK Select Premium',
    priceMonthly: 312.00,
    priceYearly: 3744.00,
    rating: 4.9,
    reviewCount: 1840,
    benefits: ['Chefarztbehandlung & 1-Bett-Zimmer', 'Zahnersatz bis zu 90%', 'Hohe Beitragsrückerstattung bei Leistungsfreiheit', 'Heilpraktiker & Naturheilverfahren inkl.'],
    bonus: 'Bis zu 1.200 € Beitragsrückzahlung / Jahr',
    isTestsieger: true,
    ctaText: 'Angebot kostenlos anfordern'
  },
  {
    id: 'signal-iduna',
    provider: 'SIGNAL IDUNA',
    logoText: 'SIG',
    tariffName: 'Exklusiv-Plus Tarif',
    priceMonthly: 345.00,
    priceYearly: 4140.00,
    rating: 4.8,
    reviewCount: 2150,
    benefits: ['Weltweiter Versicherungsschutz', 'Offener Hilfsmittelkatalog', 'Freie Arzt- und Klinikwahl', 'Inkl. Kurtagegeld & Psychotherapie'],
    bonus: 'Sonderkonditionen für Angestellte & Beamte',
    isTestsieger: false,
    ctaText: 'Tarif prüfen'
  },
  {
    id: 'hansemerkur',
    provider: 'HanseMerkur',
    logoText: 'HM',
    tariffName: 'Business Fit PKV',
    priceMonthly: 268.00,
    priceYearly: 3216.00,
    rating: 4.7,
    reviewCount: 3120,
    benefits: ['Attraktiver Einstiegsbeitrag für Gründer', 'Vorsorgeuntersuchungen ohne SB', 'Arbeitgeberzuschuss bis zu 50%', 'Digitale Gesundheits-App'],
    bonus: 'Besonders beliebt bei Selbstständigen',
    isTestsieger: false,
    ctaText: 'Jetzt vergleichen'
  }
];

const pkvFaqs = [
  {
    question: "Wer kann in die Private Krankenversicherung wechseln?",
    answer: "In die PKV wechseln können Selbstständige, Freiberufler, Beamte (und Beamtenanwärter) sowie Angestellte, deren Jahresbruttoeinkommen über der Versicherungspflichtgrenze (JAEG) liegt."
  },
  {
    question: "Zahlt der Arbeitgeber auch bei der PKV einen Zuschuss?",
    answer: "Ja, angestellte PKV-Versicherte erhalten vom Arbeitgeber denselben steuerfreien Beitragszuschuss wie in der gesetzlichen Kasse (bis zu 50 % des Beitrags)."
  },
  {
    question: "Wie stabil sind die Beiträge im Alter?",
    answer: "Moderne PKV-Tarife bilden gesetzliche Alterungsrückstellungen und bieten flexible Entlastungstarife, um Beiträge im Ruhestand stabil und bezahlbar zu halten."
  }
];

export default function PKVPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Gesundheit & Personenschutz
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Private Krankenversicherung: <span className="text-rose-600">Top-Medizin zum Sparpreis</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Maßgeschneiderte PKV-Tarife für Selbstständige, Beamte und Angestellte. Chefarztbehandlung, beste Klinikunterbringung und bis zu 2.400 € Beitragsersparnis im Jahr.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten PKV-Tarife im Vergleich"
            subtitle="Zertifizierte Tarife mit herausragender Leistungsabdeckung und solider Beitragsstabilität"
            productType="Private Krankenversicherung"
            tariffs={pkvTariffs}
          />
        </div>

        <FAQAccordion items={pkvFaqs} title="Häufige Fragen zur Privaten Krankenversicherung" />
      </div>
    </div>
  );
}
`);

// 3. Wohngebäude
save('app/wohngebaeude-versicherung/page.tsx', `'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const wohngebaeudeTariffs: TariffRow[] = [
  {
    id: 'rhion-gebaeude',
    provider: 'Rhion Digital',
    logoText: 'RHI',
    tariffName: 'Wohngebäude Exzellent Plus',
    priceMonthly: 18.50,
    priceYearly: 222.00,
    rating: 4.9,
    reviewCount: 1120,
    benefits: ['Inkl. Elementargefahren (Starkregen, Überschwemmung)', 'Grobe Fahrlässigkeit bis 100% mitversichert', 'Photovoltaik- & Wärmepumpenschutz', 'Aufräum- & Abbruchkosten unbegrenzt'],
    isTestsieger: true,
    ctaText: 'Jetzt berechnen'
  },
  {
    id: 'arag-gebaeude',
    provider: 'ARAG',
    logoText: 'ARA',
    tariffName: 'Premium Gebäude-Schutz',
    priceMonthly: 21.30,
    priceYearly: 255.60,
    rating: 4.8,
    reviewCount: 940,
    benefits: ['Rohrbruch- & Frostschäden an Außenleitungen', 'Graffiti-Beseitigung & Vandalismus', 'Hotelkosten bei Unbewohnbarkeit bis 200 Tage', '24h Handwerker-Sofortservice'],
    isTestsieger: false,
    ctaText: 'Tarif wählen'
  },
  {
    id: 'ergo-gebaeude',
    provider: 'ERGO',
    logoText: 'ERG',
    tariffName: 'Klassik Wohngebäude',
    priceMonthly: 16.90,
    priceYearly: 202.80,
    rating: 4.7,
    reviewCount: 1650,
    benefits: ['Feuer, Leitungswasser, Sturm & Hagel', 'Schäden durch Überspannung & Blitzschlag', 'Verzicht auf Einwand grober Fahrlässigkeit', 'Attraktiver Neubaurabatt bis zu 40%'],
    isTestsieger: false,
    ctaText: 'Jetzt vergleichen'
  }
];

const faqs = [
  {
    question: "Was deckt eine Wohngebäudeversicherung genau ab?",
    answer: "Die Wohngebäudeversicherung sichert das Gebäude selbst sowie alle fest eingebauten Teile (Heizung, Fenster, Sanitäreinrichtungen) gegen Schäden durch Feuer, Leitungswasser, Sturm und Hagel ab."
  },
  {
    question: "Warum ist die Elementarschadendeckung so wichtig?",
    answer: "Starkregen, Hochwasser, Schneedruck und Erdbeben sind in der Standardpolice meist nicht enthalten. Durch den Klimawandel häufen sich Extremwetterereignisse – die Elementarschadenklausel schützt vor dem finanziellen Ruin."
  }
];

export default function WohngebaeudePage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Eigentum, Wohnen & Recht
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Wohngebäudeversicherung: <span className="text-emerald-600">Rundum-Schutz fürs Haus</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schützen Sie Ihre Immobilie zuverlässig vor Sturm-, Brand-, Leitungswasser- und Elementarschäden. Günstige Tarife mit bis zu 480 € Ersparnis pro Jahr.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Wohngebäudeversicherungen im Vergleich"
            subtitle="Inklusive modernem Elementarschutz & Neubau-Vorteilen"
            productType="Wohngebäudeversicherung"
            tariffs={wohngebaeudeTariffs}
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zur Wohngebäudeversicherung" />
      </div>
    </div>
  );
}
`);

// 4. Girokonto
save('app/girokonto-vergleich/page.tsx', `'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const girokontoTariffs: TariffRow[] = [
  {
    id: 'comdirect-giro',
    provider: 'comdirect',
    logoText: 'COM',
    tariffName: 'Girokonto Aktiv',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.9,
    reviewCount: 5410,
    benefits: ['0 € Kontoführungsgebühr bei aktiver Nutzung', 'Kostenlose Visa-Debitkarte & girocard', 'Weltweit kostenfrei Bargeld abheben', 'Apple Pay & Google Pay'],
    bonus: 'Bis zu 150 € Willkommensbonus',
    isTestsieger: true,
    ctaText: 'Konto online eröffnen'
  },
  {
    id: 'dkb-giro',
    provider: 'DKB',
    logoText: 'DKB',
    tariffName: 'DKB Cash Girokonto',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.8,
    reviewCount: 8900,
    benefits: ['0 € Kontoführung für Aktivkunden', 'Kostenfreie Visa Debitkarte', 'Weltweit ohne Auslandseinsatzentgelt bezahlen', 'Attraktives Tagesgeld-Konto zubuchbar'],
    bonus: 'Kostenloser Kontowechsel-Service in 8 Min.',
    isTestsieger: false,
    ctaText: 'Jetzt beantragen'
  },
  {
    id: 'ing-giro',
    provider: 'ING',
    logoText: 'ING',
    tariffName: 'Girokonto Free',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.9,
    reviewCount: 12400,
    benefits: ['0 € Kontoführung ab 700 € Geldeingang', 'Kostenlos Bargeld an 97% aller Geldautomaten', 'Ausgezeichnete Mobile-Banking App', 'Zusätzliches Extra-Konto mit Top-Zinsen'],
    bonus: '200 € Neukundenprämie',
    isTestsieger: true,
    ctaText: 'Prämie sichern'
  },
  {
    id: 'n26-standard',
    provider: 'N26',
    logoText: 'N26',
    tariffName: 'N26 Standard Smart',
    priceMonthly: 0.00,
    priceYearly: 0.00,
    rating: 4.7,
    reviewCount: 6300,
    benefits: ['Bedingungslos 0 € ohne Mindestgeldeingang', '100% mobiles Smartphone-Banking', 'Echtzeit-Push-Nachrichten bei jeder Transaktion', 'Virtuelle Mastercard sofort einsatzbereit'],
    isTestsieger: false,
    ctaText: 'In 5 Min. eröffnen'
  }
];

const girokontoFaqs = [
  {
    question: "Wie funktioniert der Kontowechselservice?",
    answer: "Der gesetzliche Wechselservice ist für Sie vollständig automatisiert. Die neue Bank informiert alle Lastschriftempfänger (z. B. Strom, Miete, Fitnessstudio) und richtet Ihre bestehenden Daueraufträge neu ein."
  },
  {
    question: "Welche Voraussetzungen gibt es für das kostenlose Girokonto?",
    answer: "Die meisten Direktbanken verlangen entweder keinen Mindestgeldeingang (wie N26) oder einen monatlichen Geldeingang von 700 € (z. B. Gehalt, Rente), um die Kontoführungsgebühr dauerhaft auf 0 € zu setzen."
  }
];

export default function GirokontoPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Finanzen & Banken
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Girokonto-Vergleich: <span className="text-amber-600">0 € Gebühren + bis 200 € Prämie</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Vergleichen Sie die besten gebührenfreien Girokonten mit Gratis-Debitkarte, weltweiter Bargeldversorgung und automatischem Wechselservice.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Kostenlose Girokonten im Vergleich 2026"
            subtitle="Inklusive Prämien, Karten und Dispozinsen"
            productType="Girokonto"
            tariffs={girokontoTariffs}
          />
        </div>

        <FAQAccordion items={girokontoFaqs} title="Häufige Fragen zum Girokonto-Wechsel" />
      </div>
    </div>
  );
}
`);

// 5. Rechtsschutz
save('app/rechtsschutz-versicherung/page.tsx', `'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const rechtsschutzTariffs: TariffRow[] = [
  {
    id: 'arag-aktiv',
    provider: 'ARAG',
    logoText: 'ARA',
    tariffName: 'Aktiv-Rechtsschutz Premium',
    priceMonthly: 19.80,
    priceYearly: 237.60,
    rating: 4.9,
    reviewCount: 3200,
    benefits: ['Privat-, Berufs-, Verkehrs- & Mietrechtsschutz', 'Unbegrenzte Versicherungssumme weltweit', 'Kostenlose 24/7 telefonische Anwaltsberatung', 'Ohne Wartezeit im Arbeits- & Verkehrsrecht'],
    bonus: 'Keine Selbstbeteiligung bei Partneranwalt',
    isTestsieger: true,
    ctaText: 'Jetzt vergleichen'
  },
  {
    id: 'adac-recht',
    provider: 'ADAC Schutz',
    logoText: 'ADA',
    tariffName: 'Kompakt Rechtsschutz',
    priceMonthly: 15.40,
    priceYearly: 184.80,
    rating: 4.8,
    reviewCount: 4100,
    benefits: ['Hervorragender Verkehrsrechtsschutz', 'Schutz für die gesamte Familie', 'Mediation & außergerichtliche Streitbeilegung', 'Kostenübernahme für Gutachter & Zeugen'],
    isTestsieger: false,
    ctaText: 'Tarif berechnen'
  },
  {
    id: 'roland-komfort',
    provider: 'ROLAND',
    logoText: 'ROL',
    tariffName: 'Komfort-Rechtsschutz',
    priceMonthly: 22.10,
    priceYearly: 265.20,
    rating: 4.7,
    reviewCount: 1450,
    benefits: ['Freie Anwaltswahl in ganz Deutschland', 'Cyber-Rechtsschutz für Online-Käufe inkl.', 'Steuer- & Sozialrechtsschutz vor Gerichten', 'Vorsorge-Rechtsschutz bei Erbschaftsberatung'],
    isTestsieger: false,
    ctaText: 'Tarif wählen'
  }
];

const faqs = [
  {
    question: "Gibt es Rechtsschutzversicherungen ohne Wartezeit?",
    answer: "Im Verkehrsrecht und bei telefonischer Erstberatung gilt oft keine Wartezeit. Im Arbeits- und Mietrechtsschutz beträgt die übliche Wartezeit 3 Monate, es sei denn, Sie wechseln nahtlos von einer Vorversicherung."
  },
  {
    question: "Welche Bereiche deckt der Rundum-Rechtsschutz ab?",
    answer: "Ein Komplettpaket deckt die 4 zentralen Säulen ab: Privat-Rechtsschutz, Berufs-Rechtsschutz (Arbeitsrecht), Verkehrs-Rechtsschutz und Wohn-/Miet-Rechtsschutz."
  }
];

export default function RechtsschutzPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Eigentum, Wohnen & Recht
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Rechtsschutzversicherung: <span className="text-emerald-600">Ihr gutes Recht absichern</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Übernehmen Sie keine Anwalts- und Gerichtskosten mehr aus eigener Tasche. Top-Tarife für Privat, Beruf, Verkehr und Miete ab 15,40 € monatlich.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Die besten Rechtsschutz-Tarife 2026"
            subtitle="Testsieger mit freier Anwaltswahl und Sofort-Beratung"
            productType="Rechtsschutzversicherung"
            tariffs={rechtsschutzTariffs}
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zum Rechtsschutz" />
      </div>
    </div>
  );
}
`);

// 6. Strom & Gas
save('app/strom-gas-vergleich/page.tsx', `'use client';

import React from 'react';
import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';
import FAQAccordion from '@/components/FAQAccordion';

const stromTariffs: TariffRow[] = [
  {
    id: 'vattenfall-strom',
    provider: 'Vattenfall',
    logoText: 'VAT',
    tariffName: 'NaturStrom Easy 12',
    priceMonthly: 68.50,
    priceYearly: 822.00,
    rating: 4.9,
    reviewCount: 8900,
    benefits: ['100% zertifizierter Ökostrom aus Wasserkraft', '12 Monate volle Preisgarantie', 'Günstiger Arbeitspreis (26,4 ct/kWh)', 'Voller Wechselservice ohne Stromunterbrechung'],
    bonus: '180 € Sofortbonus + Neukundenrabatt',
    isTestsieger: true,
    ctaText: 'Jetzt wechseln & sparen'
  },
  {
    id: 'eon-strom',
    provider: 'E.ON',
    logoText: 'EON',
    tariffName: 'E.ON Strom Öko 24',
    priceMonthly: 72.00,
    priceYearly: 864.00,
    rating: 4.8,
    reviewCount: 14200,
    benefits: ['24 Monate Preissicherheit', 'Klimaneutral durch Ausgleichszertifikate', 'Prämienprogramm im E.ON Vorteilsportal', 'Smart-Meter ready'],
    bonus: '150 € Wechselbonus',
    isTestsieger: false,
    ctaText: 'Tarif prüfen'
  },
  {
    id: 'greenpeace-strom',
    provider: 'Green Planet Energy',
    logoText: 'GPE',
    tariffName: 'Ökostrom Aktiv',
    priceMonthly: 74.50,
    priceYearly: 894.00,
    rating: 4.9,
    reviewCount: 4100,
    benefits: ['100% sauberer Strom aus Wind- & Solarparks', 'Frei von Kohle- & Atomstrom', 'Förderung des regionalen Netzausbaus', 'Keine Mindestvertragslaufzeit'],
    isTestsieger: false,
    ctaText: 'Ökostrom wählen'
  }
];

const faqs = [
  {
    question: "Kann mir beim Stromwechsel der Strom abgestellt werden?",
    answer: "Nein, niemals! Die unterbrechungsfreie Stromversorgung ist in Deutschland gesetzlich garantiert. Sollte beim Wechselprozess etwas verzögert sein, springt nahtlos die Grundversorgung ein."
  },
  {
    question: "Wie viel Geld kann ich durch den Wechsel sparen?",
    answer: "Verbraucher, die noch im Basistarif des Grundversorgers sind, sparen durch den Wechsel zu einem günstigen Alternativtarif durchschnittlich 750 € bis 900 € im Jahr bei Strom und Gas."
  }
];

export default function StromGasPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Energie & Haushalt
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Strom- & Gastarife vergleichen: <span className="text-emerald-600">Bis 900 € sparen</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Senken Sie Ihre monatlichen Energiekosten mit wenigen Klicks. TÜV-geprüfte Anbieter, garantierte Preisstabilität und attraktive Sofortboni.
          </p>
        </div>

        <div className="mb-14">
          <ComparisonTable 
            title="Aktuelle Stromtarife im Vergleich"
            subtitle="Berechnet für einen Durchschnittshaushalt (2.500 kWh / Jahr)"
            productType="Strom & Gas"
            tariffs={stromTariffs}
          />
        </div>

        <FAQAccordion items={faqs} title="Häufige Fragen zum Strom- & Gasanbieterwechsel" />
      </div>
    </div>
  );
}
`);

// 7. Weitere Unterseiten
const remainingPages = [
  { slug: 'motorrad-versicherung', title: 'Motorradversicherung', category: 'Fahrzeug & Mobilität', desc: 'Saison- & Ganzjahreskennzeichen für Bikes & Roller im Sparvergleich.', savings: 'Ø 320 € / Jahr' },
  { slug: 'mietwagen-vergleich', title: 'Mietwagen-Vergleich', category: 'Fahrzeug & Mobilität', desc: 'Günstige Mietautos weltweit mit Vollkasko ohne Selbstbeteiligung.', savings: 'Bis zu 45% sparen' },
  { slug: 'haftpflicht-hausrat', title: 'Privathaftpflicht & Hausrat', category: 'Eigentum, Wohnen & Recht', desc: 'Der unverzichtbare Basisschutz für Familie, Wohnung und Vermögen.', savings: 'Ø 210 € / Jahr' },
  { slug: 'unfallversicherung', title: 'Unfallversicherung', category: 'Gesundheit & Personenschutz', desc: '24/7 weltweiter Schutz bei Freizeit-, Sport- und Haushaltsunfällen.', savings: 'Ø 190 € / Jahr' },
  { slug: 'kredit-vergleich', title: 'Kredit & Ratenkredit', category: 'Finanzen & Banken', desc: 'Günstige Umschuldung, Modernisierungskredite und freie Verwendung mit Top-Zinsen.', savings: 'Bis zu 1.200 € Zinsersparnis' },
  { slug: 'reiseversicherung', title: 'Reiseversicherung', category: 'Reise & Urlaub', desc: 'Auslandskranken- & Reiserücktrittsversicherung für weltweite Sicherheit.', savings: 'Ab 12,90 € / Jahr' },
  { slug: 'pauschalreisen', title: 'Pauschalreisen & Urlaub', category: 'Reise & Urlaub', desc: 'Die besten Last-Minute- und All-Inclusive-Urlaubsangebote für Familien.', savings: 'Bis zu 60% Rabatt' },
  { slug: 'dsl-mobilfunk-vergleich', title: 'DSL, Glasfaser & Mobilfunk', category: 'Energie & Haushalt', desc: 'Highspeed Internet für Zuhause und unbegrenzte 5G Allnet-Flats.', savings: 'Ø 360 € / Jahr' },
  { slug: 'ratgeber', title: 'Ratgeber, Spartipps & Wechselfristen', category: 'Verbraucher-Wissen', desc: 'Aktuelle Tipps von Versicherungsexperten zur Senkung Ihrer Fixkosten.', savings: 'Experten-Tipps' },
  { slug: 'impressum', title: 'Impressum', category: 'Rechtliches', desc: 'Gesetzliche Anbieterkennzeichnung und Kontaktdaten.', savings: 'Transparenz' },
  { slug: 'datenschutz', title: 'Datenschutzerklärung', category: 'Rechtliches', desc: 'Informationen zur DSGVO-konformen Verarbeitung Ihrer Daten.', savings: 'DSGVO-Konform' },
  { slug: 'erstinformation', title: 'Erstinformation gem. § 15 VersVermV', category: 'Rechtliches', desc: 'Gesetzliche Statusinformation über Maklertätigkeit und Schlichtungsstellen.', savings: 'BaFin-Konform' }
];

remainingPages.forEach(p => {
  const content = "'use client';\n\n" +
    "import React from 'react';\n" +
    "import ComparisonTable, { TariffRow } from '@/components/ComparisonTable';\n" +
    "import FAQAccordion from '@/components/FAQAccordion';\n\n" +
    "const sampleTariffs: TariffRow[] = [\n" +
    "  {\n" +
    "    id: 'standard-1',\n" +
    "    provider: 'Premium Partner Direkt',\n" +
    "    logoText: 'TOP',\n" +
    "    tariffName: 'Exklusiv Schutz 2026',\n" +
    "    priceMonthly: 12.50,\n" +
    "    priceYearly: 150.00,\n" +
    "    rating: 4.9,\n" +
    "    reviewCount: 1420,\n" +
    "    benefits: ['Geprüfter Testsieger-Schutz', 'Volle Leistung im Schadensfall', 'Keine Wartezeit', 'Täglich kündbar'],\n" +
    "    bonus: '" + p.savings + "',\n" +
    "    isTestsieger: true,\n" +
    "    ctaText: 'Jetzt kostenlos vergleichen'\n" +
    "  },\n" +
    "  {\n" +
    "    id: 'standard-2',\n" +
    "    provider: 'Smart Schutz Digital',\n" +
    "    logoText: 'SMT',\n" +
    "    tariffName: 'Komfort Tarif',\n" +
    "    priceMonthly: 15.90,\n" +
    "    priceYearly: 190.80,\n" +
    "    rating: 4.8,\n" +
    "    reviewCount: 980,\n" +
    "    benefits: ['Rundum-Sorglos-Paket', '24/7 digitaler Kundenservice', 'Familienrabatt inklusive', 'Sofortige Antragsannahme'],\n" +
    "    isTestsieger: false,\n" +
    "    ctaText: 'Tarif wählen'\n" +
    "  }\n" +
    "];\n\n" +
    "const faqs = [\n" +
    "  {\n" +
    "    question: 'Wie läuft der Abschluss für " + p.title + " ab?',\n" +
    "    answer: 'In nur 3 Schritten: Daten eingeben, Tarife filtern und den gewünschten Vertrag direkt online abschließen oder unverbindlich per E-Mail anfordern.'\n" +
    "  }\n" +
    "];\n\n" +
    "export default function Page() {\n" +
    "  return (\n" +
    "    <div className=\"py-10\">\n" +
    "      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n" +
    "        <div className=\"mb-10 text-center max-w-3xl mx-auto\">\n" +
    "          <span className=\"text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200\">\n" +
    "            " + p.category + "\n" +
    "          </span>\n" +
    "          <h1 className=\"text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3\">\n" +
    "            " + p.title + ": <span className=\"text-blue-600\">Beste Tarife im Vergleich</span>\n" +
    "          </h1>\n" +
    "          <p className=\"mt-4 text-slate-600 text-base leading-relaxed\">\n" +
    "            " + p.desc + "\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div className=\"mb-14\">\n" +
    "          <ComparisonTable \n" +
    "            title=\"Die besten Angebote im Vergleich 2026\"\n" +
    "            subtitle=\"Transparent verglichen mit voller Preistransparenz\"\n" +
    "            productType=\"" + p.title + "\"\n" +
    "            tariffs={sampleTariffs}\n" +
    "          />\n" +
    "        </div>\n" +
    "        <FAQAccordion items={faqs} title=\"Häufige Fragen zu " + p.title + "\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  );\n" +
    "}\n";

  save('app/' + p.slug + '/page.tsx', content);
});

console.log('ALL PAGES GENERATED SUCCESSFULLY!');
