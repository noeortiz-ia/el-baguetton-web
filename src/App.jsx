import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { avisarVista, escucharClics } from './pixel';

gsap.registerPlugin(ScrollTrigger);

const MAPA = '#donde';
const WA_TXT = 'Hola, quiero información de El Baguetton Express.';
const WA = `https://wa.me/523223706472?text=${encodeURIComponent(WA_TXT)}`;
const WA_VISIBLE = '322 370 6472';
const FB = 'https://facebook.com/baguettonbahia';
const YT = 'https://www.youtube.com/@ElBaguettonExpress';
const IG = 'https://www.instagram.com/baguettonbahia/';
/* sube esta versión cuando cambien video, póster o logo: evita la caché del CDN */
const AV = '?v=3';

const SERVICIOS = [
  {
    img: '/img/real/sandwich.jpg',
    t: 'Sándwiches',
    d: 'En baguette, armados al momento.',
    ir: '#menu-baguettones',
  },
  {
    img: '/img/real/ensalada.jpg',
    t: 'Ensaladas',
    d: 'Frescas, con aderezo aparte.',
    ir: '#menu-ensaladas',
  },
  {
    img: '/img/real/cafe.jpg',
    t: 'Café',
    d: 'Para acompañar o para llevar.',
    ir: '#menu-bebidas',
  },
  {
    img: '/img/real/gal-4.jpg',
    t: 'Dulce',
    d: 'Croissants, panqué y postres.',
    ir: '#menu-dulces',
  },
];


const CORREO = 'elbaguettonexpress@gmail.com';
const APERTURA = new Date('2026-11-06T00:00:00-06:00');

const PASOS = [
  { n: '01', t: 'Pide por WhatsApp', d: 'Nos dices qué quieres del menú y te confirmamos.' },
  { n: '02', t: 'Lo preparamos', d: 'Se arma al momento, con el aderezo que elijas.' },
  { n: '03', t: 'Recoges o te quedas', d: 'Pasas por él a Valle Nacional 106, o te sientas aquí.' },
];

const FAQ = [
  { q: '¿Cuándo abren?', a: 'El viernes 6 de noviembre de 2026, en Valle Nacional 106, Fracc. Valle Dorado, Mezcales, Nayarit.' },
  { q: '¿Cuál es el horario?', a: 'De lunes a sábado, de 8:00 am a 8:00 pm. Los domingos permanecemos cerrados.' },
  { q: '¿Puedo pedir para llevar?', a: 'Sí, todo el menú se puede pedir para llevar. Nos escribes por WhatsApp y lo recoges.' },
  { q: '¿Puedo cambiar la baguette por bagel o cuernito?', a: 'Sí. Casi todos los baguettones se pueden pedir en bagel o en cuernito, solo avísanos al pedir.' },
  { q: '¿Los aderezos son caseros?', a: 'Todos. Se preparan aquí: ranch eneldo, miel mostaza, vinagreta italiana, tamarindo y vinagreta de hierbas.' },
  { q: '¿Hay opciones sin carne?', a: 'Sí: el Ensaladón, el Chori-Vegano (chorizo vegano 100% sin gluten), el Quesero y las ensaladas Remolacha Deli y La Primavera.' },
];

const MARQUESINA = [
  { src: '/img/real/sandwich.jpg', t: 'Baguetton en baguette' },
  { src: '/img/real/ensalada.jpg', t: 'Ensalada con aderezo aparte' },
  { src: '/img/real/gal-2.jpg', t: 'Remolacha Deli' },
  { src: '/img/real/gal-4.jpg', t: 'Rojo Pasión' },
  { src: '/img/real/cafe.jpg', t: 'Café de olla' },
  { src: '/img/real/gal-5.jpg', t: 'Panqué de mantequilla' },
];

const ADEREZOS = [
  'Ranch eneldo',
  'Miel mostaza',
  'Vinagreta italiana',
  'Tamarindo',
  'Vinagreta de hierbas',
];

