document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
  );

  // --- Animación Hero ---
  $(".hero h1, .hero p, .hero a").hide().fadeIn(1500);

  // --- Filtro Destinos ---
  $(".btn-filtro").on("click", function() {
    $(".btn-filtro").removeClass("active");
    $(this).addClass("active");
    
    const filterValue = $(this).attr("data-filter");
    if(filterValue === "all") {
      $(".item-destino").show(400);
    } else {
      $(".item-destino").hide().filter(`[data-category="${filterValue}"]`).show(400);
    }
  });

  // --- Zoom Cards Destinos ---
  $(".zoom-card").on("mouseenter", function() {
    $(this).addClass("zoom-activo");
  }).on("mouseleave", function() {
    $(this).removeClass("zoom-activo");
  });

  // --- Efecto Flip Agencias ---
  $(".tarjeta-giratoria").on("click", function() {
    $(this).find(".giratoria-interior").toggleClass("flipped");
  });

  // --- Rating Agencias ---
  $(".estrellas-rating i").on("click", function(e) {
    e.stopPropagation(); // Evitar voltear la tarjeta al puntuar
    const value = parseInt($(this).attr("data-val"));
    const container = $(this).parent();
    container.attr("data-rating", value);
    
    container.find("i").removeClass("bi-star-fill bi-star");
    container.find("i").each(function() {
      const starVal = parseInt($(this).attr("data-val"));
      if(starVal <= value) {
        $(this).addClass("bi-star-fill");
      } else {
        $(this).addClass("bi-star");
      }
    });
  });

  // --- Filtro Blog ---
  $(".filtro-blog").on("click", function(e) {
    e.preventDefault();
    $(".filtro-blog").removeClass("fw-bold");
    $(this).addClass("fw-bold");
    
    const filterValue = $(this).attr("data-filter");
    if(filterValue === "all") {
      $(".articulo-blog").show(400);
    } else {
      $(".articulo-blog:not(aside .articulo-blog)").hide().filter(`[data-category="${filterValue}"]`).show(400);
    }
  });

  // --- Animación Scroll con Intersection Observer ---
  const animateElements = document.querySelectorAll(".scroll-animate");
  if(animateElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          $(entry.target).hide().fadeIn(800);
          $(entry.target).removeClass("scroll-animate");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => scrollObserver.observe(el));
  }

  // --- Lógica del Modo Oscuro ---
  const botonTema = document.getElementById("boton-tema");
  if (botonTema) {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
      document.documentElement.setAttribute("data-tema", "oscuro");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }

    botonTema.addEventListener("click", () => {
      const temaActual = document.documentElement.getAttribute("data-tema");
      if (temaActual === "oscuro") {
        document.documentElement.removeAttribute("data-tema");
        document.documentElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("tema", "claro");
      } else {
        document.documentElement.setAttribute("data-tema", "oscuro");
        document.documentElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("tema", "oscuro");
      }
    });
  }

  // --- Validación de Formulario y Etapa de Carga  ---
  const formulario = document.getElementById("formulario-contacto");
  if (formulario) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      if (formulario.checkValidity()) {
        const botonEnvio = formulario.querySelector(".boton");
        botonEnvio.classList.add("cargando");

        // Simular un retraso en el servidor
        setTimeout(() => {
          botonEnvio.classList.remove("cargando");

          // Mostrar modal
          const modal = document.getElementById("modal-exito");
          if (modal) {
            modal.style.display = "block";
            setTimeout(() => {
              modal.style.display = "none";
              formulario.reset();
            }, 3000);
          }
        }, 1500);
      } else {
        formulario.reportValidity();
      }
    });
  }

  // --- Contador Animado con jQuery ---
  const contadorElement = document.querySelector(".contador-numero");

  if (contadorElement) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // Si el elemento está en la vista y no ha sido animado aún
          if (
            entry.isIntersecting &&
            !contadorElement.classList.contains("animado")
          ) {
            contadorElement.classList.add("animado"); // Marcar como animado para no repetir

            const $target = $(entry.target);
            const valorFinal = parseInt($target.data("to"));

            $({ conteo: $target.text() }).animate(
              {
                // Empezamos desde el texto actual (0)
                conteo: valorFinal,
              },
              {
                duration: 2500, // Duración de la animación en milisegundos
                easing: "swing", // Tipo de animación
                step: function () {
                  // Actualizamos el texto en cada paso, redondeando
                  $target.text(Math.ceil(this.conteo));
                },
                complete: function () {
                  // Aseguramos el valor final
                  $target.text("+" + valorFinal);
                },
              },
            );

            // Dejamos de observar para que la animación no se repita
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    ); // La animación se dispara cuando el 50% del elemento es visible
    observer.observe(contadorElement);
  }
});
