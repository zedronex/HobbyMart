// Hobby Mart storefront interactions: gallery, mobile menu, reveal animations and gentle parallax.
const mainImage = document.getElementById('mainImage');
document.querySelectorAll('.thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.style.opacity = '0.25';
    window.setTimeout(() => {
      mainImage.src = thumb.dataset.src;
      mainImage.style.opacity = '1';
    }, 120);
  });
});

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav nav');
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Restrained parallax on the hero car. Disabled on touch/small screens and reduced-motion settings.
const parallax = document.querySelector('[data-parallax]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (parallax && !reduceMotion && window.matchMedia('(min-width: 800px)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const rect = parallax.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * -0.025;
      parallax.style.transform = `translateY(${Math.max(-12, Math.min(12, offset))}px)`;
      ticking = false;
    });
  }, {passive: true});
}