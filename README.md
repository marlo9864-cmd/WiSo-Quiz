# WiSo-Quiz

Wirtschafts- und Sozialkunde als Quiz für Handy und PC – 154 praxisbezogene Aufgaben zu den sieben
Themenblöcken des Umschulungskurses. Vorbereitung auf die Tests im Kurs und auf den Prüfungsbereich
WiSo der IHK-Abschlussprüfung Teil 2. Wie in der Prüfung können mehrere Antworten richtig sein; nach
jeder Frage kommen Lösung und Begründung mit Rechtsgrundlage. Das Quiz läuft komplett im Browser,
auch ohne Internet.

**Adresse:** https://marlo9864-cmd.github.io/WiSo-Quiz/

**Stand der Inhalte:** 10/2026

## Funktionen

- 154 Aufgaben in sieben Kapiteln; die Aufgaben aus den Arbeitsblättern behalten ihre Originalnummer
- Vier Aufgabentypen wie in der IHK-Prüfung: **Auswahl** (117), **Zuordnung** (23), **Reihenfolge** (5)
  und **Eingabe** von Zahl oder Datum (9)
- Jede Frage prüft genau ein Lernziel – die Lernziel-Nummer steht in der Kopfzeile, nach dem Prüfen
  steht der Wortlaut unter der Begründung
- **Lernziel-Check:** alle 46 Lernziele mit deinem Stand, die schwächsten zuerst; ein Lernziel antippen
  übt nur dessen Fragen
- Auswahl: alle Kapitel, ein einzelnes Kapitel, nur die Fehler aus dem letzten Durchgang oder nur
  Zusatzwissen; Schalter „Zusatzwissen einbeziehen“ und „Reihenfolge mischen“
- Nach jeder Frage: richtige, falsche und vergessene Kreuze, dazu die Begründung mit Rechtsgrundlage
- Auswertung je Kapitel, dazu die Lernziele, bei denen Fehler waren, und „Fehler wiederholen“
- Lösungen durchblättern, Merkzettel mit Fristen, Begriffen, Verwechslungen und Rechenschemata
- PDF mit Fragen, Lösungsblatt, Lernziel-Übersicht und Merkzettel zum Ausdrucken
- Der Fortschritt bleibt erhalten, auch wenn die App zwischendurch geschlossen wird

## Auf dem iPhone installieren (ohne App Store)

1. Adresse in **Safari** öffnen.
2. Unten auf **Teilen** (Quadrat mit Pfeil) tippen → **„Zum Home-Bildschirm“** → **Hinzufügen**.
3. Das Quiz startet vom Home-Bildschirm im Vollbild und funktioniert **auch ohne Internet**.

Auf Android: Menü → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.

## Daten

Der Fortschritt liegt nur im Browser-Speicher (localStorage) des jeweiligen Geräts – kein Server, keine
Anmeldung, kein Tracking. Handy und PC haben deshalb jeweils einen eigenen Stand. Die Schriften liegen
im Repository; die Seite lädt nichts von Google Fonts oder anderen fremden Servern.

Das Datenschutz-Quiz liegt auf derselben Adresse (`marlo9864-cmd.github.io`) und teilt sich daher
Speicher und Cache mit diesem Quiz. Damit sich die beiden Apps nicht in die Quere kommen, benutzt das
WiSo-Quiz den eigenen Speicher-Schlüssel `wiso-quiz:v1` und das Cache-Präfix `wiso-quiz-`; der Service
Worker löscht beim Aktualisieren ausschließlich Caches mit diesem Präfix.

## Offline und Updates

Beim ersten Besuch legt der Service Worker (`web/sw.js`) alle Dateien im Gerätespeicher ab. Mit Internet
holt das Quiz immer die aktuelle Version, ohne Internet die gespeicherte. Änderungen sind nach dem
Veröffentlichen also beim nächsten Öffnen da.

## Lernziel-Abdeckung

