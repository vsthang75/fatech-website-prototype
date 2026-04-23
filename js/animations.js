(function () {
  'use strict';

  // ===== INTERSECTION OBSERVER — Scroll Reveal =====
  const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger'
  );

  if (revealTargets.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealTargets.forEach(el => el.classList.add('revealed'));
  }

  // ===== COUNTER ANIMATION =====
  const counterEls = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);

      el.textContent = current.toLocaleString('vi-VN') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if (counterEls.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach(el => counterObserver.observe(el));
  } else {
    counterEls.forEach(el => {
      const suffix = el.dataset.suffix || '';
      el.textContent = parseInt(el.dataset.count, 10).toLocaleString('vi-VN') + suffix;
    });
  }

  // ===== STAGGER SERVICE CARDS =====
  function addStaggerToGrid(selector) {
    const grid = document.querySelector(selector);
    if (!grid) return;

    const children = grid.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  }

  addStaggerToGrid('.services-grid');
  addStaggerToGrid('.blog-grid-home');
  addStaggerToGrid('.why-grid');
  addStaggerToGrid('.team-grid');
  addStaggerToGrid('.stats-grid');

  // ===== PARALLAX — hero orbs (subtle) =====
  const heroOrbs = document.querySelectorAll('.hero-orb');

  if (heroOrbs.length > 0) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          heroOrbs.forEach((orb, i) => {
            const speed = 0.05 + i * 0.02;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== TIMELINE ITEMS REVEAL =====
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length > 0 && 'IntersectionObserver' in window) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 0);
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    timelineItems.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = `opacity 0.55s ease ${i * 120}ms, transform 0.55s ease ${i * 120}ms`;
      timelineObserver.observe(item);
    });
  }

})();
