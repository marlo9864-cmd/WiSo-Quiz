#!/usr/bin/env python3
"""Erzeugt web/WiSo_Fragen_mit_Loesungsblatt.pdf aus web/js/fragen.js.

Aufbau:
    Teil A   Fragen mit Kopf für Name, Datum und Punkte
    Teil B   Lösungsblatt mit Begründungen
    Teil C   Lernziel-Übersicht (Lernziel → Aufgaben), Zusatzfragen gekennzeichnet
    Teil D   Merkzettel „Für die Prüfung“

In die PDF-Metadaten wird der SHA-256 von fragen.js geschrieben. tests/pruefe-fragen.mjs
prüft damit, ob das PDF noch zu den Fragen passt.

    python tools/pdf_erstellen.py
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

WURZEL = Path(__file__).resolve().parent.parent
FRAGEN_JS = WURZEL / "web" / "js" / "fragen.js"

AKZENT = colors.HexColor("#5B3BAE")
AKZENT_HELL = colors.HexColor("#EDE9FB")
EXTRA = colors.HexColor("#9A5B00")
EXTRA_HELL = colors.HexColor("#FCEFDC")
MARKER = colors.HexColor("#FFE45E")
TINTE = colors.HexColor("#16142A")
GRAU = colors.HexColor("#5E5A79")
LINIE = colors.HexColor("#DCD8EC")
OK = colors.HexColor("#17784A")

BUCHSTABEN = "ABCDEFGH"


# --------------------------------------------------------------------- Daten
def lade_daten() -> tuple[dict, str]:
    quelle = FRAGEN_JS.read_text(encoding="utf-8")
    start = quelle.index("globalThis.QUIZ_DATA")
    rohdaten = quelle[quelle.index("{", start) : quelle.rindex("}") + 1]
    hash_hex = hashlib.sha256(FRAGEN_JS.read_bytes()).hexdigest()
    return json.loads(rohdaten), hash_hex


def markup(text: str) -> str:
    """Wandelt die Auszeichnungen der App in die von ReportLab verstandenen um."""
    text = text.replace("&", "&amp;")
    text = re.sub(r"&amp;(lt|gt|amp|nbsp|#\d+);", r"&\1;", text)
    text = text.replace("<b>", "\x01").replace("</b>", "\x02")
    text = text.replace("<strong>", "\x01").replace("</strong>", "\x02")
    text = text.replace("<mark>", "\x03").replace("</mark>", "\x04")
    text = text.replace("<br>", "<br/>")
    text = text.replace("\x01", "<b>").replace("\x02", "</b>")
    text = text.replace("\x03", '<b><font backColor="#FFE45E">').replace("\x04", "</font></b>")
    return text


# --------------------------------------------------------------------- Stile
def stile() -> dict[str, ParagraphStyle]:
    basis = ParagraphStyle(
        "basis", fontName="Helvetica", fontSize=9.5, leading=13.5,
        textColor=TINTE, alignment=TA_LEFT, spaceAfter=0,
    )
    s = {"basis": basis}
    s["titel"] = ParagraphStyle("titel", parent=basis, fontName="Helvetica-Bold", fontSize=22, leading=26, spaceAfter=4)
    s["untertitel"] = ParagraphStyle("untertitel", parent=basis, fontSize=12, leading=16, textColor=GRAU, spaceAfter=10)
    s["eyebrow"] = ParagraphStyle("eyebrow", parent=basis, fontName="Helvetica-Bold", fontSize=8,
                                  leading=10, textColor=AKZENT, spaceAfter=3)
    s["teil"] = ParagraphStyle("teil", parent=basis, fontName="Helvetica-Bold", fontSize=15, leading=19,
                               textColor=AKZENT, spaceBefore=4, spaceAfter=2)
    s["kapitel"] = ParagraphStyle("kapitel", parent=basis, fontName="Helvetica-Bold", fontSize=11.5, leading=15,
                                  textColor=colors.white, spaceBefore=0, spaceAfter=0)
    s["abschnitt"] = ParagraphStyle("abschnitt", parent=basis, fontName="Helvetica-Bold", fontSize=11,
                                    leading=14, textColor=AKZENT, spaceBefore=10, spaceAfter=4)
    s["nr"] = ParagraphStyle("nr", parent=basis, fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=AKZENT)
    s["frage"] = ParagraphStyle("frage", parent=basis, fontName="Helvetica-Bold", fontSize=10, leading=13.5)
    s["sachverhalt"] = ParagraphStyle("sachverhalt", parent=basis, spaceAfter=3)
    s["antwort"] = ParagraphStyle("antwort", parent=basis, fontSize=9.5, leading=12.5)
    s["klein"] = ParagraphStyle("klein", parent=basis, fontSize=8.5, leading=11, textColor=GRAU)
    s["meta"] = ParagraphStyle("meta", parent=basis, fontName="Helvetica-Bold", fontSize=7.5, leading=10, textColor=AKZENT)
    s["meta_extra"] = ParagraphStyle("meta_extra", parent=s["meta"], textColor=EXTRA)
    s["loesung"] = ParagraphStyle("loesung", parent=basis, fontName="Helvetica-Bold", fontSize=9.5,
                                  leading=12.5, textColor=OK)
    s["begruendung"] = ParagraphStyle("begruendung", parent=basis, fontSize=9, leading=12.5)
    s["fuss"] = ParagraphStyle("fuss", parent=basis, fontSize=7.5, leading=9.5, textColor=GRAU)
    s["zelle"] = ParagraphStyle("zelle", parent=basis, fontSize=8.5, leading=11.5)
    s["zelle_fett"] = ParagraphStyle("zelle_fett", parent=s["zelle"], fontName="Helvetica-Bold")
    return s


# ------------------------------------------------------------------ Bausteine
def kapitelbalken(text: str, s: dict) -> Table:
    t = Table([[Paragraph(markup(text), s["kapitel"])]], colWidths=[170 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), AKZENT),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def aufgabenkopf(frage: dict, s: dict) -> Table:
    """Nummer links, Frage rechts, darüber Lernziel bzw. Zusatzwissen."""
    if frage.get("zusatz"):
        marke = Paragraph("ZUSATZWISSEN", s["meta_extra"])
    else:
        marke = Paragraph("LERNZIEL %s" % frage["lernziel"], s["meta"])
    rechts = [marke]
    for absatz in frage.get("sachverhalt", []):
        rechts.append(Spacer(1, 2))
        rechts.append(Paragraph(markup(absatz), s["sachverhalt"]))
    rechts.append(Spacer(1, 2))
    rechts.append(Paragraph(markup(frage["frage"]), s["frage"]))

    t = Table([[Paragraph(str(frage["nr"]), s["nr"]), rechts]], colWidths=[10 * mm, 160 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 2),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def antwortblock(frage: dict, s: dict, mit_loesung: bool) -> list:
    """Antwortmöglichkeiten bzw. Eingabefelder für Teil A und Teil B."""
    out: list = []
    typ = frage["typ"]
    loesung = frage.get("loesung")

    if typ == "auswahl":
        zeilen = []
        for i, text in enumerate(frage["antworten"], start=1):
            treffer = mit_loesung and i in loesung
            kreuz = "X" if treffer else ""
            zeilen.append([
                Paragraph(kreuz, s["zelle_fett"]),
                Paragraph("<b>%s</b>" % BUCHSTABEN[i - 1], s["antwort"]),
                Paragraph(markup(text), s["antwort"]),
            ])
        t = Table(zeilen, colWidths=[7 * mm, 7 * mm, 146 * mm])
        stil = [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 2),
            ("RIGHTPADDING", (0, 0), (-1, -1), 2),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ("BOX", (0, 0), (0, -1), 0.5, LINIE),
            ("INNERGRID", (0, 0), (0, -1), 0.5, LINIE),
        ]
        if mit_loesung:
            for i in loesung:
                stil.append(("BACKGROUND", (0, i - 1), (-1, i - 1), colors.HexColor("#E3F3EA")))
                stil.append(("TEXTCOLOR", (0, i - 1), (1, i - 1), OK))
        t.setStyle(TableStyle(stil))
        out.append(t)

    elif typ == "zuordnung":
        begriffe = " · ".join("<b>%d</b> %s" % (i, b) for i, b in enumerate(frage["optionen"], start=1))
        out.append(Paragraph(markup(begriffe), s["klein"]))
        out.append(Spacer(1, 3))
        zeilen = []
        for i, aussage in enumerate(frage["aussagen"]):
            feld = str(loesung[i]) if mit_loesung else ""
            zeilen.append([Paragraph(feld, s["zelle_fett"]), Paragraph(markup(aussage), s["antwort"])])
        t = Table(zeilen, colWidths=[10 * mm, 150 * mm])
        stil = [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (0, 0), (0, -1), "CENTER"),
            ("LEFTPADDING", (0, 0), (-1, -1), 2),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ("BOX", (0, 0), (0, -1), 0.5, LINIE),
            ("INNERGRID", (0, 0), (0, -1), 0.5, LINIE),
        ]
        if mit_loesung:
            stil.append(("TEXTCOLOR", (0, 0), (0, -1), OK))
        t.setStyle(TableStyle(stil))
        out.append(t)

    elif typ == "reihenfolge":
        zeilen = []
        for i, schritt in enumerate(frage["schritte"]):
            feld = str(loesung[i]) if mit_loesung else ""
            zeilen.append([Paragraph(feld, s["zelle_fett"]), Paragraph(markup(schritt), s["antwort"])])
        t = Table(zeilen, colWidths=[10 * mm, 150 * mm])
        stil = [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (0, 0), (0, -1), "CENTER"),
            ("LEFTPADDING", (0, 0), (-1, -1), 2),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ("BOX", (0, 0), (0, -1), 0.5, LINIE),
            ("INNERGRID", (0, 0), (0, -1), 0.5, LINIE),
        ]
        if mit_loesung:
            stil.append(("TEXTCOLOR", (0, 0), (0, -1), OK))
        t.setStyle(TableStyle(stil))
        out.append(Paragraph("Platz je Schritt eintragen, 1 kommt zuerst.", s["klein"]))
        out.append(Spacer(1, 3))
        out.append(t)

    else:  # eingabe
        einheit = (" " + frage["einheit"]) if frage.get("einheit") else ""
        if mit_loesung:
            wert = frage["loesung"] if frage["art"] == "datum" else format_zahl(frage["loesung"])
            out.append(Paragraph("Lösung: <b>%s%s</b>" % (wert, einheit), s["loesung"]))
        else:
            hinweis = "TT.MM.JJJJ" if frage["art"] == "datum" else "Zahl"
            t = Table([[Paragraph("Lösung:", s["antwort"]), Paragraph("", s["antwort"]),
                        Paragraph(markup("%s%s" % (hinweis, einheit)), s["klein"])]],
                      colWidths=[16 * mm, 45 * mm, 99 * mm])
            t.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LINEBELOW", (1, 0), (1, 0), 0.8, GRAU),
                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]))
            out.append(t)
    return out


def format_zahl(wert: float) -> str:
    if float(wert).is_integer():
        return f"{int(wert):,}".replace(",", ".")
    return f"{wert:,.2f}".replace(",", "\x00").replace(".", ",").replace("\x00", ".")


def einrueckung(inhalt: list) -> Table:
    """Schiebt einen Block auf die Höhe des Fragetexts ein."""
    t = Table([["", inhalt]], colWidths=[10 * mm, 160 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def faktentabelle(zeilen: list[list[str]], breiten: list[float], s: dict) -> Table:
    daten = []
    for zeile in zeilen:
        if len(zeile) == 3:
            daten.append([
                Paragraph(markup(zeile[0]), s["zelle_fett"]),
                Paragraph("<b>%s</b><br/>%s" % (markup(zeile[1]), markup(zeile[2])), s["zelle"]),
            ])
        else:
            daten.append([Paragraph(markup(zeile[0]), s["zelle_fett"]),
                          Paragraph(markup(zeile[1]), s["zelle"])])
    t = Table(daten, colWidths=breiten, repeatRows=0)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINIE),
        ("LINEABOVE", (0, 0), (-1, 0), 0.4, LINIE),
        ("TEXTCOLOR", (0, 0), (0, -1), AKZENT),
    ]))
    return t


# ------------------------------------------------------------------ Dokument
class Dokument(BaseDocTemplate):
    def __init__(self, pfad: str, daten: dict, hash_hex: str):
        super().__init__(
            pfad, pagesize=A4,
            leftMargin=20 * mm, rightMargin=20 * mm, topMargin=18 * mm, bottomMargin=18 * mm,
            title="WiSo-Quiz – Übungsfragen mit Lösungsblatt",
            author="WiSo-Quiz",
            subject="fragen-sha256:%s" % hash_hex,
            creator="tools/pdf_erstellen.py",
        )
        self.daten = daten
        self.hash_hex = hash_hex
        rahmen = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal",
                       leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([PageTemplate(id="seite", frames=[rahmen], onPage=self.seite)])

    def seite(self, canv, doc):
        canv.saveState()
        canv.setSubject("fragen-sha256:%s" % self.hash_hex)
        canv.setKeywords("WiSo, IHK, Wirtschafts- und Sozialkunde, fragen-sha256:%s" % self.hash_hex)
        canv.setFont("Helvetica", 7.5)
        canv.setFillColor(GRAU)
        kapitel = " · ".join("Kap. %d: %d" % (k["nr"], len(k["fragen"])) for k in self.daten["kapitel"])
        canv.drawString(self.leftMargin, 11 * mm, kapitel)
        canv.drawRightString(A4[0] - self.rightMargin, 11 * mm, "Seite %d" % doc.page)
        canv.setStrokeColor(LINIE)
        canv.setLineWidth(0.4)
        canv.line(self.leftMargin, 14 * mm, A4[0] - self.rightMargin, 14 * mm)
        canv.restoreState()


# ------------------------------------------------------------------- Inhalte
def teil_a(daten: dict, s: dict) -> list:
    gesamt = sum(len(k["fragen"]) for k in daten["kapitel"])
    stand = daten.get("stand", "")
    if stand:
        jahr, monat = stand.split("-")
        stand = "%s/%s" % (monat, jahr)

    story: list = [
        Paragraph("WISO &#183; WIRTSCHAFTS- UND SOZIALKUNDE", s["eyebrow"]),
        Paragraph("Übungsfragen mit Lösungsblatt", s["titel"]),
        Paragraph(
            "%d Aufgaben zu %d Themenblöcken &#183; Lösungsblatt mit Begründungen in Teil B &#183; "
            "Stand der Inhalte: %s" % (gesamt, len(daten["kapitel"]), stand),
            s["untertitel"],
        ),
    ]

    # Kapitelübersicht
    kopf = [Paragraph("<b>Kapitel</b>", s["zelle_fett"]), Paragraph("<b>Themenblock</b>", s["zelle_fett"]),
            Paragraph("<b>Aufgaben</b>", s["zelle_fett"])]
    zeilen = [kopf]
    for k in daten["kapitel"]:
        zeilen.append([
            Paragraph(str(k["nr"]), s["zelle"]),
            Paragraph("%s<br/><font color='#5E5A79'>%s</font>" % (markup(k["titel"]), markup(k["bereich"])), s["zelle"]),
            Paragraph(str(len(k["fragen"])), s["zelle"]),
        ])
    t = Table(zeilen, colWidths=[18 * mm, 125 * mm, 27 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, 0), AKZENT_HELL),
        ("TEXTCOLOR", (0, 0), (-1, 0), AKZENT),
        ("ALIGN", (2, 0), (2, -1), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINIE),
    ]))
    story += [t, Spacer(1, 8 * mm)]

    # Kopf für Name, Datum, Punkte
    felder = Table(
        [[Paragraph("Name", s["klein"]), "", Paragraph("Datum", s["klein"]), "",
          Paragraph("Punkte", s["klein"]), Paragraph("/ %d" % gesamt, s["zelle_fett"])]],
        colWidths=[14 * mm, 62 * mm, 14 * mm, 32 * mm, 16 * mm, 32 * mm],
    )
    felder.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LINEBELOW", (1, 0), (1, 0), 0.8, TINTE),
        ("LINEBELOW", (3, 0), (3, 0), 0.8, TINTE),
        ("LINEBELOW", (5, 0), (5, 0), 0.8, TINTE),
        ("LEFTPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story += [felder, Spacer(1, 5 * mm)]

    story.append(Paragraph(
        "<b>Auswahlaufgaben:</b> Kreuzen Sie alle zutreffenden Antworten an – bei vielen Aufgaben ist mehr als eine "
        "richtig; die Frage nennt dann die Anzahl. Achten Sie auf die Signalwörter <b>nicht</b> und <b>falsch</b>. "
        "<b>Zuordnung:</b> Tragen Sie je Aussage die Nummer des passenden Begriffs ein. "
        "<b>Reihenfolge:</b> Tragen Sie je Schritt den Platz ein, 1 kommt zuerst. "
        "<b>Eingabe:</b> Tragen Sie Zahl oder Datum ein. "
        "Ein Punkt je Aufgabe, wenn alles stimmt. Aufgaben aus den Arbeitsblättern behalten ihre Originalnummer.",
        s["klein"]))
    story.append(Spacer(1, 6 * mm))

    for k in daten["kapitel"]:
        story.append(kapitelbalken("KAPITEL %d &#183; %s" % (k["nr"], k["titel"]), s))
        story.append(Spacer(1, 4 * mm))
        for f in k["fragen"]:
            block = [aufgabenkopf(f, s), Spacer(1, 3), einrueckung(antwortblock(f, s, False)), Spacer(1, 5 * mm)]
            story.append(KeepTogether(block))
    return story


def teil_b(daten: dict, s: dict) -> list:
    lernziele = {l["id"]: l for l in daten.get("lernziele", [])}
    story: list = [
        PageBreak(),
        Paragraph("TEIL B", s["eyebrow"]),
        Paragraph("Lösungsblatt mit Begründungen", s["titel"]),
        Paragraph(
            "Zu jeder Aufgabe die Lösung, die Begründung mit Rechtsgrundlage und das geprüfte Lernziel.",
            s["untertitel"]),
        Spacer(1, 3 * mm),
    ]
    for k in daten["kapitel"]:
        story.append(kapitelbalken("KAPITEL %d &#183; %s" % (k["nr"], k["titel"]), s))
        story.append(Spacer(1, 4 * mm))
        for f in k["fragen"]:
            inhalt: list = [aufgabenkopf(f, s), Spacer(1, 3)]
            rechts: list = antwortblock(f, s, True)
            rechts.append(Spacer(1, 3))
            if f["typ"] == "auswahl":
                buchstaben = ", ".join(BUCHSTABEN[i - 1] for i in f["loesung"])
                wort = "Falsch ist" if f.get("negativ") and len(f["loesung"]) == 1 else (
                    "Falsch sind" if f.get("negativ") else ("Richtig ist" if len(f["loesung"]) == 1 else "Richtig sind"))
                rechts.append(Paragraph("%s <b>%s</b>" % (wort, buchstaben), s["loesung"]))
                rechts.append(Spacer(1, 3))
            rechts.append(Paragraph("<b>Begründung.</b> %s" % markup(f["begruendung"]), s["begruendung"]))
            if f.get("zusatz"):
                rechts.append(Spacer(1, 2))
                rechts.append(Paragraph("<b>Zusatzwissen.</b> %s" % markup(f.get("zusatzGrund", "")), s["klein"]))
            else:
                ziel = lernziele.get(f["lernziel"])
                if ziel:
                    zusatz = " (abgeleitet)" if ziel.get("abgeleitet") else ""
                    rechts.append(Spacer(1, 2))
                    rechts.append(Paragraph("<b>Lernziel %s.</b> %s%s" % (ziel["id"], markup(ziel["text"]), zusatz), s["klein"]))
            if f.get("fundstelle"):
                rechts.append(Paragraph(markup(f["fundstelle"]), s["fuss"]))
            inhalt.append(einrueckung(rechts))
            inhalt.append(Spacer(1, 5 * mm))
            story.append(KeepTogether(inhalt))
    return story


def teil_c(daten: dict, s: dict) -> list:
    """Lernziel-Übersicht: welches Lernziel wird von welchen Aufgaben geprüft."""
    story: list = [
        PageBreak(),
        Paragraph("TEIL C", s["eyebrow"]),
        Paragraph("Lernziel-Übersicht", s["titel"]),
        Paragraph("Welche Aufgabe prüft welches Lernziel. Zusatzwissen steht am Ende.", s["untertitel"]),
        Spacer(1, 3 * mm),
    ]
    treffer: dict[str, list[str]] = {}
    zusatz: list[str] = []
    for k in daten["kapitel"]:
        for f in k["fragen"]:
            marke = "%d.%d" % (k["nr"], f["nr"])
            if f.get("zusatz"):
                zusatz.append(marke)
            else:
                treffer.setdefault(f["lernziel"], []).append(marke)

    kopf = [Paragraph("<b>Lernziel</b>", s["zelle_fett"]), Paragraph("<b>Wortlaut</b>", s["zelle_fett"]),
            Paragraph("<b>Aufgaben (Kapitel.Nummer)</b>", s["zelle_fett"]), Paragraph("<b>Anz.</b>", s["zelle_fett"])]
    for k in daten["kapitel"]:
        ziele = [l for l in daten.get("lernziele", []) if l["kapitel"] == k["nr"]]
        if not ziele:
            continue
        zeilen = [kopf]
        for l in ziele:
            liste = treffer.get(l["id"], [])
            text = markup(l["text"]) + (" <font color='#5E5A79'>(abgeleitet)</font>" if l.get("abgeleitet") else "")
            zeilen.append([
                Paragraph("<b>%s</b>" % l["id"], s["zelle"]),
                Paragraph(text, s["zelle"]),
                Paragraph(", ".join(liste), s["zelle"]),
                Paragraph(str(len(liste)), s["zelle"]),
            ])
        t = Table(zeilen, colWidths=[14 * mm, 76 * mm, 65 * mm, 15 * mm])
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BACKGROUND", (0, 0), (-1, 0), AKZENT_HELL),
            ("TEXTCOLOR", (0, 0), (-1, 0), AKZENT),
            ("ALIGN", (3, 0), (3, -1), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINIE),
        ]))
        story.append(Paragraph("Kapitel %d &#183; %s" % (k["nr"], markup(k["titel"])), s["abschnitt"]))
        story.append(t)

    if zusatz:
        story.append(Paragraph("Zusatzwissen", s["abschnitt"]))
        story.append(Paragraph(
            "Diese %d Aufgaben prüfen kein Lernziel aus den Unterlagen, gehören aber zum Prüfungsstoff "
            "der IHK-WiSo-Prüfung. Die Begründung in Teil B nennt jeweils den Grund.<br/><b>%s</b>"
            % (len(zusatz), ", ".join(zusatz)), s["zelle"]))
    return story


def teil_d(daten: dict, s: dict) -> list:
    m = daten.get("merkzettel") or {}
    story: list = [
        PageBreak(),
        Paragraph("FÜR DIE PRÜFUNG", s["eyebrow"]),
        Paragraph("Merkzettel", s["titel"]),
        Paragraph("Zahlen, Begriffe, Verwechslungen und Rechenwege aus den Aufgaben.", s["untertitel"]),
    ]
    if m.get("fristen"):
        story.append(Paragraph("Zahlen und Fristen", s["abschnitt"]))
        story.append(faktentabelle(m["fristen"], [45 * mm, 125 * mm], s))
    if m.get("begriffe"):
        story.append(Paragraph("Begriffe und Rechtsgrundlagen", s["abschnitt"]))
        story.append(faktentabelle(m["begriffe"], [32 * mm, 138 * mm], s))
    if m.get("verwechslungen"):
        story.append(Paragraph("Verwechslungsgefahren", s["abschnitt"]))
        story.append(faktentabelle(m["verwechslungen"], [52 * mm, 118 * mm], s))
    if m.get("rechenschemata"):
        story.append(Paragraph("Rechenschemata", s["abschnitt"]))
        story.append(faktentabelle(m["rechenschemata"], [45 * mm, 125 * mm], s))
    if m.get("tipp"):
        story.append(Paragraph("Prüfungstipp", s["abschnitt"]))
        t = Table([[Paragraph(markup(m["tipp"]), s["zelle"])]], colWidths=[170 * mm])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), AKZENT_HELL),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ]))
        story.append(t)
    return story


def main() -> None:
    daten, hash_hex = lade_daten()
    ziel = WURZEL / "web" / daten.get("pdf", "WiSo_Fragen_mit_Loesungsblatt.pdf")
    s = stile()
    doc = Dokument(str(ziel), daten, hash_hex)
    story = teil_a(daten, s) + teil_b(daten, s) + teil_c(daten, s) + teil_d(daten, s)
    doc.build(story)
    gesamt = sum(len(k["fragen"]) for k in daten["kapitel"])
    print("%s geschrieben – %d Aufgaben, %d Seiten, fragen-sha256:%s"
          % (ziel.name, gesamt, doc.page, hash_hex[:12]))


if __name__ == "__main__":
    main()
