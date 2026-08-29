export interface PartnerConfig {
  id: string;
  name: string;
  category: 'kfz' | 'vorsorge' | 'kranken' | 'sach' | 'finanzen' | 'energie_reisen';
  containerId?: string;
  scriptSrc?: string;
  iframeUrl?: string;
  directLink: string;
  adId?: string;
  deepLinkParam?: string;
}

export const PARTNER_ID = "75137";

export const PARTNER_WIDGETS: Record<string, PartnerConfig> = {
  // --- 1. KFZ & MOBILITÄT ---
  kfz: {
    id: "kfz",
    name: "Kfz-Versicherung",
    category: "kfz",
    containerId: "tcpp-iframe-kfz",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-kfz/kfz-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=kfz-versicherung",
    deepLinkParam: "kfz-versicherung"
  },
  motorrad: {
    id: "motorrad",
    name: "Motorradversicherung",
    category: "kfz",
    containerId: "tcpp-iframe-mot",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-mot/mot-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=motorradversicherung",
    deepLinkParam: "motorradversicherung"
  },

  // --- 2. VORSORGE-VERSICHERUNGEN ---
  rente: {
    id: "rente",
    name: "Private Rentenversicherung",
    category: "vorsorge",
    containerId: "tcpp-iframe-rente",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-rente/rente-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=rentenversicherung",
    deepLinkParam: "rentenversicherung"
  },
  berufsunfaehigkeit: {
    id: "berufsunfaehigkeit",
    name: "Berufsunfähigkeitsversicherung (BU)",
    category: "vorsorge",
    containerId: "tcpp-iframe-buv",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-buv/buv-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=berufsunfaehigkeitsversicherung",
    deepLinkParam: "berufsunfaehigkeitsversicherung"
  },
  leben: {
    id: "leben",
    name: "Lebensversicherung",
    category: "vorsorge",
    containerId: "tcpp-iframe-leben",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-leben/leben-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=lebensversicherung",
    deepLinkParam: "lebensversicherung"
  },
  unfall: {
    id: "unfall",
    name: "Unfallversicherung",
    category: "vorsorge",
    containerId: "tcpp-iframe-unf",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-unf/unf-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=unfallversicherung",
    deepLinkParam: "unfallversicherung"
  },
  riester: {
    id: "riester",
    name: "Riester-Rente",
    category: "vorsorge",
    containerId: "tcpp-iframe-riester",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-riester/riester-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=riester-rente",
    deepLinkParam: "riester-rente"
  },
  risikoleben: {
    id: "risikoleben",
    name: "Risikolebensversicherung",
    category: "vorsorge",
    containerId: "tcpp-iframe-rlv",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-rlv/rlv-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=risikolebensversicherung",
    deepLinkParam: "risikolebensversicherung"
  },
  ruerup: {
    id: "ruerup",
    name: "Rürup-Rente (Basisrente)",
    category: "vorsorge",
    containerId: "tcpp-iframe-r-rente",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-r-rente/r-rente-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=ruerup-rente",
    deepLinkParam: "ruerup-rente"
  },
  pflegezusatz: {
    id: "pflegezusatz",
    name: "Pflegezusatzversicherung",
    category: "vorsorge",
    containerId: "tcpp-iframe-prv",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-prv/prv-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=pflegezusatzversicherung",
    deepLinkParam: "pflegezusatzversicherung"
  },

  // --- 3. KRANKENVERSICHERUNGEN ---
  pkv: {
    id: "pkv",
    name: "Private Krankenversicherung (PKV)",
    category: "kranken",
    containerId: "tcpp-iframe-pkv",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-pkv/pkv-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=private-krankenversicherung",
    deepLinkParam: "private-krankenversicherung"
  },
  pkv_beamte: {
    id: "pkv_beamte",
    name: "PKV für Beamte & Beihilfeberechtigte",
    category: "kranken",
    containerId: "tcpp-iframe-pkv-beamte",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-pkv-beamte/pkv-beamte-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=private-krankenversicherung-beamte",
    deepLinkParam: "private-krankenversicherung-beamte"
  },
  krankenzusatz: {
    id: "krankenzusatz",
    name: "Krankenzusatz- & Zahnzusatzversicherung",
    category: "kranken",
    containerId: "tcpp-iframe-pkv-z",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-pkv-z/pkv-z-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=krankenzusatzversicherung",
    deepLinkParam: "krankenzusatzversicherung"
  },
  pkv_studenten: {
    id: "pkv_studenten",
    name: "PKV für Studenten",
    category: "kranken",
    containerId: "tcpp-iframe-pkv-s",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-pkv-s/pkv-s-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=private-krankenversicherung-studenten",
    deepLinkParam: "private-krankenversicherung-studenten"
  },
  pkv_55: {
    id: "pkv_55",
    name: "PKV Tarifoptimierung ab 55",
    category: "kranken",
    containerId: "tcpp-iframe-pkv55",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-pkv55/pkv55-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=private-krankenversicherung",
    deepLinkParam: "private-krankenversicherung"
  },

  // --- 4. SACHVERSICHERUNGEN ---
  haftpflicht: {
    id: "haftpflicht",
    name: "Privathaftpflichtversicherung",
    category: "sach",
    containerId: "tcpp-iframe-phv",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-phv/phv-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=haftpflichtversicherung",
    deepLinkParam: "haftpflichtversicherung"
  },
  hausrat: {
    id: "hausrat",
    name: "Hausratversicherung",
    category: "sach",
    containerId: "tcpp-iframe-hr",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-hr/hr-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=hausratversicherung",
    deepLinkParam: "hausratversicherung"
  },
  rechtsschutz: {
    id: "rechtsschutz",
    name: "Rechtsschutzversicherung",
    category: "sach",
    containerId: "tcpp-iframe-rs",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-rs/rs-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=rechtsschutzversicherung",
    deepLinkParam: "rechtsschutzversicherung"
  },
  wohngebaeude: {
    id: "wohngebaeude",
    name: "Wohngebäudeversicherung",
    category: "sach",
    containerId: "tcpp-iframe-wg",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-wg/wg-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=wohngebaeudeversicherung",
    deepLinkParam: "wohngebaeudeversicherung"
  },
  tierhalter: {
    id: "tierhalter",
    name: "Hundehalterhaftpflicht / Tierhalter",
    category: "sach",
    containerId: "tcpp-iframe-tie",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-tie/tie-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=hundeversicherung",
    deepLinkParam: "hundeversicherung"
  },
  tierkranken: {
    id: "tierkranken",
    name: "Hundekranken- & OP-Versicherung",
    category: "sach",
    containerId: "tcpp-iframe-tkv",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-tkv/tkv-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=hundekrankenversicherung",
    deepLinkParam: "hundekrankenversicherung"
  },
  grundbesitzer: {
    id: "grundbesitzer",
    name: "Haus- & Grundbesitzerhaftpflicht",
    category: "sach",
    containerId: "tcpp-iframe-hug",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-hug/hug-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=grundbesitzerhaftpflicht",
    deepLinkParam: "grundbesitzerhaftpflicht"
  },
  gewerbe: {
    id: "gewerbe",
    name: "Gewerbe- & Firmenversicherung",
    category: "sach",
    containerId: "tcpp-iframe-fc",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-fc/fc-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=firmenversicherung",
    deepLinkParam: "firmenversicherung"
  },

  // --- 5. FINANZEN & BANKEN ---
  girokonto: {
    id: "girokonto",
    name: "Girokonto-Vergleich",
    category: "finanzen",
    containerId: "tcpp-iframe-giro",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-giro/giro-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=girokonto",
    deepLinkParam: "girokonto"
  },
  kredit: {
    id: "kredit",
    name: "Kredite & Ratenkredite",
    category: "finanzen",
    containerId: "tcpp-iframe-kredit",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-kredit/kredit-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=kredit",
    deepLinkParam: "kredit"
  },
  baufinanzierung: {
    id: "baufinanzierung",
    name: "Baufinanzierung & Immobilienkredit",
    category: "finanzen",
    containerId: "tcpp-iframe-baufi",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-baufi/baufi-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=baufinanzierung",
    deepLinkParam: "baufinanzierung"
  },
  kreditkarte: {
    id: "kreditkarte",
    name: "Kreditkarten-Vergleich",
    category: "finanzen",
    containerId: "tcpp-iframe-cc",
    scriptSrc: "https://form.partner-versicherung.de/widgets/75137/tcpp-iframe-cc/cc-iframe.js",
    directLink: "https://a.partner-versicherung.de/click.php?partner_id=75137&ad_id=15&deep=kreditkarten",
    deepLinkParam: "kreditkarten"
  }
};
