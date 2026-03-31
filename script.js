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
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial check

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
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

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Footer Vectors Animation
  const footerVectors = document.querySelector('.footer-vectors');
  if (footerVectors) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.3 });
    observer.observe(footerVectors);
  }

  // Projects Carousel
  const carousel = document.getElementById('projectsCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  
  if (carousel && prevBtn && nextBtn) {
    const cards = carousel.querySelectorAll('.carousel-card');
    const cardWidth = 352; // card width (320) + gap (32)
    const visibleCards = Math.floor(carousel.parentElement.offsetWidth / cardWidth);
    const totalSlides = Math.ceil(cards.length - visibleCards + 1);
    let currentSlide = 0;
    
    // Create indicators
    if (indicatorsContainer) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
      }
    }
    
    const updateIndicators = () => {
      const dots = indicatorsContainer?.querySelectorAll('.carousel-dot');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };
    
    const goToSlide = (index) => {
      currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
      carousel.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
      updateIndicators();
    };
    
    const scrollNext = () => {
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(0);
      }
    };
    
    const scrollPrev = () => {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      } else {
        goToSlide(totalSlides - 1);
      }
    };
    
    nextBtn.addEventListener('click', scrollNext);
    prevBtn.addEventListener('click', scrollPrev);
    
    // Auto-scroll every 5 seconds
    let autoScroll = setInterval(scrollNext, 5000);
    
    carousel.parentElement.parentElement.addEventListener('mouseenter', () => {
      clearInterval(autoScroll);
    });
    
    carousel.parentElement.parentElement.addEventListener('mouseleave', () => {
      autoScroll = setInterval(scrollNext, 5000);
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Section scroll reveal
  const revealEls = document.querySelectorAll('.work-section, .about-section, .projects-section, .blog-section');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    revealEls.forEach(el => {
      el.classList.add('section-reveal');
      revealObserver.observe(el);
    });
  }
});