// Inhalte des WiSo-Quiz: Wirtschafts- und Sozialkunde für die Umschulung zum
// Fachinformatiker Systemintegration – Kurstests und Prüfungsbereich WiSo der
// IHK-Abschlussprüfung Teil 2.
//
// Die Kapitel folgen den Themenblöcken der Unterrichtsunterlagen. Jede Frage prüft genau
// ein Lernziel; Fragen ohne Lernziel sind als Zusatzwissen gekennzeichnet.
//
// Aufbau einer Aufgabe:
//   nr           Aufgabennummer. Bei Aufgaben aus den Arbeitsblättern die Originalnummer.
//   typ          "auswahl" | "zuordnung" | "reihenfolge" | "eingabe"
//   lernziel     ID aus "lernziele" – bei Zusatzfragen null
//   zusatz       true, wenn die Frage kein Lernziel prüft, aber wichtiges Prüfungswissen ist
//   zusatzGrund  nur bei zusatz: true – ein Satz, warum das Thema wichtig ist
//   fundstelle   (optional) Fundstelle in den Unterrichtsunterlagen
//   sachverhalt  (optional) Absätze vor der eigentlichen Frage, normal gesetzt
//   frage        die Frage selbst (fett)
//   begruendung  Erklärung, die nach dem Prüfen angezeigt wird
//
// Felder je Aufgabentyp:
//   auswahl      antworten  Antwortmöglichkeiten in der Reihenfolge A, B, C, …
//                loesung    Nummern der anzukreuzenden Antworten: 1 = A, 2 = B, …
//                negativ    true, wenn nach der falschen bzw. nicht zutreffenden Aussage
//                           gefragt ist – dann sind in "loesung" die falschen Aussagen
//   zuordnung    optionen   Begriffe, nummeriert 1 bis n
//                aussagen   Aussagen, die je einem Begriff zugeordnet werden
//                loesung    Optionsnummer je Aussage
//   reihenfolge  schritte   Schritte in der Anzeigereihenfolge
//                loesung    Platz je Schritt, 1 = zuerst (Permutation von 1 bis n)
//   eingabe      art        "zahl" | "datum"
//                einheit    (optional) Einheit hinter dem Eingabefeld, z. B. "€"
//                loesung    Zahl bzw. Datum als "TT.MM.JJJJ"
//                toleranz   (nur bei art "zahl") erlaubte Abweichung
//
// Eine Aufgabe zählt nur, wenn alles stimmt.
//
// Erlaubte Auszeichnungen in den Texten: <b>fett</b>, <mark>Signalwort</mark> (gelb markiert).
// Vor dem Veröffentlichen prüft tests/pruefe-fragen.mjs diese Datei.

