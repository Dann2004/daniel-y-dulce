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
      "Es el primer cumpleaños tuyo que me toca vivir a tu lado, y quería regalarte algo que se quedara para siempre: este pequeño rincón del internet que es solo nuestro. Gracias por existir, por tu sonrisa y por dejarme ser parte de tu historia. Te quiero muchísimo. — Daniel",
  },

  // ---------- NUESTRA HISTORIA (línea de tiempo) ----------
  historia: [
    {
      fecha: "17 de agosto de 2026",
      titulo: "El día que nos conocimos",
      texto: "Cuenta aquí cómo fue: dónde estaban, qué fue lo primero que pensaste de ella… ✏️",
      icono: "✨",
    },
    {
      fecha: "Agosto 2026",
      titulo: "Nuestra primera plática larga",
      texto: "Esa conversación en la que se nos fue el tiempo sin darnos cuenta. ✏️",
      icono: "💬",
    },
    {
      fecha: "Septiembre 2026",
      titulo: "Nuestra primera salida",
      texto: "A dónde fueron, qué comieron, qué canción sonaba… ✏️",
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
        "Dulce:\n\nHoy celebramos que existes, y yo celebro que la vida me haya cruzado contigo aquel 17 de agosto. En poco tiempo te has vuelto alguien muy importante para mí.\n\nDeseo que este año te traiga todo lo que sueñas, y que me dejes estar a tu lado para verlo.\n\nFeliz cumpleaños, preciosa.\n\nCon todo mi cariño,\nDaniel",
    },
    {
      sobre: "Ábrela cuando me extrañes 🌙",
      titulo: "Aunque no esté ahí",
      texto:
        "Si estás leyendo esto es porque me extrañas… y te cuento un secreto: yo seguramente también te estoy extrañando.\n\nMira el cielo un ratito. Estamos bajo las mismas estrellas.\n\nTe mando un abrazo enorme,\nDaniel",
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
    { nombre: "Donde nos conocimos", texto: "Cambia las coordenadas ✏️", lat: 19.4326, lng: -99.1332, tipo: "recuerdo" },
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
