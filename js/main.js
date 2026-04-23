(function () {
  'use strict';

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navbarMenu = document.getElementById('navbarMenu');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== HAMBURGER MENU =====
  if (hamburger && navbarMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navbarMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on nav link click
    navbarMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && navbarMenu.classList.contains('open')) {
        navbarMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Gửi thành công!';
        btn.style.background = 'var(--accent-700)';

        showToast('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.', 'success');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1800);
    });
  }

  // ===== TOAST NOTIFICATION =====
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    const styles = `
      position: fixed;
      bottom: 32px;
      right: 32px;
      background: ${type === 'success' ? 'var(--primary-900)' : '#e53e3e'};
      color: white;
      padding: 16px 24px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-body);
      font-size: 0.9rem;
      max-width: 380px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      z-index: 9999;
      border-left: 4px solid ${type === 'success' ? 'var(--primary-300)' : '#fed7d7'};
      animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    `;

    toast.setAttribute('style', styles);
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ===== BLOG SEARCH (UI only) =====
  const searchForm = document.querySelector('.search-input-wrap');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }

  // ===== PAGINATION (UI only) =====
  document.querySelectorAll('.page-btn').forEach(btn => {
    if (!btn.classList.contains('active') && !btn.disabled) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
        if (!this.querySelector('i')) {
          this.classList.add('active');
        }
      });
    }
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
      backToTop.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== SERVICES TAB (services page) =====
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabPanels = document.querySelectorAll('.service-tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const panel = document.getElementById(target);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });
  }

})();
