/* Traducción del sitio al inglés.
   El español es el texto fuente que ya vive en el marcado; aquí solo se
   guarda su equivalente. Al cambiar de idioma se recorre el DOM y se
   sustituyen los nodos de texto y los atributos visibles, guardando el
   original para poder volver sin recargar. */

const EN = {
  "Menú": "Menu",
  "Promociones": "Specials",
  "Aderezos": "Dressings",
  "Galería": "Gallery",
  "Ubicación": "Find us",
  "Compartir": "Share",
  "Secciones": "Sections",
  "Abrir menú": "Open menu",
  "Cerrar menú": "Close menu",
  "Escribir por WhatsApp": "Message us on WhatsApp",
  "Compartir el sitio": "Share this page",
  "Compartir por WhatsApp": "Share on WhatsApp",
  "Compartir por Facebook": "Share on Facebook",
  "Compartir por correo": "Share by email",
  "Correo": "Email",
  "Copiar enlace": "Copy link",
  "Más opciones para compartir": "More share options",
  "Enlace copiado": "Link copied",
  "Secciones del sitio": "Site sections",
  "Valle Dorado · Mezcales, Nayarit": "Valle Dorado · Mezcales, Nayarit",
  "Sándwiches en baguette, ensaladas y café": "Baguette sandwiches, salads and coffee",
  "En Valle Dorado, Mezcales. Aderezos hechos en casa. Lun a vie de 8 am a 8 pm · sábado de 8 am a 2 pm.": "In Valle Dorado, Mezcales. Dressings made in-house. Mon–Fri 8 am–8 pm · Sat 8 am–2 pm.",
  "Pedir por WhatsApp": "Order on WhatsApp",
  "Pide por WhatsApp": "Order on WhatsApp",
  "Cómo llegar": "Get directions",
  "Qué hay en el menú": "What's on the menu",
  "Sándwiches": "Sandwiches",
  "En baguette, armados al momento.": "On baguette, made to order.",
  "Ensaladas": "Salads",
  "Frescas, con aderezo aparte.": "Fresh, with dressing on the side.",
  "Café": "Coffee",
  "Para acompañar o para llevar.": "Have it here or take it to go.",
  "Dulce": "Sweets",
  "Croissants, panqué y postres.": "Croissants, panqué and desserts.",
  "Ver en el menú": "View on the menu",
  "Ver Sándwiches en el menú": "See sandwiches on the menu",
  "Ver Ensaladas en el menú": "See salads on the menu",
  "Ver Café en el menú": "See coffee on the menu",
  "Ver Dulce en el menú": "See sweets on the menu",
  "Lunes 3x2 en ensaladas": "Mondays: 3 for 2 on salads",
  "Los aderezos se hacen aquí": "The dressings are made right here",
  "Todos. Se preparan en nuestra cocina, no llegan listos de ningún lado. Por eso una ensalada aquí no sabe como las demás. Y cualquiera de los": "All of them. We make them in our own kitchen — none of them come out of a jar. That's why a salad here doesn't taste like everyone else's. And any of the",
  "baguettones de la carta": "baguettes on the menu",
  "lleva el aderezo que tú elijas.": "can be made with the dressing you like.",
  "Es lo que le cambia el sabor a todo: a la ensalada, al sándwich, a lo que te lleves para la casa.": "It's what makes the difference — in the salad, in the sandwich, in whatever you take home.",
  "Cinco, y tienes que escoger con cuál:": "Five of them, and you have to pick one:",
  "Ranch eneldo": "Dill ranch",
  "Cremoso y con el eneldo bien marcado, de esos que se quedan en la hoja. El que va con casi todo.": "Creamy, with plenty of dill. The one that goes with just about everything.",
  "Con el Clásico, el Pollero y cualquier ensalada.": "Perfect with the Clásico, the Pollero or any salad.",
  "Miel mostaza": "Honey mustard",
  "Dulce de miel con el filo de la mostaza al final. No empalaga.": "Honey-sweet up front, with a mustard kick on the finish. Never cloying.",
  "Con lo que lleva pollo o queso.": "Goes with anything that has chicken or cheese.",
  "Vinagreta italiana": "Italian vinaigrette",
  "Ligera, ácida y con hierbas secas. La que no se siente pesada.": "Light and tangy, with dried herbs. The one that never weighs you down.",
  "Para ensaladas y para quien no quiere crema.": "For salads, and for anyone who'd rather skip the creamy stuff.",
  "Tamarindo": "Tamarind",
  "Agridulce y tropical, con más acidez que dulzor.": "Sweet, sour and tropical — more tart than sweet.",
  "Para el que quiere probar algo distinto.": "For when you want something different.",
  "Vinagreta de hierbas": "Herb vinaigrette",
  "Verde y fresca, con el amargor justo de la hierba.": "Green and fresh, with a pleasant herbal edge.",
  "Con hojas verdes y betabel.": "Made for greens and beets.",
  "Los aderezos, hechos aquí": "The dressings, made right here",
  "Lunes y viernes": "Mondays and Fridays",
  "Lunes 3x2 en ensaladas y viernes café americano de regalo. En el local o por WhatsApp.": "Mondays: three salads for the price of two. Fridays: free American coffee with your baguette. Eat in or order on WhatsApp.",
  "Lunes": "Monday",
  "3 x 2": "3 for 2",
  "Pides tres, pagas dos. Todo el día.": "Order three, pay for two. All day long.",
  "Hasta agotar existencias.": "While they last.",
  "Viernes": "Friday",
  "De regalo": "On us",
  "En la compra de tu baguette.": "With any baguette.",
  "No aplica en Baguette Clásico.": "Not valid with the Classic.",
  "Pregunta por WhatsApp qué promoción hay hoy.": "Ask us on WhatsApp what's on today.",
  "Tres ensaladas de El Baguetton Express": "Three salads from El Baguetton Express",
  "Baguette y café americano de El Baguetton Express": "Baguette and American coffee from El Baguetton Express",
  "Carta y precios": "Menu and prices",
  "Menú y precios": "Menu and prices",
  "Sándwiches en baguette, ensaladas, dulce, café, batidos y jugos. Todos los aderezos se hacen aquí.": "Baguette sandwiches, salads, sweets, coffee, shakes and juices. Every dressing is made right here.",
  "Nuestros sándwiches en baguette": "Our baguette sandwiches",
  "Dulces bocados": "Sweet bites",
  "Batidos y licuados": "Shakes and smoothies",
  "La juguería": "Juice bar",
  "Las bebidas": "Drinks",
  "El picoteo": "Snacks",
  "Bionicos y frutas": "Fruit bowls",
  "Jamón viena, salami, manchego y aderezo de la casa.": "Viena ham, salami, manchego and house dressing.",
  "Jamón de pierna de cerdo, manchego, salami, lechuga, jitomate y aderezo de la casa.": "Pork leg ham, manchego, salami, lettuce, tomato and house dressing.",
  "Jamón de pechuga de pavo, manchego, salami, lechuga, jitomate y aderezo de la casa.": "Roast turkey breast, manchego, salami, lettuce, tomato and house dressing.",
  "Fajitas de pollo jugoso, manchego, lechuga, jitomate y aderezo de la casa.": "Juicy chicken fajitas, manchego, lettuce, tomato and house dressing.",
  "Salsa de pizza, pepperoni, queso gratinado y aderezo de la casa.": "Pizza sauce, pepperoni, melted cheese and house dressing.",
  "Atún, manchego, lechuga, pepino, jitomate y aderezo de la casa.": "Tuna, manchego, lettuce, cucumber, tomato and house dressing.",
  "Manchego, panela y queso regianito, lechuga, jitomate y aderezo de la casa.": "Manchego, panela and regianito cheese, lettuce, tomato and house dressing.",
  "Setas o champiñones y calabazas cocinadas, lechuga, jitomate, zanahoria, betabel, germen, pepino y aderezo de la casa.": "Mushrooms and sautéed zucchini, lettuce, tomato, carrot, beet, sprouts, cucumber and house dressing.",
  "Chorizo vegano 100% sin gluten, queso manchego, lechuga y aderezo de la casa.": "Vegan chorizo (100% gluten-free), manchego, lettuce and house dressing.",
  "Plus, Pechugón, Pollero, Tunero, Quesero, Ensaladón y Chori-Vegano con opción en bagel o cuernito.": "Plus, Pechugón, Pollero, Tunero, Quesero, Ensaladón and Chori-Vegano can all be made on a bagel or a cuernito.",
  "Para comer con calma": "Sit down and take your time",
  "Huevito cocinado, queso manchego, espinaca, jitomate, lechuga y aderezo de la casa.": "Egg cooked to order, manchego, spinach, tomato, lettuce and house dressing.",
  "Salsa de pizza, piña, durazno, queso gratinado y aderezo de la casa.": "Pizza sauce, pineapple, peach, melted cheese and house dressing.",
  "Frijolitos negros, queso gratinado, aderezo de la casa y pico de gallo.": "Black beans, melted cheese, house dressing and pico de gallo.",
  "Con el aderezo que tú elijas": "Your choice of dressing",
  "Lechuga, fajitas de pollo salpimentadas, zanahoria, betabel, germen, jitomate cherry, pepino, pollo salteado y croutones.": "Lettuce, seasoned chicken fajitas, carrot, beet, sprouts, cherry tomato, cucumber, sautéed chicken and croutons.",
  "Lechuga, jitomate, aguacate, elote, cuadritos de queso panela y tortillitas horneadas con chile guajillo.": "Lettuce, tomato, avocado, corn, panela cubes and baked tortilla chips with guajillo chile.",
  "Lechuga, fajitas de pollo BBQ, brócoli, zanahoria, pepino, germen, pollo BBQ y tortillitas horneadas.": "Lettuce, BBQ chicken fajitas, broccoli, carrot, cucumber, sprouts, BBQ chicken and baked tortilla chips.",
  "Lechuga, fajitas de pollo al cacahuate, brócoli, zanahoria, pepino, germen y cacahuates.": "Lettuce, peanut chicken fajitas, broccoli, carrot, cucumber, sprouts and peanuts.",
  "Betabel fileteado, vinagreta de hierbas, pistaches y requesón.": "Sliced beet, herb vinaigrette, pistachios and ricotta.",
  "Lechuga, quinoa, fresa, cubos de panela y frutos secos caramelizados.": "Lettuce, quinoa, strawberry, panela cubes and caramelized nuts.",
  "Los empalagosos": "If you've got a sweet tooth",
  "Cuernito calientito con compota casera de frutos rojos y queso doble crema.": "Warm cuernito with house red-berry jam and double cream cheese.",
  "Rebanada de panqué de mantequilla 100% con naranja.": "A slice of panqué made with 100% butter and orange.",
  "Panquesito de queso.": "Cheese panquecito.",
  "940 ml, con leche entera, azúcar, canela y avena": "940 ml with whole milk, sugar, cinnamon and oats",
  "Fresa, leche entera, azúcar, canela y avena.": "Strawberry, whole milk, sugar, cinnamon and oats.",
  "Plátano, cacao, leche entera, azúcar, canela y avena.": "Banana, cacao, whole milk, sugar, cinnamon and oats.",
  "Frutos Rojos": "Mixed berries",
  "Frutos rojos, leche entera, azúcar, canela y avena.": "Mixed berries, whole milk, sugar, cinnamon and oats.",
  "Espinacas con plátano, leche entera, azúcar, canela y avena.": "Spinach and banana, whole milk, sugar, cinnamon and oats.",
  "Mango, leche entera, azúcar, canela y avena.": "Mango, whole milk, sugar, cinnamon and oats.",
  "Papaya, leche entera, azúcar, canela y avena.": "Papaya, whole milk, sugar, cinnamon and oats.",
  "495 ml, con jugo de naranja natural": "495 ml with fresh orange juice",
  "Apio, jengibre, nopal y piña con jugo de naranja.": "Celery, ginger, nopal and pineapple with orange juice.",
  "Jugo de naranja natural 100%. A veces sale acidito.": "100% fresh orange juice. Sometimes it comes out a little tart.",
  "Betabel y jugo de naranja.": "Beet and orange juice.",
  "Betabel y jugo de naranja. 495 ml.": "Beet and orange juice. 495 ml.",
  "Panqué de mantequilla 100% con naranja, recién horneado.": "Panqué made with 100% butter and orange, fresh out of the oven.",
  "Fresa, leche entera, azúcar, canela y avena. 940 ml.": "Strawberry, whole milk, sugar, cinnamon and oats. 940 ml.",
  "Zanahoria y jugo de naranja.": "Carrot and orange juice.",
  "Con auténtico piloncillo y canela.": "Made with real piloncillo and cinnamon.",
  "Café americano.": "American coffee.",
  "Fresco, con limón y sal": "Fresh, with lime and salt",
  "Jícama fresca, rodajita de limón y sal.": "Fresh jicama with a wedge of lime and salt.",
  "Pepino fresco, rodajita de limón y sal.": "Fresh cucumber with a wedge of lime and salt.",
  "Bastones con rodajita de limón y sal.": "Cut into sticks, with a wedge of lime and salt.",
  "En vaso de 500 ml": "In a 500 ml cup",
  "Frutas varias con cremita dulce y granola.": "Mixed fruit with sweet cream and granola.",
  "Frutas varias con miel y granola.": "Mixed fruit with honey and granola.",
  "Frutas varias batidas con yogur y cereales.": "Mixed fruit blended with yogurt and cereal.",
  "Pedidos": "Orders",
  "Cómo pedir": "How to order",
  "Nos dices qué quieres del menú y te confirmamos.": "Tell us what you want from the menu and we'll confirm.",
  "Lo preparamos": "We make it",
  "Se arma al momento, con el aderezo que elijas.": "Made to order, with your choice of dressing.",
  "Recoges o te quedas": "Pick it up or stay",
  "Pasas por él a Valle Nacional 106, o te sientas aquí.": "Grab it at Valle Nacional 106, or sit down and eat here.",
  "Fotos del local y los platillos": "Photos of the place and the food",
  "Pollo a la plancha, lechuga, brócoli, zanahoria, pepino y germen de alfalfa.": "Grilled chicken, lettuce, broccoli, carrot, cucumber and alfalfa sprouts.",
  "Panqué de mantequilla y panquesito de queso, del tamaño justo para el café.": "Butter panqué and cheese panquecito — just the right size for coffee.",
  "Baguette de corteza dorada y miga suave: la base de todos los baguettones.": "Golden crust, soft crumb — the base of every baguetton.",
  "Fruta batida con yogur y cereales, servida bien fría.": "Fruit blended with yogurt and cereal, served ice cold.",
  "Apio, jengibre, nopal y piña con jugo de naranja. 495 ml.": "Celery, ginger, nopal and pineapple with orange juice. 495 ml.",
  "Café tostado con canela y piloncillo. 16 oz.": "Roasted coffee with cinnamon and piloncillo. 16 oz.",
  "Mango con canela y avena, servido con trocitos de mango encima.": "Mango with cinnamon and oats, topped with mango chunks.",
  "Lechuga, jitomate, aguacate, elote, queso panela y tortillitas horneadas con chile guajillo.": "Lettuce, tomato, avocado, corn, panela cheese and baked tortilla chips with guajillo chile.",
  "Ensalada servida en bowl": "Salad served in a bowl",
  "Baguetton en baguette": "Baguetton on baguette",
  "Ensalada con aderezo aparte": "Salad with dressing on the side",
  "Ensalada de pollo": "Chicken salad",
  "Dulce de la casa": "House sweets",
  "El pan de la casa": "Our house bread",
  "Anterior": "Previous",
  "Siguiente": "Next",
  "Cerrar": "Close",
  "Dónde estamos": "Where to find us",
  "Dirección": "Address",
  "Fracc. Valle Dorado, Mezcales, Nayarit · C.P. 63735": "Valle Dorado, Mezcales, Nayarit · ZIP 63735",
  "Horario": "Hours",
  "Lun a vie · 8:00 am a 8:00 pm": "Mon–Fri · 8 am–8 pm",
  "Sábado · 8:00 am a 2:00 pm": "Saturday · 8 am–2 pm",
  "Domingo cerrado": "Closed Sundays",
  "Abierto ahora": "Open now",
  "Cerrado ahora": "Closed now",
  "Aún no abrimos": "Not open yet",
  "Pedidos y dudas · solo por WhatsApp": "Orders and questions · WhatsApp only",
  "Ubicación de El Baguetton Express en Valle Dorado": "El Baguetton Express in Valle Dorado",
  "Formas de pago": "Payment methods",
  "Efectivo": "Cash",
  "Tarjeta de crédito": "Credit card",
  "Tarjeta de débito": "Debit card",
  "Visa, Mastercard y Carnet, o Mercado Pago desde tu celular.": "Visa, Mastercard and Carnet — plus Mercado Pago on your phone.",
  "Aceptamos tarjeta de crédito, débito, Carnet y Mercado Pago.": "We take credit cards, debit cards, Carnet and Mercado Pago.",
  "¿Puedo pagar con tarjeta?": "Can I pay by card?",
  "Sí. Aceptamos tarjeta de crédito y débito —Visa, Mastercard y Carnet— y Mercado Pago desde tu celular. También puedes pagar en efectivo.": "Yes. We take credit and debit cards (Visa, Mastercard and Carnet) and Mercado Pago on your phone. Cash works too.",
  "Preguntas": "Questions",
  "Preguntas frecuentes": "Common questions",
  "¿Ya abrieron?": "Are you open yet?",
  "Sí. Abrimos el 6 de noviembre de 2026 y ya estamos atendiendo en Valle Nacional 106, Fracc. Valle Dorado, Mezcales, Nayarit.": "Yes. We opened on November 6, 2026 and we're already serving at Valle Nacional 106, Valle Dorado, Mezcales, Nayarit.",
  "¿Qué promociones tienen?": "Any specials?",
  "Los lunes, 3x2 en ensaladas: pides tres y pagas dos, todo el día y hasta agotar existencias. Los viernes, en la compra de tu baguette te regalamos el café americano; no aplica en Baguette Clásico.": "Mondays we do 3 for 2 on salads: order three, pay for two, all day while they last. On Fridays, order any baguette and the American coffee is on us. Not valid with the Classic.",
  "¿Cuál es el horario?": "What are your hours?",
  "De lunes a viernes de 8:00 am a 8:00 pm y sábados de 8:00 am a 2:00 pm. Los domingos permanecemos cerrados.": "Monday through Friday, 8 am to 8 pm. Saturdays, 8 am to 2 pm. Closed Sundays.",
  "¿Puedo pedir para llevar?": "Can I get it to go?",
  "Sí, todo el menú se puede pedir para llevar. Nos escribes por WhatsApp y lo recoges.": "Yes, everything on the menu can go. Message us on WhatsApp and pick it up.",
  "¿Puedo cambiar la baguette por bagel o cuernito?": "Can I swap the baguette for a bagel or cuernito?",
  "Sí. Casi todos los baguettones se pueden pedir en bagel o en cuernito, solo avísanos al pedir.": "Yes. Almost every baguetton can be made on a bagel or a cuernito — just tell us when you order.",
  "¿Los aderezos son caseros?": "Are the dressings homemade?",
  "Todos. Se preparan aquí: ranch eneldo, miel mostaza, vinagreta italiana, tamarindo y vinagreta de hierbas.": "All five. We make them right here: dill ranch, honey mustard, Italian vinaigrette, tamarind and herb vinaigrette.",
  "¿Hay opciones sin carne?": "Do you have meat-free options?",
  "Sí: el Ensaladón, el Chori-Vegano (chorizo vegano 100% sin gluten), el Quesero y las ensaladas Remolacha Deli y La Primavera.": "Yes. The Ensaladón, the Chori-Vegano (100% gluten-free vegan chorizo), the Quesero, and the Remolacha Deli and La Primavera salads.",
  "Nos vemos en Valle Dorado": "See you in Valle Dorado",
  "Valle Nacional 106, Valle Dorado. Lun a vie de 8 am a 8 pm · sábado de 8 am a 2 pm.": "Valle Nacional 106, Valle Dorado. Mon–Fri 8 am–8 pm · Sat 8 am–2 pm.",
  "Valle Nacional 106 · Valle Dorado, Mezcales, Nayarit": "Valle Nacional 106 · Valle Dorado, Mezcales, Nayarit",
  "Aviso de privacidad": "Privacy notice",
  "Facebook": "Facebook",
  "Instagram": "Instagram",
  "YouTube": "YouTube",
  "WhatsApp": "WhatsApp",
};

