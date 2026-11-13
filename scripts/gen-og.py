#!/usr/bin/env python3
"""Genera las imágenes Open Graph de cada página (1200x630) a partir de fotos
reales del sitio. Se corre antes de `vite build`.

Uso: python3 scripts/gen-og.py
Salida: public/img/og/<pagina>.jpg  (JPEG progresivo, < 300 KB)
"""
from pathlib import Path
from PIL import Image

RESAMPLE = getattr(Image, 'Resampling', Image).LANCZOS

RAIZ = Path(__file__).resolve().parent.parent
REAL = RAIZ / "public" / "img" / "real"
SALIDA = RAIZ / "public" / "img" / "og"
W, H = 1200, 630

# foto real que representa cada página y el punto de interés vertical (0 = arriba, 1 = abajo)
FUENTES = {
    "menu": ("la-primavera.webp", 0.45),
    "promociones": ("promo-viernes-cafe-v2.webp", 0.5),
    "galeria": ("mexicana-v2.webp", 0.5),
    "ubicacion": ("baguetona.webp", 0.5),
}


def recorte(im: Image.Image, foco: float) -> Image.Image:
    """Recorta al aspecto 1200x630 sin deformar, respetando el foco vertical."""
    objetivo = W / H
    ancho, alto = im.size
    if ancho / alto > objetivo:            # sobra ancho: se recorta a los lados
        nuevo_alto = alto
        nuevo_ancho = round(alto * objetivo)
        x = (ancho - nuevo_ancho) // 2
        caja = (x, 0, x + nuevo_ancho, nuevo_alto)
    else:                                   # sobra alto: se recorta arriba/abajo
        nuevo_ancho = ancho
        nuevo_alto = round(ancho / objetivo)
        y = round((alto - nuevo_alto) * foco)
        y = max(0, min(y, alto - nuevo_alto))
        caja = (0, y, nuevo_ancho, y + nuevo_alto)
    return im.crop(caja).resize((W, H), RESAMPLE)


def main() -> None:
    SALIDA.mkdir(parents=True, exist_ok=True)
    for pagina, (archivo, foco) in FUENTES.items():
        origen = REAL / archivo
        if not origen.exists():
            raise SystemExit(f"falta la foto {origen}")
        im = Image.open(origen).convert("RGB")
        salida = SALIDA / f"{pagina}.jpg"
        recorte(im, foco).save(salida, "JPEG", quality=86, optimize=True, progressive=True)
        kb = salida.stat().st_size / 1024
        print(f"og: {pagina:12s} <- {archivo:28s} {kb:6.0f} KB")


if __name__ == "__main__":
    main()
