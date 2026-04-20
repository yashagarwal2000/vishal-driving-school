/* =============================================================
   VISHAL DRIVING SCHOOL — MAIN JAVASCRIPT
   Features: Language Toggle | Scroll Animations | Counter |
             Mobile Nav | FAQ Accordion | Navbar Scroll Effect |
             Auto-Rolling Batch Date
   ============================================================= */

'use strict';

/* ---- LANGUAGE TOGGLE ---- */
var currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  applyLanguage(currentLang);
  localStorage.setItem('vds-lang', currentLang);

  // Update toggle button state
  var enLabel = document.querySelector('.l-en');
  var hiLabel = document.querySelector('.l-hi');
  if (currentLang === 'hi') {
    enLabel && enLabel.classList.remove('active');
    hiLabel && hiLabel.classList.add('active');
  } else {
    enLabel && enLabel.classList.add('active');
    hiLabel && hiLabel.classList.remove('active');
  }
}

function applyLanguage(lang) {
  var elements = document.querySelectorAll('[data-en]');
  elements.forEach(function(el) {
    var text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });
  document.documentElement.lang = lang;
  // Re-inject batch dates in the newly active language
  updateBatchDates();
}

/* ---- AUTO-ROLLING BATCH DATE ---- */
/*
 * Anchor: March 26, 2026. Batches repeat every 15 days.
 * On page load we find the next future batch date and inject
 * it into the banner and enroll section — bilingual (EN + HI).
 */
var BATCH_ANCHOR    = new Date('2026-03-26T00:00:00');
var BATCH_INTERVAL  = 15; // days

var HI_MONTHS = [
  'जनवरी','फरवरी','मार्च','अप्रैल','मई','जून',
  'जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'
];

function getNextBatchDate() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var diffMs   = today - BATCH_ANCHOR;
  var diffDays = Math.floor(diffMs / 86400000);

  // How many complete 15-day cycles have elapsed?
  var cyclesPassed = diffDays >= 0 ? Math.floor(diffDays / BATCH_INTERVAL) : -1;

  // Next batch is one cycle ahead of the last one
  var next = new Date(BATCH_ANCHOR);
  next.setDate(BATCH_ANCHOR.getDate() + (cyclesPassed + 1) * BATCH_INTERVAL);
  return next;
}

function formatBatchDate(date, lang) {
  var day   = date.getDate();
  var month = date.getMonth();
  if (lang === 'hi') {
    return day + ' ' + HI_MONTHS[month];
  }
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
}

function updateBatchDates() {
  var next = getNextBatchDate();

  var enDate = formatBatchDate(next, 'en');
  var hiDate = formatBatchDate(next, 'hi');

  // Update all elements that carry the next-batch date
  var targets = document.querySelectorAll('.next-batch-date');
  targets.forEach(function(el) {
    el.setAttribute('data-en', enDate);
    el.setAttribute('data-hi', hiDate);
    // Show value matching the active language
    el.textContent = currentLang === 'hi' ? hiDate : enDate;
  });

  // Also keep the wrapping [data-en] / [data-hi] strings in sync
  // so toggleLang() picks up the updated date automatically
  var bannerSpan = document.querySelector('.urgency-banner [data-en]');
  if (bannerSpan) {
    bannerSpan.setAttribute('data-en', '🔥 Next Batch Starting ' + enDate + ' — Limited Seats Available!');
    bannerSpan.setAttribute('data-hi', '🔥 अगला बैच ' + hiDate + ' से — सीमित सीटें बची हैं!');
    if (currentLang !== 'hi') {
      bannerSpan.textContent = '🔥 Next Batch Starting ' + enDate + ' — Limited Seats Available!';
    } else {
      bannerSpan.textContent = '🔥 अगला बैच ' + hiDate + ' से — सीमित सीटें बची हैं!';
    }
  }

  var enrollPerk = document.querySelector('.ep-batch');
  if (enrollPerk) {
    enrollPerk.setAttribute('data-en', 'Next batch: ' + enDate);
    enrollPerk.setAttribute('data-hi', 'अगला बैच: ' + hiDate);
    enrollPerk.textContent = currentLang === 'hi' ? 'अगला बैच: ' + hiDate : 'Next batch: ' + enDate;
  }
}

/* ---- MOBILE NAV ---- */
function toggleMenu() {
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
}