const TITULO = {
  es: 'El Baguetton Express | Sándwiches y café en Valle Dorado',
  en: 'El Baguetton Express | Baguette sandwiches and coffee in Valle Dorado',
};

const DESCRIPCION = {
  es: 'Sándwiches, ensaladas y café con aderezos caseros en Valle Dorado, Mezcales. Aceptamos tarjeta y Mercado Pago. Lun a vie 8 am a 8 pm, sáb 8 am a 2 pm.',
  en: 'Baguette sandwiches, salads and coffee with dressings made in-house in Valle Dorado, Mezcales. We take cards and Mercado Pago. Mon–Fri 8 am–8 pm, Sat 8 am–2 pm.',
};

const WA_ES = 'Hola, quiero información de El Baguetton Express.';
const WA_EN = "Hi, I'd like information about El Baguetton Express.";

const ATRIBUTOS = ['alt', 'aria-label', 'title', 'placeholder'];

const textos = new WeakMap();   /* nodo → texto original */
const atributos = new WeakMap(); /* elemento → { atributo: valor original } */

const normalizar = (s) => s.replace(/\s+/g, ' ').trim();

function traducirClave(clave) {
  if (EN[clave]) return EN[clave];
  const foto = clave.match(/^Foto (\d+)$/);
  if (foto) return `Photo ${foto[1]}`;
  return null;
}

