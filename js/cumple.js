// Sorpresa de cumpleaños: mensaje, pastel con velas y fuegos artificiales 3D
import * as THREE from "three";
import { texturaBrillo } from "./escena3d.js";

const $ = (id) => document.getElementById(id);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const COLORES = [0xff5c8a, 0xff8fb1, 0xffc6d7, 0xf6d38b, 0xb9a6ff, 0xffffff];

export function esCumple(cumple) {
  const hoy = new Date();
  return new URLSearchParams(location.search).has("cumple") || (hoy.getMonth() + 1 === cumple.mes && hoy.getDate() === cumple.dia);
}

// ---------- Fuegos artificiales ----------
function iniciarFuegos(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camara.position.z = 40;
  const brillo = texturaBrillo();
  const explosiones = [];
  let activo = true;

  function ajustar() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
  }
  window.addEventListener("resize", ajustar);
  ajustar();

  function explotar(x, y, forma) {
    const n = 160;
    const pos = new Float32Array(n * 3);
    const vel = [];
    for (let i = 0; i < n; i++) {
      pos.set([x, y, 0], i * 3);
      let v;
      if (forma === "corazon") {
        // Ecuación paramétrica de un corazón
        const t = (i / n) * Math.PI * 2;
        v = new THREE.Vector3(16 * Math.sin(t) ** 3, 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t), (Math.random() - 0.5) * 2).multiplyScalar(0.7);
      } else {
        v = new THREE.Vector3().randomDirection().multiplyScalar(8 + Math.random() * 6);
      }
      vel.push(v);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 1.1,
      map: brillo,
      color: COLORES[Math.floor(Math.random() * COLORES.length)],
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const p = new THREE.Points(geo, mat);
    p.userData = { vel, vida: 0 };
    escena.add(p);
    explosiones.push(p);
  }

  const reloj = new THREE.Clock();
  let proxima = 0;
  function animar() {
    if (!activo) return;
    const dt = Math.min(reloj.getDelta(), 0.05);
    proxima -= dt;
    if (proxima <= 0) {
      const ancho = 30 * camara.aspect;
      explotar((Math.random() - 0.5) * ancho, 2 + Math.random() * 14, Math.random() < 0.35 ? "corazon" : "esfera");
      proxima = 0.5 + Math.random() * 0.9;
    }
    for (let i = explosiones.length - 1; i >= 0; i--) {
      const p = explosiones[i];
      const { vel } = p.userData;
      p.userData.vida += dt;
      const arr = p.geometry.attributes.position.array;
      for (let k = 0; k < vel.length; k++) {
        vel[k].multiplyScalar(0.97);
        vel[k].y -= 4 * dt;
        arr[k * 3] += vel[k].x * dt;
        arr[k * 3 + 1] += vel[k].y * dt;
        arr[k * 3 + 2] += vel[k].z * dt;
      }
      p.geometry.attributes.position.needsUpdate = true;
      p.material.opacity = Math.max(0, 1 - p.userData.vida / 2.4);
      if (p.userData.vida > 2.4) {
        escena.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        explosiones.splice(i, 1);
      }
    }
    renderer.render(escena, camara);
    requestAnimationFrame(animar);
  }
  animar();
  return {
    detener() {
      activo = false;
      renderer.dispose();
    },
  };
}

export function lanzarConfeti(cantidad = 140) {
  const colores = ["#ff5c8a", "#ff8fb1", "#ffc6d7", "#f6d38b", "#b9a6ff", "#ffffff"];
  for (let i = 0; i < cantidad; i++) {
    const c = document.createElement("div");
    c.className = "confeti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colores[i % colores.length];
    c.style.borderRadius = Math.random() < 0.3 ? "50%" : "2px";
    c.style.setProperty("--dx", (Math.random() - 0.5) * 300 + "px");
    c.style.setProperty("--rot", Math.random() * 1080 + "deg");
    c.style.animationDuration = 2.5 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }
}

// ---------- Soplar al micrófono ----------
async function escucharSoplido(alSoplar) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const ctx = new AudioContext();
  const analizador = ctx.createAnalyser();
  analizador.fftSize = 512;
  ctx.createMediaStreamSource(stream).connect(analizador);
  const datos = new Uint8Array(analizador.frequencyBinCount);
  let fuerte = 0;
  let parar = false;
  const revisar = () => {
    if (parar) return;
    analizador.getByteFrequencyData(datos);
    // Un soplido es ruido fuerte en las frecuencias bajas
    let suma = 0;
    for (let i = 0; i < 40; i++) suma += datos[i];
    fuerte = suma / 40 > 150 ? fuerte + 1 : Math.max(0, fuerte - 1);
    if (fuerte > 6) {
      fuerte = 0;
      alSoplar();
    }
    requestAnimationFrame(revisar);
  };
  revisar();
  return () => {
    parar = true;
    stream.getTracks().forEach((t) => t.stop());
    ctx.close();
  };
}

// ---------- Flujo completo ----------
export function iniciarCumple(datos, { alTerminar, alEmpezarMusica }) {
  const pantalla = $("cumple");
  pantalla.classList.remove("oculto");
  let fuegos = null;
  let pararMicro = null;

  // 1. Intro con frases que aparecen una a una
  (async () => {
    const caja = $("introTexto");
    for (const frase of datos.intro) {
      const p = document.createElement("p");
      p.textContent = frase;
      caja.appendChild(p);
      await espera(2200);
    }
    $("btnSorpresa").classList.remove("oculto");
  })();

  // 2. Pastel
  $("btnSorpresa").addEventListener("click", () => {
    alEmpezarMusica?.();
    $("etapaIntro").classList.add("oculto");
    $("etapaPastel").classList.remove("oculto");
    const velas = $("velas");
    for (let i = 0; i < 5; i++) {
      const v = document.createElement("button");
      v.className = "vela";
      v.setAttribute("aria-label", "Soplar vela");
      v.innerHTML = '<span class="llama"></span>';
      v.addEventListener("click", () => apagar(v));
      velas.appendChild(v);
    }
  });

  function apagar(vela) {
    if (vela.classList.contains("apagada")) return;
    vela.classList.add("apagada");
    if (!document.querySelector(".vela:not(.apagada)")) setTimeout(final, 900);
  }

  $("btnMicro").addEventListener("click", async () => {
    try {
      $("btnMicro").textContent = "🎤 Escuchando… ¡sopla!";
      pararMicro = await escucharSoplido(() => {
        document.querySelectorAll(".vela:not(.apagada)").forEach((v, i) => setTimeout(() => apagar(v), i * 120));
      });
    } catch {
      $("btnMicro").textContent = "No pude usar el micrófono, toca las velas 💨";
    }
  });

  // 3. ¡Feliz cumpleaños!
  function final() {
    if (!$("etapaFinal").classList.contains("oculto")) return;
    pararMicro?.();
    $("etapaPastel").classList.add("oculto");
    $("etapaFinal").classList.remove("oculto");
    $("cumpleTitulo").textContent = datos.titulo;
    $("cumpleMensaje").textContent = datos.mensaje;
    fuegos = iniciarFuegos($("fuegos"));
    lanzarConfeti();
  }

  $("btnEntrar").addEventListener("click", () => {
    pantalla.classList.add("desvanecer");
    setTimeout(() => {
      fuegos?.detener();
      pantalla.classList.add("oculto");
    }, 800);
    alTerminar();
  });
}
