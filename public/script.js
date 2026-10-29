/**
 * CHEF MAINUDDIN AHMED — LUXURY PORTFOLIO JAVASCRIPT ENGINE
 * Pure Vanilla JavaScript with GSAP, ScrollTrigger & Lenis integration
 * Ready for GitHub Pages (zero build step)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. THEME TOGGLE (Dark / Light with LocalStorage Persistence)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function getSavedTheme() {
    return localStorage.getItem('chef_portfolio_theme') || 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      }
    }
  }

  // Initial theme initialization
  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('chef_portfolio_theme', nextTheme);
    });
  }

  /* ==========================================================================
     2. PRELOADER & ENTRANCE SEQUENCE
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderCounter = document.getElementById('preloaderCounter');

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 12) + 6;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);

      if (preloaderCounter) {
        preloaderCounter.textContent = '100%';
      }

      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
        }
        startHeroAnimations();
      }, 350);
    } else {
      if (preloaderCounter) {
        preloaderCounter.textContent = `${loadProgress}%`;
      }
    }
  }, 45);

  /* ==========================================================================
     3. SMOOTH SCROLLING (Lenis with GSAP ScrollTrigger Integration)
     ========================================================================== */
  let lenisInstance = null;

  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    // Connect Lenis to GSAP ScrollTrigger if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Smooth anchor scrolling helper
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (lenisInstance) {
            lenisInstance.scrollTo(targetElement, { offset: -70 });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
          // Close mobile menu if open
          closeMobileMenu();
        }
      }
    });
  });

  /* ==========================================================================
     4. TOP PROGRESS BAR & STICKY NAVBAR CONTROLLER
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentY / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (currentY > 40) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }

      // Hide navbar when scrolling down fast, show on scroll up
      if (currentY > 180 && currentY > lastScrollY + 6) {
        navbar.classList.add('nav-hidden');
      } else if (currentY < lastScrollY - 6) {
        navbar.classList.remove('nav-hidden');
      }
    }
    lastScrollY = currentY;

    // Update timeline progress dynamically
    updateTimelineProgress();
  }, { passive: true });

  /* ==========================================================================
     5. MOBILE MENU LOGIC
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  /* ==========================================================================
     6. CUSTOM MAGNETIC CURSOR
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (customCursor && cursorFollower && !prefersReducedMotion) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      customCursor.style.left = `${mouseX}px`;
      customCursor.style.top = `${mouseY}px`;
    });

    function renderCursorFollower() {
      // Spring lerp
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(renderCursorFollower);
    }
    requestAnimationFrame(renderCursorFollower);

    // Hover triggers
    const interactiveElements = document.querySelectorAll('a, button, .theme-toggle-btn, .technique-header, .filter-btn');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hovering');
      });
    });

    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('view-dish');
        cursorFollower.textContent = 'View';
      });
      card.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('view-dish');
        cursorFollower.textContent = '';
      });
    });
  }

  /* ==========================================================================
     7. HERO STEAM / AROMA PARTICLES CANVAS
     ========================================================================== */
  const canvas = document.getElementById('heroSteamCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    });

    const particles = [];
    const particleCount = prefersReducedMotion ? 10 : 38;

    class SteamParticle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 20;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = Math.random() * 0.6 + 0.25;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fade = Math.random() * 0.003 + 0.001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.02) * 0.2;
        this.opacity -= this.fade;
        if (this.y < 0 || this.opacity <= 0) {
          this.reset(false);
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 184, 102, ${this.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(217, 184, 102, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new SteamParticle());
    }

    function animateSteam() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateSteam);
    }
    animateSteam();
  }

  /* ==========================================================================
     8. HERO TEXT REVEAL & ROTATING SUBTITLE
     ========================================================================== */
  function startHeroAnimations() {
    // Rotating Subtitle Words
    const rotatingWords = [
      'Japanese · Sushi & Sashimi',
      'Italian · Fresh Pasta & Pizza',
      'Thai & Chinese · High-Heat Wok',
      'Indian & Bengali · Spice Blending',
      'Korean · Artisan Mise en Place'
    ];
    let wordIndex = 0;
    const rotatingSlot = document.getElementById('rotatingSubtitle');

    if (rotatingSlot) {
      setInterval(() => {
        wordIndex = (wordIndex + 1) % rotatingWords.length;
        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
          gsap.to(rotatingSlot, {
            opacity: 0,
            y: -10,
            duration: 0.35,
            onComplete: () => {
              rotatingSlot.textContent = rotatingWords[wordIndex];
              gsap.fromTo(rotatingSlot, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 });
            }
          });
        } else {
          rotatingSlot.textContent = rotatingWords[wordIndex];
        }
      }, 3400);
    }

    // GSAP Hero Entrance
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.from('.hero-kicker-row', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.35, ease: 'power3.out' });
      gsap.from('.hero-rotating-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.5 });
      gsap.from('.hero-bio-lead', { opacity: 0, y: 20, duration: 0.8, delay: 0.65 });
      gsap.from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
      gsap.from('.hero-trust-bar', { opacity: 0, y: 15, duration: 0.8, delay: 0.95 });
      gsap.from('.hero-portrait-wrapper', { opacity: 0, scale: 0.92, duration: 1.2, delay: 0.4, ease: 'power3.out' });
    }
  }

  /* ==========================================================================
     9. 3D TILT EFFECT (Vanilla JS, Zero Dependency)
     ========================================================================== */
  if (!prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('.dish-card, .kitchen-code-card, .portrait-frame');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     10. METRIC COUNTERS ON SCROLL
     ========================================================================== */
  const counters = document.querySelectorAll('.metric-value');
  let countersTriggered = false;

  function runCounters() {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.max(1, Math.floor(target / 40));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        counter.textContent = `${count}${suffix}`;
      }, 35);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersTriggered) {
        countersTriggered = true;
        runCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(aboutSection);
  }

  /* ==========================================================================
     11. RADIAL PROFICIENCY GAUGES & ACCORDION
     ========================================================================== */
  const skillsSection = document.getElementById('skills');
  let skillsTriggered = false;

  function animateGauges() {
    const gaugeCircles = document.querySelectorAll('.gauge-progress-circle');
    gaugeCircles.forEach((circle) => {
      const percentage = parseInt(circle.getAttribute('data-percent') || '0', 10);
      const circumference = 2 * Math.PI * 36; // r=36
      const offset = circumference - (percentage / 100) * circumference;
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = offset;
    });
  }

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !skillsTriggered) {
        skillsTriggered = true;
        animateGauges();
      }
    }, { threshold: 0.25 });
    skillsObserver.observe(skillsSection);
  }

  // Technique Accordion interaction
  const accordionItems = document.querySelectorAll('.technique-accordion-item');
  accordionItems.forEach((item) => {
    const header = item.querySelector('.technique-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     12. SIGNATURE DISHES GALLERY & FILTERING & LIGHTBOX
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const dishCards = document.querySelectorAll('.dish-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      dishCards.forEach((card) => {
        const cuisine = card.getAttribute('data-cuisine');
        if (filter === 'all' || filter === cuisine) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCuisine = document.getElementById('lightboxCuisine');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTechnique = document.getElementById('lightboxTechnique');
  const lightboxStation = document.getElementById('lightboxStation');

  dishCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const cuisine = card.getAttribute('data-cuisine-name');
      const desc = card.getAttribute('data-desc');
      const technique = card.getAttribute('data-technique');
      const station = card.getAttribute('data-station');
      const imgSrc = card.querySelector('.dish-img')?.getAttribute('src');

      if (lightboxImg && imgSrc) lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCuisine) lightboxCuisine.textContent = cuisine;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxTechnique) lightboxTechnique.textContent = technique;
      if (lightboxStation) lightboxStation.textContent = station;

      if (lightboxModal) {
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closePhoneModal();
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     13. TIMELINE SCROLL PROGRESS
     ========================================================================== */
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineContainer = document.getElementById('timelineContainer');

  function updateTimelineProgress() {
    if (!timelineContainer || !timelineProgress) return;
    const rect = timelineContainer.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Check how far we are down the container
    const startOffset = windowH * 0.75;
    const progressPx = Math.max(0, Math.min(rect.height, startOffset - rect.top));
    const pct = (progressPx / rect.height) * 100;

    timelineProgress.style.height = `${pct}%`;

    timelineItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowH * 0.65) {
        item.classList.add('active-step');
      } else {
        item.classList.remove('active-step');
      }
    });
  }

  /* ==========================================================================
     14. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('carouselDots');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let carouselInterval = null;

  // Build dots
  if (dotsContainer && totalSlides > 0) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartCarouselTimer();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startCarouselTimer() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5500);
  }

  function restartCarouselTimer() {
    startCarouselTimer();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      restartCarouselTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      restartCarouselTimer();
    });
  }

  startCarouselTimer();

  // Pause carousel on hover
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselWrapper.addEventListener('mouseleave', () => startCarouselTimer());
  }

  /* ==========================================================================
     15. PRIVACY-RESPECTING CONTACT ACTIONS (No Plaintext Scraped Numbers)
     ========================================================================== */
  const revealPhoneBtn = document.getElementById('revealPhoneBtn');
  const phoneModal = document.getElementById('phoneModal');
  const phoneModalClose = document.getElementById('phoneModalClose');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  function openPhoneModal() {
    if (phoneModal) {
      phoneModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePhoneModal() {
    if (phoneModal) {
      phoneModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (revealPhoneBtn) {
    revealPhoneBtn.addEventListener('click', openPhoneModal);
  }
  if (phoneModalClose) {
    phoneModalClose.addEventListener('click', closePhoneModal);
  }
  if (phoneModal) {
    phoneModal.addEventListener('click', (e) => {
      if (e.target === phoneModal) {
        closePhoneModal();
      }
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phoneNumber = '+8801621529859';
      navigator.clipboard.writeText(phoneNumber).then(() => {
        copyPhoneBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyPhoneBtn.textContent = 'Copy Number';
        }, 2200);
      });
    });
  }

  // Contact Form Submission (Mailto / Formspree Bridge)
  const contactForm = document.getElementById('chefContactForm');
  const formStatus = document.getElementById('formStatusMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const occasion = document.getElementById('formOccasion')?.value.trim();
      const message = document.getElementById('formMessage')?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status-msg error';
          formStatus.textContent = 'Please provide your name, email, and message.';
        }
        return;
      }

      // Generate mailto link
      const subject = encodeURIComponent(`Culinary Inquiry from ${name} [${occasion || 'Restaurant / Event'}]`);
      const body = encodeURIComponent(
        `Dear Chef Mainuddin Ahmed,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}\nOccasion/Role: ${occasion || 'General Inquiry'}`
      );

      // Show confirmation
      if (formStatus) {
        formStatus.className = 'form-status-msg success';
        formStatus.textContent = 'Opening your email client to send your message directly to Chef Mainuddin...';
      }

      setTimeout(() => {
        window.location.href = `mailto:mainddinmd536@gmail.com?subject=${subject}&body=${body}`;
      }, 700);
    });
  }
});
