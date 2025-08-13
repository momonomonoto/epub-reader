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

// Feedback form -> mailto draft with validation
const form = document.getElementById('feedback-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput && 'value' in nameInput ? nameInput.value.trim() : '';
    const email = emailInput && 'value' in emailInput ? emailInput.value.trim() : '';
    const message = messageInput && 'value' in messageInput ? messageInput.value.trim() : '';

    let isValid = true;

    const errName = document.getElementById('err-name');
    const errEmail = document.getElementById('err-email');
    const errMessage = document.getElementById('err-message');
    if (errName) errName.textContent = '';
    if (errEmail) errEmail.textContent = '';
    if (errMessage) errMessage.textContent = '';

    if (!name) {
      isValid = false;
      if (errName) errName.textContent = 'Please enter your name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      isValid = false;
      if (errEmail) errEmail.textContent = 'Please enter a valid email address.';
    }
    if (!message) {
      isValid = false;
      if (errMessage) errMessage.textContent = 'Please share your feedback.';
    }
    if (!isValid) return;

    const subject = encodeURIComponent('Epub Reader feedback');
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:monomonomoto@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}


