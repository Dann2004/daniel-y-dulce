import { DATOS } from "./datos.js";
import { iniciarFondo } from "./escena3d.js";
import { iniciarGlobo } from "./globo.js";
import { esCumple, iniciarCumple, lanzarConfeti } from "./cumple.js";

const $ = (id) => document.getElementById(id);
const crear = (tag, clase, html) => {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (html !== undefined) el.innerHTML = html;
  return el;
};
const escapar = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const guardar = {
  leer(k) { try { return localStorage.getItem(k); } catch { return null; } },
  escribir(k, v) { try { localStorage.setItem(k, v); } catch {} },
  leerSesion(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  escribirSesion(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

let fondo = null;
try {
  fondo = iniciarFondo($("fondo3d"));
} catch (e) {
  console.warn("WebGL no disponible", e);
}

const hoyEsCumple = esCumple(DATOS.cumpleElla);

// ================= TRIVIA DE ENTRADA =================
const T = DATOS.trivia;
const normalizar = (t) =>
  String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9ñ]/g, "");
let paso = 0;
let fallos = 0;

$("triviaTitulo").textContent = T.titulo;
$("triviaIntro").textContent = T.intro;
T.preguntas.forEach(() => $("triviaCorazones").append(crear("span", "trivia-corazon", "♡")));

function pintarFrase(relleno) {
  const [antes, despues = ""] = T.preguntas[paso].frase.split("___");
  const hueco = relleno
    ? `<span class="trivia-hueco lleno">${escapar(relleno)}</span>`
    : `<span class="trivia-hueco">&nbsp;</span>`;
  $("triviaFrase").innerHTML = `<span>${escapar(antes)}${hueco}${escapar(despues)}</span>`;
}

function mostrarPregunta() {
  fallos = 0;
  $("triviaPaso").textContent = `Frase ${paso + 1} de ${T.preguntas.length}`;
  pintarFrase();
  $("triviaFrase").classList.remove("aparecer");
  void $("triviaFrase").offsetWidth;
  $("triviaFrase").classList.add("aparecer");
  $("triviaPista").classList.add("oculto");
  $("errorClave").textContent = "";
  $("clave").value = "";
  $("clave").disabled = false;
  $("btnTrivia").disabled = false;
  setTimeout(() => $("clave").focus(), 50);
}

function verPista() {
  $("triviaPista").textContent = "💡 " + T.preguntas[paso].pista;
  $("triviaPista").classList.remove("oculto");
}
$("btnPista").addEventListener("click", verPista);

$("formCandado").addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("clave").disabled) return;
  const q = T.preguntas[paso];
  const escrito = normalizar($("clave").value);
  if (!escrito) return;
  const bien = q.respuestas.some((r) => {
    const n = normalizar(r);
    return escrito === n || (n.length > 2 && escrito.includes(n));
  });
  if (bien) {
    $("clave").disabled = true;
    $("btnTrivia").disabled = true;
    $("errorClave").textContent = "";
    pintarFrase(q.respuestas[0]);
    const corazon = $("triviaCorazones").children[paso];
    corazon.textContent = "♥";
    corazon.classList.add("lleno");
    fondo?.lluviaDeCorazones(6);
    paso++;
    setTimeout(paso < T.preguntas.length ? mostrarPregunta : terminarTrivia, 1100);
  } else {
    fallos++;
    $("errorClave").textContent = T.errores[(fallos - 1) % T.errores.length];
    if (fallos >= 2) verPista();
    const caja = $("formCandado");
    caja.classList.remove("temblar");
    void caja.offsetWidth;
    caja.classList.add("temblar");
  }
});

function terminarTrivia() {
  $("candadoIcono").textContent = "🔓";
  $("triviaPaso").textContent = "";
  $("triviaIntro").textContent = "";
  $("triviaFrase").innerHTML = `<span class="trivia-final">${escapar(T.final)}</span>`;
  ["clave", "btnTrivia", "btnPista", "triviaPista", "errorClave"].forEach((id) => $(id).classList.add("oculto"));
  fondo?.lluviaDeCorazones(50);
  guardar.escribirSesion("abierto", "1");
  setTimeout(abrir, 2200);
}

