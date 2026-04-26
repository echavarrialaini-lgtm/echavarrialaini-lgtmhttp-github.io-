/* ============================================================
   PORTAL WEB PERSONAL — LAINI ECHAVARRIA
   script.js — Interactividad con JavaScript puro
   Programación Web · ITLA · 2025
   ============================================================ */

// ============================================================
// 1. SALUDO DINÁMICO POR HORA DEL DÍA
// ============================================================
(function saludoDinamico() {
    const hora = new Date().getHours();
    let saludo;
  
    if (hora >= 5 && hora < 12) {
      saludo = '☀️ Buenos días — Tecnóloga en Multimedia · ITLA';
    } else if (hora >= 12 && hora < 18) {
      saludo = '🌤️ Buenas tardes — Tecnóloga en Multimedia · ITLA';
    } else {
      saludo = '🌙 Buenas noches — Tecnóloga en Multimedia · ITLA';
    }
  
    const el = document.getElementById('saludo-dinamico');
    if (el) el.textContent = saludo;
  })();
  
  
  // ============================================================
  // 2. HEADER — EFECTO SCROLL
  // ============================================================
  (function headerScroll() {
    const header = document.getElementById('header');
    if (!header) return;
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  })();
  
  
  // ============================================================
  // 3. MENÚ HAMBURGUESA (mobile)
  // ============================================================
  (function menuHamburguesa() {
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;
  
    hamburger.addEventListener('click', () => {
      const abierto = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', abierto);
      hamburger.setAttribute('aria-expanded', abierto);
    });
  
    mobileMenu.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  })();
  
  
  // ============================================================
  // 4. SCROLL SPY — NAV ACTIVO SEGÚN SECCIÓN VISIBLE
  // ============================================================
  (function scrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
  
    sections.forEach(section => observer.observe(section));
  })();
  
  
  // ============================================================
  // 5. FILTRO DE PROYECTOS
  // ============================================================
  (function filtroProyectos() {
    const filterBtns   = document.querySelectorAll('.f-btn');
    const projectCards = document.querySelectorAll('.pcard');
    if (!filterBtns.length || !projectCards.length) return;
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const filtro = btn.getAttribute('data-f');
  
        projectCards.forEach(card => {
          const categoria = card.getAttribute('data-cat');
  
          if (filtro === 'all' || filtro === 'todos' || categoria === filtro) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity    = '1';
                card.style.transform  = 'translateY(0)';
              }, 20);
            });
          } else {
            card.style.transition = 'opacity 0.2s ease';
            card.style.opacity    = '0';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  })();
  
  
  // ============================================================
  // 6. MODAL VISOR DE PROYECTOS
  // ============================================================
  function openProject(id, title, url) {
    const modal   = document.getElementById('proj-modal');
    const iframe  = document.getElementById('modal-iframe');
    const loader  = document.getElementById('modal-loader');
    const titleEl = document.getElementById('modal-title-txt');
    const urlEl   = document.getElementById('modal-proj-url');
    const extLink = document.getElementById('modal-open-new');
  
    if (!modal || !iframe) return;
  
    // El portal final solo hace scroll hacia arriba
    if (url === '#inicio') {
      document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  
    if (titleEl) titleEl.textContent = title;
    if (urlEl)   urlEl.textContent   = url;
    if (extLink) extLink.href        = url;
  
    if (loader) loader.style.display = 'flex';
    iframe.src = '';
  
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  
    iframe.onload = function () {
      if (loader) loader.style.display = 'none';
    };
    iframe.src = url;
  }
  
  function closeProject() {
    const modal  = document.getElementById('proj-modal');
    const iframe = document.getElementById('modal-iframe');
    if (!modal) return;
  
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  
    setTimeout(() => {
      if (iframe) iframe.src = '';
    }, 300);
  }
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeProject();
  });
  
  
  // ============================================================
  // 7. ANIMACIÓN DE BARRAS DE HABILIDADES
  // ============================================================
  (function animarBarras() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
  
    fills.forEach(fill => observer.observe(fill));
  })();
  
  
  // ============================================================
  // 8. MENSAJE RÁPIDO
  // ============================================================
  function mensajeRapido() {
    const confirmacion = document.getElementById('confirm-msg');
    const btn          = document.getElementById('btn-rapido');
    if (!confirmacion || !btn) return;
  
    confirmacion.classList.remove('hidden');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Mensaje enviado ✓';
    btn.style.opacity = '0.6';
  
    setTimeout(() => {
      confirmacion.classList.add('hidden');
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Mensaje rápido';
      btn.style.opacity = '1';
    }, 4000);
  }
  
  
  // ============================================================
  // 9. FORMULARIO DE CONTACTO
  // ============================================================
  function enviarForm() {
    const nombre   = document.getElementById('f-nombre');
    const email    = document.getElementById('f-email');
    const mensaje  = document.getElementById('f-msg');
    const feedback = document.getElementById('form-fb');
    if (!nombre || !email || !mensaje || !feedback) return;
  
    if (!nombre.value.trim()) {
      mostrarFeedback(feedback, '⚠️ Por favor, escribe tu nombre.', 'error');
      nombre.focus();
      return;
    }
  
    if (!email.value.trim() || !email.value.includes('@')) {
      mostrarFeedback(feedback, '⚠️ Ingresa un correo electrónico válido.', 'error');
      email.focus();
      return;
    }
  
    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
      mostrarFeedback(feedback, '⚠️ El mensaje debe tener al menos 10 caracteres.', 'error');
      mensaje.focus();
      return;
    }
  
    mostrarFeedback(
      feedback,
      `✦ ¡Gracias, ${nombre.value.trim()}! Tu mensaje fue enviado correctamente. Te contactaré pronto.`,
      'success'
    );
  
    nombre.value  = '';
    email.value   = '';
    mensaje.value = '';
  
    setTimeout(() => {
      feedback.classList.add('hidden');
      feedback.className = 'form-fb hidden';
    }, 5000);
  }
  
  function mostrarFeedback(el, texto, tipo) {
    el.textContent = texto;
    el.className   = `form-fb ${tipo}`;
    el.classList.remove('hidden');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }