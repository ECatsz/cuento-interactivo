const app = document.getElementById("app");
const btnHome = document.getElementById("btnHome");

// Dropdown menu
const btnMenu = document.getElementById("btnMenu");
const menuDropdown = document.getElementById("menuDropdown");
const menuBookmark = document.getElementById("menuBookmark");
const menuSave = document.getElementById("menuSave");
const menuClear = document.getElementById("menuClear");
const menuHint = document.getElementById("menuHint");

function clearBookmark() {
  localStorage.removeItem(BOOKMARK_KEY);
}

// Toast
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");
let toastTimer = null;

function showToast(message) {
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

// ----- Bookmark -----
const BOOKMARK_KEY = "barbazul_bookmark_v1";

function getBookmark() {
  const raw = localStorage.getItem(BOOKMARK_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function setBookmark(id, title) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify({ id, title }));
}

function updateMenuHint() {
  const b = getBookmark();

  if (!b) menuHint.textContent = "No hay marcapáginas guardado todavía.";
  else menuHint.textContent = `Página guardada: ${b.title}`;

  menuBookmark.disabled = !b;
  menuClear.disabled = !b;
}


// ----- Menu open/close -----
function openMenu() {
  menuDropdown.hidden = false;
  btnMenu.setAttribute("aria-expanded", "true");
  updateMenuHint();
}
function closeMenu() {
  menuDropdown.hidden = true;
  btnMenu.setAttribute("aria-expanded", "false");
}
function toggleMenu() {
  if (menuDropdown.hidden) openMenu();
  else closeMenu();
}

btnMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});
menuDropdown.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("click", () => {
  if (!menuDropdown.hidden) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !menuDropdown.hidden) closeMenu();
});

// ----- RUTAS (ajústalas si tu canvas cambió más cosas) -----
const ROUTE_MAIN = ["cover", ...Array.from({ length: 15 }, (_, i) => `p${i + 1}`), "p16"];
const ROUTE_A = ["p17A", "p18A", "p19A", "p20A", "p21A"]; // 22A eliminada
const ROUTE_B = ["p17B", "p18B", "p19B", "p20B", "p21B"];

// ----- TOTAL páginas (para el indicador) -----
const TOTAL_PAGES = 21;

const STORY_TITLE = "La Aventura Inesperada de Barbazul";

function storyTitleHTML() {
  return `<div class="story-title">${STORY_TITLE}</div>`;
}

function pageNumberFromId(id) {
  if (!id || id === "cover") return null;
  const m = String(id).match(/^p(\d+)/i);
  return m ? Number(m[1]) : null;
}
function pageIndicatorHTML() {
  const n = pageNumberFromId(currentId());
  if (!n) return "";
  return `<div class="page-indicator">Página ${n} de ${TOTAL_PAGES}</div>`;
}

