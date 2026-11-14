/* Fotos reales por platillo y datos que necesita el catálogo de compras.
   Solo se listan los platillos con foto real disponible: el feed no inventa imagen.
   `foto` es el archivo dentro de /public/img/real/. */

export const FOTOS = {
  'Clásico': 'clasico.webp',
  'Chori-Vegano': 'chori-vegano-bagel.webp',
  'Baguetona': 'baguetona.webp',
  'Mexicana': 'mexicana-v2.webp',
  'La Primavera': 'la-primavera.webp',
  'Café de Olla': 'cafe-de-olla.webp',
  'Café Americano': 'cafe.webp',
  'Mangazo': 'licuado-mango.webp',
  'Fresón': 'freson.webp',
  'Verde Que Te Quiero Verde': 'jugo-verde.webp',
  'Rojo Vivo': 'rojo-vivo.webp',
  'Rebanada de panqué': 'panquecitos.webp',
  'Biónico Baguetton': 'gal-8.webp',
  'Rojo Pasión': 'gal-4.webp',
  'Remolacha Deli': 'gal-2.webp',
  'La BBQ': 'la-bbq.webp',
};

/* categoría de Google por grupo de la carta */
export const CATEGORIA_GOOGLE = {
  baguettones: 'Food, Beverages & Tobacco > Food Items',
  'sin-prisas': 'Food, Beverages & Tobacco > Food Items',
  ensaladas: 'Food, Beverages & Tobacco > Food Items',
  dulces: 'Food, Beverages & Tobacco > Food Items > Baked Goods',
  batidos: 'Food, Beverages & Tobacco > Beverages',
  jugos: 'Food, Beverages & Tobacco > Beverages',
  bebidas: 'Food, Beverages & Tobacco > Beverages',
  picoteo: 'Food, Beverages & Tobacco > Food Items',
  bionicos: 'Food, Beverages & Tobacco > Food Items',
};

/* etiqueta legible del grupo, para el tipo de producto del feed */
export const FAMILIA = {
  baguettones: 'Sándwiches en baguette',
  'sin-prisas': 'Sándwiches y bagels',
  ensaladas: 'Ensaladas',
  dulces: 'Dulces y panadería',
  batidos: 'Batidos y licuados',
  jugos: 'Jugos naturales',
  bebidas: 'Café',
  picoteo: 'Picoteo',
  bionicos: 'Bionicos y frutas',
};

/* miniatura de 320 px para la carta: la foto completa se reserva a la galería y al feed */
export const thumb = (archivo) => `/img/thumb/${String(archivo).replace(/\.[a-z]+$/i, '')}.webp`;

/* versión de 640 px para el mosaico de la galería: la completa solo se pide al abrir el visor */
export const thumbGrande = (archivo) =>
  `/img/thumb640/${String(archivo).replace(/\.[a-z]+$/i, '')}.webp`;
