// =========================
// HERO: botón "Discover my art" + volver a mostrar hero al subir arriba
// =========================
const discoverBtn = document.getElementById("discoverBtn");
const worksSection = document.getElementById("works");

function showWorks() {
  document.body.classList.add("show-works");
  if (worksSection) {
    worksSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function showHeroAgainIfAtTop() {
  if (window.scrollY <= 10) {
    document.body.classList.remove("show-works");
  }
}

if (discoverBtn) discoverBtn.addEventListener("click", showWorks);
window.addEventListener("scroll", showHeroAgainIfAtTop, { passive: true });
showHeroAgainIfAtTop();

// =========================
// Footer: año automático
// =========================
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// =========================
// WORKS CAROUSEL: autoplay + loop con transform (ultra estable)
// =========================
window.addEventListener("load", () => {
  const track = document.getElementById("worksTrack");
  if (!track) return;

  // Duplicamos una sola vez para loop infinito
  if (track.dataset.looped !== "true") {
    track.innerHTML += track.innerHTML;
    track.dataset.looped = "true";
  }

  let pos = 0;              // posición en px
  const SPEED = 60;         // px/seg (sube/baja a gusto)
  let last = null;

  // Ancho de la mitad (el “original”), para reset sin salto
  function halfWidth() {
    return track.scrollWidth / 2;
  }

  function tick(ts) {
    if (last === null) last = ts;
    const dt = (ts - last) / 1000;
    last = ts;

    // Si el usuario prefiere menos movimiento, no autoplay
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      pos += SPEED * dt;

      const half = halfWidth();
      if (half > 0 && pos >= half) pos -= half;

      // Mueve hacia la IZQUIERDA (contenido va “corriendo”)
      track.style.transform = `translateX(-${pos}px)`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});