// ----- CONTENIDO (según tu canvas actualizado) -----
const PAGES = {
  cover: {
    type: "cover",
    title: "La Aventura Inesperada de Barbazul",
    description: "Barbazul encuentra un botón misterioso que lo conduce a Altamar, un mar mágico donde una gran batalla está a punto de decidir el destino del mundo. Junto a Rumbo y el loro Pipas, descubre que el botón es esencial para vencer al Corsario y evitar que le dé la vuelta a todo.",
    video: "assets/video/portada.mp4",
    image: "assets/images/imagen00__portada.png"
  },

  p1: {
    type: "scene",
    id: "p1",
    title: "La calle en otoño",
    text: [
      "Era una tarde de otoño de esas que huelen a pan tostado y a hojas secas aplastadas. La calle del pequeño pueblo estaba casi vacía. Solo se oía el crujido de las hojas bajo las zapatillas de los que pasaban y el murmullo lejano de una radio en alguna ventana.",
      "Barbazul caminaba despacio, pateando montoncitos de hojas sin prisa, como si cada paso fuera parte de un juego secreto. Llevaba una chaqueta abrigada, unos pantalones de deporte y su mochila roja, colgando de un hombro. Dentro guardaba cosas importantísimas: un mapa del tesoro dibujado por él, una piedra con forma de barco y una pegatina de calavera."
      ],
    image: "assets/images/imagen01.png",
    audio: "assets/audio/p01.mp3"
  },

  p2: {
    type: "scene",
    id: "p2",
    title: "El hallazgo",
    text: [
      "Mientras avanzaba por la acera, algo brilló entre las hojas caídas. No era un reflejo cualquiera; era un destello pequeño, de esos que parecen decirte 'eh, ven, que soy para ti'.",
      "Barbazul se agachó y apartó las hojas con la mano.",
      "—¿Y esto? —murmuró.",
      "Allí, medio enterrado, había un botón metálico con el dibujo de una calavera. No era una calavera cualquiera: tenía los ojos grandes, una sonrisa torcida y un pequeño rayito grabado en la frente.",
      " —¡Guau…! —dijo Barbazul en voz baja, como si tuviera miedo de que alguien más lo viera."
    ],
    image: "assets/images/imagen02.png",
    audio: "assets/audio/p02.mp3"
  },

  p3: {
    type: "scene",
    id: "p3",
    title: "Pipas en la jaula roja",
    text: [
      "Lo cogió con cuidado, lo limpió en la pernera del pantalón y lo levantó a contraluz. El botón brilló de nuevo, esta vez con un destello más intenso, casi como si se alegrara de haber sido encontrado. Por un segundo, a Barbazul le pareció que, entre el olor a tostado de la calle y las hojas secas, flotaba también un olor muy lejano a mar, como si alguien hubiera abierto una puerta invisible en algún sitio.",
      "Se le puso la piel de gallina.",
      "En ese momento, sintió que lo observaban. Se giró. En la pared de una casa cercana, colgada de un gancho, había una jaula roja. Dentro, un loro de plumas azules y amarillas lo miraba fijamente.",
      "—¿Hola…? —probó Barbazul, un poco incómodo.",
      "El loro inclinó la cabeza hacia un lado, movió las plumas de las alas y dijo con voz ronca: —¡Botón! ¡Botón del capitán!",
      "Barbazul abrió mucho los ojos. —¿Qué has dicho?"
    ],
    image: "assets/images/imagen03.png",
    audio: "assets/audio/p03.mp3"
  },

  p4: {
    type: "scene",
    id: "p4",
    title: "Camino a casa",
    text: [
      "Pero antes de que pudiera preguntarle más, una ráfaga de viento frío recorrió la calle. Las hojas se levantaron en remolinos, como si un gigante hubiera dado un pisotón al suelo. El loro se sobresaltó, dio un salto dentro de la jaula y luego se quedó quieto, mirando otra vez el botón que Barbazul había recogido.",
      "El niño sintió un cosquilleo raro en la barriga, como cuando se subía al columpio y alguien lo empujaba muy fuerte. Se colgó mejor la mochila al hombro, guardó el botón con muchísimo cuidado en un bolsillo y echó a correr hacia su casa."
    ],
    image: "assets/images/imagen04.png",
    audio: "assets/audio/p04.mp3"
  },

  p5: {
    type: "scene",
    id: "p5",
    title: "Habitación y tesoros",
    text: [
      "La habitación de Barbazul era su cueva pirata secreta. En el centro estaba la cama, cubierta con un nórdico de motivos marinos. En la pared colgaba un dibujo enorme de un bergantín, con velas hinchadas y su bandera negra.",
      "Sobre una estantería baja, Barbazul tenía sus tesoros: una brújula rota,una moneda dorada de chocolate que ya nadie se atrevía a comerse, una concha con forma de oreja de gigante, una cajita de madera y un trozo de tela a rayas que él insistía en que era de un pantalón de pirata auténtico.",
      "Se subió a la cama de un salto y sacó el botón del bolsillo.",
      "—Tú vas aquí —dijo, muy serio.",
      "  Abrió su cajita y colocó el botón de la calavera en el centro. El metal estaba tan frío que le recordó al columpio del parque en invierno, cuando lo tocas con las manos heladas. Durante un segundo, tuvo la sensación de que todos sus otros tesoros se quedaban un poco más apagados alrededor, como si el botón reclamara el centro del escenario.",
      "—Qué manía tiene mi cabeza de inventarse cosas… — murmuró.",
      "Cerró la caja con cuidado. Esta vez no ocurrió nada extraño: la ventana estaba bien cerrada y el aire, aunque frío, no se movía. La habitación estaba en silencio."
    ],
    image: "assets/images/imagen05.png",
    audio: "assets/audio/p05.mp3"
  },

  p6: {
    type: "scene",
    id: "p6",
    title: "Antes de dormir",
    text: [
      "Más tarde, ya de noche, Barbazul se puso su pijama de piratas, se lavó los dientes sin dejar de pensar en el botón y se metió en la cama. La cajita de tesoros seguía en la estantería, en su sitio de siempre. No brillaba ni temblaba; estaba igual que siempre… aunque a él le parecía que la tapa estaba un poquito abierta. O quizá solo era la sombra.",
      "—Mañana jugaré a la gran batalla —murmuró, tapándose hasta la nariz—. Yo seré el capitán.",
      "La habitación estaba a oscuras y en silencio. Ni el más mínimo movimiento. Solo el sonido del viento afuera, golpeando suavemente los cristales.",
      "Barbazul cerró los ojos durante un instante y pensó lo emocionados que estarían mañana sus amigos cuando les enseñase su nuevo tesoro.",
      "En un rincón de la habitación silenciosa, algo parecía estar esperando su momento, meciéndose como un barco anclado en la oscuridad. Y justo antes de quedarse dormido, Barbazul tuvo la sensación de que la habitación estaba demasiado quieta. Quieta como cuando alguien se esconde para dar un susto."
    ],
    image: "assets/images/imagen06.png",
    audio: "assets/audio/p06.mp3"
  },

  p7: {
    type: "scene",
    id: "p7",
    title: "¡Irrupción del mar!",
    text: [
      "La habitación seguía tan quieta como al quedarse dormido… hasta que dejó de estarlo.",
      "Barbazul dormía profundamente, enredado entre las sábanas, cuando algo hizo ¡CLONK! contra la ventana. No fue un golpecito tímido, sino un golpe decidido, como si alguien hubiera llamado con el puño.",
      "Antes de que pudiera abrir los ojos del todo, la ventana —que él estaba segurísimo de haber dejado bien cerrada — se abrió de golpe con un crujido largo. ",
      "Y entonces entró el mar.",
      "Una ola fresca y salada irrumpió en la habitación con un ¡FUSHHH! que cubrió la alfombra y trepó por las patas de la cama y salpicó todo a su alrededor. El agua estaba tan fría que le mordió los pies como si hubiera pisado nieve.",
      "Barbazul dio un respingo, se sentó de golpe en la cama y se quedó sin aliento al ver una pequeña barca granate deslizándose hacia él, como cuando un lugar tranquilo decide convertirse, de golpe, en un muelle secreto en plena noche.",
      " En la proa estaba el loro azul y amarillo de la jaula roja, sacudiendo sus alas.",
      " — ¡Botón! ¡Chico del botón! —graznó."
    ],
    image: "assets/images/imagen07.png",
    audio: "assets/audio/p07.mp3"
  },

  p8: {
    type: "scene",
    id: "p8",
    title: "Presentación de Rumbo",
    text: [
      "Detrás, remando con una tranquilidad casi insultante para el caos del dormitorio, apareció un pirata joven de piel morena, chaleco color arena y pantalones bombachos, que goteaban agua como si la barca hubiera viajado entre nubes mojadas.",
      "—¡Rumbo, al habla! —saludó con una sonrisa enorme—. ¡Llegamos justo a tiempo, muchacho!",
      "Barbazul parpadeó varias veces, como si su cerebro necesitara ponerse al día con sus ojos. Pero ahí estaban: el agua helada, el loro de la jaula roja y un pirata con una barca remando en su habitación como si fuera lo más normal del mundo. —¿Qué… qué hacéis aquí? — balbuceó.",
      "Rumbo clavó el remo en el agua del suelo y se formaron pequeñas ondulaciones a su alrededor. —Necesitamos tu ayuda —dijo—. Y la del botón. Sobre todo la del botón.",
      "Pipas asintió enérgicamente. —¡Botón capitán! ¡Falta botón! ¡Muy mal!"
    ],
    image: "assets/images/imagen08.png",
    audio: "assets/audio/p08.mp3"
  },

  p9: {
    type: "scene",
    id: "p9",
    title: "Explicación de lo sucedido",
    text: [
      "La barca se balanceó suavemente, como si la habitación contuviera la respiración. Barbazul notó que su corazón se aceleraba.",
      "—Verás, chico… —empezó Rumbo, esta vez más serio—. Nuestro capitán está en mitad de la Gran Batalla de Altamar, la que decide quién manda en todos los mares, los reales y los que solo existen si los imaginas muy fuerte. Pero tenemos un problema.",
      "Juntó los dedos, señalando algo diminuto.",
      "—El capitán no puede pelear si no lleva la chaqueta impecable. Son las normas. Y le falta un botón. Tu botón.",
      "Barbazul sintió el estómago encogerse.",
      "—¿El mío? ¡Si solo lo encontré en la calle!",
      "Rumbo chasqueó la lengua —Antes de que sigamos, respira hondo, Barbazul —añadió el pirata con una sonrisa ladeada—. Sé que esto es mucho de golpe.",
      "—Pero el malvado Corsario le arrancó el botón y lo lanzó fuera de Altamar usando magia negra. Muy feo. Nada elegante.",
      "Pipas infló las plumas.",
      "—¡Corsario feo! ¡Truco feo!",
      "Rumbo asintió.",
      "—Exacto. Y sin su botón, nuestro capitán está perdiendo. El amanecer está cerca, y cuando salga el sol… será el final de la Gran Batalla y se decidirá el vencedor."
    ],
    image: "assets/images/imagen09.png",
    audio: "assets/audio/p09.mp3"
  },

  p10: {
    type: "scene",
    id: "p10",
    title: "Barbazul sube a la barca",
    text: [
      "Barbazul tragó saliva.",
      "—¿Y cómo sabíais que yo lo tenía?",
      "Rumbo señaló a Pipas.",
      "—Nuestro loro voló tras el rastro del botón cuando cruzó hasta tu mundo. Pero los habitantes de Altamar no podemos tocar nada de nuestro mundo si no ha viajado con nosotros. Si lo intentamos… — hizo una mueca— bueno, imagínate un globo explotando. No es bonito.",
      "Pipas bajó las alas.",
      "—Pipas mirar solo. No coger. Esperar mucho…",
      "Rumbo le dio un golpecito cariñoso.",
      "—Ha pasado casi una semana en tu mundo desde que cayó el botón. Para nosotros solo ha sido menos de un día. El pobre Pipas llevaba todo ese tiempo vigilándolo como un faro azul perdido en el cielo.",
      "Pipas infló el pecho.",
      "—¡Pipas valiente!",
      "—Muy valiente —confirmó Rumbo—. Y por eso pudimos encontrarte.",
      "Barbazul miró la barca, el agua brillando con luz de luna, y la ventana abierta a un cielo oscuro que ya no sabía si era cielo o mar suspendido. Todo parecía estar unido por un mismo hilo brillante.",
      "—Entonces… ¿queréis que vaya con vosotros?",
      "Rumbo abrió los brazos con efusividad.",
      "—¡Claro! ¿Qué héroe encuentra el botón del capitán y se queda en casa?",
      "Pipas levantó las alas.",
      "—¡Aventura! ¡A remar!"
    ],
    image: "assets/images/imagen10.png",
    audio: "assets/audio/p10.mp3"
  },

  p11: {
    type: "scene",
    id: "p11",
    title: "Camino a Altamar",
    text: [
      "Barbazul no dudó. Se acercó a la estantería, abrió su cajita de tesoros y cogió el botón. Estaba tan frío que parecía guardar un pedacito de noche dentro.",
      "Saltó a la barquita, dejando atrás las sábanas mojadas. Milagrosamente no volcó.",
      "—Sujétate bien —dijo Rumbo—. Altamar no espera.",
      "Con un fuerte empujón, la barca salió por la ventana.",
      "La habitación desapareció detrás y, frente a ellos, un mar oscuro flotaba en el aire, iluminado por la luna y estrellas que parecían parpadear para guiarlos.",
      "El olor a mar, esta vez sí, lo envolvió del todo.",
      "—¿Listo, pequeño? —preguntó Rumbo.",
      "Barbazul sonrió, nervioso y feliz.",
      "—¡Listo!",
      "Y así comenzó su travesía hacia Altamar."
    ],
    image: "assets/images/imagen11.png",
    audio: "assets/audio/p11.mp3"
  },

  p12: {
    type: "scene",
    id: "p12",
    title: "El bergantín",
    text: [
      "El bergantín del Capitán emergió entre la ligera niebla de Altamar como una montaña de madera azulada. Las velas ondeaban tensas, iluminadas por la luna, y el aire olía a sal, pólvora y algo más… algo antiguo, como si el tiempo llevara mucho rato conteniendo el aliento.",
      "En cuanto la barca se acercó, voces, pasos y chasquidos de cuerdas rodearon a Barbazul. Altamar se movía como un animal gigantesco que dormita y abre un ojo: gritos de piratas, chillidos de monos, crujidos de madera. Todo parecía vivo, como si el barco entero lo estuviera observando.",
      "Barbazul subió a bordo detrás de Rumbo, con el botón apretado en su mano.",
      "A su alrededor, los monos tití corrían de un lado a otro con chalecos, fajas o gorritos impecables. Algunos llevaban agujas enormes para remendarse la ropa; otros saltaban entre cuerdas como si la gravedad fuera un juego que conocían de memoria."
    ],
    image: "assets/images/imagen12.png",
    audio: "assets/audio/p12.mp3"
  },

  p13: {
    type: "scene",
    id: "p13",
    title: "El Capitán",
    text: [
      "En medio del ajetreo, el Capitán los esperaba. Era enorme, con su chaqueta de terciopelo azul oscuro abierta, mostrando el hueco perfecto donde faltaba el botón.",
      "—Así que tú eres el chico que lo encontró —dijo con voz grave.",
      "Pipas se posó en su hombro.",
      "—¡Botón del capitán! ¡Botón vuelve! —chilló.",
      "El Capitán suspiró.",
      "—Ojalá fuera tan fácil, Pipas. La Gran Batalla termina al amanecer y queda poco tiempo.",
      "Rumbo intervino mientras se secaba la frente.",
      "—Y sin el botón, capitán, usted no puede pelear. Son las reglas. Ya se lo he explicado al chico.",
      "El Capitán asintió.",
      "—El Corsario me lo arrancó. Y con magia negra lo lanzó fuera de Altamar. Hará cualquier cosa por ganar.",
      "Solo al mencionarlo, Barbazul sintió un escalofrío.",
      "—¿Quién es el Corsario? —preguntó."
    ],
    image: "assets/images/imagen13.png",
    audio: "assets/audio/p13.mp3"
  },

  p14: {
    type: "scene",
    id: "p14",
    title: "El Corsario",
    text: [
      "Rumbo señaló hacia la distancia. La galera granate del Corsario avanzaba por el cielo como un tiburón oscuro. Sobre la cubierta, la figura altísima del Corsario daba órdenes. Sobre su máscara de madera se generaban sombras terribles… pero también destellos que parecían cambiar con sus emociones, como si la propia madera estuviera viva y escuchando.",
      "—Va ganando —susurró Rumbo—. Y no piensa bajar el ritmo.",
      "Como si lo escuchara, el Corsario giró la cabeza en dirección al bergantín. Incluso desde lejos, Barbazul sintió que la mirada tras la máscara le atravesaba como el hielo."
    ],
    image: "assets/images/imagen14.png",
    audio: "assets/audio/p14.mp3"
  },

  p15: {
    type: "scene",
    id: "p15",
    title: "La amenaza del mundo bocabajo",
    text: [
      "El Capitán apoyó una mano pesada sobre la cabeza del niño.",
      "—Pequeño, sé que encontraste ese botón por casualidad. Sé que ahora es tu tesoro. Pero si no me lo devuelves…",
      "Rumbo lo interrumpió con gesto urgente.",
      "—Si él gana, quiere darle la vuelta al mundo. ¡Que vivamos bocabajo y que llueva hacia arriba! ¡Que los mares se caigan en cascadas infinitas! Al principio nadie se daría cuenta, pero, cuando alguien notase que todo estaba del revés… perderá la estabilidad y se caerá hacia las nubes.",
      "Pipas agitó las alas.",
      "—¡Mucho mareo! ¡Muy mal!"
    ],
    image: "assets/images/imagen15.png",
    audio: "assets/audio/p15.mp3"
  },

  p16: {
    type: "choice",
    id: "p16",
    title: "La decisión",
    text: [
      "Barbazul apretó el botón. Seguía helado. —Es que… me gusta mucho —confesó—. Quería quedármelo.",
      "El amanecer empezaba a pintar el borde del cielo de un azul más claro.",
      "El tiempo se estaba acabando.",
      "Por un instante, Barbazul sintió cómo todo el ruido del barco se hacía más pequeño, como cuando Altamar parece contener la respiración antes de su decisión."
    ],
    image: "assets/images/imagen16.png",
    audio: "assets/audio/p16.mp3"
  },

  // Final alternativo A
  p17A: { type:"scene", id:"p17A", title:"Barbazul no entrega el botón",
    text: [
      "Barbazul bajó la mirada. El silencio cayó sobre la cubierta como una manta pesada. No podía hacerlo. No podía entregar su tesoro.",
      "—Lo siento… de verdad lo siento.",
      "El capitán cerró los ojos con pesar.",
      "—Entonces la batalla está perdida."
    ],
    image:"assets/images/imagen17a.png", 
    audio:"assets/audio/p17a.mp3"
  },
 
  p18A: { type:"scene", id:"p18A", title:"El ataque",
    text: [
      "Un estruendo recorrió Altamar. La galera del Corsario avanzó como si respondiera a un gesto invisible. En lo alto de la cubierta, la figura del Corsario alzó un brazo delgadísimo, y a sus órdenes la niebla se volvió espesa y pesada.",
      "La galera lanzó su ataque definitivo, aprovechando la densidad de la niebla y el cielo se abrió como cuando el mundo decide darse la vuelta entera."
    ],
    image:"assets/images/imagen18a.png", 
    audio:"assets/audio/p18a.mp3"
  },

  p19A: { type:"scene", id:"p19A", title:"Despertar bocabajo",
    text: [
      "Barbazul sintió un zarpazo de viento. Todo giró.",
      "Abrió los ojos.",
      "Estaba en su cama.",
      "Pero no como siempre.",
      "Las sábanas colgaban hacia el techo.",
      "El techo era el suelo.",
      "El mundo estaba bocabajo.",
      "Barbazul se agarró como pudo, con miedo de caerse hacia arriba. Miró por la ventana: fuera, una red gigante sostenía a varias personas que flotaban como globos asustados. Las gotas de lluvia ascendían hacia el cielo como pequeñas luciérnagas desordenadas."
    ],
    image:"assets/images/imagen19a.png", 
    audio:"assets/audio/p19a.mp3"
  },

  p20A: { type:"scene", id:"p20A", title:"Arrepentimiento",
    text: [
      "En su mano seguía el botón.",
      "Pero los dedos le temblaban tanto que se le escapó.",
      "El botón chocó contra el techo —ahora suelo— con un CLANC que resonó por toda la habitación.",
      "Barbazul cerró los ojos.",
      "Y entonces lo entendió. Había sido egoísta. Había pensado solo en lo que él quería. Y ahora el mundo estaba del revés por su culpa.",
      "—Yo… creo que he hecho algo muy, muy mal… —susurró."
    ],
    image:"assets/images/imagen20a.png", 
    audio:"assets/audio/p20a.mp3"
  },

  p21A: { type:"alt_end", id:"p21A", title:"Reversión del mundo",
    text: [
      "Una oleada de tristeza y arrepentimiento le subió por el pecho.",
      "—Ojalá pudiera volver atrás…",
      "Y entonces, como si el mundo respirara hondo…",
      "todo se plegó. todo se desdobló. todo se recompuso.",
      "Sintió, muy hondo, que el mundo le ofrecía una nueva oportunidad.",
      "De pronto estaba otra vez en la cubierta del bergantín."
    ],
    image:"assets/images/imagen21a.png", 
    audio:"assets/audio/p21a.mp3", 
    ctaLabel: "Otra oportunidad", 
    ctaTo: "p17B"
  },

  // Final principal B
  p17B: { type:"scene", id:"p17B", title:"Entrega del botón",
    text: [
      "El amanecer seguía acercándose. Rumbo, Pipas y el Capitán lo miraban, esperando. El botón seguía frío en su mano. Era el momento.",
      "Esta vez no dudó.",
      "—Capitán… toma. Es tuyo.",
      "Extendió la mano.",
      "El botón brilló con un destello limpio, como una estrella cayendo en el agua.",
      "Al tocar la chaqueta del Capitán, se cosió solo con un clic perfecto.",
      "—¡Impecable! —gritó Rumbo.",
      "—¡Capitán completo! —celebró Pipas."
    ],
    image:"assets/images/imagen17b.png", 
    audio:"assets/audio/p17b.mp3"
  },

  p18B: { type:"scene", id:"p18B", title:"La batalla",
    text: [
      "El Capitán avanzó hacia la proa.",
      "—¡A las velas! ¡A la batalla! —rugió.",
      "Los monos tití saltaron, los piratas prepararon sus armas y el bergantín cargó contra la galera del Corsario. El choque fue como dos olas encontrándose.",
      "Durante un instante, la figura del Corsario se alzó entre la niebla. Su máscara de madera giró hacia Barbazul y, como si fuera mágica, dejó ver un destello de sorpresa: las grietas se tensaron, los ojos vacíos se estrecharon levemente, casi heridos en su orgullo.",
      "Finalmente, el Corsario retrocedió. Su chaqueta impecable tembló al viento y huyó en una barquita demasiado pequeña para alguien tan imponente.",
      ""
    ],
    image:"assets/images/imagen18b.png",
    audio:"assets/audio/p18b.mp3"
  },

  p19B: { type:"scene", id:"p19B", title:"Celebración",
    text: [
      "El cielo se encendió en tonos rosados. Altamar celebraba.",
      "Rumbo levantó a Barbazul en hombros.",
      "—¡El héroe del botón! —gritó.",
      "Pipas revoloteó a su alrededor.",
      "—¡Amigo Barbazul! ¡Amigo bueno!",
      "En medio de las risas, Barbazul sintió un cosquilleo cálido en el pecho, como si algo dentro de él supiera que había elegido bien.",
      "El Capitán sonrió con orgullo, Rumbo le dio un golpecito cariñoso en el hombro, como solo hacen los piratas cuando están muy, muy orgullosos. Y Pipas le rozó la mejilla con una pluma suave."
    ],
    image:"assets/images/imagen19b.png", 
    audio:"assets/audio/p19b.mp3"
  },

  p20B: { type:"scene", id:"p20B", title:"Despertar",
    text: [
      "Parpadeó…",
      "y despertó.",
      "Estaba en su cama. La ventana seguía abierta. El suelo, húmedo. Los objetos de su habitación, movidos de sitio como si una ola hubiera pasado por allí.",
      "Por un segundo, casi pudo oír risas de monos a lo lejos."
    ],
    image:"assets/images/imagen20b.png", 
    audio:"assets/audio/p20b.mp3"
  },

  p21B: { type:"main_end", id:"p21B", title:"La pluma azul",
    text: [
      "La cajita estaba abierta y el botón no estaba.",
      "En su lugar, flotaba una pluma azul.",
      "Brillaba suavemente, como si acabara de cruzar dos mundos para despedirse.",
      "Barbazul la tomó con cuidado y sonrió sin darse cuenta. No sabía si lo que había vivido había sido un sueño… pero algo en su pecho le dijo que, cuando eres generoso, el mundo —sea real o imaginado— siempre se endereza un poco.`,"
    ],
    image:"assets/images/imagen21b.png", 
    audio:"assets/audio/p21b.mp3"
  },
};