function abrir() {
  $("candado").classList.add("desvanecer");
  setTimeout(() => $("candado").classList.add("oculto"), 800);
  if (hoyEsCumple) {
    iniciarCumple(DATOS.cumple, { alTerminar: mostrarSitio, alEmpezarMusica: () => reproducir() });
  } else {
    mostrarSitio();
  }
}

function mostrarSitio() {
  document.body.classList.remove("bloqueado");
  $("sitio").classList.remove("oculto");
  $("sitio").classList.add("entrando");
  window.scrollTo(0, 0);
  fondo?.formarConstelacion();
  activarRevelado();
}

// ================= PORTADA =================
const N = DATOS.nombres;
$("nomEl").textContent = N.el;
$("nomElla").textContent = N.ella;
$("nombresCompletos").innerHTML = `<span>${escapar(N.elCompleto)}</span><span class="punto"> · </span><span>${escapar(N.ellaCompleto)}</span>`;
const inicio = new Date(DATOS.fechaConocimos + "T00:00:00");
const fechaLarga = (d) => d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
$("desde").textContent = `Desde el ${fechaLarga(inicio)}`;
if (hoyEsCumple) {
  $("bannerCumple").classList.remove("oculto");
  $("desde").textContent = "Hoy celebramos tu día, Dulce 🎂";
}

// ================= CONTADOR =================
const unidades = ["Meses", "Días", "Horas", "Minutos", "Segundos"];
$("reloj").innerHTML = unidades.map((u) => `<div class="unidad tarjeta"><b>0</b><span>${u}</span></div>`).join("");
const cifras = [...$("reloj").querySelectorAll("b")];

function diferencia(desde, hasta) {
  let meses = (hasta.getFullYear() - desde.getFullYear()) * 12 + hasta.getMonth() - desde.getMonth();
  let ancla = new Date(desde);
  ancla.setMonth(desde.getMonth() + meses);
  if (ancla > hasta) {
    meses--;
    ancla = new Date(desde);
    ancla.setMonth(desde.getMonth() + meses);
  }
  let resto = Math.floor((hasta - ancla) / 1000);
  const dias = Math.floor(resto / 86400); resto %= 86400;
  const horas = Math.floor(resto / 3600); resto %= 3600;
  return [meses, dias, horas, Math.floor(resto / 60), resto % 60];
}

function actualizarContador() {
  const ahora = new Date();
  diferencia(inicio, ahora).forEach((v, i) => (cifras[i].textContent = v));
  const totalDias = Math.floor((ahora - inicio) / 86400000);
  const latidos = Math.floor(((ahora - inicio) / 60000) * 75);
  $("datoCurioso").textContent = `${totalDias.toLocaleString("es-MX")} días y unos ${latidos.toLocaleString("es-MX")} latidos desde que llegaste 💓`;
}
actualizarContador();
setInterval(actualizarContador, 1000);

// ================= HISTORIA =================
$("lineaTiempo").append(
  ...DATOS.historia.map((h) =>
    crear("li", "hito revelar", `
      <div class="hito-icono">${escapar(h.icono || "💖")}</div>
      <div class="tarjeta"><time>${escapar(h.fecha)}</time><h3>${escapar(h.titulo)}</h3><p>${escapar(h.texto)}</p></div>`)
  )
);

// ================= GALERÍA =================
DATOS.galeria.forEach((g, i) => {
  const b = crear("button", "polaroid revelar", `<img src="${escapar(g.foto)}" alt="${escapar(g.texto)}" loading="lazy" /><p>${escapar(g.texto)}</p>`);
  b.style.setProperty("--giro", `${((i * 37) % 9) - 4}deg`);
  b.addEventListener("click", () => {
    $("visorImg").src = g.foto;
    $("visorImg").alt = g.texto;
    $("visorTexto").textContent = g.texto;
    $("visor").classList.remove("oculto");
  });
  $("polaroids").appendChild(b);
});

