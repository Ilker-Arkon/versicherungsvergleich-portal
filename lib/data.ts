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
  phone: "+49 1525 2592531",
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
    title: "1. Kfz & Mobilität",
    slug: "mobilitaet",
    description: "Finden Sie Top-Schutz für Ihr Auto oder Zweirad mit garantiertem Sparpotenzial.",
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
        description: "Saison- & Neuzulassungen: Maßgeschneiderte Haftpflicht, Teil- und Vollkasko.",
        badge: "Top Schutz",
        savingsPotential: "Ø 320 € / Jahr",
        iconName: "Bike"
      }
    ]
  },
  {
    id: "sach-wohnen",
    title: "2. Sach & Eigentum",
    slug: "sach-wohnen",
    description: "Umfassende Absicherung für Ihr Zuhause, Hab & Gut, Tiere sowie juristische Sicherheit.",
    iconName: "Home",
    color: "from-emerald-600 to-teal-600",
    subcategories: [
      {
        title: "Privathaftpflicht",
        slug: "/haftpflicht",
        description: "Der unverzichtbare Basisschutz vor Schadenersatzforderungen im Alltag.",
        badge: "Bestseller",
        savingsPotential: "Ø 140 € / Jahr",
        iconName: "Shield"
      },
      {
        title: "Hausratversicherung",
        slug: "/hausrat",
        description: "Schutz für Möbel, Elektronik und Wertsachen bei Einbruch, Feuer & Leitungswasser.",
        badge: "Unterversicherungsverzicht",
        savingsPotential: "Ø 170 € / Jahr",
        iconName: "Home"
      },
      {
        title: "Rechtsschutzversicherung",
        slug: "/rechtsschutz-versicherung",
        description: "Kostenübernahme bei Rechtsstreitigkeiten in Beruf, Verkehr, Wohnen & Privatleben.",
        badge: "Ohne Wartezeit wählbar",
        savingsPotential: "Ø 290 € / Jahr",
        iconName: "Scale"
      },
      {
        title: "Wohngebäudeversicherung",
        slug: "/wohngebaeude-versicherung",
        description: "Schutz vor Unwetter, Sturm, Leitungswasser & Elementargefahren für Hauseigentümer.",
        badge: "Elementarschutz inkl.",
        savingsPotential: "Ø 480 € / Jahr",
        iconName: "ShieldAlert"
      },
      {
        title: "Hundehalterhaftpflicht",
        slug: "/hundeversicherung",
        description: "Gesetzlich vorgeschriebener Schutz bei Personen- und Sachschäden durch den Hund.",
        badge: "Ohne Leinenzwang",
        savingsPotential: "Ab 3,50 € / Monat",
        iconName: "Dog"
      },
      {
        title: "Hundekrankenversicherung",
        slug: "/hundekrankenversicherung",
        description: "OP- & Krankenvollschutz: Hohe Tierarztkosten zuverlässig absichern.",
        badge: "Bis 100% Erstattung",
        savingsPotential: "Ø 350 € Ersparnis",
        iconName: "HeartPulse"
      },
      {
        title: "Haus- & Grundbesitzerhaftpflicht",
        slug: "/grundbesitzerhaftpflicht",
        description: "Haftpflichtschutz für Vermieter und Eigentümer von Grundstücken & Mehrfamilienhäusern.",
        badge: "Für Vermieter",
        savingsPotential: "Ø 80 € / Jahr",
        iconName: "Building"
      },
      {
        title: "Gewerbe- & Firmenversicherung",
        slug: "/firmenversicherung",
        description: "Betriebshaftpflicht und Inventarschutz für Selbstständige & Unternehmen.",
        badge: "Maßgeschneidert",
        savingsPotential: "Individuell",
        iconName: "Briefcase"
      },
      {
        title: "Haftpflicht & Hausrat",
        slug: "/haftpflicht-hausrat",
        description: "Privathaftpflicht und Hausrat gebündelt vergleichen – Schutz für Vermögen, Familie und Zuhause.",
        badge: "Kombi-Vergleich",
        savingsPotential: "Beide Tarife im Blick",
        iconName: "Umbrella"
      }
    ]
  },
  {
    id: "gesundheit",
    title: "3. Gesundheit & Kranken",
    slug: "gesundheit",
    description: "Erstklassige medizinische Versorgung für Selbstständige, Beamte, Angestellte und Familien.",
    iconName: "HeartPulse",
    color: "from-rose-600 to-pink-600",
    subcategories: [
      {
        title: "Private Krankenversicherung (PKV)",
        slug: "/pkv",
        description: "PKV-Vollversicherung: Maximale Chefarztbehandlung, 1-Bett-Zimmer & Top-Zahnersatz.",
        badge: "Chefarzt & 1-Bett",
        savingsPotential: "Ø 2.400 € / Jahr",
        iconName: "Activity"
      },
      {
        title: "PKV für Beamte & Referendare",
        slug: "/pkv-beamte",
        description: "Maßgeschneiderte Beihilfe-Restkostentarife mit bis zu 80% Kostenerstattung.",
        badge: "Beihilfe-optimiert",
        savingsPotential: "Ø 1.800 € / Jahr",
        iconName: "Award"
      },
      {
        title: "Zahn- & Krankenzusatzversicherung",
        slug: "/krankenzusatz",
        description: "Schließen Sie Kassenlücken: Hochwertige Zahnkronen, Implantate und Vorsorge.",
        badge: "Bis 100% Zahnersatz",
        savingsPotential: "Bis 1.500 € Zuzahlung sparen",
        iconName: "Sparkles"
      },
      {
        title: "PKV für Studenten",
        slug: "/pkv-studenten",
        description: "Günstige Spezialtarife für Studierende mit erstklassigen Leistungen.",
        badge: "Studentenrabatt",
        savingsPotential: "Ab 85 € / Monat",
        iconName: "GraduationCap"
      }
    ]
  },
  {
    id: "vorsorge",
    title: "4. Vorsorge & Leben",
    slug: "vorsorge",
    description: "Finanzielle Absicherung der Familie, der eigenen Arbeitskraft und des Ruhestands.",
    iconName: "ShieldCheck",
    color: "from-indigo-600 to-purple-600",
    subcategories: [
      {
        title: "Berufsunfähigkeitsversicherung (BU)",
        slug: "/berufsunfaehigkeit",
        description: "Sichern Sie Ihr wertvollstes Gut: Ihr monatliches Einkommen bei Krankheit oder Unfall.",
        badge: "Existenzschutz Nr. 1",
        savingsPotential: "Ø 450 € / Jahr",
        iconName: "Briefcase"
      },
      {
        title: "Risikolebensversicherung",
        slug: "/risikoleben",
        description: "Finanzielle Sicherheit für Hinterbliebene und Absicherung von Immobilienkrediten.",
        badge: "Familienabsicherung",
        savingsPotential: "Ø 300 € / Jahr",
        iconName: "Heart"
      },
      {
        title: "Private Rentenversicherung",
        slug: "/rente",
        description: "Lebenslange Zusatzrente für einen sorgenfreien Lebensabend ohne Rentenlücke.",
        badge: "Steuerbegünstigt",
        savingsPotential: "Hohe Renditechancen",
        iconName: "TrendingUp"
      },
      {
        title: "Unfallversicherung",
        slug: "/unfallversicherung",
        description: "Weltweiter 24/7-Finanzschutz bei Invalidität durch Freizeit- und Sportunfälle.",
        badge: "24/7 Weltweit",
        savingsPotential: "Ø 190 € / Jahr",
        iconName: "HeartHandshake"
      },
      {
        title: "Riester-Rente",
        slug: "/riester-rente",
        description: "Staatliche Zulagen und steuerliche Förderung für Arbeitnehmer & Familien.",
        badge: "Staatliche Zulagen",
        savingsPotential: "Bis zu Hunderte € Zuschuss",
        iconName: "Coins"
      },
      {
        title: "Rürup-Rente (Basisrente)",
        slug: "/ruerup-rente",
        description: "Maximale Steuerersparnis für Selbstständige, Freiberufler und Besserverdiener.",
        badge: "Max. Steuervorteil",
        savingsPotential: "Bis zu 10.000 € Steuerabzug",
        iconName: "FileSpreadsheet"
      },
      {
        title: "Pflegezusatzversicherung",
        slug: "/pflegezusatz",
        description: "Schutz des eigenen Vermögens und Entlastung der Angehörigen im Pflegefall.",
        badge: "Vermögensschutz",
        savingsPotential: "Schutz vor Eigenanteil",
        iconName: "UserCheck"
      },
      {
        title: "Lebensversicherung",
        slug: "/lebensversicherung",
        description: "Hinterbliebenenschutz und garantierte Auszahlung – Kapital- und Risikolebensversicherungen vergleichen.",
        badge: "Hinterbliebenenschutz",
        savingsPotential: "Individuell",
        iconName: "Heart"
      }
    ]
  },
  {
    id: "finanzen",
    title: "5. Finanzen & Banken",
    slug: "finanzen",
    description: "Kostenlose Konten, Top-Kreditkarten und günstige Raten- sowie Immobilienkredite.",
    iconName: "Landmark",
    color: "from-amber-600 to-orange-600",
    subcategories: [
      {
        title: "Girokonto-Vergleich",
        slug: "/girokonto-vergleich",
        description: "Kostenfreie Kontoführung mit attraktiven Neukundenprämien und Wechselboni.",
        badge: "0 € Kontoführung",
        savingsPotential: "Ø 180 € / Jahr + Bonus",
        iconName: "CreditCard"
      },
      {
        title: "Kredite & Ratenkredite",
        slug: "/kredit-vergleich",
        description: "Günstige Umschuldung, freie Verwendung & transparente Niedrigzinsen.",
        badge: "Top-Zinsen",
        savingsPotential: "Bis zu 1.200 € Zinsersparnis",
        iconName: "Banknote"
      },
      {
        title: "Baufinanzierung",
        slug: "/baufinanzierung",
        description: "Beste Konditionen aus über 400 Banken für Neubau, Kauf oder Anschlussfinanzierung.",
        badge: "Über 400 Banken",
        savingsPotential: "Tausende € Zinsvorteil",
        iconName: "Landmark"
      },
      {
        title: "Kreditkarten-Vergleich",
        slug: "/kreditkarten",
        description: "Kostenlose Kreditkarten mit weltweit gebührenfreiem Bezahlen & Bargeldabhebung.",
        badge: "0 € Jahresgebühr",
        savingsPotential: "Ø 90 € / Jahr",
        iconName: "CreditCard"
      }
    ]
  }
];

