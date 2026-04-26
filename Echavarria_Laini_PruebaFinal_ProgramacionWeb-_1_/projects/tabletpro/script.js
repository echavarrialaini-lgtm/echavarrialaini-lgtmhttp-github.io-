/* ================================================================
   TabletPro – script.js
   Interactividad JavaScript para el sitio (Caso 4)
   Autor: Práctica Programación Web – ITLA
   ================================================================ */

/* ----------------------------------------------------------------
   FUNCIÓN 1 – Mostrar / ocultar especificaciones técnicas
   Al hacer clic en el botón, se alterna la visibilidad del panel
   de especificaciones usando el atributo "hidden" y aria-hidden.
   ---------------------------------------------------------------- */
   (function inicializarToggleSpecs() {
    // Obtenemos el botón y el panel de especificaciones del DOM
    const btnSpecs  = document.getElementById('btn-specs');
    const specsPanel = document.getElementById('specs-hero');
  
    // Verificamos que ambos elementos existan antes de continuar
    if (!btnSpecs || !specsPanel) return;
  
    btnSpecs.addEventListener('click', function () {
      // Leemos el estado actual del panel (visible u oculto)
      const estaOculto = specsPanel.hidden;
  
      if (estaOculto) {
        // Si estaba oculto, lo mostramos
        specsPanel.hidden = false;
        specsPanel.setAttribute('aria-hidden', 'false');
        btnSpecs.setAttribute('aria-expanded', 'true');
        btnSpecs.textContent = 'Ocultar especificaciones técnicas';
      } else {
        // Si estaba visible, lo ocultamos
        specsPanel.hidden = true;
        specsPanel.setAttribute('aria-hidden', 'true');
        btnSpecs.setAttribute('aria-expanded', 'false');
        btnSpecs.textContent = 'Ver especificaciones técnicas';
      }
    });
  })();
  
  
  /* ----------------------------------------------------------------
     FUNCIÓN 2 – Simulador de descuento
     Calcula el precio de la tableta destacada aplicando un descuento
     del 10 % o 15 % según la opción seleccionada por el usuario.
     ---------------------------------------------------------------- */
  (function inicializarSimuladorDescuento() {
    const btnDescuento   = document.getElementById('btn-descuento');
    const selectDescuento = document.getElementById('descuento-select');
    const precioDisplay  = document.getElementById('precio-hero');
  
    // Precio base original de la tableta destacada (en dólares)
    const PRECIO_BASE = 1199.99;
  
    if (!btnDescuento || !selectDescuento || !precioDisplay) return;
  
    btnDescuento.addEventListener('click', function () {
      // Obtenemos el porcentaje de descuento elegido (como número entero)
      const porcentaje = parseInt(selectDescuento.value, 10);
  
      // Calculamos el precio final aplicando el descuento
      const descuento   = PRECIO_BASE * (porcentaje / 100);
      const precioFinal = PRECIO_BASE - descuento;
  
      // Actualizamos el texto del precio con dos decimales
      precioDisplay.textContent = '$' + precioFinal.toFixed(2);
  
      // Feedback visual: si hay descuento, coloreamos el precio en verde
      if (porcentaje > 0) {
        precioDisplay.style.color = '#22c55e'; // verde de ahorro
        precioDisplay.title = `Precio con ${porcentaje}% de descuento aplicado`;
      } else {
        precioDisplay.style.color = ''; // volvemos al color original (CSS)
        precioDisplay.title = '';
      }
    });
  })();
  
  
  /* ----------------------------------------------------------------
     FUNCIÓN 3 – Cambio dinámico de imagen al hacer clic
     Al pulsar los botones de miniatura, la imagen principal del hero
     se actualiza sin necesidad de recargar la página.
     ---------------------------------------------------------------- */
  (function inicializarCambioImagen() {
    const imgHero = document.getElementById('img-hero');
    // Seleccionamos todos los botones de miniatura
    const thumbBtns = document.querySelectorAll('.thumb-btn');
  
    if (!imgHero || thumbBtns.length === 0) return;
  
    thumbBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Leemos la URL y el texto alternativo del botón pulsado
        const nuevaSrc = btn.getAttribute('data-src');
        const nuevoAlt = btn.getAttribute('data-alt');
  
        // Aplicamos una transición suave antes de cambiar la imagen
        imgHero.style.opacity = '0';
        imgHero.style.transform = 'scale(0.97)';
  
        // Después de la transición (300ms), cambiamos src y restauramos
        setTimeout(function () {
          imgHero.src = nuevaSrc;
          imgHero.alt = nuevoAlt;
          imgHero.style.opacity = '1';
          imgHero.style.transform = 'scale(1)';
        }, 300);
  
        // Actualizamos la clase "active" en los botones de miniatura
        thumbBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  
    // Agregamos la transición al elemento img mediante JS para que funcione
    imgHero.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  })();
  
  
  /* ----------------------------------------------------------------
     FUNCIÓN 4 – Comparador básico de RAM entre dos tabletas
     El usuario selecciona dos tabletas y el sistema indica cuál de
     las dos posee mayor cantidad de RAM (en GB).
     ---------------------------------------------------------------- */
  (function inicializarComparadorRAM() {
    const btnComparar    = document.getElementById('btn-comparar');
    const selectTabletA  = document.getElementById('tablet-a');
    const selectTabletB  = document.getElementById('tablet-b');
    const resultadoParrafo = document.getElementById('resultado-comparador');
  
    if (!btnComparar || !selectTabletA || !selectTabletB || !resultadoParrafo) return;
  
    btnComparar.addEventListener('click', function () {
      // Obtenemos los valores de RAM seleccionados como números enteros
      const ramA = parseInt(selectTabletA.value, 10);
      const ramB = parseInt(selectTabletB.value, 10);
  
      // Obtenemos el texto del option seleccionado para mostrarlo al usuario
      const nombreA = selectTabletA.options[selectTabletA.selectedIndex].text;
      const nombreB = selectTabletB.options[selectTabletB.selectedIndex].text;
  
      let mensaje = '';
  
      // Comparamos los valores de RAM y construimos el mensaje
      if (ramA > ramB) {
        mensaje = `🏆 ${nombreA} tiene más RAM (${ramA} GB vs ${ramB} GB).`;
      } else if (ramB > ramA) {
        mensaje = `🏆 ${nombreB} tiene más RAM (${ramB} GB vs ${ramA} GB).`;
      } else {
        // Caso de empate
        mensaje = `🤝 Ambas tabletas tienen la misma RAM: ${ramA} GB.`;
      }
  
      // Mostramos el resultado en el párrafo de resultado
      resultadoParrafo.textContent = mensaje;
    });
  })();
  
  
  /* ----------------------------------------------------------------
     FUNCIÓN 5 – Frases tecnológicas rotativas con setInterval()
     Cada 5 segundos se muestra una nueva frase motivacional en el
     encabezado del sitio, con una transición de desvanecimiento.
     ---------------------------------------------------------------- */
  (function inicializarFrasesRotativas() {
    const elementoFrase = document.getElementById('frase-rotativa');
  
    if (!elementoFrase) return;
  
    // Lista de frases tecnológicas para mostrar en rotación
    const frases = [
      'Tecnología que te acompaña a donde vayas.',
      'Elige tu tableta. Potencia tu futuro.',
      'El conocimiento no tiene límites; tu dispositivo, tampoco.',
      'Crea, diseña y trabaja sin fronteras.',
      'La herramienta correcta lo cambia todo.',
      'Rendimiento profesional en la palma de tu mano.',
      'Innova cada día con TabletPro.'
    ];
  
    // Índice de la frase actual (empieza en 1 porque la primera ya está en el HTML)
    let indiceActual = 1;
  
    // Configuramos el intervalo para cambiar la frase cada 5 segundos
    setInterval(function () {
      // Paso 1: desvanecemos la frase actual
      elementoFrase.style.opacity = '0';
  
      // Paso 2: después de 500ms (duración del fade), actualizamos el texto
      setTimeout(function () {
        elementoFrase.textContent = frases[indiceActual];
        elementoFrase.style.opacity = '1'; // volvemos a mostrar
  
        // Avanzamos al siguiente índice de forma circular
        indiceActual = (indiceActual + 1) % frases.length;
      }, 500);
  
    }, 5000); // Intervalo de 5 segundos entre cada frase
  })();
  
  
  /* ----------------------------------------------------------------
     EXTRA – Menú hamburguesa responsivo
     En pantallas pequeñas, el botón hamburguesa muestra u oculta
     el menú de navegación principal.
     ---------------------------------------------------------------- */
  (function inicializarMenuMovil() {
    const btnToggle = document.getElementById('menu-toggle');
    const mainNav   = document.getElementById('main-nav');
  
    if (!btnToggle || !mainNav) return;
  
    btnToggle.addEventListener('click', function () {
      // Alternamos la clase "open" en el menú para mostrarlo u ocultarlo
      const estaAbierto = mainNav.classList.toggle('open');
  
      // Actualizamos el atributo aria para accesibilidad
      btnToggle.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
    });
  
    // Cerramos el menú al hacer clic en cualquier enlace de navegación
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        btnToggle.setAttribute('aria-expanded', 'false');
      });
    });
  })();