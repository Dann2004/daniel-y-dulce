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
  cumpleElla: { mes: 10, dia: 16 },

  // Contraseña de entrada.
  // Actual: 17082026  (también acepta 17/08/2026 o 17-08-2026)
  // Para cambiarla, abre la web, escribe en la consola del navegador
  //   await hashContrasena("tu-nueva-clave")
  // y pega aquí el resultado.
  contrasena: {
    hash: "ded8d0d1951ef7e48177f6fd2818e8ea1037035872eb3ecb36487b5965398d09",
    pista: "El día que nos conocimos ✨ (ddmmaaaa)",
  },

  // ---------- SORPRESA DE CUMPLEAÑOS ----------
  cumple: {
    intro: [
      "Hoy es un día muy especial…",
      "porque un 16 de octubre llegó al mundo",
      "la persona que hace brillar mis días.",
    ],
    titulo: "¡Feliz cumpleaños, Dulce Paola!",
    mensaje:
      "Es el primer cumpleaños tuyo que me toca vivir a tu lado, y quería regalarte algo que se quedara para siempre: este pequeño rincón del internet que es solo nuestro. Gracias por existir, por tu sonrisa y por dejarme ser parte de tu historia. Te amo demasiado, mi niña bonita. — Daniel",
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
      fecha: "Agosto 2026",
      titulo: "Nuestra primera cita",
      texto:
        "Fuimos a un bar. Yo casi no tomo, pero me pareció buena idea… y lo fue, aunque no por las bebidas: pasamos horas platicando. Ahí descubrí algo que sigue siendo verdad: contigo nunca me aburro.",
      icono: "🍹",
    },
    {
      fecha: "Agosto 2026",
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
      fecha: "Septiembre 2026",
      titulo: "Nuestro viaje a la playa",
      texto:
        "Fue una locura, y no me arrepiento ni tantito. Gracias por llevarme. Fueron días hermosos, sobre todo porque los pasé a tu lado.",
      icono: "🏖️",
    },
    {
      fecha: "Mi cumpleaños",
      titulo: "Gracias por tomarme en cuenta",
      texto:
        "Me dejaste pasar mi cumpleaños contigo, y eso significó muchísimo para mí.",
      icono: "🎁",
    },
    {
      fecha: "El cumple de la señora",
      titulo: "La noche que mejor ni recordamos",
      texto:
        "Me da vergüenza que me hayas visto un poquito pasadito de copas (y lo que vino después, mejor ni lo cuento 🙈). Pero qué noche tan divertida, sobre todo por la pelea de la gente al final.",
      icono: "🥴",
    },
    {
      fecha: "Ahora",
      titulo: "Aunque haya distancia",
      texto:
        "La distancia me ha hecho darme cuenta de cuánto te quiero y cuánto te extraño. Nunca olvides que te amo demasiado, mi niña bonita, y que quiero seguir viviendo locuras contigo.",
      icono: "🌙",
    },
    {
      fecha: "16 de octubre de 2026",
      titulo: "Tu cumpleaños",
      texto: "El primero que celebro contigo, y el primero de muchos.",
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
    { nombre: "Algún día: París", texto: "Ver la torre Eiffel iluminada juntos", lat: 48.8566, lng: 2.3522, tipo: "sueno" },
    { nombre: "Algún día: Japón", texto: "Ver los cerezos en flor", lat: 35.6762, lng: 139.6503, tipo: "sueno" },
  ],

  // ---------- SUEÑOS JUNTOS ----------
  suenos: [
    "Ver un amanecer juntos",
    "Hacer un picnic bajo las estrellas",
    "Viajar juntos a la playa",
    "Cocinar algo juntos desde cero",
    "Ir a un concierto juntos",
    "Aprender a bailar una canción",
    "Tomarnos una foto en cada lugar nuevo",
    "Celebrar nuestro primer año (17 de agosto de 2027)",
  ],
};
