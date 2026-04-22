
document.addEventListener("DOMContentLoaded", () => {

    // Alternancia del Modo Oscuro
    const botonTema = document.getElementById("boton-tema");
    if (botonTema) {
        // Verificar si el usuario tenía una preferencia guardada
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

    // Validación de Formulario y Etapa de Carga (Contacto)
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
});
