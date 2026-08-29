export interface CustomerProfile {
  name: string;
  salutation: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  partnerId: string;
}

export const CUSTOMER_PROFILE: CustomerProfile = {
  salutation: "Herr",
  name: "Hüseyin Gülec",
  street: "Anna Str. 6",
  zip: "90459",
  city: "Nürnberg",
  country: "Deutschland",
  phone: "0911 9277785",
  email: "gulec32@googlemail.com",
  partnerId: "75137"
};

export interface SubCategory {
  title: string;
  slug: string;
  description: string;
  badge?: string;
  savingsPotential: string;
  iconName: string;
}

export interface MainCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  subcategories: SubCategory[];
}

export const CATEGORIES: MainCategory[] = [
  {
    id: "mobilitaet",
    title: "1. Fahrzeug & Mobilität",
    slug: "mobilitaet",
    description: "Finden Sie Top-Schutz für Ihr Auto, Zweirad oder den nächsten Urlaubsmietwagen.",
    iconName: "Car",
    color: "from-blue-600 to-cyan-600",
    subcategories: [
      {
        title: "Kfz-Versicherung",
        slug: "/kfz-versicherung",
        description: "Auto-Wechsel & Sparen: Bis zu 850 € Sparpotenzial pro Jahr sichern.",
        badge: "Bis 850 € sparen",
        savingsPotential: "Ø 850 € / Jahr",
        iconName: "CarFront"
      },
      {
        title: "Motorradversicherung",
        slug: "/motorrad-versicherung",
        description: "Saison- & Neuzulassungen: Maßgeschneiderte Haftpflicht & Kasko.",
        badge: "Top Schutz",
        savingsPotential: "Ø 320 € / Jahr",
        iconName: "Bike"
      },
      {
        title: "Mietwagen-Vergleich",
        slug: "/mietwagen-vergleich",
        description: "Weltweite Angebote ohne versteckte Gebühren mit Vollkasko ohne SB.",
        badge: "Bestpreis-Garantie",
        savingsPotential: "Bis zu 45% günstiger",
        iconName: "KeyRound"
      }
    ]
  },
  {
    id: "wohnen-recht",
    title: "2. Eigentum, Wohnen & Recht",
    slug: "wohnen-recht",
    description: "Umfassende Absicherung für Ihr Zuhause, Hab und Gut sowie juristische Sicherheit.",
    iconName: "Home",
    color: "from-emerald-600 to-teal-600",
    subcategories: [
      {
        title: "Wohngebäudeversicherung",
        slug: "/wohngebaeude-versicherung",
        description: "Schutz vor Unwetter, Sturm, Leitungswasser & Elementargefahren.",
        badge: "Elementarschutz inkl.",
        savingsPotential: "Ø 480 € / Jahr",
        iconName: "ShieldAlert"
      },
      {
        title: "Rechtsschutzversicherung",
        slug: "/rechtsschutz-versicherung",
        description: "Absicherung bei Streitigkeiten in Miet-, Arbeits- & Verkehrsrecht.",
        badge: "Ohne Wartezeit wählbar",
        savingsPotential: "Ø 290 € / Jahr",
        iconName: "Scale"
      },
      {
        title: "Privathaftpflicht & Hausrat",
        slug: "/haftpflicht-hausrat",
        description: "Der unverzichtbare Basisschutz für Familie, Wohnung und Vermögen.",
        badge: "Bestseller",
        savingsPotential: "Ø 210 € / Jahr",
        iconName: "Umbrella"
      }
    ]
  },
  {
    id: "gesundheit",
    title: "3. Gesundheit & Personenschutz",
    slug: "gesundheit",
    description: "Erstklassige medizinische Versorgung und finanzielle Absicherung bei Unfall.",
    iconName: "HeartPulse",
    color: "from-rose-600 to-pink-600",
    subcategories: [
      {
        title: "Private Krankenversicherung (PKV)",
        slug: "/pkv",
        description: "PKV-Vergleich für Selbstständige, Beamte, Angestellte & Gutverdiener.",
        badge: "Chefarzt & 1-Bett",
        savingsPotential: "Ø 2.400 € / Jahr",
        iconName: "Activity"
      },
      {
        title: "Unfallversicherung",
        slug: "/unfallversicherung",
        description: "Finanzieller Schutz bei Freizeit-, Sport- & Familienunfällen rund um die Uhr.",
        badge: "24/7 Weltweit",
        savingsPotential: "Ø 190 € / Jahr",
        iconName: "HeartHandshake"
      }
    ]
  },
  {
    id: "finanzen",
    title: "4. Finanzen & Banken",
    slug: "finanzen",
    description: "Kostenlose Konten, Top-Tagesgeld und transparente Kreditkonditionen.",
    iconName: "Landmark",
    color: "from-amber-600 to-orange-600",
    subcategories: [
      {
        title: "Girokonto-Vergleich",
        slug: "/girokonto-vergleich",
        description: "Kostenfreie Konten mit attraktiven Neukundenprämien und Wechselboni.",
        badge: "Bis 200 € Prämie",
        savingsPotential: "Ø 180 € / Jahr + Bonus",
        iconName: "CreditCard"
      },
      {
        title: "Kredite & Ratenkredite",
        slug: "/kredit-vergleich",
        description: "Günstige Umschuldung, freie Verwendung & transparente Niedrigzinsen.",
        badge: "Top-Zinsen ab 3,49%",
        savingsPotential: "Bis zu 1.200 € Zinsersparnis",
        iconName: "Banknote"
      }
    ]
  },
  {
    id: "reise",
    title: "5. Reise & Urlaub",
    slug: "reise",
    description: "Sorgenfrei die Welt entdecken mit bestem Schutz und unschlagbaren Angeboten.",
    iconName: "Plane",
    color: "from-sky-600 to-indigo-600",
    subcategories: [
      {
        title: "Reiseversicherungen",
        slug: "/reiseversicherung",
        description: "Auslandsreisekranken- & Reiserücktrittsschutz für Singles & Familien.",
        badge: "Corona-Schutz inkl.",
        savingsPotential: "Ab 12,90 € / Jahr",
        iconName: "ShieldCheck"
      },
      {
        title: "Last-Minute & Pauschalreisen",
        slug: "/pauschalreisen",
        description: "Urlaubsangebote für Familien, Paare & Spontanbucher im Bestpreisvergleich.",
        badge: "Geld-zurück-Garantie",
        savingsPotential: "Bis zu 60% Rabatt",
        iconName: "Palmtree"
      }
    ]
  },
  {
    id: "energie-haushalt",
    title: "6. Energie & Haushalt",
    slug: "energie-haushalt",
    description: "Monatliche Fixkosten dauerhaft senken mit wenigen Klicks.",
    iconName: "Zap",
    color: "from-emerald-500 to-green-700",
    subcategories: [
      {
        title: "Strom & Gas",
        slug: "/strom-gas-vergleich",
        description: "Tarifwechsel zur Senkung der monatlichen Fixkosten mit Sofortbonus.",
        badge: "Bis 900 € Sofort-Sparpotenzial",
        savingsPotential: "Ø 750 € / Jahr",
        iconName: "Flame"
      },
      {
        title: "DSL & Mobilfunk",
        slug: "/dsl-mobilfunk-vergleich",
        description: "Highspeed-Internet (Glasfaser/Kabel) & günstige Allnet-Flat Handytarife.",
        badge: "Bis 240 € Cashback",
        savingsPotential: "Ø 360 € / Jahr",
        iconName: "Wifi"
      }
    ]
  }
];