// ----- ESTADO -----
let currentRoute = ROUTE_MAIN;
let currentIndex = 0;

function currentId() { return currentRoute[currentIndex]; }

// Ir a un id (cambia de ruta si hace falta)
function goToId(id) {
  if (!id) return;

  let idx = currentRoute.indexOf(id);
  if (idx !== -1) { currentIndex = idx; renderCurrent(); return; }

  if (ROUTE_MAIN.includes(id)) { currentRoute = ROUTE_MAIN; currentIndex = currentRoute.indexOf(id); renderCurrent(); return; }
  if (ROUTE_A.includes(id)) { currentRoute = ROUTE_A; currentIndex = currentRoute.indexOf(id); renderCurrent(); return; }
  if (ROUTE_B.includes(id)) { currentRoute = ROUTE_B; currentIndex = currentRoute.indexOf(id); renderCurrent(); return; }
}

// texto a párrafo
function renderText(text) {
  if (!text) return "";

  // Si ya es array → varios párrafos
  if (Array.isArray(text)) {
    return text.map(p => `<p>${p}</p>`).join("");
  }

  // Si es string → un solo párrafo (compatibilidad)
  return `<p>${text}</p>`;
}

// ----- Imagen: portrait / landscape -----
function applyImageOrientation(containerSelector = ".image-container") {
  const container = app.querySelector(containerSelector);
  const img = container?.querySelector("img");
  if (!container || !img) return;

  const update = () => {
    container.classList.remove("is-portrait", "is-landscape");
    if (img.naturalHeight > img.naturalWidth) container.classList.add("is-portrait");
    else container.classList.add("is-landscape");
  };

  if (img.complete && img.naturalWidth > 0) update();
  else img.addEventListener("load", update, { once: true });
}

