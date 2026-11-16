/* Cintillo superior con la promoción que toca.
   Regla del negocio:
     · lunes                        -> 3x2 en ensaladas (es hoy)
     · martes a viernes             -> americano gratis (el viernes es hoy)
     · sábado y domingo             -> 3x2 en ensaladas del lunes siguiente
   La fecha se calcula en hora de México para que no se adelante ni se atrase
   cuando el visitante entra desde otro huso. */

const ZONA = 'America/Mexico_City';

const PROMOS = {
  lunes: {
    etiquetaHoy: 'Hoy',
    etiquetaDespues: 'Este lunes',
    texto: '3x2 en ensaladas · pides 3 y pagas 2',
    detalle: 'Hasta agotar existencias',
    en: {
      etiquetaHoy: 'Today',
      etiquetaDespues: 'This Monday',
      texto: '3-for-2 on salads · order 3, pay 2',
      detalle: 'While supplies last',
      cta: 'See specials',
    },
  },
  viernes: {
    etiquetaHoy: 'Hoy',
    etiquetaDespues: 'Este viernes',
    texto: 'americano gratis con tu baguette',
    detalle: 'No aplica en Baguette Clásico',
    en: {
      etiquetaHoy: 'Today',
      etiquetaDespues: 'This Friday',
      texto: 'free americano with your baguette',
      detalle: 'Not valid on Baguette Clásico',
      cta: 'See specials',
    },
  },
};

function diaSemana(fecha) {
  try {
    const corto = new Intl.DateTimeFormat('en-US', { timeZone: ZONA, weekday: 'short' }).format(fecha);
    return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[corto] || 1;
  } catch {
    /* navegador viejo: cae al día local */
    const d = fecha.getDay();
    return d === 0 ? 7 : d;
  }
}

export function promoVigente(fecha = new Date()) {
  const dia = diaSemana(fecha);
  const esLunes = dia === 1;
  const esViernes = dia === 5;

  if (esLunes) return { ...PROMOS.lunes, esHoy: true };
  if (dia >= 2 && dia <= 5) return { ...PROMOS.viernes, esHoy: esViernes };
  return { ...PROMOS.lunes, esHoy: false };
}

export function textoCintillo(fecha = new Date(), idioma = 'es') {
  const p = promoVigente(fecha);
  const t = idioma === 'en' ? p.en : p;
  return {
    etiqueta: p.esHoy ? t.etiquetaHoy : t.etiquetaDespues,
    texto: t.texto,
    detalle: t.detalle,
    cta: idioma === 'en' ? 'See specials' : 'Ver promociones',
    esHoy: p.esHoy,
  };
}
