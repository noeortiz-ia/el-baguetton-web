import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const MAPA = '#donde';
const WA_TXT = 'Hola, quiero información de El Baguetton Express.';
const WA = `https://wa.me/523223706472?text=${encodeURIComponent(WA_TXT)}`;
const WA_VISIBLE = '322 370 6472';

const SERVICIOS = [
  {
    img: '/img/real/sandwich.jpg',
    t: 'Sándwiches',
    d: 'En baguette, armados al momento.',
  },
  {
    img: '/img/real/ensalada.jpg',
    t: 'Ensaladas',
    d: 'Frescas, con aderezo aparte.',
  },
  {
    img: '/img/real/cafe.jpg',
    t: 'Café',
    d: 'Para acompañar o para llevar.',
  },
  {
    img: '/img/real/gal-4.jpg',
    t: 'Dulce',
    d: 'Croissants, panqué y postres.',
  },
];

const GALERIA = [
  '/img/real/gal-1.jpg',
  '/img/real/gal-2.jpg',
  '/img/real/gal-3.jpg',
  '/img/real/gal-4.jpg',
  '/img/real/gal-5.jpg',
  '/img/real/gal-6.jpg',
  '/img/real/gal-8.jpg',
];

function Galeria({ fotos }) {
  const track = useRef(null);
  const [abierta, setAbierta] = useState(null);
  const [pos, setPos] = useState({ inicio: true, fin: false });
  const [indice, setIndice] = useState(0);
  const [pausa, setPausa] = useState(false);

  const medir = () => {
    const t = track.current;
    if (!t) return;
    const s = t.querySelector('.slide');
    const paso = (s ? s.getBoundingClientRect().width : 320) + 16;
    setIndice(Math.round(t.scrollLeft / paso));
    setPos({
      inicio: t.scrollLeft <= 8,
      fin: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8,
    });
  };

  const mover = (dir) => {
    const t = track.current;
    if (!t) return;
    const s = t.querySelector('.slide');
    const paso = (s ? s.getBoundingClientRect().width : 320) + 16;
    t.scrollBy({ left: dir * paso, behavior: 'smooth' });
  };

  const irA = (i) => {
    const t = track.current;
    if (!t) return;
    const s = t.querySelector('.slide');
    const paso = (s ? s.getBoundingClientRect().width : 320) + 16;
    t.scrollTo({ left: i * paso, behavior: 'smooth' });
  };

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    medir();
    t.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    return () => {
      t.removeEventListener('scroll', medir);
      window.removeEventListener('resize', medir);
    };
  }, []);

  /* avance automático: deja claro que hay más fotos */
  useEffect(() => {
    if (pausa || abierta !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      const t = track.current;
      if (!t) return;
      const s = t.querySelector('.slide');
      const paso = (s ? s.getBoundingClientRect().width : 320) + 16;
      const alFinal = t.scrollLeft + t.clientWidth >= t.scrollWidth - 8;
      if (alFinal) t.scrollTo({ left: 0, behavior: 'smooth' });
      else t.scrollBy({ left: paso, behavior: 'smooth' });
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
      if (e.key === 'ArrowRight') setAbierta((i) => (i + 1) % fotos.length);
      if (e.key === 'ArrowLeft') setAbierta((i) => (i - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierta, fotos.length]);

  return (
    <div
      className="carrusel"
      data-reveal
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onTouchStart={() => setPausa(true)}
    >
      <div className="carrusel-track" ref={track}>
        {fotos.map((src, i) => (
          <figure className="slide" key={src} onClick={() => setAbierta(i)}>
            <img src={src} alt="" loading="lazy" />
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="flecha izq"
        onClick={() => mover(-1)}
        disabled={pos.inicio}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="flecha der"
        onClick={() => mover(1)}
        disabled={pos.fin}
        aria-label="Siguiente"
      >
        ›
      </button>

      <div className="carrusel-pie">
        <div className="puntos">
          {fotos.map((f, i) => (
            <button
              type="button"
              key={f}
              className={`punto${i === indice ? ' activo' : ''}`}
              onClick={() => irA(i)}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
        <span className="cuenta">
          {Math.min(indice + 1, fotos.length)} / {fotos.length}
        </span>
      </div>

      {abierta !== null &&
        createPortal(
          <div className="lightbox" onClick={() => setAbierta(null)}>
            <img
              src={fotos[abierta]}
              alt=""
              onClick={(e) => e.stopPropagation()}
            />
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
    window.matchMedia('(max-width: 900px)').matches ? '/bg-mobile.mp4' : '/bg.mp4'
  );
  const [pegado, setPegado] = useState(false);

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
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
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
          poster="/img/hero.jpg"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
          style={{ display: videoOk ? 'block' : 'none' }}
        />
        {!videoOk && <img className="poster" src="/img/hero.jpg" alt="" />}
        <div className="bg-scrim" />
      </div>

      <header className={`nav${pegado ? ' pegado' : ''}`}>
        <div className="nav-inner">
          <img src="/img/logo-white.png" alt="El Baguetton Express" />
          <a className="cta-mini" href={WA} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

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
                <article className="card" key={s.t} data-reveal>
                  <figure>
                    <img src={s.img} alt={s.t} loading="lazy" />
                  </figure>
                  <div className="txt">
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="banda" aria-hidden="true">
          <img src="/img/real/gal-7.jpg" alt="" loading="lazy" />
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
                  </div>
                </div>
                <div className="dato">
                  <div className="k">WhatsApp</div>
                  <div className="v">
                    <a href={WA} target="_blank" rel="noreferrer">{WA_VISIBLE}</a>
                    <small>Pedidos y dudas</small>
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
          </div>
        </section>

        <footer>
          <div className="wrap">
            <img src="/img/logo-white.png" alt="El Baguetton Express" />
            <p>Valle Nacional 106 · Valle Dorado, Mezcales, Nayarit</p>
            <p className="wa-footer">
              WhatsApp <a href={WA} target="_blank" rel="noreferrer">{WA_VISIBLE}</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
