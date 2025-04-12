// js/views/LoginView.js
export const LoginView = {
    init(controller) {
      document.getElementById("loginForm").addEventListener("submit", e => {
        e.preventDefault();
        const correo = document.getElementById("loginCorreo").value;
        const password = document.getElementById("loginPassword").value;
        controller.login(correo, password);
      });
  
      document.getElementById("registroForm").addEventListener("submit", e => {
        e.preventDefault();
        const correo = document.getElementById("registroCorreo").value;
        const password = document.getElementById("registroPassword").value;
        const rol = document.getElementById("registroRol").value;
        controller.registrar({ correo, password, rol });
      });
    },
  
    mostrarMensaje(texto, tipo = 'success') {
      const div = document.getElementById("mensaje");
      div.className = `alert alert-${tipo}`;
      div.textContent = texto;
      div.classList.remove("d-none");
    },
  
    limpiarFormularioRegistro() {
      document.getElementById("registroForm").reset();
      bootstrap.Modal.getInstance(document.getElementById("modalRegistro")).hide();
    }
  };
  