const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    }
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.appendChild(progress);

let scrollTicking = false;
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
  scrollTicking = false;
};
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollProgress);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollProgress();

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  const glow = document.createElement('div');
  glow.className = 'pointer-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);
  window.addEventListener('pointermove', (event) => {
    glow.style.left = event.clientX + 'px';
    glow.style.top = event.clientY + 'px';
  }, { passive: true });
}

if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'translateY(-7px) perspective(900px) rotateX(' + (-y * 2.2) + 'deg) rotateY(' + (x * 2.5) + 'deg)';
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