function escribirNodos(raiz, idioma) {
  const paseo = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
  const nodos = [];
  let n;
  while ((n = paseo.nextNode())) nodos.push(n);

  for (const nodo of nodos) {
    const crudo = nodo.nodeValue;
    if (!crudo || !crudo.trim()) continue;
    const clave = normalizar(crudo);
    const destino = idioma === 'en' ? traducirClave(clave) : null;

    if (idioma === 'en') {
      if (!destino) continue;
      if (!textos.has(nodo)) textos.set(nodo, crudo);
      const ini = crudo.match(/^\s*/)[0];
      const fin = crudo.match(/\s*$/)[0];
      const nuevo = ini + destino + fin;
      if (nodo.nodeValue !== nuevo) nodo.nodeValue = nuevo;
    } else if (textos.has(nodo)) {
      nodo.nodeValue = textos.get(nodo);
      textos.delete(nodo);
    }
  }

  const elementos = raiz.querySelectorAll ? raiz.querySelectorAll('*') : [];
  for (const el of elementos) {
    for (const attr of ATRIBUTOS) {
      const valor = el.getAttribute(attr);
      if (!valor) continue;
      if (idioma === 'en') {
        const destino = traducirClave(normalizar(valor));
        if (!destino) continue;
        const guardado = atributos.get(el) || {};
        if (!(attr in guardado)) guardado[attr] = valor;
        atributos.set(el, guardado);
        if (valor !== destino) el.setAttribute(attr, destino);
      } else if (atributos.has(el)) {
        const guardado = atributos.get(el);
        if (attr in guardado) el.setAttribute(attr, guardado[attr]);
      }
    }

    /* el saludo precargado de WhatsApp cambia con el idioma */
    const href = el.getAttribute && el.getAttribute('href');
    if (href && href.startsWith('https://wa.me/') && href.includes('text=')) {
      const base = href.split('text=')[0];
      const actual = decodeURIComponent(href.split('text=')[1] || '');
      if (idioma === 'en' && (actual === WA_ES || actual === WA_EN)) {
        el.setAttribute('href', `${base}text=${encodeURIComponent(WA_EN)}`);
      } else if (idioma === 'es' && actual === WA_EN) {
        el.setAttribute('href', `${base}text=${encodeURIComponent(WA_ES)}`);
      }
    }
  }
}

