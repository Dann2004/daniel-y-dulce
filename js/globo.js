// Globo terráqueo de puntitos con los lugares especiales marcados
import * as THREE from "three";
import { texturaBrillo } from "./escena3d.js";

const RADIO = 5;
const COLOR_TIPO = { recuerdo: 0xff8fb1, sueno: 0xf6d38b };

function aVector(lat, lng, r) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// Lee img/tierra.png (blanco = tierra) para dibujar los continentes con puntos
async function cargarMascara() {
  try {
    const img = new Image();
    img.src = "img/tierra.png";
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
    return (lat, lng) => {
      const x = Math.min(width - 1, Math.floor(((lng + 180) / 360) * width));
      const y = Math.min(height - 1, Math.floor(((90 - lat) / 180) * height));
      return data[(y * width + x) * 4] > 128;
    };
  } catch {
    return () => true;
  }
}

export async function iniciarGlobo(contenedor, lugares, alSeleccionar) {
  const esTierra = await cargarMascara();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  contenedor.appendChild(renderer.domElement);

  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camara.position.z = 17;

  const globo = new THREE.Group();
  globo.rotation.order = "XYZ";
  escena.add(globo);

  // Esfera base oscura
  globo.add(new THREE.Mesh(
    new THREE.SphereGeometry(RADIO * 0.99, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x0d1240 })
  ));

  // Puntos de los continentes (distribución de Fibonacci)
  const total = 14000;
  const puntos = [];
  const oceano = [];
  const oro = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < total; i++) {
    const y = 1 - (i / (total - 1)) * 2;
    const lat = THREE.MathUtils.radToDeg(Math.asin(y));
    const lng = ((THREE.MathUtils.radToDeg(i * oro) % 360) + 360) % 360 - 180;
    if (esTierra(lat, lng)) puntos.push(aVector(lat, lng, RADIO));
    else if (i % 3 === 0) oceano.push(aVector(lat, lng, RADIO));
  }
  globo.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(oceano), new THREE.PointsMaterial({ color: 0x7d76c4, size: 0.12, transparent: true, opacity: 0.3 })));
  const geoPuntos = new THREE.BufferGeometry().setFromPoints(puntos);
  globo.add(new THREE.Points(geoPuntos, new THREE.PointsMaterial({ color: 0xffd0e4, size: 0.24, map: texturaBrillo(), transparent: true, depthWrite: false, opacity: 1 })));

  // Halo atmosférico
  escena.add(new THREE.Mesh(
    new THREE.SphereGeometry(RADIO * 1.18, 64, 64),
    new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vN; void main(){ float i = pow(0.75 - dot(vN, vec3(0,0,1.0)), 3.0); gl_FragColor = vec4(1.0, 0.55, 0.75, 1.0) * i * 0.8; }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    })
  ));

  // Marcadores
  const brillo = texturaBrillo();
  const marcadores = lugares.map((l, i) => {
    const color = COLOR_TIPO[l.tipo] ?? COLOR_TIPO.recuerdo;
    const grupo = new THREE.Group();
    grupo.position.copy(aVector(l.lat, l.lng, RADIO));
    grupo.lookAt(grupo.position.clone().multiplyScalar(2));
    const punto = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshBasicMaterial({ color }));
    const aro = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 32), new THREE.MeshBasicMaterial({ color, transparent: true, side: THREE.DoubleSide }));
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: brillo, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.setScalar(0.9);
    grupo.add(punto, aro, halo);
    punto.userData.indice = i;
    globo.add(grupo);
    return { grupo, aro, punto };
  });

  // Rotación: automática, arrastrando o enfocando un lugar
  // Zoom: rueda del mouse, pellizcar con dos dedos o botones + / −
  const ZOOM_MIN = 9.5, ZOOM_MAX = 20, ZOOM_INICIAL = 17;
  let rotY = 0.6, rotX = 0.35, objetivo = null, arrastrando = false, ultimo = null, tiempoQuieto = 0;
  let zoom = ZOOM_INICIAL, zoomObjetivo = ZOOM_INICIAL;
  const dedos = new Map();
  let pellizco = null;
  const lienzo = renderer.domElement;
  const fijarZoom = (z) => (zoomObjetivo = THREE.MathUtils.clamp(z, ZOOM_MIN, ZOOM_MAX));
  const distanciaDedos = () => {
    const [a, b] = [...dedos.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  lienzo.addEventListener("pointerdown", (e) => {
    dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (dedos.size === 2) {
      arrastrando = false;
      pellizco = { distancia: distanciaDedos(), zoom: zoomObjetivo };
      return;
    }
    arrastrando = true;
    ultimo = { x: e.clientX, y: e.clientY, inicioX: e.clientX, inicioY: e.clientY };
    objetivo = null;
  });
  const soltar = (e, cancelado) => {
    if (!cancelado && arrastrando && !pellizco && ultimo && Math.hypot(e.clientX - ultimo.inicioX, e.clientY - ultimo.inicioY) < 6) tocar(e);
    dedos.delete(e.pointerId);
    if (dedos.size < 2) pellizco = null;
    if (dedos.size === 0) arrastrando = false;
  };
  window.addEventListener("pointerup", (e) => soltar(e, false));
  window.addEventListener("pointercancel", (e) => soltar(e, true));
  window.addEventListener("pointermove", (e) => {
    if (dedos.has(e.pointerId)) dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pellizco && dedos.size === 2) {
      fijarZoom(pellizco.zoom * (pellizco.distancia / Math.max(distanciaDedos(), 1)));
      objetivo = null;
      tiempoQuieto = 0;
      return;
    }
    if (!arrastrando) return;
    const vel = 0.008 * (zoom / ZOOM_INICIAL);
    rotY += (e.clientX - ultimo.x) * vel;
    rotX = THREE.MathUtils.clamp(rotX + (e.clientY - ultimo.y) * vel, -1.2, 1.2);
    ultimo.x = e.clientX;
    ultimo.y = e.clientY;
    tiempoQuieto = 0;
  });
  lienzo.addEventListener("wheel", (e) => {
    e.preventDefault();
    fijarZoom(zoomObjetivo * Math.exp(e.deltaY * 0.0015));
    tiempoQuieto = 0;
  }, { passive: false });

  // Botones de zoom
  const controles = document.createElement("div");
  controles.className = "globo-zoom";
  controles.innerHTML = `
    <button type="button" data-z="acercar" aria-label="Acercar">＋</button>
    <button type="button" data-z="alejar" aria-label="Alejar">−</button>
    <button type="button" data-z="reiniciar" aria-label="Ver todo el mundo">🌍</button>`;
  controles.addEventListener("pointerdown", (e) => e.stopPropagation());
  controles.addEventListener("click", (e) => {
    const z = e.target.closest("button")?.dataset.z;
    if (z === "acercar") fijarZoom(zoomObjetivo * 0.75);
    if (z === "alejar") fijarZoom(zoomObjetivo / 0.75);
    if (z === "reiniciar") fijarZoom(ZOOM_INICIAL);
    tiempoQuieto = 0;
  });
  contenedor.appendChild(controles);

  const raycaster = new THREE.Raycaster();
  function tocar(e) {
    const r = lienzo.getBoundingClientRect();
    const p = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(p, camara);
    const hit = raycaster.intersectObjects(marcadores.map((m) => m.punto))[0];
    if (hit) alSeleccionar(hit.object.userData.indice);
  }

  function enfocar(i) {
    const l = lugares[i];
    const v = aVector(l.lat, l.lng, 1);
    // Girar en Y para que el punto mire a la cámara y luego inclinar en X según la latitud
    let y = -Math.atan2(v.x, v.z);
    while (y - rotY > Math.PI) y -= Math.PI * 2;
    while (y - rotY < -Math.PI) y += Math.PI * 2;
    objetivo = { x: THREE.MathUtils.degToRad(l.lat), y };
    fijarZoom(11.5);
    marcadores.forEach((m, j) => m.punto.scale.setScalar(j === i ? 1.8 : 1));
  }

  function ajustar() {
    const w = contenedor.clientWidth;
    renderer.setSize(w, w, false);
    lienzo.style.width = "100%";
    lienzo.style.height = "100%";
  }
  new ResizeObserver(ajustar).observe(contenedor);
  ajustar();
  if (lugares.length) {
    const v = aVector(lugares[0].lat, lugares[0].lng, 1);
    rotY = -Math.atan2(v.x, v.z);
    rotX = THREE.MathUtils.degToRad(lugares[0].lat);
  }

  // Solo animar cuando el globo está en pantalla
  let visible = false;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) animar();
  }).observe(contenedor);

  const reloj = new THREE.Clock();
  let corriendo = false;
  function animar() {
    if (corriendo) return;
    corriendo = true;
    const paso = () => {
      if (!visible) {
        corriendo = false;
        return;
      }
      const dt = Math.min(reloj.getDelta(), 0.05);
      const t = reloj.elapsedTime;
      tiempoQuieto += dt;
      if (objetivo) {
        rotX += (objetivo.x - rotX) * 0.06;
        rotY += (objetivo.y - rotY) * 0.06;
      } else if (!arrastrando && !pellizco && tiempoQuieto > 1 && zoomObjetivo > 15) {
        rotY += dt * 0.15 * (zoom / ZOOM_INICIAL);
      }
      zoom += (zoomObjetivo - zoom) * 0.12;
      camara.position.z = zoom;
      globo.rotation.set(rotX, rotY, 0);
      const escalaMarcador = Math.pow(zoom / ZOOM_INICIAL, 1.6);
      marcadores.forEach((m, i) => {
        m.grupo.scale.setScalar(escalaMarcador);
        const s = 1 + ((t * 0.8 + i * 0.3) % 1) * 2.2;
        m.aro.scale.setScalar(s);
        m.aro.material.opacity = 1 - ((t * 0.8 + i * 0.3) % 1);
      });
      renderer.render(escena, camara);
      requestAnimationFrame(paso);
    };
    paso();
  }

  return { enfocar };
}