globalThis.QUIZ_DATA = {
  "titel": "WiSo-Quiz",
  "stand": "2026-10",
  "pdf": "WiSo_Fragen_mit_Loesungsblatt.pdf",
  "lernziele": [
    {
      "id": "1.1",
      "kapitel": 1,
      "text": "den Begriff Betrieb definieren",
      "abgeleitet": false
    },
    {
      "id": "1.2",
      "kapitel": 1,
      "text": "Betriebe nach verschiedenen Kriterien einteilen",
      "abgeleitet": false
    },
    {
      "id": "1.3",
      "kapitel": 1,
      "text": "betriebliche Produktionsfaktoren erläutern",
      "abgeleitet": false
    },
    {
      "id": "1.4",
      "kapitel": 1,
      "text": "Umsatz und Absatz unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "1.5",
      "kapitel": 1,
      "text": "zwischenbetriebliche Zusammenarbeit erklären",
      "abgeleitet": false
    },
    {
      "id": "1.6",
      "kapitel": 1,
      "text": "prüfungsnahe Aufgaben sicher bearbeiten",
      "abgeleitet": false
    },
    {
      "id": "2.1",
      "kapitel": 2,
      "text": "den Begriff Gesellschafts-/Wirtschaftsordnung erklären",
      "abgeleitet": false
    },
    {
      "id": "2.2",
      "kapitel": 2,
      "text": "die Grundidee der Sozialen Marktwirtschaft erläutern",
      "abgeleitet": false
    },
    {
      "id": "2.3",
      "kapitel": 2,
      "text": "die Aufgaben und Ziele von Betrieben nennen",
      "abgeleitet": false
    },
    {
      "id": "2.4",
      "kapitel": 2,
      "text": "den einfachen Wirtschaftskreislauf erklären",
      "abgeleitet": false
    },
    {
      "id": "2.5",
      "kapitel": 2,
      "text": "den erweiterten Wirtschaftskreislauf mit Staat und Banken beschreiben",
      "abgeleitet": false
    },
    {
      "id": "2.6",
      "kapitel": 2,
      "text": "die volkswirtschaftliche Bedeutung von Betrieben erklären",
      "abgeleitet": false
    },
    {
      "id": "3.1",
      "kapitel": 3,
      "text": "Wettbewerb verstehen",
      "abgeleitet": false
    },
    {
      "id": "3.2",
      "kapitel": 3,
      "text": "Arbeitsteilung in der Wirtschaft erklären",
      "abgeleitet": false
    },
    {
      "id": "3.3",
      "kapitel": 3,
      "text": "Preisbildung im Polypol verstehen und beschreiben",
      "abgeleitet": false
    },
    {
      "id": "3.4",
      "kapitel": 3,
      "text": "Kooperation und Kartelle unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "3.5",
      "kapitel": 3,
      "text": "Unternehmenskonzentration erklären",
      "abgeleitet": false
    },
    {
      "id": "3.6",
      "kapitel": 3,
      "text": "Ziele der staatlichen Wettbewerbspolitik verstehen",
      "abgeleitet": false
    },
    {
      "id": "3.7",
      "kapitel": 3,
      "text": "Marktformen – Monopol, Oligopol und Polypol – unterscheiden und Marktsituationen zuordnen",
      "abgeleitet": true
    },
    {
      "id": "4.1",
      "kapitel": 4,
      "text": "die Bedeutung des Handelsrechts erklären",
      "abgeleitet": false
    },
    {
      "id": "4.2",
      "kapitel": 4,
      "text": "die Kaufmannseigenschaft nach HGB unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "4.3",
      "kapitel": 4,
      "text": "Handelsregister und Firma erklären",
      "abgeleitet": false
    },
    {
      "id": "4.4",
      "kapitel": 4,
      "text": "handelsrechtliche Vollmachten unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "4.5",
      "kapitel": 4,
      "text": "Unternehmensformen vergleichen",
      "abgeleitet": false
    },
    {
      "id": "4.6",
      "kapitel": 4,
      "text": "Voraussetzungen einer Unternehmensgründung nennen",
      "abgeleitet": false
    },
    {
      "id": "4.7",
      "kapitel": 4,
      "text": "Aufbau eines Businessplans erklären",
      "abgeleitet": false
    },
    {
      "id": "4.8",
      "kapitel": 4,
      "text": "prüfungsnahe Fälle bearbeiten",
      "abgeleitet": false
    },
    {
      "id": "5.1",
      "kapitel": 5,
      "text": "Sie können die wichtigsten Rechtsquellen des Arbeitsrechts richtig einordnen.",
      "abgeleitet": false
    },
    {
      "id": "5.2",
      "kapitel": 5,
      "text": "Sie verstehen Aufbau und Bedeutung eines Arbeitsvertrages.",
      "abgeleitet": false
    },
    {
      "id": "5.3",
      "kapitel": 5,
      "text": "Sie kennen Kündigungsarten, Fristen und besonderen Kündigungsschutz.",
      "abgeleitet": false
    },
    {
      "id": "5.4",
      "kapitel": 5,
      "text": "Sie unterscheiden einfaches und qualifiziertes Arbeitszeugnis.",
      "abgeleitet": false
    },
    {
      "id": "5.5",
      "kapitel": 5,
      "text": "Sie wissen, wann Arbeitsgericht oder Sozialgericht zuständig ist.",
      "abgeleitet": false
    },
    {
      "id": "5.6",
      "kapitel": 5,
      "text": "Personalbeschaffung intern und extern unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "5.7",
      "kapitel": 5,
      "text": "Tarifverträge und ihre Funktionen erklären",
      "abgeleitet": false
    },
    {
      "id": "5.8",
      "kapitel": 5,
      "text": "Fürsorgepflicht, Verschwiegenheitspflicht und Entgeltfortzahlung im Krankheitsfall anwenden",
      "abgeleitet": true
    },
    {
      "id": "6.1",
      "kapitel": 6,
      "text": "das System der dualen Ausbildung erklären können",
      "abgeleitet": false
    },
    {
      "id": "6.2",
      "kapitel": 6,
      "text": "die wichtigsten Rechtsgrundlagen der Berufsausbildung kennen",
      "abgeleitet": false
    },
    {
      "id": "6.3",
      "kapitel": 6,
      "text": "zwischen BBiG, Ausbildungsordnung und Ausbildungsrahmenplan unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "6.4",
      "kapitel": 6,
      "text": "Inhalte eines Berufsausbildungsvertrags benennen können",
      "abgeleitet": false
    },
    {
      "id": "6.5",
      "kapitel": 6,
      "text": "Rechte und Pflichten von Ausbildenden und Auszubildenden anwenden können",
      "abgeleitet": false
    },
    {
      "id": "6.6",
      "kapitel": 6,
      "text": "Berufsausbildung, Fortbildung, Umschulung und Berufsvorbereitung unterscheiden",
      "abgeleitet": true
    },
    {
      "id": "7.1",
      "kapitel": 7,
      "text": "die Funktion des Betriebsverfassungsrechts verstehen",
      "abgeleitet": false
    },
    {
      "id": "7.2",
      "kapitel": 7,
      "text": "zentrale Inhalte des Betriebsverfassungsgesetzes erklären können",
      "abgeleitet": false
    },
    {
      "id": "7.3",
      "kapitel": 7,
      "text": "Aufgaben von Betriebsrat und JAV unterscheiden",
      "abgeleitet": false
    },
    {
      "id": "7.4",
      "kapitel": 7,
      "text": "unternehmerische Mitbestimmung erläutern",
      "abgeleitet": false
    },
    {
      "id": "7.5",
      "kapitel": 7,
      "text": "Mitbestimmungsformen im Aufsichtsrat kennen",
      "abgeleitet": false
    }
  ],
  "kapitel": [
    {
      "nr": 1,
      "titel": "Der Betrieb",
      "bereich": "Begriff, Einteilung, Produktionsfaktoren",
      "fragen": [
        {
          "nr": 1,
          "typ": "auswahl",
          "lernziel": "1.1",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Was ist ein Betrieb?",
          "frage": "Was ist ein Betrieb?",
          "antworten": [
            "Eine rechtlich selbstständige Einheit, die ausschließlich Sachgüter herstellt und verkauft.",
            "Eine wirtschaftliche Einheit, die Produktionsfaktoren kombiniert, um Güter oder Dienstleistungen zur Bedürfnisbefriedigung herzustellen.",
            "Der Zusammenschluss mehrerer Unternehmen unter einheitlicher Leitung zur gemeinsamen Marktbearbeitung.",
            "Die Gesamtheit aller Kosten, die bei der Herstellung eines Produktes oder einer Dienstleistung anfallen.",
            "Eine öffentliche Einrichtung, die Güter grundsätzlich ohne Gewinnerzielungsabsicht bereitstellt."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B: Ein Betrieb ist eine <b>wirtschaftliche Einheit</b>, die <b>Produktionsfaktoren kombiniert</b>, um Güter oder Dienstleistungen zur <b>Bedürfnisbefriedigung</b> herzustellen. Drei Merkmale stecken darin: kombinieren, leisten, wirtschaftlich handeln. A ist zu eng – auch reine Dienstleistungsbetriebe sind Betriebe, und die Rechtsform spielt für den Begriff keine Rolle. C beschreibt den <b>Konzern</b>. D beschreibt die <b>Produktionskosten</b>, also den finanziellen Aufwand der Herstellung, nicht den Betrieb selbst. E trifft nur auf gemeinnützige Betriebe zu und taugt deshalb nicht als allgemeine Definition."
        },
        {
          "nr": 2,
          "typ": "auswahl",
          "lernziel": "1.1",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Was bedeutet wirtschaftliche Einheit?",
          "sachverhalt": [
            "Ein IT-Systemhaus mit 40 Beschäftigten betreut die Netzwerke mittelständischer Kunden. Es beschäftigt Technikerinnen und Techniker, nutzt Messgeräte, Fahrzeuge und eine Ticket-Software, verbaut Kabel und Switches und kalkuliert jeden Auftrag vorab."
          ],
          "frage": "Welche <b>zwei</b> Aussagen begründen, dass das Systemhaus eine wirtschaftliche Einheit ist?",
          "antworten": [
            "Es kombiniert Arbeit, Betriebsmittel, Werkstoffe sowie Informationen und Know-how zu einer Leistung.",
            "Es beachtet dabei Kosten und Erträge und handelt damit wirtschaftlich.",
            "Es ist im Handelsregister eingetragen und dadurch rechtlich selbstständig.",
            "Es beschäftigt mehr als zehn Mitarbeitende und erreicht damit die Mindestgröße eines Betriebs.",
            "Es erzielt seinen Umsatz überwiegend mit Dienstleistungen statt mit Sachgütern."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Eine <b>wirtschaftliche Einheit</b> liegt vor, wenn ein Betrieb <b>Produktionsfaktoren zusammenfasst</b> – Arbeit, Betriebsmittel, Werkstoffe, Informationen – und dabei <b>wirtschaftlich handelt</b>, also Kosten und Erträge beachtet. Genau das beschreiben A und B. C ist falsch: Der Handelsregistereintrag betrifft die Kaufmannseigenschaft, nicht den Betriebsbegriff – auch ein nicht eingetragenes Kleingewerbe ist ein Betrieb. D ist falsch: Eine Mindestzahl an Beschäftigten gehört nicht zur Definition. E ist falsch: Ob <b>Sachleistungs-</b> oder <b>Dienstleistungsbetrieb</b>, ist ein Einteilungskriterium und kein Merkmal der wirtschaftlichen Einheit."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "1.1",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Produktionskosten / Betriebskosten",
          "frage": "Welche Aussage über Produktionskosten und Betriebskosten ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Produktionskosten sind alle Kosten, die entstehen, um ein Produkt oder eine Dienstleistung herzustellen.",
            "Zu den Produktionskosten zählen zum Beispiel Materialkosten, Personalkosten, Energiekosten und Abschreibungen.",
            "Betriebskosten fallen an, um den laufenden Betrieb aufrechtzuerhalten – unabhängig davon, wie viel produziert wird.",
            "Betriebskosten entstehen nur dann, wenn tatsächlich produziert wird, und sind deshalb stets ein Teil der Produktionskosten.",
            "Die Miete für die Geschäftsräume muss der Betrieb auch dann aufwenden, wenn in einem Monat kaum Aufträge anfallen."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. <b>Betriebskosten</b> (operative Kosten) fallen gerade <mark>unabhängig</mark> von der produzierten Menge an; sie halten den laufenden Betrieb am Leben, zum Beispiel Miete, Versicherungen oder Verwaltung. Damit sind sie weder an die Produktion gekoppelt noch zwingend Teil der Produktionskosten. A, B, C und E stimmen: <b>Produktionskosten</b> sind der finanzielle Aufwand der Herstellung und umfassen Material-, Personal-, Energie- und Maschinenkosten sowie Abschreibungen; E ist das Schulbeispiel für eine Kostenart, die auch ohne Auftrag weiterläuft."
        },
        {
          "nr": 4,
          "typ": "zuordnung",
          "lernziel": "1.2",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Einteilung nach Wirtschaftssektoren",
          "frage": "Ordnen Sie jedem Betrieb den Wirtschaftssektor zu.",
          "optionen": [
            "Primärer Sektor (Urproduktion)",
            "Sekundärer Sektor (Industrie, Handwerk)",
            "Tertiärer Sektor (Dienstleistungen)"
          ],
          "aussagen": [
            "Ein IT-Systemhaus betreut die Server seiner Kunden.",
            "Ein Hersteller fertigt Netzwerkschränke aus Stahlblech.",
            "Ein Forstbetrieb schlägt Holz ein.",
            "Ein Rechenzentrum vermietet Speicherplatz und Rechenleistung.",
            "Eine Bäckerei backt und verkauft Brot."
          ],
          "loesung": [3, 2, 1, 3, 2],
          "begruendung": "Der <b>primäre Sektor</b> (Urproduktion) gewinnt Rohstoffe aus der Natur – dazu gehört der Forstbetrieb. Der <b>sekundäre Sektor</b> verarbeitet diese Rohstoffe in Industrie und Handwerk – dazu zählen der Schrankhersteller und die Bäckerei, denn Handwerk gehört zum zweiten Sektor und nicht zum Dienstleistungsbereich. Der <b>tertiäre Sektor</b> erbringt Dienstleistungen – Systemhaus und Rechenzentrum verkaufen Leistung, kein Sachgut. Typische Falle: Die Bäckerei wird oft dem Handel oder den Dienstleistungen zugeordnet; entscheidend ist aber, dass sie selbst <b>produziert</b>."
        },
        {
          "nr": 5,
          "typ": "auswahl",
          "lernziel": "1.2",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Einteilung nach Größe",
          "sachverhalt": [
            "Ein Zulieferer der IT-Branche beschäftigt 180 Mitarbeiterinnen und Mitarbeiter."
          ],
          "frage": "Wie wird der Betrieb nach der Mitarbeiterzahl eingeordnet?",
          "antworten": [
            "Als Kleinbetrieb, weil die Zahl unter 250 Beschäftigten liegt.",
            "Als Mittelbetrieb, weil die Zahl zwischen rund 50 und 250 Beschäftigten liegt.",
            "Als Großbetrieb, weil mehr als 100 Beschäftigte vorhanden sind.",
            "Als Großbetrieb, weil mehr als 150 Beschäftigte vorhanden sind.",
            "Eine Einordnung ist nicht möglich, weil allein die Bilanzsumme über die Betriebsgröße entscheidet."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Nach der Einteilung aus dem Unterricht gilt: <b>Kleinbetrieb</b> rund 10 bis 50 Mitarbeitende, <b>Mittelbetrieb</b> rund 50 bis 250, <b>Großbetrieb</b> über 250. Mit 180 Beschäftigten liegt der Zulieferer im mittleren Bereich. A verschiebt die Grenze des Kleinbetriebs viel zu weit nach oben. C und D setzen die Schwelle zum Großbetrieb zu niedrig an – sie liegt bei über 250. E ist falsch: Zur Größeneinteilung zählen <b>Mitarbeiteranzahl, Umsatz und Bilanzsumme</b>; die Mitarbeiterzahl ist dabei das gebräuchlichste Merkmal."
        },
        {
          "nr": 6,
          "typ": "auswahl",
          "lernziel": "1.2",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Einteilung von Betrieben",
          "frage": "Welche Aussage zur Einteilung von Betrieben ist <mark>falsch</mark>?",
          "antworten": [
            "Nach Wirtschaftssektoren unterscheidet man primären, sekundären und tertiären Sektor.",
            "Nach der Art der Leistung unterscheidet man Sachleistungs- und Dienstleistungsbetriebe.",
            "Nach der Rechtsform unterscheidet man Einzelunternehmen, Personengesellschaften und Kapitalgesellschaften.",
            "Nach der Gewinnorientierung unterscheidet man gewinnorientierte und gemeinnützige Betriebe.",
            "Nach dem Standort unterscheidet man Istkaufleute, Kannkaufleute und Formkaufleute."
          ],
          "loesung": [5],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist E. Nach dem <b>Standort</b> unterscheidet man <b>lokal, national und international</b>. <b>Istkaufmann, Kannkaufmann und Formkaufmann</b> sind dagegen Kaufmannsarten nach dem HGB und haben mit dem Standort nichts zu tun. A bis D nennen die üblichen Einteilungskriterien: Wirtschaftssektor, Art der Leistung, Rechtsform und Gewinnorientierung – dazu kommen noch Größe und Standort."
        },
        {
          "nr": 7,
          "typ": "auswahl",
          "lernziel": "1.3",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Produktionsfaktoren nach Say",
          "frage": "Welche <b>drei</b> Faktoren zählen zu den volkswirtschaftlichen Produktionsfaktoren nach Jean-Baptiste Say?",
          "antworten": [
            "Arbeit",
            "Boden",
            "Kapital",
            "Werkstoffe",
            "Dispositiver Faktor"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Die <b>volkswirtschaftlichen Produktionsfaktoren nach Say</b> sind <b>Arbeit, Boden und Kapital</b>. D und E gehören zur zweiten Systematik: <b>Werkstoffe</b> sind ein <b>Elementarfaktor</b> der betriebswirtschaftlichen Einteilung <b>nach Erich Gutenberg</b> (neben Arbeit und Betriebsmitteln), der <b>dispositive Faktor</b> steht dort für Leitung und Organisation. Beide Systematiken werden in der Prüfung gern vermischt – Say kennt den Boden, Gutenberg nicht."
        },
        {
          "nr": 8,
          "typ": "zuordnung",
          "lernziel": "1.3",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Produktionsfaktoren nach Gutenberg",
          "frage": "Ordnen Sie jedem Beispiel den betriebswirtschaftlichen Produktionsfaktor nach Gutenberg zu.",
          "optionen": [
            "Arbeit",
            "Werkstoffe",
            "Betriebsmittel",
            "Dispositiver Faktor"
          ],
          "aussagen": [
            "Die Technikerin montiert einen Switch im Serverschrank.",
            "Das Netzwerkkabel, das dabei verlegt wird.",
            "Der Firmenwagen, mit dem sie zum Kunden fährt.",
            "Die Geschäftsführung plant den Personaleinsatz für das nächste Quartal.",
            "Der Strom, den die Server im laufenden Betrieb verbrauchen."
          ],
          "loesung": [1, 2, 3, 4, 2],
          "begruendung": "<b>Arbeit</b> ist die körperliche und geistige Tätigkeit der Mitarbeitenden – die Montage. <b>Werkstoffe</b> gehen in das Produkt ein oder werden bei der Leistungserstellung verbraucht; dazu zählen das Kabel als <b>Rohstoff</b> und der Strom als <b>Betriebsstoff</b>. <b>Betriebsmittel</b> werden langfristig genutzt, ohne in das Produkt einzugehen – der Firmenwagen. Der <b>dispositive Faktor</b> ist Leitung und Organisation: Planung, Organisation, Kontrolle und Entscheidungen. Typische Falle ist der Strom: Er wird häufig für ein Betriebsmittel gehalten, ist aber ein <b>Betriebsstoff</b> und damit ein Werkstoff."
        },
        {
          "nr": 9,
          "typ": "auswahl",
          "lernziel": "1.3",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Werkstoffe: Roh-, Hilfs- und Betriebsstoffe",
          "sachverhalt": [
            "Ein Hersteller fertigt Netzwerkschränke. Das Gehäuse entsteht aus Stahlblech, zusammengehalten wird es von Schrauben. Die Fertigungsmaschinen laufen mit Strom, konstruiert werden die Schränke von einem eigenen Entwicklungsteam."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur Einordnung der Produktionsfaktoren treffen zu?",
          "antworten": [
            "Das Stahlblech für das Gehäuse ist ein Rohstoff.",
            "Die Schrauben für die Montage sind Hilfsstoffe.",
            "Der Strom für die Fertigungsmaschinen ist ein Rohstoff.",
            "Die Fertigungsmaschine selbst ist ein Werkstoff.",
            "Das Know-how der Konstrukteure ist ein Elementarfaktor nach Gutenberg."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. <b>Rohstoffe</b> bilden den Hauptbestandteil des Produkts – das Stahlblech. <b>Hilfsstoffe</b> gehen zwar ins Produkt ein, aber nur in geringem Umfang – die Schrauben. C ist falsch: Strom ist ein <b>Betriebsstoff</b>, er wird bei der Produktion verbraucht, ohne in das Produkt einzugehen. D ist falsch: Die Maschine ist ein <b>Betriebsmittel</b>, weil sie langfristig genutzt wird und nicht in das Produkt eingeht. E ist falsch: <b>Elementarfaktoren</b> nach Gutenberg sind nur <b>Arbeit, Werkstoffe und Betriebsmittel</b>; Planung, Organisation und Entscheidungen fallen unter den <b>dispositiven Faktor</b>."
        },
        {
          "nr": 10,
          "typ": "eingabe",
          "lernziel": "1.4",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Betriebliche Leistungen: Absatz und Umsatz",
          "sachverhalt": [
            "Ein IT-Händler verkauft im ersten Quartal 1.250 Notebooks zu einem Stückpreis von 840 €."
          ],
          "frage": "Berechnen Sie den Umsatz des ersten Quartals.",
          "art": "zahl",
          "einheit": "€",
          "loesung": 1050000,
          "toleranz": 0.01,
          "begruendung": "Der <b>Umsatz</b> ist <b>Absatz × Preis</b>. Rechenweg: 1.250 Stück × 840 € = <b>1.050.000 €</b>. Gegenprobe: 1.050.000 € ÷ 840 € = 1.250 Stück – das ist wieder der Absatz. Merke die Rollenverteilung: Der <b>Absatz</b> ist die <mark>Menge</mark> (hier 1.250 Stück), der <b>Umsatz</b> ist der <mark>Wert</mark> (hier 1.050.000 €). Wer beides vertauscht, rechnet in der Prüfung mit der falschen Größe weiter."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "1.4",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Wichtige Begriffe",
          "frage": "Welche Aussage über Absatz und Umsatz ist <mark>falsch</mark>?",
          "antworten": [
            "Der Absatz ist die verkaufte Menge.",
            "Der Umsatz ergibt sich aus Absatz mal Preis.",
            "Der Absatz ist der Wert der verkauften Güter, der Umsatz die verkaufte Menge.",
            "Verkauft ein Betrieb 1.000 Stück zu 20 €, beträgt der Umsatz 20.000 €.",
            "Der Absatz ist eine Mengengröße, der Umsatz eine Wertgröße."
          ],
          "loesung": [3],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist C. Sie vertauscht beide Begriffe: Richtig ist <b>Absatz = verkaufte Menge</b> und <b>Umsatz = Absatz × Preis</b>. Das ist die häufigste Verwechslung an dieser Stelle, und sie führt in der Prüfung dazu, dass mit der falschen Größe weitergerechnet wird. A, B, D und E stimmen: Der Absatz ist eine <mark>Mengengröße</mark>, der Umsatz eine <mark>Wertgröße</mark>; das Rechenbeispiel aus den Unterlagen bestätigt das – 1.000 Stück × 20 € = 20.000 € Umsatz."
        },
        {
          "nr": 12,
          "typ": "zuordnung",
          "lernziel": "1.4",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Konsum- und Investitionsgüter",
          "frage": "Ordnen Sie jedes Gut richtig zu.",
          "optionen": [
            "Konsumgut",
            "Investitionsgut"
          ],
          "aussagen": [
            "Ein privat gekauftes Smartphone",
            "Ein Firmen-LKW",
            "Eine Produktionsmaschine",
            "Lebensmittel für den privaten Haushalt",
            "Eine Computeranlage für das Büro eines Unternehmens"
          ],
          "loesung": [1, 2, 2, 1, 2],
          "begruendung": "<b>Konsumgüter</b> gehen an <b>private Haushalte</b> und dienen unmittelbar der Bedürfnisbefriedigung – Smartphone und Lebensmittel. <b>Investitionsgüter</b> werden von <b>Unternehmen</b> beschafft, um damit weitere Leistungen zu erstellen – Firmen-LKW, Produktionsmaschine und Büro-Computeranlage. Entscheidend ist nicht die Art des Gegenstands, sondern <mark>wer</mark> ihn <mark>wofür</mark> nutzt: Dasselbe Notebook ist im Privathaushalt ein Konsumgut und im Unternehmen ein Investitionsgut."
        },
        {
          "nr": 13,
          "typ": "zuordnung",
          "lernziel": "1.5",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Zwischenbetriebliche Zusammenarbeit",
          "frage": "Ordnen Sie jeder Beschreibung die Form der zwischenbetrieblichen Zusammenarbeit zu.",
          "optionen": [
            "Kooperation",
            "Konzern",
            "Fusion",
            "Kartell"
          ],
          "aussagen": [
            "Rechtlich selbstständige Unternehmen arbeiten freiwillig zusammen und bleiben eigenständig.",
            "Mehrere rechtlich selbstständige Unternehmen stehen unter einheitlicher Leitung.",
            "Zwei Unternehmen schließen sich zu einem neuen Unternehmen zusammen.",
            "Unternehmen treffen Absprachen über Preise oder Mengen, um den Wettbewerb einzuschränken."
          ],
          "loesung": [1, 2, 3, 4],
          "begruendung": "Die vier Formen unterscheiden sich daran, wie viel Selbstständigkeit übrig bleibt. Bei der <b>Kooperation</b> bleiben die Partner rechtlich <mark>und</mark> wirtschaftlich selbstständig. Im <b>Konzern</b> bleibt die rechtliche Selbstständigkeit erhalten, die wirtschaftliche geht an die einheitliche Leitung über. Bei der <b>Fusion</b> verschmelzen die Unternehmen – beide Formen der Selbstständigkeit gehen verloren. Das <b>Kartell</b> ist keine Organisationsform, sondern eine <b>wettbewerbswidrige Absprache</b> rechtlich selbstständiger Unternehmen und nach dem <b>GWB</b> grundsätzlich verboten."
        },
        {
          "nr": 14,
          "typ": "auswahl",
          "lernziel": "1.5",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Zwischenbetriebliche Zusammenarbeit",
          "sachverhalt": [
            "Zwei IT-Dienstleister schließen sich zusammen. Nach dem Zusammenschluss gibt es nur noch ein einziges Unternehmen; die beiden bisherigen Gesellschaften sind erloschen."
          ],
          "frage": "Um welche Form handelt es sich, und was folgt daraus?",
          "antworten": [
            "Konzern – die rechtliche Selbstständigkeit bleibt erhalten, die wirtschaftliche geht verloren.",
            "Fusion – rechtliche und wirtschaftliche Selbstständigkeit gehen beide verloren.",
            "Kooperation – beide Unternehmen bleiben rechtlich und wirtschaftlich selbstständig.",
            "Kartell – die Unternehmen bleiben selbstständig und stimmen lediglich ihre Preise ab.",
            "Übernahme – das gekaufte Unternehmen besteht als eigene Gesellschaft weiter."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Weil die alten Gesellschaften <mark>erloschen</mark> sind und nur ein neues Unternehmen übrig bleibt, liegt eine <b>Fusion</b> (Verschmelzung) vor: <b>rechtliche und wirtschaftliche Selbstständigkeit</b> gehen verloren. A beschreibt den <b>Konzern</b> – dort bestehen die Gesellschaften rechtlich weiter, nur die Leitung ist einheitlich. C beschreibt die <b>Kooperation</b>, bei der beide Formen der Selbstständigkeit erhalten bleiben. D passt nicht, weil es hier nicht um Absprachen geht. E beschreibt die <b>Übernahme</b> – das widerspricht dem Sachverhalt, denn dort bliebe die gekaufte Gesellschaft bestehen."
        },
        {
          "nr": 15,
          "typ": "auswahl",
          "lernziel": "1.5",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ und „Marktstrukturen“ – Kartell",
          "frage": "Welche Aussage zum Kartell ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Bei einem Kartell treffen rechtlich selbstständige Unternehmen Absprachen über Preise oder Mengen.",
            "Ein Kartell schränkt den Wettbewerb ein oder beeinflusst ihn.",
            "Kartelle sind in Deutschland nach dem GWB und im EU-Recht grundsätzlich verboten.",
            "Ein Kartell ist zulässig, solange die beteiligten Unternehmen rechtlich selbstständig bleiben.",
            "Das Bundeskartellamt deckt Kartelle auf und kann Geldbußen verhängen."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Die rechtliche Selbstständigkeit ist gerade das <mark>Merkmal</mark> des Kartells und kein Rechtfertigungsgrund: Nach <b>§ 1 GWB</b> sind Vereinbarungen zwischen Unternehmen verboten, die den Wettbewerb verhindern, einschränken oder verfälschen. A, B, C und E stimmen: Das Kartell ist eine <b>wettbewerbswidrige Absprache</b> selbstständiger Unternehmen, es beschränkt den Wettbewerb, es ist national wie europäisch grundsätzlich verboten, und das <b>Bundeskartellamt</b> verfolgt es."
        },
        {
          "nr": 16,
          "typ": "auswahl",
          "lernziel": "1.6",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Grundsätze der Produktion",
          "frage": "Welche Aussage zum Wirtschaftlichkeitsprinzip ist richtig?",
          "antworten": [
            "Beim Minimalprinzip steht das Ziel fest und der Aufwand wird so gering wie möglich gehalten.",
            "Beim Minimalprinzip steht der Aufwand fest und der Ertrag wird größtmöglich gestaltet.",
            "Beim Maximalprinzip werden Aufwand und Ertrag gleichzeitig vorgegeben.",
            "Minimal- und Maximalprinzip schließen eine nachhaltige Produktion grundsätzlich aus.",
            "Das Wirtschaftlichkeitsprinzip verlangt, den Gewinn ohne Rücksicht auf die Kosten zu steigern."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Das <b>Wirtschaftlichkeitsprinzip</b> hat zwei Ausprägungen: Beim <b>Minimalprinzip</b> ist das <mark>Ziel fest</mark> und der Aufwand wird minimiert; beim <b>Maximalprinzip</b> ist der <mark>Aufwand fest</mark> und der Ertrag wird maximiert. B vertauscht genau diese beiden – die klassische Prüfungsfalle. C ist falsch, weil immer nur eine der beiden Größen vorgegeben sein kann; sonst gäbe es nichts zu optimieren. D ist falsch: <b>Nachhaltigkeit</b> steht gleichberechtigt neben dem Wirtschaftlichkeitsprinzip. E ist falsch, weil das Prinzip gerade das <b>Verhältnis</b> von Mitteleinsatz und Ergebnis betrachtet."
        },
        {
          "nr": 17,
          "typ": "auswahl",
          "lernziel": "1.6",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Grundsätze der Produktion",
          "sachverhalt": [
            "Ein Systemhaus hat für das laufende Jahr ein festes Budget von 50.000 € für neue Hardware. Damit sollen so viele Arbeitsplätze wie möglich ausgestattet werden."
          ],
          "frage": "Nach welchem Prinzip handelt das Systemhaus?",
          "antworten": [
            "Nach dem Maximalprinzip, weil der Mitteleinsatz feststeht und der Ertrag größtmöglich sein soll.",
            "Nach dem Minimalprinzip, weil ein vorgegebenes Ziel mit möglichst geringem Aufwand erreicht wird.",
            "Nach keinem der beiden Prinzipien, weil ein Budget keine wirtschaftliche Größe ist.",
            "Nach dem Minimalprinzip, weil ein Budget immer eine Obergrenze darstellt.",
            "Nach dem Maximalprinzip, weil die Zahl der auszustattenden Arbeitsplätze vorgegeben ist."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Der <b>Mitteleinsatz</b> ist mit 50.000 € <mark>fest</mark>, das Ergebnis – die Zahl der Arbeitsplätze – soll möglichst groß werden: Das ist das <b>Maximalprinzip</b>. B und D verkehren den Fall: Beim <b>Minimalprinzip</b> wäre die Zahl der Arbeitsplätze vorgegeben und die Kosten sollten möglichst niedrig ausfallen. C ist falsch, weil ein Budget genau der feste Mitteleinsatz ist, von dem das Wirtschaftlichkeitsprinzip ausgeht. E nennt zwar das richtige Prinzip, begründet es aber falsch – vorgegeben ist das Budget, nicht die Zahl der Arbeitsplätze."
        },
        {
          "nr": 18,
          "typ": "auswahl",
          "lernziel": "1.6",
          "zusatz": false,
          "fundstelle": "Folien „Der Betrieb“ – Nachhaltigkeit",
          "frage": "Welche <b>drei</b> Dimensionen umfasst Nachhaltigkeit?",
          "antworten": [
            "Ökonomisch – wirtschaftlich tragfähig",
            "Ökologisch – umweltfreundlich",
            "Sozial – faire Arbeitsbedingungen",
            "Juristisch – rechtlich einwandfrei",
            "Technologisch – stets auf dem neuesten Stand der Technik"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. <b>Nachhaltigkeit</b> bedeutet, Ressourcen so einzusetzen, dass auch zukünftige Generationen ihre Bedürfnisse erfüllen können. Sie ruht auf drei Säulen: <b>ökonomisch</b> (wirtschaftlich tragfähig), <b>ökologisch</b> (umweltfreundlich) und <b>sozial</b> (faire Arbeitsbedingungen). D und E sind erfunden: Rechtstreue ist für jeden Betrieb selbstverständlich und keine eigene Nachhaltigkeitsdimension, und der neueste Stand der Technik ist eine Frage der <b>Qualität</b>, nicht der Nachhaltigkeit."
        },
        {
          "nr": 19,
          "typ": "eingabe",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen das Wirtschaftlichkeitsprinzip, aber keine Kennzahlen – in der IHK-Prüfung wird die Arbeitsproduktivität regelmäßig ausgerechnet.",
          "sachverhalt": [
            "In einem Fertigungsbetrieb stellen 8 Beschäftigte in einer Schicht 320 Baugruppen her."
          ],
          "frage": "Berechnen Sie die Arbeitsproduktivität je Beschäftigtem in Stück je Schicht.",
          "art": "zahl",
          "einheit": "Stück",
          "loesung": 40,
          "toleranz": 0.01,
          "begruendung": "Die <b>Arbeitsproduktivität</b> ist das Verhältnis von <b>Ausbringungsmenge zu Faktoreinsatzmenge</b>: Produktivität = Ausbringungsmenge ÷ eingesetzte Arbeitskräfte. Rechenweg: 320 Baugruppen ÷ 8 Beschäftigte = <b>40 Stück je Beschäftigtem</b>. Gegenprobe: 40 Stück × 8 Beschäftigte = 320 Baugruppen – das ist wieder die Ausbringungsmenge. Nicht verwechseln: Die <b>Produktivität</b> ist ein <mark>Mengenverhältnis</mark>, die <b>Wirtschaftlichkeit</b> ein <mark>Wertverhältnis</mark> (Ertrag ÷ Aufwand)."
        },
        {
          "nr": 20,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Rentabilität und Wirtschaftlichkeit stehen in den Unterlagen als Unternehmensziele, ohne dass die Formeln genannt werden – gerechnet wird damit trotzdem.",
          "frage": "Welche <b>zwei</b> Aussagen zu den betrieblichen Kennzahlen sind richtig?",
          "antworten": [
            "Wirtschaftlichkeit = Ertrag ÷ Aufwand; ein Wert über 1 zeigt wirtschaftliches Arbeiten an.",
            "Eigenkapitalrentabilität = Gewinn ÷ Eigenkapital × 100.",
            "Produktivität = Gewinn ÷ Umsatz × 100.",
            "Wirtschaftlichkeit = Aufwand ÷ Ertrag; ein Wert über 1 zeigt wirtschaftliches Arbeiten an.",
            "Rentabilität und Produktivität bezeichnen dieselbe Kennzahl."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>Wirtschaftlichkeit</b> setzt <b>Ertrag ins Verhältnis zum Aufwand</b>; liegt sie über 1, übersteigt der Ertrag den Aufwand. Die <b>Eigenkapitalrentabilität</b> misst die Verzinsung des eingesetzten Eigenkapitals: Gewinn ÷ Eigenkapital × 100 – sie steht in den Unterlagen ausdrücklich als Unternehmensziel. C beschreibt die <b>Umsatzrentabilität</b>, nicht die Produktivität; die <b>Produktivität</b> ist ein Mengenverhältnis (Ausbringungsmenge ÷ Faktoreinsatzmenge). D dreht den Bruch um – dann wäre ein Wert <mark>unter</mark> 1 das gute Ergebnis. E ist falsch, weil die Rentabilität in <b>Wertgrößen</b> und die Produktivität in <b>Mengengrößen</b> rechnet."
        }
      ]
    },
    {
      "nr": 2,
      "titel": "Die Stellung des Betriebs in Wirtschaft und Gesellschaft",
      "bereich": "Wirtschaftsordnung, Kreislauf, Ziele",
      "fragen": [
        {
          "nr": 1,
          "typ": "auswahl",
          "lernziel": "2.1",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Gesellschafts-/Wirtschaftsordnung",
          "frage": "Wie unterscheiden sich Gesellschaftsordnung und Wirtschaftsordnung?",
          "antworten": [
            "Die Gesellschaftsordnung regelt das Zusammenleben der Menschen in einem Staat, die Wirtschaftsordnung regelt, wie gewirtschaftet wird.",
            "Die Gesellschaftsordnung regelt die Preisbildung, die Wirtschaftsordnung die Grundrechte der Bürger.",
            "Beide Begriffe bezeichnen dasselbe; der eine stammt aus der Politik, der andere aus der Betriebswirtschaft.",
            "Die Wirtschaftsordnung ist das Fundament, auf dem die Gesellschaftsordnung als Umsetzung aufbaut.",
            "Die Gesellschaftsordnung gilt nur für private Haushalte, die Wirtschaftsordnung nur für Unternehmen."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Die <b>Gesellschaftsordnung</b> ist das <b>Fundament</b>: Sie regelt das gesamte Zusammenleben und beruht auf rechtlichen, politischen und sozialen Werten, die im <b>Grundgesetz</b> verankert sind – Demokratie, Freiheit des Einzelnen, Sozialstaatsprinzip. Die <b>Wirtschaftsordnung</b> ist die <b>Umsetzung</b>: Sie entscheidet, wie gewirtschaftet wird; in Deutschland ist das die <b>Soziale Marktwirtschaft</b>. B vertauscht beide Ebenen. C ist falsch, weil es zwei verschiedene Ordnungsebenen sind. D dreht das Verhältnis um – das Fundament ist die Gesellschaftsordnung. E ist falsch: Beide Ordnungen gelten für alle Beteiligten, auch für den Betrieb."
        },
        {
          "nr": 2,
          "typ": "zuordnung",
          "lernziel": "2.1",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Fundament, Umsetzung, Ergebnis",
          "frage": "Ordnen Sie jede Aussage der richtigen Ebene zu.",
          "optionen": [
            "Gesellschaftsordnung (Fundament)",
            "Wirtschaftsordnung (Umsetzung)",
            "Stellung des Betriebs (Ergebnis)"
          ],
          "aussagen": [
            "Demokratie, Freiheit des Einzelnen und das Sozialstaatsprinzip sind im Grundgesetz verankert.",
            "In Deutschland verbindet die Soziale Marktwirtschaft die Freiheit des Marktes mit sozialem Ausgleich.",
            "Ein Unternehmen muss Gewinn erzielen und zugleich Arbeitsplätze sichern und Steuern zahlen.",
            "Es wird festgelegt, nach welchen Regeln Güter erzeugt und verteilt werden."
          ],
          "loesung": [1, 2, 3, 2],
          "begruendung": "Die drei Ebenen bauen aufeinander auf. Die <b>Gesellschaftsordnung</b> ist das Fundament und steckt die Werte ab – Demokratie, Freiheit, Sozialstaatsprinzip aus dem <b>Grundgesetz</b>. Die <b>Wirtschaftsordnung</b> setzt diese Werte um und bestimmt, <mark>wie</mark> gewirtschaftet wird: die Regeln für Erzeugung und Verteilung, in Deutschland die <b>Soziale Marktwirtschaft</b>. Der <b>Betrieb</b> ist das Ergebnis: Er ist kein isoliertes Gebilde, sondern muss ökonomisch <mark>und</mark> gesellschaftlich handeln."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "2.1",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Stellung des Betriebs",
          "frage": "Welche Aussage zur Stellung des Betriebs in Wirtschaft und Gesellschaft ist <mark>falsch</mark>?",
          "antworten": [
            "Der Betrieb ist Teil der Wirtschafts- und Gesellschaftsordnung und kein isoliertes Gebilde.",
            "Der Betrieb muss ökonomisch handeln, also Gewinn erzielen.",
            "Der Betrieb muss auch gesellschaftlich handeln, also zum Beispiel Arbeitsplätze sichern und Steuern zahlen.",
            "Der Betrieb steht außerhalb der Gesellschaftsordnung, weil für ihn allein das Handelsrecht gilt.",
            "Der Umweltschutz gehört zu den gesellschaftlichen Anforderungen an einen Betrieb."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Der Betrieb steht <mark>innerhalb</mark> der Gesellschafts- und Wirtschaftsordnung; das Handelsrecht ist nur ein Ausschnitt der für ihn geltenden Regeln, daneben binden ihn etwa Arbeits-, Steuer- und Umweltrecht. A, B, C und E stimmen: Der Betrieb ist Teil des Systems und muss <b>ökonomisch</b> (Gewinn erzielen) und zugleich <b>gesellschaftlich</b> handeln – Arbeitsplätze sichern, Umwelt schützen, Steuern zahlen."
        },
        {
          "nr": 4,
          "typ": "auswahl",
          "lernziel": "2.2",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Die Soziale Marktwirtschaft; Lernzielkontrolle Frage 1",
          "frage": "Was versteht man unter der Sozialen Marktwirtschaft?",
          "antworten": [
            "Eine Wirtschaftsordnung, in der der Staat Produktionsmengen und Preise zentral festlegt.",
            "Eine Wirtschaftsordnung, die die Freiheit des Marktes mit dem sozialen Ausgleich der Gesellschaft verbindet.",
            "Eine Wirtschaftsordnung ohne staatliche Eingriffe, in der allein Angebot und Nachfrage regieren.",
            "Eine Wirtschaftsordnung, in der Privateigentum an Produktionsmitteln ausgeschlossen ist.",
            "Eine Wirtschaftsordnung, in der ausschließlich gemeinnützige Betriebe zugelassen sind."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Die <b>Soziale Marktwirtschaft</b> verbindet die <b>Freiheit des Marktes</b> mit dem <b>sozialen Ausgleich</b>: Unternehmen entscheiden grundsätzlich selbst, was sie anbieten, Preise entstehen durch Angebot und Nachfrage, es herrscht Wettbewerb und Privateigentum an Produktionsmitteln ist möglich – zugleich setzt der Staat rechtliche Rahmenbedingungen, schützt Arbeitnehmer und sichert soziale Systeme ab. A beschreibt die <b>Zentralverwaltungswirtschaft</b>. C beschreibt die <b>freie Marktwirtschaft</b> ohne soziale Komponente. D und E widersprechen dem marktwirtschaftlichen Teil der Ordnung."
        },
        {
          "nr": 5,
          "typ": "zuordnung",
          "lernziel": "2.2",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – marktwirtschaftliche und soziale Elemente",
          "frage": "Ordnen Sie jedes Merkmal der Sozialen Marktwirtschaft richtig zu.",
          "optionen": [
            "Marktwirtschaftliches Element",
            "Soziales bzw. staatliches Element"
          ],
          "aussagen": [
            "Preise entstehen grundsätzlich durch Angebot und Nachfrage.",
            "Arbeitnehmer werden durch das Arbeitsrecht geschützt.",
            "Unternehmen stehen miteinander im Wettbewerb.",
            "Es bestehen soziale Sicherungssysteme.",
            "Privateigentum an Produktionsmitteln ist möglich.",
            "Der Wettbewerb wird durch staatliche Regeln geschützt."
          ],
          "loesung": [1, 2, 1, 2, 1, 2],
          "begruendung": "Die <b>marktwirtschaftlichen Elemente</b> beschreiben die Freiheit: freie Preisbildung durch <b>Angebot und Nachfrage</b>, <b>Wettbewerb</b> zwischen den Unternehmen und <b>Privateigentum</b> an Produktionsmitteln. Die <b>sozialen und staatlichen Elemente</b> beschreiben den Ausgleich: Schutz der Arbeitnehmer durch das <b>Arbeitsrecht</b>, <b>soziale Sicherungssysteme</b> und der staatliche <b>Schutz des Wettbewerbs</b>. Aufpassen bei der letzten Aussage: Wettbewerb selbst ist marktwirtschaftlich, sein <mark>Schutz durch den Staat</mark> ist ein staatliches Element – der Staat greift dort ein, wo der Markt allein gesellschaftliche Ziele nicht erfüllt."
        },
        {
          "nr": 6,
          "typ": "auswahl",
          "lernziel": "2.2",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – staatliche Eingriffe",
          "sachverhalt": [
            "Ein IT-Dienstleister möchte seine Preise gemeinsam mit zwei Wettbewerbern festlegen. Außerdem will er Beschäftigte ohne schriftlichen Nachweis der Arbeitsbedingungen einstellen und seine Mitarbeitenden regelmäßig zwölf Stunden am Tag arbeiten lassen."
          ],
          "frage": "Welche <b>zwei</b> Aussagen beschreiben zutreffend, wie die Soziale Marktwirtschaft darauf reagiert?",
          "antworten": [
            "Der Staat setzt dem Verhalten rechtliche Grenzen, weil er den Wettbewerb und die Arbeitnehmer schützt.",
            "Die Preisabsprache ist eine Wettbewerbsbeschränkung und damit grundsätzlich verboten.",
            "Alle drei Vorhaben sind zulässig, weil in der Marktwirtschaft Vertragsfreiheit gilt.",
            "Der Staat darf nur dann eingreifen, wenn ein Unternehmen zahlungsunfähig zu werden droht.",
            "Die Arbeitszeit ist allein Sache des Arbeitsvertrags und unterliegt keiner gesetzlichen Grenze."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die Soziale Marktwirtschaft gewährt unternehmerische Freiheit, aber der Staat <b>setzt den Rahmen</b> und greift dort ein, wo der Markt allein gesellschaftliche Ziele nicht erfüllt. Die <b>Preisabsprache</b> ist ein <b>Kartell</b> und nach <b>§ 1 GWB</b> verboten. C ist falsch: Die Vertragsfreiheit endet an zwingendem Recht. D ist falsch – staatliche Eingriffe hängen nicht von der Zahlungsfähigkeit ab. E ist falsch: Das <b>Arbeitszeitgesetz</b> begrenzt die werktägliche Arbeitszeit auf grundsätzlich <b>8 Stunden</b>, ausnahmsweise <b>10 Stunden</b> (<b>§ 3 ArbZG</b>); außerdem verlangt das <b>Nachweisgesetz</b> die schriftliche Dokumentation der wesentlichen Arbeitsbedingungen."
        },
        {
          "nr": 7,
          "typ": "auswahl",
          "lernziel": "2.3",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Ziele von Betrieben; Lernzielkontrolle Frage 5",
          "frage": "Welche <b>drei</b> Ziele zählen zu den wirtschaftlichen Zielen (Erfolgszielen) eines Betriebs?",
          "antworten": [
            "Gewinnmaximierung",
            "Rentabilität",
            "Liquiditätssicherung",
            "Qualitätsführerschaft",
            "Umweltschutz"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Zu den <b>wirtschaftlichen Zielen (Erfolgszielen)</b> gehören <b>Gewinnmaximierung</b>, <b>Umsatzwachstum</b>, <b>Rentabilität</b>, <b>Kostensenkung</b> und <b>Liquiditätssicherung</b> – sie sind messbar und sichern das finanzielle Überleben. D gehört zu den <b>ökonomischen Marktzielen</b>, die die Stellung gegenüber der Konkurrenz betreffen – daneben Marktanteil, Kundenbindung und die Erschließung neuer Märkte. E gehört zu den <b>sozialen und ökologischen Zielen</b> zusammen mit Arbeitsplatzsicherung sowie Image und Reputation."
        },
        {
          "nr": 8,
          "typ": "zuordnung",
          "lernziel": "2.3",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Ziele von Betrieben",
          "frage": "Ordnen Sie jedes Ziel der richtigen Zielgruppe zu.",
          "optionen": [
            "Wirtschaftliches Ziel (Erfolgsziel)",
            "Ökonomisches Marktziel",
            "Soziales bzw. ökologisches Ziel"
          ],
          "aussagen": [
            "Jederzeit zahlungsfähig bleiben, um Rechnungen und Löhne pünktlich zu begleichen.",
            "Einen größeren Prozentsatz des gesamten Marktvolumens gewinnen.",
            "CO2-Emissionen senken und nachhaltige Rohstoffe verwenden.",
            "Die Ausgaben durch effizientere Prozesse senken.",
            "Die Zufriedenheit der Kunden steigern, damit sie Stammkunden werden.",
            "Faire Arbeitsbedingungen und eine hohe Mitarbeiterzufriedenheit bieten."
          ],
          "loesung": [1, 2, 3, 1, 2, 3],
          "begruendung": "<b>Erfolgsziele</b> betreffen die eigene Finanzlage: <b>Liquiditätssicherung</b> und <b>Kostensenkung</b>. <b>Marktziele</b> betreffen die Stellung <mark>gegenüber der Konkurrenz</mark>: <b>Marktanteil</b> und <b>Kundenbindung</b>. <b>Soziale und ökologische Ziele</b> betreffen die gesellschaftliche Verantwortung: <b>Umweltschutz</b> und <b>Arbeitsplatzsicherung</b>. Eine gute Faustregel für die Prüfung: Geht es um Geld im eigenen Haus, ist es ein Erfolgsziel; geht es um die Position am Markt, ein Marktziel; geht es um Menschen oder Umwelt, ein soziales bzw. ökologisches Ziel."
        },
        {
          "nr": 9,
          "typ": "auswahl",
          "lernziel": "2.3",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Ziele von Betrieben",
          "frage": "Welche Aussage zu den Zielen von Betrieben ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Rentabilität bezeichnet ein hohes Verhältnis zwischen Gewinn und eingesetztem Kapital.",
            "Umsatzwachstum bedeutet, den Gesamtwert der verkauften Waren oder Dienstleistungen zu steigern.",
            "Qualitätsführerschaft bedeutet, die qualitativ besten Produkte einer Branche anzubieten.",
            "Soziale und ökologische Ziele stehen stets im Widerspruch zu den wirtschaftlichen Zielen und schließen diese aus.",
            "Image und Reputation werden unter dem Stichwort Corporate Social Responsibility verfolgt."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Soziale und ökologische Ziele <mark>ergänzen</mark> die wirtschaftlichen Ziele; sie gewinnen in modernen Betrieben an Bedeutung, weil Unternehmen gesellschaftliche Verantwortung tragen. Ein Ausschluss besteht nicht – ein guter Ruf kann sogar den Absatz stützen. A, B, C und E stimmen: <b>Rentabilität</b> ist das Verhältnis von Gewinn zu eingesetztem Kapital, <b>Umsatzwachstum</b> die Steigerung des Verkaufswerts, <b>Qualitätsführerschaft</b> ein Marktziel und <b>CSR</b> der Rahmen für Image und Reputation."
        },
        {
          "nr": 10,
          "typ": "auswahl",
          "lernziel": "2.4",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Der einfache Wirtschaftskreislauf; Lernzielkontrolle Frage 2",
          "frage": "Welche <b>zwei</b> Akteure stehen im einfachen Wirtschaftskreislauf im Mittelpunkt?",
          "antworten": [
            "Private Haushalte",
            "Unternehmen",
            "Staat",
            "Banken",
            "Ausland"
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Der <b>einfache Wirtschaftskreislauf</b> kennt nur zwei Pole: <b>private Haushalte</b> und <b>Unternehmen</b>. Zwischen ihnen laufen zwei Paare gegenläufiger Ströme – die Haushalte stellen <b>Arbeitsleistung</b> bereit und erhalten dafür <b>Einkommen</b>; die Unternehmen liefern <b>Güter und Dienstleistungen</b> und erhalten dafür <b>Konsumausgaben</b>. <b>Staat</b> und <b>Banken</b> kommen erst im <mark>erweiterten</mark> Kreislauf hinzu, das <b>Ausland</b> erst im offenen Kreislauf."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "2.4",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Lernzielkontrolle Frage 3",
          "frage": "Welche Aussage über Geldstrom und Güterstrom ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Der Güterstrom umfasst Waren, Dienstleistungen und Arbeitsleistung.",
            "Beide Ströme laufen im Kreislauf in dieselbe Richtung und verstärken sich gegenseitig.",
            "Der Geldstrom umfasst Einkommen und Konsumausgaben.",
            "Schon der einfache Wirtschaftskreislauf enthält beide Ströme.",
            "Geld- und Güterstrom verlaufen gegenläufig."
          ],
          "loesung": [2],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist B. Die beiden Ströme laufen gerade <mark>gegenläufig</mark>: Wo eine Leistung hinfließt, fließt Geld zurück – deshalb spricht man überhaupt von einem <b>Kreislauf</b>. A, C, D und E stimmen: Der <b>Güterstrom</b> (auch Leistungsstrom) umfasst alles Reale – <b>Waren, Dienstleistungen und Arbeitsleistung</b>; der <b>Geldstrom</b> umfasst die Gegenleistung in Geld – <b>Einkommen und Konsumausgaben</b>. Beide stecken bereits im <b>einfachen</b> Wirtschaftskreislauf zwischen Haushalten und Unternehmen."
        },
        {
          "nr": 12,
          "typ": "auswahl",
          "lernziel": "2.4",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Der einfache Wirtschaftskreislauf",
          "sachverhalt": [
            "Eine Fachinformatikerin arbeitet bei einem Systemhaus und erhält dafür ihr Gehalt. Von diesem Gehalt kauft sie bei einem Onlinehändler ein neues Notebook."
          ],
          "frage": "Welche <b>zwei</b> Aussagen ordnen die Vorgänge im einfachen Wirtschaftskreislauf richtig ein?",
          "antworten": [
            "Die Arbeitsleistung der Fachinformatikerin ist ein Güterstrom vom Haushalt zum Unternehmen.",
            "Das Gehalt ist ein Geldstrom vom Unternehmen zum Haushalt.",
            "Das Gehalt ist ein Güterstrom, weil es für eine erbrachte Leistung gezahlt wird.",
            "Der Kauf des Notebooks ist ein Geldstrom vom Unternehmen zum Haushalt.",
            "Arbeitsleistung und Gehalt fließen beide in dieselbe Richtung."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>Arbeitsleistung</b> ist eine reale Leistung und fließt als <b>Güterstrom</b> vom <b>Haushalt zum Unternehmen</b>; das <b>Gehalt</b> fließt als <b>Geldstrom</b> in die Gegenrichtung, also <b>vom Unternehmen zum Haushalt</b>. C ist falsch: Zahlungen sind immer Geldströme, unabhängig davon, wofür sie geleistet werden. D dreht die Richtung um – beim Kauf fließt Geld <mark>vom Haushalt zum Unternehmen</mark> (Konsumausgaben), das Notebook kommt als Güterstrom zurück. E ist falsch, weil Geld- und Güterstrom stets gegenläufig sind."
        },
        {
          "nr": 13,
          "typ": "auswahl",
          "lernziel": "2.5",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Der erweiterte Wirtschaftskreislauf; Lernzielkontrolle Frage 4",
          "frage": "Welche <b>zwei</b> Akteure kommen im erweiterten Wirtschaftskreislauf zusätzlich hinzu?",
          "antworten": [
            "Staat",
            "Banken",
            "Private Haushalte",
            "Unternehmen",
            "Gewerkschaften"
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Der <b>erweiterte Wirtschaftskreislauf</b> ergänzt den einfachen Kreislauf um <b>Staat</b> und <b>Banken</b>. C und D sind bereits Teil des <mark>einfachen</mark> Kreislaufs und kommen daher nicht hinzu. E ist falsch: <b>Gewerkschaften</b> sind Tarifvertragsparteien und keine eigene Größe im Wirtschaftskreislauf."
        },
        {
          "nr": 14,
          "typ": "auswahl",
          "lernziel": "2.5",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Der erweiterte Wirtschaftskreislauf",
          "frage": "Welche Aussage zum erweiterten Wirtschaftskreislauf ist <mark>falsch</mark>?",
          "antworten": [
            "Der Staat erhält Steuern von Haushalten und Unternehmen.",
            "Der Staat gibt Geld in Form von Staatsausgaben, Subventionen und Transferleistungen zurück in den Kreislauf.",
            "Die Banken nehmen Ersparnisse der Haushalte auf und vergeben daraus Kredite an Unternehmen.",
            "Ersparnisse der Haushalte verschwinden aus dem Kreislauf und kehren nicht zurück.",
            "Auch im erweiterten Kreislauf stehen Geld- und Güterströme einander gegenüber."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. <b>Ersparnisse</b> verschwinden nicht: Sie fließen über die <b>Banken</b> als <b>Kredite</b> zurück zu den Unternehmen, die damit investieren. Genau dafür wird der Kreislauf um die Banken erweitert. A, B, C und E stimmen: Der <b>Staat</b> zieht <b>Steuern</b> ein und gibt über <b>Staatsausgaben, Subventionen und Transferleistungen</b> wieder Geld ab, die <b>Banken</b> leiten Ersparnisse in Kredite um, und auch hier stehen <b>Geld- und Güterströme</b> einander gegenüber."
        },
        {
          "nr": 15,
          "typ": "auswahl",
          "lernziel": "2.6",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Volkswirtschaftliche Aufgaben von Betrieben",
          "frage": "Welche <b>vier</b> volkswirtschaftlichen Aufgaben erfüllen Betriebe?",
          "antworten": [
            "Bedarfsdeckung (Versorgungsfunktion)",
            "Einkommens- und Beschäftigungsfunktion",
            "Innovations- und Fortschrittsfunktion",
            "Fiskalische Funktion (Steuerzahler)",
            "Gesetzgebungsfunktion"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Betriebe <b>versorgen</b> Bevölkerung und andere Unternehmen mit Gütern und Dienstleistungen, sie <b>schaffen Arbeitsplätze und zahlen Löhne</b> und halten damit den Kreislauf in Schwung, sie <b>investieren in Forschung und Entwicklung</b> und treiben den Fortschritt voran, und sie <b>finanzieren den Staat</b> über Steuern und Sozialabgaben. E ist falsch: Gesetze macht der <b>Gesetzgeber</b>, nicht der Betrieb – Unternehmen können Interessen vertreten, aber keine Gesetze erlassen."
        },
        {
          "nr": 16,
          "typ": "zuordnung",
          "lernziel": "2.6",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Volkswirtschaftliche Aufgaben von Betrieben",
          "frage": "Ordnen Sie jedes Beispiel der volkswirtschaftlichen Aufgabe zu.",
          "optionen": [
            "Bedarfsdeckung",
            "Einkommens- und Beschäftigungsfunktion",
            "Innovations- und Fortschrittsfunktion",
            "Fiskalische Funktion"
          ],
          "aussagen": [
            "Ein Systemhaus stellt zehn zusätzliche Fachkräfte ein und zahlt ihnen Gehalt.",
            "Ein Softwarehaus entwickelt ein Verfahren, das den Stromverbrauch von Rechenzentren senkt.",
            "Ein Unternehmen führt Gewerbesteuer und Sozialabgaben ab.",
            "Ein Hersteller liefert Netzwerktechnik an Schulen und Behörden."
          ],
          "loesung": [2, 3, 4, 1],
          "begruendung": "Die <b>Bedarfsdeckung</b> ist die primäre Aufgabe: Betriebe versorgen Bevölkerung und andere Unternehmen mit Gütern – die Lieferung der Netzwerktechnik. Die <b>Einkommens- und Beschäftigungsfunktion</b> betrifft Arbeitsplätze und Löhne, denn erst dieses Einkommen ermöglicht den Haushalten den Konsum. Die <b>Innovations- und Fortschrittsfunktion</b> betrifft Forschung und Entwicklung. Die <b>fiskalische Funktion</b> betrifft <b>Steuern und Sozialabgaben</b>, mit denen der Staat Infrastruktur, Bildung und Sicherheit finanziert."
        },
        {
          "nr": 17,
          "typ": "auswahl",
          "lernziel": "2.6",
          "zusatz": false,
          "fundstelle": "Folien „Die Stellung des Betriebs“ – Volkswirtschaftliche Aufgaben von Betrieben",
          "sachverhalt": [
            "Ein regionaler IT-Dienstleister schließt seinen Standort. 60 Beschäftigte verlieren ihre Arbeit, die Gemeinde verliert einen großen Gewerbesteuerzahler."
          ],
          "frage": "Welche <b>zwei</b> volkswirtschaftlichen Aufgaben fallen dadurch unmittelbar weg?",
          "antworten": [
            "Die Einkommens- und Beschäftigungsfunktion",
            "Die fiskalische Funktion",
            "Die Gesetzgebungsfunktion",
            "Die Tarifbindungsfunktion",
            "Die Aufsichtsfunktion über den Wettbewerb"
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Mit den Arbeitsplätzen entfällt die <b>Einkommens- und Beschäftigungsfunktion</b>: Es fließen keine Löhne mehr, den Haushalten fehlt Einkommen für den Konsum, und der Wirtschaftskreislauf verliert an Schwung. Mit der Gewerbesteuer entfällt die <b>fiskalische Funktion</b>: Der Gemeinde fehlen Einnahmen zur Finanzierung ihrer Aufgaben. C, D und E sind keine Aufgaben von Betrieben – Gesetze macht der Gesetzgeber, Tarifverträge schließen <b>Gewerkschaften und Arbeitgeberverbände</b>, und über den Wettbewerb wacht das <b>Bundeskartellamt</b>."
        },
        {
          "nr": 18,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die wirtschaftspolitischen Ziele des magischen Vierecks sind Standardstoff der IHK-Prüfung und ergänzen die Wirtschaftsordnung aus Lernziel 2.2 unmittelbar.",
          "frage": "Zusatzwissen: Welche <b>vier</b> Ziele bilden das magische Viereck der Wirtschaftspolitik?",
          "antworten": [
            "Stabilität des Preisniveaus",
            "Hoher Beschäftigungsstand",
            "Außenwirtschaftliches Gleichgewicht",
            "Stetiges und angemessenes Wirtschaftswachstum",
            "Gerechte Einkommens- und Vermögensverteilung"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Das <b>magische Viereck</b> steht in <b>§ 1 StabG</b>: Bund und Länder müssen so handeln, dass sie zugleich zur <b>Stabilität des Preisniveaus</b>, zu einem <b>hohen Beschäftigungsstand</b> und zum <b>außenwirtschaftlichen Gleichgewicht</b> bei <b>stetigem und angemessenem Wirtschaftswachstum</b> beitragen. „Magisch“ heißt: Die vier Ziele lassen sich kaum gleichzeitig vollständig erreichen. E gehört <mark>nicht</mark> zum Viereck – die gerechte Einkommens- und Vermögensverteilung ist eines der Ziele, mit denen das Viereck zum <b>magischen Sechseck</b> erweitert wird (zusammen mit dem Umweltschutz)."
        },
        {
          "nr": 19,
          "typ": "reihenfolge",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Konjunkturphasen gehören zum selben Themenfeld wie der Wirtschaftskreislauf und werden in der Prüfung regelmäßig abgefragt.",
          "frage": "Zusatzwissen: Bringen Sie die Phasen eines Konjunkturzyklus in die richtige Reihenfolge, beginnend mit der Erholung.",
          "schritte": [
            "Abschwung (Rezession): Nachfrage und Produktion gehen zurück, die Arbeitslosigkeit steigt.",
            "Aufschwung (Expansion): Nachfrage und Produktion ziehen an, die Arbeitslosigkeit sinkt.",
            "Tiefphase (Depression): Die Wirtschaftsleistung erreicht ihren Tiefpunkt, Investitionen bleiben aus.",
            "Hochkonjunktur (Boom): Die Kapazitäten sind ausgelastet, Löhne und Preise steigen."
          ],
          "loesung": [3, 1, 4, 2],
          "begruendung": "Die richtige Reihenfolge lautet: <b>Aufschwung (Expansion)</b> → <b>Hochkonjunktur (Boom)</b> → <b>Abschwung (Rezession)</b> → <b>Tiefphase (Depression)</b> – danach beginnt der Zyklus von vorn. Im <b>Aufschwung</b> ziehen Nachfrage und Produktion an und die Arbeitslosigkeit sinkt. In der <b>Hochkonjunktur</b> sind die Kapazitäten ausgelastet; weil die Nachfrage das Angebot übersteigt, steigen Löhne und Preise – die Gefahr der <b>Inflation</b> wächst. Im <b>Abschwung</b> kehrt sich die Entwicklung um. In der <b>Tiefphase</b> liegt die Wirtschaftsleistung am Boden und Investitionen bleiben aus. Hier setzt die staatliche <b>Konjunkturpolitik</b> an."
        },
        {
          "nr": 20,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Der Vergleich der Wirtschaftsordnungen macht erst deutlich, was an der Sozialen Marktwirtschaft sozial und was marktwirtschaftlich ist – eine klassische Prüfungsfrage.",
          "frage": "Zusatzwissen: Welche Aussage zum Vergleich der Wirtschaftsordnungen ist <mark>falsch</mark>?",
          "antworten": [
            "In der freien Marktwirtschaft regeln Angebot und Nachfrage die Preise ohne staatliche Eingriffe.",
            "In der Zentralverwaltungswirtschaft plant der Staat Produktion und Preise zentral.",
            "Die Soziale Marktwirtschaft verbindet marktwirtschaftliche Freiheit mit staatlichem Rahmen und sozialem Ausgleich.",
            "In der Sozialen Marktwirtschaft legt der Staat die Preise für die meisten Güter selbst fest.",
            "In der Zentralverwaltungswirtschaft ist Privateigentum an Produktionsmitteln stark eingeschränkt."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. In der <b>Sozialen Marktwirtschaft</b> entstehen die Preise grundsätzlich durch <b>Angebot und Nachfrage</b>; der Staat setzt nur den <b>Rahmen</b> und greift gezielt ein, etwa über den <b>Mindestlohn</b> oder die Mietpreisbremse – eine flächendeckende staatliche Preisfestsetzung gibt es nicht. A, B, C und E stimmen: Die <b>freie Marktwirtschaft</b> kennt keine staatlichen Eingriffe, die <b>Zentralverwaltungswirtschaft</b> plant Produktion und Preise zentral und schränkt das Privateigentum an Produktionsmitteln stark ein, und die <b>Soziale Marktwirtschaft</b> steht als dritter Weg dazwischen."
        }
      ]
    },
    {
      "nr": 3,
      "titel": "Marktstrukturen und Preisbildung",
      "bereich": "Wettbewerb, Marktformen, Konzentration",
      "fragen": [
        {
          "nr": 1,
          "typ": "auswahl",
          "lernziel": "3.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Marktformen, Aufgabe 1",
          "sachverhalt": [
            "Ein Unternehmen stellt fest, dass die Nachfrage stark steigt, während die Produktionskapazitäten kurzfristig begrenzt sind."
          ],
          "frage": "Welche <b>zwei</b> Aussagen beschreiben die Lage und eine sinnvolle unternehmerische Reaktion zutreffend?",
          "antworten": [
            "Es entsteht ein Nachfrageüberhang; im Modell von Angebot und Nachfrage steigt der Preis.",
            "Das Unternehmen kann die Kapazitäten ausweiten, etwa durch Zusatzschichten oder Zulieferer.",
            "Es entsteht ein Angebotsüberhang; im Modell von Angebot und Nachfrage sinkt der Preis.",
            "Das Unternehmen sollte den Preis senken, um die gestiegene Nachfrage zusätzlich anzuregen.",
            "Der Preis bleibt unverändert, weil die Produktionskapazität die Preisbildung nicht beeinflusst."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Steigt die <b>Nachfrage</b> bei kurzfristig festem <b>Angebot</b>, übersteigt die nachgefragte die angebotene Menge: Es entsteht ein <b>Nachfrageüberhang</b>, und der <b>Preis steigt</b>, bis Angebot und Nachfrage wieder übereinstimmen. Sinnvolle Reaktionen sind, die <b>Kapazität auszuweiten</b> (Zusatzschichten, Zulieferer, Investitionen) oder den <b>Preis anzuheben</b>. C beschreibt den umgekehrten Fall. D ist falsch, weil eine Preissenkung die Nachfrage weiter anheizen würde, obwohl das Unternehmen schon jetzt nicht liefern kann. E ist falsch: Die <mark>Knappheit</mark> des Angebots ist genau der Grund für den steigenden Preis."
        },
        {
          "nr": 2,
          "typ": "zuordnung",
          "lernziel": "3.7",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Marktformen, Aufgabe 2",
          "frage": "Ordnen Sie jeder Marktsituation die Marktform zu.",
          "optionen": [
            "Monopol",
            "Oligopol",
            "Polypol"
          ],
          "aussagen": [
            "Ein Energieversorger ist der einzige Anbieter in einer Region.",
            "Drei große Mobilfunkanbieter teilen den Markt unter sich auf.",
            "Viele Friseursalons bieten in einer Stadt ihre Leistungen an."
          ],
          "loesung": [1, 2, 3],
          "begruendung": "Entscheidend ist die <b>Zahl der Anbieter</b>. Beim <b>Monopol</b> steht <mark>ein</mark> Anbieter vielen Nachfragern gegenüber – der regionale Energieversorger. Beim <b>Oligopol</b> teilen sich <mark>wenige</mark> große Anbieter den Markt – die drei Mobilfunkanbieter. Beim <b>Polypol</b> stehen <mark>viele</mark> Anbieter vielen Nachfragern gegenüber – die Friseursalons. Nur im Polypol ist der einzelne Anbieter <b>Preisnehmer</b>; im Monopol hat der Anbieter den größten Preisspielraum."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "3.7",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Marktformen, Aufgabe 3 (Transferaufgabe Oligopol)",
          "sachverhalt": [
            "Ein Unternehmen ist in einem Oligopol tätig, etwa im Lebensmitteleinzelhandel, im Mobilfunkmarkt oder im Automobilmarkt."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zum Oligopol treffen zu?",
          "antworten": [
            "Senkt ein Anbieter den Preis, ziehen die wenigen Wettbewerber meist nach – es droht ein Preiskampf ohne Gewinn für alle.",
            "Weil die Produkte oft ähnlich sind, dient Marketing dazu, sich über Marke und Image von der Konkurrenz abzuheben.",
            "Preisabsprachen sind im Oligopol erlaubt, weil es nur wenige Anbieter gibt.",
            "Der einzelne Anbieter ist Preisnehmer und kann den Marktpreis nicht beeinflussen.",
            "Im Oligopol ist Werbung bedeutungslos, weil die Kunden ohnehin nur auf den Preis achten."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Im <b>Oligopol</b> beobachten sich die wenigen Anbieter genau – man spricht von <b>Reaktionsverbundenheit</b>. Senkt einer den Preis, ziehen die anderen nach, und am Ende verdienen alle weniger: der klassische <b>Preiskampf</b>. Deshalb wird der Wettbewerb oft über <b>Marketing, Marke und Image</b> statt über den Preis geführt. C ist falsch: Preisabsprachen sind <b>Kartelle</b> und nach <b>§ 1 GWB</b> verboten – im Oligopol ist die Versuchung dazu besonders groß, die Rechtslage aber dieselbe. D beschreibt das <b>Polypol</b>. E widerspricht B."
        },
        {
          "nr": 4,
          "typ": "auswahl",
          "lernziel": "3.1",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Bedeutung von Wettbewerb",
          "frage": "Was versteht man unter Wettbewerb?",
          "antworten": [
            "Den Konkurrenzkampf zwischen mindestens zwei Marktakteuren, die nach denselben knappen Ressourcen oder Zielen streben.",
            "Die Absprache zwischen Unternehmen über Preise und Mengen zur Sicherung des Marktanteils.",
            "Die freiwillige Zusammenarbeit zweier Unternehmen bei gemeinsamen Zielen.",
            "Die staatliche Festlegung von Höchstpreisen zum Schutz der Verbraucher.",
            "Den Zusammenschluss rechtlich selbstständiger Unternehmen unter einheitlicher Leitung."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. <b>Wettbewerb</b> ist der Konkurrenzkampf zwischen mindestens zwei Marktakteuren – Unternehmen oder Personen –, die nach denselben <b>knappen Ressourcen oder Zielen</b> streben, etwa nach Kunden oder Marktanteilen. B beschreibt das <b>Kartell</b>, also das Gegenteil von Wettbewerb. C beschreibt die <b>Kooperation</b>. D beschreibt einen staatlichen Eingriff in die Preisbildung. E beschreibt den <b>Konzern</b>."
        },
        {
          "nr": 5,
          "typ": "auswahl",
          "lernziel": "3.1",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Wettbewerb sorgt für …",
          "frage": "Welche Aussage über die Wirkungen von Wettbewerb ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Wettbewerb sorgt tendenziell für niedrigere Preise.",
            "Wettbewerb sorgt für bessere Qualität und mehr Innovation.",
            "Wettbewerb vergrößert die Auswahl für die Verbraucher.",
            "Ohne Wettbewerb sinken die Preise, weil Unternehmen keine Werbekosten mehr tragen müssen.",
            "Ohne Wettbewerb gibt es weniger Innovation und eine geringere Auswahl."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. <mark>Ohne</mark> Wettbewerb steigen die Preise, weil der Druck fehlt, günstiger anzubieten; eingesparte Werbekosten gibt der Anbieter dann nicht weiter. A, B, C und E stimmen: Wettbewerb sorgt für <b>niedrigere Preise</b>, <b>bessere Qualität</b>, <b>Innovation</b> und eine <b>größere Auswahl</b>; fehlt er, kehren sich diese Wirkungen um. Genau deshalb schützt der Staat den Wettbewerb – er ist ein Kernbestandteil der <b>Sozialen Marktwirtschaft</b>."
        },
        {
          "nr": 6,
          "typ": "auswahl",
          "lernziel": "3.2",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Arbeitsteilung in der Wirtschaft",
          "frage": "Was bedeutet Arbeitsteilung?",
          "antworten": [
            "Die Aufteilung eines Produktionsprozesses auf mehrere Personen oder Unternehmen.",
            "Die gleichmäßige Verteilung der Arbeitszeit auf alle Wochentage.",
            "Die Aufteilung des Gewinns auf die Gesellschafter nach Köpfen.",
            "Die Übertragung von Arbeitsschutzpflichten vom Arbeitgeber auf den Betriebsrat.",
            "Die Aufteilung eines Marktes unter wenigen großen Anbietern."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. <b>Arbeitsteilung</b> bedeutet, einen Produktionsprozess auf mehrere Personen oder Unternehmen aufzuteilen – vom Rohstoff über die Produktion bis zum Verkauf entstehen so ganze <b>Produktionsketten</b>. B beschreibt die Verteilung der Arbeitszeit, ein Thema des Arbeitszeitrechts. C beschreibt die Gewinnverteilung in einer Personengesellschaft. D ist rechtlich unzutreffend – die Verantwortung für den Arbeitsschutz bleibt beim Arbeitgeber. E beschreibt das <b>Oligopol</b>."
        },
        {
          "nr": 7,
          "typ": "zuordnung",
          "lernziel": "3.2",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Wichtige Arten der Arbeitsteilung",
          "frage": "Ordnen Sie jedem Beispiel die Art der Arbeitsteilung zu.",
          "optionen": [
            "Innerbetriebliche Arbeitsteilung",
            "Zwischenbetriebliche Arbeitsteilung",
            "Internationale Arbeitsteilung"
          ],
          "aussagen": [
            "In einem Systemhaus sind Einkauf, Technik und Vertrieb getrennte Abteilungen.",
            "Ein Zulieferer fertigt Gehäuse, ein zweiter Betrieb baut daraus fertige Server.",
            "Maschinenbau findet überwiegend in Deutschland, Textilproduktion überwiegend in anderen Ländern statt.",
            "Chips werden in Asien gefertigt, in Europa zu Geräten montiert und weltweit verkauft."
          ],
          "loesung": [1, 2, 3, 3],
          "begruendung": "Die <b>innerbetriebliche Arbeitsteilung</b> trennt Aufgaben <mark>innerhalb</mark> einer Firma – Einkauf, Produktion, Vertrieb. Die <b>zwischenbetriebliche Arbeitsteilung</b> verteilt aufeinanderfolgende <b>Fertigungsstufen</b> auf verschiedene Unternehmen – Zulieferer und Endhersteller. Die <b>internationale Arbeitsteilung</b> spezialisiert ganze Regionen oder Länder nach ihren <b>Standortvorteilen</b>; dazu gehört auch die <b>Fragmentierung der Produktion</b> über Ländergrenzen hinweg, wie bei der Chipfertigung."
        },
        {
          "nr": 8,
          "typ": "auswahl",
          "lernziel": "3.2",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Arbeitsteilung: Vorteile und Nachteile",
          "sachverhalt": [
            "Ein Hersteller von Netzwerktechnik bezieht sämtliche Platinen von einem einzigen Zulieferer in Übersee. Nach einem Hafenstreik steht die Fertigung still."
          ],
          "frage": "Welche <b>zwei</b> Aussagen beschreiben die Vor- und Nachteile der Arbeitsteilung in diesem Fall zutreffend?",
          "antworten": [
            "Die Spezialisierung senkt die Kosten und erhöht die Produktivität – das ist ein Vorteil der Arbeitsteilung.",
            "Die Abhängigkeit vom Zulieferer und lange Transportwege sind typische Nachteile der Arbeitsteilung.",
            "Der Produktionsstillstand zeigt, dass Arbeitsteilung die Produktivität grundsätzlich senkt.",
            "Arbeitsteilung führt immer zu besserer Qualität und kennt keine Nachteile.",
            "Lieferprobleme treten nur bei innerbetrieblicher Arbeitsteilung auf."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>Vorteile</b> der Arbeitsteilung sind <b>höhere Produktivität</b>, <b>bessere Qualität</b>, <b>geringere Kosten</b>, schnellere Produktion und <b>Spezialisierung</b>. Die <b>Nachteile</b> zeigen sich genau in diesem Fall: <b>Abhängigkeiten</b>, <b>Lieferprobleme</b>, <b>lange Transportwege</b>, Verlust des Gesamtüberblicks und Monotonie. C ist falsch – die Produktivität steigt durch Arbeitsteilung, der Stillstand ist ein Risiko, keine Produktivitätsfrage. D blendet die Nachteile aus. E ist falsch: Lieferprobleme sind gerade typisch für die <b>zwischenbetriebliche und internationale</b> Arbeitsteilung."
        },
        {
          "nr": 9,
          "typ": "auswahl",
          "lernziel": "3.3",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Preisbildung im Polypol",
          "frage": "Warum sind Unternehmen im Polypol Preisnehmer?",
          "antworten": [
            "Weil der Preis am Markt durch Angebot und Nachfrage entsteht und der einzelne Anbieter zu klein ist, um ihn zu beeinflussen.",
            "Weil der Staat im Polypol die Preise vorgibt und die Unternehmen sie übernehmen müssen.",
            "Weil die Anbieter ihre Preise untereinander absprechen und dann gemeinsam festlegen.",
            "Weil im Polypol nur ein Anbieter existiert, der den Preis für alle bestimmt.",
            "Weil die Nachfrager im Polypol verpflichtet sind, den geforderten Preis zu zahlen."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Im <b>Polypol</b> stehen <b>viele Anbieter vielen Nachfragern</b> gegenüber. Der Marktpreis entsteht aus <b>Angebot und Nachfrage</b>; der einzelne Anbieter hat einen so kleinen Marktanteil, dass seine Entscheidung den Preis nicht bewegt – er muss den Marktpreis hinnehmen und ist damit <b>Preisnehmer</b>. Verlangt er mehr, wandern die Kunden ab. B ist falsch, weil der Staat im Polypol keine Preise setzt. C beschreibt ein verbotenes <b>Kartell</b>. D beschreibt das <b>Monopol</b>. E ist falsch – niemand ist zum Kauf verpflichtet."
        },
        {
          "nr": 10,
          "typ": "auswahl",
          "lernziel": "3.3",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Marktsimulation Preisbildung",
          "sachverhalt": [
            "In der Marktsimulation liegt der Marktpreis für ein IT-Support-Paket bei 100 €. Ein Anbieter verlangt 135 €, ein zweiter 85 €. Die Kunden dürfen frei wählen."
          ],
          "frage": "Welche <b>zwei</b> Aussagen beschreiben das zu erwartende Ergebnis zutreffend?",
          "antworten": [
            "Der Anbieter mit 135 € wird kaum Kunden finden, weil gleichwertige Angebote günstiger sind.",
            "Der Anbieter mit 85 € gewinnt zunächst Kunden, erzielt aber je Auftrag eine geringere Spanne.",
            "Der Anbieter mit 135 € setzt den neuen Marktpreis, weil er den höchsten Preis verlangt.",
            "Die Kunden kaufen unabhängig vom Preis gleichmäßig bei allen Anbietern.",
            "Der Anbieter mit 85 € muss den Preis so verlangen, weil der Staat eine Preisuntergrenze festgelegt hat."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Im <b>Polypol</b> entscheiden die Nachfrager nach <b>Preis und Leistung</b>. Wer deutlich über dem Marktpreis liegt, verliert Kunden an die Konkurrenz – das ist die Lage des Anbieters mit 135 €. Wer darunter liegt, gewinnt Nachfrage, verdient aber je Auftrag weniger: der klassische Zielkonflikt zwischen <b>Marktanteil</b> und <b>Spanne</b>. C ist falsch, weil ein einzelner Anbieter den Marktpreis gerade <mark>nicht</mark> setzen kann. D ist falsch, weil der Preis sehr wohl die Kaufentscheidung lenkt. E ist falsch – eine staatliche Preisuntergrenze für IT-Dienstleistungen gibt es nicht."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "3.4",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Kooperation zwischen Unternehmen",
          "frage": "Welche Aussage zur Kooperation ist <mark>falsch</mark>?",
          "antworten": [
            "Die Partner behalten ihre rechtliche und ihre wirtschaftliche Selbstständigkeit.",
            "Eine Kooperation ist die freiwillige Zusammenarbeit von Parteien mit gemeinsamen Zielen.",
            "Es gibt horizontale, vertikale und laterale Kooperationen.",
            "Zu den Vorteilen zählen Risikoverteilung, Wissensaustausch und Kostenreduktion.",
            "Jede Kooperation ist nach dem GWB verboten, weil sie den Wettbewerb beschränkt."
          ],
          "loesung": [5],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist E. Verboten sind nach <b>§ 1 GWB</b> nur <mark>wettbewerbsbeschränkende</mark> Absprachen, also <b>Kartelle</b> – nicht die Zusammenarbeit als solche. Eine Kooperation wird erst durch ihren <b>Inhalt</b> zum Kartell, etwa durch Preis- oder Gebietsabsprachen. A, B, C und D stimmen: Die <b>Kooperation</b> ist die <b>freiwillige Zusammenarbeit</b> mit gemeinsamen Zielen, bei der <b>rechtliche und wirtschaftliche Selbstständigkeit</b> erhalten bleiben – darin liegt der Unterschied zur <b>Konzentration</b>. Es gibt sie <b>horizontal</b>, <b>vertikal</b> und <b>lateral</b>; Nachteile sind geringere Entscheidungsfreiheit, geteilte Gewinne und Abhängigkeit von den Partnern."
        },
        {
          "nr": 12,
          "typ": "zuordnung",
          "lernziel": "3.4",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Formen der Kooperation",
          "frage": "Ordnen Sie jedem Beispiel die Form der Kooperation zu.",
          "optionen": [
            "Horizontale Kooperation",
            "Vertikale Kooperation",
            "Laterale (diagonale) Kooperation"
          ],
          "aussagen": [
            "Zwei IT-Systemhäuser bearbeiten gemeinsam eine Ausschreibung.",
            "Ein Hardwarehersteller und sein Zulieferer stimmen die Entwicklung ab.",
            "Ein Softwarehaus und eine Versicherung entwickeln gemeinsam ein Produkt.",
            "Mehrere Handwerksbetriebe derselben Branche kaufen gemeinsam ein."
          ],
          "loesung": [1, 2, 3, 1],
          "begruendung": "Entscheidend ist die <b>Stellung der Partner zueinander</b>. <b>Horizontal</b> heißt: gleichberechtigte Partner auf <mark>derselben</mark> Wirtschaftsstufe – zwei Systemhäuser, mehrere Handwerksbetriebe im gemeinsamen Einkauf. <b>Vertikal</b> heißt: Partner auf <mark>aufeinanderfolgenden</mark> Stufen der Wertschöpfungskette – Hersteller und Zulieferer. <b>Lateral</b> (diagonal) heißt: Partner aus <mark>völlig unterschiedlichen</mark> Branchen, die nicht im Wettbewerb stehen – Softwarehaus und Versicherung."
        },
        {
          "nr": 13,
          "typ": "auswahl",
          "lernziel": "3.4",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Kooperation und Kartell",
          "sachverhalt": [
            "Drei regionale IT-Dienstleister vereinbaren, künftig alle denselben Stundensatz zu verlangen und sich die Kunden nach Postleitzahlgebieten aufzuteilen."
          ],
          "frage": "Wie ist die Vereinbarung einzuordnen?",
          "antworten": [
            "Als zulässige horizontale Kooperation, weil alle drei auf derselben Wirtschaftsstufe stehen.",
            "Als Kartell – eine wettbewerbswidrige Absprache über Preise und Gebiete, die nach § 1 GWB verboten ist.",
            "Als Konzern, weil die drei Unternehmen künftig einheitlich auftreten.",
            "Als zulässige Vereinbarung, solange sie nicht schriftlich festgehalten wird.",
            "Als Fusion, weil die Unternehmen ihre Märkte zusammenlegen."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Preis- und Gebietsabsprachen sind der Kern des <b>Kartells</b>: eine <b>wettbewerbswidrige Absprache</b> rechtlich selbstständiger Unternehmen. Nach <b>§ 1 GWB</b> sind Vereinbarungen verboten, die den Wettbewerb verhindern, einschränken oder verfälschen. A ist falsch: Zwar stehen die drei auf derselben Stufe, aber eine Kooperation wird durch den <mark>Inhalt</mark> der Absprache zum Kartell. C und E sind falsch, weil die Unternehmen rechtlich und wirtschaftlich selbstständig bleiben – weder einheitliche Leitung noch Verschmelzung. D ist falsch: Auf die <b>Form</b> der Absprache kommt es nicht an, auch mündliche und stillschweigend abgestimmte Verhaltensweisen sind erfasst."
        },
        {
          "nr": 14,
          "typ": "auswahl",
          "lernziel": "3.5",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Konzentration von Unternehmen",
          "frage": "Welche Aussage zur Unternehmenskonzentration ist <mark>falsch</mark>?",
          "antworten": [
            "Bei der Konzentration geben die beteiligten Unternehmen ihre wirtschaftliche Selbstständigkeit vollständig auf.",
            "Bei der Fusion verschmelzen zwei Unternehmen zu einem neuen; rechtliche und wirtschaftliche Selbstständigkeit gehen verloren.",
            "Im Konzern bleibt die rechtliche Selbstständigkeit erhalten, die wirtschaftliche geht verloren.",
            "Bei der Übernahme kauft ein Unternehmen ein anderes.",
            "Bei der Konzentration bleiben beide Formen der Selbstständigkeit vollständig erhalten."
          ],
          "loesung": [5],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist E. Bei der <b>Konzentration</b> geben die beteiligten Unternehmen ihre <b>wirtschaftliche Selbstständigkeit komplett auf</b>, oft verlieren sie zusätzlich die rechtliche. Dass beide Formen erhalten bleiben, ist gerade das Merkmal der <b>Kooperation</b> – hier liegt die typische Verwechslung. A, B, C und D stimmen: <b>Fusion</b> (beides verloren), <b>Konzern</b> (rechtlich bleibt, wirtschaftlich verloren) und <b>Übernahme</b> (ein Unternehmen kauft ein anderes) sind die drei Erscheinungsformen."
        },
        {
          "nr": 15,
          "typ": "auswahl",
          "lernziel": "3.5",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Formen der Konzentration",
          "sachverhalt": [
            "Ein Automobilhersteller kauft einen Reifenproduzenten."
          ],
          "frage": "Um welche Form der Konzentration handelt es sich?",
          "antworten": [
            "Horizontale Konzentration, weil beide Unternehmen Fahrzeugteile herstellen.",
            "Vertikale Konzentration, weil die Unternehmen auf aufeinanderfolgenden Wirtschaftsstufen tätig sind.",
            "Konglomerate Konzentration, weil die Branchen völlig verschieden sind.",
            "Es liegt keine Konzentration vor, weil der Reifenproduzent rechtlich selbstständig bleiben kann.",
            "Horizontale Kooperation, weil beide Unternehmen freiwillig zusammenarbeiten."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Der Reifenproduzent steht dem Automobilhersteller in der Wertschöpfungskette <mark>vorgelagert</mark>: Er liefert ein Vorprodukt. Der Zusammenschluss von Unternehmen <b>aufeinanderfolgender Wirtschaftsstufen</b> ist die <b>vertikale Konzentration</b>. A wäre richtig, wenn zwei <b>Automobilhersteller</b> fusionierten – das ist die <b>horizontale Konzentration</b> auf derselben Stufe. C passt nicht, weil die Branchen zusammenhängen; <b>konglomerat</b> wäre etwa der Kauf einer Lebensmittelkette durch einen Tech-Konzern. D ist falsch: Auch wenn die rechtliche Selbstständigkeit erhalten bliebe, ginge die wirtschaftliche verloren. E ist falsch, weil ein Kauf keine freiwillige Zusammenarbeit unter Gleichen ist."
        },
        {
          "nr": 16,
          "typ": "zuordnung",
          "lernziel": "3.5",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Formen der Konzentration",
          "frage": "Ordnen Sie jedem Beispiel die Form der Konzentration zu.",
          "optionen": [
            "Horizontale Konzentration",
            "Vertikale Konzentration",
            "Konglomerate (laterale) Konzentration"
          ],
          "aussagen": [
            "Zwei Automobilhersteller fusionieren.",
            "Ein Tech-Konzern kauft eine Lebensmittelkette.",
            "Ein Automobilhersteller kauft ein Autohaus.",
            "Zwei regionale Rechenzentren schließen sich zusammen."
          ],
          "loesung": [1, 3, 2, 1],
          "begruendung": "<b>Horizontal</b> heißt: Unternehmen derselben Produktions- oder Handelsstufe – zwei Automobilhersteller, zwei Rechenzentren. <b>Vertikal</b> heißt: aufeinanderfolgende Wirtschaftsstufen – der Automobilhersteller kauft mit dem Autohaus die <mark>nachgelagerte</mark> Handelsstufe. <b>Konglomerat (lateral)</b> heißt: völlig unterschiedliche Branchen – Tech-Konzern und Lebensmittelkette. Merkhilfe: horizontal = <b>nebeneinander</b>, vertikal = <b>hintereinander</b> in der Wertschöpfungskette, konglomerat = <b>ohne Zusammenhang</b>."
        },
        {
          "nr": 17,
          "typ": "auswahl",
          "lernziel": "3.6",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Staatliche Wettbewerbspolitik",
          "frage": "Welche <b>drei</b> Aufgaben nimmt das Bundeskartellamt wahr?",
          "antworten": [
            "Es deckt Kartelle auf und verhängt Geldbußen.",
            "Es prüft Unternehmensfusionen.",
            "Es verhindert den Missbrauch von Marktmacht.",
            "Es legt die Preise für lebenswichtige Güter fest.",
            "Es schließt Tarifverträge mit den Gewerkschaften ab."
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Das <b>Bundeskartellamt</b> ist in Deutschland die zentrale Institution der <b>Wettbewerbspolitik</b>: Es überwacht Unternehmen und Märkte, <b>deckt Kartelle auf</b>, <b>verhängt Geldbußen</b>, <b>prüft Fusionen</b> und <b>verhindert den Missbrauch von Marktmacht</b>. Ziel ist der Schutz von Wettbewerb und Verbrauchern. D ist falsch – staatliche Preisfestsetzung gehört nicht zu seinen Aufgaben und widerspräche der Marktwirtschaft. E ist falsch: <b>Tarifverträge</b> schließen Gewerkschaften mit Arbeitgebern oder Arbeitgeberverbänden."
        },
        {
          "nr": 18,
          "typ": "auswahl",
          "lernziel": "3.6",
          "zusatz": false,
          "fundstelle": "Folien „Marktstrukturen und Preisbildung“ – Grundzüge staatlicher Wettbewerbspolitik",
          "frage": "Was ist das oberste Ziel der staatlichen Wettbewerbspolitik?",
          "antworten": [
            "Die Erhaltung eines funktionsfähigen Wettbewerbs.",
            "Die Sicherung möglichst hoher Gewinne für große Unternehmen.",
            "Die vollständige Verstaatlichung marktbeherrschender Betriebe.",
            "Die Festsetzung einheitlicher Preise für alle Anbieter einer Branche.",
            "Die Begrenzung der Zahl der Anbieter auf einem Markt."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Oberstes Ziel ist die <b>Erhaltung eines funktionsfähigen Wettbewerbs</b> – damit Innovationen vorangetrieben, die bestmögliche Versorgung gesichert und die wirtschaftliche Macht von Großkonzernen begrenzt wird. Die Wettbewerbspolitik umfasst alle Maßnahmen zur <b>Sicherung des freien Wettbewerbs</b> und zum <b>Abbau von Wettbewerbsbeschränkungen</b>; sie ist Kernbestandteil der <b>Sozialen Marktwirtschaft</b>. B kehrt das Ziel um – geschützt werden Wettbewerb und Verbraucher. C ist kein Instrument der Wettbewerbspolitik. D beschreibt ein <b>Kartell</b>, also genau das, was verhindert werden soll. E ist falsch: Je mehr Anbieter, desto lebendiger der Wettbewerb."
        },
        {
          "nr": 19,
          "typ": "auswahl",
          "lernziel": "3.7",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Marktformen, Aufgaben 2 und 3",
          "frage": "Welche <b>zwei</b> Aussagen zu den Marktformen treffen zu?",
          "antworten": [
            "Im Monopol hat der Anbieter den größten Preisspielraum, weil ihm keine Konkurrenz gegenübersteht.",
            "Im Polypol ist der einzelne Anbieter Preisnehmer.",
            "Im Oligopol gibt es viele kleine Anbieter mit jeweils geringem Marktanteil.",
            "Im Monopol stehen wenige Anbieter wenigen Nachfragern gegenüber.",
            "Die Marktform richtet sich danach, wie hoch der Umsatz der beteiligten Unternehmen ist."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die Marktform ergibt sich aus der <b>Zahl der Anbieter und Nachfrager</b>. Im <b>Monopol</b> steht ein Anbieter vielen Nachfragern gegenüber – ohne Konkurrenz hat er den größten <b>Preisspielraum</b>, weshalb der Staat solche Märkte besonders beaufsichtigt. Im <b>Polypol</b> stehen viele Anbieter vielen Nachfragern gegenüber, der Einzelne ist <b>Preisnehmer</b>. C beschreibt das Polypol, nicht das <b>Oligopol</b> mit seinen <mark>wenigen</mark> großen Anbietern. D beschreibt kein Monopol. E ist falsch: Maßgeblich ist die <b>Anzahl</b> der Marktteilnehmer, nicht der Umsatz."
        },
        {
          "nr": 20,
          "typ": "eingabe",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen beschreiben die Preisbildung im Polypol nur in Worten – in der IHK-Prüfung wird der Gleichgewichtspreis aus einer Markttabelle abgelesen.",
          "sachverhalt": [
            "Für ein IT-Support-Paket gelten folgende Marktdaten:",
            "80 € → Nachfrage 500 Stück, Angebot 150 Stück",
            "90 € → Nachfrage 420 Stück, Angebot 250 Stück",
            "100 € → Nachfrage 340 Stück, Angebot 340 Stück",
            "110 € → Nachfrage 260 Stück, Angebot 430 Stück"
          ],
          "frage": "Bei welchem Preis liegt das Marktgleichgewicht?",
          "art": "zahl",
          "einheit": "€",
          "loesung": 100,
          "toleranz": 0.01,
          "begruendung": "Das <b>Marktgleichgewicht</b> liegt dort, wo <b>angebotene und nachgefragte Menge übereinstimmen</b>. Bei <b>100 €</b> sind beide Mengen gleich <b>340 Stück</b> – das ist der <b>Gleichgewichtspreis</b>, die 340 Stück sind die <b>Gleichgewichtsmenge</b>. Gegenprobe über die Nachbarzeilen: Bei 90 € übersteigt die Nachfrage (420) das Angebot (250) um 170 Stück – ein <b>Nachfrageüberhang</b>, der den Preis nach oben treibt. Bei 110 € übersteigt das Angebot (430) die Nachfrage (260) um 170 Stück – ein <b>Angebotsüberhang</b>, der den Preis nach unten drückt. Beide Male führt die Bewegung zurück auf 100 €."
        },
        {
          "nr": 21,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen das Kartellverbot, aber keine Ausnahmen – die Unterscheidung zwischen verbotenem Kartell und erlaubter Zusammenarbeit ist eine typische Prüfungsfrage.",
          "frage": "Zusatzwissen: Welche <b>zwei</b> Aussagen zum Kartellrecht sind richtig?",
          "antworten": [
            "Nach § 1 GWB sind auch aufeinander abgestimmte Verhaltensweisen verboten, nicht nur ausdrückliche Verträge.",
            "Unternehmenszusammenschlüsse ab bestimmten Umsatzgrößen müssen beim Bundeskartellamt zur Fusionskontrolle angemeldet werden.",
            "Ein Kartell ist erlaubt, wenn alle Beteiligten der Absprache schriftlich zustimmen.",
            "Das Kartellverbot gilt nur in Deutschland, im EU-Binnenmarkt bestehen keine vergleichbaren Regeln.",
            "Verstöße gegen das Kartellverbot werden ausschließlich mit Verwarnungen geahndet."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. <b>§ 1 GWB</b> erfasst ausdrücklich „Vereinbarungen zwischen Unternehmen, Beschlüsse von Unternehmensvereinigungen und <b>aufeinander abgestimmte Verhaltensweisen</b>“ – auf die Form kommt es also nicht an. Die <b>Fusionskontrolle</b> ist die zweite Säule: Zusammenschlüsse ab bestimmten Umsatzschwellen müssen beim <b>Bundeskartellamt</b> angemeldet und dürfen erst nach Freigabe vollzogen werden. C ist falsch – die Zustimmung der Beteiligten ist gerade das Kennzeichen des Kartells und kein Rechtfertigungsgrund. D ist falsch: Im EU-Recht gilt ein inhaltsgleiches Verbot. E ist falsch – das Bundeskartellamt verhängt empfindliche <b>Geldbußen</b>."
        },
        {
          "nr": 22,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen behandeln die Preisbildung nur im Polypol; Monopol und Oligopol kommen in der Prüfung aber genauso vor.",
          "frage": "Zusatzwissen: Welche Aussage zur Preisbildung in den Marktformen ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Im Polypol ist der Anbieter Preisnehmer und muss den Marktpreis hinnehmen.",
            "Im Monopol kann der Anbieter Preis oder Menge festlegen, weil ihm keine Konkurrenz gegenübersteht.",
            "Im Oligopol beobachten die wenigen Anbieter einander; eine Preissenkung löst meist Reaktionen aus.",
            "Im Monopol ist der Preisspielraum unbegrenzt, weil die Nachfrager jeden Preis zahlen müssen.",
            "Der Staat beaufsichtigt Monopole besonders, um den Missbrauch von Marktmacht zu verhindern."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Auch der Monopolist stößt an eine Grenze: Steigt der Preis zu stark, <mark>sinkt die nachgefragte Menge</mark>, die Kunden weichen auf Ersatzprodukte aus oder verzichten. Er kann <b>Preis oder Menge</b> festlegen, nicht beides zugleich, und niemand ist zum Kauf gezwungen. A, B, C und E stimmen: Im <b>Polypol</b> ist der Anbieter <b>Preisnehmer</b>, im <b>Monopol</b> besteht der größte Spielraum, im <b>Oligopol</b> herrscht <b>Reaktionsverbundenheit</b>, und das <b>Bundeskartellamt</b> verhindert den Missbrauch von Marktmacht."
        }
      ]
    },
    {
      "nr": 4,
      "titel": "Handelsrecht und Unternehmensgründung",
      "bereich": "HGB, Kaufmann, Rechtsformen",
      "fragen": [
        {
          "nr": 1,
          "typ": "zuordnung",
          "lernziel": "4.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 1",
          "frage": "Ordnen Sie jedem Fall die Kaufmannsart zu.",
          "optionen": [
            "Istkaufmann",
            "Kannkaufmann",
            "Formkaufmann"
          ],
          "aussagen": [
            "Ein Landwirt mit Eintrag im Handelsregister",
            "Eine GmbH",
            "Ein großer Onlinehandel"
          ],
          "loesung": [2, 3, 1],
          "begruendung": "Der <b>Landwirt</b> ist <b>Kannkaufmann</b>: Land- und Forstwirtschaft fällt nach <b>§ 3 HGB</b> nicht unter § 1 HGB; erst die <mark>freiwillige</mark> Eintragung macht ihn zum Kaufmann (<b>§ 2 HGB</b>). Die <b>GmbH</b> ist <b>Formkaufmann</b> nach <b>§ 6 HGB</b> – kraft ihrer Rechtsform, unabhängig von Umsatz und Tätigkeit. Der <b>große Onlinehandel</b> ist <b>Istkaufmann</b> nach <b>§ 1 HGB</b>: Er betreibt ein Handelsgewerbe, das nach Art und Umfang einen in kaufmännischer Weise eingerichteten Geschäftsbetrieb erfordert – hier entsteht die Kaufmannseigenschaft automatisch."
        },
        {
          "nr": 2,
          "typ": "auswahl",
          "lernziel": "4.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 2",
          "sachverhalt": [
            "Zu prüfen sind drei Firmenbezeichnungen: „Müller GmbH“, „Superladen“ und „GlobalTech Solutions GmbH“."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur Zulässigkeit treffen zu?",
          "antworten": [
            "„Müller GmbH“ ist zulässig: Personenfirma mit korrekt angegebener Rechtsform.",
            "„GlobalTech Solutions GmbH“ ist zulässig: Fantasiefirma mit korrektem Rechtsformzusatz.",
            "„Superladen“ ist zulässig, weil der Name einprägsam und werbewirksam ist.",
            "„Müller GmbH“ ist unzulässig, weil Nachnamen als Firma nicht mehr erlaubt sind.",
            "„GlobalTech Solutions GmbH“ ist unzulässig, weil Fantasienamen stets irreführend sind."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>Firma</b> ist der Name des Unternehmens im Rechtsverkehr. „Müller GmbH“ ist eine <b>Personenfirma</b> mit korrektem Rechtsformzusatz, „GlobalTech Solutions GmbH“ eine <b>Fantasiefirma</b> – beide zulässig, solange keine Irreführung vorliegt. C ist falsch: „Superladen“ fehlt die <mark>Rechtsformkennzeichnung</mark>, und der Name ist zu allgemein und möglicherweise irreführend – für eine Kapitalgesellschaft nicht zulässig. D ist falsch, weil die Personenfirma ausdrücklich erlaubt ist. E ist falsch: Fantasiefirmen sind zulässig; unzulässig wären sie nur, wenn sie über Art oder Umfang des Geschäfts täuschen."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "4.4",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 3",
          "sachverhalt": [
            "Eine Verkäuferin erhält Handlungsvollmacht. Sie möchte für das Unternehmen einen Kredit über 500.000 € aufnehmen."
          ],
          "frage": "Welche <b>zwei</b> Aussagen treffen zu?",
          "antworten": [
            "Nein – die Handlungsvollmacht deckt nur die gewöhnlichen Geschäfte des Betriebs; eine Kreditaufnahme in dieser Höhe gehört nicht dazu.",
            "Prokura kann nur der Inhaber des Handelsgeschäfts, also der Kaufmann, oder sein gesetzlicher Vertreter erteilen.",
            "Ja – die Handlungsvollmacht ist die umfassendste handelsrechtliche Vollmacht.",
            "Prokura darf jeder Mitarbeiter mit Handlungsvollmacht an weitere Mitarbeiter erteilen.",
            "Prokura wird vom Registergericht erteilt und ist deshalb keine Entscheidung des Unternehmens."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>Handlungsvollmacht</b> ist nach <b>§ 54 HGB</b> auf die <b>gewöhnlichen Geschäfte</b> des betreffenden Bereichs begrenzt; für Darlehensaufnahmen, Grundstücksgeschäfte und Prozessführung braucht es eine <b>besondere Ermächtigung</b> – 500.000 € sind kein gewöhnliches Verkäuferinnengeschäft. Die <b>Prokura</b> kann nach <b>§ 48 HGB</b> nur der <b>Inhaber des Handelsgeschäfts</b> oder sein gesetzlicher Vertreter erteilen, und nur durch ausdrückliche Erklärung. C ist falsch – die umfassendste Vollmacht ist die <b>Prokura</b>, nicht die Handlungsvollmacht. D ist falsch, weil die Erteilung dem Kaufmann vorbehalten bleibt. E ist falsch: Das Registergericht trägt die Prokura nur <mark>ein</mark>, erteilt sie aber nicht."
        },
        {
          "nr": 4,
          "typ": "auswahl",
          "lernziel": "4.5",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 4",
          "sachverhalt": [
            "Frau Keller gründet gemeinsam mit zwei Partnern ein Unternehmen. Den dreien ist wichtig, dass ihre persönliche Haftung möglichst gering bleibt."
          ],
          "frage": "Welche Rechtsform passt am besten?",
          "antworten": [
            "GmbH, weil die Haftung auf das Gesellschaftsvermögen beschränkt ist.",
            "OHG, weil alle Gesellschafter gemeinsam und damit anteilig weniger haften.",
            "GbR, weil sie ohne Handelsregistereintrag auskommt.",
            "Einzelunternehmen, weil eine Person die Haftung für alle übernimmt.",
            "KG, in der alle drei Gesellschafter Komplementäre sind."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Bei der <b>GmbH</b> ist die Haftung auf das <b>Gesellschaftsvermögen</b> beschränkt, das Privatvermögen der Gesellschafter bleibt außen vor – genau das wünschen die drei. Die Gegenleistung ist das <b>Mindeststammkapital von 25.000 €</b> (<b>§ 5 Abs. 1 GmbHG</b>) und der Handelsregistereintrag. B und C sind falsch: Bei <b>OHG</b> und <b>GbR</b> haften alle Gesellschafter voll, persönlich und unbeschränkt, auch mit dem Privatvermögen – gemeinsame Haftung bedeutet keine geringere Haftung. D scheidet aus, weil ein <b>Einzelunternehmen</b> nur eine Person hat und diese voll haftet. E ist falsch: Der <b>Komplementär</b> haftet unbeschränkt; nur der <b>Kommanditist</b> haftet beschränkt auf seine Einlage."
        },
        {
          "nr": 5,
          "typ": "auswahl",
          "lernziel": "4.4",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 5",
          "frage": "Welche <b>drei</b> Merkmale kennzeichnen die Prokura?",
          "antworten": [
            "Sie ist die umfassendste handelsrechtliche Vollmacht.",
            "Sie wird vom Kaufmann erteilt.",
            "Sie wird ins Handelsregister eingetragen.",
            "Sie ist von vornherein auf einen einzelnen Geschäftsbereich begrenzt.",
            "Sie erlischt automatisch nach Ablauf eines Jahres."
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Die <b>Prokura</b> ist die <b>umfassendste</b> handelsrechtliche Vollmacht, sie wird nach <b>§ 48 HGB</b> nur vom <b>Kaufmann</b> (oder seinem gesetzlichen Vertreter) ausdrücklich erteilt und ist <b>ins Handelsregister einzutragen</b>. Der Prokurist unterschreibt mit dem Zusatz <b>„ppa.“</b> (per Prokura). D beschreibt die <b>Handlungsvollmacht</b> – Beschränkungen der Prokura sind Dritten gegenüber nach <b>§ 50 HGB</b> sogar unwirksam. E ist frei erfunden: Die Prokura gilt, bis sie widerrufen wird. Merken Sie sich die eine gesetzliche Grenze: Für <b>Grundstücksgeschäfte</b> braucht auch der Prokurist eine besondere Ermächtigung (<b>§ 49 Abs. 2 HGB</b>)."
        },
        {
          "nr": 6,
          "typ": "auswahl",
          "lernziel": "4.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 6",
          "frage": "Was ist ein Handelsgewerbe?",
          "antworten": [
            "Ein kaufmännisch eingerichteter Geschäftsbetrieb.",
            "Jede selbstständige Tätigkeit, auch die eines Freiberuflers.",
            "Jedes Unternehmen, das im Handelsregister eingetragen ist.",
            "Ausschließlich der Handel mit Waren, nicht die Erbringung von Dienstleistungen.",
            "Jede Tätigkeit, die mehr als 100.000 € Umsatz im Jahr erzielt."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Nach <b>§ 1 HGB</b> ist Handelsgewerbe jeder Gewerbebetrieb, „es sei denn, dass das Unternehmen nach Art oder Umfang einen in kaufmännischer Weise eingerichteten Geschäftsbetrieb nicht erfordert“ – im Umkehrschluss: ein <b>kaufmännisch eingerichteter Geschäftsbetrieb</b>. B ist falsch: <b>Freiberufler</b> wie Ärzte, Anwälte oder Entwickler betreiben kein Gewerbe und sind keine Kaufleute. C verwechselt Ursache und Wirkung – die Eintragung folgt der Kaufmannseigenschaft, beim Istkaufmann entsteht sie auch ohne Eintragung. D ist zu eng, weil auch Produktions- und Dienstleistungsbetriebe ein Handelsgewerbe betreiben können. E ist falsch: Das Gesetz nennt keine feste Umsatzgrenze, sondern stellt auf <b>Art und Umfang</b> ab."
        },
        {
          "nr": 7,
          "typ": "auswahl",
          "lernziel": "4.5",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 7",
          "frage": "Wer bezahlt die Schulden des Unternehmens? Welche <b>zwei</b> Aussagen treffen zu?",
          "antworten": [
            "Beim Einzelunternehmen haftet der Inhaber mit Betriebs- und Privatvermögen.",
            "Bei der GmbH haftet grundsätzlich nur das Gesellschaftsvermögen.",
            "Beim Einzelunternehmen ist die Haftung auf das Betriebsvermögen beschränkt.",
            "Bei der GmbH haften die Gesellschafter zusätzlich mit ihrem Privatvermögen.",
            "Bei beiden Rechtsformen haftet ausschließlich der Geschäftsführer persönlich."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Das <b>Einzelunternehmen</b> kennt keine Trennung der Vermögen: Der Inhaber haftet <b>voll, persönlich und unbeschränkt</b> – also auch mit dem Privatvermögen. Die <b>GmbH</b> ist dagegen eine <b>eigene juristische Person</b>; ihr Vermögen haftet, das Privatvermögen der Gesellschafter grundsätzlich nicht. C und D kehren genau das um und sind die häufigste Verwechslung an dieser Stelle. E ist falsch: Der <b>Geschäftsführer</b> haftet nur ausnahmsweise persönlich, etwa bei Pflichtverletzungen – die Regel ist die Haftung der Gesellschaft."
        },
        {
          "nr": 8,
          "typ": "auswahl",
          "lernziel": "4.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 8",
          "frage": "Wann liegt Kaufmannseigenschaft vor?",
          "antworten": [
            "Wenn ein Handelsgewerbe betrieben wird oder die Rechtsform die Kaufmannseigenschaft begründet.",
            "Ausschließlich dann, wenn das Unternehmen im Handelsregister eingetragen ist.",
            "Sobald ein Unternehmen Mitarbeiter beschäftigt.",
            "Sobald eine selbstständige Tätigkeit mit Gewinnerzielungsabsicht aufgenommen wird.",
            "Nur bei Kapitalgesellschaften, niemals bei Einzelunternehmen."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Es gibt zwei Wege zur Kaufmannseigenschaft: über das <b>Handelsgewerbe</b> (<b>§ 1 HGB</b> – Istkaufmann; <b>§ 2 HGB</b> – Kannkaufmann durch freiwillige Eintragung) oder über die <b>Rechtsform</b> (<b>§ 6 HGB</b> – Formkaufmann, z. B. GmbH und AG). B ist falsch, weil der <b>Istkaufmann</b> auch ohne Eintragung Kaufmann ist. C ist falsch – auf die Mitarbeiterzahl kommt es nicht an. D ist zu weit: Selbstständigkeit mit Gewinnerzielungsabsicht reicht nicht, es muss eine <b>kaufmännische Organisation</b> erforderlich sein; Freiberufler bleiben ohnehin außen vor. E ist falsch: Auch ein <b>eingetragener Kaufmann (e. K.)</b> als Einzelunternehmer ist Kaufmann."
        },
        {
          "nr": 9,
          "typ": "auswahl",
          "lernziel": "4.1",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 9",
          "frage": "Warum gibt es neben dem Bürgerlichen Gesetzbuch ein eigenes Handelsrecht?",
          "antworten": [
            "Weil das Handelsrecht ein Sonderrecht für Kaufleute ist und den Geschäftsverkehr schneller und rechtssicherer regelt.",
            "Weil das BGB für Unternehmen überhaupt nicht gilt.",
            "Weil das Handelsrecht Kaufleute von allen Sorgfaltspflichten befreit.",
            "Weil das Handelsrecht ausschließlich den Warenhandel und nicht den Dienstleistungsbereich regelt.",
            "Weil das BGB erst nach dem HGB entstanden ist und dessen Lücken füllt."
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Das <b>HGB</b> ist das <b>Sonderprivatrecht der Kaufleute</b>: Es rechnet damit, dass Profis miteinander Geschäfte machen, und ist deshalb auf <b>Schnelligkeit und Effizienz</b> ausgelegt – weniger Formvorschriften, klare Regeln für Handelsgeschäfte, Handelsbräuche. B ist falsch: Das <b>BGB</b> gilt als allgemeines Privatrecht weiter, das HGB tritt nur ergänzend und vorrangig hinzu. C kehrt die Lage um – Kaufleute unterliegen wegen ihrer professionellen Rolle <mark>strengeren</mark> Sorgfaltspflichten. D ist zu eng. E ist historisch falsch und sachlich unerheblich."
        },
        {
          "nr": 10,
          "typ": "auswahl",
          "lernziel": "4.1",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 10",
          "frage": "Welches Gesetz ist die Grundlage des Handelsrechts?",
          "antworten": [
            "Das Handelsgesetzbuch (HGB)",
            "Das Bürgerliche Gesetzbuch (BGB)",
            "Das Gesetz gegen Wettbewerbsbeschränkungen (GWB)",
            "Die Gewerbeordnung (GewO)",
            "Das Betriebsverfassungsgesetz (BetrVG)"
          ],
          "loesung": [1],
          "negativ": false,
          "begruendung": "Richtig ist A. Das <b>Handelsgesetzbuch (HGB)</b> ist das zentrale Gesetzbuch des deutschen Handelsrechts; es regelt die Rechtsbeziehungen von Kaufleuten, Handelsgesellschaften und Unternehmen. B ist das <b>allgemeine Privatrecht</b> für alle – es gilt ergänzend, ist aber nicht die Grundlage des Handelsrechts. C regelt den <b>Wettbewerb</b> (Kartellverbot, Fusionskontrolle). D regelt die <b>Ausübung von Gewerben</b>, etwa die Gewerbeanmeldung. E regelt die <b>betriebliche Mitbestimmung</b>."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "4.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 11",
          "frage": "Welche <b>vier</b> Merkmale kennzeichnen ein Handelsgewerbe?",
          "antworten": [
            "Selbstständigkeit – auf eigene Rechnung und eigenes Risiko",
            "Dauerhaftigkeit – auf Dauer angelegt und regelmäßig ausgeübt",
            "Gewinnerzielungsabsicht",
            "Erforderlichkeit einer kaufmännischen Organisation",
            "Zwingende Eintragung im Handelsregister"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Ein <b>Handelsgewerbe</b> betreibt, wer <b>selbstständig</b> auf eigene Rechnung und eigenes Risiko handelt, dies <b>dauerhaft</b> und regelmäßig tut, dabei <b>Gewinn erzielen will</b> und einen Betrieb führt, der eine <b>kaufmännische Organisation</b> erfordert. E ist falsch: Beim <b>Istkaufmann</b> entsteht die Kaufmannseigenschaft nach <b>§ 1 HGB</b> <mark>automatisch</mark>, auch ohne Eintragung – die Eintragung ist dann nur noch deklaratorisch und Pflicht, aber kein Merkmal des Handelsgewerbes."
        },
        {
          "nr": 12,
          "typ": "auswahl",
          "lernziel": "4.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 12",
          "frage": "Welche <b>vier</b> Begriffe bezeichnen Kaufmannsarten?",
          "antworten": [
            "Istkaufmann",
            "Kannkaufmann",
            "Formkaufmann",
            "Fiktivkaufmann",
            "Minderkaufmann"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Der <b>Istkaufmann</b> betreibt ein Handelsgewerbe (<b>§ 1 HGB</b>), der <b>Kannkaufmann</b> lässt sich freiwillig eintragen (<b>§§ 2, 3 HGB</b>), der <b>Formkaufmann</b> ist es kraft Rechtsform (<b>§ 6 HGB</b>, z. B. GmbH, AG), der <b>Fiktivkaufmann</b> ist eingetragen, obwohl keine Pflicht bestand (<b>§ 5 HGB</b>). Daneben kennt man noch den <b>Scheinkaufmann</b>, der nach außen wie ein Kaufmann auftritt, ohne es zu sein. E ist falsch: Den <b>Minderkaufmann</b> gibt es seit der Handelsrechtsreform 1998 nicht mehr – ein beliebter Prüfungsköder. Zur häufig gestellten Anschlussfrage: Ein <b>Landwirt</b> ist <mark>nicht</mark> automatisch Kaufmann, sondern erst bei freiwilliger Eintragung."
        },
        {
          "nr": 13,
          "typ": "auswahl",
          "lernziel": "4.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 13",
          "frage": "Welche Aussage zum Handelsregister ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Es ist ein öffentliches Verzeichnis beim Amtsgericht.",
            "Es schafft Transparenz und Rechtssicherheit im Geschäftsverkehr.",
            "Geschäftspartner können sich dort über Haftung und Vertretungsmacht informieren.",
            "Es erteilt den eingetragenen Unternehmen zugleich die Gewerbeerlaubnis.",
            "In Abteilung A stehen Einzelunternehmen und Personengesellschaften."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Die <b>Gewerbeerlaubnis</b> bzw. die Gewerbeanmeldung ist Sache des <b>Gewerbeamts</b> – das Handelsregister erteilt keine Erlaubnisse, es <mark>verzeichnet</mark> nur. A, B, C und E stimmen: Das <b>Handelsregister</b> ist ein <b>öffentliches Verzeichnis beim Amtsgericht</b>, es dient der <b>Transparenz</b>, dem <b>Schutz von Geschäftspartnern</b> und der <b>Rechtssicherheit</b>, und es ist in <b>HR A</b> (Einzelunternehmen, Personengesellschaften) und <b>HR B</b> (Kapitalgesellschaften) gegliedert."
        },
        {
          "nr": 14,
          "typ": "zuordnung",
          "lernziel": "4.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 14",
          "frage": "Ordnen Sie jede Rechtsform der richtigen Abteilung des Handelsregisters zu.",
          "optionen": [
            "Abteilung A (HR A)",
            "Abteilung B (HR B)"
          ],
          "aussagen": [
            "Eingetragener Kaufmann (e. K.)",
            "Offene Handelsgesellschaft (OHG)",
            "Kommanditgesellschaft (KG)",
            "Gesellschaft mit beschränkter Haftung (GmbH)",
            "Aktiengesellschaft (AG)"
          ],
          "loesung": [1, 1, 1, 2, 2],
          "begruendung": "In <b>HR A</b> stehen <b>Einzelunternehmen</b> und <b>Personengesellschaften</b> – e. K., OHG und KG. In <b>HR B</b> stehen die <b>Kapitalgesellschaften</b> – GmbH, UG (haftungsbeschränkt) und AG. Merkhilfe: <b>A wie Alleinunternehmer und Personengesellschaften</b>, <b>B wie beschränkte Haftung</b>. Hinweis zu den Unterlagen: Dort wird die <b>GbR</b> unter HR A aufgeführt – das trifft so nicht zu. Die GbR wird <mark>nicht</mark> ins Handelsregister eingetragen; seit dem 1. Januar 2024 kann sie sich freiwillig in das neue <b>Gesellschaftsregister</b> eintragen lassen und heißt dann <b>eGbR</b>."
        },
        {
          "nr": 15,
          "typ": "auswahl",
          "lernziel": "4.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 15",
          "frage": "Was bedeutet Publizitätswirkung?",
          "antworten": [
            "Alle Unternehmen müssen ihre Umsätze öffentlich bekannt geben.",
            "Eingetragene Tatsachen gelten gegenüber Dritten; nicht eingetragene Tatsachen können Dritten nicht entgegengehalten werden.",
            "Jede Eintragung muss zusätzlich in einer Tageszeitung erscheinen, sonst ist sie unwirksam.",
            "Das Handelsregister darf nur von Behörden und nicht von Privatpersonen eingesehen werden.",
            "Eingetragene Tatsachen gelten ausschließlich zwischen den Gesellschaftern, nicht gegenüber Dritten."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Die <b>Publizitätswirkung</b> des Handelsregisters schützt Dritte, die sich auf die Richtigkeit der Eintragungen verlassen (<b>§ 15 HGB</b>). <b>Positive Publizität</b>: Eingetragene und bekannt gemachte Tatsachen gelten – jeder muss sie gegen sich gelten lassen. <b>Negative Publizität</b>: Was <mark>nicht</mark> eingetragen ist, kann einem gutgläubigen Dritten nicht entgegengehalten werden. A ist falsch – eine allgemeine Umsatzveröffentlichung gibt es nicht. C ist falsch, weil die Bekanntmachung heute elektronisch erfolgt und keine Wirksamkeitsvoraussetzung der Eintragung ist. D ist falsch: Das Register ist <b>öffentlich</b> und für jeden einsehbar. E kehrt den Zweck um – gerade der <mark>Außenverkehr</mark> soll geschützt werden."
        },
        {
          "nr": 16,
          "typ": "auswahl",
          "lernziel": "4.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 16",
          "frage": "Welche Aussage zur Firma ist <mark>falsch</mark>?",
          "antworten": [
            "Unter ihrer Firma kann eine Gesellschaft klagen und verklagt werden.",
            "Die Firma ist der rechtliche Name eines Unternehmens im Rechtsverkehr.",
            "Die Firma ist das Gebäude, in dem das Unternehmen seinen Sitz hat.",
            "Es gibt Personenfirmen, Sachfirmen, Fantasiefirmen und Mischfirmen.",
            "Die Firma darf über Art oder Umfang des Geschäfts nicht irreführen."
          ],
          "loesung": [3],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist C. Das Gebäude ist der <b>Geschäftssitz</b>, nicht die Firma. Hier rächt sich der umgangssprachliche Gebrauch: Wer „ich arbeite in einer Firma“ sagt, meint juristisch das <b>Unternehmen</b> oder den <b>Betrieb</b>. B, A, D und E stimmen: Die <b>Firma</b> ist der <b>rechtliche Name</b>, unter dem ein Unternehmen Geschäfte abschließt, klagt und verklagt werden kann. Es gibt sie als <b>Personen-</b>, <b>Sach-</b>, <b>Fantasie-</b> und <b>Mischfirma</b>, stets mit <b>Rechtsformzusatz</b> und ohne Irreführung."
        },
        {
          "nr": 17,
          "typ": "zuordnung",
          "lernziel": "4.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 17",
          "frage": "Ordnen Sie jedem Beispiel die Firmenart zu.",
          "optionen": [
            "Personenfirma",
            "Sachfirma",
            "Fantasiefirma",
            "Mischfirma"
          ],
          "aussagen": [
            "Schmidt e. K.",
            "Rechenzentrum Nordwest GmbH",
            "GlobalTech Solutions GmbH",
            "Müller Datentechnik GmbH"
          ],
          "loesung": [1, 2, 3, 4],
          "begruendung": "Die <b>Personenfirma</b> nennt den Inhaber – <mark>wer</mark> (Schmidt e. K.). Die <b>Sachfirma</b> nennt die Tätigkeit – <mark>was</mark> (Rechenzentrum Nordwest GmbH). Die <b>Fantasiefirma</b> ist ein erfundener Kreativname (GlobalTech Solutions GmbH). Die <b>Mischfirma</b> kombiniert mehrere Elemente, hier Name und Tätigkeit (Müller Datentechnik GmbH). In allen Fällen gilt: Der <b>Rechtsformzusatz</b> muss angegeben werden, und die Firma darf nicht irreführen."
        },
        {
          "nr": 18,
          "typ": "eingabe",
          "lernziel": "4.8",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 18 (Gewinnberechnung OHG)",
          "sachverhalt": [
            "Eine OHG hat zwei Gesellschafter: A bringt 20.000 € ein, B bringt 10.000 € ein. Der Gewinn beträgt 6.000 €.",
            "Verteilt wird nach dem im Unterricht verwendeten Schema: zuerst 4 % Kapitalverzinsung auf die Einlagen, der Rest nach Köpfen."
          ],
          "frage": "Wie viel erhält Gesellschafter A insgesamt?",
          "art": "zahl",
          "einheit": "€",
          "loesung": 3200,
          "toleranz": 0.01,
          "begruendung": "<b>Schritt 1 – 4 % Kapitalverzinsung:</b> A: 4 % von 20.000 € = 800 €. B: 4 % von 10.000 € = 400 €. Zusammen 1.200 €. <b>Schritt 2 – Restgewinn:</b> 6.000 € − 1.200 € = 4.800 €. <b>Schritt 3 – Rest nach Köpfen:</b> 4.800 € ÷ 2 Gesellschafter = 2.400 € je Kopf. <b>Ergebnis:</b> A erhält 800 € + 2.400 € = <b>3.200 €</b>, B erhält 400 € + 2.400 € = 2.800 €. <b>Gegenprobe:</b> 3.200 € + 2.800 € = 6.000 € – der Gewinn ist vollständig verteilt. <mark>Wichtig für die Praxis:</mark> Die 4-%-Regel stand in <b>§ 121 HGB alte Fassung</b>. Seit dem 1. Januar 2024 (MoPeG) gilt <b>§ 120 Abs. 1 HGB</b> in Verbindung mit <b>§ 709 Abs. 3 BGB</b>: Gewinn und Verlust richten sich vorrangig nach den <b>vereinbarten Beteiligungsverhältnissen</b>, sonst nach dem Verhältnis der Beitragswerte, sonst nach Köpfen. Die Kapitalverzinsung gilt nur noch, wenn sie im Gesellschaftsvertrag vereinbart ist. Nach dem Verhältnis der Einlagen (20.000 : 10.000 = 2 : 1) erhielte A 4.000 € und B 2.000 €. Im Kurs wird mit dem oben gezeigten Schema gerechnet."
        },
        {
          "nr": 19,
          "typ": "auswahl",
          "lernziel": "4.4",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Handelsrecht, Aufgabe 5 (Prüfungsfall)",
          "sachverhalt": [
            "Ein Prokurist eines IT-Systemhauses möchte das Betriebsgrundstück verkaufen."
          ],
          "frage": "Darf er das, und warum?",
          "antworten": [
            "Nur dann, wenn die Beschränkung der Prokura im Handelsregister eingetragen ist.",
            "Ja – die Prokura umfasst ausnahmslos alle Geschäfte des Handelsgewerbes.",
            "Nein – ein Prokurist darf überhaupt keine Verträge für das Unternehmen abschließen.",
            "Ja, solange der Kaufpreis unter 100.000 € liegt.",
            "Nur mit einer besonderen Ermächtigung – Grundstücksgeschäfte sind von der Prokura nicht gedeckt."
          ],
          "loesung": [5],
          "negativ": false,
          "begruendung": "Richtig ist E. Die <b>Prokura</b> berechtigt zu allen Geschäften, die der Betrieb eines Handelsgewerbes mit sich bringt – mit einer gesetzlichen Ausnahme: Zur <b>Veräußerung und Belastung von Grundstücken</b> ist der Prokurist nur befugt, wenn ihm diese Befugnis <mark>besonders erteilt</mark> wurde (<b>§ 49 Abs. 2 HGB</b>). B übersieht genau diese Ausnahme. C ist falsch – der Prokurist darf sehr wohl Verträge schließen, das ist der Sinn der Vollmacht. D ist falsch: Eine Wertgrenze kennt das Gesetz nicht. A ist falsch und verkehrt <b>§ 50 HGB</b>: Beschränkungen der Prokura sind Dritten gegenüber gerade <mark>unwirksam</mark> und werden nicht eingetragen – die Grundstücksausnahme folgt direkt aus dem Gesetz."
        },
        {
          "nr": 20,
          "typ": "zuordnung",
          "lernziel": "4.5",
          "zusatz": false,
          "fundstelle": "Folien „Handelsrecht und Unternehmensgründung“ – Kommanditgesellschaft",
          "frage": "Ordnen Sie jede Aussage dem richtigen Gesellschafter einer KG zu.",
          "optionen": [
            "Komplementär",
            "Kommanditist"
          ],
          "aussagen": [
            "Haftet voll, persönlich und unbeschränkt – auch mit dem Privatvermögen.",
            "Haftet beschränkt, nur bis zur Höhe seiner Einlage.",
            "Führt die Geschäfte und vertritt das Unternehmen nach außen.",
            "Hat im Regelfall weder Geschäftsführung noch Vertretungsbefugnis."
          ],
          "loesung": [1, 2, 1, 2],
          "begruendung": "Die <b>KG</b> ist eine Personengesellschaft mit <mark>zwei</mark> Arten von Gesellschaftern. Der <b>Komplementär</b> ist der Vollhafter: Er haftet <b>persönlich und unbeschränkt</b> mit dem Privatvermögen, führt dafür aber die Geschäfte und vertritt die Gesellschaft. Der <b>Kommanditist</b> ist der Teilhafter: Er haftet nur <b>bis zur Höhe seiner Einlage</b> und ist im Regelfall von Geschäftsführung und Vertretung ausgeschlossen. Merksatz für die Prüfung: <b>Wer voll haftet, darf führen.</b> Daraus erklärt sich auch die <b>GmbH & Co. KG</b> – dort ist die GmbH der Komplementär, sodass am Ende niemand persönlich unbeschränkt haftet."
        },
        {
          "nr": 21,
          "typ": "auswahl",
          "lernziel": "4.6",
          "zusatz": false,
          "fundstelle": "Folien „Handelsrecht und Unternehmensgründung“ – Voraussetzungen Unternehmensgründung",
          "frage": "Welche <b>drei</b> Punkte gehören zu den Voraussetzungen einer Unternehmensgründung?",
          "antworten": [
            "Eine tragfähige Geschäftsidee",
            "Eine Marktanalyse",
            "Die Wahl der Rechtsform",
            "Die Bestellung eines Betriebsrats",
            "Der Abschluss eines Tarifvertrags"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Zu den Voraussetzungen einer Gründung zählen <b>Geschäftsidee</b>, <b>Marktanalyse</b>, <b>Kapital</b>, <b>Rechtsform</b> und <b>Anmeldung</b>. D ist falsch: Ein <b>Betriebsrat</b> wird von den Arbeitnehmern <mark>gewählt</mark>, nicht vom Gründer bestellt – und erst ab fünf wahlberechtigten Arbeitnehmern (<b>§ 1 BetrVG</b>); mit der Gründung hat er nichts zu tun. E ist falsch: Ein <b>Tarifvertrag</b> wird zwischen Gewerkschaft und Arbeitgeber bzw. Arbeitgeberverband geschlossen und ist keine Gründungsvoraussetzung."
        },
        {
          "nr": 22,
          "typ": "reihenfolge",
          "lernziel": "4.6",
          "zusatz": false,
          "fundstelle": "Folien „Handelsrecht und Unternehmensgründung“ – Voraussetzungen Unternehmensgründung",
          "frage": "Bringen Sie die Schritte einer Unternehmensgründung in die sinnvolle Reihenfolge.",
          "schritte": [
            "Kapital beschaffen und die Finanzierung sichern.",
            "Die Geschäftsidee entwickeln.",
            "Das Unternehmen anmelden.",
            "Den Markt analysieren.",
            "Die passende Rechtsform wählen."
          ],
          "loesung": [3, 1, 5, 2, 4],
          "begruendung": "Die sinnvolle Reihenfolge lautet: <b>Geschäftsidee</b> → <b>Marktanalyse</b> → <b>Kapital</b> → <b>Rechtsform</b> → <b>Anmeldung</b>. Zuerst steht die Idee, denn ohne sie gibt es nichts zu prüfen. Die <b>Marktanalyse</b> klärt, ob die Idee trägt und wer die Zielgruppe ist. Erst dann lässt sich der <b>Kapitalbedarf</b> beziffern und die Finanzierung sichern. Die <b>Rechtsform</b> hängt von Haftungswunsch, Kapital und Gesellschafterzahl ab – sie lässt sich erst sinnvoll wählen, wenn diese Fragen geklärt sind. Am Ende steht die <b>Anmeldung</b> bei Gewerbeamt und gegebenenfalls Handelsregister."
        },
        {
          "nr": 23,
          "typ": "auswahl",
          "lernziel": "4.7",
          "zusatz": false,
          "fundstelle": "Folien „Handelsrecht und Unternehmensgründung“ – Businessplan",
          "frage": "Welche <b>drei</b> Punkte gehören zu den Bestandteilen eines Businessplans?",
          "antworten": [
            "Zielgruppe und Ziele",
            "Finanzierung",
            "Marketing und Marktchancen",
            "Die Satzung des Betriebsrats",
            "Das Protokoll der letzten Betriebsversammlung"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Ein <b>Businessplan</b> ist der schriftliche Plan zur Gründung oder Entwicklung eines Unternehmens. Zu seinen Bestandteilen gehören <b>Geschäftsidee</b>, <b>Zielgruppe und Ziele</b>, <b>Finanzierung</b>, <b>Marketing und Marktchancen</b>, <b>Rentabilität</b> und <b>Umsatzplanung</b>. D und E stammen aus dem Betriebsverfassungsrecht und haben im Businessplan nichts verloren – ein frisch gegründetes Unternehmen hat in aller Regel noch gar keinen Betriebsrat."
        },
        {
          "nr": 24,
          "typ": "auswahl",
          "lernziel": "4.7",
          "zusatz": false,
          "fundstelle": "Folien „Handelsrecht und Unternehmensgründung“ – Businessplan, Zweck",
          "sachverhalt": [
            "Eine Gründerin möchte für ihr IT-Start-up einen Bankkredit aufnehmen. Die Bank verlangt einen Businessplan."
          ],
          "frage": "Welche Aussage zum Zweck des Businessplans ist <mark>falsch</mark>?",
          "antworten": [
            "Er stellt die Geschäftsidee und die Ziele des Unternehmens nachvollziehbar dar.",
            "Er legt die geplante Finanzierung offen.",
            "Er zeigt die Marktchancen und die erwartete Rentabilität.",
            "Er ersetzt den Gesellschaftsvertrag und die Anmeldung beim Handelsregister.",
            "Er dient der Gründerin auch selbst als Prüfstein, ob die Idee wirtschaftlich trägt."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Der <b>Businessplan</b> ist ein <mark>Planungs- und Überzeugungsdokument</mark>, kein Rechtsakt: Er ersetzt weder den <b>Gesellschaftsvertrag</b> noch die <b>Anmeldung</b> bei Gewerbeamt und Handelsregister. A, B, C und E stimmen: Er beschreibt <b>Geschäftsidee</b> und <b>Ziele</b>, legt die <b>Finanzierung</b> offen, zeigt <b>Marktchancen</b> und <b>Rentabilität</b> – und zwingt die Gründerin zugleich, die eigene Idee durchzurechnen."
        },
        {
          "nr": 25,
          "typ": "auswahl",
          "lernziel": "4.8",
          "zusatz": false,
          "fundstelle": "Folien „Handelsrecht und Unternehmensgründung“ – Wann ist man im IT-Sektor Kaufmann?",
          "sachverhalt": [
            "Ein Solo-Webdesigner startet als Kleingewerbe. Drei Jahre später beschäftigt er acht Mitarbeitende, erzielt deutlich über 1 Mio. € Jahresumsatz und wickelt Projekte mit mehrjähriger Laufzeit ab. Im Handelsregister ist er bis heute nicht eingetragen."
          ],
          "frage": "Wie ist er handelsrechtlich einzuordnen?",
          "antworten": [
            "Als Kleingewerbetreibender, solange er nicht im Handelsregister eingetragen ist.",
            "Als Istkaufmann nach § 1 HGB – Art und Umfang des Betriebs erfordern eine kaufmännische Organisation; auf die Eintragung kommt es nicht an.",
            "Als Kannkaufmann, weil er sich freiwillig eintragen lassen könnte.",
            "Als Formkaufmann, weil er ein Unternehmen mit Angestellten betreibt.",
            "Als Scheinkaufmann, weil er nach außen wie ein Kaufmann auftritt."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Wächst ein Betrieb so weit, dass er nach <b>Art und Umfang</b> einen in kaufmännischer Weise eingerichteten Geschäftsbetrieb erfordert – Mitarbeiterzahl, Umsatzhöhe, komplexe Projektlaufzeiten –, wird er <mark>automatisch</mark> zum <b>Istkaufmann</b> nach <b>§ 1 HGB</b>. Die Eintragung ist dann Pflicht, aber nur noch <b>deklaratorisch</b>. A verwechselt Ursache und Wirkung. C ist falsch: Der <b>Kannkaufmann</b> nach <b>§ 2 HGB</b> betrifft gerade kleine Betriebe, die sich freiwillig eintragen lassen. D ist falsch, weil der <b>Formkaufmann</b> die Kaufmannseigenschaft aus der <mark>Rechtsform</mark> bezieht (GmbH, AG) – ein Einzelunternehmer ist das nicht. E passt nicht: Der <b>Scheinkaufmann</b> ist in Wahrheit <mark>kein</mark> Kaufmann, hier liegt die Kaufmannseigenschaft aber tatsächlich vor."
        },
        {
          "nr": 26,
          "typ": "eingabe",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen das Mindeststammkapital der GmbH, aber nicht, wie viel davon bei der Anmeldung tatsächlich eingezahlt sein muss – danach wird in der Prüfung gefragt.",
          "sachverhalt": [
            "Drei Gesellschafter gründen eine GmbH mit dem gesetzlichen Mindeststammkapital. Sie wollen ausschließlich Bareinlagen leisten."
          ],
          "frage": "Wie viel Euro müssen mindestens eingezahlt sein, bevor die GmbH zur Eintragung angemeldet werden darf?",
          "art": "zahl",
          "einheit": "€",
          "loesung": 12500,
          "toleranz": 0.01,
          "begruendung": "Das <b>Mindeststammkapital</b> der GmbH beträgt <b>25.000 €</b> (<b>§ 5 Abs. 1 GmbHG</b>). Angemeldet werden darf sie aber schon früher: Nach <b>§ 7 Abs. 2 GmbHG</b> muss auf jeden Geschäftsanteil mindestens <b>ein Viertel</b> eingezahlt sein, und insgesamt mindestens die <b>Hälfte des Mindeststammkapitals</b>. Rechenweg: 25.000 € ÷ 2 = <b>12.500 €</b>. Gegenprobe: 12.500 € sind genau 50 % von 25.000 € – und mehr als das Viertel, das auf die einzelnen Anteile entfällt. Die restlichen 12.500 € bleiben als offene Einlageverpflichtung der Gesellschafter bestehen. Nicht verwechseln mit der <b>UG (haftungsbeschränkt)</b>: Dort ist das Stammkapital nach <b>§ 5a Abs. 2 GmbHG</b> <mark>in voller Höhe</mark> einzuzahlen, Sacheinlagen sind ausgeschlossen."
        },
        {
          "nr": 27,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen positive und negative Publizität nur als Begriffe – die Anwendung auf einen Fall ist eine klassische Prüfungsaufgabe.",
          "sachverhalt": [
            "Ein Systemhaus widerruft die Prokura seines Mitarbeiters. Das Erlöschen wird jedoch nicht ins Handelsregister eingetragen. Der ehemalige Prokurist bestellt danach im Namen des Systemhauses Hardware bei einem Lieferanten, der von dem Widerruf nichts weiß."
          ],
          "frage": "Wie ist die Rechtslage?",
          "antworten": [
            "Der Vertrag ist unwirksam, weil der Lieferant vor jeder Bestellung das Handelsregister einsehen muss.",
            "Der Vertrag ist unwirksam, weil die Prokura im Zeitpunkt der Bestellung tatsächlich erloschen war.",
            "Das Systemhaus muss den Vertrag gegen sich gelten lassen – nicht eingetragene Tatsachen können einem gutgläubigen Dritten nicht entgegengehalten werden.",
            "Der ehemalige Prokurist haftet allein, das Systemhaus trifft keinerlei Bindung.",
            "Die Rechtslage hängt davon ab, ob der Widerruf schriftlich erfolgt ist."
          ],
          "loesung": [3],
          "negativ": false,
          "begruendung": "Richtig ist C. Das ist der Kern der <b>negativen Publizität</b> nach <b>§ 15 Abs. 1 HGB</b>: Solange eine eintragungspflichtige Tatsache – hier das <b>Erlöschen der Prokura</b> – <mark>nicht eingetragen und bekannt gemacht</mark> ist, kann sie einem <b>gutgläubigen Dritten</b> nicht entgegengehalten werden. Der Lieferant durfte auf den Registerstand vertrauen; das Systemhaus ist an den Vertrag gebunden. B übersieht genau diesen Vertrauensschutz. A kehrt die Pflicht um – der Dritte <mark>darf</mark> sich auf das Register verlassen, er <mark>muss</mark> aber nicht nachsehen. D ist falsch, weil die Bindung gerade das Unternehmen trifft; interne Regressansprüche sind davon zu trennen. E ist unerheblich: Auf die Form des Widerrufs kommt es für den Schutz des Dritten nicht an, sondern auf die fehlende <b>Eintragung</b>."
        }
      ]
    },
    {
      "nr": 5,
      "titel": "Rechte von Beschäftigten",
      "bereich": "Arbeitsvertrag, Kündigung, Tarif",
      "fragen": [
        {
          "nr": 1,
          "typ": "reihenfolge",
          "lernziel": "5.1",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Rangfolge arbeitsrechtlicher Vorschriften",
          "frage": "Bringen Sie die Vorschriften in die richtige Rangfolge, beginnend mit der höchstrangigen.",
          "schritte": [
            "Manteltarifvertrag",
            "Grundgesetz Artikel 12",
            "Individueller Arbeitsvertrag",
            "Mutterschutzgesetz",
            "Betriebsvereinbarung"
          ],
          "loesung": [3, 1, 5, 2, 4],
          "begruendung": "Die <b>Rangfolge (Rangprinzip)</b> lautet von oben nach unten: <b>Grundgesetz</b> (hier Art. 12 – Berufsfreiheit) → <b>Gesetze</b> (hier das <b>Mutterschutzgesetz</b>) → <b>Tarifvertrag</b> (hier der <b>Manteltarifvertrag</b>) → <b>Betriebsvereinbarung</b> → <b>individueller Arbeitsvertrag</b>. Über dem Grundgesetz steht noch das <b>EU-Recht</b>, unterhalb des Arbeitsvertrags folgen <b>Gewohnheitsrecht</b> bzw. betriebliche Übung und das <b>Direktionsrecht</b> des Arbeitgebers. Der <b>Lohntarifvertrag</b> steht auf derselben Stufe wie der Manteltarifvertrag – beide sind Tarifverträge und unterscheiden sich nur im Inhalt. Entscheidend ist das <b>Günstigkeitsprinzip</b>: Die rangniedrigere Regelung gilt trotzdem, wenn sie für den Arbeitnehmer <mark>günstiger</mark> ist."
        },
        {
          "nr": 2,
          "typ": "auswahl",
          "lernziel": "5.1",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Günstigkeitsprinzip",
          "sachverhalt": [
            "Ein Manteltarifvertrag sieht 28 Urlaubstage vor. Der Arbeitsvertrag einer neu eingestellten Systemadministratorin nennt 32 Urlaubstage."
          ],
          "frage": "Wie viele Urlaubstage stehen ihr zu, und warum?",
          "antworten": [
            "24 Tage – es gilt allein der gesetzliche Mindesturlaub.",
            "28 Tage – der Tarifvertrag steht im Rang über dem Arbeitsvertrag und verdrängt ihn stets.",
            "30 Tage – bei abweichenden Regelungen wird der Mittelwert gebildet.",
            "28 Tage – Abweichungen im Arbeitsvertrag sind nach dem Rangprinzip immer unwirksam.",
            "32 Tage – nach dem Günstigkeitsprinzip gilt die für den Arbeitnehmer günstigere Regelung."
          ],
          "loesung": [5],
          "negativ": false,
          "begruendung": "Richtig ist E. Das <b>Rangprinzip</b> wird durch das <b>Günstigkeitsprinzip</b> durchbrochen: Ein Arbeitsvertrag darf den Arbeitnehmer fast nie <mark>schlechter</mark> stellen als Gesetz oder Tarifvertrag – <mark>besser</mark> stellen darf er ihn sehr wohl. Die 32 Tage gelten also. B und D wenden das Rangprinzip zu starr an und übersehen die Ausnahme; verdrängt würde der Arbeitsvertrag nur, wenn er <b>unter</b> den Tarifstandard ginge. C ist frei erfunden – Mittelwerte bildet das Arbeitsrecht nicht. A ist falsch: Die <b>24 Werktage</b> des <b>§ 3 BUrlG</b> sind nur die gesetzliche Untergrenze, über die Tarif- und Arbeitsvertrag hier deutlich hinausgehen."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "5.1",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Rechtsquellen des Arbeitsrechts",
          "frage": "Welche <b>zwei</b> Aussagen zu den Rechtsquellen des Arbeitsrechts sind richtig?",
          "antworten": [
            "Das BGB regelt in den §§ 611a ff. die Grundlagen des Dienst- und Arbeitsvertrags.",
            "Das Nachweisgesetz verpflichtet den Arbeitgeber, die wesentlichen Arbeitsbedingungen schriftlich festzuhalten und auszuhändigen.",
            "Ein Tarifvertrag kann nur zwischen einzelnem Arbeitgeber und einzelnem Arbeitnehmer geschlossen werden.",
            "Das Grundgesetz enthält keine für das Arbeitsrecht bedeutsamen Regelungen.",
            "Eine Betriebsvereinbarung steht im Rang über dem Tarifvertrag."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die Grundlagen des Arbeitsvertrags stehen in den <b>§§ 611a ff. BGB</b> – Rechte, Pflichten, Kündigung. Das <b>Nachweisgesetz (NachwG)</b> verpflichtet den Arbeitgeber, die <b>wesentlichen Arbeitsbedingungen</b> schriftlich zu dokumentieren und dem Arbeitnehmer auszuhändigen. C ist falsch: Ein <b>Tarifvertrag</b> wird zwischen <b>Gewerkschaft</b> und <b>Arbeitgeber bzw. Arbeitgeberverband</b> geschlossen; die Vereinbarung zwischen Einzelnen ist der Arbeitsvertrag. D ist falsch – <b>Art. 12 GG</b> (Berufsfreiheit) und <b>Art. 9 Abs. 3 GG</b> (Koalitionsfreiheit) stehen an der Spitze der Rangfolge. E kehrt die Rangfolge um: Der <b>Tarifvertrag</b> steht über der <b>Betriebsvereinbarung</b>."
        },
        {
          "nr": 4,
          "typ": "auswahl",
          "lernziel": "5.2",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Die Hauptpflichten",
          "frage": "Welche <b>zwei</b> Hauptpflichten bilden das Austauschverhältnis des Arbeitsvertrags?",
          "antworten": [
            "Der Arbeitnehmer erbringt die versprochene Arbeitsleistung.",
            "Der Arbeitgeber zahlt die vereinbarte Vergütung.",
            "Der Arbeitnehmer schuldet einen bestimmten Arbeitserfolg.",
            "Der Arbeitgeber garantiert einen unbefristeten Arbeitsplatz.",
            "Der Arbeitnehmer trägt das wirtschaftliche Risiko des Betriebs mit."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Der Arbeitsvertrag ist ein <b>gegenseitiger Vertrag</b>: Der Arbeitnehmer schuldet die <b>Arbeitsleistung</b>, der Arbeitgeber die <b>Vergütung</b>. C ist der entscheidende Unterschied zum Werkvertrag: Der Arbeitnehmer schuldet eine <b>Dienstpflicht</b>, <mark>keinen Werkerfolg</mark> – er muss sich bemühen, nicht ein Ergebnis garantieren. D ist falsch, weil befristete Arbeitsverträge nach dem <b>TzBfG</b> zulässig sind. E ist falsch: Das <b>Betriebsrisiko</b> trägt der Arbeitgeber; fällt die Arbeit aus betrieblichen Gründen aus, bleibt der Vergütungsanspruch bestehen."
        },
        {
          "nr": 5,
          "typ": "auswahl",
          "lernziel": "5.2",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Unverzichtbare Pflichtbestandteile",
          "sachverhalt": [
            "Ein Systemhaus stellt einen Netzwerkadministrator ein. Der Arbeitsvertrag nennt Name und Anschrift beider Parteien, das Startdatum und die Vergütung."
          ],
          "frage": "Welche <b>drei</b> weiteren Angaben gehören zu den Pflichtbestandteilen eines Arbeitsvertrags?",
          "antworten": [
            "Arbeitsort",
            "Tätigkeitsbeschreibung",
            "Kündigungsfristen",
            "Name der zuständigen Krankenkasse des Arbeitnehmers",
            "Höhe des letzten Gehalts beim vorherigen Arbeitgeber"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Zu den Pflichtbestandteilen zählen <b>Vertragsparteien</b>, <b>Beginn und Dauer</b> (befristet nach dem <b>TzBfG</b> oder unbefristet), <b>Arbeitsort</b>, <b>Tätigkeitsbeschreibung</b>, <b>Vergütung</b>, <b>Arbeitszeit</b>, <b>Urlaub</b> und <b>Kündigungsfristen</b> (<b>§ 622 BGB</b>). Zwei Hinweise für die Praxis: Je vager die Tätigkeitsbeschreibung, desto weiter reicht das <b>Direktionsrecht</b> des Arbeitgebers; und eine Klausel zu flexiblen Einsatzorten ist für das Homeoffice wichtig. D ist falsch – die Krankenkasse meldet der Arbeitgeber, sie gehört aber nicht in den Vertrag. E ist falsch: Das frühere Gehalt geht den neuen Arbeitgeber nichts an."
        },
        {
          "nr": 6,
          "typ": "auswahl",
          "lernziel": "5.2",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Der Arbeitsvertrag",
          "frage": "Welche Aussage zum Arbeitsvertrag ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Der Arbeitsvertrag ist ein gegenseitiger Vertrag.",
            "Er regelt die Rechte und Pflichten zwischen Arbeitgeber und Arbeitnehmer.",
            "Das Nachweisgesetz verlangt die schriftliche Dokumentation der wesentlichen Bedingungen.",
            "Ohne schriftlichen Arbeitsvertrag kommt kein Arbeitsverhältnis zustande.",
            "Eine Befristung richtet sich nach dem Teilzeit- und Befristungsgesetz."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Ein Arbeitsvertrag kommt auch <b>mündlich</b> wirksam zustande; die Schriftform ist keine Wirksamkeitsvoraussetzung. Das <b>Nachweisgesetz</b> verpflichtet den Arbeitgeber zwar, die wesentlichen Bedingungen schriftlich festzuhalten und auszuhändigen – ein Verstoß macht den Vertrag aber nicht unwirksam, sondern ist eine Ordnungswidrigkeit. Achtung, hier wird oft verwechselt: Für die <b>Befristung</b> und für die <b>Kündigung</b> (<b>§ 623 BGB</b>) ist die Schriftform dagegen zwingend. A, B, C und E stimmen."
        },
        {
          "nr": 7,
          "typ": "zuordnung",
          "lernziel": "5.3",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Kündigungsarten",
          "frage": "Ordnen Sie jedem Fall die Art der ordentlichen Kündigung zu.",
          "optionen": [
            "Betriebsbedingte Kündigung",
            "Personenbedingte Kündigung",
            "Verhaltensbedingte Kündigung"
          ],
          "aussagen": [
            "Ein Standort wird geschlossen, die Stellen fallen ersatzlos weg.",
            "Ein Mitarbeiter ist seit zwei Jahren durchgehend erkrankt und wird dauerhaft arbeitsunfähig bleiben.",
            "Ein Mitarbeiter erscheint trotz zweier Abmahnungen immer wieder absichtlich zu spät.",
            "Die Auftragslage bricht ein, ganze Teams werden abgebaut."
          ],
          "loesung": [1, 2, 3, 1],
          "begruendung": "Die drei Arten unterscheiden sich danach, <mark>wo</mark> der Grund liegt. <b>Betriebsbedingt</b>: Der Grund liegt im <b>Unternehmen</b>, nicht beim Arbeitnehmer – Standortschließung, Auftragseinbruch. Hier muss zusätzlich die <b>Sozialauswahl</b> geprüft werden. <b>Personenbedingt</b>: Der Arbeitnehmer <mark>kann</mark> die Leistung dauerhaft nicht mehr erbringen, ohne dass ihn ein Vorwurf trifft – die lang andauernde Krankheit ist der Standardfall. <b>Verhaltensbedingt</b>: Der Arbeitnehmer <mark>will</mark> nicht richtig handeln – hier ist in aller Regel zuvor eine <b>Abmahnung</b> nötig."
        },
        {
          "nr": 8,
          "typ": "auswahl",
          "lernziel": "5.3",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Außerordentliche Kündigung",
          "sachverhalt": [
            "Ein Mitarbeiter wird beim Diebstahl von Hardware aus dem Lager beobachtet. Die Geschäftsführung erfährt davon am 2. November."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur außerordentlichen Kündigung treffen zu?",
          "antworten": [
            "Es muss ein wichtiger Grund vorliegen, der die Fortsetzung bis zum Fristende unzumutbar macht.",
            "Der Arbeitgeber muss innerhalb von zwei Wochen ab Kenntnis der maßgebenden Tatsachen kündigen.",
            "Eine Abmahnung ist auch bei Diebstahl in jedem Fall zwingend vorgeschaltet.",
            "Die außerordentliche Kündigung muss die Frist des § 622 Abs. 2 BGB einhalten.",
            "Der Arbeitgeber kann sich bis zu sechs Monate Zeit lassen, um den Sachverhalt aufzuklären."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>außerordentliche (fristlose) Kündigung</b> nach <b>§ 626 BGB</b> setzt zweierlei voraus: einen <b>wichtigen Grund</b> und die <b>Unzumutbarkeit</b> der Fortsetzung bis zum Ablauf der Kündigungsfrist. Nach <b>§ 626 Abs. 2 BGB</b> kann sie nur <b>innerhalb von zwei Wochen</b> ab Kenntnis der maßgebenden Tatsachen erklärt werden – hier also bis zum 16. November. C ist falsch: Eine <b>Abmahnung</b> ist zwar oft nötig, bei <b>Diebstahl, Gewalt oder schwerer Beleidigung</b> aber entbehrlich. D ist falsch – „außerordentlich“ heißt gerade <mark>ohne</mark> Frist. E ist falsch und verfehlt die Zwei-Wochen-Frist deutlich."
        },
        {
          "nr": 9,
          "typ": "eingabe",
          "lernziel": "5.3",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Kündigungsfristen Arbeitgeber",
          "sachverhalt": [
            "Eine Fachinformatikerin ist seit dem 1. März 2019 bei einem Systemhaus beschäftigt. Der Arbeitgeber kündigt ordentlich; das schriftliche Kündigungsschreiben geht ihr am 10. November 2026 zu.",
            "Es gelten die gesetzlichen Fristen, eine Probezeit läuft nicht mehr."
          ],
          "frage": "Zu welchem Datum endet das Arbeitsverhältnis frühestens?",
          "art": "datum",
          "loesung": "31.01.2027",
          "begruendung": "<b>Schritt 1 – Betriebszugehörigkeit:</b> vom 1. März 2019 bis zum 10. November 2026 sind es 7 Jahre und gut 8 Monate. <b>Schritt 2 – Frist nach § 622 Abs. 2 BGB:</b> Die Staffel lautet 2 Jahre → 1 Monat, 5 Jahre → 2 Monate, 8 Jahre → 3 Monate. Mit 7 Jahren ist die Stufe „8 Jahre“ noch <mark>nicht</mark> erreicht, es bleibt bei <b>2 Monaten zum Ende eines Kalendermonats</b>. <b>Schritt 3 – Termin:</b> Vom Zugang am 10. November 2026 zwei Monate weiter ist der 10. Januar 2027; beendet werden kann nur zum Monatsende, also zum <b>31.01.2027</b>. <b>Gegenprobe:</b> Für ein Ende am 31. Dezember 2026 hätte die Kündigung bereits bis zum 31. Oktober 2026 zugehen müssen – das war zu spät. Für den 31. Januar 2027 musste sie bis zum 30. November 2026 vorliegen; der 10. November reicht also aus."
        },
        {
          "nr": 10,
          "typ": "auswahl",
          "lernziel": "5.3",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Kündigungsfristen",
          "frage": "Welche Aussage zu den Kündigungsfristen ist <mark>falsch</mark>?",
          "antworten": [
            "Während einer vereinbarten Probezeit von längstens sechs Monaten gilt eine Frist von zwei Wochen.",
            "Für den Arbeitnehmer gilt nach der Probezeit eine Frist von vier Wochen zum 15. oder zum Ende eines Kalendermonats.",
            "Für den Arbeitgeber verlängern sich die Fristen mit zunehmender Betriebszugehörigkeit bis auf sieben Monate.",
            "Vier Wochen sind gleichbedeutend mit einem Monat, die Begriffe können beliebig getauscht werden.",
            "Nach fünf Jahren Betriebszugehörigkeit beträgt die Frist für den Arbeitgeber zwei Monate zum Monatsende."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. <b>4 Wochen sind genau 28 Tage</b> und <mark>nicht</mark> ein Monat; ein Monat kann 28 bis 31 Tage haben. Dieser Unterschied entscheidet in der Prüfung über den Kündigungstermin. A, B, C und E stimmen und geben <b>§ 622 BGB</b> richtig wieder: In der <b>Probezeit</b> (längstens sechs Monate) gilt eine Frist von <b>2 Wochen</b> zu jedem beliebigen Tag (<b>Abs. 3</b>); für den <b>Arbeitnehmer</b> gilt die Grundfrist von <b>4 Wochen zum 15. oder zum Monatsende</b> (<b>Abs. 1</b>); für den <b>Arbeitgeber</b> staffelt <b>Abs. 2</b> die Frist nach Betriebszugehörigkeit von 1 Monat (ab 2 Jahren) bis 7 Monate (ab 20 Jahren), bei 5 Jahren sind es 2 Monate."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "5.3",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Besonderer Kündigungsschutz",
          "frage": "Welche <b>drei</b> Personengruppen genießen besonderen Kündigungsschutz?",
          "antworten": [
            "Schwangere und Mütter nach der Entbindung",
            "Schwerbehinderte Menschen",
            "Mitglieder des Betriebsrats und der Jugend- und Auszubildendenvertretung",
            "Alle Arbeitnehmer mit mehr als zehn Jahren Betriebszugehörigkeit",
            "Alle Arbeitnehmer ab einem Jahresgehalt von 60.000 €"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Zum <b>besonderen Kündigungsschutz</b> zählen <b>Schwangere und Mütter</b>, <b>schwerbehinderte Menschen</b>, <b>Betriebsratsmitglieder und Jugendvertretungen</b>, Beschäftigte in <b>Elternzeit</b>, <b>Auszubildende und Umschüler</b>, Personen im <b>freiwilligen Wehrdienst</b> sowie Beschäftigte in <b>Pflegezeit oder Familienpflegezeit</b>. D und E sind erfunden: Lange Betriebszugehörigkeit verlängert zwar die <b>Kündigungsfrist</b> nach <b>§ 622 Abs. 2 BGB</b> und wirkt sich auf die <b>Sozialauswahl</b> aus, begründet aber keinen besonderen Kündigungsschutz – und die Höhe des Gehalts spielt überhaupt keine Rolle."
        },
        {
          "nr": 12,
          "typ": "auswahl",
          "lernziel": "5.3",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Sozialauswahl",
          "sachverhalt": [
            "Ein Systemhaus muss aus wirtschaftlichen Gründen drei von zwölf Stellen im First-Level-Support streichen. Alle zwölf Beschäftigten sind fachlich vergleichbar."
          ],
          "frage": "Welche <b>vier</b> Kriterien sind bei der Sozialauswahl zu berücksichtigen?",
          "antworten": [
            "Lebensalter",
            "Dauer der Betriebszugehörigkeit",
            "Unterhaltspflichten",
            "Schwerbehinderung",
            "Höhe des bisherigen Gehalts"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Bei der <b>betriebsbedingten Kündigung</b> muss der Arbeitgeber eine <b>Sozialauswahl</b> treffen und dabei <b>Lebensalter</b>, <b>Dauer der Betriebszugehörigkeit</b>, <b>Unterhaltspflichten</b> und <b>Schwerbehinderung</b> berücksichtigen (<b>§ 1 Abs. 3 KSchG</b>). Gekündigt wird demjenigen, den die Kündigung am wenigsten hart trifft. E ist falsch: Die <b>Gehaltshöhe</b> ist ausdrücklich <mark>kein</mark> Auswahlkriterium – sonst könnte der Arbeitgeber die Sozialauswahl dazu nutzen, gezielt teure Mitarbeiter loszuwerden."
        },
        {
          "nr": 13,
          "typ": "auswahl",
          "lernziel": "5.4",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Arbeitszeugnisse",
          "frage": "Welche <b>zwei</b> Angaben enthält das qualifizierte Arbeitszeugnis zusätzlich zum einfachen?",
          "antworten": [
            "Leistung",
            "Verhalten",
            "Art der Tätigkeit",
            "Dauer der Beschäftigung",
            "Grund der Beendigung des Arbeitsverhältnisses"
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Das <b>einfache Arbeitszeugnis</b> nennt nur die <b>Art der Tätigkeit</b>, die <b>Dauer</b> und den <b>Ort der Beschäftigung</b> – es bewertet nicht. Das <b>qualifizierte Arbeitszeugnis</b> kommt um <b>Leistung</b> und <b>Verhalten</b> hinzu. C und D stehen bereits im einfachen Zeugnis und sind deshalb keine Zusatzangaben. E ist falsch: Der <b>Beendigungsgrund</b> gehört nur dann hinein, wenn der Arbeitnehmer es ausdrücklich wünscht – ungefragt darf er nicht genannt werden. Arbeitnehmer haben auf Verlangen Anspruch auf ein <b>qualifiziertes</b> Zeugnis."
        },
        {
          "nr": 14,
          "typ": "zuordnung",
          "lernziel": "5.4",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Zeugnissprache",
          "frage": "Ordnen Sie jeder Formulierung der Zeugnissprache die Note zu.",
          "optionen": [
            "sehr gut",
            "gut",
            "befriedigend",
            "ausreichend"
          ],
          "aussagen": [
            "… stets zu unserer vollsten Zufriedenheit",
            "… stets zu unserer vollen Zufriedenheit",
            "… zu unserer vollen Zufriedenheit",
            "… zu unserer Zufriedenheit"
          ],
          "loesung": [1, 2, 3, 4],
          "begruendung": "Die <b>Zeugnissprache</b> folgt einem festen Code, bei dem zwei Wörter über eine ganze Note entscheiden. <b>„stets“</b> steht für Dauerhaftigkeit, <b>„vollste“</b> bzw. <b>„volle“</b> für den Grad der Zufriedenheit: stets + vollste = <b>sehr gut</b>, stets + volle = <b>gut</b>, nur volle = <b>befriedigend</b>, nur Zufriedenheit = <b>ausreichend</b>. Hintergrund: Das Zeugnis muss <b>wohlwollend</b> formuliert sein und darf keine offen negativen Aussagen enthalten – zugleich muss es <b>wahr</b> sein. Deshalb wird Kritik durch Weglassen ausgedrückt."
        },
        {
          "nr": 15,
          "typ": "zuordnung",
          "lernziel": "5.5",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Sozial- und Arbeitsgerichtsbarkeit",
          "frage": "Ordnen Sie jeden Streitfall dem zuständigen Gericht zu.",
          "optionen": [
            "Arbeitsgericht",
            "Sozialgericht"
          ],
          "aussagen": [
            "Streit über die Wirksamkeit einer Kündigung",
            "Streit mit der Krankenkasse über das Krankengeld",
            "Streit über eine Abmahnung in der Personalakte",
            "Streit mit der Agentur für Arbeit über das Arbeitslosengeld",
            "Streit über den Inhalt eines Arbeitszeugnisses",
            "Streit über die Einstufung in einen Pflegegrad"
          ],
          "loesung": [1, 2, 1, 2, 1, 2],
          "begruendung": "Die Abgrenzung ist einfach, wenn man auf den <mark>Gegner</mark> schaut. Das <b>Arbeitsgericht</b> entscheidet Streitigkeiten zwischen <b>Arbeitnehmer und Arbeitgeber</b> – Kündigung, Lohn, Zeugnis, Abmahnung. Das <b>Sozialgericht</b> entscheidet Streitigkeiten mit <b>Sozialversicherungsträgern und Behörden</b> – Krankengeld, Rente, Arbeitslosengeld, Pflegegrad. Merksatz aus den Unterlagen: <b>Arbeitsgericht = Arbeitsvertrag, Sozialgericht = Sozialleistungen.</b>"
        },
        {
          "nr": 16,
          "typ": "auswahl",
          "lernziel": "5.5",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Instanzen",
          "frage": "Wie verläuft der Instanzenzug in der Arbeitsgerichtsbarkeit?",
          "antworten": [
            "Amtsgericht → Landgericht → Bundesgerichtshof",
            "Arbeitsgericht → Landesarbeitsgericht → Bundesarbeitsgericht",
            "Arbeitsgericht → Oberlandesgericht → Bundesverfassungsgericht",
            "Sozialgericht → Landesarbeitsgericht → Bundesarbeitsgericht",
            "Arbeitsgericht → Bundesarbeitsgericht, eine zweite Instanz gibt es nicht"
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Die <b>Arbeitsgerichtsbarkeit</b> hat drei Instanzen: <b>Arbeitsgericht</b> → <b>Landesarbeitsgericht</b> → <b>Bundesarbeitsgericht</b>. Parallel dazu verläuft die <b>Sozialgerichtsbarkeit</b>: <b>Sozialgericht</b> → <b>Landessozialgericht</b> → <b>Bundessozialgericht</b>. A beschreibt die ordentliche Gerichtsbarkeit für Zivilsachen. C mischt zwei Gerichtszweige – das <b>Bundesverfassungsgericht</b> ist keine Rechtsmittelinstanz, sondern prüft Verfassungsverstöße. D springt von einem Gerichtszweig in den anderen. E unterschlägt die Berufungsinstanz."
        },
        {
          "nr": 17,
          "typ": "auswahl",
          "lernziel": "5.6",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Personalbeschaffung Vor- und Nachteile",
          "sachverhalt": [
            "In einem Systemhaus wird die Stelle der Teamleitung frei. Die Geschäftsführung überlegt, ob sie intern befördert oder extern ausschreibt."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur Personalbeschaffung treffen zu?",
          "antworten": [
            "Die interne Besetzung ist schneller, kostengünstiger und wirkt motivierend auf die Belegschaft.",
            "Die externe Besetzung bringt neues Know-how und bietet eine größere Auswahl.",
            "Die interne Besetzung bringt neue Impulse von außen und verhindert Betriebsblindheit.",
            "Die externe Besetzung ist immer kostengünstiger, weil keine Einarbeitung nötig ist.",
            "Bei der internen Besetzung entsteht keine neue Lücke im Unternehmen."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. <b>Intern</b> ist <b>schnell</b>, <b>motivierend</b>, <b>kostengünstig</b> und mit <b>geringem Fehlbesetzungsrisiko</b> verbunden, weil man den Menschen kennt. <b>Extern</b> bringt <b>neues Know-how und frischen Wind</b>, eine <b>größere Auswahl</b> und vermeidet Neid im bestehenden Team. C vertauscht die Vorteile – neue Impulse von außen sind gerade der Vorteil der <mark>externen</mark> Besetzung, intern droht umgekehrt <b>Betriebsblindheit</b>. D ist falsch: Extern entstehen <b>hohe Kosten</b> für Anzeigen und Vermittler sowie ein hoher Zeitaufwand. E ist falsch – bei interner Besetzung entsteht eine <mark>neue Lücke</mark> im alten Team."
        },
        {
          "nr": 18,
          "typ": "reihenfolge",
          "lernziel": "5.6",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Personalbeschaffung: Ein strukturierter Prozess",
          "frage": "Bringen Sie die Schritte der Personalbeschaffung in die richtige Reihenfolge.",
          "schritte": [
            "Personalauswahl: Bewerbungen sichten, Auswahlverfahren und Vorstellungsgespräche durchführen.",
            "Planung: den Personalbedarf ermitteln.",
            "Einstellung: Vertrag unterzeichnen und Onboarding durchführen.",
            "Stellenausschreibung veröffentlichen.",
            "Vertragsverhandlung führen."
          ],
          "loesung": [3, 1, 5, 2, 4],
          "begruendung": "Der Ablauf lautet: <b>Personalbedarf ermitteln</b> → <b>Stellenausschreibung</b> → <b>Personalauswahl</b> → <b>Vertragsverhandlung</b> → <b>Einstellung mit Onboarding</b>. Zwei rechtliche Rahmenbedingungen begleiten den Prozess: Die Ausschreibung muss nach dem <b>AGG</b> <mark>diskriminierungsfrei</mark> sein, und wenn ein <b>Betriebsrat</b> besteht, hat er bei der Einstellung ein Mitbestimmungsrecht nach <b>§ 99 BetrVG</b>."
        },
        {
          "nr": 19,
          "typ": "auswahl",
          "lernziel": "5.6",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Vorstellungsgespräch: Das Fragerecht",
          "sachverhalt": [
            "In einem Vorstellungsgespräch für eine Stelle im IT-Support stellt die Personalleiterin mehrere Fragen."
          ],
          "frage": "Welche <b>zwei</b> Fragen sind <mark>unzulässig</mark>?",
          "antworten": [
            "„Sind Sie schwanger oder planen Sie demnächst Kinder?“",
            "„Gehören Sie einer Gewerkschaft an?“",
            "„Sind Sie bereit, gelegentlich Überstunden zu leisten?“",
            "„Welche Gehaltsvorstellung haben Sie?“",
            "„Welche Zertifizierungen haben Sie im Netzwerkbereich erworben?“"
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Unzulässig sind A und B. Zur geschützten Privatsphäre gehören <b>Schwangerschaft und Kinderwunsch</b>, <b>Religion</b>, <b>Herkunft</b>, <b>Privatleben</b>, <b>sexuelle Orientierung und Heiratspläne</b>, <b>Parteizugehörigkeit</b> sowie die Mitgliedschaft in <b>Gewerkschaft oder Betriebsrat</b>. Auf unzulässige Fragen besteht das <b>Recht zur Lüge</b>: Die Antwort darf falsch sein, ohne dass daraus später Nachteile folgen – das schützt auch <b>§ 1 AGG</b> ab. C, D und E sind zulässig und müssen <b>wahrheitsgemäß</b> beantwortet werden; dazu zählen außerdem Qualifikation und Werdegang, Verfügbarkeit, Motivation, Stärken und Schwächen sowie gesundheitliche Einschränkungen, die die <mark>konkrete</mark> Tätigkeit dauerhaft unmöglich machen."
        },
        {
          "nr": 20,
          "typ": "auswahl",
          "lernziel": "5.7",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Arten und Funktionen von Tarifverträgen",
          "frage": "Welche Aussage zu den Arten von Tarifverträgen ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Der Manteltarifvertrag regelt allgemeine Arbeitsbedingungen wie Arbeitszeit, Urlaub und Zuschläge.",
            "Der Lohntarifvertrag regelt Entgelt und Vergütung.",
            "Beide werden zwischen Gewerkschaft und Arbeitgeber bzw. Arbeitgeberverband geschlossen.",
            "Der Manteltarifvertrag läuft in der Regel länger als der Lohntarifvertrag.",
            "Der Manteltarifvertrag wird vom Betriebsrat geschlossen, der Lohntarifvertrag von der Gewerkschaft."
          ],
          "loesung": [5],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist E. <mark>Beide</mark> Tarifverträge schließen <b>Gewerkschaft</b> und <b>Arbeitgeber bzw. Arbeitgeberverband</b>. Der <b>Betriebsrat</b> schließt keine Tarifverträge, sondern <b>Betriebsvereinbarungen</b> – das ist die häufigste Verwechslung in diesem Themenblock. A, B, C und D stimmen: Der <b>Manteltarifvertrag</b> regelt die <b>allgemeinen Arbeitsbedingungen</b> – Arbeitszeit, Urlaub, Zuschläge, Kündigungsfristen – und läuft meist über mehrere Jahre; der <b>Lohntarifvertrag</b> regelt <b>Entgelt und Vergütung</b> und wird häufiger neu verhandelt."
        },
        {
          "nr": 21,
          "typ": "auswahl",
          "lernziel": "5.7",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Drei Hauptfunktionen",
          "frage": "Welche <b>drei</b> Hauptfunktionen erfüllt ein Tarifvertrag?",
          "antworten": [
            "Schutzfunktion",
            "Ordnungsfunktion",
            "Friedensfunktion",
            "Kontrollfunktion",
            "Finanzierungsfunktion"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Die <b>Schutzfunktion</b> sichert Mindestbedingungen, hinter die der einzelne Arbeitsvertrag nicht zurückfallen darf. Die <b>Ordnungsfunktion</b> schafft einheitliche Regeln für eine ganze Branche und entlastet damit die einzelne Verhandlung. Die <b>Friedensfunktion</b> bedeutet, dass während der Laufzeit des Tarifvertrags über die geregelten Gegenstände nicht gestreikt werden darf – die sogenannte <b>Friedenspflicht</b>. D und E sind erfunden: Die Einhaltung von Tarifverträgen überwacht der <b>Betriebsrat</b> (<b>§ 80 BetrVG</b>), und finanziert wird über Tarifverträge nichts."
        },
        {
          "nr": 22,
          "typ": "auswahl",
          "lernziel": "5.7",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Tarifbindung",
          "sachverhalt": [
            "Ein IT-Dienstleister ist Mitglied im Arbeitgeberverband. Ein neu eingestellter Mitarbeiter ist nicht Mitglied der Gewerkschaft."
          ],
          "frage": "Welche Aussage zur Tarifbindung ist richtig?",
          "antworten": [
            "Der Tarifvertrag gilt nie, solange auch nur eine Seite nicht Mitglied ist – eine Bezugnahme ist unzulässig.",
            "Der Tarifvertrag gilt automatisch für alle Beschäftigten der Branche, unabhängig von einer Mitgliedschaft.",
            "Der Tarifvertrag gilt unmittelbar nur, wenn beide Seiten tarifgebunden sind – der Arbeitsvertrag kann ihn aber in Bezug nehmen.",
            "Der Mitarbeiter muss der Gewerkschaft beitreten, sobald der Arbeitgeber im Verband ist.",
            "Die Tarifbindung des Arbeitgebers endet automatisch mit jeder Neueinstellung."
          ],
          "loesung": [3],
          "negativ": false,
          "begruendung": "Richtig ist C. Ein Tarifvertrag gilt <b>unmittelbar</b>, wenn <mark>beide</mark> Seiten tarifgebunden sind: der Arbeitgeber über die Verbandsmitgliedschaft, der Arbeitnehmer über die Gewerkschaftsmitgliedschaft. Fehlt eine Seite, ist der Tarifvertrag in der Praxis trotzdem meist maßgeblich, weil der <b>Arbeitsvertrag</b> ausdrücklich auf ihn <b>Bezug nimmt</b> – oder weil er für <b>allgemeinverbindlich</b> erklärt wurde. B gilt nur im Fall der Allgemeinverbindlicherklärung, nicht generell. A ist falsch, weil die vertragliche Bezugnahme der Normalfall ist. D ist falsch: Die <b>Koalitionsfreiheit</b> nach <b>Art. 9 Abs. 3 GG</b> schützt auch das Recht, <mark>nicht</mark> beizutreten. E ist frei erfunden."
        },
        {
          "nr": 23,
          "typ": "auswahl",
          "lernziel": "5.8",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Fürsorgepflicht und Verschwiegenheitspflicht",
          "frage": "Welche <b>zwei</b> Aussagen zu Fürsorge- und Verschwiegenheitspflicht treffen zu?",
          "antworten": [
            "Die Fürsorgepflicht verpflichtet den Arbeitgeber, Interessen, Gesundheit und Würde der Arbeitnehmer zu schützen.",
            "Die Verschwiegenheitspflicht verpflichtet den Arbeitnehmer, Betriebs- und Geschäftsgeheimnisse geheim zu halten.",
            "Die Fürsorgepflicht trifft den Arbeitnehmer gegenüber dem Arbeitgeber.",
            "Die Verschwiegenheitspflicht endet mit dem letzten Arbeitstag vollständig.",
            "Datenschutz gehört nicht zur Fürsorgepflicht, weil er allein die Aufgabe des Datenschutzbeauftragten ist."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>Fürsorgepflicht</b> ist die Pflicht des <b>Arbeitgebers</b>, Interessen, Gesundheit und Würde seiner Arbeitnehmer zu schützen; sie hat vier Dimensionen: <b>Gesundheitsschutz und Arbeitssicherheit</b>, <b>Schutz der Persönlichkeitsrechte und Würde</b>, <b>Vermögensschutz</b> und <b>Datenschutz</b>. Die <b>Verschwiegenheitspflicht</b> ist ihr Gegenstück auf Seiten des <b>Arbeitnehmers</b> und Teil der allgemeinen <b>Treuepflicht</b>. C vertauscht die Beteiligten. D ist falsch: Echte Geschäftsgeheimnisse sind auch nach dem Ende des Arbeitsverhältnisses zu wahren. E ist falsch – der <b>Datenschutz</b> ist ausdrücklich eine der vier Dimensionen der Fürsorgepflicht; der Datenschutzbeauftragte berät und überwacht nur."
        },
        {
          "nr": 24,
          "typ": "auswahl",
          "lernziel": "5.8",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Lohnfortzahlung bei Krankheit",
          "sachverhalt": [
            "Ein Mitarbeiter ist seit drei Wochen im Unternehmen beschäftigt und erkrankt unverschuldet."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur Entgeltfortzahlung treffen zu?",
          "antworten": [
            "Ein Anspruch besteht noch nicht – das Arbeitsverhältnis muss zuvor vier Wochen ununterbrochen bestanden haben.",
            "Nach Ablauf der Wartezeit zahlt der Arbeitgeber bis zu sechs Wochen das Entgelt weiter.",
            "Der Anspruch besteht vom ersten Tag des Arbeitsverhältnisses an.",
            "Der Arbeitgeber zahlt bis zu zwölf Wochen, danach übernimmt die Krankenkasse.",
            "Der Anspruch besteht auch bei selbst verschuldeter Arbeitsunfähigkeit."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach dem <b>Entgeltfortzahlungsgesetz</b> entsteht der Anspruch erst nach <b>vierwöchiger ununterbrochener Dauer des Arbeitsverhältnisses</b> (<b>§ 3 Abs. 3 EFZG</b>) – mit drei Wochen ist diese <b>Wartezeit</b> noch nicht erfüllt. Danach zahlt der Arbeitgeber bis zu <b>6 Wochen</b> weiter (<b>§ 3 Abs. 1 EFZG</b>), anschließend zahlt die Krankenkasse <b>Krankengeld</b>. C übersieht die Wartezeit. D nennt eine falsche Dauer. E ist falsch: Der Anspruch besteht nur bei <mark>unverschuldeter</mark> Arbeitsunfähigkeit; ebenfalls gefährdet ist er bei <b>verspäteter Krankmeldung</b> – die Meldung muss <b>unverzüglich</b> erfolgen."
        },
        {
          "nr": 25,
          "typ": "auswahl",
          "lernziel": "5.8",
          "zusatz": false,
          "fundstelle": "Folien „Rechte von Beschäftigten“ – Arbeitsunfähigkeitsbescheinigung",
          "frage": "Welche Aussage zur Arbeitsunfähigkeitsbescheinigung ist <mark>falsch</mark>?",
          "antworten": [
            "Dauert die Arbeitsunfähigkeit länger als drei Kalendertage, muss spätestens am darauffolgenden Arbeitstag eine Bescheinigung vorliegen.",
            "Der Arbeitgeber darf die Vorlage auch schon früher verlangen.",
            "Die Arbeitsunfähigkeit selbst ist dem Arbeitgeber unverzüglich anzuzeigen.",
            "Der Arbeitgeber darf eine Bescheinigung frühestens ab dem siebten Krankheitstag verlangen.",
            "Ohne rechtzeitige Krankmeldung kann der Anspruch auf Entgeltfortzahlung gefährdet sein."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Der Arbeitgeber darf die Vorlage der <b>Arbeitsunfähigkeitsbescheinigung</b> jederzeit <mark>früher</mark> verlangen, sogar ab dem ersten Krankheitstag (<b>§ 5 Abs. 1 EFZG</b>) – eine Sieben-Tage-Grenze gibt es nicht. A, B, C und E stimmen: Gesetzlich muss die Bescheinigung vorliegen, wenn die Arbeitsunfähigkeit <b>länger als drei Kalendertage</b> dauert, und zwar spätestens am darauffolgenden Arbeitstag – praktisch also ab dem vierten Krankheitstag. Die <b>Anzeige</b> der Erkrankung selbst hat <b>unverzüglich</b> zu erfolgen, sonst gerät der Anspruch auf Entgeltfortzahlung in Gefahr."
        },
        {
          "nr": 26,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen behandeln Kündigungsarten und Fristen, aber nicht die zwingende Schriftform – eine per Messenger ausgesprochene Kündigung ist ein Dauerbrenner in Prüfungen.",
          "sachverhalt": [
            "Ein Arbeitgeber schickt seinem Mitarbeiter eine Kündigung per WhatsApp, später noch einmal als PDF im Anhang einer E-Mail."
          ],
          "frage": "Zusatzwissen: Wie ist die Kündigung zu bewerten?",
          "antworten": [
            "Die Form spielt keine Rolle, solange die Kündigungsfrist eingehalten wird.",
            "Die Kündigung per E-Mail ist wirksam, weil das PDF die Unterschrift abbildet.",
            "Beide Kündigungen sind wirksam, weil der Mitarbeiter sie tatsächlich erhalten hat.",
            "Die Kündigung per WhatsApp ist wirksam, wenn der Mitarbeiter mit einem Haken bestätigt.",
            "Beide Kündigungen sind unwirksam – die Kündigung bedarf der Schriftform, die elektronische Form ist ausgeschlossen."
          ],
          "loesung": [5],
          "negativ": false,
          "begruendung": "Richtig ist E. <b>§ 623 BGB</b> ist eindeutig: „Die Beendigung von Arbeitsverhältnissen durch Kündigung oder Auflösungsvertrag bedürfen zu ihrer Wirksamkeit der <b>Schriftform</b>; die <b>elektronische Form ist ausgeschlossen</b>.“ Nötig ist ein <mark>eigenhändig unterschriebenes Papier</mark> im Original. B ist falsch – ein eingescanntes oder abgebildetes Unterschriftsbild genügt nicht. C und D sind falsch, weil der tatsächliche Zugang den Formmangel nicht heilt. A ist falsch: Fehlt die Form, ist die Kündigung <b>von Anfang an unwirksam</b>, unabhängig von der Frist. Dasselbe Formerfordernis gilt übrigens auch für den <b>Aufhebungsvertrag</b>."
        },
        {
          "nr": 27,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen nur den besonderen Kündigungsschutz – der allgemeine Kündigungsschutz nach dem KSchG mit seiner Drei-Wochen-Frist fehlt und ist prüfungsrelevant.",
          "frage": "Zusatzwissen: Welche <b>zwei</b> Aussagen zum Kündigungsschutzgesetz sind richtig?",
          "antworten": [
            "Eine Kündigungsschutzklage muss innerhalb von drei Wochen nach Zugang der schriftlichen Kündigung beim Arbeitsgericht eingehen.",
            "Der allgemeine Kündigungsschutz greift erst, wenn das Arbeitsverhältnis länger als sechs Monate bestanden hat.",
            "Die Klagefrist beträgt sechs Monate ab Zugang der Kündigung.",
            "Das Kündigungsschutzgesetz gilt in jedem Betrieb, unabhängig von der Beschäftigtenzahl.",
            "Wird die Frist versäumt, kann der Arbeitnehmer die Unwirksamkeit später jederzeit noch geltend machen."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach <b>§ 4 KSchG</b> muss die <b>Kündigungsschutzklage</b> <mark>innerhalb von drei Wochen</mark> nach Zugang der schriftlichen Kündigung beim Arbeitsgericht eingehen. Der allgemeine Kündigungsschutz setzt nach <b>§ 1 Abs. 1 KSchG</b> voraus, dass das Arbeitsverhältnis <b>länger als sechs Monate</b> bestanden hat (<b>Wartezeit</b>). C nennt eine falsche Frist. D ist falsch: Nach <b>§ 23 KSchG</b> gilt das Gesetz nicht in <b>Kleinbetrieben</b> – für seit 2004 eingestellte Arbeitnehmer erst ab mehr als zehn Beschäftigten. E ist falsch und gefährlich: Nach <b>§ 7 KSchG</b> gilt die Kündigung nach Fristablauf als <b>von Anfang an rechtswirksam</b>."
        },
        {
          "nr": 28,
          "typ": "eingabe",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Der Urlaub wird in den Unterlagen nur als Vertragsbestandteil genannt – der gesetzliche Mindesturlaub und seine Umrechnung auf die Fünf-Tage-Woche werden in der Prüfung gerechnet.",
          "sachverhalt": [
            "Ein Auszubildender über 18 Jahre arbeitet in einer Fünf-Tage-Woche. Sein Vertrag enthält keine Urlaubsregelung, ein Tarifvertrag gilt nicht."
          ],
          "frage": "Zusatzwissen: Wie viele Arbeitstage gesetzlichen Mindesturlaub hat er pro Jahr?",
          "art": "zahl",
          "einheit": "Arbeitstage",
          "loesung": 20,
          "toleranz": 0.01,
          "begruendung": "<b>§ 3 Abs. 1 BUrlG</b> nennt <b>24 Werktage</b> im Jahr. <b>Werktage</b> sind alle Kalendertage außer Sonn- und gesetzlichen Feiertagen – das Gesetz rechnet also mit einer <b>Sechs-Tage-Woche</b>. <b>Rechenweg:</b> 24 Werktage ÷ 6 Tage × 5 Tage = <b>20 Arbeitstage</b>. <b>Gegenprobe:</b> 20 Arbeitstage ÷ 5 × 6 = 24 Werktage – beides entspricht vier Urlaubswochen. Zwei Punkte zum Merken: Der <b>volle</b> Urlaubsanspruch entsteht erst nach <b>sechsmonatigem</b> Bestehen des Arbeitsverhältnisses (<b>§ 4 BUrlG</b>), und eine Übertragung ins Folgejahr ist nur bei dringenden Gründen möglich und muss bis zum <b>31. März</b> genommen sein (<b>§ 7 Abs. 3 BUrlG</b>)."
        },
        {
          "nr": 29,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen die Arbeitszeit nur als Vertragsbestandteil – die Grenzen des Arbeitszeitgesetzes gehören zum Pflichtstoff der WiSo-Prüfung.",
          "frage": "Zusatzwissen: Welche <b>drei</b> Aussagen zum Arbeitszeitgesetz sind richtig?",
          "antworten": [
            "Die werktägliche Arbeitszeit darf acht Stunden nicht überschreiten.",
            "Sie kann auf zehn Stunden verlängert werden, wenn im Ausgleichszeitraum im Schnitt acht Stunden nicht überschritten werden.",
            "Nach Beendigung der täglichen Arbeitszeit ist eine ununterbrochene Ruhezeit von mindestens elf Stunden einzuhalten.",
            "Bei mehr als sechs bis zu neun Stunden Arbeitszeit genügt eine Ruhepause von 15 Minuten.",
            "Die Ruhezeit zwischen zwei Arbeitstagen beträgt mindestens acht Stunden."
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Nach <b>§ 3 ArbZG</b> darf die werktägliche Arbeitszeit <b>8 Stunden</b> nicht überschreiten; eine Verlängerung auf <b>10 Stunden</b> ist zulässig, wenn im Durchschnitt von <b>6 Kalendermonaten oder 24 Wochen</b> acht Stunden werktäglich nicht überschritten werden. <b>§ 5 ArbZG</b> verlangt eine ununterbrochene <b>Ruhezeit von mindestens 11 Stunden</b>. D ist falsch: Nach <b>§ 4 ArbZG</b> sind bei mehr als sechs bis zu neun Stunden <b>mindestens 30 Minuten</b> Pause vorgeschrieben, bei mehr als neun Stunden <b>45 Minuten</b>; die Pause darf nur in Abschnitte von je mindestens 15 Minuten geteilt werden. E nennt eine zu kurze Ruhezeit."
        },
        {
          "nr": 30,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Mindestlohn und Minijob-Grenze ändern sich jährlich und kommen in praxisbezogenen Prüfungsaufgaben zur Entgeltabrechnung regelmäßig vor.",
          "frage": "Zusatzwissen (Stand 2026): Welche <b>zwei</b> Aussagen zu Mindestlohn und Minijob sind richtig?",
          "antworten": [
            "Der gesetzliche Mindestlohn beträgt seit dem 1. Januar 2026 13,90 € je Zeitstunde.",
            "Die Minijob-Grenze liegt 2026 bei 603 € im Monat.",
            "Der Mindestlohn wird jedes Jahr vom Bundestag neu beschlossen.",
            "Die Minijob-Grenze ist seit ihrer Einführung unverändert bei 450 € geblieben.",
            "Auszubildende haben Anspruch auf den gesetzlichen Mindestlohn."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Seit dem <b>1. Januar 2026</b> beträgt der <b>gesetzliche Mindestlohn 13,90 €</b> je Zeitstunde (2025: 12,82 €); zum 1. Januar 2027 steigt er auf 14,60 €. Die <b>Minijob-Grenze</b> ist seit 2022 dynamisch an den Mindestlohn gekoppelt und liegt 2026 bei <b>603 €</b> im Monat – rechnerisch 13,90 € × 130 ÷ 3, aufgerundet. C ist falsch: Die Anpassung schlägt die <b>Mindestlohnkommission</b> vor, die Bundesregierung setzt sie per Verordnung um. D ist falsch, weil die Grenze von 450 € über 538 € und 556 € auf 603 € gestiegen ist. E ist falsch: <b>Auszubildende</b> sind vom Mindestlohngesetz ausgenommen – für sie gilt die <b>Mindestausbildungsvergütung</b> nach dem BBiG."
        }
      ]
    },
    {
      "nr": 6,
      "titel": "Die Berufsausbildung",
      "bereich": "Duales System, BBiG, Rechte und Pflichten",
      "fragen": [
        {
          "nr": 1,
          "typ": "auswahl",
          "lernziel": "6.1",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 1",
          "frage": "Welche <b>zwei</b> Lernorte hat die duale Ausbildung?",
          "antworten": [
            "Der Ausbildungsbetrieb",
            "Die Berufsschule",
            "Die Industrie- und Handelskammer",
            "Die Agentur für Arbeit",
            "Die Hochschule"
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die <b>duale Ausbildung</b> findet an genau zwei Lernorten statt: im <b>Ausbildungsbetrieb</b> und in der <b>Berufsschule</b>. C ist falsch: Die <b>IHK</b> ist keine Ausbildungsstätte, sondern die <b>zuständige Stelle</b> nach dem BBiG – sie führt das Verzeichnis der Ausbildungsverhältnisse, überwacht die Ausbildung und nimmt die Prüfungen ab. D ist falsch, weil die Agentur für Arbeit vermittelt und fördert, aber nicht ausbildet. E gehört zum akademischen Bildungsweg und ist kein Lernort der dualen Ausbildung."
        },
        {
          "nr": 2,
          "typ": "auswahl",
          "lernziel": "6.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 2",
          "frage": "Welche rechtlichen Vorschriften gelten an den beiden Lernorten? Welche <b>zwei</b> Aussagen treffen zu?",
          "antworten": [
            "Im Betrieb gilt das Berufsbildungsgesetz (BBiG).",
            "In der Berufsschule gilt das Schulgesetz des jeweiligen Bundeslandes.",
            "Im Betrieb gilt das Schulgesetz des jeweiligen Bundeslandes.",
            "In der Berufsschule gilt das Berufsbildungsgesetz (BBiG).",
            "An beiden Lernorten gilt ausschließlich der Berufsausbildungsvertrag."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Im <b>Betrieb</b> gilt das <b>Berufsbildungsgesetz (BBiG)</b> als Bundesrecht; die Aufsicht führt die <b>zuständige Stelle</b>, bei Fachinformatikern also die <b>IHK</b>. In der <b>Berufsschule</b> gilt das <b>Schulgesetz des Bundeslandes</b>; die Aufsicht führen Schulleitung und Schulaufsichtsbehörde. C und D vertauschen beide Rechtskreise. E ist falsch: Der <b>Berufsausbildungsvertrag</b> ist ein privatrechtlicher Vertrag zwischen Betrieb und Auszubildendem – er gilt zusätzlich, ersetzt aber keines der beiden Gesetze."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "6.1",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 3",
          "frage": "Warum nennt man das System dual?",
          "antworten": [
            "Weil die Ausbildung aus zwei Prüfungsteilen besteht.",
            "Weil die Ausbildung an zwei Lernorten gleichzeitig stattfindet und dadurch Praxis und Theorie verbunden werden.",
            "Weil zwei Verträge geschlossen werden: einer mit dem Betrieb und einer mit der Schule.",
            "Weil sowohl der Bund als auch die Länder Ausbildungsvergütung zahlen.",
            "Weil die Ausbildung in zwei Abschnitte von je anderthalb Jahren geteilt ist."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Das System heißt <b>dual</b>, weil die Berufsausbildung an <mark>zwei Lernorten gleichzeitig</mark> stattfindet: Im <b>Ausbildungsbetrieb</b> werden praktische berufliche Fähigkeiten vermittelt, in der <b>Berufsschule</b> theoretische Kenntnisse – beides zusammen ergibt die vollständige Ausbildung. A ist falsch: Die <b>gestreckte Abschlussprüfung</b> in zwei Teilen gibt es zwar, sie ist aber nicht der Grund für den Namen. C ist falsch – mit der Schule wird kein Vertrag geschlossen, der Schulbesuch beruht auf der Schulpflicht. D ist falsch: Die <b>Ausbildungsvergütung</b> zahlt allein der Ausbildungsbetrieb. E beschreibt keine Eigenschaft des dualen Systems."
        },
        {
          "nr": 4,
          "typ": "auswahl",
          "lernziel": "6.5",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 4",
          "sachverhalt": [
            "Ein Auszubildender erscheint seit Wochen nicht mehr zum Berufsschulunterricht."
          ],
          "frage": "Welche Pflicht verletzt er?",
          "antworten": [
            "Die Pflicht zur pfleglichen Behandlung der Ausbildungsmittel.",
            "Die Verschwiegenheitspflicht gegenüber dem Ausbildungsbetrieb.",
            "Die Pflicht zur Teilnahme an Ausbildungsmaßnahmen, zu der auch der Berufsschulunterricht gehört.",
            "Die Benachrichtigungspflicht gegenüber der Industrie- und Handelskammer.",
            "Er verletzt keine Pflicht, weil der Berufsschulbesuch freiwillig ist."
          ],
          "loesung": [3],
          "negativ": false,
          "begruendung": "Richtig ist C. Zu den Pflichten des Auszubildenden nach dem <b>BBiG</b> gehört die <b>Lernpflicht</b> und damit die <b>Teilnahme am Berufsschulunterricht</b>, an außerbetrieblichen Ausbildungsmaßnahmen und an Prüfungen. B, A und D sind zwar ebenfalls echte Pflichten des Auszubildenden – <b>Schweigepflicht</b>, <b>pflegliche Behandlung der Ausbildungsmittel</b>, <b>Benachrichtigungspflicht</b> gegenüber dem <mark>Ausbildungsbetrieb</mark> –, betreffen aber nicht den geschilderten Fall. E ist falsch: Der Berufsschulbesuch ist <b>Pflicht</b>; spiegelbildlich muss der Betrieb den Auszubildenden dafür <b>freistellen</b>."
        },
        {
          "nr": 5,
          "typ": "auswahl",
          "lernziel": "6.1",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 5",
          "frage": "Warum ist die Berufsschule rechtlich genauso wichtig wie der Betrieb? Welche <b>zwei</b> Aussagen treffen zu?",
          "antworten": [
            "Sie ist ein gleichwertiger Bestandteil der dualen Berufsausbildung.",
            "Der Auszubildende ist zur Teilnahme verpflichtet, und der Betrieb muss ihn dafür freistellen.",
            "Sie ist wichtiger als der Betrieb, weil dort die Abschlussprüfung abgenommen wird.",
            "Der Betrieb darf die Teilnahme untersagen, wenn betriebliche Gründe entgegenstehen.",
            "Sie ist rechtlich nachrangig, weil sie nicht im Berufsausbildungsvertrag steht."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Die Berufsausbildung findet an <b>zwei gleichwertigen Lernorten</b> statt: Der Betrieb vermittelt praktische, die Berufsschule theoretische Kenntnisse – beide sind gesetzlich vorgeschrieben. Daraus folgt die doppelte Bindung: <b>Teilnahmepflicht</b> des Auszubildenden und <b>Freistellungspflicht</b> des Betriebs. C ist falsch: Die <b>Abschlussprüfung</b> nimmt die <b>zuständige Stelle</b> ab, in der Regel die IHK. D ist falsch – der Betrieb darf die Teilnahme <mark>nicht</mark> verhindern. E ist falsch: Die <b>Form des Ausbildungsnachweises</b> und die Freistellung gehören sogar zu den Vertragsinhalten. Merksatz: <b>Ohne Berufsschule keine vollständige Berufsausbildung.</b>"
        },
        {
          "nr": 6,
          "typ": "zuordnung",
          "lernziel": "6.6",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 6",
          "frage": "Ordnen Sie jeder Beschreibung den richtigen Begriff zu.",
          "optionen": [
            "Berufsausbildung",
            "Fortbildung",
            "Umschulung",
            "Berufsvorbereitung"
          ],
          "aussagen": [
            "Der erste Berufsabschluss in einem anerkannten Ausbildungsberuf.",
            "Vorhandene Kenntnisse werden im gleichen Berufsfeld erweitert oder vertieft, z. B. Kaufmann zum Fachwirt.",
            "Ein neuer Beruf in einem anderen Berufsfeld wird erlernt, z. B. Verkäufer zum Industriekaufmann.",
            "Eine Maßnahme für Menschen, die noch nicht ausbildungsreif sind, z. B. das Berufsvorbereitungsjahr."
          ],
          "loesung": [1, 2, 3, 4],
          "begruendung": "Die vier Formen unterscheiden sich nach <mark>Ausgangspunkt und Ziel</mark>. Die <b>Berufsausbildung</b> führt zum <b>ersten</b> Abschluss. Die <b>Fortbildung</b> setzt einen Abschluss voraus und baut im <mark>gleichen</mark> Berufsfeld darauf auf. Die <b>Umschulung</b> setzt ebenfalls einen Abschluss voraus, führt aber in ein <mark>anderes</mark> Berufsfeld – das ist der Weg, den Sie gerade gehen. Die <b>Berufsvorbereitung</b> steht <mark>vor</mark> der Ausbildung und vermittelt Grundkenntnisse, berufliche Orientierung und Bewerbungsfähigkeit. Alle vier sind im <b>BBiG</b> geregelt."
        },
        {
          "nr": 7,
          "typ": "auswahl",
          "lernziel": "6.6",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 7",
          "frage": "Welche Aussage zum Unterschied zwischen Fortbildung und Umschulung ist <mark>falsch</mark>?",
          "antworten": [
            "Die Fortbildung erweitert vorhandene Kenntnisse innerhalb des gleichen Berufsfelds.",
            "Die Fortbildung führt zu einem neuen Beruf, die Umschulung vertieft den bisherigen.",
            "Die Umschulung führt zu einem neuen Berufsabschluss in einem anderen Berufsfeld.",
            "Beide setzen in der Regel einen bereits abgeschlossenen Beruf voraus.",
            "Beide sind im Berufsbildungsgesetz geregelt."
          ],
          "loesung": [2],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist B. Sie vertauscht beide Begriffe. Richtig ist: Die <b>Fortbildung</b> bleibt im <mark>gleichen</mark> Berufsfeld und vertieft oder erweitert die vorhandenen Kenntnisse – Beispiel aus dem Arbeitsblatt: <b>Kaufmann → Fachwirt</b>. Die <b>Umschulung</b> führt zu einem <b>neuen Berufsabschluss</b> in einem <mark>anderen</mark> Berufsfeld – Beispiel: <b>Verkäufer → Industriekaufmann</b>; Anlass ist oft, dass der bisherige Beruf nicht mehr ausgeübt werden kann. A, C, D und E stimmen: Beide setzen einen abgeschlossenen Beruf voraus, und das <b>BBiG</b> regelt ausdrücklich berufliche Ausbildung, <b>Fortbildung und Umschulung</b>."
        },
        {
          "nr": 8,
          "typ": "auswahl",
          "lernziel": "6.4",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 8",
          "frage": "Welche <b>vier</b> Angaben gehören zu den Inhalten eines Berufsausbildungsvertrags?",
          "antworten": [
            "Dauer der Probezeit",
            "Höhe und Zahlung der Ausbildungsvergütung",
            "Dauer des Urlaubs",
            "Beginn und Dauer der Berufsausbildung",
            "Name der Berufsschulklasse und des Klassenlehrers"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Zu den wesentlichen Inhalten des <b>Berufsausbildungsvertrags</b> gehören unter anderem <b>Namen und Anschriften</b>, der <b>Ausbildungsberuf</b>, <b>Ausbildungsziel und -gliederung</b>, die <b>Ausbildungsstätten</b>, <b>Beginn und Dauer</b> der Ausbildung, außerbetriebliche Ausbildungsmaßnahmen, die <b>tägliche Ausbildungszeit</b>, die <b>Dauer der Probezeit</b>, <b>Zahlung und Höhe der Ausbildungsvergütung</b>, die <b>Überstundenregelung</b>, die <b>Dauer des Urlaubs</b>, die <b>Kündigungsmöglichkeiten</b>, Ansprüche aus Tarifverträgen und die <b>Form des Ausbildungsnachweises</b>. E ist falsch: Die Zuordnung zu einer Berufsschulklasse ist Sache der Schule und gehört nicht in den Vertrag."
        },
        {
          "nr": 9,
          "typ": "zuordnung",
          "lernziel": "6.5",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 9",
          "frage": "Ordnen Sie jede Pflicht der richtigen Vertragsseite zu.",
          "optionen": [
            "Pflicht des Ausbildenden",
            "Pflicht des Auszubildenden"
          ],
          "aussagen": [
            "Die Ausbildung planmäßig durchführen.",
            "Die Ausbildungsmittel kostenlos bereitstellen.",
            "Das Berichtsheft bzw. den Ausbildungsnachweis führen.",
            "Für den Berufsschulunterricht freistellen.",
            "Am Berufsschulunterricht und an Prüfungen teilnehmen.",
            "Die Ausbildungsvergütung zahlen."
          ],
          "loesung": [1, 1, 2, 1, 2, 1],
          "begruendung": "Der <b>Ausbildende</b> muss <b>ausbilden</b> (planmäßig, nach Ausbildungsplan), <b>vergüten</b>, die <b>Ausbildungsmittel kostenlos bereitstellen</b>, für Berufsschule, außerbetriebliche Ausbildung und Prüfungen <b>freistellen</b>, das Berichtsheft <b>kontrollieren</b>, Urlaub gewähren und seine <b>Fürsorge- und Aufsichtspflicht</b> erfüllen. Der <b>Auszubildende</b> hat die <b>Lernpflicht</b>, muss am Berufsschulunterricht und an Prüfungen <b>teilnehmen</b>, das <b>Berichtsheft führen</b>, Weisungen befolgen, die <b>Schweigepflicht</b> und die betriebliche Ordnung einhalten, die Ausbildungsmittel pfleglich behandeln und sich bei Verhinderung <b>benachrichtigen</b>. Achten Sie auf das Berichtsheft: <mark>Führen</mark> muss es der Auszubildende, <mark>kontrollieren</mark> der Ausbildende."
        },
        {
          "nr": 10,
          "typ": "auswahl",
          "lernziel": "6.5",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Berufsausbildung, Aufgabe 10",
          "sachverhalt": [
            "Ein Ausbildungsbetrieb überweist die Ausbildungsvergütung regelmäßig erst Mitte des Folgemonats."
          ],
          "frage": "Welche Pflicht ist betroffen?",
          "antworten": [
            "Es ist keine Pflicht betroffen, solange die Vergütung im selben Kalenderjahr gezahlt wird.",
            "Die Fürsorgepflicht gegenüber dem Auszubildenden in Bezug auf dessen Gesundheit.",
            "Die Freistellungspflicht für den Berufsschulunterricht.",
            "Die Pflicht zur kostenlosen Bereitstellung der Ausbildungsmittel.",
            "Die Vergütungspflicht des Ausbildenden nach dem Berufsbildungsgesetz."
          ],
          "loesung": [5],
          "negativ": false,
          "begruendung": "Richtig ist E. Die <b>Zahlung der Ausbildungsvergütung</b> ist ein verpflichtender Bestandteil des Berufsausbildungsverhältnisses nach dem <b>BBiG</b> und muss regelmäßig <mark>zum vereinbarten Zeitpunkt</mark> erfolgen – gesetzlich spätestens am letzten Arbeitstag des Monats. Eine Zahlung Mitte des Folgemonats verletzt diese Pflicht. B, C und D sind echte Pflichten des Ausbildenden, betreffen aber andere Sachverhalte. A ist falsch: Die Vergütung ist <b>monatlich</b> geschuldet, nicht jährlich."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "6.2",
          "zusatz": false,
          "fundstelle": "Folien „Die Berufsausbildung“ – Rechtsgrundlagen",
          "frage": "Welche <b>drei</b> Gesetze bilden zusammen den rechtlichen Rahmen der Berufsausbildung?",
          "antworten": [
            "Berufsbildungsgesetz (BBiG)",
            "Jugendarbeitsschutzgesetz (JArbSchG) bei Minderjährigen",
            "Arbeitszeitgesetz (ArbZG)",
            "Handelsgesetzbuch (HGB)",
            "Gesetz gegen Wettbewerbsbeschränkungen (GWB)"
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Das <b>Berufsbildungsgesetz (BBiG)</b> ist das zentrale Gesetz und regelt die grundlegenden Spielregeln der Ausbildung: Ausbildungsvertrag, Probezeit, Vergütung, Kündigung, Prüfungswesen, Rechte und Pflichten, Berufsschule und Ausbildungsordnung. Ergänzend gelten das <b>Jugendarbeitsschutzgesetz</b> bei minderjährigen Auszubildenden und das <b>Arbeitszeitgesetz</b> bei volljährigen. D regelt das Handelsrecht der Kaufleute und E den Wettbewerb – beide haben mit der Berufsausbildung nichts zu tun."
        },
        {
          "nr": 12,
          "typ": "zuordnung",
          "lernziel": "6.3",
          "zusatz": false,
          "fundstelle": "Folien „Die Berufsausbildung“ – BBiG, Ausbildungsordnung, Ausbildungsrahmenplan",
          "frage": "Ordnen Sie jede Beschreibung der richtigen Rechtsgrundlage zu.",
          "optionen": [
            "Berufsbildungsgesetz (BBiG)",
            "Ausbildungsordnung",
            "Ausbildungsrahmenplan"
          ],
          "aussagen": [
            "Regelt die grundlegenden Spielregeln der Ausbildung für alle Berufe.",
            "Legt berufsspezifisch Bezeichnung, Dauer, Inhalte und Prüfungsanforderungen bundeseinheitlich fest.",
            "Beantwortet die Frage: Wann wird was im Betrieb vermittelt?",
            "Gilt als Rechtsverordnung für einen einzelnen Ausbildungsberuf."
          ],
          "loesung": [1, 2, 3, 2],
          "begruendung": "Die drei Ebenen werden gern verwechselt. Das <b>BBiG</b> ist das <b>Gesetz</b> und gilt für <mark>alle</mark> Ausbildungsberufe – es regelt Vertrag, Probezeit, Vergütung, Kündigung und Prüfungen. Die <b>Ausbildungsordnung</b> ist eine <b>Rechtsverordnung</b> für <mark>einen bestimmten</mark> Beruf und legt bundeseinheitlich Berufsbezeichnung, <b>Dauer</b>, <b>Inhalte</b> (Ausbildungsberufsbild) und <b>Prüfungsanforderungen</b> fest. Der <b>Ausbildungsrahmenplan</b> ist <mark>Teil</mark> der Ausbildungsordnung und beantwortet die Frage <b>wann was</b> vermittelt wird – mit sachlicher und zeitlicher Gliederung. Auf dieser Grundlage erstellt der Betrieb seinen eigenen <b>Ausbildungsplan</b>."
        },
        {
          "nr": 13,
          "typ": "auswahl",
          "lernziel": "6.3",
          "zusatz": false,
          "fundstelle": "Folien „Die Berufsausbildung“ – Ausbildungsrahmenplan und betrieblicher Ausbildungsplan",
          "sachverhalt": [
            "Ein Systemhaus will für seine Auszubildenden festlegen, welche Inhalte in welchem Ausbildungsabschnitt vermittelt werden."
          ],
          "frage": "Welche Aussage trifft zu?",
          "antworten": [
            "Der Betrieb kann Inhalte und Reihenfolge völlig frei festlegen, weil es keine bundesweiten Vorgaben gibt.",
            "Der Betrieb erstellt seinen Ausbildungsplan auf der Grundlage der Ausbildungsordnung bzw. des Ausbildungsrahmenplans.",
            "Die Berufsschule erstellt den betrieblichen Ausbildungsplan.",
            "Der Ausbildungsrahmenplan wird vom einzelnen Betrieb aufgestellt und der IHK vorgelegt.",
            "Die Reihenfolge der Inhalte bestimmt der Auszubildende selbst."
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Der <b>betriebliche Ausbildungsplan</b> wird vom Betrieb erstellt – aber <mark>auf der Basis</mark> der <b>Ausbildungsordnung</b> und des darin enthaltenen <b>Ausbildungsrahmenplans</b>. A ist falsch: Die Ausbildungsordnung gilt <b>bundeseinheitlich</b> und sichert damit eine vergleichbare Ausbildungsqualität. C ist falsch – die Berufsschule arbeitet nach dem <b>Rahmenlehrplan</b> und ihrem schulischen Stoffplan. D kehrt die Zuständigkeit um: Der <b>Ausbildungsrahmenplan</b> ist Teil der staatlichen Ausbildungsordnung und wird nicht vom Betrieb aufgestellt. E ist falsch, weil die zeitliche Gliederung verbindlich vorgegeben ist."
        },
        {
          "nr": 14,
          "typ": "auswahl",
          "lernziel": "6.4",
          "zusatz": false,
          "fundstelle": "Folien „Die Berufsausbildung“ – Duales System, Berufsausbildungsvertrag",
          "frage": "Welche Aussage zum Berufsausbildungsvertrag ist <mark>falsch</mark>?",
          "antworten": [
            "Er ist ein privatrechtlicher Vertrag zwischen Ausbildungsbetrieb und Auszubildendem.",
            "Er bedarf der Schriftform.",
            "Er muss die Dauer der Probezeit und die Kündigungsmöglichkeiten enthalten.",
            "Er wird zwischen dem Auszubildenden und der zuständigen Stelle, also der IHK, geschlossen.",
            "Er muss die Form des Ausbildungsnachweises regeln."
          ],
          "loesung": [4],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist D. Der <b>Berufsausbildungsvertrag</b> wird zwischen <b>Ausbildungsbetrieb</b> und <b>Auszubildendem</b> geschlossen. Die <b>IHK</b> ist nicht Vertragspartei: Sie trägt den Vertrag in das <b>Verzeichnis der Berufsausbildungsverhältnisse</b> ein und überwacht die Ausbildung. A, B, C und E stimmen: Der Vertrag ist <b>privatrechtlich</b>, bedarf der <b>Schriftform</b> und muss unter anderem <b>Probezeit</b>, <b>Kündigungsmöglichkeiten</b> und die <b>Form des Ausbildungsnachweises</b> (Berichtsheft) regeln."
        },
        {
          "nr": 15,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen die Probezeit von 1 bis 4 Monaten, aber nicht die davon abhängigen Kündigungsregeln des BBiG – ein Standardfall der IHK-Prüfung.",
          "sachverhalt": [
            "Ein Auszubildender ist im fünften Ausbildungsmonat. Er möchte die Ausbildung abbrechen, weil er den Beruf wechseln will."
          ],
          "frage": "Zusatzwissen: Welche <b>zwei</b> Aussagen zur Kündigung treffen zu?",
          "antworten": [
            "Die Probezeit ist bereits abgelaufen – sie darf höchstens vier Monate betragen.",
            "Er kann mit einer Frist von vier Wochen schriftlich kündigen, wenn er die Ausbildung aufgeben oder sich für einen anderen Beruf ausbilden lassen will.",
            "Er kann jederzeit fristlos kündigen, weil die Probezeit sechs Monate dauert.",
            "Nach der Probezeit kann der Auszubildende überhaupt nicht mehr kündigen.",
            "Eine Kündigung per E-Mail ist ausreichend."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach <b>§ 20 BBiG</b> beginnt das Ausbildungsverhältnis mit der <b>Probezeit</b>; sie muss <b>mindestens einen Monat</b> und darf <b>höchstens vier Monate</b> betragen – im fünften Monat ist sie also vorbei. Danach gilt <b>§ 22 BBiG</b>: Der <b>Auszubildende</b> kann mit einer Frist von <b>4 Wochen</b> kündigen, wenn er die Ausbildung aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will; der <b>Ausbildende</b> dagegen nur noch <b>aus wichtigem Grund fristlos</b>. C verwechselt die Probezeit des BBiG mit der sechsmonatigen Probezeit des Arbeitsverhältnisses nach <b>§ 622 Abs. 3 BGB</b>. D ist falsch. E ist falsch: <b>§ 22 Abs. 3 BBiG</b> verlangt <b>Schriftform</b>, die elektronische Form ist ausgeschlossen; nach der Probezeit ist zusätzlich der <b>Kündigungsgrund</b> anzugeben."
        },
        {
          "nr": 16,
          "typ": "eingabe",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen die Vergütung als Vertragsbestandteil, aber keinen Betrag – die Mindestausbildungsvergütung ändert sich jährlich und wird in Prüfungsaufgaben verwendet.",
          "sachverhalt": [
            "Ein Auszubildender beginnt seine duale Ausbildung am 1. September 2026. Sein Betrieb ist nicht tarifgebunden."
          ],
          "frage": "Zusatzwissen (Stand 2026): Wie hoch ist die gesetzliche Mindestausbildungsvergütung im ersten Ausbildungsjahr?",
          "art": "zahl",
          "einheit": "€",
          "loesung": 724,
          "toleranz": 0.01,
          "begruendung": "Für Ausbildungen, die zwischen dem 1. Januar und dem 31. Dezember <b>2026</b> beginnen, beträgt die <b>Mindestausbildungsvergütung</b> nach dem <b>BBiG</b> im ersten Ausbildungsjahr <b>724 €</b> im Monat (2025: 682 €). Für die folgenden Jahre gelten gesetzliche Aufschläge auf diesen Betrag: <b>+18 %</b> im zweiten, <b>+35 %</b> im dritten und <b>+40 %</b> im vierten Ausbildungsjahr. <b>Rechenweg und Gegenprobe:</b> 724 € × 1,18 = 854 € (2. Jahr), 724 € × 1,35 = 977 € (3. Jahr), 724 € × 1,40 = 1.014 € (4. Jahr). <mark>Wichtig:</mark> Die Mindestausbildungsvergütung wird jährlich angepasst; der hier genannte Stand ist 2026. Ist der Betrieb <b>tarifgebunden</b>, darf auch eine niedrigere tarifliche Vergütung gelten."
        },
        {
          "nr": 17,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Wann das Ausbildungsverhältnis genau endet, steht nicht in den Unterlagen, entscheidet in der Prüfung aber über Vergütungs- und Urlaubsansprüche.",
          "frage": "Zusatzwissen: Welche <b>zwei</b> Aussagen zum Ende des Berufsausbildungsverhältnisses sind richtig?",
          "antworten": [
            "Es endet mit Ablauf der vereinbarten Ausbildungszeit.",
            "Bei bestandener Abschlussprüfung endet es bereits mit der Bekanntgabe des Ergebnisses durch den Prüfungsausschuss.",
            "Es endet stets erst am letzten Tag des Kalenderjahres, in dem die Prüfung stattfand.",
            "Bei nicht bestandener Prüfung endet es ausnahmslos mit Ablauf der Ausbildungszeit.",
            "Es endet automatisch mit dem letzten Berufsschultag."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach <b>§ 21 BBiG</b> endet das Berufsausbildungsverhältnis grundsätzlich mit <b>Ablauf der vereinbarten Ausbildungszeit</b>. Besteht der Auszubildende die <b>Abschlussprüfung</b> vorher, endet es schon <mark>mit der Bekanntgabe des Ergebnisses</mark> durch den Prüfungsausschuss – also unter Umständen Wochen vor dem vertraglichen Enddatum. C und E sind frei erfunden. D ist falsch: Wird die Prüfung <b>nicht bestanden</b>, verlängert sich das Ausbildungsverhältnis <mark>auf Verlangen des Auszubildenden</mark> bis zur nächsten Wiederholungsprüfung, höchstens aber um ein Jahr."
        },
        {
          "nr": 18,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Das Jugendarbeitsschutzgesetz wird in den Unterlagen nur erwähnt – seine Urlaubsstaffel nach Alter ist eine typische Prüfungsfrage bei minderjährigen Auszubildenden.",
          "sachverhalt": [
            "Eine Auszubildende ist zu Beginn des Kalenderjahres 15 Jahre alt."
          ],
          "frage": "Zusatzwissen: Wie viele Werktage Urlaub stehen ihr mindestens zu?",
          "antworten": [
            "25 Werktage",
            "27 Werktage",
            "30 Werktage",
            "24 Werktage",
            "20 Werktage"
          ],
          "loesung": [3],
          "negativ": false,
          "begruendung": "Richtig ist C. <b>§ 19 Abs. 2 JArbSchG</b> staffelt den Urlaub Jugendlicher nach dem Alter <mark>zu Beginn des Kalenderjahres</mark>: <b>mindestens 30 Werktage</b>, wenn die oder der Jugendliche noch nicht 16 Jahre alt ist; <b>27 Werktage</b>, wenn noch nicht 17; <b>25 Werktage</b>, wenn noch nicht 18. Mit 15 Jahren gilt also die höchste Stufe. D nennt den allgemeinen gesetzlichen Mindesturlaub für Erwachsene nach <b>§ 3 BUrlG</b> (24 Werktage), E dessen Umrechnung auf die Fünf-Tage-Woche. Das Jugendarbeitsschutzrecht gewährt also <mark>mehr</mark> Urlaub – je jünger, desto mehr."
        }
      ]
    },
    {
      "nr": 7,
      "titel": "Betriebliche Mitbestimmung",
      "bereich": "BetrVG, Betriebsrat, JAV, Aufsichtsrat",
      "fragen": [
        {
          "nr": 1,
          "typ": "auswahl",
          "lernziel": "7.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 1",
          "frage": "Welche <b>drei</b> Aussagen zur Wahl des Betriebsrats treffen zu?",
          "antworten": [
            "Die Wahl ist geheim und unmittelbar.",
            "Gewählt wird alle vier Jahre.",
            "Wahlberechtigt ist, wer das 16. Lebensjahr vollendet hat.",
            "Wählbar ist, wer das 16. Lebensjahr vollendet hat und drei Monate im Betrieb ist.",
            "Die Wahl findet alle zwei Jahre statt."
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Die Betriebsratswahl ist <b>geheim</b> und <b>unmittelbar</b> und findet <b>alle vier Jahre</b> statt – die regelmäßigen Wahlen laufen nach <b>§ 13 BetrVG</b> vom 1. März bis 31. Mai. Das <b>aktive Wahlrecht</b> (wählen dürfen) hat nach <b>§ 7 BetrVG</b>, wer das <b>16. Lebensjahr</b> vollendet hat. D ist falsch und verwechselt aktives mit passivem Wahlrecht: <b>Wählbar</b> ist nach <b>§ 8 BetrVG</b>, wer das <b>18. Lebensjahr</b> vollendet hat und <b>sechs Monate</b> dem Betrieb angehört. E nennt den falschen Turnus."
        },
        {
          "nr": 2,
          "typ": "auswahl",
          "lernziel": "7.5",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 2",
          "sachverhalt": [
            "Ein Stahlunternehmen mit 1.400 Beschäftigten fällt unter das Montan-Mitbestimmungsgesetz."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur Mitbestimmung im Aufsichtsrat treffen zu?",
          "antworten": [
            "Arbeitnehmer- und Kapitalseite stellen gleich viele Mitglieder – das bedeutet Parität.",
            "Hinzu kommt ein neutrales Mitglied, das bei unentschiedenen Abstimmungen entscheidet.",
            "Die Arbeitnehmerseite stellt ein Drittel der Aufsichtsratsmitglieder.",
            "Parität bedeutet, dass die Kapitalseite bei Stimmengleichheit den Ausschlag gibt.",
            "Das Montan-Mitbestimmungsgesetz gilt erst ab 2.000 Beschäftigten."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach dem <b>Montan-Mitbestimmungsgesetz</b> gilt für Unternehmen der Kohle-, Eisen- und Stahlindustrie mit mehr als <b>1.000 Beschäftigten</b> eine <b>paritätische</b> Besetzung des Aufsichtsrats: Arbeitnehmer- und Kapitalseite stellen <mark>gleich viele</mark> Mitglieder und haben gleiches Stimmgewicht. Dazu kommt ein <b>neutrales Mitglied</b> – der „elfte Mann“ –, das bei Patt entscheidet. C beschreibt das <b>Drittelbeteiligungsgesetz</b> (500 bis 2.000 Beschäftigte). D widerspricht dem Begriff der Parität; genau deshalb gibt es das neutrale Mitglied. E nennt die Schwelle des <b>Mitbestimmungsgesetzes 1976</b>, nicht die der Montan-Mitbestimmung."
        },
        {
          "nr": 3,
          "typ": "auswahl",
          "lernziel": "7.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 3",
          "sachverhalt": [
            "Betriebsrat und Arbeitgeber können sich über Beginn und Ende der täglichen Arbeitszeit nicht einigen."
          ],
          "frage": "Welche <b>zwei</b> Möglichkeiten hat der Betriebsrat?",
          "antworten": [
            "Er kann die Einigungsstelle anrufen, deren Spruch die Einigung ersetzt.",
            "Er kann die Einhaltung bestehender Regelungen gerichtlich durchsetzen.",
            "Er kann den Betrieb bestreiken, bis der Arbeitgeber nachgibt.",
            "Er kann die Arbeitszeit einseitig selbst festlegen.",
            "Er muss die Entscheidung des Arbeitgebers hinnehmen, weil die Arbeitszeit Teil des Direktionsrechts ist."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. <b>Beginn und Ende der täglichen Arbeitszeit</b> einschließlich der Pausen unterliegen der <b>echten Mitbestimmung</b> nach <b>§ 87 Abs. 1 Nr. 2 BetrVG</b>. Kommt keine Einigung zustande, entscheidet nach <b>§ 87 Abs. 2 BetrVG</b> die <b>Einigungsstelle</b>; ihr <b>Spruch ersetzt die Einigung</b> und ist verbindlich. Daneben kann der Betriebsrat bestehende Regelungen vor dem <b>Arbeitsgericht</b> durchsetzen. C ist falsch: Der Betriebsrat ist zur <b>vertrauensvollen Zusammenarbeit</b> verpflichtet und darf nicht zum Streik aufrufen – Arbeitskampf ist Sache der <b>Gewerkschaften</b>. D ist falsch, weil der Betriebsrat nicht allein entscheiden darf. E ist falsch: Das <b>Direktionsrecht</b> endet dort, wo die Mitbestimmung beginnt."
        },
        {
          "nr": 4,
          "typ": "auswahl",
          "lernziel": "7.2",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 4",
          "frage": "Welche <b>vier</b> gehören zu den Organen der Betriebsverfassung?",
          "antworten": [
            "Betriebsrat",
            "Betriebsversammlung",
            "Jugend- und Auszubildendenvertretung (JAV)",
            "Gesamtbetriebsrat",
            "Bundeskartellamt"
          ],
          "loesung": [1, 2, 3, 4],
          "negativ": false,
          "begruendung": "Richtig sind A bis D. Zu den Organen der <b>Betriebsverfassung</b> nach dem BetrVG zählen <b>Betriebsrat</b>, <b>Betriebsversammlung</b>, <b>Jugend- und Auszubildendenvertretung (JAV)</b>, der <b>Arbeitgeber</b>, der <b>Gesamtbetriebsrat</b> und der <b>Konzernbetriebsrat</b>; hinzu kommt die <b>Einigungsstelle</b> als fakultatives Organ zur Beilegung von Streitigkeiten. E ist falsch: Das <b>Bundeskartellamt</b> gehört zur Wettbewerbspolitik und hat mit der Betriebsverfassung nichts zu tun."
        },
        {
          "nr": 5,
          "typ": "auswahl",
          "lernziel": "7.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 5",
          "sachverhalt": [
            "Ein Betrieb mit 120 Mitarbeitenden hat einen Betriebsrat. Der Arbeitgeber möchte Samstagsarbeit einführen."
          ],
          "frage": "Darf er das ohne den Betriebsrat entscheiden?",
          "antworten": [
            "Ja – sofern er die Samstagsarbeit zusätzlich vergütet.",
            "Ja – die Lage der Arbeitszeit gehört zum Direktionsrecht des Arbeitgebers.",
            "Ja – der Betriebsrat hat bei der Arbeitszeit nur ein Informationsrecht.",
            "Nein – aber nur, wenn mehr als 200 Mitarbeitende betroffen sind.",
            "Nein – die Verteilung der Arbeitszeit auf die Wochentage ist nach § 87 BetrVG mitbestimmungspflichtig."
          ],
          "loesung": [5],
          "negativ": false,
          "begruendung": "Richtig ist E. Nach <b>§ 87 Abs. 1 Nr. 2 BetrVG</b> hat der Betriebsrat mitzubestimmen bei „Beginn und Ende der täglichen Arbeitszeit einschließlich der Pausen sowie <mark>Verteilung der Arbeitszeit auf die einzelnen Wochentage</mark>“ – genau darum geht es bei der Samstagsarbeit. Ohne Zustimmung des Betriebsrats oder einen Spruch der <b>Einigungsstelle</b> darf der Arbeitgeber sie nicht einführen. B und C sind falsch: Die <b>echte Mitbestimmung</b> geht weit über ein Informationsrecht hinaus und begrenzt das <b>Direktionsrecht</b>. D ist falsch, weil <b>§ 87 BetrVG</b> keine solche Schwelle kennt – er gilt, sobald ein Betriebsrat besteht. A ist falsch: Eine Zulage ersetzt die Mitbestimmung nicht."
        },
        {
          "nr": 6,
          "typ": "auswahl",
          "lernziel": "7.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 6",
          "sachverhalt": [
            "Ein Auszubildender fühlt sich im Betrieb unfair behandelt."
          ],
          "frage": "Welches Organ ist für ihn zuerst zuständig?",
          "antworten": [
            "Die Einigungsstelle",
            "Die Jugend- und Auszubildendenvertretung (JAV)",
            "Der Aufsichtsrat",
            "Das Bundesarbeitsgericht",
            "Die Gewerkschaft"
          ],
          "loesung": [2],
          "negativ": false,
          "begruendung": "Richtig ist B. Die <b>Jugend- und Auszubildendenvertretung (JAV)</b> vertritt die besonderen Belange der jungen Beschäftigten und Auszubildenden: Sie nimmt deren Interessen wahr, gibt Probleme an den <b>Betriebsrat</b> weiter und beobachtet die <b>Ausbildungsqualität</b>. Wichtig für die Prüfung: Die JAV hat <mark>kein eigenes Mitbestimmungsrecht</mark> – sie arbeitet <b>über den Betriebsrat</b>. A ist falsch, weil die <b>Einigungsstelle</b> erst bei Streit zwischen Betriebsrat und Arbeitgeber tätig wird. C gehört zur unternehmerischen Mitbestimmung. D ist eine letzte gerichtliche Instanz. E ist falsch: Die Gewerkschaft ist nicht das betriebliche Organ der ersten Anlaufstelle."
        },
        {
          "nr": 7,
          "typ": "auswahl",
          "lernziel": "7.3",
          "zusatz": false,
          "fundstelle": "Arbeitsblatt Betriebliche Mitbestimmung, Aufgabe 7",
          "sachverhalt": [
            "Der Arbeitgeber lehnt die Urlaubswünsche mehrerer Beschäftigter für den Sommer pauschal ab. Der Betriebsrat widerspricht."
          ],
          "frage": "Welches Recht hat der Betriebsrat?",
          "antworten": [
            "Er hat beim Urlaub nur ein Anhörungsrecht.",
            "Er kann den Urlaub für die Beschäftigten eigenständig genehmigen.",
            "Er bestimmt bei der Aufstellung allgemeiner Urlaubsgrundsätze und des Urlaubsplans mit.",
            "Er kann den Arbeitgeber zur Zahlung einer Entschädigung verpflichten.",
            "Er hat beim Urlaub überhaupt keine Beteiligungsrechte."
          ],
          "loesung": [3],
          "negativ": false,
          "begruendung": "Richtig ist C. Nach <b>§ 87 Abs. 1 Nr. 5 BetrVG</b> bestimmt der Betriebsrat mit bei der „Aufstellung allgemeiner <b>Urlaubsgrundsätze</b> und des <b>Urlaubsplans</b> sowie der Festsetzung der zeitlichen Lage des Urlaubs für einzelne Arbeitnehmer, wenn zwischen Arbeitgeber und beteiligten Arbeitnehmern <mark>kein Einverständnis</mark> erzielt wird“ – genau dieser Streitfall liegt hier vor. B ist falsch: Der Betriebsrat <b>bestimmt mit</b>, genehmigt aber nicht selbst. A untertreibt – ein bloßes Anhörungsrecht wäre viel schwächer als die echte Mitbestimmung. D ist falsch, weil der Betriebsrat keine Entschädigungen festsetzt. E ist falsch. Kommt keine Einigung zustande, entscheidet die <b>Einigungsstelle</b>."
        },
        {
          "nr": 8,
          "typ": "auswahl",
          "lernziel": "7.1",
          "zusatz": false,
          "fundstelle": "Folien „Betriebliche Mitbestimmung“ – Was ist das Betriebsverfassungsgesetz",
          "frage": "Was regelt das Betriebsverfassungsgesetz?",
          "antworten": [
            "Die Mindestanforderungen an Ausbildungsordnungen.",
            "Die Rechtsbeziehungen zwischen Kaufleuten im Handelsverkehr.",
            "Die Verteilung des Gewinns auf die Gesellschafter.",
            "Die Zuständigkeit der Sozialgerichte bei Streit mit Versicherungsträgern.",
            "Die Zusammenarbeit zwischen Arbeitgeber und Arbeitnehmervertretung im Betrieb."
          ],
          "loesung": [5],
          "negativ": false,
          "begruendung": "Richtig ist E. Das <b>Betriebsverfassungsgesetz (BetrVG)</b> regelt die Zusammenarbeit zwischen <b>Arbeitgeber</b> und <b>Arbeitnehmervertretung</b> im Betrieb; seine Grundidee ist, dass der Betrieb <b>partnerschaftlich</b> geführt werden soll. Es regelt die <b>Mitwirkung der Arbeitnehmer</b>, den <b>Schutz der Beschäftigten</b>, die <b>Konfliktlösung im Betrieb</b> und die <b>demokratische Beteiligung</b>. A betrifft das <b>BBiG</b>, B das <b>HGB</b>, C das Gesellschaftsrecht und D die <b>Sozialgerichtsbarkeit</b>."
        },
        {
          "nr": 9,
          "typ": "auswahl",
          "lernziel": "7.1",
          "zusatz": false,
          "fundstelle": "Folien „Betriebliche Mitbestimmung“ – Voraussetzungen für einen Betriebsrat",
          "sachverhalt": [
            "In einem jungen IT-Unternehmen arbeiten sieben Beschäftigte. Fünf davon sind seit über einem Jahr dabei und volljährig, zwei sind erst seit zwei Monaten im Betrieb."
          ],
          "frage": "Welche <b>zwei</b> Aussagen zur Errichtung eines Betriebsrats treffen zu?",
          "antworten": [
            "Ein Betriebsrat kann gewählt werden – nötig sind mindestens fünf ständige wahlberechtigte Arbeitnehmer, von denen drei wählbar sind.",
            "Die beiden neuen Beschäftigten dürfen mitwählen, sind aber noch nicht wählbar.",
            "Ein Betriebsrat darf erst ab 20 Beschäftigten gebildet werden.",
            "Ein Betriebsrat muss vom Arbeitgeber eingesetzt werden.",
            "Leitende Angestellte zählen bei der Wählbarkeit mit."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach <b>§ 1 BetrVG</b> werden Betriebsräte in Betrieben mit <b>mindestens fünf ständigen wahlberechtigten Arbeitnehmern</b> gewählt, von denen <b>drei wählbar</b> sind – beides ist hier erfüllt. <b>Wahlberechtigt</b> ist nach <b>§ 7 BetrVG</b>, wer 16 Jahre alt ist; <b>wählbar</b> ist nach <b>§ 8 BetrVG</b> nur, wer 18 Jahre alt ist <mark>und sechs Monate</mark> dem Betrieb angehört – die beiden Neuen dürfen also wählen, aber nicht gewählt werden. C nennt eine erfundene Schwelle. D ist falsch: Der Betriebsrat wird von der <b>Belegschaft gewählt</b>, nicht vom Arbeitgeber eingesetzt. E ist falsch – <b>leitende Angestellte</b> sind nach <b>§ 5 Abs. 3 BetrVG</b> nicht wählbar."
        },
        {
          "nr": 10,
          "typ": "auswahl",
          "lernziel": "7.4",
          "zusatz": false,
          "fundstelle": "Folien „Betriebliche Mitbestimmung“ – Unternehmerische Mitbestimmung",
          "frage": "Welche Aussage zur Abgrenzung von betrieblicher und unternehmerischer Mitbestimmung ist <mark>nicht</mark> zutreffend?",
          "antworten": [
            "Die betriebliche Mitbestimmung wirkt im Betrieb über den Betriebsrat.",
            "Die unternehmerische Mitbestimmung wirkt im Unternehmen über den Aufsichtsrat.",
            "Die betriebliche Mitbestimmung wirkt über den Aufsichtsrat, die unternehmerische über den Betriebsrat.",
            "Beide Ebenen bestehen nebeneinander und schließen sich nicht aus.",
            "Der Aufsichtsrat kontrolliert und bestellt den Vorstand bzw. die Geschäftsführung."
          ],
          "loesung": [3],
          "negativ": true,
          "begruendung": "Gesucht ist die falsche Aussage – das ist C. Sie vertauscht die beiden Ebenen. Richtig ist: Die <b>betriebliche Mitbestimmung</b> wirkt auf <b>Betriebsebene</b> über den <b>Betriebsrat</b> nach dem <b>BetrVG</b> – Arbeitszeit, Urlaub, Einstellungen, Kündigungen. Die <b>unternehmerische Mitbestimmung</b> wirkt auf <b>Unternehmensebene</b> über den <b>Aufsichtsrat</b> und betrifft <b>Unternehmenspolitik, Finanzen und Struktur</b>. A, B, D und E stimmen: Beide Ebenen bestehen <mark>nebeneinander</mark>, und der Aufsichtsrat kontrolliert und bestellt den Vorstand bzw. die Geschäftsführung – die laufenden Geschäfte führt er nicht selbst."
        },
        {
          "nr": 11,
          "typ": "auswahl",
          "lernziel": "7.4",
          "zusatz": false,
          "fundstelle": "Folien „Betriebliche Mitbestimmung“ – Kernfakten, Arbeitsdirektor",
          "frage": "Welche <b>zwei</b> Aussagen zur unternehmerischen Mitbestimmung treffen zu?",
          "antworten": [
            "Sie erfolgt im Aufsichtsrat, der den Vorstand bzw. die Geschäftsführung kontrolliert und bestellt.",
            "Bei paritätischer Mitbestimmung gehört dem Vorstand ein von den Arbeitnehmern vorgeschlagener Arbeitsdirektor an.",
            "Sie ersetzt den Betriebsrat auf Unternehmensebene vollständig.",
            "Sie gilt unabhängig von Größe und Rechtsform in jedem Unternehmen gleich.",
            "Der Aufsichtsrat führt die laufenden Geschäfte des Unternehmens."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Organ der unternehmerischen Mitbestimmung ist der <b>Aufsichtsrat</b>; er <b>kontrolliert und bestellt</b> den Vorstand bzw. die Geschäftsführung. Bei <b>paritätischer</b> Mitbestimmung gehört dem Vorstand ein <b>Arbeitsdirektor</b> an, der von den Arbeitnehmern vorgeschlagen wird – nach dem Montan-Mitbestimmungsgesetz kann er sogar nicht gegen die Stimmen der Arbeitnehmervertreter gewählt werden. C ist falsch: Beide Ebenen bestehen <mark>nebeneinander</mark>. D ist falsch – je nach Größe und Rechtsform gelten <b>DrittelbG</b>, <b>MitbestG 1976</b> oder die <b>Montan-Mitbestimmung</b>. E ist falsch: Die laufenden Geschäfte führt der <b>Vorstand</b>, der Aufsichtsrat überwacht nur."
        },
        {
          "nr": 12,
          "typ": "zuordnung",
          "lernziel": "7.5",
          "zusatz": false,
          "fundstelle": "Folien „Betriebliche Mitbestimmung“ – Mitbestimmungsmodelle",
          "frage": "Ordnen Sie jeder Beschreibung das richtige Mitbestimmungsmodell zu.",
          "optionen": [
            "Drittelbeteiligungsgesetz (DrittelbG)",
            "Mitbestimmungsgesetz 1976 (MitbestG)",
            "Montan-Mitbestimmungsgesetz"
          ],
          "aussagen": [
            "Unternehmen mit 500 bis 2.000 Mitarbeitenden; ein Drittel des Aufsichtsrats besteht aus Arbeitnehmervertretern.",
            "Unternehmen mit mehr als 2.000 Mitarbeitenden; der Aufsichtsrat ist paritätisch besetzt.",
            "Kohle-, Eisen- und Stahlunternehmen mit mehr als 1.000 Beschäftigten; dazu kommt ein neutrales Mitglied."
          ],
          "loesung": [1, 2, 3],
          "begruendung": "Die drei Modelle unterscheiden sich nach <b>Größe</b> und <b>Branche</b>. Das <b>Drittelbeteiligungsgesetz</b> gilt für Unternehmen mit <b>500 bis 2.000</b> Mitarbeitenden – ein <mark>Drittel</mark> des Aufsichtsrats kommt von der Arbeitnehmerseite. Das <b>Mitbestimmungsgesetz 1976</b> gilt ab <b>mehr als 2.000</b> Mitarbeitenden und sieht eine <b>paritätische</b> Besetzung (50/50) vor; bei Stimmengleichheit gibt die Stimme des Aufsichtsratsvorsitzenden den Ausschlag, der von der Kapitalseite kommt. Die <b>Montan-Mitbestimmung</b> ist die stärkste Form: Sie gilt in Kohle, Eisen und Stahl ab <b>mehr als 1.000</b> Beschäftigten, ist echt paritätisch und kennt zusätzlich das <b>neutrale Mitglied</b>."
        },
        {
          "nr": 13,
          "typ": "reihenfolge",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Unterlagen nennen die Mitwirkung bei Kündigungen nur stichwortartig – dass eine Kündigung ohne Anhörung des Betriebsrats unwirksam ist, wird in Prüfungen regelmäßig abgefragt.",
          "frage": "Zusatzwissen: Bringen Sie den Ablauf einer ordentlichen Kündigung in einem Betrieb mit Betriebsrat in die richtige Reihenfolge.",
          "schritte": [
            "Der Arbeitgeber erklärt die Kündigung schriftlich gegenüber dem Arbeitnehmer.",
            "Der Arbeitgeber entschließt sich zur Kündigung und bereitet sie vor.",
            "Der Arbeitnehmer kann innerhalb von drei Wochen Kündigungsschutzklage erheben.",
            "Der Arbeitgeber unterrichtet den Betriebsrat schriftlich über die beabsichtigte Kündigung.",
            "Der Betriebsrat äußert sich innerhalb der gesetzlichen Frist von einer Woche."
          ],
          "loesung": [4, 1, 5, 2, 3],
          "begruendung": "Die richtige Reihenfolge lautet: <b>Entschluss</b> → <b>Anhörung des Betriebsrats</b> → <b>Stellungnahme des Betriebsrats</b> → <b>Kündigungserklärung</b> → <b>Klagemöglichkeit</b>. Nach <b>§ 102 Abs. 1 BetrVG</b> ist der Betriebsrat vor <mark>jeder</mark> Kündigung <b>rechtzeitig und schriftlich</b> zu unterrichten; eine ohne Anhörung ausgesprochene Kündigung ist <b>unwirksam</b>. Der Betriebsrat hat bei der ordentlichen Kündigung <b>eine Woche</b> Zeit für Bedenken, bei der außerordentlichen nur <b>drei Tage</b>. Erst danach darf der Arbeitgeber die Kündigung erklären – <b>schriftlich</b> nach <b>§ 623 BGB</b>. Der Arbeitnehmer hat dann <b>drei Wochen</b> für die Kündigungsschutzklage (<b>§ 4 KSchG</b>). Wichtig: Der Betriebsrat kann die Kündigung nicht <mark>verhindern</mark>, aber ihr widersprechen."
        },
        {
          "nr": 14,
          "typ": "eingabe",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Die Größe des Betriebsrats steht nicht in den Unterlagen, wird in der Prüfung aber aus der Staffel des § 9 BetrVG abgelesen.",
          "sachverhalt": [
            "Ein Betrieb hat in der Regel 120 wahlberechtigte Arbeitnehmerinnen und Arbeitnehmer."
          ],
          "frage": "Zusatzwissen: Aus wie vielen Mitgliedern besteht der Betriebsrat?",
          "art": "zahl",
          "einheit": "Mitglieder",
          "loesung": 7,
          "toleranz": 0.01,
          "begruendung": "<b>§ 9 BetrVG</b> staffelt die Zahl der Betriebsratsmitglieder nach der Beschäftigtenzahl: <b>5 bis 20</b> wahlberechtigte Arbeitnehmer → <b>1 Person</b>, <b>21 bis 50</b> → <b>3 Mitglieder</b>, <b>51 bis 100</b> → <b>5 Mitglieder</b>, <b>101 bis 200</b> → <b>7 Mitglieder</b>, <b>201 bis 400</b> → <b>9 Mitglieder</b>. Mit 120 Beschäftigten liegt der Betrieb in der Stufe 101 bis 200, der Betriebsrat besteht also aus <b>7 Mitgliedern</b>. <b>Gegenprobe:</b> Bei 100 Beschäftigten wären es noch 5, bei 201 schon 9 – 120 liegt eindeutig dazwischen. Merken Sie sich das Muster: Ab 21 Beschäftigten ist die Zahl stets <mark>ungerade</mark>, damit Abstimmungen im Betriebsrat nicht unentschieden ausgehen."
        },
        {
          "nr": 15,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Betriebsvereinbarung und Tarifvertrag werden ständig verwechselt – die Unterlagen behandeln beide, aber in getrennten Themenblöcken.",
          "frage": "Zusatzwissen: Welche <b>zwei</b> Aussagen zur Abgrenzung von Tarifvertrag und Betriebsvereinbarung sind richtig?",
          "antworten": [
            "Den Tarifvertrag schließen Gewerkschaft und Arbeitgeber bzw. Arbeitgeberverband.",
            "Die Betriebsvereinbarung schließen Betriebsrat und Arbeitgeber für den einzelnen Betrieb.",
            "Die Betriebsvereinbarung steht im Rang über dem Tarifvertrag.",
            "Der Tarifvertrag gilt nur für einen einzelnen Betrieb, die Betriebsvereinbarung für eine ganze Branche.",
            "Betriebsvereinbarungen dürfen Arbeitsentgelte regeln, die bereits durch Tarifvertrag geregelt sind."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Der <b>Tarifvertrag</b> wird zwischen <b>Gewerkschaft</b> und <b>Arbeitgeber bzw. Arbeitgeberverband</b> geschlossen und gilt meist für eine ganze <b>Branche oder Region</b>. Die <b>Betriebsvereinbarung</b> wird zwischen <b>Betriebsrat</b> und <b>Arbeitgeber</b> geschlossen und gilt für den <mark>einzelnen Betrieb</mark>. C kehrt die Rangfolge um – der Tarifvertrag steht <b>über</b> der Betriebsvereinbarung. D vertauscht die Reichweiten. E ist falsch: Nach dem <b>Tarifvorbehalt</b> des <b>§ 77 Abs. 3 BetrVG</b> dürfen Arbeitsentgelte und sonstige Arbeitsbedingungen, die durch Tarifvertrag geregelt sind oder üblicherweise geregelt werden, <mark>nicht</mark> Gegenstand einer Betriebsvereinbarung sein."
        },
        {
          "nr": 16,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Für die JAV nennen die Unterlagen eine Altersgrenze, die so nur für die Wählbarkeit gilt – die Unterscheidung ist prüfungsrelevant und korrigiert eine verbreitete Verwechslung.",
          "frage": "Zusatzwissen: Welche <b>zwei</b> Aussagen zur Jugend- und Auszubildendenvertretung sind richtig?",
          "antworten": [
            "Eine JAV wird gewählt, wenn im Betrieb mindestens fünf Arbeitnehmer unter 18 Jahren oder zur Berufsausbildung Beschäftigte tätig sind.",
            "Wählbar ist, wer das 25. Lebensjahr noch nicht vollendet hat oder zur Berufsausbildung beschäftigt ist.",
            "Die JAV hat eigene Mitbestimmungsrechte gegenüber dem Arbeitgeber und kann die Einigungsstelle anrufen.",
            "Eine JAV wird erst ab 25 jugendlichen Beschäftigten gebildet.",
            "Betriebsratsmitglieder können gleichzeitig in die JAV gewählt werden."
          ],
          "loesung": [1, 2],
          "negativ": false,
          "begruendung": "Richtig sind A und B. Nach <b>§ 60 Abs. 1 BetrVG</b> wird eine JAV gewählt in Betrieben mit <b>mindestens fünf</b> Arbeitnehmern, die das <b>18. Lebensjahr noch nicht vollendet</b> haben <mark>oder</mark> die <b>zu ihrer Berufsausbildung beschäftigt</b> sind. <b>Wählbar</b> ist nach <b>§ 61 Abs. 2 BetrVG</b>, wer das <b>25. Lebensjahr noch nicht vollendet</b> hat oder in Berufsausbildung steht. <mark>Achtung:</mark> Die Unterrichtsunterlagen nennen die Grenze „unter 25 Jahren“ schon beim <b>Schwellenwert</b> – dort gilt sie nicht, sondern erst bei der <b>Wählbarkeit</b>. C ist falsch: Die JAV hat <mark>kein eigenes</mark> Mitbestimmungsrecht und arbeitet über den Betriebsrat. D nennt eine erfundene Schwelle. E ist falsch – Betriebsratsmitglieder sind nicht in die JAV wählbar."
        },
        {
          "nr": 17,
          "typ": "auswahl",
          "lernziel": null,
          "zusatz": true,
          "zusatzGrund": "Arbeitskampf und Schlichtung gehören zum selben Themenfeld wie Tarif und Mitbestimmung, fehlen in den Unterlagen aber vollständig.",
          "frage": "Zusatzwissen: Welche <b>drei</b> Aussagen zum Arbeitskampf sind richtig?",
          "antworten": [
            "Während der Laufzeit eines Tarifvertrags gilt für die geregelten Gegenstände die Friedenspflicht.",
            "Zu einem rechtmäßigen Streik darf nur eine Gewerkschaft aufrufen.",
            "Die Aussperrung ist das Arbeitskampfmittel der Arbeitgeberseite.",
            "Der Betriebsrat darf zum Streik aufrufen, wenn die Einigungsstelle scheitert.",
            "Ein Streik ist auch zulässig, um politische Forderungen an die Regierung durchzusetzen."
          ],
          "loesung": [1, 2, 3],
          "negativ": false,
          "begruendung": "Richtig sind A, B und C. Die <b>Friedenspflicht</b> folgt aus der <b>Friedensfunktion</b> des Tarifvertrags: Solange er läuft, darf über die darin geregelten Gegenstände nicht gestreikt werden. Zum rechtmäßigen <b>Streik</b> darf nur eine <b>Gewerkschaft</b> aufrufen – ein „wilder Streik“ der Belegschaft ist rechtswidrig. Das Gegenstück auf Arbeitgeberseite ist die <b>Aussperrung</b>. D ist falsch: Der <b>Betriebsrat</b> ist zur <b>vertrauensvollen Zusammenarbeit</b> verpflichtet und darf nicht zum Arbeitskampf aufrufen; bei Scheitern entscheidet die <b>Einigungsstelle</b>. E ist falsch – <b>politische Streiks</b> sind in Deutschland unzulässig, der Arbeitskampf muss ein <b>tariflich regelbares Ziel</b> verfolgen. Vor dem Arbeitskampf steht häufig die <b>Schlichtung</b>."
        }
      ]
    }
  ],
  "merkzettel": {
    "fristen": [
      [
        "2 Wochen",
        "Kündigungsfrist in der Probezeit (§ 622 Abs. 3 BGB) – und Frist für die außerordentliche Kündigung ab Kenntnis (§ 626 Abs. 2 BGB)"
      ],
      [
        "4 Wochen",
        "Grundkündigungsfrist des Arbeitnehmers zum 15. oder zum Monatsende (§ 622 Abs. 1 BGB). <b>Genau 28 Tage – kein Monat!</b>"
      ],
      [
        "§ 622 Abs. 2 BGB",
        "Arbeitgeberfristen zum Monatsende: 2 Jahre → 1 Monat, 5 Jahre → 2 Monate, 8 Jahre → 3 Monate, 10 Jahre → 4 Monate, 12 → 5, 15 → 6, 20 Jahre → 7 Monate"
      ],
      [
        "3 Wochen",
        "Frist für die Kündigungsschutzklage ab Zugang der Kündigung (§ 4 KSchG) – danach gilt die Kündigung als wirksam (§ 7 KSchG)"
      ],
      [
        "6 Wochen",
        "Entgeltfortzahlung im Krankheitsfall durch den Arbeitgeber (§ 3 Abs. 1 EFZG), danach Krankengeld der Krankenkasse"
      ],
      [
        "4 Wochen",
        "Wartezeit, bevor der Anspruch auf Entgeltfortzahlung entsteht (§ 3 Abs. 3 EFZG)"
      ],
      [
        "mehr als 3 Kalendertage",
        "Ab dann muss die Arbeitsunfähigkeitsbescheinigung spätestens am darauffolgenden Arbeitstag vorliegen – der Arbeitgeber darf sie früher verlangen (§ 5 EFZG)"
      ],
      [
        "6 Monate",
        "Wartezeit für den allgemeinen Kündigungsschutz (§ 1 KSchG), für den vollen Urlaubsanspruch (§ 4 BUrlG) und für die Wählbarkeit in den Betriebsrat (§ 8 BetrVG)"
      ],
      [
        "24 Werktage",
        "Gesetzlicher Mindesturlaub (§ 3 BUrlG) – bei Fünf-Tage-Woche 20 Arbeitstage; Übertragung nur bis 31. März (§ 7 Abs. 3 BUrlG)"
      ],
      [
        "30 / 27 / 25 Werktage",
        "Urlaub Jugendlicher nach dem Alter zu Jahresbeginn: unter 16 / unter 17 / unter 18 Jahren (§ 19 Abs. 2 JArbSchG)"
      ],
      [
        "8 bzw. 10 Stunden",
        "Werktägliche Höchstarbeitszeit; 10 Stunden nur, wenn im Schnitt über 6 Monate oder 24 Wochen 8 Stunden eingehalten werden (§ 3 ArbZG)"
      ],
      [
        "30 / 45 Minuten",
        "Ruhepausen bei mehr als 6 bis 9 Stunden bzw. mehr als 9 Stunden Arbeitszeit (§ 4 ArbZG); Ruhezeit danach mindestens 11 Stunden (§ 5 ArbZG)"
      ],
      [
        "1 bis 4 Monate",
        "Probezeit im Berufsausbildungsverhältnis (§ 20 BBiG) – nicht mit den 6 Monaten des Arbeitsverhältnisses verwechseln"
      ],
      [
        "4 Wochen",
        "Kündigungsfrist des Auszubildenden nach der Probezeit bei Berufsaufgabe oder Berufswechsel, schriftlich mit Grund (§ 22 BBiG)"
      ],
      [
        "25.000 €",
        "Mindeststammkapital der GmbH (§ 5 Abs. 1 GmbHG); bei der Anmeldung müssen mindestens 12.500 € eingezahlt sein (§ 7 Abs. 2 GmbHG)"
      ],
      [
        "50.000 €",
        "Mindestgrundkapital der AG (§ 7 AktG). UG: ab 1 €, dafür volle Einzahlung und 25 % Rücklage (§ 5a GmbHG)"
      ],
      [
        "13,90 € · Stand 2026",
        "Gesetzlicher Mindestlohn je Zeitstunde seit 1. Januar 2026 (2025: 12,82 €; ab 2027: 14,60 €)"
      ],
      [
        "603 € · Stand 2026",
        "Minijob-Grenze im Monat – dynamisch an den Mindestlohn gekoppelt"
      ],
      [
        "724 € · Stand 2026",
        "Mindestausbildungsvergütung im 1. Ausbildungsjahr; Aufschläge +18 % / +35 % / +40 % im 2. / 3. / 4. Jahr"
      ],
      [
        "5 Arbeitnehmer",
        "Schwelle für den Betriebsrat, davon 3 wählbar (§ 1 BetrVG) – und für die JAV (§ 60 BetrVG)"
      ],
      [
        "16 / 18 Jahre",
        "Aktives Wahlrecht zum Betriebsrat ab 16 (§ 7 BetrVG), passives ab 18 plus 6 Monate Betriebszugehörigkeit (§ 8 BetrVG); Wahl alle 4 Jahre (§ 13 BetrVG)"
      ],
      [
        "1 Woche / 3 Tage",
        "Äußerungsfrist des Betriebsrats bei ordentlicher bzw. außerordentlicher Kündigung; ohne Anhörung ist die Kündigung unwirksam (§ 102 BetrVG)"
      ],
      [
        "500 / 2.000 / 1.000 Beschäftigte",
        "Drittelbeteiligungsgesetz (500–2.000) · Mitbestimmungsgesetz 1976 (über 2.000) · Montan-Mitbestimmung (über 1.000, nur Kohle, Eisen, Stahl)"
      ],
      [
        "über 10 Arbeitnehmer",
        "Ab dieser Betriebsgröße gilt das Kündigungsschutzgesetz für seit 2004 Eingestellte (§ 23 KSchG)"
      ],
      [
        "250 Mitarbeitende",
        "Grenze zum Großbetrieb; Kleinbetrieb rund 10–50, Mittelbetrieb rund 50–250"
      ]
    ],
    "begriffe": [
      [
        "§ 1 HGB",
        "Istkaufmann",
        "betreibt ein Handelsgewerbe – Kaufmann <b>auch ohne</b> Eintragung"
      ],
      [
        "§ 2, § 3 HGB",
        "Kannkaufmann",
        "Kleingewerbe oder Land- und Forstwirtschaft – Kaufmann erst durch <b>freiwillige</b> Eintragung"
      ],
      [
        "§ 6 HGB",
        "Formkaufmann",
        "Kaufmann <b>kraft Rechtsform</b>, z. B. GmbH, UG und AG"
      ],
      [
        "§ 5 HGB",
        "Fiktivkaufmann",
        "eingetragen, obwohl keine Eintragungspflicht bestand"
      ],
      [
        "§§ 48, 49 HGB",
        "Prokura",
        "umfassendste Vollmacht, nur vom <b>Kaufmann</b>, mit HR-Eintrag, Zeichnung „ppa.“ – Grundstücke nur mit Sondervollmacht"
      ],
      [
        "§ 54 HGB",
        "Handlungsvollmacht",
        "nur <b>gewöhnliche</b> Geschäfte, kein HR-Eintrag; Darlehen, Grundstücke und Prozesse nur mit besonderer Ermächtigung"
      ],
      [
        "§ 15 HGB",
        "Publizität",
        "eingetragene Tatsachen gelten; <b>nicht</b> eingetragene können Gutgläubigen nicht entgegengehalten werden"
      ],
      [
        "§ 622 BGB",
        "Kündigungsfristen",
        "Probezeit 2 Wochen · Arbeitnehmer 4 Wochen zum 15. oder Monatsende · Arbeitgeber gestaffelt nach Betriebszugehörigkeit"
      ],
      [
        "§ 623 BGB",
        "Schriftform der Kündigung",
        "eigenhändig unterschrieben – <b>elektronische Form ausgeschlossen</b>; gilt auch für den Aufhebungsvertrag"
      ],
      [
        "§ 626 BGB",
        "Außerordentliche Kündigung",
        "wichtiger Grund <b>und</b> Unzumutbarkeit; nur innerhalb von 2 Wochen ab Kenntnis"
      ],
      [
        "§ 1 Abs. 3 KSchG",
        "Sozialauswahl",
        "Lebensalter · Betriebszugehörigkeit · Unterhaltspflichten · Schwerbehinderung – <b>nicht</b> die Gehaltshöhe"
      ],
      [
        "§ 3 EFZG",
        "Entgeltfortzahlung",
        "6 Wochen bei <b>unverschuldeter</b> Arbeitsunfähigkeit, nach 4 Wochen Wartezeit"
      ],
      [
        "§ 3 BUrlG",
        "Mindesturlaub",
        "24 Werktage = 20 Arbeitstage bei Fünf-Tage-Woche"
      ],
      [
        "§ 20 BBiG",
        "Probezeit",
        "mindestens 1, höchstens 4 Monate – in der Probezeit jederzeit fristlos kündbar"
      ],
      [
        "§ 21 BBiG",
        "Ende der Ausbildung",
        "mit Ablauf der Ausbildungszeit oder schon mit <b>Bekanntgabe</b> des Prüfungsergebnisses"
      ],
      [
        "§ 1 BetrVG",
        "Errichtung des Betriebsrats",
        "ab 5 ständigen wahlberechtigten Arbeitnehmern, davon 3 wählbar"
      ],
      [
        "§ 9 BetrVG",
        "Größe des Betriebsrats",
        "5–20 → 1 Person · 21–50 → 3 · 51–100 → 5 · 101–200 → 7 · 201–400 → 9 Mitglieder"
      ],
      [
        "§ 87 BetrVG",
        "Echte Mitbestimmung",
        "u. a. Arbeitszeit und Wochentage (Nr. 2) und Urlaubsgrundsätze (Nr. 5); ohne Einigung entscheidet die <b>Einigungsstelle</b>"
      ],
      [
        "§ 102 BetrVG",
        "Anhörung vor Kündigung",
        "ohne Anhörung des Betriebsrats ist die Kündigung <b>unwirksam</b>"
      ],
      [
        "§ 60, § 61 BetrVG",
        "JAV",
        "Schwelle: 5 Arbeitnehmer unter 18 oder in Berufsausbildung · wählbar: unter 25 oder in Berufsausbildung · <b>kein</b> eigenes Mitbestimmungsrecht"
      ],
      [
        "§ 1 GWB",
        "Kartellverbot",
        "auch <b>abgestimmte Verhaltensweisen</b> sind verboten, nicht nur schriftliche Verträge"
      ],
      [
        "§ 1 StabG",
        "Magisches Viereck",
        "Preisniveaustabilität · hoher Beschäftigungsstand · außenwirtschaftliches Gleichgewicht · stetiges Wachstum"
      ],
      [
        "§ 1 AGG",
        "Benachteiligungsverbot",
        "Rasse, ethnische Herkunft, Geschlecht, Religion/Weltanschauung, Behinderung, Alter, sexuelle Identität"
      ]
    ],
    "verwechslungen": [
      [
        "Prokura vs. Handlungsvollmacht",
        "<b>Prokura</b>: umfassend, nur vom Kaufmann, <b>mit</b> HR-Eintrag, Beschränkungen gegenüber Dritten unwirksam. <b>Handlungsvollmacht</b>: nur gewöhnliche Geschäfte, <b>ohne</b> HR-Eintrag. Grundstücksgeschäfte brauchen <mark>bei beiden</mark> eine Sondervollmacht."
      ],
      [
        "Tarifvertrag vs. Betriebsvereinbarung",
        "<b>Tarifvertrag</b>: Gewerkschaft ↔ Arbeitgeber(verband), gilt für Branche oder Region. <b>Betriebsvereinbarung</b>: Betriebsrat ↔ Arbeitgeber, gilt für <mark>einen</mark> Betrieb. Der Tarifvertrag steht im Rang darüber (Tarifvorbehalt, § 77 Abs. 3 BetrVG)."
      ],
      [
        "Kündigungsfrist vs. Kündigungstermin",
        "Die <b>Frist</b> ist die Dauer (z. B. 2 Monate), der <b>Termin</b> der erlaubte Endzeitpunkt (z. B. zum Monatsende). Erst beides zusammen ergibt das Datum. <b>4 Wochen = 28 Tage ≠ 1 Monat.</b>"
      ],
      [
        "Absatz vs. Umsatz",
        "<b>Absatz</b> = verkaufte <mark>Menge</mark>. <b>Umsatz</b> = Absatz × Preis, also ein <mark>Wert</mark>."
      ],
      [
        "Minimalprinzip vs. Maximalprinzip",
        "<b>Minimalprinzip</b>: Ziel fest → Aufwand minimieren. <b>Maximalprinzip</b>: Aufwand fest → Ertrag maximieren. Immer fragen: Was ist vorgegeben?"
      ],
      [
        "Produktivität vs. Wirtschaftlichkeit vs. Rentabilität",
        "<b>Produktivität</b> = Menge ÷ Menge. <b>Wirtschaftlichkeit</b> = Ertrag ÷ Aufwand (Wertgrößen). <b>Rentabilität</b> = Gewinn ÷ Kapital × 100."
      ],
      [
        "Kooperation vs. Konzentration",
        "<b>Kooperation</b>: rechtliche <mark>und</mark> wirtschaftliche Selbstständigkeit bleiben. <b>Konzentration</b>: die wirtschaftliche Selbstständigkeit geht komplett verloren."
      ],
      [
        "Konzern vs. Fusion",
        "<b>Konzern</b>: rechtlich selbstständig, wirtschaftlich unter einheitlicher Leitung. <b>Fusion</b>: Verschmelzung – <mark>beide</mark> Formen der Selbstständigkeit gehen verloren."
      ],
      [
        "horizontal vs. vertikal vs. konglomerat",
        "<b>Horizontal</b> = gleiche Wirtschaftsstufe (nebeneinander). <b>Vertikal</b> = aufeinanderfolgende Stufen (hintereinander). <b>Konglomerat/lateral</b> = völlig verschiedene Branchen."
      ],
      [
        "Monopol vs. Oligopol vs. Polypol",
        "<b>Monopol</b>: ein Anbieter, größter Preisspielraum. <b>Oligopol</b>: wenige Anbieter, Reaktionsverbundenheit, Preiskampfgefahr. <b>Polypol</b>: viele Anbieter, der Einzelne ist <b>Preisnehmer</b>."
      ],
      [
        "Gesellschaftsordnung vs. Wirtschaftsordnung",
        "<b>Gesellschaftsordnung</b> = Fundament (Grundgesetz: Demokratie, Freiheit, Sozialstaat). <b>Wirtschaftsordnung</b> = Umsetzung (in Deutschland die Soziale Marktwirtschaft)."
      ],
      [
        "Geldstrom vs. Güterstrom",
        "<b>Güterstrom</b>: Waren, Dienstleistungen, Arbeitsleistung. <b>Geldstrom</b>: Einkommen, Konsumausgaben. Beide laufen stets <mark>gegenläufig</mark>."
      ],
      [
        "Werkstoffe vs. Betriebsmittel",
        "<b>Werkstoffe</b> gehen ins Produkt ein oder werden verbraucht: Roh-, Hilfs- und <mark>Betriebsstoffe</mark> (Strom!). <b>Betriebsmittel</b> werden langfristig genutzt: Maschinen, Fahrzeuge, Gebäude."
      ],
      [
        "Say vs. Gutenberg",
        "<b>Say</b> (volkswirtschaftlich): Arbeit, <mark>Boden</mark>, Kapital. <b>Gutenberg</b> (betriebswirtschaftlich): Arbeit, Werkstoffe, Betriebsmittel plus <b>dispositiver Faktor</b> – kein Boden."
      ],
      [
        "Istkaufmann vs. Kannkaufmann vs. Formkaufmann",
        "<b>Ist</b>: Handelsgewerbe, automatisch, auch ohne Eintragung. <b>Kann</b>: Kleingewerbe oder Landwirtschaft, erst <mark>durch</mark> Eintragung. <b>Form</b>: kraft Rechtsform (GmbH, AG)."
      ],
      [
        "Komplementär vs. Kommanditist",
        "<b>Komplementär</b>: haftet unbeschränkt, führt die Geschäfte. <b>Kommanditist</b>: haftet nur bis zur Einlage, keine Geschäftsführung. Merksatz: <b>Wer voll haftet, darf führen.</b>"
      ],
      [
        "Fortbildung vs. Umschulung",
        "<b>Fortbildung</b>: <mark>gleiches</mark> Berufsfeld vertiefen (Kaufmann → Fachwirt). <b>Umschulung</b>: neuer Abschluss im <mark>anderen</mark> Berufsfeld (Verkäufer → Industriekaufmann)."
      ],
      [
        "Probezeit BBiG vs. Arbeitsverhältnis",
        "<b>Ausbildung</b>: 1 bis 4 Monate (§ 20 BBiG). <b>Arbeitsverhältnis</b>: längstens 6 Monate mit 2 Wochen Frist (§ 622 Abs. 3 BGB)."
      ],
      [
        "einfaches vs. qualifiziertes Zeugnis",
        "<b>Einfach</b>: Art der Tätigkeit, Dauer, Ort. <b>Qualifiziert</b>: zusätzlich <b>Leistung</b> und <b>Verhalten</b> – nur auf Verlangen."
      ],
      [
        "Arbeitsgericht vs. Sozialgericht",
        "<b>Arbeitsgericht</b>: Streit mit dem <mark>Arbeitgeber</mark> (Kündigung, Lohn, Zeugnis, Abmahnung). <b>Sozialgericht</b>: Streit mit <mark>Sozialversicherungsträgern</mark> (Krankengeld, Rente, Arbeitslosengeld, Pflegegrad)."
      ],
      [
        "aktives vs. passives Wahlrecht",
        "<b>Wählen</b> darf man zum Betriebsrat ab <b>16</b>, <b>gewählt werden</b> ab <b>18</b> plus 6 Monate Betriebszugehörigkeit. Leitende Angestellte sind nicht wählbar."
      ],
      [
        "betriebliche vs. unternehmerische Mitbestimmung",
        "<b>Betrieblich</b>: im Betrieb über den <b>Betriebsrat</b> (BetrVG). <b>Unternehmerisch</b>: im Unternehmen über den <b>Aufsichtsrat</b> (DrittelbG, MitbestG, Montan)."
      ],
      [
        "Mitbestimmung vs. Mitwirkung",
        "<b>Mitbestimmung</b> (echte, § 87 BetrVG): ohne Zustimmung geht nichts – Arbeitszeit, Urlaub, Pausen, Überstunden. <b>Mitwirkung</b>: Anhörung und Beteiligung, etwa bei Einstellungen und Kündigungen."
      ]
    ],
    "rechenschemata": [
      [
        "Umsatz",
        "Umsatz = <b>Absatz × Preis</b>. Gegenprobe: Umsatz ÷ Preis = Absatz."
      ],
      [
        "Produktivität",
        "Produktivität = <b>Ausbringungsmenge ÷ Faktoreinsatzmenge</b>, z. B. 320 Stück ÷ 8 Beschäftigte = 40 Stück je Kopf."
      ],
      [
        "Wirtschaftlichkeit",
        "Wirtschaftlichkeit = <b>Ertrag ÷ Aufwand</b>. Über 1 bedeutet wirtschaftliches Arbeiten."
      ],
      [
        "Eigenkapitalrentabilität",
        "Rentabilität = <b>Gewinn ÷ Eigenkapital × 100</b> (Angabe in Prozent)."
      ],
      [
        "Marktgleichgewicht",
        "Der <b>Gleichgewichtspreis</b> ist der Preis, bei dem Angebot = Nachfrage. Darunter Nachfrageüberhang (Preis steigt), darüber Angebotsüberhang (Preis fällt)."
      ],
      [
        "Gewinnverteilung OHG (Schema des Arbeitsblatts)",
        "1. <b>4 % Kapitalverzinsung</b> auf jede Einlage. 2. Restgewinn = Gewinn − Summe der Verzinsungen. 3. Rest <b>nach Köpfen</b> teilen. 4. Je Gesellschafter addieren. Gegenprobe: Summe aller Anteile = Gewinn. <b>Hinweis:</b> Seit 1.1.2024 gilt gesetzlich § 120 HGB i. V. m. § 709 Abs. 3 BGB – Verteilung nach den vereinbarten Beteiligungsverhältnissen."
      ],
      [
        "Urlaub bei Fünf-Tage-Woche",
        "<b>24 Werktage ÷ 6 × 5 = 20 Arbeitstage</b>. Gegenprobe: 20 ÷ 5 × 6 = 24 – beides sind vier Urlaubswochen."
      ],
      [
        "Kündigungstermin",
        "1. <b>Betriebszugehörigkeit</b> bestimmen. 2. <b>Frist</b> aus § 622 Abs. 2 BGB ablesen. 3. Frist ab <b>Zugang</b> abzählen. 4. Auf den erlaubten <b>Termin</b> (Monatsende bzw. 15.) weiterrücken. Gegenprobe: Vom Endtermin die Frist zurückrechnen – der Zugang muss davor liegen."
      ],
      [
        "GmbH-Gründung",
        "Stammkapital <b>25.000 €</b>; bei der Anmeldung je Geschäftsanteil ein Viertel und insgesamt mindestens die <b>Hälfte = 12.500 €</b>. UG: Stammkapital voll einzahlen, 25 % Rücklage."
      ],
      [
        "Mindestausbildungsvergütung (Stand 2026)",
        "1. Jahr <b>724 €</b>; 2. Jahr +18 % = 854 €; 3. Jahr +35 % = 977 €; 4. Jahr +40 % = 1.014 €. Jeweils gerechnet auf den Satz des ersten Jahres."
      ]
    ],
    "tipp": "Lesen Sie zuerst die <b>Frage</b>, dann erst den Sachverhalt – so wissen Sie beim Lesen schon, worauf Sie achten müssen. Markieren Sie die Signalwörter: <mark>nicht</mark> und <mark>falsch</mark> kehren die Aufgabe um, und eine Angabe wie „Welche <b>zwei</b> …“ verrät die Zahl der Kreuze. Rund ein Fünftel aller Auswahlfragen in diesem Quiz sind solche Negativfragen. Bei Rechenaufgaben lohnt sich immer die <b>Gegenprobe</b>: zurückrechnen und prüfen, ob der Ausgangswert herauskommt. Und bei Datumsaufgaben <b>Frist und Termin trennen</b> – erst die Dauer abzählen, dann auf den nächsten erlaubten Termin rücken. Eine Aufgabe zählt nur, wenn <b>alles</b> stimmt."
  }
};
