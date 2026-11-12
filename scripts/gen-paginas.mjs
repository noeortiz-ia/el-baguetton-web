/* Crea las páginas internas del sitio (menu/, promociones/, galeria/, ubicacion/)
   a partir de index.html: mismo head técnico (fuentes, píxeles, medición) con
   título, descripción, canonical y datos estructurados propios de cada página.
   Se corre antes de `vite build`; Vite compila cada carpeta como entrada aparte. */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import MENU from '../src/data/menu.js';
import { FOTOS } from '../src/data/feed.js';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const BASE = 'https://elbaguettonexpress.com.mx';
const MARCA = 'El Baguetton Express';

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const plantilla = readFileSync(join(raiz, 'index.html'), 'utf8');

const PAGINAS = {
  menu: {
    titulo: `Carta y precios | ${MARCA}`,
    desc:
      'Carta completa de El Baguetton Express: baguettones, ensaladas, dulces, café, batidos y jugos, con precios. Pide por WhatsApp 322 370 6472.',
    h1: 'Carta y precios',
  },
  promociones: {
    titulo: `Promociones | ${MARCA}`,
    desc:
      'Lunes 3x2 en todas las ensaladas y viernes café americano de regalo con tu baguette. Promociones de El Baguetton Express en Valle Dorado, Mezcales.',
    h1: 'Promociones',
  },
  galeria: {
    titulo: `Galería | ${MARCA}`,
    desc:
      'Fotos reales de los platillos y del local de El Baguetton Express en Valle Dorado, Mezcales, Nayarit.',
    h1: 'Fotos del local y los platillos',
  },
  ubicacion: {
    titulo: `Ubicación y contacto | ${MARCA}`,
    desc:
      'Valle Nacional 106, Fracc. Valle Dorado, Mezcales, Nayarit. Horario, mapa, WhatsApp 322 370 6472 y teléfono 329 116 9824.',
    h1: 'Dónde estamos',
  },
};

const itemsMenu = MENU.flatMap((g) =>
  g.items.map((it) => ({
    '@type': 'MenuItem',
    name: it.n,
    description: it.d,
    url: `${BASE}/menu/#p-${slug(it.n)}`,
    offers: { '@type': 'Offer', price: it.p, priceCurrency: 'MXN', availability: 'https://schema.org/InStock' },
  }))
);

function schemaDe(pagina) {
  const url = `${BASE}/${pagina}/`;
  const migas = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: PAGINAS[pagina].h1, item: url },
    ],
  };
  const web = {
    '@type': 'WebPage',
    '@id': `${url}#pagina`,
    url,
    name: PAGINAS[pagina].titulo,
    description: PAGINAS[pagina].desc,
    inLanguage: 'es-MX',
    isPartOf: { '@type': 'WebSite', '@id': `${BASE}/#website` },
    about: { '@type': 'Restaurant', '@id': `${BASE}/#restaurante` },
  };
  const extra =
    pagina === 'menu'
      ? {
          '@type': 'Menu',
          '@id': `${url}#carta`,
          name: 'Carta de El Baguetton Express',
          inLanguage: 'es-MX',
          hasMenuSection: MENU.map((g) => ({
            '@type': 'MenuSection',
            name: g.t,
            description: g.s,
            hasMenuItem: itemsMenu.filter((it) => g.items.some((x) => x.n === it.name)),
          })),
        }
      : pagina === 'galeria'
        ? {
            '@type': 'ImageGallery',
            name: 'Galería de El Baguetton Express',
            image: Object.values(FOTOS).map((f) => `${BASE}/img/real/${f}`),
          }
        : pagina === 'ubicacion'
          ? { '@type': 'ContactPage', name: 'Contacto y ubicación' }
          : { '@type': 'CollectionPage', name: 'Promociones' };

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [web, migas, extra] }, null, 2);
}

function construir(pagina) {
  const p = PAGINAS[pagina];
  let html = plantilla;
  const url = `${BASE}/${pagina}/`;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.titulo}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${p.desc}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${p.titulo}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${p.desc}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${p.titulo}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${p.desc}$2`);

  /* datos estructurados propios de la página */
  const ini = html.indexOf('<!-- SCHEMA:START -->');
  const fin = html.indexOf('<!-- SCHEMA:END -->');
  if (ini > -1 && fin > ini) {
    const bloque =
      '<!-- SCHEMA:START -->\n  <script type="application/ld+json">\n' +
      schemaDe(pagina) +
      '\n  </script>\n  <!-- SCHEMA:END -->';
    html = html.slice(0, ini) + bloque + html.slice(fin + '<!-- SCHEMA:END -->'.length);
  }

  html = html.replace(/<body[^>]*>/, `<body data-page="${pagina}">`);

  mkdirSync(join(raiz, pagina), { recursive: true });
  writeFileSync(join(raiz, pagina, 'index.html'), html, 'utf8');
  console.log(`página: /${pagina}/`);
}

/* la portada mantiene su head; solo se marca la página */
const index = `<body data-page="home">`;
writeFileSync(
  join(raiz, 'index.html'),
  plantilla.replace(/<body[^>]*>/, index),
  'utf8'
);

for (const pagina of Object.keys(PAGINAS)) construir(pagina);
