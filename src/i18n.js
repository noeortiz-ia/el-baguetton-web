/* Traducción del sitio al inglés.
   El español es el texto fuente que ya vive en el marcado; aquí solo se
   guarda su equivalente. Al cambiar de idioma se recorre el DOM y se
   sustituyen los nodos de texto y los atributos visibles, guardando el
   original para poder volver sin recargar. */

const EN = {
  /* navegación y cabecera */
  'Menú': 'Menu',
  'Promociones': 'Deals',
  'Aderezos': 'Dressings',
  'Galería': 'Photos',
  'Ubicación': 'Find us',
  'Compartir': 'Share',
  'Secciones': 'Sections',
  'Abrir menú': 'Open menu',
  'Cerrar menú': 'Close menu',
  'Escribir por WhatsApp': 'Message us on WhatsApp',
  'Compartir el sitio': 'Share this site',
  'Compartir por WhatsApp': 'Share on WhatsApp',
  'Compartir por Facebook': 'Share on Facebook',
  'Compartir por correo': 'Share by email',
  'Correo': 'Email',
  'Copiar enlace': 'Copy link',
  'Más opciones para compartir': 'More sharing options',
  'Enlace copiado': 'Link copied',
  'Secciones del sitio': 'Site sections',

  /* portada */
  'Valle Dorado · Mezcales, Nayarit': 'Valle Dorado · Mezcales, Nayarit',
  'Sándwiches en baguette, ensaladas y café': 'Baguette sandwiches, salads and coffee',
  'En Valle Dorado, Mezcales. Aderezos hechos en casa. Lun a vie de 8 am a 8 pm · sábado de 8 am a 2 pm.':
    'In Valle Dorado, Mezcales. Dressings made in house. Mon to Fri 8 am to 8 pm · Saturday 8 am to 2 pm.',
  'Pedir por WhatsApp': 'Order on WhatsApp',
  'Pide por WhatsApp': 'Order on WhatsApp',
  'Cómo llegar': 'Get directions',

  /* qué hay en el menú */
  'Qué hay en el menú': "What's on the menu",
  'Sándwiches': 'Sandwiches',
  'En baguette, armados al momento.': 'On baguette, made to order.',
  'Ensaladas': 'Salads',
  'Frescas, con aderezo aparte.': 'Fresh, dressing on the side.',
  'Café': 'Coffee',
  'Para acompañar o para llevar.': 'To stay or to go.',
  'Dulce': 'Sweets',
  'Croissants, panqué y postres.': 'Croissants, panqué and desserts.',
  'Ver en el menú': 'See it on the menu',
  'Ver Sándwiches en el menú': 'See Sandwiches on the menu',
  'Ver Ensaladas en el menú': 'See Salads on the menu',
  'Ver Café en el menú': 'See Coffee on the menu',
  'Ver Dulce en el menú': 'See Sweets on the menu',

  /* marquesina */

  /* aderezos */
  'Los aderezos se hacen aquí': 'The dressings are made here',
  'Todos. Se preparan en nuestra cocina, no llegan listos de ningún lado. Por eso una ensalada aquí no sabe como las demás. Y cualquiera de los':
    'All of them. We make them in our kitchen; none of them arrive ready-made. That is why a salad here does not taste like the others. And any of the',
  'baguettones de la carta': 'baguettes on the menu',
  'lleva el aderezo que tú elijas.': 'comes with the dressing you choose.',
  'Es lo que le cambia el sabor a todo: a la ensalada, al sándwich, a lo que te lleves para la casa.':
    "It is what changes the flavor of everything: the salad, the sandwich, whatever you take home.",
  'Cinco, y tienes que escoger con cuál:': 'Five, and you have to pick one:',
  'Ranch eneldo': 'Dill ranch',
  'Cremoso y con el eneldo bien marcado, de esos que se quedan en la hoja. El que va con casi todo.':
    'Creamy, with the dill coming through. The one that goes with almost everything.',
  'Con el Clásico, el Pollero y cualquier ensalada.': 'With the Clásico, the Pollero and any salad.',
  'Miel mostaza': 'Honey mustard',
  'Dulce de miel con el filo de la mostaza al final. No empalaga.':
    'Sweet from the honey, with the mustard bite at the end. It does not cloy.',
  'Con lo que lleva pollo o queso.': 'With anything that has chicken or cheese.',
  'Vinagreta italiana': 'Italian vinaigrette',
  'Ligera, ácida y con hierbas secas. La que no se siente pesada.':
    'Light, tangy, with dried herbs. The one that does not sit heavy.',
  'Para ensaladas y para quien no quiere crema.': 'For salads, and for anyone who does not want cream.',
  'Tamarindo': 'Tamarind',
  'Agridulce y tropical, con más acidez que dulzor.': 'Sweet and sour, tropical, more tart than sweet.',
  'Para el que quiere probar algo distinto.': 'For anyone who wants something different.',
  'Vinagreta de hierbas': 'Herb vinaigrette',
  'Verde y fresca, con el amargor justo de la hierba.': 'Green and fresh, with just the right herbal bite.',
  'Con hojas verdes y betabel.': 'With leafy greens and beet.',
  'Los aderezos, hechos aquí': 'The dressings, made here',

  /* promociones */
  'Lunes y viernes': 'Mondays and Fridays',
  'Lunes 3x2 en ensaladas y viernes café americano de regalo. En el local o por WhatsApp.':
    'Mondays 3 for 2 on salads, Fridays free American coffee. Dine in or order on WhatsApp.',
  'Lunes': 'Monday',
  '3 x 2': '3 for 2',
  'Pides tres, pagas dos. Todo el día.': 'Order three, pay for two. All day.',
  'Hasta agotar existencias.': 'While supplies last.',
  'Viernes': 'Friday',
  'De regalo': 'On the house',
  'En la compra de tu baguette.': 'With any baguette.',
  'No aplica en Baguette Clásico.': 'Not valid on the Classic baguette.',
  'Pregunta por WhatsApp qué promoción hay hoy.': 'Ask on WhatsApp which deal is on today.',
  'Tres ensaladas de El Baguetton Express': 'Three salads from El Baguetton Express',
  'Baguette y café americano de El Baguetton Express': 'Baguette and American coffee from El Baguetton Express',

  /* carta */
  'Carta y precios': 'Menu and prices',
  'Menú y precios': 'Menu and prices',
  'Sándwiches en baguette, ensaladas, dulce, café, batidos y jugos. Todos los aderezos se hacen aquí.':
    'Baguette sandwiches, salads, sweets, coffee, shakes and juices. Every dressing is made here.',
  'Nuestros sándwiches en baguette': 'Our baguette sandwiches',
  'Jamón viena, salami, manchego y aderezo de la casa.': 'Viena ham, salami, manchego and house dressing.',
  'Jamón de pierna de cerdo, manchego, salami, lechuga, jitomate y aderezo de la casa.':
    'Pork leg ham, manchego, salami, lettuce, tomato and house dressing.',
  'Jamón de pechuga de pavo, manchego, salami, lechuga, jitomate y aderezo de la casa.':
    'Turkey breast ham, manchego, salami, lettuce, tomato and house dressing.',
  'Fajitas de pollo jugoso, manchego, lechuga, jitomate y aderezo de la casa.':
    'Juicy chicken fajitas, manchego, lettuce, tomato and house dressing.',
  'Salsa de pizza, pepperoni, queso gratinado y aderezo de la casa.':
    'Pizza sauce, pepperoni, melted cheese and house dressing.',
  'Atún, manchego, lechuga, pepino, jitomate y aderezo de la casa.':
    'Tuna, manchego, lettuce, cucumber, tomato and house dressing.',
  'Manchego, panela y queso regianito, lechuga, jitomate y aderezo de la casa.':
    'Manchego, panela and regianito cheese, lettuce, tomato and house dressing.',
  'Setas o champiñones y calabazas cocinadas, lechuga, jitomate, zanahoria, betabel, germen, pepino y aderezo de la casa.':
    'Mushrooms and cooked zucchini, lettuce, tomato, carrot, beet, sprouts, cucumber and house dressing.',
  'Chorizo vegano 100% sin gluten, queso manchego, lechuga y aderezo de la casa.':
    '100% gluten-free vegan chorizo, manchego, lettuce and house dressing.',
  'Plus, Pechugón, Pollero, Tunero, Quesero, Ensaladón y Chori-Vegano con opción en bagel o cuernito.':
    'Plus, Pechugón, Pollero, Tunero, Quesero, Ensaladón and Chori-Vegano can be made on a bagel or a cuernito.',

  'Para comer con calma': 'For a slow meal',
  'Huevito cocinado, queso manchego, espinaca, jitomate, lechuga y aderezo de la casa.':
    'Cooked egg, manchego, spinach, tomato, lettuce and house dressing.',
  'Salsa de pizza, piña, durazno, queso gratinado y aderezo de la casa.':
    'Pizza sauce, pineapple, peach, melted cheese and house dressing.',
  'Frijolitos negros, queso gratinado, aderezo de la casa y pico de gallo.':
    'Black beans, melted cheese, house dressing and pico de gallo.',

  'Con el aderezo que tú elijas': 'With the dressing you choose',
  'Lechuga, fajitas de pollo salpimentadas, zanahoria, betabel, germen, jitomate cherry, pepino, pollo salteado y croutones.':
    'Lettuce, seasoned chicken fajitas, carrot, beet, sprouts, cherry tomato, cucumber, sautéed chicken and croutons.',
  'Lechuga, jitomate, aguacate, elote, cuadritos de queso panela y tortillitas horneadas con chile guajillo.':
    'Lettuce, tomato, avocado, corn, panela cubes and baked tortilla chips with guajillo chile.',
  'Lechuga, fajitas de pollo BBQ, brócoli, zanahoria, pepino, germen, pollo BBQ y tortillitas horneadas.':
    'Lettuce, BBQ chicken fajitas, broccoli, carrot, cucumber, sprouts, BBQ chicken and baked tortilla chips.',
  'Lechuga, fajitas de pollo al cacahuate, brócoli, zanahoria, pepino, germen y cacahuates.':
    'Lettuce, peanut chicken fajitas, broccoli, carrot, cucumber, sprouts and peanuts.',
  'Betabel fileteado, vinagreta de hierbas, pistaches y requesón.':
    'Sliced beet, herb vinaigrette, pistachios and ricotta.',
  'Lechuga, quinoa, fresa, cubos de panela y frutos secos caramelizados.':
    'Lettuce, quinoa, strawberry, panela cubes and caramelized nuts.',

  'Los empalagosos': 'For the sweet tooth',
  'Cuernito calientito con compota casera de frutos rojos y queso doble crema.':
    'Warm cuernito with house red-berry compote and double cream cheese.',
  'Rebanada de panqué de mantequilla 100% con naranja.':
    'Slice of 100% butter panqué with orange.',
  'Panquesito de queso.': 'Cheese panquecito.',

  '940 ml, con leche entera, azúcar, canela y avena': '940 ml, with whole milk, sugar, cinnamon and oats',
  'Fresa, leche entera, azúcar, canela y avena.': 'Strawberry, whole milk, sugar, cinnamon and oats.',
  'Plátano, cacao, leche entera, azúcar, canela y avena.': 'Banana, cacao, whole milk, sugar, cinnamon and oats.',
  'Frutos Rojos': 'Mixed berries',
  'Frutos rojos, leche entera, azúcar, canela y avena.': 'Mixed berries, whole milk, sugar, cinnamon and oats.',
  'Espinacas con plátano, leche entera, azúcar, canela y avena.':
    'Spinach with banana, whole milk, sugar, cinnamon and oats.',
  'Mango, leche entera, azúcar, canela y avena.': 'Mango, whole milk, sugar, cinnamon and oats.',
  'Papaya, leche entera, azúcar, canela y avena.': 'Papaya, whole milk, sugar, cinnamon and oats.',

  '495 ml, con jugo de naranja natural': '495 ml, with fresh orange juice',
  'Apio, jengibre, nopal y piña con jugo de naranja.': 'Celery, ginger, nopal and pineapple with orange juice.',
  'Jugo de naranja natural 100%. A veces sale acidito.':
    '100% fresh orange juice. Sometimes it comes out a little tart.',
  'Betabel y jugo de naranja.': 'Beet and orange juice.',
  'Betabel y jugo de naranja. 495 ml.': 'Beet and orange juice. 495 ml.',
  'Fresa, leche entera, azúcar, canela y avena. 940 ml.': 'Strawberry, whole milk, sugar, cinnamon and oats. 940 ml.',
  'Zanahoria y jugo de naranja.': 'Carrot and orange juice.',

  'Con auténtico piloncillo y canela.': 'With real piloncillo and cinnamon.',
  'Café americano.': 'American coffee.',

  'Fresco, con limón y sal': 'Fresh, with lime and salt',
  'Jícama fresca, rodajita de limón y sal.': 'Fresh jicama, a slice of lime and salt.',
  'Pepino fresco, rodajita de limón y sal.': 'Fresh cucumber, a slice of lime and salt.',
  'Bastones con rodajita de limón y sal.': 'Sticks with a slice of lime and salt.',

  'En vaso de 500 ml': '500 ml cup',
  'Frutas varias con cremita dulce y granola.': 'Mixed fruit with sweet cream and granola.',
  'Frutas varias con miel y granola.': 'Mixed fruit with honey and granola.',
  'Frutas varias batidas con yogur y cereales.': 'Mixed fruit blended with yogurt and cereal.',

  /* cómo pedir */
  'Pedidos': 'Orders',
  'Cómo pedir': 'How to order',
  'Nos dices qué quieres del menú y te confirmamos.': 'Tell us what you want from the menu and we confirm.',
  'Lo preparamos': 'We make it',
  'Se arma al momento, con el aderezo que elijas.': 'Built to order, with the dressing you pick.',
  'Recoges o te quedas': 'Pick it up or stay',
  'Pasas por él a Valle Nacional 106, o te sientas aquí.': 'Pick it up at Valle Nacional 106, or sit down here.',

  /* galería */
  'Fotos del local y los platillos': 'Photos of the place and the food',
  'Pollo a la plancha, lechuga, brócoli, zanahoria, pepino y germen de alfalfa.':
    'Grilled chicken, lettuce, broccoli, carrot, cucumber and alfalfa sprouts.',
  'Panqué de mantequilla y panquesito de queso, del tamaño justo para el café.':
    'Butter panqué and cheese panquecito, just the right size for coffee.',
  'Baguette de corteza dorada y miga suave: la base de todos los baguettones.':
    'Baguette with a golden crust and soft crumb: the base of every baguetton.',
  'Fruta batida con yogur y cereales, servida bien fría.': 'Blended fruit with yogurt and cereal, served cold.',
  'Apio, jengibre, nopal y piña con jugo de naranja. 495 ml.':
    'Celery, ginger, nopal and pineapple with orange juice. 495 ml.',
  'Café tostado con canela y piloncillo. 16 oz.': 'Roasted coffee with cinnamon and piloncillo. 16 oz.',
  'Mango con canela y avena, servido con trocitos de mango encima.':
    'Mango with cinnamon and oats, topped with mango pieces.',
  'Lechuga, jitomate, aguacate, elote, queso panela y tortillitas horneadas con chile guajillo.':
    'Lettuce, tomato, avocado, corn, panela cheese and baked tortilla chips with guajillo chile.',
  'Ensalada servida en bowl': 'Salad served in a bowl',
  'Anterior': 'Previous',
  'Siguiente': 'Next',
  'Cerrar': 'Close',

  /* ubicación */
  'Dónde estamos': 'Where we are',
  'Dirección': 'Address',
  'Fracc. Valle Dorado, Mezcales, Nayarit · C.P. 63735': 'Valle Dorado, Mezcales, Nayarit · ZIP 63735',
  'Horario': 'Hours',
  'Lun a vie · 8:00 am a 8:00 pm': 'Mon to Fri · 8:00 am to 8:00 pm',
  'Sábado · 8:00 am a 2:00 pm': 'Saturday · 8:00 am to 2:00 pm',
  'Domingo cerrado': 'Closed Sunday',
  'Abierto ahora': 'Open now',
  'Cerrado ahora': 'Closed now',
  'Aún no abrimos': 'Not open yet',
  'Pedidos y dudas · solo por WhatsApp': 'Orders and questions · WhatsApp only',
  'Ubicación de El Baguetton Express en Valle Dorado': 'El Baguetton Express location in Valle Dorado',

  /* formas de pago */
  'Formas de pago': 'Payment methods',
  'Efectivo': 'Cash',
  'Tarjeta de crédito': 'Credit card',
  'Tarjeta de débito': 'Debit card',
  'Visa, Mastercard y Carnet, o Mercado Pago desde tu celular.': 'Visa, Mastercard and Carnet, or Mercado Pago from your phone.',
  'Aceptamos tarjeta de crédito, débito, Carnet y Mercado Pago.': 'We accept credit cards, debit cards, Carnet and Mercado Pago.',
  '¿Puedo pagar con tarjeta?': 'Can I pay by card?',
  'Sí. Aceptamos tarjeta de crédito y débito —Visa, Mastercard y Carnet— y Mercado Pago desde tu celular. También puedes pagar en efectivo.':
    'Yes. We take credit and debit cards —Visa, Mastercard and Carnet— and Mercado Pago from your phone. You can pay cash too.',

  /* preguntas */
  'Preguntas': 'Questions',
  'Preguntas frecuentes': 'Common questions',
  '¿Ya abrieron?': 'Are you open yet?',
  'Sí. Abrimos el 6 de noviembre de 2026 y ya estamos atendiendo en Valle Nacional 106, Fracc. Valle Dorado, Mezcales, Nayarit.':
    "Yes. We opened on November 6, 2026 and we are serving at Valle Nacional 106, Valle Dorado, Mezcales, Nayarit.",
  '¿Qué promociones tienen?': 'What deals do you have?',
  'Los lunes, 3x2 en ensaladas: pides tres y pagas dos, todo el día y hasta agotar existencias. Los viernes, en la compra de tu baguette te regalamos el café americano; no aplica en Baguette Clásico.':
    'Mondays, 3 for 2 on salads: order three, pay for two, all day while supplies last. Fridays, with any baguette the American coffee is on us; not valid on the Classic baguette.',
  '¿Cuál es el horario?': 'What are your hours?',
  'De lunes a viernes de 8:00 am a 8:00 pm y sábados de 8:00 am a 2:00 pm. Los domingos permanecemos cerrados.':
    'Monday to Friday 8:00 am to 8:00 pm, Saturdays 8:00 am to 2:00 pm. Closed on Sundays.',
  '¿Puedo pedir para llevar?': 'Can I order to go?',
  'Sí, todo el menú se puede pedir para llevar. Nos escribes por WhatsApp y lo recoges.':
    'Yes, the whole menu is available to go. Message us on WhatsApp and pick it up.',
  '¿Puedo cambiar la baguette por bagel o cuernito?': 'Can I swap the baguette for a bagel or a cuernito?',
  'Sí. Casi todos los baguettones se pueden pedir en bagel o en cuernito, solo avísanos al pedir.':
    'Yes. Almost every baguetton can be made on a bagel or a cuernito, just tell us when you order.',
  '¿Los aderezos son caseros?': 'Are the dressings homemade?',
  'Todos. Se preparan aquí: ranch eneldo, miel mostaza, vinagreta italiana, tamarindo y vinagreta de hierbas.':
    'All of them. We make them here: dill ranch, honey mustard, Italian vinaigrette, tamarind and herb vinaigrette.',
  '¿Hay opciones sin carne?': 'Are there meat-free options?',
  'Sí: el Ensaladón, el Chori-Vegano (chorizo vegano 100% sin gluten), el Quesero y las ensaladas Remolacha Deli y La Primavera.':
    'Yes: the Ensaladón, the Chori-Vegano (100% gluten-free vegan chorizo), the Quesero and the Remolacha Deli and La Primavera salads.',

  /* cierre y pie */
  'Nos vemos en Valle Dorado': 'See you in Valle Dorado',
  'Valle Nacional 106, Valle Dorado. Lun a vie de 8 am a 8 pm · sábado de 8 am a 2 pm.':
    'Valle Nacional 106, Valle Dorado. Mon to Fri 8 am to 8 pm · Saturday 8 am to 2 pm.',
  'Valle Nacional 106 · Valle Dorado, Mezcales, Nayarit': 'Valle Nacional 106 · Valle Dorado, Mezcales, Nayarit',
  'Aviso de privacidad': 'Privacy notice',
  'Facebook': 'Facebook',
  'Instagram': 'Instagram',
  'YouTube': 'YouTube',
  'WhatsApp': 'WhatsApp',
};

const TITULO = {
  es: 'El Baguetton Express | Sándwiches y café en Valle Dorado',
  en: 'El Baguetton Express | Baguette sandwiches and coffee in Valle Dorado',
};

const DESCRIPCION = {
  es: 'Sándwiches, ensaladas y café con aderezos caseros en Valle Dorado, Mezcales. Aceptamos tarjeta y Mercado Pago. Lun a vie 8 am a 8 pm, sáb 8 am a 2 pm.',
  en: 'Sandwiches, salads and coffee with house dressings in Valle Dorado, Mezcales. Cards and Mercado Pago accepted. Mon to Fri 8 am to 8 pm, Sat 8 am to 2 pm.',
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
