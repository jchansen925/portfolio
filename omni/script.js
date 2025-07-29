const mobileNavBtn = document.querySelector(".btn-mobile-nav");
const nav = document.querySelector(".main-nav");
const navMenu = document.querySelector(".main-nav-list");

const allSections = document.querySelectorAll(".section");
// mobile menu
navMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("main-nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

mobileNavBtn.addEventListener("click", (e) => {
  nav.classList.toggle("nav-open");
});