function pintarMeta(idioma) {
  document.documentElement.lang = idioma;
  document.title = TITULO[idioma];
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', DESCRIPCION[idioma]);
  const og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute('content', idioma === 'en' ? 'en_US' : 'es_MX');
  const ogt = document.querySelector('meta[property="og:title"]');
  if (ogt) ogt.setAttribute('content', TITULO[idioma]);
  const ogd = document.querySelector('meta[property="og:description"]');
  if (ogd) ogd.setAttribute('content', DESCRIPCION[idioma]);
}

let idiomaActual = 'es';
let observador = null;

export function idiomaGuardado() {
  try {
    const guardado = localStorage.getItem('baguetton-idioma');
    if (guardado === 'en' || guardado === 'es') return guardado;
  } catch {
    /* modo privado: se queda en español */
  }
  return 'es';
}

export function aplicarIdioma(idioma) {
  idiomaActual = idioma === 'en' ? 'en' : 'es';
  escribirNodos(document.body, idiomaActual);
  pintarMeta(idiomaActual);
  try {
    localStorage.setItem('baguetton-idioma', idiomaActual);
  } catch {
    /* sin almacenamiento: el cambio solo dura la visita */
  }

  /* lo que se monte después (lightbox, menú móvil) también se traduce */
  if (idiomaActual === 'en' && !observador) {
    observador = new MutationObserver((cambios) => {
      for (const c of cambios) {
        if (c.type === 'childList') {
          c.addedNodes.forEach((nodo) => {
            if (nodo.nodeType === 1) escribirNodos(nodo, 'en');
            else if (nodo.nodeType === 3 && nodo.parentElement) escribirNodos(nodo.parentElement, 'en');
          });
        }
      }
    });
    observador.observe(document.body, { childList: true, subtree: true });
  } else if (idiomaActual === 'es' && observador) {
    observador.disconnect();
    observador = null;
  }
}

export function idiomaActualGet() {
  return idiomaActual;
}
