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
  // Projects Carousel — infinite loop
  // Clones cards before + after the real set so the user can
  // keep clicking in either direction without ever hitting a wall.
  // Desktop : JS translateX on .carousel-track
  // Mobile  : native CSS overflow scroll + scroll-snap
  // ============================================================
  const carousel            = document.getElementById('projectsCarousel');
  const prevBtn             = document.getElementById('carouselPrev');
  const nextBtn             = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (carousel) {
    const realCards = Array.from(carousel.querySelectorAll('.carousel-card'));
    const realCount = realCards.length;
    const container = carousel.parentElement; // .carousel-container

    // Clone a full set before and after the originals
    realCards.forEach(c => carousel.appendChild(c.cloneNode(true)));
    realCards.slice().reverse().forEach(c => carousel.insertBefore(c.cloneNode(true), carousel.firstChild));

    const allCards = () => Array.from(carousel.querySelectorAll('.carousel-card'));

    let currentSlide = realCount; // start at first real card (after the prepended clones)
    let isTransitioning = false;
    let autoScroll;

    const isMobile = () => window.innerWidth <= 768;

    const getCardWidth = () => {
      const cards = allCards();
      if (!cards.length) return 360;
      const gap = parseFloat(window.getComputedStyle(carousel).gap) || 40;
      return cards[0].getBoundingClientRect().width + gap;
    };

    const getVisibleCount = () => Math.max(1, Math.round(container.offsetWidth / getCardWidth()));

    // ── Indicators (based on real card count) ─────────────────
    const buildIndicators = () => {
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < realCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i + realCount));
        indicatorsContainer.appendChild(dot);
      }
    };

    const updateIndicators = (absoluteIdx) => {
      const realIdx = ((absoluteIdx - realCount) % realCount + realCount) % realCount;
      indicatorsContainer?.querySelectorAll('.carousel-dot')
        .forEach((d, i) => d.classList.toggle('active', i === realIdx));
    };

    // ── Core navigation ───────────────────────────────────────
    const goToSlide = (index, animate = true) => {
      const cards = allCards();
      carousel.style.transition = animate ? 'transform 0.4s cubic-bezier(.4,0,.2,1)' : 'none';
      carousel.style.transform  = `translateX(-${index * getCardWidth()}px)`;
      currentSlide = index;
      updateIndicators(index);
    };

    // After a transition, if we've landed in a clone zone, silently
    // jump to the real equivalent without any visible snap.
    const onTransitionEnd = () => {
      const cards     = allCards();
      const totalCards = cards.length;

      if (currentSlide < realCount) {
        // In the pre-clone zone — jump to real end
        goToSlide(currentSlide + realCount, false);
      } else if (currentSlide >= realCount * 2) {
        // In the post-clone zone — jump to real start
        goToSlide(currentSlide - realCount, false);
      }
      isTransitioning = false;
    };
    carousel.addEventListener('transitionend', onTransitionEnd);

    const scrollNext = () => {
      if (isTransitioning && !isMobile()) return;
      isTransitioning = true;
      goToSlide(currentSlide + 1);
    };
    const scrollPrev = () => {
      if (isTransitioning && !isMobile()) return;
      isTransitioning = true;
      goToSlide(currentSlide - 1);
    };

    if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
    if (nextBtn) nextBtn.addEventListener('click', scrollNext);

    // Mobile: native scroll sync (indicators only — no transform)
    let scrollSyncTimer;
    container.addEventListener('scroll', () => {
      if (!isMobile()) return;
      clearTimeout(scrollSyncTimer);
      scrollSyncTimer = setTimeout(() => {
        const cw      = getCardWidth();
        const nearest = Math.round(container.scrollLeft / cw);
        const realIdx = ((nearest - realCount) % realCount + realCount) % realCount;
        updateIndicators(realIdx + realCount);
      }, 80);
    }, { passive: true });

    // Auto-scroll desktop only
    const startAuto = () => { if (!isMobile()) autoScroll = setInterval(scrollNext, 5000); };
    const stopAuto  = () => clearInterval(autoScroll);
    const wrapper   = container.parentElement;
    wrapper?.addEventListener('mouseenter', stopAuto);
    wrapper?.addEventListener('mouseleave', startAuto);

    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stopAuto();
        buildIndicators();
        goToSlide(realCount, false);
        startAuto();
      }, 200);
    });

    // Init — position at first real card, no animation
    carousel.style.transition = 'none';
    goToSlide(realCount, false);
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