// ----- Audio -----
function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function stopAudio() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playPause");
  if (audio) { audio.pause(); audio.currentTime = 0; }
  if (playBtn) playBtn.textContent = "▶";
}

function audioPlayerHTML(node) {
  return `
    <div class="audio-player" aria-label="Audio de la escena">
      <span id="timeCurrent">0:00</span>
      <input id="progress" type="range" min="0" value="0" aria-label="Progreso del audio" />
      <span id="timeTotal">0:00</span>
      <button id="playPause" class="play" aria-label="Reproducir narración">▶</button>
    </div>
    <audio id="audio" src="${node.audio || ""}"></audio>
  `;
}

function initAudioPlayer() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playPause");
  const progress = document.getElementById("progress");
  const timeCurrent = document.getElementById("timeCurrent");
  const timeTotal = document.getElementById("timeTotal");

  if (!audio || !audio.getAttribute("src")) {
    if (playBtn) playBtn.disabled = true;
    if (progress) progress.disabled = true;
    if (timeCurrent) timeCurrent.textContent = "0:00";
    if (timeTotal) timeTotal.textContent = "0:00";
    return;
  }

  playBtn.textContent = "▶";
  playBtn.disabled = false;
  progress.disabled = false;
  progress.value = 0;
  timeCurrent.textContent = "0:00";
  timeTotal.textContent = "0:00";

  audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration || 0);
    timeTotal.textContent = formatTime(audio.duration || 0);
  });

  audio.addEventListener("timeupdate", () => {
    progress.value = Math.floor(audio.currentTime || 0);
    timeCurrent.textContent = formatTime(audio.currentTime || 0);
  });

  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) { audio.play(); playBtn.textContent = "⏸"; }
    else { audio.pause(); playBtn.textContent = "▶"; }
  });

  progress.addEventListener("input", () => {
    audio.currentTime = Number(progress.value || 0);
  });
}