// ================= RAZONES =================
DATOS.razones.forEach((r, i) => {
  const b = crear("button", "razon revelar", `
    <div class="razon-int">
      <div class="cara frente"><b>Razón #${i + 1}</b></div>
      <div class="cara atras">${escapar(r)}</div>
    </div>`);
  b.addEventListener("click", () => b.classList.toggle("volteada"));
  $("listaRazones").appendChild(b);
});

// ================= CARTAS =================
DATOS.cartas.forEach((c) => {
  const b = crear("button", "sobre revelar", `<span class="sello">♥</span><span class="etiqueta">${escapar(c.sobre)}</span>`);
  b.addEventListener("click", () => {
    $("cartaTitulo").textContent = c.titulo;
    $("cartaTexto").innerHTML = c.texto.split(/\n{2,}/).map((p) => `<p>${escapar(p).replace(/\n/g, "<br>")}</p>`).join("");
    $("cartaAbierta").classList.remove("oculto");
    $("cartaAbierta").querySelector(".papel").scrollTop = 0;
  });
  $("sobres").appendChild(b);
});

// Cerrar visores: botón ✕, clic fuera o tecla Esc
document.querySelectorAll(".visor").forEach((v) => {
  v.addEventListener("click", (e) => {
    if (e.target === v || e.target.closest(".cerrar")) v.classList.add("oculto");
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".visor").forEach((v) => v.classList.add("oculto"));
});

// ================= CANCIÓN =================
const C = DATOS.cancion;
const audio = $("audio");
if (C.encabezado) $("cancionEncabezado").textContent = C.encabezado;
$("cancionDedicatoria").textContent = C.dedicatoria || "";
if (C.spotify) {
  $("reproductor").innerHTML = `<iframe src="${escapar(C.spotify)}" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="${escapar(C.encabezado || "Canción")}"></iframe>`;
} else {
  $("reproductor").innerHTML = `
    <div class="vinilo" aria-hidden="true"></div>
    <div class="cancion-info">
      <h3>${escapar(C.titulo)}</h3>
      <p>${escapar(C.artista)}</p>
      ${C.archivo ? '<button class="boton" id="btnPlay">▶ Escuchar</button>' : ""}
    </div>`;
}
if (C.archivo) {
  audio.src = C.archivo;
  $("btnMusica").classList.remove("oculto");
  $("btnPlay")?.addEventListener("click", () => (audio.paused ? reproducir() : audio.pause()));
  $("btnMusica").addEventListener("click", () => (audio.paused ? reproducir() : audio.pause()));
  audio.addEventListener("play", () => sonando(true));
  audio.addEventListener("pause", () => sonando(false));
}
function reproducir() {
  if (C.archivo) audio.play().catch(() => {});
}
function sonando(si) {
  $("reproductor").classList.toggle("sonando", si);
  $("btnMusica").classList.toggle("sonando", si);
  if ($("btnPlay")) $("btnPlay").textContent = si ? "❚❚ Pausar" : "▶ Escuchar";
}

// ================= LUGARES =================
const botonesLugar = DATOS.lugares.map((l, i) => {
  const li = crear("li", "revelar");
  const b = crear("button", "lugar", `<b><i>${l.tipo === "sueno" ? "✈️" : "📍"}</i>${escapar(l.nombre)}</b><span>${escapar(l.texto || "")}</span>`);
  b.addEventListener("click", () => seleccionarLugar(i));
  li.appendChild(b);
  $("listaLugares").appendChild(li);
  return b;
});
let globo = null;
function seleccionarLugar(i) {
  botonesLugar.forEach((b, j) => b.classList.toggle("activo", j === i));
  globo?.enfocar(i);
}
iniciarGlobo($("globo"), DATOS.lugares, seleccionarLugar)
  .then((g) => (globo = g))
  .catch((e) => console.warn("No se pudo crear el globo", e));

// ================= SUEÑOS =================
const hechos = new Set(JSON.parse(guardar.leer("suenos") || "[]"));
DATOS.suenos.forEach((s, i) => {
  const li = crear("li", "", `<label><input type="checkbox" ${hechos.has(s) ? "checked" : ""} /><span>${escapar(s)}</span></label>`);
  li.querySelector("input").addEventListener("change", (e) => {
    if (e.target.checked) {
      hechos.add(s);
      fondo?.lluviaDeCorazones(12);
    } else hechos.delete(s);
    guardar.escribir("suenos", JSON.stringify([...hechos]));
  });
  $("listaSuenos").appendChild(li);
});

// ================= PRÓXIMAS FECHAS =================
function proximaFecha(mes, dia) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  let f = new Date(hoy.getFullYear(), mes - 1, dia);
  if (f < hoy) f = new Date(hoy.getFullYear() + 1, mes - 1, dia);
  return f;
}
function proximoMesiversario() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const dia = inicio.getDate();
  let f = new Date(hoy.getFullYear(), hoy.getMonth(), dia);
  if (f < hoy) f = new Date(hoy.getFullYear(), hoy.getMonth() + 1, dia);
  return f;
}
function pintarFechas() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const anio = new Date(inicio);
  anio.setFullYear(inicio.getFullYear() + 1);
  const meses = (d) => (d.getFullYear() - inicio.getFullYear()) * 12 + d.getMonth() - inicio.getMonth();
  const lista = [
    { emoji: "🎂", titulo: `Cumpleaños de ${N.ella}`, fecha: proximaFecha(DATOS.cumpleElla.mes, DATOS.cumpleElla.dia) },
    { emoji: "🌙", titulo: "Próximo mes juntos", fecha: proximoMesiversario(), extra: (f) => `Cumplimos ${meses(f)} meses` },
    { emoji: "💫", titulo: "Un año desde que nos conocimos", fecha: anio },
  ].filter((x) => x.fecha >= hoy);
  $("listaFechas").innerHTML = lista
    .map((x) => {
      const dias = Math.round((x.fecha - hoy) / 86400000);
      const cuenta = dias === 0 ? "¡Es hoy!" : dias === 1 ? "Mañana" : `${dias} días`;
      return `<div class="fecha tarjeta revelar visible ${dias === 0 ? "hoy" : ""}">
        <div class="emoji">${x.emoji}</div><h3>${escapar(x.titulo)}</h3>
        <div class="cuenta">${cuenta}</div>
        <p>${fechaLarga(x.fecha)}${x.extra ? " · " + x.extra(x.fecha) : ""}</p></div>`;
    })
    .join("");
}
pintarFechas();

