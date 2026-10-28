#!/usr/bin/env python3
"""Erzeugt die App-Icons des WiSo-Quiz in web/icons/.

Motiv: drei steigende Balken (Wirtschaft) auf einer Grundlinie, darüber ein gelber
Trendstrich in der Farbe des Textmarkers. Alles wird vierfach vergrößert gezeichnet
und dann verkleinert, damit die Kanten weich sind.

    python tools/icons_erstellen.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

WEB = Path(__file__).resolve().parent.parent / "web" / "icons"

VIOLETT_HELL = (107, 73, 198)
VIOLETT_DUNKEL = (63, 42, 133)
WEISS = (255, 255, 255)
MARKER = (255, 228, 94)

SS = 4  # Vergrößerungsfaktor fürs Glätten


def verlauf(size: int) -> Image.Image:
    """Hintergrund mit senkrechtem Farbverlauf."""
    bild = Image.new("RGB", (1, size))
    for y in range(size):
        t = y / max(1, size - 1)
        bild.putpixel((0, y), tuple(
            round(VIOLETT_HELL[i] + (VIOLETT_DUNKEL[i] - VIOLETT_HELL[i]) * t) for i in range(3)
        ))
    return bild.resize((size, size), Image.NEAREST)


def motiv(zeichnung: ImageDraw.ImageDraw, size: int) -> None:
    """Balken, Grundlinie und Trendstrich."""
    e = size / 100  # eine Einheit = 1 % der Kantenlänge

    # drei steigende Balken
    breite = 13 * e
    unten = 72 * e
    for x, hoehe in ((26, 24), (43.5, 38), (61, 52)):
        zeichnung.rounded_rectangle(
            [x * e, unten - hoehe * e, (x + 13) * e, unten],
            radius=breite * 0.22, fill=WEISS,
        )

    # Grundlinie
    zeichnung.rounded_rectangle(
        [22 * e, 74 * e, 78 * e, 80 * e], radius=3 * e, fill=WEISS,
    )

    # gelber Trendstrich über den Balken
    zeichnung.line(
        [(24 * e, 43 * e), (46 * e, 32 * e), (74 * e, 19 * e)],
        fill=MARKER, width=round(6 * e), joint="curve",
    )


def icon(size: int, maskable: bool = False) -> Image.Image:
    gross = size * SS
    bild = verlauf(gross).convert("RGBA")
    zeichnung = ImageDraw.Draw(bild)

    if maskable:
        # Maskable-Icons dürfen außen beschnitten werden: Motiv auf 60 % verkleinert
        # in die sichere Zone legen, Hintergrund bleibt randlos.
        inner = Image.new("RGBA", (gross, gross), (0, 0, 0, 0))
        motiv(ImageDraw.Draw(inner), gross)
        rand = round(gross * 0.20)
        bild.alpha_composite(
            inner.resize((gross - 2 * rand, gross - 2 * rand), Image.LANCZOS), (rand, rand)
        )
    else:
        motiv(zeichnung, gross)
        # abgerundete Ecken
        maske = Image.new("L", (gross, gross), 0)
        ImageDraw.Draw(maske).rounded_rectangle(
            [0, 0, gross - 1, gross - 1], radius=round(gross * 0.225), fill=255,
        )
        bild.putalpha(maske)

    return bild.resize((size, size), Image.LANCZOS)


def main() -> None:
    WEB.mkdir(parents=True, exist_ok=True)
    for name, size, mask in (
        ("icon-32.png", 32, False),
        ("icon-180.png", 180, False),
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("maskable-512.png", 512, True),
    ):
        icon(size, mask).save(WEB / name, optimize=True)
        print(f"{name} geschrieben")


if __name__ == "__main__":
    main()
