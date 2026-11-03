/* Carta completa: fuente única para el sitio y para el schema del <head>.
   Si cambia un precio o un platillo, se cambia AQUÍ y se corre `npm run build`. */

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

export default MENU;