const MENU = [
  {
    id: 'baguettones',
    t: 'Baguettones',
    s: 'Nuestros sándwiches en baguette',
    nota: 'Todos, con opción en bagel o cuernito.',
    items: [
      { n: 'Clásico', p: 52, d: 'Jamón viena, salami, manchego y aderezo de la casa.' },
      { n: 'Plus', p: 85, d: 'Jamón de pierna de cerdo, manchego, salami, lechuga, jitomate y aderezo de la casa.' },
      { n: 'Pechugón', p: 85, d: 'Jamón de pechuga de pavo, manchego, salami, lechuga, jitomate y aderezo de la casa.' },
      { n: 'Pollero', p: 105, d: 'Fajitas de pollo, manchego, lechuga, jitomate y aderezo de la casa.' },
      { n: 'Pizzero', p: 85, d: 'Salsa de pizza, pepperoni, queso gratinado y aderezo de la casa.' },
      { n: 'Tunero', p: 105, d: 'Atún, manchego, lechuga, pepino, jitomate y aderezo de la casa.' },
      { n: 'Quesero', p: 105, d: 'Manchego, panela y queso regianito, lechuga, jitomate y aderezo de la casa.' },
      { n: 'Ensaladón', p: 85, d: 'Zetas y calabazas cocinadas, lechuga, jitomate, zanahoria, betabel, germen, pepino y aderezo de la casa.' },
      { n: 'Chori-Vegano', p: 95, d: 'Chorizo vegano 100% sin gluten, queso manchego, lechuga y aderezo de la casa.' },
    ],
  },
  {
    id: 'sin-prisas',
    t: 'Sin Prisas',
    s: 'Para comer con calma',
    items: [
      { n: 'Bagel Huevón', p: 105, d: 'Huevito cocinado, queso manchego, espinaca, jitomate, lechuga y aderezo de la casa.' },
      { n: 'Pizzero Tropical', p: 105, d: 'Salsa de pizza, piña, durazno, queso gratinado y aderezo de la casa.' },
      { n: 'Molletón', p: 85, d: 'Frijolitos negros, queso gratinado, aderezo de la casa y pico de gallo.' },
    ],
  },
  {
    id: 'ensaladas',
    t: 'Ensaladas',
    s: 'Con el aderezo que tú elijas',
    items: [
      { n: 'Baguetona', p: 120, d: 'Lechuga, fajitas de pollo salpimentadas, zanahoria, betabel, germen, jitomate cherry, pepino y croutones.' },
      { n: 'Mexicana', p: 115, d: 'Lechuga, jitomate, aguacate, elote, queso panela y tortillitas horneadas con chile guajillo.' },
      { n: 'La BBQ', p: 120, d: 'Lechuga, fajitas de pollo BBQ, brócoli, zanahoria, pepino, germen y tortillitas horneadas.' },
      { n: 'Cacahuata', p: 130, d: 'Lechuga, fajitas de pollo al cacahuate, brócoli, zanahoria, pepino, germen y cacahuates.' },
      { n: 'Remolacha Deli', p: 115, d: 'Betabel fileteado, vinagreta de hierbas, pistaches y requesón.' },
      { n: 'La Primavera', p: 115, d: 'Lechuga, quinoa, fresa, cubos de panela y nuez caramelizada.' },
    ],
  },
  {
    id: 'dulces',
    t: 'Dulces bocados',
    s: 'Los empalagosos',
    items: [
      { n: 'Rojo Pasión', p: 65, d: 'Cuernito calientito con compota casera de frutos rojos y queso doble crema.' },
      { n: 'Panqué Mantequilla', p: 65, d: 'Panqué de mantequilla 100% con naranja.' },
      { n: 'Cubilete Baguetton', p: 55, d: 'Panquesito de queso.' },
    ],
  },
  {
    id: 'bebidas',
    t: 'Las bebidas',
    s: '16 oz',
    items: [
      { n: 'Café de Olla', p: 55, d: 'Con auténtico piloncillo.' },
      { n: 'Café Americano', p: 50, d: 'Café americano.' },
    ],
  },
  {
    id: 'batidos',
    t: 'Batidos y licuados',
    s: 'Con leche entera, avena y canela',
    nota: 'Jugos $65.',
    items: [
      { n: 'Fresón', p: 75, d: 'Fresa, azúcar, canela y avena.' },
      { n: 'Chocobanana', p: 75, d: 'Plátano, cacao, azúcar, canela y avena.' },
      { n: 'Frutos Rojos', p: 75, d: 'Frutos rojos, azúcar, canela y avena.' },
      { n: 'Popeye', p: 75, d: 'Espinacas, azúcar, canela y avena.' },
      { n: 'Mangazo', p: 75, d: 'Mango, azúcar, canela y avena.' },
      { n: 'Hay Papaya de Celaya', p: 75, d: 'Papaya, azúcar, canela y avena.' },
    ],
  },
  {
    id: 'picoteo',
    t: 'El picoteo',
    s: 'Fresco, con limón y sal',
    items: [
      { n: 'Jícamas', p: 45, d: 'Jícama fresca, rodajita de limón y sal.' },
      { n: 'Pepinos', p: 45, d: 'Pepino fresco, rodajita de limón y sal.' },
      { n: 'Apio y Zanahoria', p: 45, d: 'Bastones con rodajita de limón y sal.' },
    ],
  },
  {
    id: 'bionicos',
    t: 'Bionicos y frutas',
    s: 'Escamochas',
    items: [
      { n: 'Biónico Baguetton', p: 80, d: 'Frutas varias con cremita dulce y granola.' },
      { n: 'Coctel de Frutas', p: 70, d: 'Frutas varias con miel y granola.' },
      { n: 'Escamochas', p: 80, d: 'Frutas varias batidas con yogur y cereales.' },
    ],
  },
];