Die Lernziele stammen wörtlich von den Lernziel-Folien der Unterrichtsunterlagen. Wo ein inhaltlicher
Block keinem genannten Lernziel zuzuordnen war, ist ein Lernziel abgeleitet und als solches markiert –
in der App, im PDF und in der Spalte „Wortlaut“ unten. Die Aufgabennummern stehen als
`Kapitel.Aufgabe`.

### Kapitel 1 · Der Betrieb

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 1.1 | den Begriff Betrieb definieren | 1.1, 1.2, 1.3 | 3 |
| 1.2 | Betriebe nach verschiedenen Kriterien einteilen | 1.4, 1.5, 1.6 | 3 |
| 1.3 | betriebliche Produktionsfaktoren erläutern | 1.7, 1.8, 1.9 | 3 |
| 1.4 | Umsatz und Absatz unterscheiden | 1.10, 1.11, 1.12 | 3 |
| 1.5 | zwischenbetriebliche Zusammenarbeit erklären | 1.13, 1.14, 1.15 | 3 |
| 1.6 | prüfungsnahe Aufgaben sicher bearbeiten | 1.16, 1.17, 1.18 | 3 |

### Kapitel 2 · Die Stellung des Betriebs in Wirtschaft und Gesellschaft

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 2.1 | den Begriff Gesellschafts-/Wirtschaftsordnung erklären | 2.1, 2.2, 2.3 | 3 |
| 2.2 | die Grundidee der Sozialen Marktwirtschaft erläutern | 2.4, 2.5, 2.6 | 3 |
| 2.3 | die Aufgaben und Ziele von Betrieben nennen | 2.7, 2.8, 2.9 | 3 |
| 2.4 | den einfachen Wirtschaftskreislauf erklären | 2.10, 2.11, 2.12 | 3 |
| 2.5 | den erweiterten Wirtschaftskreislauf mit Staat und Banken beschreiben | 2.13, 2.14 | 2 |
| 2.6 | die volkswirtschaftliche Bedeutung von Betrieben erklären | 2.15, 2.16, 2.17 | 3 |

### Kapitel 3 · Marktstrukturen und Preisbildung

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 3.1 | Wettbewerb verstehen | 3.4, 3.5 | 2 |
| 3.2 | Arbeitsteilung in der Wirtschaft erklären | 3.6, 3.7, 3.8 | 3 |
| 3.3 | Preisbildung im Polypol verstehen und beschreiben | 3.1, 3.9, 3.10 | 3 |
| 3.4 | Kooperation und Kartelle unterscheiden | 3.11, 3.12, 3.13 | 3 |
| 3.5 | Unternehmenskonzentration erklären | 3.14, 3.15, 3.16 | 3 |
| 3.6 | Ziele der staatlichen Wettbewerbspolitik verstehen | 3.17, 3.18 | 2 |
| 3.7 | Marktformen – Monopol, Oligopol und Polypol – unterscheiden und Marktsituationen zuordnen *(abgeleitet)* | 3.2, 3.3, 3.19 | 3 |

### Kapitel 4 · Handelsrecht und Unternehmensgründung

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 4.1 | die Bedeutung des Handelsrechts erklären | 4.9, 4.10 | 2 |
| 4.2 | die Kaufmannseigenschaft nach HGB unterscheiden | 4.1, 4.6, 4.8, 4.11, 4.12 | 5 |
| 4.3 | Handelsregister und Firma erklären | 4.2, 4.13, 4.14, 4.15, 4.16, 4.17 | 6 |
| 4.4 | handelsrechtliche Vollmachten unterscheiden | 4.3, 4.5, 4.19 | 3 |
| 4.5 | Unternehmensformen vergleichen | 4.4, 4.7, 4.20 | 3 |
| 4.6 | Voraussetzungen einer Unternehmensgründung nennen | 4.21, 4.22 | 2 |
| 4.7 | Aufbau eines Businessplans erklären | 4.23, 4.24 | 2 |
| 4.8 | prüfungsnahe Fälle bearbeiten | 4.18, 4.25 | 2 |

