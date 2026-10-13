# 💖 Daniel & Dulce

Web hecha con HTML, CSS, JavaScript y Three.js (desde CDN). No necesita instalar nada ni compilar.

## ✏️ Cómo editar el contenido

**Todo se edita en `js/datos.js`**: textos, cartas, razones, fechas, lugares, sueños y canción.

- **Fotos**: ponlas en `img/galeria/` (de preferencia `.webp`, de ~1600 px de ancho y comprimidas en https://squoosh.app) y cambia las rutas en `galeria`. Puedes borrar los `ejemplo*.svg`.
- **Canción**: copia el `.mp3` a `musica/` y escribe `archivo: "musica/tu-cancion.mp3"`, o pega el enlace de inserción de Spotify en `spotify`.
- **Lugares**: en Google Maps, clic derecho sobre el lugar y copia las coordenadas (lat, lng).

## 🔒 Trivia de entrada

En lugar de contraseña, para entrar Dulce tiene que **completar frases de su historia** una por una. Cada acierto enciende un corazón; si se equivoca dos veces le aparece una pista.
Las frases, respuestas y pistas se editan en `trivia` dentro de `js/datos.js` (pon `___` donde va la palabra que falta). No importan mayúsculas ni acentos.

> Es una puerta bonita, no seguridad real: no subas nada muy privado.

## 🎂 Sorpresa de cumpleaños

El **16 de octubre** la web muestra la sorpresa automáticamente: mensaje, pastel con velas para soplar y fuegos artificiales.
Para probarla otro día, agrega `?cumple` al final de la URL, por ejemplo `https://tu-web.vercel.app/?cumple`.

## 👀 Verla en tu computadora

```bash
cd daniel-y-dulce
python3 -m http.server 8000
```
Y abre http://localhost:8000. Si abres el `index.html` con doble clic no funciona, porque los módulos de JavaScript necesitan un servidor.

## 🚀 Publicar en Vercel

1. Crea un repositorio **privado** en GitHub y sube esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Nuestra web"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/daniel-y-dulce.git
   git push -u origin main
   ```
2. Entra a https://vercel.com, inicia sesión con GitHub y elige **Add New → Project**.
3. Importa el repositorio. Framework Preset: **Other**. No cambies nada más y dale a **Deploy**.
4. Listo. Cada `git push` actualiza la web automáticamente.

En *Settings → Domains* puedes cambiar el nombre, por ejemplo `daniel-y-dulce.vercel.app`.

## 🤫 Easter eggs

- Escribe **teamo** en el teclado para que salga una lluvia de corazones.
- Toca el ♥ del pie de página.
- Al marcar un sueño como cumplido también salen corazones.
