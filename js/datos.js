// ============================================================
//  ✏️  ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR
//  Cambia textos, fotos, fechas y lugares aquí.
//  (Respeta las comillas y las comas al final de cada línea)
// ============================================================

export const DATOS = {
  nombres: {
    el: "Daniel",
    ella: "Dulce",
    elCompleto: "Daniel González Ruiz",
    ellaCompleto: "Dulce Paola Aguillón Hernández",
  },

  // Fecha en que se conocieron (AAAA-MM-DD)
  fechaConocimos: "2026-08-17",

  // Cumpleaños de Dulce: ese día la web muestra la sorpresa 🎂
  // Para probarla cualquier otro día abre la web con  ?cumple  al final de la URL
  cumpleElla: { mes: 10, dia: 15 },

  // ---------- TRIVIA DE ENTRADA (en lugar de contraseña) ----------
  // Para entrar, ella tiene que completar las frases una por una.
  // En "frase" pon ___ donde va la palabra que falta.
  // En "respuestas" pon todas las formas válidas (no importan mayúsculas ni acentos).
  // "pista" aparece si se equivoca o si toca el botón de pista.
  trivia: {
    titulo: "Solo para nosotros",
    intro: "Antes de entrar, demuéstrame que eres tú: completa nuestras frases 💭",
    preguntas: [
      {
        frase: "Todo empezó porque me metí a los comentarios de un ___",
        respuestas: ["tiktok", "tik tok"],
        pista: "Una app de videos 📱",
      },
      {
        frase: "En Pachuquilla te perdoné (entre comillas) por andar viendo los ojos de un ___ 😒",
        respuestas: ["mesero", "mesero guapo"],
        pista: "Trabaja en un restaurante y no soy yo 🍽️",
      },
      {
        frase: "Nos vimos por primera vez en el ___ de Pachuca",
        respuestas: ["reloj", "reloj monumental"],
        pista: "Hace tic tac 🕰️",
      },
      {
        frase: "Aquel chico te quería regalar un ___ (y yo insistía en que lo aceptaras 😏)",
        respuestas: ["peluche", "peluchito", "muñeco"],
        pista: "Es suavecito 🧸",
      },
      {
        frase: "En Tecolutla me quedé con ganas de más tacos de ___",
        respuestas: ["cueritos", "cuerito"],
        pista: "Y de un pulque también 🌮",
      },
      {
        frase: "Nuestro viaje a la playa fue a ___, Veracruz",
        respuestas: ["tecolutla"],
        pista: "Empieza con T 🏖️",
      },
      {
        frase: "Te volviste mi novia el ___ de septiembre",
        respuestas: ["29", "veintinueve"],
        pista: "Un día antes del 30 💍",
      },
    ],
    errores: [
      "¿Cómo que no te acuerdas, mugrosa? 😤",
      "Mmm… esa no es 💭",
      "Casi, casi… inténtalo otra vez 🙈",
      "Me vas a hacer llorar 🥲",
    ],
    final: "¡Sí eres tú, mi niña bonita! 💖",
  },

  // ---------- SORPRESA DE CUMPLEAÑOS ----------
  cumple: {
    intro: [
      "Hoy es un día muy especial…",
      "porque un 15 de octubre llegó al mundo",
      "la persona que hace brillar mis días.",
    ],
    titulo: "¡Feliz cumpleaños, Dulce Paola!",
    mensaje:
      "Es el primer cumpleaños tuyo que me toca vivir a tu lado, y no lo iba a vivir lejos: hice el viaje para estar aquí contigo, porque viajaría las veces que hicieran falta solo por verte sonreír. Y además quería regalarte algo que se quedara para siempre: este pequeño rincón del internet que es solo nuestro. Gracias por existir, por tu sonrisa y por dejarme ser parte de tu historia. Te amo demasiado, mi niña bonita. — Daniel",
  },

  // ---------- NUESTRA HISTORIA (línea de tiempo) ----------
  historia: [
    {
      fecha: "Antes de conocernos",
      titulo: "Un comentario en TikTok",
      texto:
        "Todo empezó por casualidad: me metí a los comentarios de un TikTok y terminé en un grupo de WhatsApp. Quién me iba a decir que ahí estaba la persona más espectacular que he conocido. Por mensaje eras de lo más extrovertida… y yo todavía no sabía lo que me esperaba.",
      icono: "📱",
    },
    {
      fecha: "17 de agosto de 2026",
      titulo: "El día que nos conocimos",
      texto:
        "Fue en una salida de amigos, en el Reloj de Pachuca. En cuanto te vi pensé: qué guapa es. En persona eras tímida, y aunque había más gente, mi atención era solo tuya. Cuando aquel chico te quiso ligar y regalarte un peluche, yo me di cuenta de que no le hacías caso… y me dio por molestarte, insistiéndote en que lo aceptaras. Nunca imaginé que yo, el bajito, le iba a gustar a la chica alta y bonita. Pero gracias a Dios, sí.",
      icono: "🕰️",
    },
    {
      fecha: "19 de agosto de 2026",
      titulo: "Nuestra primera cita",
      texto:
        "Fuimos a un bar. Yo casi no tomo, pero me pareció buena idea… y lo fue, aunque no por las bebidas: pasamos horas platicando. Ahí descubrí algo que sigue siendo verdad: contigo nunca me aburro.",
      icono: "🍹",
    },
    {
      fecha: "22 de agosto de 2026",
      titulo: "Real del Monte",
      texto:
        "Una salida bonita de verdad. Confieso que por un momento se me bajaron los ánimos porque pensé que no querías tomar mi mano. Yo era de fuera y estaba solo en Pachuca, y tú me ayudaste a conocer lugares nuevos y a sentirme menos solo. No sabes cuánto te lo agradezco.",
      icono: "⛰️",
    },
    {
      fecha: "Después",
      titulo: "Los primeros besos",
      texto:
        "Los primeros fueron un poquito raros (hay que admitirlo), pero los siguientes… los disfruté cada segundo.",
      icono: "💋",
    },
    {
      fecha: "Siempre",
      titulo: "Definitivamente estamos salados",
      texto:
        "Los meseros, las caídas, las cosas que solo nos pasan a nosotros. Cada desastre se volvió un recuerdo que me saca una sonrisa. Llevamos poco tiempo, pero siento que te conozco desde hace muchísimo más.",
      icono: "😂",
    },
    {
      fecha: "Tecolutla, Veracruz",
      titulo: "Nuestro viaje a la playa",
      texto:
        "Fue una locura, y no me arrepiento ni tantito. Gracias por llevarme. Mi momento favorito: esa tarde en la playa, jugando y platicando. Hacía un calor horrible, pero créeme que eso pasó a segundo plano; yo estaba muy a gusto contigo. Eso sí, me quedé con la espinita de comer más tacos de cueritos y tomarme un pulque… aunque a ninguno de los dos nos gustan 😂",
      icono: "🏖️",
    },
    {
      fecha: "5 de septiembre de 2026",
      titulo: "Gracias por tomarme en cuenta",
      texto:
        "Me dejaste pasar mi cumpleaños contigo, y eso significó muchísimo para mí.",
      icono: "🎁",
    },
    {
      fecha: "6 de septiembre de 2026",
      titulo: "La noche que mejor ni recordamos",
      texto:
        "Me da vergüenza que me hayas visto un poquito pasadito de copas (y lo que vino después, mejor ni lo cuento 🙈). Pero qué noche tan divertida, sobre todo por la pelea de la gente al final.",
      icono: "🥴",
    },
    {
      fecha: "15 de septiembre de 2026",
      titulo: "El Grito en Plaza Juárez",
      texto:
        "Fue muy especial. Me encantaba que me estuvieras abrazando, y cuando se te salieron unas lagrimitas, me confirmaste que de verdad me quieres. Nunca se me va a olvidar.",
      icono: "🇲🇽",
    },
    {
      fecha: "Esa misma noche",
      titulo: "Vueltas por Pachuquilla",
      texto:
        "Después nos fuimos a Pachuquilla a dar vueltas. Y aunque andabas viendo los ojos de un mesero… te perdono (entre comillas 😒😂). Fue una noche muy bonita, solo porque fue contigo.",
      icono: "🌃",
    },
    {
      fecha: "29 de septiembre de 2026",
      titulo: "El día que te volviste mi novia",
      texto:
        "Te lo pedí por chat (muy a nuestro estilo, como empezó todo) y me dijiste que sí. Desde ese día tengo el honor de decir que eres mi novia.",
      icono: "💍",
    },
    {
      fecha: "Un día que no olvido",
      titulo: "Tus rosas y tu carta",
      texto:
        "Me dio penita que me vieras llegar con las rosas, y yo ni sabía dónde estabas. Y la carta… también me dio pena. Hacía mucho tiempo (por no decir nunca) que no hacía algo así, pero contigo no sé qué me pasa: simplemente me nace ser así. Ojalá te hayan gustado mucho.",
      icono: "🌹",
    },
    {
      fecha: "Cuando me regresé a casa",
      titulo: "La despedida",
      texto:
        "No soy bueno para las despedidas. Me dio muchísima tristeza irme, y me aguanté las ganas de romperme ahí mismo, en el cuarto y en el camino, porque no quería que me vieras así.",
      icono: "🚌",
    },
    {
      fecha: "Ahora",
      titulo: "Aunque haya distancia",
      texto:
        "Me duele estar lejos de ti, pero eso solo me da más ganas de tenerte y de desearte todavía más (en todos los sentidos 😏). Nunca olvides que te amo demasiado, mi niña bonita, y que quiero seguir viviendo locuras contigo.",
      icono: "🌙",
    },
    {
      fecha: "14 de octubre de 2026",
      titulo: "Volví por ti",
      texto:
        "Cuando me fui de Pachuca me costó muchísimo despedirme, y desde entonces conté los días para volver a verte. El 14 me subí al camión con el corazón acelerado, sabiendo que al día siguiente, justo en tu cumpleaños, por fin te iba a tener enfrente. Hay cosas que no se celebran a la distancia, y tu cumpleaños es una de ellas. Viajaría las veces que hicieran falta solo por verte sonreír. Gracias por hacer que valga la pena cada kilómetro. Te amo demasiado, mi mugrosa.",
      icono: "🚌",
    },
    {
      fecha: "15 de octubre de 2026",
      titulo: "Tu cumpleaños",
      texto: "El primero que celebro contigo, y en persona, abrazándote. El primero de muchos.",
      icono: "🎂",
    },
  ],

  // ---------- GALERÍA ----------
  // Pon tus fotos en img/galeria/ (mejor en .webp, ~1600px de ancho)
  galeria: [
    { foto: "img/galeria/ejemplo1.svg", texto: "Nuestra primera foto juntos" },
    { foto: "img/galeria/ejemplo2.svg", texto: "Ese día tan bonito" },
    { foto: "img/galeria/ejemplo3.svg", texto: "Tu sonrisa favorita (la mía)" },
    { foto: "img/galeria/ejemplo4.svg", texto: "Atardecer contigo" },
    { foto: "img/galeria/ejemplo5.svg", texto: "Aventura juntos" },
    { foto: "img/galeria/ejemplo6.svg", texto: "Simplemente nosotros" },
  ],

  // ---------- RAZONES POR LAS QUE TE QUIERO ----------
  razones: [
    "La forma en que me tratas.",
    "Tus abrazos (como los de aquel 15 de septiembre).",
    "Que me haces querer hacer cosas que nunca había hecho, como escribir cartas y llevarte rosas.",
    "Que puedo pasar horas platicando contigo y nunca me aburro.",
    "Que cuando estaba solo en Pachuca, tú me hiciste sentir en casa.",
    "Que hasta nuestros desastres (meseros, caídas…) se vuelven recuerdos bonitos.",
    "Lo tímida que eres en persona y lo extrovertida que eres por mensaje.",
    "Que te animas a vivir locuras conmigo, como ir a la playa.",
    "Tu sonrisa, que me cambia el día entero.",
    "La forma en que me escuchas de verdad.",
    "Que contigo hasta lo más simple se vuelve especial.",
    "Tu risa (sobre todo cuando no puedes parar).",
    "Lo bonita que eres por dentro y por fuera.",
    "Que me haces querer ser mejor cada día.",
    "Tu manera de ver el mundo.",
    "Cómo me haces sentir en casa.",
    "Tus mensajes que llegan justo cuando los necesito.",
    "Que eres tú, sin intentar ser nadie más.",
    "Tu paciencia conmigo.",
    "Que cada día descubro algo nuevo que me encanta de ti.",
  ],

  // ---------- CARTAS ----------
  cartas: [
    {
      sobre: "Ábrela en tu cumpleaños 🎂",
      titulo: "Para mi cumpleañera",
      texto:
        "Mi niña bonita:\n\nHoy celebramos que existes, y yo celebro que un comentario en TikTok y un grupo de WhatsApp me hayan llevado hasta ti aquel 17 de agosto, en el Reloj de Pachuca. En tan poco tiempo te volviste lo más importante para mí; siento que te conozco desde hace muchísimo más.\n\nGracias por cada plática que se nos va en horas, por enseñarme Pachuca cuando estaba solo, por la playa, por las risas y hasta por lo salados que somos.\n\nDeseo que este año te traiga todo lo que sueñas, y que me dejes estar a tu lado para verlo.\n\nFeliz cumpleaños, mi mugrosa. Te amo demasiado.\n\nDaniel",
    },
    {
      sobre: "Ábrela cuando me extrañes 🌙",
      titulo: "Aunque no esté ahí",
      texto:
        "Mi niña bonita:\n\nSi estás leyendo esto es porque me extrañas… y te cuento un secreto: yo seguramente también te estoy extrañando, muchísimo.\n\nLa distancia es difícil, pero no cambia lo que siento. Mira el cielo un ratito: estamos bajo las mismas estrellas, y pronto vamos a estar juntos otra vez haciendo alguna de nuestras locuras.\n\nTe amo demasiado. Nunca lo olvides.\nDaniel",
    },
    {
      sobre: "Ábrela si estamos enojados 🫶",
      titulo: "Siempre voy a querer arreglarlo",
      texto:
        "Mi mugrosa:\n\nSi estás leyendo esto, seguramente nos enojamos por algo. Quiero que sepas una cosa: por más enojado que esté, siempre voy a querer arreglar las cosas contigo, porque me da miedo perderte.\n\nOjalá que nada ni nadie rompa lo que tenemos. Lo nuestro vale mucho más que cualquier pelea.\n\nYa, ven, dame un abrazo.\nTe amo demasiado,\nDaniel",
    },
    {
      sobre: "Ábrela si tienes un mal día ☁️",
      titulo: "Respira, bonita",
      texto:
        "Los días difíciles también pasan. Eres más fuerte de lo que crees y no estás sola: aquí estoy para ti, para escucharte o para hacerte reír.\n\nCuando quieras, háblame. Siempre tendré tiempo para ti.\n\nDaniel",
    },
  ],

  // ---------- NUESTRA CANCIÓN ----------
  // Opción A: pon un mp3 en la carpeta musica/ y escribe su ruta en "archivo"
  // Opción B: pega el enlace de "Compartir > Insertar" de Spotify en "spotify"
  //           (ej. "https://open.spotify.com/embed/track/XXXXXXXX")
  cancion: {
    titulo: "Nuestra canción",
    artista: "Escríbela en datos.js ✏️",
    archivo: "", // ej. "musica/nuestra-cancion.mp3"
    spotify: "",
  },

  // ---------- LUGARES ESPECIALES ----------
  // Busca el lugar en Google Maps, clic derecho y copia las coordenadas
  // tipo: "recuerdo" (lugares donde ya estuvimos) o "sueno" (a donde queremos ir)
  lugares: [
    { nombre: "Reloj de Pachuca", texto: "Donde te vi por primera vez, el 17 de agosto", lat: 20.1270, lng: -98.7327, tipo: "recuerdo" },
    { nombre: "Real del Monte", texto: "Nuestra salida bonita (y la mano que creí que no querías tomar)", lat: 20.1395, lng: -98.6729, tipo: "recuerdo" },
    { nombre: "Tecolutla, Veracruz", texto: "Nuestro viaje a la playa: una locura de la que no me arrepiento", lat: 20.4794, lng: -97.0097, tipo: "recuerdo" },
    { nombre: "Algún día: Oaxaca", texto: "Llevarte a mi estado, que conozcas a mi familia y el lugar donde crecí", lat: 17.0732, lng: -96.7266, tipo: "sueno" },
    { nombre: "Algún día: las playas de Oaxaca", texto: "Enseñarte mis playas favoritas", lat: 15.8615, lng: -97.0671, tipo: "sueno" },
    { nombre: "Algún día: París", texto: "Ver la torre Eiffel iluminada juntos", lat: 48.8566, lng: 2.3522, tipo: "sueno" },
    { nombre: "Algún día: Japón", texto: "Ver los cerezos en flor", lat: 35.6762, lng: 139.6503, tipo: "sueno" },
  ],

  // ---------- SUEÑOS JUNTOS ----------
  suenos: [
    "Llevarte a Oaxaca y enseñarte mis lugares favoritos",
    "Que conozcas a mi familia",
    "Que conozcas el lugar donde vivo",
    "Ir juntos a las playas de Oaxaca",
    "Volver a Tecolutla por los tacos de cueritos y el pulque que nos faltaron (aunque no nos gusten 😂)",
    "Ver un amanecer juntos",
    "Hacer un picnic bajo las estrellas",
    "Cocinar algo juntos desde cero",
    "Ir a un concierto juntos",
    "Aprender a bailar una canción",
    "Tomarnos una foto en cada lugar nuevo",
    "Celebrar un año de conocernos (17 de agosto de 2027)",
    "Celebrar nuestro primer aniversario de novios (29 de septiembre de 2027)",
  ],
};
