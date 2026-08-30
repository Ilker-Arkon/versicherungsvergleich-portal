# 🔎 Partner-Netzwerk Analyse (Tarifcheck / Mr-Money)

> **Zusammenfassung aus NotebookLM Analyse**  
> *Dieses Dokument dient als Referenz für spätere Ausbaustufen und zur Überprüfung der Machbarkeit von Features.*

## 1. Rechtstexte & API-Schnittstellen

*   **Rechtstexte (Impressum, Datenschutz, Cookie-Banner):**
    *   **Status:** *Nicht enthalten.* Tarifcheck stellt keine fertigen Rechtstexte für die Endkundenwebseite bereit.
    *   **To-Do für uns:** Da wir Drittanbieter-Elemente (iFrames/Rechner) einbinden, müssen Datenschutzerklärung, Impressum und Cookie-Consent-Banner über externe Dienste (z. B. eRecht24 oder IT-Recht Kanzlei) generiert und rechtskonform eingebaut werden.
*   **API-Schnittstellen (REST / Rohdaten):**
    *   **Status:** *Keine direkte Daten-API verfügbar.*
    *   **Konsequenz:** Eine native Anzeige der Tarife (z. B. als echtes React-Grid ohne iFrame) ist nicht ohne weiteres möglich. Die Einbindung erfolgt zwingend über White-Label-Code-Snippets / iFrames. Der Vorteil: Die Rechner sind stets automatisch rechtlich aktuell und gepflegt.

## 2. Verfügbare Werbemittel & Features für den weiteren Ausbau

*   **White-Label-Rechner (Design-Anpassung):**
    *   Die vollfunktionalen iFrame-Tarifrechner lassen sich optisch und farblich im Partner-Backend an das Layout unserer App anpassen (Seamless Integration).
*   **Interaktive Kurzrechner:**
    *   Wir können kompakte Kurzrechner-Elemente direkt in unsere Ratgeber-Artikel (`/ratgeber/...`) einbauen, um Besucher schneller in den Trichter zu holen.
*   **E-Mail Marketing:**
    *   Responsive HTML-Newsletter-Vorlagen stehen im Partnerprogramm zur Verfügung.
*   **Gutschein- & Sonderaktionen:**
    *   Wir können regelmäßige Aktionen (z. B. Amazon-Gutscheine, BestChoice, Cashback) als zusätzliche Klick-Anreize für unsere User in die App einbauen.
*   **Eigensale:**
    *   Eigene Verträge (Kfz, Wohngebäude etc.) können über das Portal abgeschlossen werden, um die Provision als Cashback selbst zu kassieren.
*   **Ausbau-Potenzial (CHECK24-Netzwerk):**
    *   Erweiterung um die Sparten: Strom & Gas, DSL, Handytarife, Pauschalreisen, Mietwagen.
*   **Support:**
    *   Direkter Draht per E-Mail (`support@tarifcheck.de`) und Telefon für technische Integrationen.
