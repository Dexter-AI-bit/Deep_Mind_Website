/* 

   DEEPMIND WEBSITE - MAIN JAVASCRIPT
   Theme Toggle, Mobile Menu, Navigation

   */

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const prefersDark = window.matchMedia('(prefer-color-scheme: dark)');

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = prefersDark.matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;

  setTheme(theme);
}

// Set theme
function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeButton(theme);
}

// Update theme button text
function updateThemeButton(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }
}

// Theme toggle event
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Mobile hamburger menu 
const mobileMenuHamburger = document.querySelector('.mobile-menu-hamburger');
const nav = document.querySelector('nav');

if (mobileMenuHamburger && nav) {
  mobileMenuHamburger.addEventListener('click', () => {
    nav.classList.toggle('mobile-active');
    mobileMenuHamburger.textContent = nav.classList.contains('mobile-active') ? '✕' : '☰';
  });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) {
      nav.classList.remove('mobile-active');
      if (mobileMenuHamburger) {
        mobileMenuHamburger.textContent = '☰';
      }
    }
  });
});

// Active Link Highlighting
function setActiveLink() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('nav a');

  links.forEach((link) => {
    link.classList.remove('active');

    // Handle both relative and absolute paths
    const href = link.getAttribute('href');
    if (href === currentPath || href === '/' && currentPath.endsWith('index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize active link on page load
window.addEventListener('load', setActiveLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form validation 
const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form inputs
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (isValid) {
      // Success message 
      alert('Form submitted successfully! (This is a prototype)');
      form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});
