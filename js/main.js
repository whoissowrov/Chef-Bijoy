/**
 * UNFOLD PORTFOLIO - JAVASCRIPT CONTROLLER
 * Comprehensive interactions: Theme toggle, Portfolio filter, Project Dialog,
 * Skills counter animation, Testimonials carousel, Contact form, and Smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light with persistence)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rootElement = document.documentElement;

  const getSavedTheme = () => {
    const saved = localStorage.getItem('unfold_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('unfold_theme', theme);

    if (themeToggleBtn) {
      if (theme === 'light') {
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
        themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        `;
      } else {
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
        themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0-1.41-1.41l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0-1.41-1.41l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
        `;
      }
    }
  };

  // Initialize Theme
  applyTheme(getSavedTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = rootElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // 2. Navbar Scroll Style & Active Navigation Link Tracking
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy Highlight
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 3. Mobile Hamburger Menu Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list .nav-link');

  if (mobileMenuBtn && mobileNavDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileMenuBtn.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Interactive Project Modal Dialog (<dialog> Native API)
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalYear = document.getElementById('modalYear');
  const modalRole = document.getElementById('modalRole');
  const modalTools = document.getElementById('modalTools');
  const modalDescription = document.getElementById('modalDescription');

  // Project details dataset
  const projectsData = {
    'webapp': {
      title: 'CloudFlow — Enterprise Analytics SaaS Platform',
      category: 'Web Application & Full-Stack Development',
      img: 'images/project_mobile_ui.jpg',
      client: 'CloudFlow Technologies Inc.',
      year: '2026',
      role: 'Lead Web Application Developer',
      tools: 'React, Node.js, PostgreSQL, Tailwind, REST APIs',
      description: 'Architected and built a mission-critical SaaS analytics web application serving 45,000+ daily active users. Features real-time websocket data feeds, role-based access control, custom charting dashboards, and sub-100ms API response latency.'
    },
    'ecommerce': {
      title: 'Veloce Footwear — High-Conversion E-Commerce Platform',
      category: 'Web Development & Conversion Funnel',
      img: 'images/project_sneaker.jpg',
      client: 'Veloce Athletics UK',
      year: '2026',
      role: 'Full-Stack Web Developer & CRO Specialist',
      tools: 'Next.js, Headless Shopify, Stripe API, Core Web Vitals 99+',
      description: 'Engineered a headless e-commerce web platform engineered for extreme speed and conversion. Reduced average page load time from 4.8s to 0.7s, resulting in an immediate 180% surge in completed checkouts and $1.2M in quarterly online revenue.'
    },
    'ads': {
      title: 'Aeterna Horology — 4.5x ROAS Multi-Channel Paid Ads',
      category: 'Digital Marketing & Paid Ads (Meta & Google)',
      img: 'images/project_watch.jpg',
      client: 'Aeterna Watchmakers Geneva',
      year: '2025',
      role: 'Senior Digital Marketing Strategist',
      tools: 'Meta Ads Manager, Google Ads, GA4, Looker Studio',
      description: 'Planned and managed a $280k advertising budget across Meta and Google Search. Designed custom high-intent sales landing pages and video ad creatives that slashed customer acquisition cost (CAC) by 42% while generating a verified 4.5x return on ad spend (ROAS).'
    },
    'social': {
      title: 'Aurora Clean Beauty — Viral Social Media Growth',
      category: 'Social Media Management & Community Strategy',
      img: 'images/project_packaging.jpg',
      client: 'Aurora Clean Beauty Co.',
      year: '2025',
      role: 'Head of Social Media & Content Strategy',
      tools: 'CapCut, Meta Business Suite, TikTok Creator, Canva Pro',
      description: 'Spearheaded organic social media transformation from 12k to over 850k followers across Instagram and TikTok within 7 months. Produced viral short-form video reels that generated 14M organic views and established Aurora as a top trending clean beauty brand.'
    },
    'portal': {
      title: 'Apex Spatial — Cloud Customer Portal',
      category: 'Web Application & Cloud Architecture',
      img: 'images/project_architecture.jpg',
      client: 'Apex Spatial Infrastructure',
      year: '2025',
      role: 'Full-Stack Web Developer',
      tools: 'Vue.js / Nuxt, Python FastAPI, Docker, TailwindCSS',
      description: 'Built an enterprise customer portal allowing commercial clients to visualize spatial assets, manage support tickets, and download automated compliance reports. Engineered zero-downtime deployment pipelines and hardened OAuth2 security.'
    },
    'funnel': {
      title: 'Elara Advisory — Omnichannel Lead Gen Funnel',
      category: 'Digital Marketing & Social Media Strategy',
      img: 'images/project_branding.jpg',
      client: 'Elara Private Advisory London',
      year: '2025',
      role: 'Growth Marketing & Social Media Lead',
      tools: 'HubSpot, LinkedIn Ads, Automated Email Sequences, SEO',
      description: 'Designed an omnichannel high-net-worth lead generation machine combining thought leadership content on LinkedIn with automated email nurturing funnels, yielding 340+ verified qualified investor leads in under six months.'
    }
  };

  portfolioCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = projectsData[projectId];

      if (data && projectModal) {
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalClient.textContent = data.client;
        modalYear.textContent = data.year;
        modalRole.textContent = data.role;
        modalTools.textContent = data.tools;
        modalDescription.textContent = data.description;

        projectModal.showModal();
      }
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.close();
    });

    // Close on clicking backdrop
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        projectModal.close();
      }
    });
  }

  // 6. Animated Skills Counters on Scroll
  const skillCircles = document.querySelectorAll('.skill-circle-bar');
  const skillNumbers = document.querySelectorAll('.skill-number');
  let animatedSkills = false;

  const animateSkills = () => {
    if (animatedSkills) return;

    skillCircles.forEach((circle, index) => {
      const target = parseInt(circle.getAttribute('data-percent'), 10);
      const circumference = 339; // 2 * PI * r (r=54)
      const offset = circumference - (circumference * target) / 100;
      circle.style.strokeDashoffset = offset;

      // Animate text counter
      const numElement = skillNumbers[index];
      let currentVal = 0;
      const stepTime = 1800 / target;
      const counterTimer = setInterval(() => {
        currentVal++;
        if (numElement) numElement.textContent = `${currentVal}%`;
        if (currentVal >= target) {
          clearInterval(counterTimer);
        }
      }, stepTime);
    });

    animatedSkills = true;
  };

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

  // 7. Interactive Testimonials Carousel
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  let currentTestimonialIndex = 0;
  let testimonialAutoInterval;

  const showTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonialIndex = index;
  };

  const nextTestimonial = () => {
    let nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    let prevIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIndex);
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextTestimonial();
      resetTestimonialTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevTestimonial();
      resetTestimonialTimer();
    });

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        resetTestimonialTimer();
      });
    });

    const startTestimonialTimer = () => {
      testimonialAutoInterval = setInterval(nextTestimonial, 6000);
    };

    const resetTestimonialTimer = () => {
      clearInterval(testimonialAutoInterval);
      startTestimonialTimer();
    };

    startTestimonialTimer();
  }

  // 8. Contact Form Handling with Toast Feedback
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const toastNotice = document.getElementById('toastNotice');

  const showToast = (message) => {
    if (!toastNotice) return;
    toastNotice.querySelector('.toast-text').textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending Message...
      `;

      // Simulate asynchronous sending
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully. I will be in touch shortly.');
      }, 1200);
    });
  }

  // 9. Hardware-Accelerated Smooth Gliding Navigation & Back-to-Top Controller
  // Internal anchor links smooth navigation with exact navbar offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 82;
        const targetOffset = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // Floating Back-to-Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 10. Custom Blue Arrow Cursor Pointer Controller (Matching Sowrov's Spec)
  const cursorArrow = document.getElementById('cursorArrow');

  if (cursorArrow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // Enable custom cursor mode on HTML
    document.documentElement.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', (e) => {
      cursorArrow.style.left = `${e.clientX}px`;
      cursorArrow.style.top = `${e.clientY}px`;
      cursorArrow.classList.remove('hidden');
    });

    // Interactive target selectors
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .filter-btn, .social-link, .client-brand, .slider-btn, .slider-dot, .theme-toggle-btn, .back-to-top-btn';

    document.addEventListener('mouseover', (e) => {
      // Portfolio Card Hover: show magnetic "VIEW" badge
      if (e.target.closest('.portfolio-card')) {
        cursorArrow.classList.add('card-hover');
        cursorArrow.classList.remove('hover');
        return;
      }

      // Standard Links / Buttons Hover: subtle scale and blue glow
      if (e.target.closest(interactiveSelectors)) {
        cursorArrow.classList.add('hover');
        cursorArrow.classList.remove('card-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.portfolio-card')) {
        cursorArrow.classList.remove('card-hover');
      }

      if (e.target.closest(interactiveSelectors)) {
        cursorArrow.classList.remove('hover');
      }
    });

    // Tactile click press feedback
    window.addEventListener('mousedown', () => {
      cursorArrow.classList.add('active');
    });

    window.addEventListener('mouseup', () => {
      cursorArrow.classList.remove('active');
    });

    // Visibility toggling when leaving / entering document
    document.addEventListener('mouseleave', () => {
      cursorArrow.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
      cursorArrow.classList.remove('hidden');
    });
  }
});
