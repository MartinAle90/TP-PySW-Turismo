document.addEventListener("DOMContentLoaded", () => {
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
});
