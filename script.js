// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');
if (navToggleButton && primaryNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Note: Native form removed (Google Form is embedded). Keep Firebase code below as reference if native form returns.


