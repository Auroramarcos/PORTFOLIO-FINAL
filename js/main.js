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
    title: "Project 01",
    desc: "Descripción breve del proyecto. Qué hiciste, idea, técnica, etc.",
    images: ["assets/works/project1/image1.jpg", "assets/works/project1/image_2_1.png", "assets/works/project1/image_3_1.png"]
  },
  {
    title: "Project 02",
    desc: "Descripción breve del proyecto 02.",
    images: ["assets/works/project2/image2.jpg", "assets/works/project2/image_2_2.png", "assets/works/project2/image_3_2.png"]
  },
  {
    title: "Project 03",
    desc: "Descripción breve del proyecto 03.",
    images: ["assets/works/project3/image3.jpg", "assets/works/project3/image_2_3.png", "assets/works/project3/image_3_3.png"]
  },
  {
    title: "Project 04",
    desc: "Descripción breve del proyecto 04.",
    images: ["assets/works/project4/image4.jpg", "assets/works/project4/image_2_4.png", "assets/works/project4/image_3_4.png"]
  },
  {
    title: "Project 05",
    desc: "Descripción breve del proyecto 05.",
    images: ["assets/works/project5/image5.jpg", "assets/works/project5/image_2_5.png", "assets/works/project5/image_3_5.png"]
  },
  {
    title: "Project 06",
    desc: "Descripción breve del proyecto 06.",
    images: ["assets/works/project6/image6.jpg", "assets/works/project6/image_2_6.png", "assets/works/project6/image_3_6.png"]
  },
  {
    title: "Project 07",
    desc: "Descripción breve del proyecto 07.",
    images: ["assets/works/project7/image7.jpg", "assets/works/project7/image_2_7.png", "assets/works/project7/image_3_7.png"]
  },
  {
    title: "Project 08",
    desc: "Descripción breve del proyecto 08.",
    images: ["assets/works/project8/image8.jpg", "assets/works/project8/image_2_8.png", "assets/works/project8/image_3_8.png"]
  },
  {
    title: "Project 09",
    desc: "Descripción breve del proyecto 09.",
    images: ["assets/works/project9/image9.jpg", "assets/works/project9/image_2_9.png", "assets/works/project9/image_3_9.png"]
  },
  {
    title: "Project 10",
    desc: "Descripción breve del proyecto 10.",
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

if (btnPrevProj) {
  btnPrevProj.addEventListener("click", () => {
    currentProject = (currentProject - 1 + projects.length) % projects.length;
    currentImage = 0;
    renderProject(); // ⚠️ si en tu código se llama distinto, cambia esta línea
  });
}


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









