/**
 * Genera el JSON-LD del sitio a partir de las MISMAS fuentes que la página
 * (src/data/menu.js y src/data/faq.js) y lo inyecta en index.html entre
 * los marcadores SCHEMA:START / SCHEMA:END.
 *
 * Se corre solo en `npm run build`, antes de Vite. Así el schema nunca
 * se desfasa de los precios ni de las preguntas publicadas.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import MENU from '../src/data/menu.js';
import FAQ from '../src/data/faq.js';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTML = path.join(raiz, 'index.html');

const BASE = 'https://elbaguettonexpress.com.mx/';
const NOMBRE = 'El Baguetton Express';
const CORREO = 'elbaguettonexpress@gmail.com';
const GEO = { lat: 20.7159547, lng: -105.2737517 };

const REDES = [
  'https://facebook.com/baguettonbahia',
  'https://www.instagram.com/baguettonbahia/',
  'https://www.youtube.com/@ElBaguettonExpress',
];

const IMAGENES = [
  `${BASE}img/og-image.png`,
  `${BASE}img/real/sandwich.jpg`,
  `${BASE}img/real/ensalada.jpg`,
  `${BASE}img/real/promo-lunes-ensaladas.jpg`,
  `${BASE}img/real/cafe.jpg`,
  `${BASE}img/real/gal-1.jpg`,
  `${BASE}img/real/gal-4.jpg`,
];

const DIRECCION = {
  '@type': 'PostalAddress',
  streetAddress: 'Valle Nacional 106, Fracc. Valle Dorado',
  addressLocality: 'Mezcales',
  addressRegion: 'Nayarit',
  postalCode: '63735',
  addressCountry: 'MX',
};

const ORGANIZACION = {
  '@type': 'Organization',
  '@id': `${BASE}#organizacion`,
  name: NOMBRE,
  url: BASE,
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE}#logo`,
    url: `${BASE}img/logo-crema.png`,
    caption: NOMBRE,
  },
  image: { '@id': `${BASE}#logo` },
  sameAs: REDES,
  address: DIRECCION,
  email: CORREO,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://wa.me/523223706472',
      email: CORREO,
      availableLanguage: ['es-MX'],
      areaServed: 'MX',
    },
  ],
};

/* La carta como Menu → MenuSection → MenuItem, con el precio de cada renglón. */
const CARTA = {
  '@type': 'Menu',
  '@id': `${BASE}#carta`,
  name: `Carta de ${NOMBRE}`,
  inLanguage: 'es-MX',
  hasMenuSection: MENU.map((g) => ({
    '@type': 'MenuSection',
    name: g.t,
    ...(g.s ? { description: g.s } : {}),
    hasMenuItem: g.items.map((it) => ({
      '@type': 'MenuItem',
      name: it.n,
      ...(it.d ? { description: it.d } : {}),
      offers: {
        '@type': 'Offer',
        price: it.p,
        priceCurrency: 'MXN',
        availability: 'https://schema.org/InStock',
        ...(it.ir ? { url: `${BASE}${it.ir}` } : {}),
      },
    })),
  })),
};

const RESTAURANTE = {
  '@type': ['Restaurant', 'LocalBusiness'],
  '@id': `${BASE}#restaurante`,
  name: NOMBRE,
  alternateName: 'Baguetton Express',
  description:
    'Sandwichería en Valle Dorado, Mezcales: sándwiches en baguette, ensaladas, café y aderezos hechos en casa.',
  url: BASE,
  image: IMAGENES,
  logo: { '@id': `${BASE}#logo` },
  email: CORREO,
  address: DIRECCION,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.lat,
    longitude: GEO.lng,
  },
  hasMap: 'https://www.google.com/maps?q=El+Baguetton+Express,+Valle+Nacional+106,+Valle+Dorado,+Mezcales,+Nayarit',
  servesCuisine: ['Sándwiches', 'Baguettes', 'Ensaladas', 'Café'],
  priceRange: '$',
  currenciesAccepted: 'MXN',
  paymentAccepted: 'Efectivo, Tarjeta de crédito, Tarjeta de débito, Mercado Pago',
  menu: { '@id': `${BASE}#carta` },
  hasMenu: { '@id': `${BASE}#carta` },
  hasOfferCatalog: { '@id': `${BASE}#promociones` },
  openingHoursSpecification: [
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
  ],
  areaServed: [
    { '@type': 'Place', name: 'Valle Dorado, Mezcales' },
    { '@type': 'Place', name: 'Bahía de Banderas, Nayarit' },
  ],
  sameAs: REDES,
  parentOrganization: { '@id': `${BASE}#organizacion` },
  potentialAction: {
    '@type': 'OrderAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://wa.me/523223706472',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModePickUp',
  },
};

