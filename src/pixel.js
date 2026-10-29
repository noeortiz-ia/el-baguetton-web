/* Seguimiento de conversiones: eventos estándar sobre la base ya instalada en el <head>. */

const disponible = () => typeof window !== "undefined" && typeof window.fbq === "function";

/** Vista de la ficha del negocio. */
export function avisarVista() {
  if (!disponible()) return;
  window.fbq("track", "ViewContent", {
    content_name: "El Baguetton Express",
    content_category: "Restaurante",
    content_type: "product",
  });
}

/** Clic a WhatsApp: es la conversión principal del sitio. */
export function avisarContacto(origen) {
  if (!disponible()) return;
  window.fbq("track", "Contact", {
    content_name: "WhatsApp",
    content_category: origen || "sitio",
  });
  // mismo clic, marcado como prospecto caliente para optimizar campañas
  window.fbq("track", "Lead", {
    content_name: "WhatsApp",
    content_category: origen || "sitio",
  });
}

/** Interés en la ubicación: mapa, ancla de "dónde y cuándo". */
export function avisarUbicacion(origen) {
  if (!disponible()) return;
  window.fbq("track", "FindLocation", {
    content_name: "Valle Nacional 106, Valle Dorado, Mezcales",
    content_category: origen || "sitio",
  });
}

/** Escucha global: clasifica los clics sin tocar cada botón. */
export function escucharClics() {
  if (typeof document === "undefined") return () => {};

  const alClic = (e) => {
    const enlace = e.target?.closest?.("a");
    if (!enlace) return;
    const href = enlace.getAttribute("href") || "";

    if (href.includes("wa.me")) {
      const origen =
        enlace.closest("footer") ? "pie"
        : enlace.closest(".menu-movil") ? "menu_movil"
        : enlace.closest(".nav") ? "barra_superior"
        : enlace.closest(".hero") ? "portada"
        : "seccion";
      avisarContacto(origen);
      return;
    }

    if (href.startsWith("#donde") || href.includes("google.com/maps")) {
      avisarUbicacion(enlace.closest("footer") ? "pie" : "seccion");
    }
  };

  document.addEventListener("click", alClic, { passive: true });
  return () => document.removeEventListener("click", alClic);
}
