// ============ Mobile Menu ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============ Counter Animation ============
const counters = document.querySelectorAll('[data-count]');

const animateCounter = (el) => {
  const target = +el.dataset.count;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current).toLocaleString('ar-EG') + '+';
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('ar-EG') + '+';
    }
  };
  update();
};

// Intersection Observer for counters
if (counters.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ============ Scroll Reveal ============
const revealEls = document.querySelectorAll('.card, .dept-card, .team-card, .info-item, .section-head');

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.7s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============ Contact Form ============
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.textContent = '✅ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.';
    formMsg.style.color = '#00d4aa';
    contactForm.reset();

    setTimeout(() => {
      formMsg.textContent = '';
    }, 5000);
  });
}

// ============ Navbar Shadow on Scroll ============
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,102,255,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});