const GALERIA = [
  { src: '/img/real/gal-1.jpg', t: 'Mexicana', d: 'Lechuga, jitomate, aguacate, elote, queso panela y tortillitas horneadas con chile guajillo.' },
  { src: '/img/real/gal-2.jpg', t: 'Remolacha Deli', d: 'Betabel fileteado, vinagreta de hierbas, pistaches y requesón.' },
  { src: '/img/real/gal-3.jpg', t: 'Ensalada de pollo', d: 'Pollo a la plancha, lechuga, brócoli, zanahoria, pepino y germen de alfalfa.' },
  { src: '/img/real/gal-4.jpg', t: 'Rojo Pasión', d: 'Cuernito calientito con compota casera de frutos rojos y queso doble crema.' },
  { src: '/img/real/gal-5.jpg', t: 'Dulce de la casa', d: 'Panqué de mantequilla y panquesito de queso, del tamaño justo para el café.' },
  { src: '/img/real/gal-6.jpg', t: 'El pan de la casa', d: 'Baguette de corteza dorada y miga suave: la base de todos los baguettones.' },
  { src: '/img/real/gal-8.jpg', t: 'Escamocha', d: 'Fruta batida con yogur y cereales, servida bien fría.' },
];

function Compartir() {
  const [copiado, setCopiado] = useState(false);
  const url = 'https://elbaguettonexpress.com.mx/';
  /* el mensaje deja de anunciar la apertura en cuanto pasa la fecha */
  const porAbrir = Math.ceil((APERTURA - new Date()) / 86400000) > 0;
  const texto = porAbrir
    ? 'El Baguetton Express abre el 6 de noviembre en Valle Dorado, Mezcales. Sándwiches en baguette, ensaladas, café y aderezos caseros.'
    : 'El Baguetton Express, en Valle Dorado, Mezcales. Sándwiches en baguette, ensaladas, café y aderezos caseros.';
  const porWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${texto} ${url}`)}`;
  const porFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const campo = document.createElement('textarea');
      campo.value = url;
      document.body.appendChild(campo);
      campo.select();
      document.execCommand('copy');
      campo.remove();
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  };

  const nativo = async () => {
    try {
      await navigator.share({ title: 'El Baguetton Express', text: texto, url });
    } catch {
      /* el usuario cerró la hoja de compartir */
    }
  };

  const hayNativo = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="compartir" data-reveal>
      <span className="compartir-lbl">Compártela</span>
      <div className="compartir-btns">
        <a href={porWhatsApp} target="_blank" rel="noreferrer" aria-label="Compartir por WhatsApp" title="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.4-.2-2.9.8.8-2.8-.2-.4A8 8 0 0 1 12 4zm-3 4.2c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2s.7 2.2 1 2.5c.3.4 1.6 2.4 3.9 3.3 1.9.8 2.3.6 2.7.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4z"/>
          </svg>
        </a>
        <a href={porFacebook} target="_blank" rel="noreferrer" aria-label="Compartir por Facebook" title="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.3c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v2.9h2.5V21h3z"/>
          </svg>
        </a>
        <a href={`mailto:?subject=${encodeURIComponent('El Baguetton Express')}&body=${encodeURIComponent(`${texto}\n\n${url}`)}`} aria-label="Compartir por correo" title="Correo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth="1.7" d="M3.5 6.5h17v11h-17z"/>
            <path fill="none" stroke="currentColor" strokeWidth="1.7" d="M3.5 7l8.5 6 8.5-6"/>
          </svg>
        </a>
        <button type="button" onClick={copiar} aria-label="Copiar enlace" title="Copiar enlace" className={copiado ? 'copiado' : ''}>
          {copiado ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M4.5 12.5l5 5 10-11"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="1.7" d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.5 6.3"/>
              <path fill="none" stroke="currentColor" strokeWidth="1.7" d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.3-1.3"/>
            </svg>
          )}
        </button>
        {hayNativo && (
          <button type="button" onClick={nativo} aria-label="Más opciones para compartir" title="Compartir">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="1.7" d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5M5 13v6.5h14V13"/>
            </svg>
          </button>
        )}
      </div>
      <span className={`compartir-aviso${copiado ? ' visible' : ''}`}>Enlace copiado</span>
    </div>
  );
}

