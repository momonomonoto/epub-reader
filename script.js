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

// Firebase (web v9 modular)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBVV0ooUY1U-KGVmIrM8oTqwk8lKN3jYvE",
  authDomain: "epub-ce393.firebaseapp.com",
  projectId: "epub-ce393",
  storageBucket: "epub-ce393.firebasestorage.app",
  messagingSenderId: "49807630057",
  appId: "1:49807630057:web:b1e02710d8857bc2b89a78",
  measurementId: "G-XHWNVRWFYQ"
};

let db;
try {
  const app = initializeApp(firebaseConfig);
  // Analytics is optional; ignore errors if not available in some environments
  try { getAnalytics(app); } catch (_) {}
  db = getFirestore(app);
} catch (e) {
  console.error('Failed to initialize Firebase', e);
}

// Feedback form -> validate, then send to Firestore and open mailto draft
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

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    // Align field names with Firestore (email, name, feedback)
    const payload = { name, email, feedback: message, createdAt: serverTimestamp() };
    const showToast = (text) => {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    };
    const afterSend = () => {
      if (submitButton) submitButton.disabled = false;
      form.reset();
      showToast('Спасибо, отправлено');
    };

    if (db) {
      addDoc(collection(db, 'feedback'), payload)
        .then(afterSend)
        .catch((err) => {
          console.error('Failed to submit feedback to Firestore', err);
          if (submitButton) submitButton.disabled = false;
          showToast('Не удалось отправить. Попробуйте позже');
        });
    } else {
      if (submitButton) submitButton.disabled = false;
      showToast('Не удалось подключиться к серверу');
    }

  });
}


