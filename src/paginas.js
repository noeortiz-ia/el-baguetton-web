/* Estructura del sitio en varias páginas.
   Cada entrada de PAGINAS decide qué secciones se pintan en su página.
   Las rutas viven como carpetas con su index.html (menu/, galeria/, ...). */

export const BASE = 'https://elbaguettonexpress.com.mx';

export const RUTA = {
  home: '/',
  menu: '/menu/',
  promociones: '/promociones/',
  galeria: '/galeria/',
  ubicacion: '/ubicacion/',
};

/* navegación principal: ahora son páginas, no anclas */
export const NAV = [
  { id: 'menu', t: 'Menú', r: RUTA.menu },
  { id: 'promociones', t: 'Promociones', r: RUTA.promociones },
  { id: 'galeria', t: 'Galería', r: RUTA.galeria },
  { id: 'ubicacion', t: 'Ubicación', r: RUTA.ubicacion },
];

export const PAGINAS = {
  home: {
    titulo: 'El Baguetton Express | Sándwiches y café en Valle Dorado',
    secciones: ['hero', 'servicios', 'marquesina', 'aderezos', 'promos', 'destacados', 'donde', 'cierre'],
  },
  menu: {
    titulo: 'Carta y precios | El Baguetton Express',
    secciones: ['cabecera', 'menu', 'pedir', 'cierre'],
  },
  promociones: {
    titulo: 'Promociones | El Baguetton Express',
    secciones: ['cabecera', 'promos', 'pedir', 'cierre'],
  },
  galeria: {
    titulo: 'Galería | El Baguetton Express',
    secciones: ['cabecera', 'galeria', 'cierre'],
  },
  ubicacion: {
    titulo: 'Ubicación y contacto | El Baguetton Express',
    secciones: ['cabecera', 'donde', 'faq', 'cierre'],
  },
};

/* cabecera corta de las páginas internas */
export const CABECERAS = {
  menu: {
    kicker: 'Carta',
    titulo: 'Carta y precios',
    lead: 'Sándwiches en baguette, ensaladas, dulce, café, batidos y jugos. Todos los aderezos se hacen aquí.',
    volver: 'Inicio',
  },
  promociones: {
    kicker: 'Lunes y viernes',
    titulo: 'Promociones',
    lead: 'Lunes 3x2 en todas las ensaladas y viernes café americano de regalo con tu baguette.',
    volver: 'Inicio',
  },
  galeria: {
    kicker: 'Galería',
    titulo: 'Fotos del local y los platillos',
    lead: 'Toca cualquier foto para verla en grande, pedirla o compartirla.',
    volver: 'Inicio',
  },
  ubicacion: {
    kicker: 'Ubicación',
    titulo: 'Dónde estamos',
    lead: 'Valle Nacional 106, Fracción Valle Dorado, Mezcales, Nayarit. Lun a vie de 8 am a 8 pm · sábado de 8 am a 2 pm.',
    volver: 'Inicio',
  },
};

/* platillos que se muestran en la portada, con foto real disponible */
export const DESTACADOS = ['La Primavera', 'Chori-Vegano', 'Baguetona', 'Mexicana', 'Clásico', 'Café de Olla'];

/* slug estable para anclas y para los identificadores del feed */
export const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
