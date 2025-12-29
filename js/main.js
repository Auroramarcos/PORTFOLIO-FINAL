const discoverBtn = document.getElementById("discoverBtn");
const hero = document.getElementById("hero");
const works = document.getElementById("works");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (discoverBtn && hero && works) {
  discoverBtn.addEventListener("click", () => {
    // Pequeña animación de "subida" del hero
    hero.classList.add("is-exiting");

    // Scroll suave a Works (con un pequeño delay para que se note la animación)
    setTimeout(() => {
      works.scrollIntoView({ behavior: "smooth", block: "start" });
      hero.classList.remove("is-exiting");
    }, 250);
  });
}
