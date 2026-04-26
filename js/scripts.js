document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
  );

  // --- Lógica del Modo Oscuro ---
  const botonTema = document.getElementById("boton-tema");
  if (botonTema) {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
      document.documentElement.setAttribute("data-tema", "oscuro");
    }

    botonTema.addEventListener("click", () => {
      const temaActual = document.documentElement.getAttribute("data-tema");
      if (temaActual === "oscuro") {
        document.documentElement.removeAttribute("data-tema");
        localStorage.setItem("tema", "claro");
      } else {
        document.documentElement.setAttribute("data-tema", "oscuro");
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