// ----- Navegación -----
function goNext() {
  stopAudio();
  if (currentIndex < currentRoute.length - 1) {
    currentIndex++;
    renderCurrent();
  }
}
function goPrev() {
  stopAudio();
  if (currentIndex > 0) {
    currentIndex--;
    renderCurrent();
  }
}

// ----- Render dispatcher -----
function renderCurrent() {
  const id = currentId();

  // Para no duplicar el h1 en portada
  document.body.classList.toggle("is-cover", id === "cover");

  const node = PAGES[id];
  if (!node) {
    app.innerHTML = `<section class="screen">${storyTitleHTML()}<p>Error: página no encontrada (${id})</p></section>`;
    return;
  }

  if (node.type === "cover") return renderCover(node);
  if (node.type === "choice") return renderChoice(node);
  if (node.type === "alt_end") return renderAltEnd(node);
  if (node.type === "main_end") return renderMainEnd(node);
  return renderScene(node);
}

// ----- Portada (SIN botón “Continuar”) -----
function renderCover(node) {
  app.innerHTML = `
  <section class="screen screen-cover">
    <h2 class="cover-title">${node.title}</h2>

    ${node.description ? `<p class="cover-desc anim-fade-up">${node.description}</p>` : ""}

    <div class="media">
      <div class="media-inner">
        ${
          node.video
            ? `<video src="${node.video}" controls playsinline preload="metadata" loop></video>`
            : `<img alt="Portada del cuento" src="${node.image || ""}" />`
        }
      </div>
    </div>

    <div class="actions">
      <button class="btn-primary" id="btnStart">Empezar</button>
    </div>
  </section>
`;

  document.getElementById("btnStart").addEventListener("click", () => {
    currentRoute = ROUTE_MAIN;
    currentIndex = currentRoute.indexOf("p1");
    renderCurrent();
  });
}