// Close menu on link click
document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      document.getElementById('hamburger').classList.remove('open');
      document.getElementById('navLinks').classList.remove('open');
    });
  });
});

/* ---- NAVBAR SCROLL EFFECT ---- */
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- SCROLL REVEAL (IntersectionObserver) ---- */
function initReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, idx) {
      if (entry.isIntersecting) {
        // Stagger nearby items for a cascade effect
        var delay = (idx % 4) * 80;
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function(item) { observer.observe(item); });
}

/* ---- ANIMATED COUNTER ---- */
function animateCounter(el) {
  var target   = parseInt(el.getAttribute('data-target'), 10);
  var duration = 1800;
  var start    = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

function initCounters() {
  var counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(c) { observer.observe(c); });
}

/* ---- FAQ ACCORDION ---- */
function toggleFaq(btn) {
  var item   = btn.closest('.faq-item');
  var answer = item.querySelector('.faq-a');
  var isOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
    openItem.classList.remove('open');
    openItem.querySelector('.faq-a').classList.remove('open');
  });

  // Open clicked item if it was closed
  if (!isOpen) {
    item.classList.add('open');
    answer.classList.add('open');
  }
}

/* ---- SMOOTH ANCHOR SCROLL ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = 80;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* ---- STICKY BAR (auto-hide on desktop) ---- */
function initStickyBar() {
  // The sticky bar is CSS-only visible on mobile.
  // Add padding to footer so content isn't hidden behind it.
  function checkViewport() {
    var bar = document.querySelector('.sticky-bar');
    if (!bar) return;
    bar.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
  }
  checkViewport();
  window.addEventListener('resize', checkViewport, { passive: true });
}

/* ---- INIT ON DOM READY ---- */
document.addEventListener('DOMContentLoaded', function() {
  // Restore saved language
  var savedLang = localStorage.getItem('vds-lang');
  if (savedLang && savedLang !== 'en') {
    currentLang = savedLang;
    applyLanguage(savedLang);
    var hiLabel = document.querySelector('.l-hi');
    var enLabel = document.querySelector('.l-en');
    if (hiLabel) hiLabel.classList.add('active');
    if (enLabel) enLabel.classList.remove('active');
  }

  updateBatchDates();
  initReveal();
  initCounters();
  initSmoothScroll();
  initStickyBar();
  initGATracking();

  // Hero content entrance animation
  var heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    setTimeout(function() {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }
});

/* ---- GOOGLE ANALYTICS 4 — CONVERSION TRACKING ---- */
/* Tracks key user actions so you can see conversions in GA4 dashboard */
function gaEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params || {});
  }
}

function initGATracking() {
  // Track all WhatsApp link clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(el) {
    el.addEventListener('click', function() {
      gaEvent('whatsapp_click', {
        event_category: 'Lead',
        event_label: 'WhatsApp CTA',
        value: 1
      });
    });
  });

  // Track phone call clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      gaEvent('phone_call', {
        event_category: 'Lead',
        event_label: 'Call Now',
        value: 1
      });
    });
  });

  // Track enroll section view (high-intent signal)
  var enrollSection = document.getElementById('enroll');
  if (enrollSection) {
    var enrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          gaEvent('enroll_section_view', {
            event_category: 'Engagement',
            event_label: 'Viewed Enroll Form',
            value: 1
          });
          enrollObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    enrollObserver.observe(enrollSection);
  }

  // Track Enroll Now CTA clicks (any button going to #enroll)
  document.querySelectorAll('a[href="#enroll"]').forEach(function(el) {
    el.addEventListener('click', function() {
      gaEvent('enroll_cta_click', {
        event_category: 'Lead',
        event_label: el.textContent.trim() || 'Enroll CTA',
        value: 1
      });
    });
  });

  // Track language toggle usage
  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function() {
      gaEvent('language_toggle', {
        event_category: 'UX',
        event_label: 'Switched to ' + (currentLang === 'hi' ? 'Hindi' : 'English')
      });
    });
  }

  // Track pricing card selections
  document.querySelectorAll('.price-card a').forEach(function(el) {
    el.addEventListener('click', function() {
      var card = el.closest('.price-card');
      var carName = card ? (card.querySelector('h3') || {}).textContent || 'Unknown' : 'Unknown';
      gaEvent('pricing_card_click', {
        event_category: 'Lead',
        event_label: carName.trim(),
        value: 1
      });
    });
  });
}

