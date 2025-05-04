import { UsuarioModel } from "../models/UsuarioModel.js";
import { PersonalModel } from "../models/PersonalModel.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const mensaje = document.getElementById("mensaje");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let usuario =
      UsuarioModel.validarCredenciales(correo, password) ||
      PersonalModel.getByCorreo(correo);

    // Validar password y estado
    if (usuario && usuario.password === password && usuario.activo !== false) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

      if (usuario.rol === "admin") {
        window.location.href = "./js/views/admin/dashboard.html";
      } else if (usuario.rol === "alumno") {
        window.location.href = "./js/views/alumno/dashboard.html";
      } else {
        window.location.href = "./js/views/docente/dashboard.html"; // o algún futuro panel
      }
    } else {
      mostrarMensaje("Correo o contraseña incorrectos, o cuenta inactiva.", "danger");
    }
  });

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `alert alert-${tipo}`;
    mensaje.classList.remove("d-none");
    setTimeout(() => mensaje.classList.add("d-none"), 3000);
  }
});