export const TRUST_STATS = [
  { label: "Erfahrung im Markt", value: "Über 20 Jahre", subtitle: "Unabhängige Beratung" },
  { label: "Vergleichsdauer", value: "In 3 Minuten", subtitle: "Zum besten Tarif" },
  { label: "Kosten & Bindung", value: "100 % Kostenlos", subtitle: "Ohne versteckte Gebühren" },
  { label: "Zufriedene Nutzer", value: "150.000+", subtitle: "Ø Bewertung 4.9 / 5.0" }
];

export const PROMO_HIGHLIGHTS = [
  {
    id: "kfz-sparen",
    title: "Kfz-Versicherungs-Wechsel",
    headline: "Bis zu 850 € im Jahr einsparen",
    description: "Vergleichen Sie über 330 Kfz-Tarife im offiziellen Live-Rechner. Wechseln Sie bequem online zum Testsieger.",
    badge: "Bestseller 2026",
    buttonText: "Kfz-Tarife berechnen",
    link: "/kfz-versicherung",
    tag: "Kfz & Mobilität",
    color: "border-blue-500/30 bg-gradient-to-br from-blue-50 to-blue-100/50"
  },
  {
    id: "pkv-optimierung",
    title: "Private Krankenversicherung",
    headline: "Bis zu 2.400 € Beitragsersparnis",
    description: "Erstklassige medizinische Versorgung mit Chefarztbehandlung und 1-Bett-Zimmer zu Top-Konditionen vergleichen.",
    badge: "Top-Leistungen",
    buttonText: "PKV vergleichen",
    link: "/pkv",
    tag: "Gesundheit & Kranken",
    color: "border-rose-500/30 bg-gradient-to-br from-rose-50 to-rose-100/50"
  },
  {
    id: "bu-absicherung",
    title: "Berufsunfähigkeits-Schutz",
    headline: "Ihr monatliches Einkommen sichern",
    description: "Existenzschutz Nr. 1: Vergleichen Sie zertifizierte BU-Tarife mit Verzicht auf abstrakte Verweisung.",
    badge: "Existenzschutz",
    buttonText: "BU berechnen",
    link: "/berufsunfaehigkeit",
    tag: "Vorsorge & Leben",
    color: "border-purple-500/30 bg-gradient-to-br from-purple-50 to-purple-100/50"
  }
];

