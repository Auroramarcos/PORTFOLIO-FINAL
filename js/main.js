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







