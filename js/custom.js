function displayYear() {
  var el = document.getElementById("displayYear");
  if (el) el.textContent = new Date().getFullYear();
}

function setupThemeToggle() {
  var saved = localStorage.getItem("portfolio-theme");
  if (saved === "light") document.body.setAttribute("data-theme", "light");
  var btn = document.getElementById("themeToggleNav");
  if (!btn) return;
  btn.textContent = document.body.getAttribute("data-theme") === "light" ? "🌙" : "☀";
  btn.addEventListener("click", function () {
    var isLight = document.body.getAttribute("data-theme") === "light";
    if (isLight) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "dark");
      btn.textContent = "☀";
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio-theme", "light");
      btn.textContent = "🌙";
    }
  });
}

function setupMobileMenu() {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () { nav.classList.toggle("show"); });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("show"); });
  });
}

function setupReveal() {
  var nodes = document.querySelectorAll(".hero, .section, .card, .media-card, .site-footer");
  nodes.forEach(function (n) { n.classList.add("reveal"); });
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (n) { n.classList.add("in-view"); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  nodes.forEach(function (n) { observer.observe(n); });
}

function setupHeroShuffle() {
  var heroImage = document.getElementById("heroShuffleImage");
  if (!heroImage) return;
  var prevBtn = document.getElementById("heroPrev");
  var nextBtn = document.getElementById("heroNext");
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-dot"));
  var images = ["images/eita3.jpg", "images/eita2.jpg", "images/eita1.jpg", "images/eita.jpg"];
  var index = 0;

  function renderImage() {
    heroImage.classList.add("shuffling");
    setTimeout(function () {
      heroImage.src = images[index];
      heroImage.classList.remove("shuffling");
    }, 180);
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextImage() { index = (index + 1) % images.length; renderImage(); }
  function prevImage() { index = (index - 1 + images.length) % images.length; renderImage(); }

  var timer = setInterval(nextImage, 3000);
  function resetTimer() { clearInterval(timer); timer = setInterval(nextImage, 3000); }

  if (nextBtn) nextBtn.addEventListener("click", function () { nextImage(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prevImage(); resetTimer(); });
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var i = parseInt(dot.getAttribute("data-index"), 10);
      if (!Number.isNaN(i)) { index = i; renderImage(); resetTimer(); }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayYear();
  setupThemeToggle();
  setupMobileMenu();
  setupReveal();
  setupHeroShuffle();
});