### Kapitel 5 · Rechte von Beschäftigten

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 5.1 | Sie können die wichtigsten Rechtsquellen des Arbeitsrechts richtig einordnen. | 5.1, 5.2, 5.3 | 3 |
| 5.2 | Sie verstehen Aufbau und Bedeutung eines Arbeitsvertrages. | 5.4, 5.5, 5.6 | 3 |
| 5.3 | Sie kennen Kündigungsarten, Fristen und besonderen Kündigungsschutz. | 5.7, 5.8, 5.9, 5.10, 5.11, 5.12 | 6 |
| 5.4 | Sie unterscheiden einfaches und qualifiziertes Arbeitszeugnis. | 5.13, 5.14 | 2 |
| 5.5 | Sie wissen, wann Arbeitsgericht oder Sozialgericht zuständig ist. | 5.15, 5.16 | 2 |
| 5.6 | Personalbeschaffung intern und extern unterscheiden | 5.17, 5.18, 5.19 | 3 |
| 5.7 | Tarifverträge und ihre Funktionen erklären | 5.20, 5.21, 5.22 | 3 |
| 5.8 | Fürsorgepflicht, Verschwiegenheitspflicht und Entgeltfortzahlung im Krankheitsfall anwenden *(abgeleitet)* | 5.23, 5.24, 5.25 | 3 |

### Kapitel 6 · Die Berufsausbildung

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 6.1 | das System der dualen Ausbildung erklären können | 6.1, 6.3, 6.5 | 3 |
| 6.2 | die wichtigsten Rechtsgrundlagen der Berufsausbildung kennen | 6.2, 6.11 | 2 |
| 6.3 | zwischen BBiG, Ausbildungsordnung und Ausbildungsrahmenplan unterscheiden | 6.12, 6.13 | 2 |
| 6.4 | Inhalte eines Berufsausbildungsvertrags benennen können | 6.8, 6.14 | 2 |
| 6.5 | Rechte und Pflichten von Ausbildenden und Auszubildenden anwenden können | 6.4, 6.9, 6.10 | 3 |
| 6.6 | Berufsausbildung, Fortbildung, Umschulung und Berufsvorbereitung unterscheiden *(abgeleitet)* | 6.6, 6.7 | 2 |

### Kapitel 7 · Betriebliche Mitbestimmung

| Lernziel | Wortlaut | Aufgaben | Anzahl |
|---|---|---|---|
| 7.1 | die Funktion des Betriebsverfassungsrechts verstehen | 7.8, 7.9 | 2 |
| 7.2 | zentrale Inhalte des Betriebsverfassungsgesetzes erklären können | 7.1, 7.3, 7.4 | 3 |
| 7.3 | Aufgaben von Betriebsrat und JAV unterscheiden | 7.5, 7.6, 7.7 | 3 |
| 7.4 | unternehmerische Mitbestimmung erläutern | 7.10, 7.11 | 2 |
| 7.5 | Mitbestimmungsformen im Aufsichtsrat kennen | 7.2, 7.12 | 2 |

## Zusatzwissen

24 der 154 Aufgaben (15,6 %) prüfen kein Lernziel aus den Unterlagen, sondern schließen eine Lücke im
selben Themengebiet, die in der IHK-WiSo-Prüfung vorkommt. In der App sind sie mit „Zusatzwissen“
gekennzeichnet, lassen sich über „Nur Zusatzwissen“ gezielt üben und über den Schalter „Zusatzwissen
einbeziehen“ ganz ausblenden. Im PDF stehen sie in Teil C am Ende der Lernziel-Übersicht.