// ----- Escena normal -----
function renderScene(node) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === currentRoute.length - 1;

  app.innerHTML = `
    <section class="screen">
    ${storyTitleHTML()}
      <div class="card">
        <h2 class="scene-title anim-soft-scale">${node.title}</h2>

        <div class="layout">
          <div class="image-frame">
            <div class="image-container">
              <img src="${node.image || ""}" alt="Ilustración de la escena" />
            </div>

            <div class="image-audio">
              ${audioPlayerHTML(node)}
            </div>

            <div class="nav-bar" aria-label="Navegación de página">
              <button class="nav-btn" id="prevBtn" ${isFirst ? "disabled" : ""} aria-label="Página anterior">← Anterior</button>
              <button class="nav-btn" id="nextBtn" ${isLast ? "disabled" : ""} aria-label="Siguiente página">Siguiente →</button>
            </div>
          </div>

          <aside class="content">
            ${renderText(node.text)}
            ${pageIndicatorHTML()}
          </aside>
        </div>
      </div>
    </section>
  `;

  document.getElementById("prevBtn").addEventListener("click", goPrev);
  document.getElementById("nextBtn").addEventListener("click", goNext);

  applyImageOrientation();
  initAudioPlayer();
}

// ----- Decisión (p16) -----
function renderChoice(node) {
  const canPrev = currentIndex > 0;

  app.innerHTML = `
    <section class="screen">
    ${storyTitleHTML()}
      <div class="card">
        <h2 class="scene-title anim-soft-scale">${node.title}</h2>

        <div class="layout">
          <div class="image-frame">
            <div class="image-container">
              <img src="${node.image || ""}" alt="Ilustración de la decisión" />
            </div>

            <div class="image-audio">
              ${audioPlayerHTML(node)}
            </div>

            <div class="nav-bar">
              <button class="nav-btn" id="prevBtn" ${canPrev ? "" : "disabled"} aria-label="Página anterior">← Anterior</button>
              <button class="nav-btn" disabled aria-label="Siguiente página">Siguiente →</button>
            </div>
          </div>

          <aside class="content">
            ${renderText(node.text)}

            <div class="choices" role="group" aria-label="Opciones de final">
              <button class="choice" id="optA">No le da el botón</button>
              <button class="choice" id="optB">Le da el botón</button>
            </div>

            ${pageIndicatorHTML()}
          </aside>
        </div>
      </div>
    </section>
  `;

  document.getElementById("prevBtn").addEventListener("click", goPrev);

  document.getElementById("optA").addEventListener("click", () => {
    stopAudio();
    currentRoute = ROUTE_A;
    currentIndex = 0;
    renderCurrent();
  });

  document.getElementById("optB").addEventListener("click", () => {
    stopAudio();
    currentRoute = ROUTE_B;
    currentIndex = 0;
    renderCurrent();
  });

  applyImageOrientation();
  initAudioPlayer();
}