export const TRUST_STATS = [
  { label: "Erfahrung im Markt", value: "Über 20 Jahre", subtitle: "Unabhängige Beratung" },
  { label: "Vergleichsdauer", value: "In 3 Minuten", subtitle: "Zum besten Tarif" },
  { label: "Kosten & Bindung", value: "100 % Kostenlos", subtitle: "Ohne versteckte Gebühren" },
  { label: "Zufriedene Nutzer", value: "Über 150.000+", subtitle: "Ø Bewertung 4.9 / 5.0" }
];

export const PROMO_HIGHLIGHTS = [
  {
    id: "girokonto-bonus",
    title: "Girokonto Neukunden-Aktion",
    headline: "Bis zu 200 € Willkommensprämie",
    description: "Jetzt kostenloses Gehaltskonto eröffnen und attraktiven Wechselbonus sichern. 0 € Kontoführungsgebühr inklusive.",
    badge: "Exklusiv-Deal",
    buttonText: "Girokonten vergleichen",
    link: "/girokonto-vergleich",
    tag: "Banken & Finanzen",
    color: "border-amber-500/30 bg-gradient-to-br from-amber-50 to-amber-100/50"
  },
  {
    id: "kfz-sparen",
    title: "Kfz-Versicherungs-Wechsel",
    headline: "Bis zu 850 € im Jahr einsparen",
    description: "Vergleichen Sie über 330 Kfz-Tarife. Wechseln Sie einfach online und sichern Sie sich Top-Schutz zum Sparpreis.",
    badge: "Saison-Highlight",
    buttonText: "Kfz-Tarife berechnen",
    link: "/kfz-versicherung",
    tag: "Mobilität",
    color: "border-blue-500/30 bg-gradient-to-br from-blue-50 to-blue-100/50"
  },
  {
    id: "strom-wechsel",
    title: "Strom & Gas Preisbremse",
    headline: "Durchschnittlich 750 € Ersparnis",
    description: "Energiepreise wieder im Sinkflug! Wechseln Sie jetzt weg vom teuren Grundversorger zu zertifizierten Ökostrom-Tarifen.",
    badge: "Sofort-Bonus",
    buttonText: "Strom & Gas vergleichen",
    link: "/strom-gas-vergleich",
    tag: "Energie & Haushalt",
    color: "border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-emerald-100/50"
  }
];

