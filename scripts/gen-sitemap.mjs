/* Sitemap con las cinco páginas del sitio y las fotos reales de cada una.
   Se genera en cada build para que las fechas no envejezcan. */

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { FOTOS } from '../src/data/feed.js';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const BASE = 'https://elbaguettonexpress.com.mx';
const hoy = new Date().toISOString().slice(0, 10);

const paginas = [
  { ruta: '/', prioridad: '1.0', frecuencia: 'weekly' },
  { ruta: '/menu/', prioridad: '0.9', frecuencia: 'weekly' },
  { ruta: '/promociones/', prioridad: '0.8', frecuencia: 'weekly' },
  { ruta: '/galeria/', prioridad: '0.7', frecuencia: 'monthly' },
  { ruta: '/ubicacion/', prioridad: '0.8', frecuencia: 'monthly' },
];

const img = (loc, titulo) => `    <image:image>
      <image:loc>${BASE}${loc}</image:loc>${titulo ? `\n      <image:title>${titulo}</image:title>` : ''}
    </image:image>`;

const urls = paginas
  .map((p) => {
    const fotos =
      p.ruta === '/' || p.ruta === '/galeria/'
        ? Object.values(FOTOS)
            .slice(0, 8)
            .map((f) => img(`/img/real/${f}`, ''))
            .join('\n')
        : '';
    return `  <url>
    <loc>${BASE}${p.ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${p.frecuencia}</changefreq>
    <priority>${p.prioridad}</priority>
${fotos}
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

writeFileSync(join(raiz, 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap: ${paginas.length} páginas`);
