/* =========================================================
  PORTFOLIO TEMPLATE — main.js
  - This file controls interactivity (menu, hero action, modal, UI helpers).
  - Edit points:
    1) PROJECT DATA: update the `projects[]` array (titles, descriptions, images)
    2) CONTACT: replace the demo alert or connect the form to a backend
    3) TEXTS: update labels ("Meet me", "Close", etc.)
  - JS-controlled CSS states:
    * .site-header.is-open     → mobile nav open
    * body.show-works          → hero transitions to works
    * .project-modal.is-open   → project modal open
    * .about-text.is-open      → about text expanded on mobile
    * .back-to-top.is-visible  → back-to-top button shown
========================================================= */

(() => {
  /* =========================================================
    HELPERS
    - qs  = querySelector
    - qsa = querySelectorAll (as array)
  ========================================================= */
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* =========================================================
     NAV – Mobile hamburger menu
     - Requires: .site-header, #navToggle, #navLinks
  ========================================================= */
  const header = qs(".site-header");
  const navToggle = qs("#navToggle");
  const navLinks = qs("#navLinks");

  const closeNav = () => {
    header?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after clicking any nav link (mobile)
  navLinks?.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });

  // Close menu if user clicks outside of header/nav area
  document.addEventListener("click", (e) => {
    if (!header?.classList.contains("is-open")) return;

    const clickedToggle = e.target.closest("#navToggle");
    const clickedMenu = e.target.closest("#navLinks");
    if (!clickedToggle && !clickedMenu) closeNav();
  });

  /* =========================================================
     HERO – "Discover" button behavior
     - Adds body.show-works and scrolls to #works
     - Also restores hero state when user scrolls back to top
  ========================================================= */
  const discoverBtn = qs("#discoverBtn");
  const worksSection = qs("#works");

  const showWorks = () => {
    document.body.classList.add("show-works");
    worksSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showHeroIfTop = () => {
    if (window.scrollY <= 10) document.body.classList.remove("show-works");
  };

  discoverBtn?.addEventListener("click", showWorks);
  window.addEventListener("scroll", showHeroIfTop, { passive: true });
  showHeroIfTop();

  /* =========================================================
     CONTACT FORM (DEMO)
     - Prevents real submit (UI-only form)
     - Replace this block if you connect a real backend
  ========================================================= */
  const contactForm = qs(".contact-form");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    alert("Thanks! Your message is ready to be sent (visual form).");
    contactForm.reset();
  });

  /* =========================================================
     FOOTER – Current year
     - Fills #year automatically
  ========================================================= */
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     BACK TO TOP
     - Shows button after scroll threshold
  ========================================================= */
  const backToTop = qs("#backToTop");

  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  /* =========================================================
     WORKS CAROUSEL – Infinite autoplay track
     - Duplicates track content once to create a seamless loop
     - Respects prefers-reduced-motion
  ========================================================= */
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("load", () => {
    const track = qs("#worksTrack");
    if (!track) return;

    // Duplicate slides once (only the first time)
    if (track.dataset.looped !== "true") {
      track.innerHTML += track.innerHTML;
      track.dataset.looped = "true";
    }

    let position = 0;
    let lastTime = null;
    const SPEED = 60; // px/second (edit if you want slower/faster)

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
     PROJECT MODAL – Elements & state
     - Requires: #projectModal, #projTitle, #projDesc, #projImage, #imgCounter
     - Controls: close, prev/next project, prev/next image
  ========================================================= */
  const modal = qs("#projectModal");
  const projImage = qs("#projImage");
  const projTitle = qs("#projTitle");
  const projDesc = qs("#projDesc");
  const imgCounter = qs("#imgCounter");

  const btnClose = qs("#projClose");
  const btnPrevProj = qs("#projPrev");
  const btnNextProj = qs("#projNext");
  const btnPrevImg = qs("#imgPrev");
  const btnNextImg = qs("#imgNext");

  let currentProject = 0;
  let currentImage = 0;

  /* =========================================================
     PROJECT DATA (EDIT HERE)
     - Add/remove projects by editing this array
     - IMPORTANT: your HTML .work-card data-project indexes must match this order
     - Each project must include:
       { title: string, desc: string, images: [img1, img2, ...] }
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
     PROJECT MODAL – Rendering + controls
  ========================================================= */
  const renderProject = () => {
    const project = projects[currentProject];
    if (!project) return;

    if (projTitle) projTitle.textContent = project.title;
    if (projDesc) projDesc.textContent = project.desc;

    if (projImage) {
      projImage.src = project.images[currentImage];
      projImage.alt = `${project.title} – image ${currentImage + 1}`;
    }

    if (imgCounter) imgCounter.textContent = `${currentImage + 1} / ${project.images.length}`;
  };

  const openModal = (index) => {
    currentProject = index;
    currentImage = 0;
    renderProject();

    modal?.classList.add("is-open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
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

  /* Open modal from work cards (event delegation)
     - Requires: .work-card elements with data-project="0..n"
  */
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (!card) return;

    const index = Number(card.dataset.project);
    if (!Number.isInteger(index)) return;
    if (index < 0 || index >= projects.length) return;

  openModal(index);

  });

  btnClose?.addEventListener("click", closeModal);

  // Click on overlay closes modal
  modal?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) closeModal();
  });

  btnPrevProj?.addEventListener("click", prevProject);
  btnNextProj?.addEventListener("click", nextProject);
  btnPrevImg?.addEventListener("click", prevImage);
  btnNextImg?.addEventListener("click", nextImage);

  /* =========================================================
     ABOUT – Mobile toggle
     - Toggles .about-text.is-open and updates aria-expanded
  ========================================================= */
  const aboutBtn = qs("#aboutBtn");
  const aboutText = qs("#aboutText");

  aboutBtn?.addEventListener("click", () => {
    if (!aboutText) return;
    const isOpen = aboutText.classList.toggle("is-open");
    aboutBtn.setAttribute("aria-expanded", String(isOpen));
    aboutBtn.textContent = isOpen ? "Close" : "Meet me";
  });

  /* =========================================================
     PROGRAMS – Skill level chips
     - Reads data-level (0–100) and sets CSS variable --level
  ========================================================= */
  qsa(".program-chip").forEach((chip) => {
    const level = Number(chip.dataset.level || 0);
    chip.style.setProperty("--level", String(Math.max(0, Math.min(100, level))));
  });

  /* =========================================================
     GLOBAL – Keyboard shortcuts
     - ESC closes nav always
     - If modal is open:
       ArrowLeft/Right → prev/next project
       ArrowUp/Down    → prev/next image
  ========================================================= */
  window.addEventListener("keydown", (e) => {
    // Escape always closes nav
    if (e.key === "Escape") closeNav();

    // Modal shortcuts only if open
    if (!modal?.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevProject();
    if (e.key === "ArrowRight") nextProject();
    if (e.key === "ArrowUp") prevImage();
    if (e.key === "ArrowDown") nextImage();
  });
})();