function Galeria({ fotos }) {
  const track = useRef(null);
  const n = fotos.length;
  const COPIAS = 3;                     /* tres juegos: el de en medio es el visible */
  const [abierta, setAbierta] = useState(null);
  const [indice, setIndice] = useState(0);
  const [pausa, setPausa] = useState(false);

  const paso = () => {
    const t = track.current;
    if (!t) return 336;
    const s = t.querySelector('.slide');
    return s ? s.getBoundingClientRect().width + 16 : 336;
  };
  const anchoJuego = () => n * paso();

  /* deja el carrusel en el juego de en medio, sin animación */
  const centrar = () => {
    const t = track.current;
    if (!t) return;
    t.scrollLeft = anchoJuego();
    setIndice(0);
  };

  const mover = (dir) => {
    const t = track.current;
    if (!t) return;
    t.scrollBy({ left: dir * paso(), behavior: 'smooth' });
  };

  const irA = (i) => {
    const t = track.current;
    if (!t) return;
    const p = paso(), juego = anchoJuego();
    /* salta al clon más cercano para no recorrer todo el carrusel */
    const base = i * p + Math.round((t.scrollLeft - i * p) / juego) * juego;
    t.scrollTo({ left: base, behavior: 'smooth' });
  };

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let reposo;
    const medir = () => {
      const p = paso(), juego = anchoJuego();
      setIndice(((Math.round(t.scrollLeft / p) % n) + n) % n);
      /* al pasar de un extremo al otro, salta un juego completo: el salto es invisible */
      clearTimeout(reposo);
      reposo = setTimeout(() => {
        if (t.scrollLeft < juego * 0.5) t.scrollLeft += juego;
        else if (t.scrollLeft > juego * 1.5) t.scrollLeft -= juego;
      }, 160);
    };
    const arranque = requestAnimationFrame(() => {
      centrar();
      medir();
    });
    t.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', () => { centrar(); });
    return () => {
      cancelAnimationFrame(arranque);
      clearTimeout(reposo);
      t.removeEventListener('scroll', medir);
    };
  }, []);

  /* avance automático continuo */
  useEffect(() => {
    if (pausa || abierta !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      const t = track.current;
      if (!t) return;
      t.scrollBy({ left: paso(), behavior: 'smooth' });
    }, 3200);
    return () => clearInterval(id);
  }, [pausa, abierta]);

  useEffect(() => {
    if (abierta === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [abierta]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setAbierta(null);
      if (abierta === null) return;
      if (e.key === 'ArrowRight') setAbierta((i) => (i + 1) % n);
      if (e.key === 'ArrowLeft') setAbierta((i) => (i - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierta, n]);

  return (
    <div
      className="carrusel"
      data-reveal
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onTouchStart={() => setPausa(true)}
    >
      <div className="carrusel-track" ref={track}>
        {Array.from({ length: COPIAS }).flatMap((_, copia) =>
          fotos.map((f, i) => (
            <figure
              className="slide"
              key={`${copia}-${f.src}`}
              onClick={() => setAbierta(i)}
              aria-hidden={copia === 1 ? undefined : 'true'}
            >
              <img src={f.src} alt={f.t} loading="lazy" />
              <figcaption className="slide-info">
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </figcaption>
            </figure>
          ))
        )}
      </div>

      <button type="button" className="flecha izq" onClick={() => mover(-1)} aria-label="Anterior">
        ‹
      </button>
      <button type="button" className="flecha der" onClick={() => mover(1)} aria-label="Siguiente">
        ›
      </button>

      <div className="carrusel-pie">
        <div className="puntos">
          {fotos.map((f, i) => (
            <button
              type="button"
              key={f.src}
              className={`punto${i === indice ? ' activo' : ''}`}
              onClick={() => irA(i)}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
        <span className="carrusel-cuenta">{indice + 1} / {n}</span>
      </div>

      {abierta !== null &&
        createPortal(
          <div className="lightbox" onClick={() => setAbierta(null)}>
            <div className="lb-caja" onClick={(e) => e.stopPropagation()}>
              <img src={fotos[abierta].src} alt={fotos[abierta].t} />
              <div className="lb-info">
                <div className="lb-txt">
                  <h3>{fotos[abierta].t}</h3>
                  <p>{fotos[abierta].d}</p>
                </div>
                <span className="lb-cuenta">{abierta + 1} / {fotos.length}</span>
              </div>
            </div>
            <button
              type="button"
              className="cerrar"
              aria-label="Cerrar"
              onClick={(e) => { e.stopPropagation(); setAbierta(null); }}
            >
              ×
            </button>
            <button
              type="button"
              className="lb-flecha izq"
              onClick={(e) => { e.stopPropagation(); setAbierta((i) => (i - 1 + fotos.length) % fotos.length); }}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="lb-flecha der"
              onClick={(e) => { e.stopPropagation(); setAbierta((i) => (i + 1) % fotos.length); }}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

export default function App() {
  const videoRef = useRef(null);
  const [videoOk, setVideoOk] = useState(false);
  const [bgSrc] = useState(() =>
    window.matchMedia('(max-width: 900px)').matches ? `/bg-mobile.mp4${AV}` : `/bg.mp4${AV}`
  );
  const [esMovil] = useState(() => window.matchMedia('(max-width: 900px)').matches);
  const [pegado, setPegado] = useState(false);
  const [dias, setDias] = useState(() => Math.ceil((APERTURA - new Date()) / 86400000));
  const [estado, setEstado] = useState('cerrado');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  /* seguimiento: vista de la ficha y clasificación de clics (WhatsApp / ubicación) */
  useEffect(() => {
    avisarVista();
    return escucharClics();
  }, []);

  useEffect(() => {
    if (!menuAbierto) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuAbierto(false); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuAbierto]);

  /* en móvil el video se pide después del primer pintado, para que el texto salga antes */
  useEffect(() => {
    if (!esMovil) return;
    const arrancar = () => {
      const v = videoRef.current;
      if (!v) return;
      v.preload = 'auto';
      v.load();
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    if (document.readyState === 'complete') {
      const t = setTimeout(arrancar, 350);
      return () => clearTimeout(t);
    }
    window.addEventListener('load', arrancar, { once: true });
    return () => window.removeEventListener('load', arrancar);
  }, [esMovil]);

  useEffect(() => {
    const ahora = new Date();
    const falta = Math.ceil((APERTURA - ahora) / 86400000);
    setDias(falta);
    if (falta > 0) { setEstado('pronto'); return; }
    const dia = ahora.getDay();               /* 0 domingo */
    const h = ahora.getHours() + ahora.getMinutes() / 60;
    setEstado(dia === 0 || h < 8 || h >= 20 ? 'cerrado' : 'abierto');
  }, []);

  useEffect(() => {
    const onScroll = () => setPegado(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    /* anclas con scroll suave */
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#top') { e.preventDefault(); lenis.scrollTo(0, { duration: 1.2 }); return; }
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      /* deja aire bajo la barra fija: sin esto el título de la sección queda tapado */
      const nav = document.querySelector('.nav');
      const aire = (nav ? nav.getBoundingClientRect().height : 0) + 24;
      lenis.scrollTo(el, { offset: -aire, duration: 1.2 });
    };
    document.addEventListener('click', onAnchor);

    const ctx = gsap.context(() => {
      const v = videoRef.current;

      /* reveals */
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    });

    const onReady = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onReady);

    return () => {
      document.removeEventListener('click', onAnchor);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  /* fondo del hero: scrub del video o parallax de la imagen, según haya video */
  useEffect(() => {
    const v = videoRef.current;
    const esEscritorio = window.matchMedia('(min-width: 901px)').matches;
    const ctx = gsap.context(() => {
      if (videoOk && v && esEscritorio) {
        ScrollTrigger.create({
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (!v.duration || !isFinite(v.duration)) return;
            const t = Math.min(v.duration - 0.05, self.progress * v.duration);
            if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
          },
        });

        /* el texto se aparta al final para lucir el sándwich armado */
        gsap.to('.hero-inner', {
          opacity: 0,
          y: -24,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: '72% top', end: 'bottom top', scrub: true },
        });
      } else if (!videoOk) {
        const poster = document.querySelector('.bg-layer .poster');
        if (poster) {
          gsap.to(poster, {
            y: -70,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          });
        }
      }
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [videoOk]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const esMovil = window.matchMedia('(max-width: 900px)').matches;
    if (esMovil) {
      v.loop = true;
      v.muted = true;
      v.playbackRate = 0.5;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <div className="bg-layer" aria-hidden="true">
        <video
          ref={videoRef}
          src={bgSrc}
          poster={`/img/hero.jpg${AV}`}
          muted
          playsInline
          preload={esMovil ? 'none' : 'auto'}
          onLoadedMetadata={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
          style={{ display: videoOk ? 'block' : 'none' }}
        />
        {!videoOk && <img className="poster" src={`/img/hero.jpg${AV}`} alt="" />}
        <div className="bg-scrim" />
      </div>

      {dias > 0 && (
        <div className="cuenta">
          <p>
            <b>{dias === 1 ? 'Falta 1 día' : `Faltan ${dias} días`}</b>
            <span> · Abrimos el viernes 6 de noviembre</span>
          </p>
          <a href="#menu">Ver el menú</a>
        </div>
      )}

      <header className={`nav${pegado ? ' pegado' : ''}${dias > 0 ? ' con-cuenta' : ''}`}>
        <div className="nav-inner">
          <a className="nav-logo" href="#top" aria-label="El Baguetton Express">
            <img src={`/img/logo-white.png${AV}`} alt="El Baguetton Express" />
          </a>

          <nav className="nav-links" aria-label="Secciones">
            <a href="#que-servimos">Lo que servimos</a>
            <a href="#menu">Menú</a>
            <a href="#aderezos">Los aderezos</a>
            <a href="#galeria">Galería</a>
            <a href="#donde">Dónde y cuándo</a>
          </nav>

          <div className="nav-acciones">
            <div className="nav-redes">
              <a href={FB} target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1C16.5 3.1 15.5 3 14.4 3c-2.3 0-3.9 1.4-3.9 4.1v2.5H7.7v3.2h2.8V21h3z"/></svg>
              </a>
              <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" fill="none" stroke="currentColor" strokeWidth="1.9"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.9"/><circle cx="17.1" cy="6.9" r="1.15" fill="currentColor"/></svg>
              </a>
              <a href={YT} target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.6c-.2-1-1-1.8-2-2C17.8 5.2 12 5.2 12 5.2s-5.8 0-7.6.4c-1 .2-1.8 1-2 2C2 9.4 2 12 2 12s0 2.6.4 4.4c.2 1 1 1.8 2 2 1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4c1-.2 1.8-1 2-2 .4-1.8.4-4.4.4-4.4s0-2.6-.4-4.4zM10.2 15.3V8.7l5.6 3.3-5.6 3.3z"/></svg>
              </a>
            </div>

            <a className="cta-mini" href={WA} target="_blank" rel="noreferrer">
              WhatsApp
            </a>

            <button
              type="button"
              className="burger"
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              onClick={() => setMenuAbierto((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {menuAbierto && (
        <div className="menu-movil" role="dialog" aria-label="Menú">
          <button
            type="button"
            className="menu-cerrar"
            onClick={cerrarMenu}
            aria-label="Cerrar menú"
          >
            <span /><span />
          </button>
          <nav>
            <a href="#que-servimos" onClick={cerrarMenu}>Lo que servimos</a>
            <a href="#menu" onClick={cerrarMenu}>Menú</a>
            <a href="#aderezos" onClick={cerrarMenu}>Los aderezos</a>
            <a href="#como-pedir" onClick={cerrarMenu}>Cómo pedir</a>
            <a href="#galeria" onClick={cerrarMenu}>Galería</a>
            <a href="#preguntas" onClick={cerrarMenu}>Preguntas</a>
            <a href="#donde" onClick={cerrarMenu}>Dónde y cuándo</a>
          </nav>
          <div className="menu-redes">
            <a href={FB} target="_blank" rel="noreferrer" onClick={cerrarMenu}>Facebook</a>
            <a href={IG} target="_blank" rel="noreferrer" onClick={cerrarMenu}>Instagram</a>
            <a href={YT} target="_blank" rel="noreferrer" onClick={cerrarMenu}>YouTube</a>
          </div>
          <a className="btn btn-primario" href={WA} target="_blank" rel="noreferrer" onClick={cerrarMenu}>
            Pedir por WhatsApp
          </a>
        </div>
      )}

      <a
        className="wa-flotante"
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.4-.2-2.9.8.8-2.8-.2-.4A8 8 0 0 1 12 4zm-3 4.2c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2s.7 2.2 1 2.5c.3.4 1.6 2.4 3.9 3.3 1.9.8 2.3.6 2.7.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4z"/>
        </svg>
        <span>WhatsApp</span>
      </a>

      <main>
        <section className="hero">
          <div className="hero-sticky">
            <div className="hero-inner">
            <p className="kicker">Valle Dorado · Mezcales, Nayarit</p>
            <h1>Rápido, ligero y delicioso</h1>
            <p className="sub">
              Sándwiches, ensaladas y café, con los aderezos hechos en casa.
              Abrimos el 6 de noviembre, de lunes a sábado.
            </p>
            <div className="acciones">
              <a className="btn btn-primario" href={WA} target="_blank" rel="noreferrer">
                Pedir por WhatsApp
              </a>
              <a className="btn btn-ghost" href="#donde">
                Cómo llegar
              </a>
            </div>
            </div>
          </div>
        </section>

        <section className="bloque servimos" id="que-servimos">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Qué servimos</p>
            <h2 data-reveal>Lo que se antoje</h2>
            <div className="grid">
              {SERVICIOS.map((s) => (
                <a className="card" key={s.t} href={s.ir} data-reveal aria-label={`Ver ${s.t} en el menú`}>
                  <figure>
                    <img src={s.img} alt={s.t} loading="lazy" />
                  </figure>
                  <div className="txt">
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                    <span className="card-ver">Ver en el menú <i aria-hidden="true">→</i></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="marquesina" aria-hidden="true">
          <div className="marquesina-track">
            {[...MARQUESINA, ...MARQUESINA].map((f, i) => (
              <figure key={`${f.src}-${i}`} title={f.t}>
                <img src={f.src} alt={f.t} loading="lazy" />
                <figcaption>{f.t}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bloque aderezos" id="aderezos">
          <div className="wrap">
            <div className="aderezos-grid">
              <figure className="aderezos-foto" data-reveal>
                <img src="/img/real/ensalada.jpg" alt="Ensalada servida en bowl" loading="lazy" />
              </figure>
              <div className="aderezos-txt">
                <p className="eyebrow" data-reveal>La diferencia</p>
                <h2 data-reveal>Los aderezos se hacen aquí</h2>
                <p className="cuerpo" data-reveal>
                  Todos. Se preparan en nuestra cocina, no llegan listos de ningún lado.
                  Por eso una ensalada aquí no sabe como las demás.
                </p>
                <p className="cuerpo" data-reveal>
                  Es lo que le cambia el sabor a todo: a la ensalada, al sándwich,
                  a lo que te lleves para la casa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bloque menu-bloque" id="menu">
          <div className="wrap">
            <p className="eyebrow" data-reveal>El menú</p>
            <h2 data-reveal>Todo lo que hay</h2>
            <p className="menu-intro" data-reveal>
              Sándwiches en baguette, ensaladas, dulce, café y batidos.
              Todos los aderezos se hacen aquí.
            </p>

            <div className="menu-grid">
              {MENU.map((g) => (
                <div className="m-grupo" id={`menu-${g.id}`} key={g.t}>
                  <h3>{g.t}<span>{g.s}</span></h3>
                  {g.items.map((it) => (
                    <div className="m-it" key={it.n}>
                      <div className="m-cab">
                        <span className="m-nom">{it.n}</span>
                        <span className="m-pun" aria-hidden="true" />
                        <span className="m-pre">${it.p}</span>
                      </div>
                      {it.d && <p className="m-desc">{it.d}</p>}
                    </div>
                  ))}
                  {g.nota && <p className="m-nota">{g.nota}</p>}
                </div>
              ))}
            </div>

            <div className="m-aderezos">
              <span className="m-aderezos-k">Los aderezos, hechos aquí</span>
              <div className="m-chips">
                {ADEREZOS.map((a) => (
                  <span className="m-chip" key={a}>{a}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bloque pedir" id="como-pedir">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Cómo pedir</p>
            <h2 data-reveal>Así de fácil</h2>
            <div className="pasos">
              {PASOS.map((p) => (
                <div className="paso" key={p.n} data-reveal>
                  <span className="paso-n">{p.n}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
            <a className="btn btn-primario pedir-cta" href={WA} target="_blank" rel="noreferrer" data-reveal>
              Pedir por WhatsApp
            </a>
          </div>
        </section>

        <section className="bloque galeria-bloque" id="galeria">
          <div className="wrap">
            <p className="eyebrow" data-reveal>De la cocina</p>
            <h2 data-reveal>Así se ve lo que hacemos</h2>
            <Galeria fotos={GALERIA} />
          </div>
        </section>

        <section className="bloque donde" id="donde">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Dónde y cuándo</p>
            <h2 data-reveal>Valle Dorado</h2>
            <div className="dos">
              <div data-reveal>
                <div className="dato">
                  <div className="k">Dirección</div>
                  <div className="v">
                    Valle Nacional 106
                    <small>Fracc. Valle Dorado, Mezcales, Nayarit · C.P. 63735</small>
                  </div>
                </div>
                <div className="dato">
                  <div className="k">Horario</div>
                  <div className="v">
                    Lunes a sábado · 8:00 am a 8:00 pm
                    <small>Domingo cerrado</small>
                    <span className={`estado ${estado}`}>
                      {estado === 'abierto' && 'Abierto ahora'}
                      {estado === 'cerrado' && 'Cerrado ahora'}
                      {estado === 'pronto' && 'Aún no abrimos'}
                    </span>
                  </div>
                </div>
                <div className="dato">
                  <div className="k">WhatsApp</div>
                  <div className="v">
                    <a href={WA} target="_blank" rel="noreferrer">{WA_VISIBLE}</a>
                    <small>
                      Pedidos y dudas · <a href="tel:+523****6472">Llamar</a>
                    </small>
                  </div>
                </div>
                <div className="dato">
                  <div className="k">Apertura</div>
                  <div className="v">6 de noviembre</div>
                </div>
              </div>
              <div data-reveal>
                <div className="mapa">
                  <iframe
                    title="Ubicación de El Baguetton Express en Valle Dorado"
                    src="https://www.google.com/maps?q=Valle+Nacional+106,+Valle+Dorado,+Mezcales,+Nayarit&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div> 
              </div>
            </div>
          </div>
        </section>

        <section className="bloque faq" id="preguntas">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Antes de venir</p>
            <h2 data-reveal>Preguntas frecuentes</h2>
            <div className="faq-lista" data-reveal>
              {FAQ.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cierre">
          <div className="wrap">
            <h2 data-reveal>Nos vemos el 6 de noviembre</h2>
            <p data-reveal>Valle Nacional 106, Valle Dorado. De lunes a sábado.</p>
            <div className="acciones" data-reveal>
              <a className="btn btn-primario" href={WA} target="_blank" rel="noreferrer">
                Pedir por WhatsApp
              </a>
              <a className="btn btn-ghost" href="#donde">
                Cómo llegar
              </a>
            </div>
            <Compartir />
          </div>
        </section>

        <footer>
          <div className="wrap">
            <img src={`/img/logo-white.png${AV}`} alt="El Baguetton Express" />
            <p>Valle Nacional 106 · Valle Dorado, Mezcales, Nayarit</p>
            <p className="wa-footer">
              WhatsApp <a href={WA} target="_blank" rel="noreferrer">{WA_VISIBLE}</a>
              {' · '}
              <a href={`mailto:${CORREO}`}>{CORREO}</a>
            </p>
            <p className="pie-legal">
              <a href="/privacidad.html">Aviso de privacidad</a>
            </p>
            <div className="social">
              <a href={FB} target="_blank" rel="noreferrer" onClick={cerrarMenu}>Facebook</a>
              <a href={IG} target="_blank" rel="noreferrer" onClick={cerrarMenu}>Instagram</a>
              <a href={YT} target="_blank" rel="noreferrer" onClick={cerrarMenu}>YouTube</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}