export const GUIDE_ARTICLES = [
  {
    title: "Kfz-Versicherung wechseln: Stichtag & Fristen optimal nutzen",
    excerpt: "Wie Sie durch Sonderkündigungsrechte und Schadenfreiheitsrabatte hunderte Euro sparen können.",
    category: "Kfz",
    readTime: "4 Min. Lesezeit",
    date: "August 2026",
    slug: "/kfz-versicherung"
  },
  {
    title: "Berufsunfähigkeitsversicherung: Wann ist der Einstieg am günstigsten?",
    excerpt: "Warum ein früher Abschluss die Monatsbeiträge dauerhaft drastisch senkt und worauf bei Gesundheitsfragen zu achten ist.",
    category: "Vorsorge",
    readTime: "5 Min. Lesezeit",
    date: "August 2026",
    slug: "/berufsunfaehigkeit"
  },
  {
    title: "Private Krankenversicherung: Für wen lohnt sich der Wechsel?",
    excerpt: "Kriterien, Beitragsentwicklung im Alter und Voraussetzungen für Angestellte, Selbstständige und Beamte.",
    category: "Gesundheit",
    readTime: "6 Min. Lesezeit",
    date: "August 2026",
    slug: "/pkv"
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
    question: "Ist der Tarifvergleich auf dieser Webseite wirklich 100 % kostenlos?",
    answer: "Ja, die Nutzung unserer Vergleichsrechner ist für dich zu 100 % kostenfrei und unverbindlich. Du kannst beliebig viele Tarife miteinander vergleichen, ohne dass versteckte Gebühren oder Kosten entstehen."
  },
  {
    question: "Wie funktioniert der Online-Vergleich?",
    answer: "Du wählst einfach das gewünschte Produkt aus (z. B. Kfz-Versicherung, Krankenversicherung oder Girokonto) und gibst deine individuellen Eckdaten ein. Unser Vergleichsrechner ermittelt in wenigen Sekunden die günstigsten und leistungsstärksten Angebote für deine Kriterien."
  },
  {
    question: "Warum unterscheiden sich die Preise der Anbieter oft so stark?",
    answer: "Versicherungen und Banken bewerten Risiken und Zielgruppen unterschiedlich. Durch den schnellen Marktvergleich siehst du transparent alle Unterschiede bei Leistungen und Preisen auf einen Blick."
  },
  {
    question: "Sind meine eingegebenen Daten sicher?",
    answer: "Ja, höchste Datenschutzstandards stehen an erster Stelle. Alle Daten werden über verschlüsselte Verbindungen übertragen und ausschließlich für die Erstellung deiner persönlichen Angebote verwendet."
  }
];
