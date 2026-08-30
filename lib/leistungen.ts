// Ehrliche Leistungsmerkmale — KEINE Preise, KEINE Anbieternamen, KEINE Bewertungen.
// Diese Datei ersetzt die frühere statische ComparisonTable mit fiktiven Preisen.
// Jedes Merkmal ist eine sachliche Orientierung; konkrete Tarife/Preise liefert der Live-Rechner.

export interface LeistungsMerkmal {
  name: string;
  detail: string;
  /** true = Standard/Empfohlen, false = situativ/optional */
  empfohlen?: boolean;
}

export interface LeistungsInfo {
  title: string;
  subtitle: string;
  merkmale: LeistungsMerkmal[];
}

export const LEISTUNGEN: Record<string, LeistungsInfo> = {
  kfz: {
    title: 'Wichtige Leistungen einer Kfz-Versicherung',
    subtitle: 'Diese Merkmale sollten Sie im Rechner vergleichen — die konkreten Tarife und Preise zeigt er oben in Echtzeit.',
    merkmale: [
      { name: 'Deckungssumme 100 Mio. €', detail: 'Pauschale Höchstdeckung für Personen-, Sach- und Vermögensschäden — heute Standard und wichtig bei schweren Unfällen.', empfohlen: true },
      { name: 'Mallorca-Police', detail: 'Erhöht die teils niedrigen Mindestdeckungssummen bei Mietwagen im europäischen Ausland auf deutsches Niveau.', empfohlen: true },
      { name: 'Grobe Fahrlässigkeit mitversichert', detail: 'Der Versicherer bleibt auch bei grober Fahrlässigkeit (z. B. Überfahren einer roten Ampel) leistungspflichtig.', empfohlen: true },
      { name: 'Fahrerschutzversicherung', detail: 'Sichert Sie als Fahrer auch bei selbst verschuldeten Unfällen ab (eigene Personenschäden).', empfohlen: false },
      { name: 'Freie Werkstattwahl', detail: 'Erlaubt Reparaturen in der Werkstatt Ihres Vertrauens statt nur in Partnerwerkstätten.', empfohlen: false },
      { name: 'Neupreisentschädigung', detail: 'Bei Totalschaden oder Diebstahl eines Neuwagens (oft 6–24 Monate) wird der Neuwert ersetzt.', empfohlen: false },
      { name: 'Schutzbrief', detail: 'Pannenhilfe und Abschleppen im In- und Ausland — oft günstiger als ein separater Automobilclub.', empfohlen: false },
    ],
  },
  motorrad: {
    title: 'Wichtige Leistungen einer Motorradversicherung',
    subtitle: 'Vergleichen Sie diese Merkmale — Preise und konkrete Tarife zeigt der Rechner oben.',
    merkmale: [
      { name: 'Deckungssumme 100 Mio. €', detail: 'Hohe Haftpflichtdeckung für Personen-, Sach- und Vermögensschäden.', empfohlen: true },
      { name: 'Schutzkleidung mitversichert', detail: 'Helm und Schutzkleidung sind im Schadenfall mit abgedeckt.', empfohlen: false },
      { name: 'Grobe Fahrlässigkeit', detail: 'Leistung bleibt auch bei grob fahrlässigem Verhalten bestehen.', empfohlen: false },
      { name: 'Saisonkennzeichen möglich', detail: 'Flexible Ruhezeiten bzw. monatliche Anpassung für Saisonfahrer.', empfohlen: false },
      { name: 'Neuwertentschädigung (Vollkasko)', detail: 'Ersatz des Neuwerts bei Totalschaden/Diebstahl innerhalb der ersten Monate.', empfohlen: false },
      { name: 'Fahrerschutz', detail: 'Sichert den Fahrer selbst bei selbst verschuldeten Unfällen ab.', empfohlen: false },
    ],
  },
  haftpflicht: {
    title: 'Wichtige Leistungen einer Privathaftpflicht',
    subtitle: 'Diese Merkmale unterscheiden gute von durchschnittlichen Tarifen — der Rechner zeigt Ihnen die Auswahl.',
    merkmale: [
      { name: 'Hohe Deckungssumme', detail: 'Mindestens 10–50 Mio. €, ideal unbegrenzt — wichtig bei schweren Personen- und Sachschäden.', empfohlen: true },
      { name: 'Forderungsausfalldeckung', detail: 'Zahlt, wenn der Schädiger selbst nicht zahlen kann und Sie auf dem Schaden sitzen bleiben.', empfohlen: true },
      { name: 'Schlüsselverlust', detail: 'Deckt den Austausch von Schlössern bei Verlust privater und beruflicher Schlüssel.', empfohlen: false },
      { name: 'Mietsachschäden', detail: 'Übernimmt Schäden an der gemieteten Wohnung (z. B. Wasserschaden, Kratzer am Boden).', empfohlen: false },
      { name: 'Gefälligkeitsschäden', detail: 'Schäden, die Sie bei einer Gefälligkeit für andere verursachen, sind mitversichert.', empfohlen: false },
      { name: 'Deliktunfähige Kinder mitversichert', detail: 'Kinder unter 7 Jahren (bzw. 10 im Straßenverkehr) sind eingeschlossen.', empfohlen: false },
    ],
  },
  hausrat: {
    title: 'Wichtige Leistungen einer Hausratversicherung',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — konkrete Tarife und Preise zeigt der Rechner oben.',
    merkmale: [
      { name: 'Elementarschäden', detail: 'Schutz bei Sturm, Hagel und Blitz — bei Extremwetter immer wichtiger.', empfohlen: true },
      { name: 'Unterversicherungsverzicht', detail: 'Bei Teilschäden wird nicht gekürzt, auch wenn die Versicherungssumme unter dem Wert liegt.', empfohlen: true },
      { name: 'Leitungswasserschäden', detail: 'Deckt Schäden durch Rohrbrüche und austretendes Wasser.', empfohlen: false },
      { name: 'Fahrraddiebstahl', detail: 'Auch außerhalb der Wohnung gestohlene Räder sind bis zu einer Summe abgedeckt.', empfohlen: false },
      { name: 'Außenversicherung', detail: 'Hausrat ist zeitweise auch im Hotel, am Arbeitsplatz oder im Auto mitversichert.', empfohlen: false },
      { name: 'Überspannungsschäden', detail: 'Schäden an Elektronik durch Blitzschlag oder Spannungsspitzen sind gedeckt.', empfohlen: false },
    ],
  },
  'haftpflicht-hausrat': {
    title: 'Leistungen im Überblick: Haftpflicht & Hausrat',
    subtitle: 'Die wichtigsten Merkmale beider Absicherungen — Details zeigt der jeweilige Rechner in den Tabs oben.',
    merkmale: [
      { name: 'Hohe Deckungssumme (Haftpflicht)', detail: 'Ideal 50 Mio. € oder unbegrenzt für Personen-, Sach- und Vermögensschäden.', empfohlen: true },
      { name: 'Forderungsausfalldeckung', detail: 'Greift, wenn der Verursacher zahlungsunfähig ist.', empfohlen: true },
      { name: 'Schlüsselverlust', detail: 'Austausch von Schlössern bei Verlust privater und beruflicher Schlüssel.', empfohlen: false },
      { name: 'Elementarschäden (Hausrat)', detail: 'Schutz bei Sturm, Hagel und Blitz für Ihr Hab und Gut.', empfohlen: true },
      { name: 'Unterversicherungsverzicht (Hausrat)', detail: 'Keine Kürzung bei Teilschäden durch zu niedrige Versicherungssumme.', empfohlen: false },
      { name: 'Fahrraddiebstahl (Hausrat)', detail: 'Räder sind auch außerhalb der Wohnung bis zu einer Summe versichert.', empfohlen: false },
    ],
  },
  rechtsschutz: {
    title: 'Wichtige Leistungen einer Rechtsschutzversicherung',
    subtitle: 'Vergleichen Sie diese Merkmale — die passenden Tarife zeigt der Rechner oben.',
    merkmale: [
      { name: 'Privat-, Berufs- & Verkehrsrechtsschutz', detail: 'Die drei wichtigsten Bausteine im Kombi-Paket.', empfohlen: true },
      { name: 'Freie Anwaltswahl', detail: 'Sie wählen Ihren Anwalt selbst und sind nicht an Partneranwälte gebunden.', empfohlen: true },
      { name: 'Wartezeit beachten', detail: 'Leistungen greifen meist erst nach 3 Monaten — vorher sind nur Notfälle abgedeckt.', empfohlen: true },
      { name: 'Telefonische Erstberatung / Mediation', detail: 'Oft kostenlose Erstberatung und außergerichtliche Einigung als Alternative zum Prozess.', empfohlen: false },
      { name: 'Ausreichende Deckungssumme', detail: 'Mindestens 250.000 €, besser unbegrenzt — Prozesse können teuer werden.', empfohlen: false },
    ],
  },
  wohngebaeude: {
    title: 'Wichtige Leistungen einer Wohngebäudeversicherung',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Tarife und Preise zeigt der Rechner oben.',
    merkmale: [
      { name: 'Feuer-, Leitungswasser-, Sturm-/Hagelschutz', detail: 'Die Basis-Absicherung für Ihr Gebäude.', empfohlen: true },
      { name: 'Elementarschäden', detail: 'Zusatzschutz bei Hochwasser, Starkregen, Erdbeben und Schneedruck.', empfohlen: true },
      { name: 'Grobe Fahrlässigkeit mitversichert', detail: 'Leistung auch bei grob fahrlässig verursachten Schäden.', empfohlen: false },
      { name: 'Neuwertentschädigung', detail: 'Wiederherstellung zum heutigen Neuwert statt Zeitwert.', empfohlen: false },
      { name: 'Photovoltaik / Mietausfall', detail: 'Optionaler Schutz für Solaranlagen und Ertragsausfall.', empfohlen: false },
    ],
  },
  berufsunfaehigkeit: {
    title: 'Wichtige Leistungen einer Berufsunfähigkeitsversicherung',
    subtitle: 'Diese Merkmale entscheiden über die Qualität des Schutzes — der Rechner zeigt Ihnen Tarife.',
    merkmale: [
      { name: 'Verzicht auf abstrakte Verweisung', detail: 'Der Versicherer darf Sie nicht auf einen anderen Beruf verweisen.', empfohlen: true },
      { name: 'Ausreichend hohe BU-Rente', detail: 'Richtwert: 70–80 % des Nettoeinkommens, damit der Lebensstandard erhalten bleibt.', empfohlen: true },
      { name: 'Leistungsdauer bis zum Rentenalter', detail: 'Die Rente sollte bis zum vertraglichen Rentenbeginn (z. B. 67) gezahlt werden.', empfohlen: false },
      { name: 'Nachversicherungsgarantie', detail: 'Erhöhung der Rente ohne erneute Gesundheitsprüfung (z. B. bei Heirat, Kind, Gehaltserhöhung).', empfohlen: false },
      { name: 'Dynamik', detail: 'Optionale jährliche Anpassung der Rente an die Inflation.', empfohlen: false },
    ],
  },
  unfall: {
    title: 'Wichtige Leistungen einer Unfallversicherung',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Tarife und Preise zeigt der Rechner oben.',
    merkmale: [
      { name: 'Hohe Progression / Gliedertaxe', detail: 'Bei schweren Unfällen steigt die Leistung überproportional (Progression).', empfohlen: true },
      { name: 'Unfallrente', detail: 'Monatliche Rente bei dauerhafter Beeinträchtigung.', empfohlen: false },
      { name: 'Geltungsbereich weltweit', detail: 'Schutz gilt rund um die Uhr und weltweit.', empfohlen: false },
      { name: 'Bergungskosten', detail: 'Übernimmt Kosten für Bergung und Rücktransport.', empfohlen: false },
      { name: 'Freizeitunfälle', detail: 'Auch Unfälle in der Freizeit sind vollständig mitversichert.', empfohlen: false },
    ],
  },
  risikoleben: {
    title: 'Wichtige Leistungen einer Risikolebensversicherung',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Tarife und Preise zeigt der Rechner oben.',
    merkmale: [
      { name: 'Passende Versicherungssumme', detail: 'Orientieren Sie sich an Kreditrest, Familie und Lebensstandard.', empfohlen: true },
      { name: 'Nachversicherungsgarantie', detail: 'Erhöhung ohne erneute Gesundheitsprüfung (z. B. bei Heirat oder Geburt).', empfohlen: true },
      { name: 'Leistung im Todesfall', detail: 'Die vereinbarte Summe wird an die Hinterbliebenen ausgezahlt.', empfohlen: false },
      { name: 'Transparente Gesundheitsfragen', detail: 'Klare und faire Fragen beim Abschluss vermeiden spätere Leistungsstreitigkeiten.', empfohlen: false },
    ],
  },
  rente: {
    title: 'Wichtige Merkmale einer privaten Rentenversicherung',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Tarife und Preise zeigt der Rechner oben.',
    merkmale: [
      { name: 'Garantie vs. Renditechance', detail: 'Prüfen Sie, welcher Teil der Rente garantiert ist und welcher von Überschüssen abhängt.', empfohlen: true },
      { name: 'Flexible Auszahlung', detail: 'Lebenslange Rente, Kapitalauszahlung oder eine Kombination — je nach Bedarf.', empfohlen: true },
      { name: 'Transparente Kosten', detail: 'Abschluss- und Verwaltungskosten mindern die Rendite — auf Ausweisung achten.', empfohlen: true },
      { name: 'Sonderzahlungen möglich', detail: 'Zuzahlungen erlauben eine flexible Erhöhung des Guthabens.', empfohlen: false },
    ],
  },
  pkv: {
    title: 'Wichtige Leistungen einer privaten Krankenversicherung',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Tarife und Preise zeigt der Rechner oben.',
    merkmale: [
      { name: 'Chefarzt & Einbettzimmer', detail: 'Je nach Tarif höherer Komfort bei Behandlung und Unterbringung.', empfohlen: false },
      { name: 'Beitragsrückerstattung', detail: 'Bei Leistungsfreiheit erhalten Sie oft einen Teil der Beiträge zurück.', empfohlen: false },
      { name: 'Altersrückstellungen', detail: 'Sorgen für stabilere Beiträge im Alter.', empfohlen: true },
      { name: 'Tarifwechsel ohne neue Gesundheitsprüfung', detail: 'Innerhalb des Versicherers oft möglich, um Tarif anzupassen.', empfohlen: false },
      { name: 'Selbstbeteiligung', detail: 'Eine höhere Selbstbeteiligung senkt den monatlichen Beitrag.', empfohlen: false },
    ],
  },
  girokonto: {
    title: 'Wichtige Merkmale eines Girokontos',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Konditionen zeigt der Rechner oben.',
    merkmale: [
      { name: 'Kostenlose Kontoführung', detail: 'Viele Konten sind bei regelmäßigem Geldeingang kostenlos.', empfohlen: true },
      { name: 'Kostenlose Karte & Bargeldabhebung', detail: 'Girocard und Geldautomaten-Nutzung ohne Gebühren.', empfohlen: true },
      { name: 'Transparenter Dispozins', detail: 'Der Zinssatz für die Kontoüberziehung sollte klar ausgewiesen sein.', empfohlen: false },
      { name: 'Online- & Mobile-Banking', detail: 'Komfortable Kontoführung per App und Web.', empfohlen: false },
      { name: 'Guthabenverzinsung', detail: 'Manche Konten verzinsen das Guthaben — bei Bedarf vergleichen.', empfohlen: false },
    ],
  },
  kredit: {
    title: 'Wichtige Merkmale eines Ratenkredits',
    subtitle: 'Darauf sollten Sie beim Vergleich achten — Konditionen zeigt der Rechner oben.',
    merkmale: [
      { name: 'Niedriger effektiver Jahreszins', detail: 'Der effektive Jahreszins ist das wichtigste Vergleichskriterium.', empfohlen: true },
      { name: 'Kostenlose Sondertilgung', detail: 'Erlaubt vorzeitige Rückzahlung ohne Zusatzkosten.', empfohlen: true },
      { name: 'Flexible Laufzeit', detail: 'Laufzeit an Ihr Budget anpassen — kürzer ist meist günstiger.', empfohlen: false },
      { name: 'Keine versteckten Gebühren', detail: 'Achten Sie auf Bearbeitungs- oder Abschlussgebühren.', empfohlen: false },
      { name: 'Restschuldversicherung optional', detail: 'Absicherung bei Tod oder Arbeitslosigkeit — nur bei Bedarf.', empfohlen: false },
    ],
  },
};
