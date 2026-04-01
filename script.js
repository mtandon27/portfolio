// Theme Toggle - run immediately
(function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Add hero-loaded class to trigger animations
  setTimeout(() => {
    document.body.classList.add('hero-loaded');
  }, 100);

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Nav active state on scroll
  const navLinks = document.querySelectorAll('.nav-center a');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Mobile Menu
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    mobileClose?.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  // Footer Vectors Animation
  const footerVectors = document.querySelector('.footer-vectors');
  if (footerVectors) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.3 });
    observer.observe(footerVectors);
  }

  // ============================================================
  // Projects Carousel
  // Desktop : JS translateX on .carousel-track
  // Mobile  : native CSS overflow scroll + scroll-snap
  //           (no translateX — just scrollTo)
  // ============================================================
  const carousel            = document.getElementById('projectsCarousel');
  const prevBtn             = document.getElementById('carouselPrev');
  const nextBtn             = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (carousel) {
    const cards     = Array.from(carousel.querySelectorAll('.carousel-card'));
    const container = carousel.parentElement; // .carousel-container
    let currentSlide = 0;
    let totalSlides  = 1;
    let autoScroll;

    const isMobile = () => window.innerWidth <= 768;

    // Card width = rendered card width + CSS gap
    const getCardWidth = () => {
      if (!cards.length) return 360;
      const gap = parseFloat(window.getComputedStyle(carousel).gap) || 40;
      return cards[0].getBoundingClientRect().width + gap;
    };

    const getVisibleCount = () => Math.max(1, Math.round(container.offsetWidth / getCardWidth()));

    // ── Indicators ────────────────────────────────────────────
    const buildIndicators = () => {
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = '';
      totalSlides = Math.max(1, cards.length - getVisibleCount() + 1);
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
      }
    };

    const updateIndicators = (idx) => {
      indicatorsContainer?.querySelectorAll('.carousel-dot')
        .forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    // ── Navigation ────────────────────────────────────────────
    const goToSlide = (index) => {
      currentSlide = Math.max(0, Math.min(index, totalSlides - 1));

      if (isMobile()) {
        // Native scroll — reliable on every mobile browser
        const card = cards[currentSlide];
        if (card) container.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      } else {
        // Desktop: JS transform on the track
        carousel.style.transform = `translateX(-${currentSlide * getCardWidth()}px)`;
      }

      updateIndicators(currentSlide);
    };

    const scrollNext = () => goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    const scrollPrev = () => goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);

    if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
    if (nextBtn) nextBtn.addEventListener('click', scrollNext);

    // Sync indicator while user drags natively on mobile
    let scrollSyncTimer;
    container.addEventListener('scroll', () => {
      if (!isMobile()) return;
      clearTimeout(scrollSyncTimer);
      scrollSyncTimer = setTimeout(() => {
        const cw      = getCardWidth();
        const nearest = Math.round(container.scrollLeft / cw);
        currentSlide  = Math.max(0, Math.min(nearest, totalSlides - 1));
        updateIndicators(currentSlide);
      }, 80);
    }, { passive: true });

    // Auto-scroll desktop only
    const startAuto = () => { if (!isMobile()) autoScroll = setInterval(scrollNext, 5000); };
    const stopAuto  = () => clearInterval(autoScroll);
    const wrapper   = container.parentElement;
    wrapper?.addEventListener('mouseenter', stopAuto);
    wrapper?.addEventListener('mouseleave', startAuto);

    // Recalculate on resize / orientation change
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { stopAuto(); buildIndicators(); goToSlide(0); startAuto(); }, 200);
    });

    buildIndicators();
    startAuto();
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });

  // Section scroll reveal
  const revealEls = document.querySelectorAll('.work-section, .about-section, .projects-section, .blog-section');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.06 });
    revealEls.forEach(el => { el.classList.add('section-reveal'); revealObserver.observe(el); });
  }
});