// ================= ANIMACIONES AL HACER SCROLL =================
function activarRevelado() {
  const obs = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".revelar:not(.visible)").forEach((el) => obs.observe(el));

  const enlaces = [...document.querySelectorAll(".menu a")];
  const obsMenu = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) enlaces.forEach((a) => a.classList.toggle("activo", a.hash === "#" + e.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("#inicio, .seccion").forEach((s) => obsMenu.observe(s));
}

// ================= EASTER EGG: "teamo" =================
function explosionDeAmor() {
  fondo?.lluviaDeCorazones(50);
  for (let i = 0; i < 30; i++) {
    const h = crear("span", "corazon-dom", ["💖", "💕", "💗", "💘", "❤️"][i % 5]);
    h.style.left = Math.random() * 100 + "vw";
    h.style.top = 80 + Math.random() * 20 + "vh";
    h.style.setProperty("--dx", (Math.random() - 0.5) * 200 + "px");
    h.style.setProperty("--rot", (Math.random() - 0.5) * 90 + "deg");
    h.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}
let tecleado = "";
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.key.length !== 1) return;
  tecleado = (tecleado + e.key.toLowerCase()).slice(-5);
  if (tecleado === "teamo") {
    explosionDeAmor();
    lanzarConfeti(60);
  }
});
$("corazonPie").addEventListener("click", explosionDeAmor);

// ================= ARRANQUE =================
// Si ya puso la contraseña en esta pestaña, no la pedimos otra vez
// (excepto el día del cumpleaños, para que siempre vea la sorpresa completa)
if (guardar.leerSesion("abierto") && !hoyEsCumple) {
  $("candado").classList.add("oculto");
  mostrarSitio();
} else {
  mostrarPregunta();
}