| Aufgabe | Warum wichtig |
|---|---|
| 1.19 | Die Unterlagen nennen das Wirtschaftlichkeitsprinzip, aber keine Kennzahlen – in der IHK-Prüfung wird die Arbeitsproduktivität regelmäßig ausgerechnet. |
| 1.20 | Rentabilität und Wirtschaftlichkeit stehen in den Unterlagen als Unternehmensziele, ohne dass die Formeln genannt werden – gerechnet wird damit trotzdem. |
| 2.18 | Die wirtschaftspolitischen Ziele des magischen Vierecks sind Standardstoff der IHK-Prüfung und ergänzen die Wirtschaftsordnung aus Lernziel 2.2 unmittelbar. |
| 2.19 | Konjunkturphasen gehören zum selben Themenfeld wie der Wirtschaftskreislauf und werden in der Prüfung regelmäßig abgefragt. |
| 2.20 | Der Vergleich der Wirtschaftsordnungen macht erst deutlich, was an der Sozialen Marktwirtschaft sozial und was marktwirtschaftlich ist – eine klassische Prüfungsfrage. |
| 3.20 | Die Unterlagen beschreiben die Preisbildung im Polypol nur in Worten – in der IHK-Prüfung wird der Gleichgewichtspreis aus einer Markttabelle abgelesen. |
| 3.21 | Die Unterlagen nennen das Kartellverbot, aber keine Ausnahmen – die Unterscheidung zwischen verbotenem Kartell und erlaubter Zusammenarbeit ist eine typische Prüfungsfrage. |
| 3.22 | Die Unterlagen behandeln die Preisbildung nur im Polypol; Monopol und Oligopol kommen in der Prüfung aber genauso vor. |
| 4.26 | Die Unterlagen nennen das Mindeststammkapital der GmbH, aber nicht, wie viel davon bei der Anmeldung tatsächlich eingezahlt sein muss – danach wird in der Prüfung gefragt. |
| 4.27 | Die Unterlagen nennen positive und negative Publizität nur als Begriffe – die Anwendung auf einen Fall ist eine klassische Prüfungsaufgabe. |
| 5.26 | Die Unterlagen behandeln Kündigungsarten und Fristen, aber nicht die zwingende Schriftform – eine per Messenger ausgesprochene Kündigung ist ein Dauerbrenner in Prüfungen. |
| 5.27 | Die Unterlagen nennen nur den besonderen Kündigungsschutz – der allgemeine Kündigungsschutz nach dem KSchG mit seiner Drei-Wochen-Frist fehlt und ist prüfungsrelevant. |
| 5.28 | Der Urlaub wird in den Unterlagen nur als Vertragsbestandteil genannt – der gesetzliche Mindesturlaub und seine Umrechnung auf die Fünf-Tage-Woche werden in der Prüfung gerechnet. |
| 5.29 | Die Unterlagen nennen die Arbeitszeit nur als Vertragsbestandteil – die Grenzen des Arbeitszeitgesetzes gehören zum Pflichtstoff der WiSo-Prüfung. |
| 5.30 | Mindestlohn und Minijob-Grenze ändern sich jährlich und kommen in praxisbezogenen Prüfungsaufgaben zur Entgeltabrechnung regelmäßig vor. |
| 6.15 | Die Unterlagen nennen die Probezeit von 1 bis 4 Monaten, aber nicht die davon abhängigen Kündigungsregeln des BBiG – ein Standardfall der IHK-Prüfung. |
| 6.16 | Die Unterlagen nennen die Vergütung als Vertragsbestandteil, aber keinen Betrag – die Mindestausbildungsvergütung ändert sich jährlich und wird in Prüfungsaufgaben verwendet. |
| 6.17 | Wann das Ausbildungsverhältnis genau endet, steht nicht in den Unterlagen, entscheidet in der Prüfung aber über Vergütungs- und Urlaubsansprüche. |
| 6.18 | Das Jugendarbeitsschutzgesetz wird in den Unterlagen nur erwähnt – seine Urlaubsstaffel nach Alter ist eine typische Prüfungsfrage bei minderjährigen Auszubildenden. |
| 7.13 | Die Unterlagen nennen die Mitwirkung bei Kündigungen nur stichwortartig – dass eine Kündigung ohne Anhörung des Betriebsrats unwirksam ist, wird in Prüfungen regelmäßig abgefragt. |
| 7.14 | Die Größe des Betriebsrats steht nicht in den Unterlagen, wird in der Prüfung aber aus der Staffel des § 9 BetrVG abgelesen. |
| 7.15 | Betriebsvereinbarung und Tarifvertrag werden ständig verwechselt – die Unterlagen behandeln beide, aber in getrennten Themenblöcken. |
| 7.16 | Für die JAV nennen die Unterlagen eine Altersgrenze, die so nur für die Wählbarkeit gilt – die Unterscheidung ist prüfungsrelevant und korrigiert eine verbreitete Verwechslung. |
| 7.17 | Arbeitskampf und Schlichtung gehören zum selben Themenfeld wie Tarif und Mitbestimmung, fehlen in den Unterlagen aber vollständig. |

