// BOTÓN "DISCOVER MY ART"
const discoverBtn = document.getElementById("discoverBtn");
const worksSection = document.getElementById("works");

function showWorks() {
  document.body.classList.add("show-works");
  if (worksSection) {
    worksSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function showHeroAgainIfAtTop() {
  // Si estás arriba del todo, vuelve a mostrar el hero
  if (window.scrollY <= 10) {
    document.body.classList.remove("show-works");
  }
}

if (discoverBtn) {
  discoverBtn.addEventListener("click", showWorks);
}

// Cuando el usuario hace scroll, si vuelve arriba, reaparece el hero
window.addEventListener("scroll", showHeroAgainIfAtTop, { passive: true });

// También al cargar la página (por si recargas estando arriba)
showHeroAgainIfAtTop();

// Año footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// =========================
// WORKS CAROUSEL (autoplay + draggable thumb)
// =========================
const track = document.getElementById("worksTrack");

let rafId = null;
let lastTime = null;
let autoplay = true;

// velocidad base (px/seg)
const BASE_SPEED = 60;

// drag thumb
let isThumbDragging = false;
let dragStartX = 0;
let thumbStartLeft = 0;

// drag track (arrastrar carrusel con ratón)
let isTrackDragging = false;
let trackDragStartX = 0;
let trackScrollStart = 0;

// Helpers
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function maxScrollLeft() {
  return Math.max(0, track.scrollWidth - track.clientWidth);
}



function updateThumb() {
  const maxScroll = maxScrollLeft();
  const barWidth = scrollbar.clientWidth;

  // tamaño del thumb proporcional al contenido visible
  const ratioVisible = track.clientWidth / track.scrollWidth;
  const thumbWidth = clamp(barWidth * ratioVisible, 50, barWidth);
  thumb.style.width = `${thumbWidth}px`;

  const maxThumbLeft = barWidth - thumbWidth;
  const progress = maxScroll === 0 ? 0 : track.scrollLeft / maxScroll;
  const left = progress * maxThumbLeft;

  thumb.style.left = `${left}px`;
}

function setScrollFromThumbLeft(thumbLeftPx) {
  const barWidth = scrollbar.clientWidth;
  const thumbWidth = thumb.getBoundingClientRect().width;
  const maxThumbLeft = Math.max(0, barWidth - thumbWidth);
  const left = clamp(thumbLeftPx, 0, maxThumbLeft);

  const maxScroll = maxScrollLeft();
  const progress = maxThumbLeft === 0 ? 0 : left / maxThumbLeft;

  track.scrollLeft = progress * maxScroll;
}

// Autoplay loop (sin saltos, continuo)
function tick(ts) {
  if (!lastTime) lastTime = ts;
  const dt = (ts - lastTime) / 1000;
  lastTime = ts;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (autoplay && !reduceMotion && !isThumbDragging && !isTrackDragging) {
    track.scrollLeft += BASE_SPEED * dt;

    // loop: cuando llega al final, vuelve al inicio suavemente
   const half = track.scrollWidth / 2;
if (track.scrollLeft >= half) {
  track.scrollLeft -= half;
}

  }

  updateThumb();
  rafId = requestAnimationFrame(tick);
}

// Eventos
function initCarousel() {
  if (!track || !scrollbar || !thumb) return;

    // Duplicar slides para loop continuo (sin salto)
if (!track.dataset.looped) {
  track.innerHTML += track.innerHTML;
  track.dataset.looped = "true";
}


  updateThumb();
  window.addEventListener("resize", updateThumb);

  // Mantener thumb sincronizado si alguien hace scroll con trackpad
  track.addEventListener("scroll", updateThumb, { passive: true });

  // Click en la barra: mover el thumb (y el carrusel) a esa posición
  scrollbar.addEventListener("pointerdown", (e) => {
    if (e.target === thumb) return; // lo gestiona el drag del thumb
    autoplay = false;
    const barRect = scrollbar.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const targetLeft = (e.clientX - barRect.left) - (thumbRect.width / 2);
    setScrollFromThumbLeft(targetLeft);
    updateThumb();
  });

  // Drag del thumb (control directo del carrusel)
  thumb.addEventListener("pointerdown", (e) => {
    isThumbDragging = true;
    autoplay = false;
    thumb.setPointerCapture(e.pointerId);

    const thumbRect = thumb.getBoundingClientRect();
    dragStartX = e.clientX;
    thumbStartLeft = thumbRect.left - scrollbar.getBoundingClientRect().left;
  });

  thumb.addEventListener("pointermove", (e) => {
    if (!isThumbDragging) return;
    const dx = e.clientX - dragStartX;
    setScrollFromThumbLeft(thumbStartLeft + dx);
    updateThumb();
  });

  thumb.addEventListener("pointerup", (e) => {
    if (!isThumbDragging) return;
    isThumbDragging = false;
    try { thumb.releasePointerCapture(e.pointerId); } catch {}
    autoplay = true;
  });

  thumb.addEventListener("pointercancel", () => {
    isThumbDragging = false;
    autoplay = true;
  });

  // Drag del carrusel con ratón
  track.addEventListener("pointerdown", (e) => {
    isTrackDragging = true;
    autoplay = false;
    track.setPointerCapture(e.pointerId);

    trackDragStartX = e.clientX;
    trackScrollStart = track.scrollLeft;
  });

  track.addEventListener("pointermove", (e) => {
    if (!isTrackDragging) return;
    const dx = e.clientX - trackDragStartX;
    track.scrollLeft = trackScrollStart - dx; // arrastras a derecha -> se mueve a izquierda
  });

  track.addEventListener("pointerup", (e) => {
    if (!isTrackDragging) return;
    isTrackDragging = false;
    try { track.releasePointerCapture(e.pointerId); } catch {}
    autoplay = true;
  });

  track.addEventListener("pointercancel", () => {
    isTrackDragging = false;
    autoplay = true;
  });

  rafId = requestAnimationFrame(tick);
}

initCarousel();