// ----- Fin alternativo (21A) -----
function renderAltEnd(node) {
  const canPrev = currentIndex > 0;

  app.innerHTML = `
    <section class="screen">
    ${storyTitleHTML()}
      <div class="card">
        <h2 class="scene-title anim-soft-scale">${node.title}</h2>

        <div class="layout">
          <div class="image-frame">
            <div class="image-container">
              <img src="${node.image || ""}" alt="Ilustración del final alternativo" />
            </div>

            <div class="image-audio">
              ${audioPlayerHTML(node)}
            </div>

            <div class="nav-bar">
              <button class="nav-btn" id="prevBtn" ${canPrev ? "" : "disabled"} aria-label="Página anterior">
                ← Anterior
              </button>

              <button class="nav-btn nav-btn-secondary" id="altNextBtn" aria-label="Otra oportunidad">
                Otra oportunidad →
              </button>
            </div>
          </div>

          <aside class="content">
            ${renderText(node.text)}
            ${pageIndicatorHTML()}
          </aside>
        </div>
      </div>
    </section>
  `;

  document.getElementById("prevBtn").addEventListener("click", goPrev);

  document.getElementById("altNextBtn").addEventListener("click", () => {
    stopAudio();
    goToId("p17B");
  });

  applyImageOrientation();
  initAudioPlayer();
}

