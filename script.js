const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav__links");
const headerTitle = document.querySelector(".header__title");
const allSections = document.querySelectorAll('.section');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    headerTitle.classList.toggle('active');
});

navMenu.addEventListener('click', (e) => {
    e.preventDefault();
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    headerTitle.classList.remove('active');
  
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Reveal Sections

  const revealSection = function (entries, oberver) {
    // console.log(entries);
    const [entry] = entries; // always act on the first entry, only one threshold so only one entry at a time
    // console.log(entry);
    // add guard
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
  
    // sectionObserve.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });
  allSections.forEach(function (section) {
    sectionObserver.observe(section);
     section.classList.add('section--hidden');
  });
  