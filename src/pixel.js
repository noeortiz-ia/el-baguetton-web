/* Seguimiento del sitio: Meta Pixel y Google Analytics 4 desde un solo lugar.
   Cada acción manda su evento estándar a las dos plataformas para que las
   cifras se puedan comparar sin traducir nombres a mano. */

const fbListo = () => typeof window !== 'undefined' && typeof window.fbq === 'function';
const gaListo = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

function meta(evento, datos) {
  if (fbListo()) window.fbq('track', evento, datos || {});
}

function ga(evento, datos) {
  if (gaListo()) window.gtag('event', evento, datos || {});
}

/* ---------- carga de página ---------- */

/** Vista de la ficha del negocio. En GA4 el page_view ya lo manda la configuración. */
export function avisarVista() {
  meta('ViewContent', {
    content_name: 'El Baguetton Express',
    content_category: 'Restaurante',
    content_type: 'product',
  });
}

/* ---------- conversiones ---------- */

/** Clic a WhatsApp: la conversión principal del sitio. */
export function avisarContacto(origen) {
  const categoria = origen || 'sitio';
  meta('Contact', { content_name: 'WhatsApp', content_category: categoria });
  meta('Lead', { content_name: 'WhatsApp', content_category: categoria });
  ga('contact', { method: 'whatsapp', origen: categoria });
  ga('generate_lead', { currency: 'MXN', value: 0, metodo: 'whatsapp', origen: categoria });
}

/** Clic a teléfono o correo. */
export function avisarLlamada(tipo, origen) {
  const categoria = origen || 'sitio';
  meta('Contact', { content_name: tipo, content_category: categoria });
  ga('contact', { method: tipo, origen: categoria });
}

/** Interés en la ubicación: mapa, ancla de "dónde y cuándo". */
export function avisarUbicacion(origen) {
  const categoria = origen || 'sitio';
  meta('FindLocation', {
    content_name: 'Valle Nacional 106, Valle Dorado, Mezcales',
    content_category: categoria,
  });
  ga('find_location', { method: 'mapa', origen: categoria });
}

/* ---------- interés en el producto ---------- */

/** Abrir una foto de la galería. */
export function avisarFoto(nombre, categoria) {
  meta('ViewContent', {
    content_name: nombre,
    content_category: categoria || 'galeria',
    content_type: 'product',
  });
  ga('view_item', {
    currency: 'MXN',
    value: 0,
    items: [{ item_name: nombre, item_category: categoria || 'galeria' }],
  });
}

/** Interés en un platillo de la carta. */
export function avisarPlatillo(nombre, precio, seccion) {
  meta('ViewContent', {
    content_name: nombre,
    content_category: seccion || 'menu',
    content_type: 'product',
  });
  ga('select_item', {
    item_list_name: seccion || 'Carta',
    items: [
      { item_name: nombre, item_category: seccion || 'menu', price: precio, currency: 'MXN' },
    ],
  });
}

/** Compartir el sitio. */
export function avisarCompartir(red) {
  meta('Compartir', { content_name: 'Sitio', content_category: red || 'enlace' });
  ga('share', { method: red || 'enlace', content_type: 'sitio' });
}

/* ---------- recorrido ---------- */

/** Marca cuándo se llega a cada bloque importante y a 50% y 90% de la página. */
export function observarSecciones() {
  if (typeof document === 'undefined' || typeof IntersectionObserver !== 'function') {
    return () => {};
  }

  const bloques = [
    { id: 'menu', nombre: 'Carta', elemento: 'platillos' },
    { id: 'aderezos', nombre: 'Aderezos', elemento: 'platillos' },
    { id: 'galeria', nombre: 'Galería', elemento: 'fotos' },
  ];

  const vistos = new Set();
  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        if (vistos.has(id)) return;
        vistos.add(id);
        const b = bloques.find((x) => x.id === id);
        ga('view_item_list', {
          item_list_name: b ? b.nombre : id,
          item_list_id: id,
          items: [{ item_name: b ? b.nombre : id, item_category: b ? b.elemento : 'seccion' }],
        });
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.35 }
  );

  bloques.forEach((b) => {
    const el = document.getElementById(b.id);
    if (el) obs.observe(el);
  });

  /* profundidad de lectura */
  const marcas = { 50: false, 90: false };
  const alScrollear = () => {
    const alto = document.documentElement.scrollHeight - window.innerHeight;
    if (alto <= 0) return;
    const pct = Math.round((window.scrollY / alto) * 100);
    [50, 90].forEach((m) => {
      if (!marcas[m] && pct >= m) {
        marcas[m] = true;
        ga('scroll', { percent_scrolled: m, pagina: 'inicio' });
      }
    });
  };
  window.addEventListener('scroll', alScrollear, { passive: true });

  return () => {
    obs.disconnect();
    window.removeEventListener('scroll', alScrollear);
  };
}

/* ---------- escucha global de clics ---------- */

/** Clasifica los clics sin tener que tocar cada botón. */
export function escucharClics() {
  if (typeof document === 'undefined') return () => {};

  const alClic = (e) => {
    const enlace = e.target?.closest?.('a');
    if (!enlace) return;
    const href = enlace.getAttribute('href') || '';

    const donde =
      enlace.closest('footer') ? 'pie'
      : enlace.closest('.menu-movil') ? 'menu_movil'
      : enlace.closest('.nav') ? 'barra_superior'
      : enlace.closest('.hero') ? 'portada'
      : enlace.closest('.wa-flotante') ? 'boton_flotante'
      : 'seccion';

    if (href.includes('wa.me')) {
      avisarContacto(donde);
      return;
    }

    if (href.startsWith('tel:')) {
      avisarLlamada('telefono', donde);
      return;
    }

    if (href.startsWith('mailto:')) {
      avisarLlamada('correo', donde);
      return;
    }

    if (href.startsWith('#donde') || href.includes('google.com/maps')) {
      avisarUbicacion(donde);
    }
  };

  document.addEventListener('click', alClic, { passive: true });
  return () => document.removeEventListener('click', alClic);
}
