$(function () {
  const $form = $("#formulario-contacto");
  const $nombre = $("#nombre");
  const $email = $("#email");
  const $destino = $("#destino");
  const $mensaje = $("#mensaje");
  const $spinner = $("#spinner-envio");
  const $modalPhishing = new bootstrap.Modal(
    document.getElementById("modalPhishing"),
  );
  const $modalExito = new bootstrap.Modal(
    document.getElementById("modalExito"),
  );

  const trustedDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "live.com",
    "icloud.com",
    "destinojujuy.com",
    "fi.unju.edu.ar",
  ];

  const suspiciousPatterns = [
    /destino-jujuy\.com/i,
    /destinojujuy\.(?!com)/i,
    /destin[o0]jujuy/i,
    /jujuy-turismo\.com/i,
  ];

  function updateFieldMessage($field, message, type = "error") {
    const $message = $("#" + $field.attr("id") + "-error");
    $message.text(message);

    if (message) {
      $field.addClass("is-invalid").removeClass("is-valid");
      $field.attr("aria-invalid", "true");
      $message.css("color", type === "warning" ? "#b87712" : "#b81212");
    } else {
      $field.removeClass("is-invalid").addClass("is-valid");
      $field.removeAttr("aria-invalid");
    }
  }

  function isSuspiciousEmail(email) {
    return suspiciousPatterns.some((pattern) => pattern.test(email));
  }

  function validarNombre() {
    const value = $nombre.val().trim();
    if (!value) {
      updateFieldMessage($nombre, "Ingresá tu nombre completo.");
      return false;
    }
    if (value.length < 3) {
      updateFieldMessage(
        $nombre,
        "El nombre debe tener al menos 3 caracteres.",
      );
      return false;
    }
    updateFieldMessage($nombre, "");
    return true;
  }

  function validarEmail() {
    const value = $email.val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      updateFieldMessage($email, "Ingresá un correo electrónico.");
      return false;
    }
    if (!emailRegex.test(value)) {
      updateFieldMessage($email, "Ingresá un correo con formato válido.");
      return false;
    }
    if (isSuspiciousEmail(value)) {
      updateFieldMessage(
        $email,
        "Atención: este correo parece usar un dominio falso o manipulado.",
      );
      return false;
    }

    const domain = value.split("@").pop().toLowerCase();
    if (!trustedDomains.includes(domain)) {
      updateFieldMessage(
        $email,
        "Este dominio no es común, revisá si es confiable.",
        "warning",
      );
      return true;
    }
    updateFieldMessage($email, "");
    return true;
  }

  function validarDestino() {
    const value = $destino.val();
    if (!value) {
      updateFieldMessage($destino, "Seleccioná el destino que te interesa.");
      return false;
    }
    updateFieldMessage($destino, "");
    return true;
  }

  function validarMensaje() {
    const value = $mensaje.val().trim();
    if (!value) {
      updateFieldMessage($mensaje, "Escribí tu consulta para poder ayudarte.");
      return false;
    }
    if (value.length < 10) {
      updateFieldMessage(
        $mensaje,
        "El mensaje debe tener al menos 10 caracteres.",
      );
      return false;
    }
    updateFieldMessage($mensaje, "");
    return true;
  }

  function validarFormulario() {
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const destinoValido = validarDestino();
    const mensajeValido = validarMensaje();
    return nombreValido && emailValido && destinoValido && mensajeValido;
  }

  function showPhishingResult(email, resultText, isSafe) {
    const $feedback = $("#phishing-feedback");
    $feedback.text(resultText);
    $feedback.css("color", isSafe ? "#19692c" : "#b81212");
  }

  function verificarCorreoPhishing(email) {
    if (isSuspiciousEmail(email)) {
      return {
        message:
          "Este correo parece falso: el dominio contiene variaciones sospechosas o manipulación.",
        isSafe: false,
      };
    }
    if (
      email.toLowerCase().includes("destinojujuy") &&
      !email.toLowerCase().endsWith("@destinojujuy.com")
    ) {
      return {
        message:
          "Este correo parece usar un dominio parecido al oficial, revisá con cuidado antes de responder.",
        isSafe: false,
      };
    }
    return {
      message:
        "Este correo parece legítimo, pero siempre revisá remitente y enlaces antes de responder.",
      isSafe: true,
    };
  }

  $nombre.on("input", validarNombre);
  $email.on("input", validarEmail);
  $destino.on("change", validarDestino);
  $mensaje.on("input", validarMensaje);

  $("#boton-phishing").on("click", () => {
    $("#phishing-feedback").text("");
    $modalPhishing.show();
  });

  $("#boton-verificar-phishing").on("click", () => {
    const emailEjemplo = $("#phishing-email").text().trim();
    const resultadoObj = verificarCorreoPhishing(emailEjemplo);
    showPhishingResult(emailEjemplo, resultadoObj.message, resultadoObj.isSafe);
  });

  $form.on("submit", (event) => {
    event.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    $spinner.removeClass("visually-hidden");
    $form.find("button[type='submit']").prop("disabled", true);

    setTimeout(() => {
      $spinner.addClass("visually-hidden");
      $form.find("button[type='submit']").prop("disabled", false);
      $modalExito.show();
      $form[0].reset();
      // Remove validation classes from all fields
      $nombre.removeClass("is-valid is-invalid");
      $email.removeClass("is-valid is-invalid");
      $destino.removeClass("is-valid is-invalid");
      $mensaje.removeClass("is-valid is-invalid");
      updateFieldMessage($nombre, "");
      updateFieldMessage($email, "");
      updateFieldMessage($destino, "");
      updateFieldMessage($mensaje, "");
    }, 1300);
  });
});
