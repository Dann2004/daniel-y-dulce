// Fondo 3D: cielo estrellado, constelación "D ♥ D", corazones flotando y estrellas fugaces
import * as THREE from "three";

const COLORES_ESTRELLA = [0xffffff, 0xffffff, 0xffe9f0, 0xffc6d7, 0xf6d38b, 0xd8ceff];
const COLORES_CORAZON = [0xff5c8a, 0xff8fb1, 0xffc6d7, 0xf6d38b, 0xb9a6ff];

// Textura circular difuminada para que los puntos se vean como luces suaves
export function texturaBrillo() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function geometriaCorazon() {
  const s = new THREE.Shape();
  s.moveTo(5, 5);
  s.bezierCurveTo(5, 5, 4, 0, 0, 0);
  s.bezierCurveTo(-6, 0, -6, 7, -6, 7);
  s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
  s.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
  s.bezierCurveTo(16, 7, 16, 0, 10, 0);
  s.bezierCurveTo(7, 0, 5, 5, 5, 5);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 3, bevelEnabled: true, bevelSegments: 4, bevelSize: 1.5, bevelThickness: 1.5, curveSegments: 16 });
  geo.center();
  geo.rotateZ(Math.PI); // la forma original está de cabeza
  geo.scale(0.08, 0.08, 0.08);
  return geo;
}

// Muestrea puntos dentro de un texto dibujado en un canvas 2D
function puntosDeTexto(texto, cantidad, ancho) {
  const W = 600, H = 220;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.font = "bold 170px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(texto, W / 2, H / 2);
  const datos = ctx.getImageData(0, 0, W, H).data;
  const candidatos = [];
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      if (datos[(y * W + x) * 4 + 3] > 128) candidatos.push([x, y]);
    }
  }
  for (let i = candidatos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidatos[i], candidatos[j]] = [candidatos[j], candidatos[i]];
  }
  const escala = ancho / W;
  return candidatos.slice(0, cantidad).map(([x, y]) => new THREE.Vector3((x - W / 2) * escala, -(y - H / 2) * escala, 0));
}

