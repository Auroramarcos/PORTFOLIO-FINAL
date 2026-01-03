/* =========================================================
   GLOBAL WRAPPER
========================================================= */
(() => {

  /* =========================================================
     HERO – Discover button + show hero on scroll top
  ========================================================= */
  const discoverBtn = document.getElementById("discoverBtn");
  const worksSection = document.getElementById("works");

  const showWorks = () => {
    document.body.classList.add("show-works");
    worksSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showHeroIfTop = () => {
    if (window.scrollY <= 10) {
      document.body.classList.remove("show-works");
    }
  };

  discoverBtn?.addEventListener("click", showWorks);
  window.addEventListener("scroll", showHeroIfTop, { passive: true });
  showHeroIfTop();


  /* =========================================================
     FOOTER – Current year
  ========================================================= */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* =========================================================
     WORKS CAROUSEL – Infinite autoplay track
  ========================================================= */
  window.addEventListener("load", () => {
    const track = document.getElementById("worksTrack");
    if (!track) return;

    if (track.dataset.looped !== "true") {
      track.innerHTML += track.innerHTML;
      track.dataset.looped = "true";
    }

    let position = 0;
    let lastTime = null;
    const SPEED = 60;

    const prefersReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getHalfWidth = () => track.scrollWidth / 2;

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      if (!prefersReducedMotion()) {
        position += SPEED * delta;
        const half = getHalfWidth();
        if (half && position >= half) position -= half;
        track.style.transform = `translateX(-${position}px)`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });


  /* =========================================================
     PROJECT MODAL – Elements & State
  ========================================================= */
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

  let currentProject = 0;
  let currentImage = 0;


  /* =========================================================
     PROJECT DATA
  ========================================================= */
  const projects = [
    {
      title: "Learning by Play",
      desc: "This project explores how playful illustration can function as a powerful tool for learning and emotional development. Through characters, visual narratives, and interactive compositions, it reflects on how play encourages curiosity, experimentation, imagination, and personal growth, highlighting learning as an intuitive and affective process rather than a rigid or instructional one.",
      images: [
        "assets/works/project1/image1.jpg",
        "assets/works/project1/image_2_1.png",
        "assets/works/project1/image_3_1.png",
      ],
    },
    {
      title: "Human Scale",
      desc: "A visual research project focused on the relationship between the human body and everyday objects. By altering proportions, perspectives, and spatial relationships, the project questions how scale influences perception, usability, and emotional connection, encouraging viewers to reconsider their physical presence in relation to the designed world around them.",
      images: [
        "assets/works/project2/image2.jpg",
        "assets/works/project2/image_2_2.png",
        "assets/works/project2/image_3_2.png",
      ],
    },
    {
      title: "Instructions for Living",
      desc: "This project reimagines instruction manuals as a metaphor for human behavior and social structures. Using visual language inspired by technical guides, diagrams, and symbols, it reflects on how rules, routines, and expectations shape everyday life, revealing the tension between individual freedom and collective norms.",
      images: [
        "assets/works/project3/image3.jpg",
        "assets/works/project3/image_2_3.png",
        "assets/works/project3/image_3_3.png",
      ],
    },
    {
      title: "Objects with Memory",
      desc: "A project centered on packaging as a narrative and emotional medium. Each object is treated as a container of memories, experiences, and personal meaning, transforming ordinary packaging into a storytelling device that connects material design with identity, nostalgia, and the passage of time.",
      images: [
        "assets/works/project4/image4.jpg",
        "assets/works/project4/image_2_4.png",
        "assets/works/project4/image_3_4.png",
      ],
    },
    {
      title: "Pattern as Language",
      desc: "This project investigates pattern as a form of communication rather than mere decoration. Through repetition, rhythm, and variation, patterns are used to convey meaning, emotion, and identity, exploring how visual systems can operate as a non-verbal language capable of expressing complex concepts and cultural references.",
      images: [
        "assets/works/project5/image5.jpg",
        "assets/works/project5/image_2_5.png",
        "assets/works/project5/image_3_5.png",
      ],
    },
    {
      title: "Constructed Identity",
      desc: "This project explores identity as a constructed and evolving system shaped by visual, cultural, and symbolic elements. By combining imagery, typography, and composition, it reflects on how personal and collective identities are assembled, questioned, and transformed through representation, memory, and social context.",
      images: [
        "assets/works/project6/image6.jpg",
        "assets/works/project6/image_2_6.png",
        "assets/works/project6/image_3_6.png",
      ],
    },
    {
      title: "Everyday Rituals",
      desc: "A project exploring the emotional and symbolic value of everyday actions and routines. By isolating small, repetitive gestures, the project highlights how these rituals shape our perception of time, provide comfort, and contribute to a sense of stability, belonging, and personal meaning within daily life.",
      images: [
        "assets/works/project7/image7.jpg",
        "assets/works/project7/image_2_7.png",
        "assets/works/project7/image_3_7.png",
      ],
    },
    {
      title: "Playful Systems",
      desc: "A project that explores structured systems through a playful lens. Rules, constraints, and frameworks are transformed into visual experiments, demonstrating how playful approaches can challenge rigidity, encourage creativity, and reveal alternative ways of interacting with systems that are often perceived as fixed or restrictive.",
      images: [
        "assets/works/project8/image8.jpg",
        "assets/works/project8/image_2_8.png",
        "assets/works/project8/image_3_8.png",
      ],
    },
    {
      title: "Tactile Futures",
      desc: "This project investigates the role of touch, texture, and materiality within a digitally driven context. It reflects on how tactile experiences can coexist with digital interfaces, emphasizing the importance of sensory engagement and material awareness in creating more human, emotional, and meaningful design experiences.",
      images: [
        "assets/works/project9/image9.jpg",
        "assets/works/project9/image_2_9.png",
        "assets/works/project9/image_3_9.png",
      ],
    },
    {
      title: "Personal Mythologies",
      desc: "A conceptual project centered on self-narrative and personal symbolism. The work translates memories, emotions, and lived experiences into visual myths, constructing a personal language that blends storytelling, abstraction, and identity to explore how individuals create meaning through narrative and imagination.",
      images: [
        "assets/works/project10/image10.jpg",
        "assets/works/project10/image_2_10.png",
        "assets/works/project10/image_3_10.png",
      ],
    },
  ];


  /* =========================================================
     PROJECT MODAL – Logic
  ========================================================= */
  const renderProject = () => {
    const project = projects[currentProject];
    if (!project) return;

    projTitle.textContent = project.title;
    projDesc.textContent = project.desc;
    projImage.src = project.images[currentImage];
    imgCounter.textContent = `${currentImage + 1} / ${project.images.length}`;
  };

  const openModal = (index) => {
    currentProject = index;
    currentImage = 0;
    renderProject();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const prevProject = () => {
    currentProject = (currentProject - 1 + projects.length) % projects.length;
    currentImage = 0;
    renderProject();
  };

  const nextProject = () => {
    currentProject = (currentProject + 1) % projects.length;
    currentImage = 0;
    renderProject();
  };

  const prevImage = () => {
    const imgs = projects[currentProject].images;
    currentImage = (currentImage - 1 + imgs.length) % imgs.length;
    renderProject();
  };

  const nextImage = () => {
    const imgs = projects[currentProject].images;
    currentImage = (currentImage + 1) % imgs.length;
    renderProject();
  };


  /* =========================================================
     PROJECT MODAL – Events
  ========================================================= */
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (!card) return;

    const index = Number(card.dataset.project);
    if (!Number.isInteger(index)) return;

    openModal(index);
  });

  btnClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) closeModal();
  });

  btnPrevProj?.addEventListener("click", prevProject);
  btnNextProj?.addEventListener("click", nextProject);
  btnPrevImg?.addEventListener("click", prevImage);
  btnNextImg?.addEventListener("click", nextImage);

  window.addEventListener("keydown", (e) => {
    if (!modal?.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevProject();
    if (e.key === "ArrowRight") nextProject();
    if (e.key === "ArrowUp") prevImage();
    if (e.key === "ArrowDown") nextImage();
  });


  /* =========================================================
     ABOUT – Mobile toggle
  ========================================================= */
  const aboutBtn = document.querySelector(".about-btn");
  const aboutText = document.querySelector(".about-text");

  aboutBtn?.addEventListener("click", () => {
    const isOpen = aboutText.classList.toggle("is-open");
    aboutBtn.setAttribute("aria-expanded", String(isOpen));
    aboutBtn.textContent = isOpen ? "Close" : "Meet me";
  });

})();


/* =========================================================
   PROGRAMS – Skill level chips
========================================================= */
document.querySelectorAll(".program-chip").forEach((chip) => {
  const level = Number(chip.dataset.level || 0);
  chip.style.setProperty(
    "--level",
    Math.max(0, Math.min(100, level))
  );
});










