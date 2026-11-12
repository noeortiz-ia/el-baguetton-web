/* Genera los catálogos de productos para Meta Commerce y Google Merchant Center
   a partir de la carta (src/data/menu.js) y de las fotos reales disponibles
   (src/data/feed.js). No inventa imágenes: los platillos sin foto salen en
   public/feed/pendientes-foto.csv para que se fotografíen.

   Salidas:
     public/feed/meta-catalogo.csv
     public/feed/google-merchant.xml
     public/feed/pendientes-foto.csv
     public/feed/resumen.json
*/

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import MENU from '../src/data/menu.js';
import { FOTOS, CATEGORIA_GOOGLE, FAMILIA } from '../src/data/feed.js';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const salida = join(raiz, 'public', 'feed');
mkdirSync(salida, { recursive: true });

const BASE = 'https://elbaguettonexpress.com.mx';
const MARCA = 'El Baguetton Express';

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const limpiar = (s) => String(s || '').replace(/\s+/g, ' ').trim();

const productos = [];
const faltantes = [];
const pendientes = [];

for (const grupo of MENU) {
  for (const it of grupo.items) {
    const foto = FOTOS[it.n];
    const base = {
      id: `baguetton-${slug(it.n)}`,
      titulo: it.n,
      descripcion: limpiar(it.d),
      grupo: grupo.t,
      familia: FAMILIA[grupo.id] || grupo.t,
      precio: Number(it.p),
      link: `${BASE}/menu/#p-${slug(it.n)}`,
      categoria: CATEGORIA_GOOGLE[grupo.id] || 'Food, Beverages & Tobacco > Food Items',
    };
    if (foto) {
      // Meta solo acepta JPEG o PNG: se usa la copia en JPG de 600 px mínimo
      const jpg = foto.replace(/\.[a-z]+$/i, '.jpg');
      if (!existsSync(join(raiz, 'public', 'img', 'feed', jpg))) {
        faltantes.push(jpg);
      }
      productos.push({ ...base, imagen: `${BASE}/img/feed/${jpg}` });
    } else {
      pendientes.push(base);
    }
  }
}

/* ---------- Meta Commerce (CSV) ---------- */
const columnasMeta = [
  'id',
  'title',
  'description',
  'availability',
  'condition',
  'price',
  'link',
  'image_link',
  'brand',
  'google_product_category',
  'item_group_id',
  'quantity_to_sell_on_facebook',
];
const escapar = (v) => `"${String(v).replace(/"/g, '""')}"`;
const filasMeta = productos.map((p) => [
  p.id,
  `${p.titulo} · ${MARCA}`,
  `${p.descripcion} ${p.familia}.`,
  'in stock',
  'new',
  `${p.precio.toFixed(2)} MXN`,
  p.link,
  p.imagen,
  MARCA,
  p.categoria,
  p.id,
  50,
]);
const csvMeta =
  [columnasMeta.join(','), ...filasMeta.map((f) => f.map(escapar).join(','))].join('\n') + '\n';
writeFileSync(join(salida, 'meta-catalogo.csv'), csvMeta, 'utf8');

/* ---------- Google Merchant Center (RSS 2.0) ---------- */
const xmlEsc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const itemsXml = productos
  .map(
    (p) => `    <item>
      <g:id>${xmlEsc(p.id)}</g:id>
      <g:title>${xmlEsc(`${p.titulo} · ${MARCA}`)}</g:title>
      <g:description>${xmlEsc(`${p.descripcion} ${p.familia}.`)}</g:description>
      <g:link>${xmlEsc(p.link)}</g:link>
      <g:image_link>${xmlEsc(p.imagen)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${p.precio.toFixed(2)} MXN</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xmlEsc(MARCA)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${xmlEsc(p.categoria)}</g:google_product_category>
      <g:product_type>${xmlEsc(`Comida preparada > ${p.familia}`)}</g:product_type>
      <g:custom_label_0>${xmlEsc(p.grupo)}</g:custom_label_0>
      <g:custom_label_1>mostrador</g:custom_label_1>
    </item>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${MARCA} — carta</title>
    <link>${BASE}/menu/</link>
    <description>Carta de ${MARCA}, Valle Dorado, Mezcales, Nayarit.</description>
${itemsXml}
  </channel>
</rss>
`;
writeFileSync(join(salida, 'google-merchant.xml'), xml, 'utf8');

/* ---------- pendientes de foto ---------- */
const csvPend =
  ['id,title,price,link,motivo'].concat(
    pendientes.map((p) =>
      [p.id, p.titulo, `${p.precio.toFixed(2)} MXN`, p.link, 'sin foto real del platillo'].map(escapar).join(',')
    )
  ).join('\n') + '\n';
writeFileSync(join(salida, 'pendientes-foto.csv'), csvPend, 'utf8');

/* ---------- resumen ---------- */
const resumen = {
  generado: new Date().toISOString().slice(0, 10),
  moneda: 'MXN',
  total_carta: productos.length + pendientes.length,
  en_feed: productos.length,
  sin_foto: pendientes.length,
  feeds: {
    meta: `${BASE}/feed/meta-catalogo.csv`,
    google: `${BASE}/feed/google-merchant.xml`,
  },
  pendientes_foto: pendientes.map((p) => p.titulo),
};
writeFileSync(join(salida, 'resumen.json'), JSON.stringify(resumen, null, 2) + '\n', 'utf8');

console.log(`feed: ${productos.length} productos · ${pendientes.length} sin foto`);
if (faltantes.length) {
  console.log(`AVISO: falta el JPG de feed (Meta solo acepta JPEG/PNG) para: ${faltantes.join(', ')}`);
  console.log('       se generan con el script de fotos de feed antes de publicar.');
}
