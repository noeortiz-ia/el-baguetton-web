#!/usr/bin/env python3
"""Genera las fotos del catálogo en JPG para Meta y Google.

Meta solo acepta JPEG o PNG de al menos 500x500 px. El sitio usa WebP por peso,
así que aquí se hace la copia en JPG que consumen los feeds.

Uso:  python3 scripts/gen-fotos-feed.py
"""

from __future__ import annotations

import pathlib
import re

from PIL import Image

LANCZOS = getattr(getattr(Image, "Resampling", Image), "LANCZOS")

RAIZ = pathlib.Path(__file__).resolve().parent.parent
REALES = RAIZ / "public" / "img" / "real"
SALIDA = RAIZ / "public" / "img" / "feed"
LADO_MINIMO = 600
LADO_MAXIMO = 1400


def fotos_del_feed() -> dict[str, str]:
    js = (RAIZ / "src" / "data" / "feed.js").read_text(encoding="utf-8")
    return dict(re.findall(r"'([^']+)':\s*'([^']+\.webp)'", js))


def main() -> None:
    SALIDA.mkdir(parents=True, exist_ok=True)
    fotos = fotos_del_feed()
    total = 0
    for platillo, archivo in fotos.items():
        origen = REALES / archivo
        im = Image.open(origen).convert("RGB")
        ancho, alto = im.size

        escala = max(1.0, LADO_MINIMO / min(ancho, alto))
        if escala > 1.0:
            im = im.resize((round(ancho * escala), round(alto * escala)), LANCZOS)

        if max(im.size) > LADO_MAXIMO:
            factor = LADO_MAXIMO / max(im.size)
            im = im.resize((round(im.width * factor), round(im.height * factor)), LANCZOS)

        destino = SALIDA / f"{origen.stem}.jpg"
        im.save(destino, "JPEG", quality=88, optimize=True, progressive=True)
        total += destino.stat().st_size
        print(f"{platillo[:30]:30s} {im.width}x{im.height}  {destino.stat().st_size // 1024:4d} KB  {destino.name}")

    print(f"\n{len(fotos)} fotos · {total // 1024} KB en {SALIDA.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
