// =========================
// HERO: botón "Discover my art" + volver a mostrar hero al subir arriba
// =========================
(() => {
  const discoverBtn = document.getElementById("discoverBtn");
  const worksSection = document.getElementById("works");

  function showWorks() {
    document.body.classList.add("show-works");
    worksSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showHeroAgainIfAtTop() {
    if (window.scrollY <= 10) document.body.classList.remove("show-works");
  }

  discoverBtn?.addEventListener("click", showWorks);
  window.addEventListener("scroll", showHeroAgainIfAtTop, { passive: true });
  showHeroAgainIfAtTop();

  // =========================
  // Footer: año automático
  // =========================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // =========================
  // WORKS CAROUSEL: autoplay + loop con transform
  // =========================
  window.addEventListener("load", () => {
    const track = document.getElementById("worksTrack");
    if (!track) return;

    if (track.dataset.looped !== "true") {
      track.innerHTML += track.innerHTML;
      track.dataset.looped = "true";
    }

    let pos = 0;
    const SPEED = 60;
    let last = null;

    const reduceMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const halfWidth = () => track.scrollWidth / 2;

    function tick(ts) {
      if (last === null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;

      if (!reduceMotion()) {
        pos += SPEED * dt;
        const half = halfWidth();
        if (half > 0 && pos >= half) pos -= half;
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
  const projDesc = document.getElementById("projDesc");
  const imgCounter = document.getElementById("imgCounter");

  const btnClose = document.getElementById("projClose");
  const btnPrevProj = document.getElementById("projPrev");
  const btnNextProj = document.getElementById("projNext");
  const btnPrevImg = document.getElementById("imgPrev");
  const btnNextImg = document.getElementById("imgNext");

  const projects = [
    {
      title: "Learning by Play",
      desc: "This project explores how playful illustration can become a tool for learning and emotional development...",
      images: [
        "assets/works/project1/image1.jpg",
        "assets/works/project1/image_2_1.png",
        "assets/works/project1/image_3_1.png",
      ],
    },
    {
      title: "Human Scale",
      desc: "A visual research project focused on the relationship between the human body and everyday objects...",
      images: [
        "assets/works/project2/image2.jpg",
        "assets/works/project2/image_2_2.png",
        "assets/works/project2/image_3_2.png",
      ],
    },
    {
      title: "Instructions for Living",
      desc: "This project reimagines instruction manuals as a metaphor for human behavior...",
      images: [
        "assets/works/project3/image3.jpg",
        "assets/works/project3/image_2_3.png",
        "assets/works/project3/image_3_3.png",
      ],
    },
    {
      title: "Objects with Memory",
      desc: "A project centered on packaging as storytelling...",
      images: [
        "assets/works/project4/image4.jpg",
        "assets/works/project4/image_2_4.png",
        "assets/works/project4/image_3_4.png",
      ],
    },
    {
      title: "Pattern as Language",
      desc: "This project investigates pattern as a form of communication rather than decoration...",
      images: [
        "assets/works/project5/image5.jpg",
        "assets/works/project5/image_2_5.png",
        "assets/works/project5/image_3_5.png",
      ],
    },
    {
      title: "Constructed Identity",
      desc: "This project explores how identity is built through visual and symbolic elements...",
      images: [
        "assets/works/project6/image6.jpg",
        "assets/works/project6/image_2_6.png",
        "assets/works/project6/image_3_6.png",
      ],
    },
    {
      title: "Everyday Rituals",
      desc: "A project exploring the significance of everyday actions and routines...",
      images: [
        "assets/works/project7/image7.jpg",
        "assets/works/project7/image_2_7.png",
        "assets/works/project7/image_3_7.png",
      ],
    },
    {
      title: "Playful Systems",
      desc: "A project that explores systems through play...",
      images: [
        "assets/works/project8/image8.jpg",
        "assets/works/project8/image_2_8.png",
        "assets/works/project8/image_3_8.png",
      ],
    },
    {
      title: "Tactile Futures",
      desc: "This project investigates the role of touch, texture, and materiality in a digital-forward world...",
      images: [
        "assets/works/project9/image9.jpg",
        "assets/works/project9/image_2_9.png",
        "assets/works/project9/image_3_9.png",
      ],
    },
    {
      title: "Personal Mythologies",
      desc: "A conceptual project centered on self-narrative...",
      images: [
        "assets/works/project10/image10.jpg",
        "assets/works/project10/image_2_10.png",
        "assets/works/project10/image_3_10.png",
      ],
    },
  ];

  let currentProject = 0;
  let currentImage = 0;

  function renderProject() {
    const p = projects[currentProject];
    if (!p) return;

    if (projTitle) projTitle.textContent = p.title;
    if (projDesc) projDesc.textContent = p.desc;

    if (projImage) projImage.src = p.images[currentImage];
    if (imgCounter) imgCounter.textContent = `${currentImage + 1} / ${p.images.length}`;
  }

  function openModal(projectIndex) {
    if (!modal) return;

    currentProject = projectIndex;
    currentImage = 0;
    renderProject();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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

  // Abrir modal (delegación)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".work-card");
    if (!btn) return;

    const idx = Number(btn.dataset.project);
    if (Number.isNaN(idx)) return;

    openModal(idx);
  });

  // Cerrar: botón y overlay
  btnClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) closeModal();
  });

  // Navegación
  btnPrevProj?.addEventListener("click", prevProject);
  btnNextProj?.addEventListener("click", nextProject);
  btnPrevImg?.addEventListener("click", prevImage);
  btnNextImg?.addEventListener("click", nextImage);

  // Teclado
  window.addEventListener("keydown", (e) => {
    if (!modal?.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();

    // Proyectos con ← →
    if (e.key === "ArrowLeft") prevProject();
    if (e.key === "ArrowRight") nextProject();

    // Imágenes con ↑ ↓
    if (e.key === "ArrowUp") prevImage();
    if (e.key === "ArrowDown") nextImage();
  });

  // =========================
  // ABOUT mobile toggle
  // =========================
  const aboutBtn = document.querySelector(".about-btn");
  const aboutText = document.querySelector(".about-text");

  if (aboutBtn && aboutText) {
    aboutBtn.addEventListener("click", () => {
      const isOpen = aboutText.classList.toggle("is-open");
      aboutBtn.setAttribute("aria-expanded", String(isOpen));
      aboutBtn.textContent = isOpen ? "Close" : "Meet me";
    });
  }
})();

// =========================
  // PROGRAMS
  // =========================

document.querySelectorAll(".program-chip").forEach((chip) => {
  const level = Number(chip.dataset.level || 0);
  chip.style.setProperty("--level", String(Math.max(0, Math.min(100, level))));
});











