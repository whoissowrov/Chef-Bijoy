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

  // Culinary dishes dataset
  const projectsData = {
    'sushi': {
      title: 'Artisan Nigiri & Maki Sushi Selection',
      category: 'Sushi & Japanese Delicacies',
      img: 'images/culinary_sushi.jpg',
      client: 'Bhawal Resort & Spa / Radisson Blu',
      year: '2024 – 2026',
      role: 'Station Lead & Sushi Specialist',
      tools: 'Japanese Knives, Fresh Sashimi, Wasabi, Seasoned Sushi Rice',
      description: 'Handcrafted premium sushi presentation. Precision-cut fresh salmon, tuna, cucumber and avocado maki, prepared with traditional Japanese vinegar seasoning and artistic bento/platter presentation for 5-star resort guests.'
    },
    'continental': {
      title: 'Herb-Crusted Beef Tenderloin & Pan-Seared Salmon',
      category: 'Continental & A La Carte Fine Dining',
      img: 'images/culinary_continental.jpg',
      client: 'Radisson Blu Water Garden & Bhawal Resort',
      year: '2021 – 2026',
      role: 'Demi Chef de Partie (DCDP)',
      tools: 'Sous-Vide, Cast Iron Sear, Sauce Reductions, Microgreens',
      description: 'Exquisite 5-star Continental A La Carte presentation. Herb-infused beef tenderloin and crisp-skin salmon served with truffle potato purée, glazed baby carrots, and rich red wine jus reduction.'
    },
    'kabab': {
      title: 'Royal Dum Pukht Seekh Kabab & Garlic Naan',
      category: 'Indian, Tandoor & Mughlai Specialties',
      img: 'images/culinary_kabab_naan.jpg',
      client: 'Specialty Tandoor Kitchen',
      year: '2023 – 2026',
      role: 'Kabab & Naan Craftsman',
      tools: 'Traditional Clay Tandoor, Skewers, Aromatic Spices, Ghee',
      description: 'Authentic clay tandoor cooking. Tender spiced minced meat kababs, slow-marinated in traditional spices, skewered and charred to perfection. Paired with blistered garlic coriander butter naan made to order.'
    },
    'dumplings': {
      title: 'Handcrafted Steamed Asian Dim Sum & Dumplings',
      category: 'Asian & Oriental Specialties',
      img: 'images/culinary_dumplings.jpg',
      client: 'Bhawal Resort & Spa',
      year: '2024 – 2026',
      role: 'Dim Sum & Asian Station Cook',
      tools: 'Bamboo Steamers, Hand-rolled Wrappers, Chili Crisp Oil',
      description: 'Hand-folded artisanal Asian dumplings with translucent wrappers, filled with seasoned prawns, scallions, and water chestnuts. Served in layered bamboo steamers with chili dipping oils.'
    },
    'baking': {
      title: 'Artisan Viennoiserie, Breads & Gourmet Pastry',
      category: 'NSDA Level 3 Certified Baking & Pastry',
      img: 'images/culinary_baking_pastry.jpg',
      client: 'Resort Bakery & NSDA Certification Center',
      year: '2023 – 2026',
      role: 'Certified Baker (NSDA Level 3)',
      tools: 'Deck Oven, Proofer, Laminator, Artisan Fermentation',
      description: 'Certified under Bangladesh National Skills Development Authority (Level 3 Baking). Mastery in laminated croissant dough, sourdough loaves, brioche, and fine dining dessert components.'
    },
    'buffet': {
      title: 'Grand 5-Star Resort Banquet & Buffet Spread',
      category: 'High-Volume Catering & Live Stations',
      img: 'images/culinary_buffet_banquet.jpg',
      client: 'Radisson Blu Dhaka & Bhawal Resort',
      year: '2021 – 2026',
      role: 'Buffet & Banquet Production Specialist',
      tools: 'Chafing Units, Live Carving Station, Salad Display',
      description: 'Coordinated multi-course breakfast, lunch, and dinner buffet spreads catering to 400–800 guests daily. Coordinated hot line replenishment, allergen safety checks, and aesthetic presentation.'
    },
    'salad': {
      title: 'Gourmet Appetizer & Dietary-Restricted Salad',
      category: 'Vegan, Gluten-Free & Allergen-Safe Dining',
      img: 'images/culinary_salad_appetizer.jpg',
      client: 'Five-Star Wellness Dining',
      year: '2024 – 2026',
      role: 'Garde Manger & Dietary Menu Specialist',
      tools: 'Farm-Fresh Greens, House Emulsions, Edible Flowers',
      description: 'Specialized dishes engineered for guests with gluten intolerances, vegan preferences, and strict dietary guidelines without compromising on visual sophistication or gourmet flavor.'
    },
    'livekitchen': {
      title: 'Live Wok & Interactive Sauté Station',
      category: 'Live Station Cooking & Guest Engagement',
      img: 'images/culinary_kitchen_action.jpg',
      client: 'Bhawal Resort & Spa',
      year: '2025 – 2026',
      role: 'Demi Chef de Partie (DCDP)',
      tools: 'High-Heat Wok, Flambé Station, Guest Interaction',
      description: 'Dynamic live interactive culinary showmanship for resort guests. Fast wok tosses, searing, and custom ingredient selections prepared fresh in front of dining patrons.'
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

  // 5b. Dual CV Download Modal Handling (<dialog> Native API)
  const cvModal = document.getElementById('cvModal');
  const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');
  const cvModalCancelBtn = document.getElementById('cvModalCancelBtn');
  const cvCardExecutive = document.getElementById('cvCardExecutive');
  const cvCardClassic = document.getElementById('cvCardClassic');
  const cvModalDownloadBtn = document.getElementById('cvModalDownloadBtn');
  const cvModalDownloadBtnText = document.getElementById('cvModalDownloadBtnText');
  const cvFooterSelectionText = document.getElementById('cvFooterSelectionText');
  const cvFooterSelectionSub = document.getElementById('cvFooterSelectionSub');

  const cvData = {
    executive: {
      title: 'Executive 2-Page CV (Recommended)',
      file: 'Md_Imran_Hasan_Bijoy_Executive_CV.pdf',
      sub: 'File: Md_Imran_Hasan_Bijoy_Executive_CV.pdf (552 KB)',
      btnText: 'Download Executive 2-Page CV (PDF)'
    },
    classic: {
      title: 'Original 3-Page Full CV',
      file: 'Md_Imran_Hasan_Bijoy_Classic_CV.pdf',
      sub: 'File: Md_Imran_Hasan_Bijoy_Classic_CV.pdf (1.62 MB)',
      btnText: 'Download Classic 3-Page CV (PDF)'
    }
  };

  let selectedCvKey = 'executive';

  const selectCvOption = (key) => {
    selectedCvKey = key;
    if (key === 'executive') {
      if (cvCardExecutive) {
        cvCardExecutive.classList.add('active');
        cvCardExecutive.setAttribute('aria-checked', 'true');
        const stat = cvCardExecutive.querySelector('.cv-card-status');
        if (stat) stat.textContent = 'Selected';
      }
      if (cvCardClassic) {
        cvCardClassic.classList.remove('active');
        cvCardClassic.setAttribute('aria-checked', 'false');
        const stat = cvCardClassic.querySelector('.cv-card-status');
        if (stat) stat.textContent = 'Select this format';
      }
    } else {
      if (cvCardClassic) {
        cvCardClassic.classList.add('active');
        cvCardClassic.setAttribute('aria-checked', 'true');
        const stat = cvCardClassic.querySelector('.cv-card-status');
        if (stat) stat.textContent = 'Selected';
      }
      if (cvCardExecutive) {
        cvCardExecutive.classList.remove('active');
        cvCardExecutive.setAttribute('aria-checked', 'false');
        const stat = cvCardExecutive.querySelector('.cv-card-status');
        if (stat) stat.textContent = 'Select this format';
      }
    }

    const info = cvData[key];
    if (info && cvModalDownloadBtn) {
      cvModalDownloadBtn.href = info.file;
      cvModalDownloadBtn.setAttribute('download', info.file);
      if (cvModalDownloadBtnText) cvModalDownloadBtnText.textContent = info.btnText;
      if (cvFooterSelectionText) {
        cvFooterSelectionText.innerHTML = `Selected: <strong>${info.title}</strong>`;
      }
      if (cvFooterSelectionSub) {
        cvFooterSelectionSub.textContent = info.sub;
      }
    }
  };

  if (cvCardExecutive) {
    cvCardExecutive.addEventListener('click', () => selectCvOption('executive'));
    cvCardExecutive.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCvOption('executive');
      }
    });
  }

  if (cvCardClassic) {
    cvCardClassic.addEventListener('click', () => selectCvOption('classic'));
    cvCardClassic.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCvOption('classic');
      }
    });
  }

  const openCvModal = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (cvModal && typeof cvModal.showModal === 'function') {
      cvModal.showModal();
    }
  };

  const closeCvModal = () => {
    if (cvModal && typeof cvModal.close === 'function') {
      cvModal.close();
    }
  };

  if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
  if (cvModalCancelBtn) cvModalCancelBtn.addEventListener('click', closeCvModal);

  // Close CV dialog on clicking outside dialog-content (backdrop click)
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      const rect = cvModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeCvModal();
      }
    });
  }

  // Single Download Button inside modal: initiates download and smoothly closes modal
  if (cvModalDownloadBtn) {
    cvModalDownloadBtn.addEventListener('click', () => {
      const toastNoticeEl = document.getElementById('toastNotice');
      if (toastNoticeEl) {
        const txt = toastNoticeEl.querySelector('.toast-text');
        if (txt) txt.textContent = `Downloading ${cvData[selectedCvKey].title}...`;
        toastNoticeEl.classList.add('show');
        setTimeout(() => toastNoticeEl.classList.remove('show'), 3500);
      }
      setTimeout(() => {
        closeCvModal();
      }, 500);
    });
  }

  // Bind all CV download links across the website to open this modal
  const cvTriggers = document.querySelectorAll(
    'a[download*="CV.pdf"], a[href*="CV.pdf"], #heroDownloadCvBtn, #aboutDownloadCvBtn, .cv-modal-trigger'
  );
  cvTriggers.forEach(btn => {
    // Exclude the download button and preview links inside the modal itself
    if (!btn.closest('#cvModal')) {
      btn.addEventListener('click', (e) => {
        openCvModal(e);
      });
    }
  });

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
        showToast('Thank you! Your culinary inquiry has been received. Chef Bijoy will get in touch with you shortly.');
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