### Quellen des Zusatzwissens

Alle Zusatzinhalte stammen aus Gesetzestexten und amtlichen Veröffentlichungen:

- Gesetzestexte: [gesetze-im-internet.de](https://www.gesetze-im-internet.de/) – BGB (§§ 622, 623, 626,
  709), HGB (§§ 1, 2, 3, 5, 6, 15, 48, 49, 50, 54, 120, 122), GmbHG (§§ 5, 5a, 7), AktG (§ 7),
  BetrVG (§§ 1, 7, 8, 9, 13, 60, 61, 77, 87, 102), BBiG (§§ 16, 20, 21, 22), KSchG (§§ 1, 4, 7, 23),
  EFZG (§§ 3, 5), BUrlG (§§ 1, 3, 4, 5, 7), ArbZG (§§ 3, 4, 5), JArbSchG (§ 19), AGG (§ 1),
  GWB (§ 1), StabG (§ 1)
- Mindestlohn 2026: [Bundesregierung](https://www.bundesregierung.de/breg-de/aktuelles/mindestlohn-steigt-2391010)
  und [Mindestlohnkommission](https://www.mindestlohn-kommission.de/)
- Minijob-Grenze 2026: [DGB](https://www.dgb.de/service/ratgeber/minijobs/)
- Mindestausbildungsvergütung 2026: [BIBB, Pressemitteilung 28/2025 vom 13.10.2025](https://www.bibb.de/dokumente/pdf/pmmindestausbildungsverg%C3%BCtung2026.pdf)
  (Veröffentlichung im Bundesgesetzblatt am 10.10.2025)

## Abweichungen zwischen Unterlagen und aktueller Rechtslage

Beim Abgleich der Unterrichtsunterlagen mit den Gesetzestexten sind vier Punkte aufgefallen. Die
Begründungen im Quiz nennen jeweils **beides**: was im Kurs gelehrt wird und wie die Rechtslage heute
ist. Für die Kurstests gilt die Fassung der Unterlagen, für die IHK-Prüfung die aktuelle Rechtslage.

| Thema | Unterlagen | Aktuelle Rechtslage | Betroffen |
|---|---|---|---|
| **Gewinnverteilung OHG/KG** | „Gewinnverteilung: nach HGB, 4 % Kapitalverzinsung, Rest nach Köpfen“ (Folien und Arbeitsblatt Aufgabe 18) | Die 4-%-Regel stand in § 121 HGB **alte Fassung**. Seit 1.1.2024 (MoPeG) gilt § 120 Abs. 1 HGB i. V. m. § 709 Abs. 3 BGB: Gewinn und Verlust richten sich vorrangig nach den vereinbarten Beteiligungsverhältnissen, sonst nach dem Verhältnis der Beitragswerte, sonst nach Köpfen. § 168 HGB (KG) ist weggefallen. Die 4-%-Verzinsung gilt nur noch, wenn sie im Gesellschaftsvertrag vereinbart ist. | Aufgabe 4.18 |
| **GbR im Handelsregister** | Folie „Abteilungen des Handelsregisters“ führt die **GbR** unter HR A auf | Die GbR wird **nicht** ins Handelsregister eingetragen. Seit 1.1.2024 kann sie sich freiwillig in das neue **Gesellschaftsregister** eintragen lassen und heißt dann **eGbR**. | Aufgabe 4.14 |
| **Schwellenwert der JAV** | „mindestens 5 jugendliche Beschäftigte / Azubis **unter 25 Jahren**“ | § 60 Abs. 1 BetrVG kennt beim Schwellenwert **keine** 25-Jahres-Grenze: mindestens fünf Arbeitnehmer unter 18 Jahren **oder** zur Berufsausbildung Beschäftigte. Die Grenze „unter 25“ gilt erst für die **Wählbarkeit** nach § 61 Abs. 2 BetrVG. | Aufgaben 7.6, 7.16 |
| **Arbeitsblatt Berufsausbildung, Aufgabe 9** | Das Lösungsblatt führt unter 9a und 9b **zweimal** die Pflichten des Ausbildenden auf; die Pflichten des Auszubildenden fehlen. | Die Pflichten des Auszubildenden sind der Folie „Rechte und Pflichten“ desselben Foliensatzes entnommen (Lernpflicht, Berufsschulbesuch, Berichtsheft führen, Weisungsgebundenheit, Schweigepflicht …). | Aufgabe 6.9 |

### Getroffene Annahmen

- **Reihenfolge der Kapitel:** Die Unterlagen enthalten keine Kapitelnummern. Die Kapitel folgen dem
  zeitlichen Ablauf des Kurses nach dem Änderungsdatum der Dateien.
- **Meta-Lernziele:** „prüfungsnahe Aufgaben sicher bearbeiten“ (1.6) und „prüfungsnahe Fälle
  bearbeiten“ (4.8) nennen keine Inhalte. Ihnen sind die Anwendungs- und Rechenaufgaben des jeweiligen
  Kapitels zugeordnet.
- **Lernziele aus Kapitel 5:** Die Lernziel-Folie zählt „Erstens: …“ bis „Und fünftens: …“ auf. Die
  Aufzählungswörter sind weggelassen, der Wortlaut ist sonst unverändert. Die beiden zusätzlichen
  Lernziele 5.6 und 5.7 stammen wörtlich von der Abschlussfolie „In dieser Unterrichtseinheit gelernt“.
- **Arbeitsblatt Marktformen:** Zu diesem Blatt gab es kein Lösungsblatt. Die Lösungen der Aufgaben
  3.1 bis 3.3 sind aus den Folien und dem Fachstand abgeleitet.
- **Offene Fragen der Arbeitsblätter:** Die Originalaufgaben sind durchweg Freitextfragen. Sie wurden
  inhaltlich 1:1 übernommen, aber in einen Aufgabentyp überführt, den die App auswerten kann; die
  Originalnummer bleibt erhalten und steht als Fundstelle in `fragen.js`.

## Fragen ändern oder ergänzen

Alle Inhalte stehen in **`web/js/fragen.js`**: Lernziele, Fragen, Lösungen, Begründungen und Merkzettel.
Am Anfang der Datei ist jedes Feld erklärt. Wichtig:

- `lernziel` verweist auf eine ID aus `lernziele`; Zusatzfragen haben `lernziel: null`, dafür
  `zusatz: true` und einen `zusatzGrund`.
- Bei `typ: "auswahl"` enthält `loesung` die Nummern der anzukreuzenden Antworten (1 = A, 2 = B, …).
- `negativ: true` bedeutet, dass nach der falschen bzw. nicht zutreffenden Aussage gefragt ist. Dann
  stehen in `loesung` die falschen Aussagen.
- Bei `typ: "reihenfolge"` ist `loesung` der Platz je Schritt (1 = zuerst) und muss eine Permutation
  sein, die nicht der Anzeigereihenfolge entspricht.
- Signalwörter wie „falsch“ oder „nicht“ werden mit `<mark>…</mark>` gelb markiert.

Nach jedem Push prüft der Workflow die Datei (`tests/pruefe-fragen.mjs`) und veröffentlicht nur, wenn
alles stimmt. Lokal geht dieselbe Prüfung mit `node tests/pruefe-fragen.mjs`. Geprüft werden unter
anderem: mindestens zwei Fragen je Lernziel, gültige Lernziel-Verweise, vollständige Felder je
Aufgabentyp, höchstens 25 % Zusatzfragen und ob das PDF noch zu den Fragen passt.

Neue Dateien in `web/` müssen in `web/sw.js` in der Liste `FILES` stehen, damit sie offline verfügbar
sind; danach `VERSION` erhöhen. Die Prüfung meldet, wenn eine Datei fehlt.

**Lokal testen:** `python -m http.server 8000 --directory web`, dann http://localhost:8000/ öffnen.

## PDF neu erzeugen

Das PDF wird aus `fragen.js` erzeugt und muss nach jeder Änderung an den Fragen neu gebaut werden –
sonst schlägt die Prüfung fehl, weil der in den PDF-Metadaten hinterlegte SHA-256 von `fragen.js` nicht
mehr passt.

```bash
python -m pip install reportlab
python tools/pdf_erstellen.py
```

Das Icon lässt sich mit `python tools/icons_erstellen.py` neu erzeugen (benötigt `pillow`).

## Aufbau

```
web/                          wird auf GitHub Pages veröffentlicht
  index.html
  css/quiz.css
  js/fragen.js                Inhalte (Lernziele, Fragen, Lösungen, Begründungen, Merkzettel)
  js/quiz.js                  Quiz-Ablauf, Auswertung, Lernziel-Check, Speichern des Fortschritts
  sw.js                       Offline-Speicher (Cache-Präfix wiso-quiz-)
  manifest.webmanifest        Installation als App
  icons/
  fonts/                      Public Sans, Zilla Slab, IBM Plex Mono (SIL Open Font License)
  WiSo_Fragen_mit_Loesungsblatt.pdf
tests/pruefe-fragen.mjs       Prüfung vor dem Veröffentlichen
tools/pdf_erstellen.py        erzeugt das PDF aus fragen.js
tools/icons_erstellen.py      erzeugt die App-Icons
.github/workflows/pages.yml   Veröffentlichung bei jedem Push auf main
```

## GitHub einrichten

Nichts zu tun: Der Workflow schaltet GitHub Pages beim ersten Lauf selbst ein
(`actions/configure-pages` mit `enablement: true`) und setzt die Source auf **GitHub Actions**. Jeder
Push auf `main` veröffentlicht das Quiz automatisch; der Reiter **Actions** zeigt den Fortschritt.

Sollte das Einschalten einmal fehlschlagen, geht es auch von Hand: unter *Settings → Pages* als Source
**„GitHub Actions”** wählen und im Reiter Actions den Lauf mit „Re-run all jobs” wiederholen.

## Quelle

Foliensätze und Arbeitsblätter des Umschulungskurses zum Fachinformatiker Systemintegration zu den
sieben Themenblöcken „Der Betrieb“, „Die Stellung des Betriebs in Wirtschaft und Gesellschaft“,
„Marktstrukturen und Preisbildung“, „Handelsrecht und Unternehmensgründung“, „Rechte von
Beschäftigten“, „Die Berufsausbildung“ und „Betriebliche Mitbestimmung“. Die Aufgaben der
Arbeitsblätter zu Handelsrecht, Berufsausbildung und betrieblicher Mitbestimmung sind mit ihren
Lösungsblättern abgeglichen.

Die Originalunterlagen sind nicht Teil dieses Repositories (siehe `.gitignore`).
