/* Crea las páginas internas del sitio (menu/, promociones/, galeria/, ubicacion/)
   a partir de index.html: mismo head técnico (fuentes, píxeles, medición) con
   título, descripción, canonical, Open Graph, Twitter Card y datos estructurados
   propios de cada página.
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
const GEO = { lat: 20.7159547, lng: -105.2737517 };

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const DIRECCION = {
  '@type': 'PostalAddress',
  streetAddress: 'Valle Nacional 106, Fracc. Valle Dorado',
  addressLocality: 'Mezcales',
  addressRegion: 'Nayarit',
  postalCode: '63735',
  addressCountry: 'MX',
};

const HORARIO = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '20:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '08:00',
    closes: '14:00',
  },
];

const REDES = [
  'https://facebook.com/baguettonbahia',
  'https://www.instagram.com/baguettonbahia/',
  'https://www.youtube.com/@ElBaguettonExpress',
];

const plantilla = readFileSync(join(raiz, 'index.html'), 'utf8');

const PAGINAS = {
  menu: {
    titulo: `Carta y precios | ${MARCA}`,
    desc:
      'Carta completa de El Baguetton Express: baguettones, ensaladas, dulces, café, batidos y jugos, con precios. Pide por WhatsApp 322 370 6472.',
    h1: 'Carta y precios',
    ogAlt: 'Baguetton Express: carta con baguettones, ensaladas y café en Valle Dorado, Mezcales',
  },
  promociones: {
    titulo: `Promociones | ${MARCA}`,
    desc:
      'Lunes 3x2 en todas las ensaladas y viernes café americano de regalo con tu baguette. Promociones de El Baguetton Express en Valle Dorado, Mezcales.',
    h1: 'Promociones',
    ogAlt: 'Promoción de los viernes: café americano de regalo con tu baguette en El Baguetton Express',
  },
  galeria: {
    titulo: `Galería | ${MARCA}`,
    desc:
      'Fotos reales de los platillos y del local de El Baguetton Express en Valle Dorado, Mezcales, Nayarit.',
    h1: 'Fotos del local y los platillos',
    ogAlt: 'Ensalada recién preparada en El Baguetton Express, Valle Dorado, Mezcales',
  },
  ubicacion: {
    titulo: `Ubicación y contacto | ${MARCA}`,
    desc:
      'Valle Nacional 106, Fracc. Valle Dorado, Mezcales, Nayarit. Horario, mapa, WhatsApp 322 370 6472 y teléfono 329 116 9824.',
    h1: 'Dónde estamos',
    ogAlt: 'El Baguetton Express en Valle Nacional 106, Valle Dorado, Mezcales, Nayarit',
  },
};

const itemsMenu = MENU.flatMap((g) =>
  g.items.map((it) => (it.n && { g: g.t, gs: g.s, ...it })).filter(Boolean)
);

const secciones = MENU.map((g) => ({
  '@type': 'MenuSection',
  name: g.t,
  ...(g.s ? { description: g.s } : {}),
  numberOfItems: g.items.length,
  hasMenuItem: g.items.map((it) => ({
    '@type': 'MenuItem',
    name: it.n,
    ...(it.d ? { description: it.d } : {}),
    url: `${BASE}/menu/#p-${slug(it.n)}`,
    ...(it.ir ? { image: `${BASE}${it.ir}` } : {}),
    offers: {
      '@type': 'Offer',
      price: it.p,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
    },
  })),
}));

const fotosGaleria = Object.entries(FOTOS).map(([platillo, archivo]) => ({
  '@type': 'ImageObject',
  contentUrl: `${BASE}/img/real/${archivo}`,
  name: platillo,
  caption: platillo,
}));

function schemaDe(pagina, url) {
  const og = `${BASE}/img/og/${pagina}.jpg`;
  const web = {
    '@type': 'WebPage',
    '@id': `${url}#pagina`,
    url,
    name: PAGINAS[pagina].titulo,
    description: PAGINAS[pagina].desc,
    inLanguage: 'es-MX',
    isPartOf: { '@id': `${BASE}/#sitio` },
    about: { '@id': `${BASE}/#restaurante` },
    primaryImageOfPage: { '@type': 'ImageObject', '@id': `${url}#imagen`, url: og, caption: PAGINAS[pagina].ogAlt },
    breadcrumb: { '@type': 'BreadcrumbList', '@id': `${url}#migas` },
  };

  const migas = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#migas`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: PAGINAS[pagina].h1, item: url },
    ],
  };

  let extra;
  if (pagina === 'menu') {
    extra = {
      '@type': 'Menu',
      '@id': `${url}#carta`,
      name: `Carta de ${MARCA}`,
      description: PAGINAS.menu.desc,
      url,
      inLanguage: 'es-MX',
      image: og,
      numberOfItems: itemsMenu.length,
      hasMenuSection: secciones,
      provider: { '@id': `${BASE}/#restaurante` },
    };
  } else if (pagina === 'promociones') {
    extra = {
      '@type': 'OfferCatalog',
      '@id': `${url}#promociones`,
      name: `Promociones de ${MARCA}`,
      url,
      numberOfItems: 2,
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Lunes 3x2 en ensaladas',
          description:
            'Los lunes, en la compra de tres ensaladas pagas dos. Aplica en todas las ensaladas, todo el día, hasta agotar existencias.',
          category: 'Promoción de lunes',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'MXN',
          itemOffered: { '@type': 'MenuSection', name: 'Ensaladas', '@id': `${BASE}/menu/#carta` },
          seller: { '@id': `${BASE}/#restaurante` },
        },
        {
          '@type': 'Offer',
          name: 'Viernes café americano de regalo',
          description:
            'Los viernes, en la compra de tu baguette te regalamos el café americano. No aplica en Baguette Clásico.',
          category: 'Promoción de viernes',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'MXN',
          itemOffered: { '@type': 'Product', name: 'Café americano' },
          seller: { '@id': `${BASE}/#restaurante` },
        },
      ],
    };
  } else if (pagina === 'galeria') {
    extra = {
      '@type': 'ImageGallery',
      '@id': `${url}#galeria`,
      name: `Galería de ${MARCA}`,
      url,
      image: og,
      numberOfItems: fotosGaleria.length,
      associatedMedia: fotosGaleria,
      about: { '@id': `${BASE}/#restaurante` },
    };
  } else {
    extra = {
      '@type': ['Restaurant', 'LocalBusiness'],
      '@id': `${BASE}/#restaurante`,
      name: MARCA,
      url: `${BASE}/`,
      image: og,
      telephone: '+523291169824',
      email: 'elbaguettonexpress@gmail.com',
      address: DIRECCION,
      geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
      hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
        'El Baguetton Express, Valle Nacional 106, Valle Dorado, Mezcales, Nayarit'
      )}`,
      openingHoursSpecification: HORARIO,
      servesCuisine: ['Sándwiches', 'Baguettes', 'Ensaladas', 'Café'],
      priceRange: '$',
      currenciesAccepted: 'MXN',
      paymentAccepted: 'Efectivo, Tarjeta de crédito, Tarjeta de débito, Carnet, Mercado Pago',
      hasMenu: { '@id': `${BASE}/menu/#carta` },
      sameAs: REDES,
    };
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [web, migas, extra] }, null, 2);
}

function construir(pagina) {
  const p = PAGINAS[pagina];
  let html = plantilla;
  const url = `${BASE}/${pagina}/`;
  const og = `${BASE}/img/og/${pagina}.jpg`;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.titulo}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${p.desc}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

  /* Open Graph / Twitter Card propios de la página */
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${p.titulo}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${p.desc}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${og}$2`);
  html = html.replace(/(<meta property="og:image:secure_url" content=")[^"]*(")/, `$1${og}$2`);
  html = html.replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${p.ogAlt}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${p.titulo}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${p.desc}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${og}$2`);
  html = html.replace(/(<meta name="twitter:image:alt" content=")[^"]*(")/, `$1${p.ogAlt}$2`);

  /* datos estructurados propios de la página */
  const ini = html.indexOf('<!-- SCHEMA:START -->');
  const fin = html.indexOf('<!-- SCHEMA:END -->');
  if (ini > -1 && fin > ini) {
    const bloque =
      '<!-- SCHEMA:START -->\n  <script type="application/ld+json">\n' +
      schemaDe(pagina, url) +
      '\n  </script>\n  <!-- SCHEMA:END -->';
    html = html.slice(0, ini) + bloque + html.slice(fin + '<!-- SCHEMA:END -->'.length);
  }

  html = html.replace(/<body[^>]*>/, `<body data-page="${pagina}">`);

  mkdirSync(join(raiz, pagina), { recursive: true });
  writeFileSync(join(raiz, pagina, 'index.html'), html, 'utf8');
  console.log(`página: /${pagina}/  og: /img/og/${pagina}.jpg`);
}

/* la portada mantiene su head; solo se marca la página */
writeFileSync(
  join(raiz, 'index.html'),
  plantilla.replace(/<body[^>]*>/, '<body data-page="home">'),
  'utf8'
);

for (const pagina of Object.keys(PAGINAS)) construir(pagina);