export function iniciarFondo(canvas) {
  const movil = window.innerWidth < 700;
  const calma = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 600);
  camara.position.z = 30;

  const brillo = texturaBrillo();

  // ---------- Estrellas (con parpadeo por shader) ----------
  const N = movil ? 1400 : 3000;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const tam = new Float32Array(N);
  const fase = new Float32Array(N);
  const color = new THREE.Color();
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 400;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 300;
    pos[i * 3 + 2] = -Math.random() * 250 - 10;
    color.set(COLORES_ESTRELLA[Math.floor(Math.random() * COLORES_ESTRELLA.length)]);
    col.set([color.r, color.g, color.b], i * 3);
    tam[i] = Math.random() < 0.06 ? 3 + Math.random() * 3 : 0.8 + Math.random() * 1.6;
    fase[i] = Math.random() * Math.PI * 2;
  }
  const geoEstrellas = new THREE.BufferGeometry();
  geoEstrellas.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geoEstrellas.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
  geoEstrellas.setAttribute("aSize", new THREE.BufferAttribute(tam, 1));
  geoEstrellas.setAttribute("aPhase", new THREE.BufferAttribute(fase, 1));
  const matEstrellas = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uTex: { value: brillo }, uPR: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute vec3 aColor; attribute float aSize; attribute float aPhase;
      uniform float uTime; uniform float uPR;
      varying vec3 vColor; varying float vAlpha;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 0.55 + 0.45 * sin(uTime * (0.8 + fract(aPhase) * 1.5) + aPhase);
        gl_PointSize = aSize * uPR * (0.7 + 0.5 * tw) * (260.0 / -mv.z) * 2.5;
        vColor = aColor; vAlpha = tw;
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTex; varying vec3 vColor; varying float vAlpha;
      void main() {
        float a = texture2D(uTex, gl_PointCoord).a;
        gl_FragColor = vec4(vColor, a * vAlpha);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const estrellas = new THREE.Points(geoEstrellas, matEstrellas);
  escena.add(estrellas);

  // ---------- Constelación con las iniciales ----------
  const NC = movil ? 260 : 420;
  const anchoTexto = movil ? 17 : 30;
  const destinos = puntosDeTexto("D ♥ D", NC, anchoTexto);
  const nc = destinos.length;
  const origenes = destinos.map(() => new THREE.Vector3((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30));
  const posC = new Float32Array(nc * 3);
  const geoC = new THREE.BufferGeometry();
  geoC.setAttribute("position", new THREE.BufferAttribute(posC, 3));
  const matC = new THREE.PointsMaterial({
    size: movil ? 0.45 : 0.55,
    map: brillo,
    color: 0xffd6e4,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0,
  });
  const constelacion = new THREE.Group();
  constelacion.position.y = movil ? 7 : 5;
  constelacion.add(new THREE.Points(geoC, matC));

  // Líneas entre estrellas cercanas, como una constelación
  const pares = [];
  const umbral = anchoTexto * 0.018;
  for (let i = 0; i < nc && pares.length < 500; i++) {
    let enlaces = 0;
    for (let j = i + 1; j < nc && enlaces < 2; j++) {
      if (destinos[i].distanceTo(destinos[j]) < umbral) {
        pares.push(i, j);
        enlaces++;
      }
    }
  }
  const posL = new Float32Array(pares.length * 3);
  const geoL = new THREE.BufferGeometry();
  geoL.setAttribute("position", new THREE.BufferAttribute(posL, 3));
  const matL = new THREE.LineBasicMaterial({ color: 0xff8fb1, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  constelacion.add(new THREE.LineSegments(geoL, matL));
  escena.add(constelacion);

  let formacion = 0; // 0 = dispersa, 1 = formada
  let formarDesde = null;

  // ---------- Corazones flotando ----------
  escena.add(new THREE.AmbientLight(0xffffff, 0.7));
  const luz = new THREE.PointLight(0xffc6d7, 400, 120);
  luz.position.set(10, 10, 30);
  escena.add(luz);

  const geoCorazon = geometriaCorazon();
  const corazones = [];
  function crearCorazon(x, y, z, rapido = false) {
    const tono = COLORES_CORAZON[Math.floor(Math.random() * COLORES_CORAZON.length)];
    const mat = new THREE.MeshStandardMaterial({
      color: tono,
      emissive: tono,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const m = new THREE.Mesh(geoCorazon, mat);
    const s = 0.5 + Math.random() * 0.9;
    m.scale.setScalar(s);
    m.position.set(x, y, z);
    m.userData = {
      vel: (rapido ? 6 : 0.8) + Math.random() * (rapido ? 6 : 1.2),
      giro: (Math.random() - 0.5) * 1.2,
      fase: Math.random() * Math.PI * 2,
      temporal: rapido,
      vida: 0,
    };
    escena.add(m);
    corazones.push(m);
    return m;
  }
  const NH = movil ? 12 : 24;
  for (let i = 0; i < NH; i++) {
    crearCorazon((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 50, -Math.random() * 40);
  }

  // ---------- Estrellas fugaces ----------
  const fugaces = [];
  const matFugaz = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  function lanzarFugaz() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array([1, 0.9, 0.95, 0.1, 0.05, 0.2]), 3));
    const linea = new THREE.Line(geo, matFugaz);
    const inicio = new THREE.Vector3((Math.random() - 0.2) * 120, 30 + Math.random() * 20, -60 - Math.random() * 40);
    const dir = new THREE.Vector3(-1 - Math.random(), -0.5 - Math.random() * 0.5, 0).normalize();
    linea.userData = { inicio, dir, t: 0 };
    escena.add(linea);
    fugaces.push(linea);
  }
  let proximaFugaz = 2;

  // ---------- Interacción ----------
  const raton = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    raton.x = e.clientX / window.innerWidth - 0.5;
    raton.y = e.clientY / window.innerHeight - 0.5;
  });
  window.addEventListener("resize", () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  });

  // ---------- Animación ----------
  const reloj = new THREE.Clock();
  const tmp = new THREE.Vector3();
  function animar() {
    const dt = Math.min(reloj.getDelta(), 0.05) * (calma ? 0.3 : 1);
    const t = reloj.elapsedTime;
    matEstrellas.uniforms.uTime.value = t;

    const scroll = window.scrollY / window.innerHeight;
    camara.position.x += (raton.x * 4 - camara.position.x) * 0.03;
    camara.position.y += (-raton.y * 3 - scroll * 4 - camara.position.y) * 0.05;
    camara.lookAt(0, -scroll * 4, 0);
    estrellas.rotation.z = t * 0.004;

    // Constelación: se forma, respira y se desvanece al bajar
    if (formarDesde !== null) formacion = Math.min(1, (t - formarDesde) / 3.5);
    const e = 1 - Math.pow(1 - formacion, 3);
    for (let i = 0; i < nc; i++) {
      const d = destinos[i], o = origenes[i];
      tmp.lerpVectors(o, d, e);
      tmp.x += Math.sin(t * 0.8 + i) * 0.06;
      tmp.y += Math.cos(t * 0.7 + i * 1.3) * 0.06;
      posC[i * 3] = tmp.x;
      posC[i * 3 + 1] = tmp.y;
      posC[i * 3 + 2] = tmp.z;
    }
    for (let k = 0; k < pares.length; k++) {
      const i = pares[k];
      posL[k * 3] = posC[i * 3];
      posL[k * 3 + 1] = posC[i * 3 + 1];
      posL[k * 3 + 2] = posC[i * 3 + 2];
    }
    geoC.attributes.position.needsUpdate = true;
    geoL.attributes.position.needsUpdate = true;
    const visibleC = Math.max(0, 1 - scroll * 1.3);
    matC.opacity = (0.35 + 0.65 * e) * visibleC * (formarDesde === null ? 0.5 : 1);
    matL.opacity = e * e * 0.35 * visibleC * (0.75 + 0.25 * Math.sin(t * 2));
    constelacion.rotation.y = Math.sin(t * 0.3) * 0.12;
    constelacion.position.y = (movil ? 7 : 5) - scroll * 4;

    // Corazones
    for (let i = corazones.length - 1; i >= 0; i--) {
      const m = corazones[i];
      const u = m.userData;
      u.vida += dt;
      m.position.y += u.vel * dt;
      m.position.x += Math.sin(t * 0.6 + u.fase) * 0.01;
      m.rotation.y += u.giro * dt;
      m.rotation.z = Math.sin(t + u.fase) * 0.25;
      const limite = camara.position.y + 32;
      if (u.temporal) {
        m.material.opacity = Math.max(0, 0.95 - u.vida * 0.25);
        if (u.vida > 4) {
          escena.remove(m);
          m.material.dispose();
          corazones.splice(i, 1);
        }
      } else if (m.position.y > limite) {
        m.position.y = camara.position.y - 32;
        m.position.x = (Math.random() - 0.5) * 70;
      } else if (m.position.y < camara.position.y - 40) {
        m.position.y = camara.position.y - 32;
      }
    }

    // Estrellas fugaces
    proximaFugaz -= dt;
    if (proximaFugaz <= 0) {
      lanzarFugaz();
      proximaFugaz = 4 + Math.random() * 7;
    }
    for (let i = fugaces.length - 1; i >= 0; i--) {
      const f = fugaces[i];
      const u = f.userData;
      u.t += dt;
      const cabeza = u.inicio.clone().addScaledVector(u.dir, u.t * 90);
      const cola = cabeza.clone().addScaledVector(u.dir, -14);
      f.geometry.attributes.position.array.set([cabeza.x, cabeza.y, cabeza.z, cola.x, cola.y, cola.z]);
      f.geometry.attributes.position.needsUpdate = true;
      if (u.t > 1.6) {
        escena.remove(f);
        f.geometry.dispose();
        fugaces.splice(i, 1);
      }
    }

    renderer.render(escena, camara);
    requestAnimationFrame(animar);
  }
  animar();

  return {
    // Las estrellas se juntan para formar "D ♥ D"
    formarConstelacion() {
      if (formarDesde === null) formarDesde = reloj.elapsedTime;
    },
    // Explosión de corazones (easter egg)
    lluviaDeCorazones(cantidad = 40) {
      for (let i = 0; i < cantidad; i++) {
        crearCorazon((Math.random() - 0.5) * 50, camara.position.y - 25 - Math.random() * 10, -Math.random() * 15 + 5, true);
      }
    },
  };
}