// ----- Fin principal (21B) -----
function renderMainEnd(node) {
  const canPrev = currentIndex > 0;

  app.innerHTML = `
    <section class="screen">
    ${storyTitleHTML()}
      <div class="card">
        <h2 class="scene-title">${node.title}</h2>

        <div class="layout">
          <div class="image-frame">
            <div class="image-container">
              <img src="${node.image || ""}" alt="Ilustración del final" />
            </div>

            <div class="image-audio">
              ${audioPlayerHTML(node)}
            </div>

            <div class="nav-bar">
              <button class="nav-btn" id="prevBtn" ${canPrev ? "" : "disabled"} aria-label="Página anterior">
                ← Anterior
              </button>

              <button class="nav-btn nav-btn-secondary" id="toCoverBtn" aria-label="Volver al inicio">
                Volver al inicio →
              </button>
            </div>
          </div>

          <aside class="content">
            ${renderText(node.text)}
            <div class="story-end">Fin</div>

            ${pageIndicatorHTML()}
          </aside>
        </div>
      </div>
    </section>
  `;

  document.getElementById("prevBtn").addEventListener("click", goPrev);

  document.getElementById("toCoverBtn").addEventListener("click", () => {
    stopAudio();
    currentRoute = ROUTE_MAIN;
    currentIndex = 0; // cover
    renderCurrent();
  });

  applyImageOrientation();
  initAudioPlayer();
}

// ----- Teclado -----
window.addEventListener("keydown", (e) => {
  const node = PAGES[currentId()];
  if (e.key === "ArrowLeft") goPrev();
  if (e.key === "ArrowRight") {
    if (node?.type !== "choice" && node?.type !== "alt_end" && node?.type !== "main_end") goNext();
  }
});

// ----- Menú actions -----
menuBookmark?.addEventListener("click", () => {
  const b = getBookmark();
  if (!b) {
    updateMenuHint();
    showToast("No hay marcapáginas guardado.");
    closeMenu();
    return;
  }
  closeMenu();
  stopAudio();
  goToId(b.id);
});

menuSave?.addEventListener("click", () => {
  const id = currentId();
  if (id === "cover") {
    updateMenuHint();
    showToast("No se puede guardar la portada.");
    closeMenu();
    return;
  }

  const page = PAGES[id];
  const title = page?.title || id;

  setBookmark(id, title);
  updateMenuHint();
  showToast(`Has guardado: ${title}`);
  closeMenu();
});

menuClear?.addEventListener("click", () => {
  const b = getBookmark();
  clearBookmark();
  updateMenuHint();
  closeMenu();
  showToast(b ? "Marcapáginas eliminado" : "No había marcapáginas guardado");
});


// ===== Desktop nav actions (dejar al final) =====
(function initDesktopNav(){
  const navBookmark = document.getElementById("navBookmark");
  const navSave = document.getElementById("navSave");
  const navClear = document.getElementById("navClear");

  // Si no existe el nav (móvil), no hacemos nada
  if (!navBookmark && !navSave && !navClear) return;

  navBookmark?.addEventListener("click", () => {
    const b = getBookmark();
    if (!b) { showToast("No hay marcapáginas guardado."); return; }
    stopAudio();
    goToId(b.id);
  });

  navSave?.addEventListener("click", () => {
    const id = currentId();
    if (id === "cover") { showToast("No se puede guardar la portada."); return; }
    const page = PAGES[id];
    const title = page?.title || id;

    setBookmark(id, title);
    updateMenuHint();
    showToast(`Has guardado: ${title}`);
  });

  navClear?.addEventListener("click", () => {
    const b = getBookmark();
    clearBookmark();
    updateMenuHint();
    showToast(b ? "Marcapáginas eliminado" : "No había marcapáginas guardado");
  });
})();


// ----- Home icon -----
const homeLink = document.getElementById("homeLink");

homeLink.addEventListener("click", () => {
  stopAudio();
  currentRoute = ROUTE_MAIN;
  currentIndex = 0; // cover
  renderCurrent();
});


// Init
renderCurrent();