/* Promociones vigentes: los días y la condición salen de aquí, igual que en la página. */
const PROMOS = [
  {
    '@type': 'Offer',
    name: 'Lunes 3x2 en ensaladas',
    description:
      'Los lunes, en la compra de tres ensaladas pagas dos. Aplica en el local y por WhatsApp, todo el día, hasta agotar existencias.',
    category: 'Promoción de lunes',
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
    itemOffered: { '@id': `${BASE}#carta` },
  },
  {
    '@type': 'Offer',
    name: 'Viernes café americano de regalo',
    description:
      'Los viernes, en la compra de tu baguette te regalamos el café americano. No aplica en Baguette Clásico.',
    category: 'Promoción de viernes',
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
    itemOffered: { '@id': `${BASE}#carta` },
  },
];

const PROMOCIONES = {
  '@type': 'OfferCatalog',
  '@id': `${BASE}#promociones`,
  name: `Promociones de ${NOMBRE}`,
  url: `${BASE}#promos`,
  numberOfItems: PROMOS.length,
  itemListElement: PROMOS,
};

const FAQPAGE = {
  '@type': 'FAQPage',
  '@id': `${BASE}#preguntas-frecuentes`,
  isPartOf: { '@id': `${BASE}#pagina` },
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const SITIO = {
  '@type': 'WebSite',
  '@id': `${BASE}#sitio`,
  url: BASE,
  name: NOMBRE,
  inLanguage: 'es-MX',
  publisher: { '@id': `${BASE}#organizacion` },
};

const PAGINA = {
  '@type': 'WebPage',
  '@id': `${BASE}#pagina`,
  url: BASE,
  name: 'El Baguetton Express | Sándwiches y café en Valle Dorado',
  description:
    'Sándwiches, ensaladas y café con aderezos caseros en Valle Dorado, Mezcales. Aceptamos tarjeta y Mercado Pago. Lun a vie 8 am a 8 pm, sáb 8 am a 2 pm.',
  inLanguage: 'es-MX',
  isPartOf: { '@id': `${BASE}#sitio` },
  about: { '@id': `${BASE}#restaurante` },
  primaryImageOfPage: { '@type': 'ImageObject', url: `${BASE}img/og-image.png` },
  breadcrumb: { '@id': `${BASE}#migas` },
  significantLink: [
    `${BASE}#promos`,
    `${BASE}#menu`,
    `${BASE}#aderezos`,
    `${BASE}#como-pedir`,
    `${BASE}#pagos`,
    `${BASE}#galeria`,
    `${BASE}#preguntas`,
    `${BASE}#donde`,
  ],
};

const MIGAS = {
  '@type': 'BreadcrumbList',
  '@id': `${BASE}#migas`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Promociones', item: `${BASE}#promos` },
    { '@type': 'ListItem', position: 3, name: 'Carta', item: `${BASE}#menu` },
    { '@type': 'ListItem', position: 4, name: 'Aderezos', item: `${BASE}#aderezos` },
    { '@type': 'ListItem', position: 5, name: 'Dónde estamos', item: `${BASE}#donde` },
    { '@type': 'ListItem', position: 6, name: 'Preguntas frecuentes', item: `${BASE}#preguntas` },
  ],
};

const grafo = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZACION,
    RESTAURANTE,
    CARTA,
    PROMOCIONES,
    SITIO,
    PAGINA,
    MIGAS,
    FAQPAGE,
  ],
};

const bloque = `<script type="application/ld+json">\n${JSON.stringify(grafo, null, 2)}\n</script>`;

let html = fs.readFileSync(HTML, 'utf8');
const MARCA_FIN = '<!-- SCHEMA:END -->';
const inicio = html.indexOf('<!-- SCHEMA:START -->');
const fin = html.lastIndexOf(MARCA_FIN);

if (inicio === -1 || fin === -1) {
  console.error('[schema] No encontré los marcadores SCHEMA:START / SCHEMA:END en index.html');
  process.exit(1);
}

/* se quita cualquier <script ld+json> previo dentro del bloque */
const antes = html.slice(0, inicio);
/* se salta el marcador de cierre para no ir acumulándolos en cada build */
const despues = html.slice(fin + MARCA_FIN.length);

html =
  `${antes}<!-- SCHEMA:START -->\n  ${bloque}\n  <!-- SCHEMA:END -->` + despues;

fs.writeFileSync(HTML, html);

const items = CARTA.hasMenuSection.reduce((a, s) => a + s.hasMenuItem.length, 0);
console.log(
  `[schema] ok · ${grafo['@graph'].length} entidades · ${CARTA.hasMenuSection.length} secciones · ${items} platillos · ${FAQ.length} preguntas`
);
