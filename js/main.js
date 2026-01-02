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

// =========================
// WORKS: PROJECT MODAL
// =========================

const modal = document.getElementById("projectModal");
const projImage = document.getElementById("projImage");
const projTitle = document.getElementById("projTitle");
const projDesc  = document.getElementById("projDesc");
const imgCounter = document.getElementById("imgCounter");

const btnClose = document.getElementById("projClose");
const btnPrevProj = document.getElementById("projPrev");
const btnNextProj = document.getElementById("projNext");
const btnPrevImg = document.getElementById("imgPrev");
const btnNextImg = document.getElementById("imgNext");

// 1) Define aquí tus proyectos (puedes cambiar títulos, textos, y rutas)
const projects = [
  {
    title: "Learning by Play",
    desc: "This project explores how playful illustration can become a tool for learning and emotional development. Through simple characters and symbolic actions, it investigates curiosity, experimentation, and how visual narratives help communicate complex ideas in an accessible, human, and intuitive way.",
    images: ["assets/works/project1/image1.jpg", "assets/works/project1/image_2_1.png", "assets/works/project1/image_3_1.png"]
  },
  {
    title: "Human Scale",
    desc: "A visual research project focused on the relationship between the human body and everyday objects. It reflects on scale, presence, and pause, questioning how ordinary environments influence our awareness, vulnerability, and sense of self within spaces designed more for function than emotion.",
    images: ["assets/works/project2/image2.jpg", "assets/works/project2/image_2_2.png", "assets/works/project2/image_3_2.png"]
  },
  {
    title: "Instructions for Living",
    desc: "This project reimagines instruction manuals as a metaphor for human behavior. Using humor and repetition, it questions how we follow rules, interpret symbols, and seek direction, turning standardized systems into playful narratives about control, choice, and everyday decision-making.",
    images: ["assets/works/project3/image3.jpg", "assets/works/project3/image_2_3.png", "assets/works/project3/image_3_3.png"]
  },
  {
    title: "Objects with Memory",
    desc: "A project centered on packaging as storytelling. It explores how materials, illustration, and typography can transform simple products into emotional artifacts, emphasizing craft, nostalgia, and the idea that objects can carry identity, memory, and personal connection beyond their practical use.",
    images: ["assets/works/project4/image4.jpg", "assets/works/project4/image_2_4.png", "assets/works/project4/image_3_4.png"]
  },
  {
    title: "Pattern as Language",
    desc: "This project investigates pattern as a form of communication rather than decoration. Through color, repetition, and form, it explores how abstract surfaces can convey rhythm, emotion, and structure, inviting viewers to read design intuitively instead of intellectually.",
    images: ["assets/works/project5/image5.jpg", "assets/works/project5/image_2_5.png", "assets/works/project5/image_3_5.png"]
  },
  {
    title: "Constructed Identity",
    desc: "This project explores how identity is built through visual and symbolic elements. It investigates the interplay between personal expression, cultural references, and design choices, questioning how we construct ourselves through the objects we surround ourselves with.",
    images: ["assets/works/project6/image6.jpg", "assets/works/project6/image_2_6.png", "assets/works/project6/image_3_6.png"]
  },
  {
    title: "Everyday Rituals",
    desc: "A project exploring the significance of everyday actions and routines in shaping our identity and emotional well-being. It investigates how small, repeated gestures can become meaningful expressions of self, reflecting personal values and cultural practices.",
    images: ["assets/works/project7/image7.jpg", "assets/works/project7/image_2_7.png", "assets/works/project7/image_3_7.png"]
  },
  {
    title: "Playful Systems",
    desc: "A project that explores systems through play. By simplifying structures and rules into visual elements, it questions how people interact with frameworks, constraints, and logic, suggesting that experimentation and humor can offer alternative ways to understand order, efficiency, and participation.",
    images: ["assets/works/project8/image8.jpg", "assets/works/project8/image_2_8.png", "assets/works/project8/image_3_8.png"]
  },
  {
    title: "Tactile Futures",
    desc: "This project investigates the role of touch, texture, and materiality in a digital-forward world. It proposes design as a sensory experience, emphasizing physical interaction, crafted surfaces, and material experimentation as a way to reconnect users with objects beyond screens.",
    images: ["assets/works/project9/image9.jpg", "assets/works/project9/image_2_9.png", "assets/works/project9/image_3_9.png"]
  },
  {
    title: "Personal Mythologies",
    desc: "A conceptual project centered on self-narrative. It explores how individuals construct personal myths through objects, style, and visual expression, blending reality and fiction to examine identity as an evolving story shaped by memory, desire, and cultural influence.",
    images: ["assets/works/project10/image10.jpg", "assets/works/project10/image_2_10.png", "assets/works/project10/image_3_10.png"]
  }
];

let currentProject = 0;
let currentImage = 0;

function openModal(projectIndex) {
  currentProject = projectIndex;
  currentImage = 0;

  renderProject();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // Evitar scroll del fondo
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderProject() {
  const p = projects[currentProject];
  projTitle.textContent = p.title;
  projDesc.textContent = p.desc;

  const imgSrc = p.images[currentImage];
  projImage.src = imgSrc;

  imgCounter.textContent = `${currentImage + 1} / ${p.images.length}`;
}

function prevProject() {
  currentProject = (currentProject - 1 + projects.length) % projects.length;
  currentImage = 0;
  renderProject();
}

function nextProject() {
  currentProject = (currentProject + 1) % projects.length;
  currentImage = 0;
  renderProject();
}

function prevImage() {
  const p = projects[currentProject];
  currentImage = (currentImage - 1 + p.images.length) % p.images.length;
  renderProject();
}

function nextImage() {
  const p = projects[currentProject];
  currentImage = (currentImage + 1) % p.images.length;
  renderProject();
}

// Click en slides
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".work-card");
  if (!btn) return;

  const idx = Number(btn.dataset.project);
  if (Number.isNaN(idx)) return;

  openModal(idx);
});

// Cerrar: botón, overlay
btnClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  const closeTarget = e.target.closest("[data-close='true']");
  if (closeTarget) closeModal();
});

// Navegación proyectos
btnPrevProj?.addEventListener("click", prevProject);
btnNextProj?.addEventListener("click", nextProject);


// Navegación imágenes dentro del proyecto
btnPrevImg?.addEventListener("click", prevImage);
btnNextImg?.addEventListener("click", nextImage);

// Teclado: ESC y flechas
window.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") prevProject();
  if (e.key === "ArrowRight") nextProject();

  // Opcional: dentro del proyecto con ↑ ↓
  if (e.key === "ArrowUp") prevImage();
  if (e.key === "ArrowDown") nextImage();
});



console.log("main.js cargado ✅");

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".work-card");
  if (btn) console.log("CLICK en work-card, proyecto:", btn.dataset.project);
});