export const GUIDE_ARTICLES = [
  {
    title: "Kfz-Versicherung wechseln: Stichtag & Fristen optimal nutzen",
    excerpt: "Wie Sie durch Sonderkündigungsrechte und Schadenfreiheitsrabatte hunderte Euro sparen können.",
    category: "Fahrzeug",
    readTime: "4 Min. Lesezeit",
    date: "August 2026",
    slug: "/kfz-versicherung"
  },
  {
    title: "Private Krankenversicherung: Für wen lohnt sich der Wechsel?",
    excerpt: "Kriterien, Beitragsentwicklung im Alter und Voraussetzungen für Angestellte & Selbstständige.",
    category: "Gesundheit",
    readTime: "6 Min. Lesezeit",
    date: "August 2026",
    slug: "/pkv"
  },
  {
    title: "Wohngebäudeversicherung: Warum Elementarschutz 2026 unverzichtbar ist",
    excerpt: "Starkregen, Überschwemmung und Schneedruck – so schützen Sie Ihr Haus vor existenzbedrohenden Schäden.",
    category: "Wohnen",
    readTime: "5 Min. Lesezeit",
    date: "August 2026",
    slug: "/wohngebaeude-versicherung"
  },
  {
    title: "Girokonto mit Prämie: So gelingt der Kontowechsel in 10 Minuten",
    excerpt: "Kostenloser Wechselservice übernimmt alle Lastschriften und Daueraufträge vollautomatisch.",
    category: "Finanzen",
    readTime: "3 Min. Lesezeit",
    date: "August 2026",
    slug: "/girokonto-vergleich"
  }
];

export const GENERAL_FAQS = [
  {
    question: "Ist der Vergleich auf diesem Portal wirklich 100 % kostenlos?",
    answer: "Ja, absolut. Die Nutzung unseres Vergleichsportals ist für Sie zu jedem Zeitpunkt vollständig kostenlos und unverbindlich. Es gibt keine versteckten Gebühren oder Folgekosten."
  },
  {
    question: "Wie finanziert sich das Vergleichsportal?",
    answer: "Wir erhalten im Erfolgsfall eine gesetzlich geregelte Vermittlungsprovision von den jeweiligen Versicherern, Banken oder Energieanbietern. Dies hat keinerlei Einfluss auf Ihren Tarifpreis – Sie zahlen immer den regulären oder oft sogar vergünstigten Sonderkonditionspreis."
  },
  {
    question: "Wie schnell erhalte ich mein Angebot bzw. den neuen Vertrag?",
    answer: "Die meisten Vergleiche dauern nur 2 bis 3 Minuten. Nach Eingabe Ihrer Rahmendaten erhalten Sie sofort eine strukturierte Tarifübersicht und können den Antrag direkt online abschließen."
  },
  {
    question: "Werden meine persönlichen Daten vertraulich behandelt?",
    answer: "Ja. Alle Datenübertragungen erfolgen nach höchsten Sicherheitsstandards mit moderner 256-Bit-SSL-Verschlüsselung nach deutschem DSGVO-Datenschutzrecht. Wir geben Ihre Daten niemals an unbefugte Dritte weiter."
  },
  {
    question: "Was passiert mit meinem bestehenden Altvertrag?",
    answer: "In vielen Bereichen (z. B. Kfz-Versicherung, Strom/Gas oder Girokonto) übernimmt der neue Anbieter den Kündigungs- bzw. Wechselservice für Sie vollautomatisch."
  }
];
